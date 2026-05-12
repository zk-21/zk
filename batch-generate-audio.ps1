# 批量生成音频文件脚本
$htmlPath = ".\english-learning.html"
$audioDir = ".\audio\en"

if (-not (Test-Path $audioDir)) {
    New-Item -ItemType Directory -Path $audioDir -Force | Out-Null
}

$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

$textPattern = "text:\s*'([^']+)'"
$enPattern = "en:\s*'([^']+)'"

$textMatches = [regex]::Matches($htmlContent, $textPattern)
$enMatches = [regex]::Matches($htmlContent, $enPattern)

$allTexts = @{}
foreach ($match in $textMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}
foreach ($match in $enMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}

$uniqueTexts = $allTexts.Keys | Sort-Object
$totalTexts = $uniqueTexts.Count

Write-Host "========================================="
Write-Host "Batch Audio Generation"
Write-Host "========================================="
Write-Host "Total unique texts: $totalTexts"
Write-Host "Voice: Microsoft David Desktop"
Write-Host "========================================="

function Get-TextHash($text) {
    $hash = 0
    foreach ($char in $text.ToCharArray()) {
        $hash = ($hash * 131 + [int]$char) % 2147483647
    }
    return $hash.ToString()
}

function Get-TextSlug($text) {
    $slug = $text.ToLower()
    $slug = $slug -replace "'", ""
    $slug = $slug -replace "[^a-z0-9]+", "-"
    $slug = $slug -replace "^-|-$", ""
    if ($slug.Length -gt 48) {
        $slug = $slug.Substring(0, 48)
    }
    if ($slug) { return $slug } else { return "clip" }
}

function Get-AudioFileName($text) {
    $slug = Get-TextSlug $text
    $hash = Get-TextHash $text
    return "${slug}-${hash}.wav"
}

$existingFiles = Get-ChildItem $audioDir -Filter *.wav | ForEach-Object { $_.Name }
$existingCount = $existingFiles.Count

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice("Microsoft David Desktop")
$synth.Rate = -1

$count = 0
$skipped = 0
$failed = 0

foreach ($text in $uniqueTexts) {
    $fileName = Get-AudioFileName $text
    $filePath = Join-Path $audioDir $fileName

    if ($existingFiles -contains $fileName) {
        $skipped++
        continue
    }

    $synth.SetOutputToWaveFile($filePath)
    $synth.Speak($text)
    $synth.SetOutputToNull()
    
    $count++
    
    if ($count % 20 -eq 0) {
        $progress = [math]::Round(($count + $skipped) / $totalTexts * 100)
        Write-Host "Progress: $progress% ($count generated)"
    }
}

$synth.Dispose()

Write-Host "========================================="
Write-Host "Completed!"
Write-Host "New files generated: $count"
Write-Host "Skipped (already exist): $skipped"
Write-Host "Failed: $failed"
Write-Host "Total in directory: $($count + $existingCount)"
Write-Host "========================================="
