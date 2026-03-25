import urllib.request
import urllib.parse
import json
import os

port = os.environ.get('AUTH_GATEWAY_PORT', '19000')
url = f"http://localhost:{port}/proxy/prosearch/search"

data = json.dumps({
    "keyword": "AI人工智能科技早报 2026年3月25日",
    "from_time": 1742774400,
    "cnt": 10
}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        result = resp.read().decode('utf-8')
        print(result)
except Exception as e:
    print(f"ERROR: {e}")
