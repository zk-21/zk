$htmlPath = ".\english-learning.html"
$audioDir = ".\audio\en"
$outputLog = ".\audio-generation-log.txt"

$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

$dialoguePattern = "text:\s*'([^']+)'"
$sentencePattern = "en:\s*'([^']+)'"

$dialogueMatches = [regex]::Matches($htmlContent, $dialoguePattern)
$sentenceMatches = [regex]::Matches($htmlContent, $sentencePattern)

$allTexts = @{}
foreach ($match in $dialogueMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}
foreach ($match in $sentenceMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}

$uniqueTexts = $allTexts.Keys | Sort-Object
$totalTexts = $uniqueTexts.Count

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

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
    return if ($slug) { $slug } else { "clip" }
}

function Get-AudioFileName($text) {
    $slug = Get-TextSlug $text
    $hash = Get-TextHash $text
    return "${slug}-${hash}.wav"
}

$existingFiles = Get-ChildItem $audioDir -Filter *.wav | ForEach-Object { $_.Name }
$existingCount = $existingFiles.Count

$log = ""
$log += "从 HTML 中提取的文本数量: $totalTexts`n"
$log += "已有音频文件: $existingCount`n"
$log += "=========================================`n"

$count = 0
$skipped = 0
$failed = 0

foreach ($text in $uniqueTexts) {
    $fileName = Get-AudioFileName $text

    if ($existingFiles -contains $fileName) {
        $skipped++
        continue
    }

    $filePath = Join-Path $audioDir $fileName

    try {
        $synth.SetOutputToWaveFile($filePath)
        $synth.SelectVoice("Microsoft Zira Desktop")
        $synth.Rate = -1
        $synth.Speak($text)
        $synth.SetOutputToNull()

        $count++
        $log += "生成: $text`n"

        if ($count % 20 -eq 0) {
            $log += "进度: $count / $totalTexts`n"
        }
    }
    catch {
        $failed++
        $log += "失败: $text - $_`n"
    }
}

$log += "=========================================`n"
$log += "完成！`n"
$log += "新增音频文件: $count`n"
$log += "跳过(已存在): $skipped`n"
$log += "失败: $failed`n"

[System.IO.File]::WriteAllText($outputLog, $log, [System.Text.Encoding]::UTF8)
Write-Host $log
Write-Host "日志已保存到: $outputLog"

$synth.Dispose()
