from gtts import gTTS
import os

def generate_test_audio():
    """使用 gTTS 生成测试音频（不需要 API 密钥）"""
    # 测试文本
    test_text = "Hello! This is a test of Google Text-to-Speech. It sounds quite natural."
    
    # 创建 gTTS 对象（英语）
    tts = gTTS(text=test_text, lang='en', slow=False)
    
    # 保存文件
    output_file = "gtts-test.mp3"
    tts.save(output_file)
    
    print(f"✅ 音频生成成功！")
    print(f"📁 文件: {os.path.abspath(output_file)}")
    print(f"📝 文本: {test_text}")
    print(f"🔊 语言: 英语 (en)")
    
    # 如果安装了播放器，可以自动播放
    if os.name == 'nt':  # Windows
        os.startfile(output_file)

if __name__ == "__main__":
    try:
        generate_test_audio()
    except ImportError:
        print("❌ 需要安装 gTTS 库")
        print("请运行: pip install gTTS")
    except Exception as e:
        print(f"❌ 生成失败: {e}")
