# AI 科技早报 - 搜索脚本
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$PORT = if ($env:AUTH_GATEWAY_PORT) { $env:AUTH_GATEWAY_PORT } else { "19000" }
Write-Host "PORT: $PORT"

$FROM_TIME = [int]([datetime]::UtcNow.AddDays(-1).Subtract([datetime]"1970-01-01").TotalSeconds)
Write-Host "FROM_TIME: $FROM_TIME"

# 搜索 1: AI 大模型 LLM 最新突破
$json1 = @{"keyword"="AI 大模型 LLM 最新突破 2026";"from_time"=$FROM_TIME} | ConvertTo-Json -Compress
Write-Host "`n=== 搜索 1: AI 大模型 ==="
$response1 = curl.exe -s -X POST "http://localhost:$PORT/proxy/prosearch/search" -H "Content-Type: application/json" -d $json1
Write-Host $response1

Start-Sleep -Seconds 2

# 搜索 2: OpenAI GPT 新动态
$json2 = @{"keyword"="OpenAI GPT 最新动态 2026";"from_time"=$FROM_TIME} | ConvertTo-Json -Compress
Write-Host "`n=== 搜索 2: OpenAI GPT ==="
$response2 = curl.exe -s -X POST "http://localhost:$PORT/proxy/prosearch/search" -H "Content-Type: application/json" -d $json2
Write-Host $response2

Start-Sleep -Seconds 2

# 搜索 3: AI 芯片算力
$json3 = @{"keyword"="AI 芯片 算力 英伟达 最新 2026";"from_time"=$FROM_TIME} | ConvertTo-Json -Compress
Write-Host "`n=== 搜索 3: AI 芯片 ==="
$response3 = curl.exe -s -X POST "http://localhost:$PORT/proxy/prosearch/search" -H "Content-Type: application/json" -d $json3
Write-Host $response3

Start-Sleep -Seconds 2

# 搜索 4: AI 安全监管
$json4 = @{"keyword"="AI 安全 监管 政策 最新 2026";"from_time"=$FROM_TIME} | ConvertTo-Json -Compress
Write-Host "`n=== 搜索 4: AI 安全监管 ==="
$response4 = curl.exe -s -X POST "http://localhost:$PORT/proxy/prosearch/search" -H "Content-Type: application/json" -d $json4
Write-Host $response4

Start-Sleep -Seconds 2

# 搜索 5: 科技巨头 AI 动态
$json5 = @{"keyword"="Google Meta Microsoft AI 动态 2026";"from_time"=$FROM_TIME} | ConvertTo-Json -Compress
Write-Host "`n=== 搜索 5: 科技巨头 ==="
$response5 = curl.exe -s -X POST "http://localhost:$PORT/proxy/prosearch/search" -H "Content-Type: application/json" -d $json5
Write-Host $response5

Start-Sleep -Seconds 2

# 搜索 6: AI 应用产品发布
$json6 = @{"keyword"="AI 产品发布 应用 最新 2026年3月";"from_time"=$FROM_TIME} | ConvertTo-Json -Compress
Write-Host "`n=== 搜索 6: AI 产品发布 ==="
$response6 = curl.exe -s -X POST "http://localhost:$PORT/proxy/prosearch/search" -H "Content-Type: application/json" -d $json6
Write-Host $response6

Start-Sleep -Seconds 2

# 搜索 7: AI 投资融资
$json7 = @{"keyword"="AI 投资 融资 创业 最新 2026";"from_time"=$FROM_TIME} | ConvertTo-Json -Compress
Write-Host "`n=== 搜索 7: AI 投资 ==="
$response7 = curl.exe -s -X POST "http://localhost:$PORT/proxy/prosearch/search" -H "Content-Type: application/json" -d $json7
Write-Host $response7

Start-Sleep -Seconds 2

# 搜索 8: 机器之心 36氪 AI
$json8 = @{"keyword"="AI 科技 新闻 机器之心 36氪";"from_time"=$FROM_TIME} | ConvertTo-Json -Compress
Write-Host "`n=== 搜索 8: 中文科技媒体 ==="
$response8 = curl.exe -s -X POST "http://localhost:$PORT/proxy/prosearch/search" -H "Content-Type: application/json" -d $json8
Write-Host $response8

Write-Host "`n=== 所有搜索完成 ==="
