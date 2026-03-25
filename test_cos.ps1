$PORT = if ($env:AUTH_GATEWAY_PORT) { $env:AUTH_GATEWAY_PORT } else { "19000" }
Write-Host "[QClaw] AUTH_GATEWAY_PORT: $PORT"

# Test list endpoint
$body = '{"dirPath":"/","limit":5}'
try {
    $r = Invoke-WebRequest -Uri "http://localhost:$PORT/proxy/qclaw-cos/list" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
    Write-Output "LIST_RESULT: $($r.Content)"
} catch {
    Write-Output "LIST_ERROR: $_"
}
