$ErrorActionPreference = "SilentlyContinue"

# BBC Tech RSS
$r = Invoke-WebRequest -Uri "https://feeds.bbci.co.uk/news/technology/rss.xml" -TimeoutSec 10 -UseBasicParsing
$r.Content | Out-File -Encoding UTF8 "C:\Users\Administrator\.qclaw\workspace\bbc_tech.xml"
Write-Output "BBC done: $($r.StatusCode)"
