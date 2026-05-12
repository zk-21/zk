Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

Write-Host "=== 系统已安装的语音包 ==="
$synth.GetInstalledVoices() | ForEach-Object {
    $voice = $_.VoiceInfo
    Write-Host "名称: $($voice.Name)"
    Write-Host "  语言: $($voice.Culture.DisplayName)"
    Write-Host "  性别: $($voice.Gender)"
    Write-Host ""
}

$synth.Dispose()
