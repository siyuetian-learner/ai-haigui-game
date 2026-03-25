$ErrorActionPreference = "SilentlyContinue"
$base = "C:\Users\Administrator\.qclaw\workspace"

# BBC Tech
try {
    $r = Invoke-WebRequest -Uri "https://feeds.bbci.co.uk/news/technology/rss.xml" -TimeoutSec 10 -UseBasicParsing
    $xml = [xml]$r.Content
    $items = $xml.rss.channel.item | Select-Object -First 15
    "=== BBC TECHNOLOGY ===" | Out-File "$base\news_result.txt" -Encoding UTF8
    foreach ($item in $items) {
        "TITLE: $($item.title)" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
        "DESC: $($item.description)" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
        "---" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
    }
} catch {
    "BBC_FAILED: $_" | Out-File "$base\news_result.txt" -Encoding UTF8
}

# Hacker News
try {
    $r2 = Invoke-WebRequest -Uri "https://hnrss.org/frontpage" -TimeoutSec 10 -UseBasicParsing
    $xml2 = [xml]$r2.Content
    $items2 = $xml2.rss.channel.item | Select-Object -First 20
    "`n=== HACKER NEWS ===" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
    foreach ($item in $items2) {
        "TITLE: $($item.title)" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
        "DESC: $($item.description)" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
        "LINK: $($item.link)" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
        "---" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
    }
} catch {
    "`nHN_FAILED: $_" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
}

# Baidu AI search
try {
    $r3 = Invoke-WebRequest -Uri "https://www.baidu.com/s?wd=AI+%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD+%E6%9C%80%E6%96%B0%E8%B5%84%E8%AE%AF&rn=10" -TimeoutSec 10 -UseBasicParsing -UserAgent "Mozilla/5.0"
    "`n=== BAIDU AI ===" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
    $r3.Content.Substring(0, [Math]::Min(5000, $r3.Content.Length)) | Out-File "$base\news_result.txt" -Append -Encoding UTF8
} catch {
    "`nBAIDU_FAILED: $_" | Out-File "$base\news_result.txt" -Append -Encoding UTF8
}

Write-Output "FETCH_COMPLETE"
