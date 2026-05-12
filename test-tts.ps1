Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

$testText = "Hello! This is a test of Windows Text-to-Speech. It uses Microsoft Zira voice."

$synth.SelectVoice("Microsoft Zira Desktop")
$synth.Rate = -1

$outputFile = "windows-tts-test.wav"
$synth.SetOutputToWaveFile($outputFile)
$synth.Speak($testText)
$synth.SetOutputToNull()
$synth.Dispose()

Write-Host "Audio generated successfully!"
Write-Host "File: $outputFile"
Write-Host "Text: $testText"
Write-Host "Voice: Microsoft Zira Desktop"

Start-Process $outputFile