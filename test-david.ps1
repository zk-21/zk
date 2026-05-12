Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

$testText = "Hello! This is Microsoft David speaking. I'm an American English male voice."

$synth.SelectVoice("Microsoft David Desktop")
$synth.Rate = -1

$outputFile = "microsoft-david-test.wav"
$synth.SetOutputToWaveFile($outputFile)
$synth.Speak($testText)
$synth.SetOutputToNull()
$synth.Dispose()

Write-Host "Audio generated successfully!"
Write-Host "File: $outputFile"
Write-Host "Voice: Microsoft David Desktop (American English Male)"
Start-Process $outputFile