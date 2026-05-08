$htmlPath = ".\english-learning.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

$allTexts = @{}

$enMatches = [regex]::Matches($htmlContent, "en:\s*'([^']+)'")
foreach ($match in $enMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = "en"
    }
}

$textMatches = [regex]::Matches($htmlContent, "text:\s*'([^']+)'")
foreach ($match in $textMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = "text"
    }
}

$qMatches = [regex]::Matches($htmlContent, "q:\s*'([^']+)'")
foreach ($match in $qMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = "q"
    }
}

$answerMatches = [regex]::Matches($htmlContent, "answer:\s*'([^']+)'")
foreach ($match in $answerMatches) {
    $text = $match.Groups[1].Value
    if ($text -and $text.Length -gt 1) {
        $allTexts[$text] = "answer"
    }
}

$optionMatches = [regex]::Matches($htmlContent, "options:\s*\[([^\]]+)\]")
foreach ($match in $optionMatches) {
    $optionsStr = $match.Groups[1].Value
    $options = [regex]::Matches($optionsStr, "'([^']+)'")
    foreach ($opt in $options) {
        $text = $opt.Groups[1].Value
        if ($text -and $text.Length -gt 1) {
            $allTexts[$text] = "option"
        }
    }
}

Write-Host "Total unique texts found:" $allTexts.Count

$uniqueTexts = $allTexts.Keys | Sort-Object
$uniqueTexts | ForEach-Object { Write-Host "$_ ($($allTexts[$_]))" }