$htmlPath = ".\四年级上册英语互动学习.html"
$audioDir = ".\audio\grade4a\en"

if (-not (Test-Path $audioDir)) {
    New-Item -ItemType Directory -Path $audioDir -Force | Out-Null
}

$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

$allTexts = @{}

$enMatches = [regex]::Matches($htmlContent, "en:\s*'([^']+)'")
foreach ($match in $enMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}

$textMatches = [regex]::Matches($htmlContent, "text:\s*'([^']+)'")
foreach ($match in $textMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}

$qMatches = [regex]::Matches($htmlContent, "q:\s*'([^']+)'")
foreach ($match in $qMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}

$answerMatches = [regex]::Matches($htmlContent, "answer:\s*'([^']+)'")
foreach ($match in $answerMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}

$optionMatches = [regex]::Matches($htmlContent, "options:\s*\[([^\]]+)\]")
foreach ($match in $optionMatches) {
    $optionsStr = $match.Groups[1].Value
    $options = [regex]::Matches($optionsStr, "'([^']+)'")
    foreach ($opt in $options) {
        $text = $opt.Groups[1].Value
        if ($text -and $text.Length -gt 1) {
            $allTexts[$text] = $true
        }
    }
}

$ruleMatches = [regex]::Matches($htmlContent, "rule:\s*'([^']+)'")
foreach ($match in $ruleMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}

$exampleMatches = [regex]::Matches($htmlContent, "example:\s*'([^']+)'")
foreach ($match in $exampleMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = $true
    }
}

Write-Host "找到 $($allTexts.Count) 个独特文本需要生成音频"

$currentIndex = 0
foreach ($text in $allTexts.Keys) {
    $currentIndex++
    $cleanText = $text.ToLower().Replace("'", "").Replace("?", "").Replace("!", "").Replace(".", "").Replace(",", "")
    $cleanText = $cleanText -replace "[^a-z0-9\s]", ""
    $slug = ($cleanText -replace "\s+", "-").Trim("-")
    if ($slug.Length -gt 48) {
        $slug = $slug.Substring(0, 48)
    }
    
    $hash = 0
    foreach ($char in $text.ToCharArray()) {
        $hash = ($hash * 131 + [int]$char) % 2147483647
    }
    $hashStr = $hash.ToString(36)
    
    $fileName = "$slug-$hashStr.wav"
    $filePath = "$audioDir\$fileName"
    
    if (Test-Path $filePath) {
        Write-Host "[$currentIndex/$($allTexts.Count)] 跳过已存在: $text"
        continue
    }
    
    try {
        Write-Host "[$currentIndex/$($allTexts.Count)] 生成: $text"
        $speaker = New-Object -ComObject SAPI.SpVoice
        $speaker.Voice = $speaker.GetVoices() | Where-Object { $_.GetDescription() -match "David" }
        if (-not $speaker.Voice) {
            $speaker.Voice = $speaker.GetVoices() | Where-Object { $_.Language -eq "409" }
        }
        $speaker.Rate = -2
        $stream = New-Object -ComObject SAPI.SpFileStream
        $stream.Open($filePath, 3, $false)
        $speaker.AudioOutputStream = $stream
        $speaker.Speak($text)
        $stream.Close()
        
        Start-Sleep -Milliseconds 200
    } catch {
        Write-Host "[$currentIndex/$($allTexts.Count)] 生成失败: $text - $_"
    }
}

Write-Host "音频生成完成，共生成 $currentIndex 个文件"
