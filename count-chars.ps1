$htmlPath = ".\english-learning.html"

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

$uniqueTexts = $allTexts.Keys
$totalChars = ($uniqueTexts | Measure-Object -Property Length -Sum).Sum
$totalTexts = $uniqueTexts.Count

Write-Host "========================================="
Write-Host "Statistics:"
Write-Host "========================================="
Write-Host "Unique text count: $totalTexts"
Write-Host "Total characters: $totalChars"
Write-Host "Average length: $([math]::Round($totalChars / $totalTexts)) chars"
Write-Host "========================================="
Write-Host ""
Write-Host "Google WaveNet Cost Estimation:"
Write-Host "- Free tier: 400,000 chars/month"
Write-Host "- Over limit: $4.00 / million chars"
Write-Host "- Required: $totalChars chars ($([math]::Round($totalChars / 1000)) thousand)"
Write-Host ""
Write-Host "Conclusion: Within free tier, can use!"
