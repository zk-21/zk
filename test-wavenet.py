import os
from google.cloud import texttospeech

def test_wavenet_audio(api_key_path):
    """测试生成单个 WaveNet 音频"""
    # 设置 API 密钥
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = api_key_path
    
    # 初始化客户端
    client = texttospeech.TextToSpeechClient()
    
    # 测试文本
    test_text = "Hello! This is a test of Google WaveNet voice. It sounds very natural and realistic."
    
    # 配置输入
    synthesis_input = texttospeech.SynthesisInput(text=test_text)
    
    # 配置 WaveNet 语音（en-US-Wavenet-D）
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Wavenet-D",  # 美式英语男声，温暖自然
        ssml_gender=texttospeech.SsmlVoiceGender.MALE
    )
    
    # 配置音频输出（WAV 格式）
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.LINEAR16,
        speaking_rate=0.9,
        pitch=0
    )
    
    # 生成音频
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    
    # 保存文件
    output_file = "wavenet-test.wav"
    with open(output_file, "wb") as out:
        out.write(response.audio_content)
    
    print(f"✅ WaveNet 音频生成成功！")
    print(f"📁 文件: {output_file}")
    print(f"🎙️ 语音: en-US-Wavenet-D (美式英语男声)")
    print(f"📝 文本: {test_text}")

if __name__ == "__main__":
    # 请替换为您的 API 密钥路径
    API_KEY_PATH = "your-service-account-key.json"
    
    if not os.path.exists(API_KEY_PATH):
        print(f"❌ 错误：API 密钥文件不存在: {API_KEY_PATH}")
        print("请先创建 Google Cloud API 密钥并更新路径")
        exit(1)
    
    test_wavenet_audio(API_KEY_PATH)
