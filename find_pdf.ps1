$path = "C:\Program Files\QClaw\resources\openclaw\node_modules"
Get-ChildItem $path -Directory | Where-Object { $_.Name -match "pdf|puppeteer|chromium|playwright|html|canvas|jspdf" } | Select-Object Name
