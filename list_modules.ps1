$path = "C:\Program Files\QClaw\resources\openclaw\node_modules"
Get-ChildItem $path -Directory | Select-Object -First 30 Name
