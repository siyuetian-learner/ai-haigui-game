$ErrorActionPreference = "SilentlyContinue"
$out = ""

# BBC Tech RSS
try {
    $r = Invoke-WebRequest -Uri "https://feeds.bbci.co.uk/news/technology/rss.xml" -TimeoutSec 10 -UseBasicParsing
    $out += "=== BBC TECH ===`n" + $r.Content + "`n`n"
} catch { $out += "BBC FAILED: $_`n`n" }

# Hacker News
try {
    $r2 = Invoke-WebRequest -Uri "https://hnrss.org/frontpage" -TimeoutSec 10 -UseBasicParsing
    $out += "=== HN FRONTPAGE ===`n" + $r2.Content + "`n`n"
} catch { $out += "HN FAILED: $_`n`n" }

$out | Out-File -Encoding UTF8 "$env:TEMP\news_raw.txt"
Write-Output "DONE"
