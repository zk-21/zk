param(
    [Parameter(Mandatory = $true)]
    [string]$HtmlPath,

    [Parameter(Mandatory = $true)]
    [string]$AudioDir,

    [string]$Voice = "Microsoft Zira Desktop"
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$resolvedHtmlPath = if ([System.IO.Path]::IsPathRooted($HtmlPath)) { $HtmlPath } else { Join-Path $root $HtmlPath }
$resolvedAudioDir = if ([System.IO.Path]::IsPathRooted($AudioDir)) { $AudioDir } else { Join-Path $root $AudioDir }

if (-not (Test-Path $resolvedHtmlPath)) {
    throw "HTML 文件不存在: $resolvedHtmlPath"
}

New-Item -ItemType Directory -Force -Path $resolvedAudioDir | Out-Null

$html = [System.IO.File]::ReadAllText($resolvedHtmlPath, [System.Text.Encoding]::UTF8)
$scriptPaths = [regex]::Matches($html, '<script\s+src="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }

$texts = @{}
foreach ($scriptPath in $scriptPaths) {
    $fullScriptPath = Join-Path (Split-Path -Parent $resolvedHtmlPath) $scriptPath
    if (-not (Test-Path $fullScriptPath)) {
        continue
    }

    $content = [System.IO.File]::ReadAllText($fullScriptPath, [System.Text.Encoding]::UTF8)
    foreach ($match in [regex]::Matches($content, "(?:en|text):\s*'((?:\\'|[^'])*)'")) {
        $text = $match.Groups[1].Value
        $text = $text -replace "\\'", "'"
        if ($text -match '[A-Za-z]' -and $text.Length -gt 1) {
            $texts[$text] = $true
        }
    }
}

function Get-TextHash([string]$text) {
    $hash = 0
    foreach ($char in $text.ToCharArray()) {
        $hash = ($hash * 131 + [int]$char) % 2147483647
    }
    return [Convert]::ToString($hash, 36)
}

function Get-TextSlug([string]$text) {
    $slug = $text.ToLower()
    $slug = $slug -replace "['’]", ""
    $slug = $slug -replace "[^a-z0-9]+", "-"
    $slug = $slug -replace "^-+|-+$", ""
    if ($slug.Length -gt 48) {
        $slug = $slug.Substring(0, 48)
    }
    if ($slug) { return $slug }
    return "clip"
}

function Get-AudioFileName([string]$text) {
    return "$(Get-TextSlug $text)-$(Get-TextHash $text).wav"
}

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

try {
    $availableVoice = $synth.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Name -eq $Voice } | Select-Object -First 1
    if ($availableVoice) {
        $synth.SelectVoice($Voice)
    }

    $created = 0
    $skipped = 0
    $failed = 0

    foreach ($text in ($texts.Keys | Sort-Object)) {
        $filePath = Join-Path $resolvedAudioDir (Get-AudioFileName $text)
        if (Test-Path $filePath) {
            $skipped++
            continue
        }

        try {
            $synth.SetOutputToWaveFile($filePath)
            $synth.Rate = -1
            $synth.Speak($text)
            $synth.SetOutputToNull()
            $created++
            Write-Host "生成: $text" -ForegroundColor Green
        }
        catch {
            $failed++
            Write-Host "失败: $text - $_" -ForegroundColor Yellow
        }
    }

    Write-Host ""
    Write-Host "HTML: $resolvedHtmlPath"
    Write-Host "音频目录: $resolvedAudioDir"
    Write-Host "文本数量: $($texts.Count)"
    Write-Host "新增音频: $created"
    Write-Host "已存在跳过: $skipped"
    Write-Host "失败: $failed"
}
finally {
    $synth.SetOutputToNull()
    $synth.Dispose()
}
