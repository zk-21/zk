param(
  [string]$HtmlPath = "english-learning.html",
  [string]$OutputDir = "audio\\en",
  [string]$PreferredVoice = "Microsoft Zira Desktop - English (United States)",
  [int]$Rate = 0,
  [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-AudioHash {
  param([string]$Text)

  $hash = [long]0
  foreach ($char in $Text.ToCharArray()) {
    $hash = (($hash * 131) + [int][char]$char) % 2147483647
  }
  $alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"
  if ($hash -eq 0) {
    return "0"
  }

  $result = ""
  while ($hash -gt 0) {
    $remainder = [int]($hash % 36)
    $result = $alphabet[$remainder] + $result
    $hash = [Math]::Floor($hash / 36)
  }
  return $result
}

function Get-AudioSlug {
  param([string]$Text)

  $slug = $Text.ToLowerInvariant()
  $slug = $slug.Replace("'", "").Replace([string][char]0x2019, "")
  $slug = $slug -replace "[^a-z0-9]+", "-"
  $slug = $slug.Trim("-")
  if ($slug.Length -gt 48) {
    $slug = $slug.Substring(0, 48).Trim("-")
  }
  if ([string]::IsNullOrWhiteSpace($slug)) {
    return "clip"
  }
  return $slug
}

function Get-AudioFileName {
  param([string]$Text)

  return "{0}-{1}.wav" -f (Get-AudioSlug $Text), (Get-AudioHash $Text)
}

$resolvedHtmlPath = Resolve-Path $HtmlPath
$outputPath = Join-Path (Get-Location) $OutputDir
New-Item -ItemType Directory -Path $outputPath -Force | Out-Null

$content = Get-Content -LiteralPath $resolvedHtmlPath -Raw -Encoding UTF8
$pattern = "(?:\ben|\btext)\s*:\s*'((?:\\'|[^'])*)'"
$matches = [regex]::Matches($content, $pattern)

$items = New-Object System.Collections.Generic.List[string]
$seen = New-Object 'System.Collections.Generic.HashSet[string]'

foreach ($match in $matches) {
  $text = $match.Groups[1].Value -replace "\\'", "'"
  $text = $text.Trim()
  if (-not $text) {
    continue
  }
  if ($text -notmatch "[A-Za-z]") {
    continue
  }
  if ($seen.Add($text)) {
    $items.Add($text)
  }
}

if ($items.Count -eq 0) {
  throw "No English text entries found in $resolvedHtmlPath"
}

$voice = New-Object -ComObject SAPI.SpVoice
$availableVoices = @($voice.GetVoices())
$selectedVoice = $availableVoices | Where-Object { $_.GetDescription() -eq $PreferredVoice } | Select-Object -First 1
if (-not $selectedVoice) {
  $selectedVoice = $availableVoices | Where-Object { $_.GetDescription() -match "English" } | Select-Object -First 1
}
if (-not $selectedVoice) {
  throw "No English SAPI voice found on this machine."
}

$voice.Voice = $selectedVoice
$voice.Rate = $Rate

$generated = 0
$skipped = 0
$manifest = New-Object System.Collections.Generic.List[object]

foreach ($text in $items) {
  $fileName = Get-AudioFileName $text
  $targetPath = Join-Path $outputPath $fileName

  if ((-not $Force) -and (Test-Path -LiteralPath $targetPath)) {
    $skipped++
  } else {
    $stream = New-Object -ComObject SAPI.SpFileStream
    $stream.Format.Type = 22
    $stream.Open($targetPath, 3)
    try {
      $voice.AudioOutputStream = $stream
      [void]$voice.Speak($text)
      $generated++
    } finally {
      $stream.Close()
      $voice.AudioOutputStream = $null
    }
  }

  $manifest.Add([pscustomobject]@{
      text = $text
      file = $fileName
    })
}

$manifestPath = Join-Path $outputPath "_manifest.json"
$manifest | ConvertTo-Json | Set-Content -LiteralPath $manifestPath -Encoding UTF8

Write-Host ("Voice: {0}" -f $selectedVoice.GetDescription())
Write-Host ("Entries: {0}" -f $items.Count)
Write-Host ("Generated: {0}" -f $generated)
Write-Host ("Skipped existing: {0}" -f $skipped)
Write-Host ("Output: {0}" -f $outputPath)
