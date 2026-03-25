#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""AI 科技早报 - 搜索脚本"""

import requests
import json
import time
import os
from datetime import datetime, timedelta

# 获取 PORT
PORT = os.environ.get('AUTH_GATEWAY_PORT', '19000')
print(f"[QClaw] AUTH_GATEWAY_PORT: {PORT}")

# 计算 FROM_TIME（最近24小时）
FROM_TIME = int((datetime.utcnow() - timedelta(days=1)).timestamp())
print(f"[QClaw] FROM_TIME: {FROM_TIME}")

BASE_URL = f"http://localhost:{PORT}/proxy/prosearch/search"
HEADERS = {"Content-Type": "application/json"}

# 搜索关键词列表
searches = [
    ("AI 大模型 LLM 最新突破 2026", "AI 大模型"),
    ("OpenAI GPT 最新动态 2026", "OpenAI GPT"),
    ("AI 芯片 算力 英伟达 最新 2026", "AI 芯片"),
    ("AI 安全 监管 政策 最新 2026", "AI 安全监管"),
    ("Google Meta Microsoft AI 动态 2026", "科技巨头"),
    ("AI 产品发布 应用 最新 2026年3月", "AI 产品发布"),
    ("AI 投资 融资 创业 最新 2026", "AI 投资"),
    ("AI 科技 新闻 机器之心 36氪", "中文科技媒体"),
]

results = {}

for keyword, label in searches:
    print(f"\n=== 搜索: {label} ===")
    payload = {
        "keyword": keyword,
        "from_time": FROM_TIME
    }
    
    try:
        response = requests.post(BASE_URL, json=payload, headers=HEADERS, timeout=15)
        response.encoding = 'utf-8'
        data = response.json()
        results[label] = data
        print(f"状态: {response.status_code}")
        if data.get('success'):
            print(f"找到结果: {data.get('data', {}).get('totalResults', 0)} 条")
        else:
            print(f"错误: {data.get('message', '未知错误')}")
        print(json.dumps(data, ensure_ascii=False, indent=2)[:500])
    except Exception as e:
        print(f"请求失败: {e}")
        results[label] = {"error": str(e)}
    
    time.sleep(2)

print("\n=== 所有搜索完成 ===")
print(json.dumps(results, ensure_ascii=False, indent=2))
