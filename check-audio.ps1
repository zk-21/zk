$htmlPath = ".\english-learning.html"
$audioDir = ".\audio\en"

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
Write-Host "Total unique texts in HTML: $($uniqueTexts.Count)"

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
Write-Host "Total existing audio files: $($existingFiles.Count)"

$missing = @()
foreach ($text in $uniqueTexts) {
    $fileName = Get-AudioFileName $text
    if (-not ($existingFiles -contains $fileName)) {
        $missing += $text
    }
}

Write-Host ""
if ($missing.Count -eq 0) {
    Write-Host "All texts have audio files!" -ForegroundColor Green
} else {
    Write-Host "Missing audio files: $($missing.Count)" -ForegroundColor Yellow
    Write-Host "---"
    $missing | ForEach-Object { Write-Host $_ }
}