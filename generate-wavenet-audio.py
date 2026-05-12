import os
import json
from google.cloud import texttospeech

def generate_wavenet_audio(text, output_dir, api_key_path):
    """使用 Google WaveNet 生成音频文件"""
    # 设置 API 密钥路径
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = api_key_path
    
    # 初始化客户端
    client = texttospeech.TextToSpeechClient()
    
    # 设置文本输入
    synthesis_input = texttospeech.SynthesisInput(text=text)
    
    # 配置语音参数（WaveNet 语音）
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Wavenet-D",  # WaveNet 语音
        ssml_gender=texttospeech.SsmlVoiceGender.MALE
    )
    
    # 配置音频输出
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.LINEAR16,  # WAV 格式
        speaking_rate=0.9  # 稍慢的语速
    )
    
    # 生成音频
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    
    # 生成文件名（与原脚本保持一致）
    slug = text.lower().replace("'", "").replace("?", "").replace("!", "")
    slug = "-".join([word for word in slug.split() if word])
    if len(slug) > 48:
        slug = slug[:48]
    
    # 简单哈希
    text_hash = str(hash(text) % 100000000)
    filename = f"{slug}-{text_hash}.wav"
    filepath = os.path.join(output_dir, filename)
    
    # 保存文件
    with open(filepath, "wb") as out:
        out.write(response.audio_content)
    
    return filename

# 使用示例
if __name__ == "__main__":
    # 需要替换为您的 API 密钥路径
    API_KEY_PATH = "path/to/your/service-account-key.json"
    OUTPUT_DIR = "audio/en"
    
    # 测试文本
    test_texts = [
        "Hello, this is a test.",
        "What's this?",
        "It's my pencil case."
    ]
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    for text in test_texts:
        filename = generate_wavenet_audio(text, OUTPUT_DIR, API_KEY_PATH)
        print(f"生成音频: {filename}")
