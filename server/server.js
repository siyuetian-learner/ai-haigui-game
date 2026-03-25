const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      requestId,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent') || 'unknown'
    };
    
    if (req.method === 'POST' && req.url === '/api/chat') {
      console.log(`[${requestId}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms | question: "${req.body?.question?.substring(0, 30)}..."`);
    } else {
      console.log(`[${requestId}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    }
  });
  
  next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ 
    message: 'AI海龟汤游戏服务器',
    version: '1.0.0',
    description: '海龟汤推理游戏的后端服务',
    endpoints: {
      'GET /': '服务信息',
      'GET /api/test': '测试接口',
      'GET /api/health': '健康检查',
      'POST /api/chat': 'AI对话接口'
    },
    docs: {
      chat: {
        description: 'AI对话接口，用于判断玩家问题',
        method: 'POST',
        body: {
          question: 'string - 玩家的问题',
          story: 'object - 故事对象，包含 surface, keyPoints 等',
          history: 'array - 可选，对话历史'
        },
        response: {
          answerType: 'yes | no | irrelevant',
          content: '是 | 否 | 无关'
        },
        example: {
          request: {
            question: '门是关着的吗？',
            story: {
              surface: '深夜，抽屉里多了一封信。',
              keyPoints: ['信封无地址', '字迹熟悉']
            }
          },
          response: {
            answerType: 'no',
            content: '否'
          }
        }
      }
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Test endpoint working!',
    timestamp: Date.now(),
    status: 'ok'
  });
});

app.get('/api/', (req, res) => {
  res.json({ 
    message: 'AI海龟汤游戏服务器 API',
    version: '1.0.0',
    endpoints: {
      'GET /api/': 'API信息',
      'GET /api/test': '测试接口',
      'GET /api/health': '健康检查',
      'POST /api/chat': 'AI对话接口'
    }
  });
});

app.get('/api/health', (req, res) => {
  const apiKeyConfigured = !!process.env.API_KEY;
  res.json({ 
    status: 'ok', 
    timestamp: Date.now(),
    apiKeyConfigured,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

const story = {
  buildSystemPrompt: (storyData) => {
    return `你是海龟汤游戏的主持人。你的职责是根据故事设定判断玩家的问题是"是"、"否"还是"无关"。

## 故事设定（汤面）
${storyData.surface || '无描述'}

## 关键真相要素（用于判断）
${(storyData.keyPoints || []).map((k, i) => `${i + 1}. ${k}`).join('\n') || '无关键点'}

## 你的回答规则（必须严格遵守）
1. **只能回答一个字**：是 / 否 / 无关
2. **不得解释**：不要给出任何理由或长文本
3. **不得泄露**：不能透露故事结局或超出汤面的信息
4. **格式严格**：回答必须是"是"、"否"或"无关"之一，不能有其他内容

## 判断逻辑
- 如果问题与故事关键要素**直接相关**且**符合事实** → 回答"是"
- 如果问题与故事关键要素**直接相关**但**不符合事实** → 回答"否"
- 如果问题与故事关键要素**完全无关** → 回答"无关"
- 如果问题**不是是非类问题**（如开放式问题、选择问题）→ 回答"无关"

## 判断示例
关键点：["信封无地址", "字迹熟悉"]
- 问题"信封上有地址吗？" → 回答"否"（关键要素：信封无地址）
- 问题"这是别人寄来的信吗？" → 回答"否"（因为信封无地址，不是寄来的）
- 问题"今天天气好吗？" → 回答"无关"`;
  },
  parseResponse: (content) => {
    const trimmed = content.trim();
    if (['是', 'yes', 'Yes', 'YES', '对', '正确', '的确'].some(p => trimmed === p || trimmed.startsWith(p))) {
      return { answerType: 'yes', content: '是' };
    }
    if (['否', 'no', 'No', 'NO', '不是', '错', '没有'].some(p => trimmed === p || trimmed.startsWith(p))) {
      return { answerType: 'no', content: '否' };
    }
    return { answerType: 'irrelevant', content: '无关' };
  }
};

app.post('/api/chat', async (req, res) => {
  const requestId = `chat-${Date.now()}`;
  const startTime = Date.now();
  
  try {
    const { question, story: storyData, history } = req.body;

    if (!question || !storyData) {
      console.log(`[${requestId}] Missing required fields`);
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'question and story are required',
        requestId
      });
    }

    const apiKey = process.env.API_KEY;
    const apiModel = process.env.API_MODEL || 'MiniMax-M2.7';
    const baseUrl = process.env.API_BASE_URL || 'https://wellapi.ai';

    if (!apiKey) {
      console.error(`[${requestId}] API key not configured`);
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'Server configuration error',
        requestId 
      });
    }

    console.log(`[${requestId}] Processing question: "${question.substring(0, 50)}..."`);
    console.log(`[${requestId}] Story: ${storyData.title || 'unknown'}, keyPoints: ${storyData.keyPoints?.length || 0}`);

    const systemPrompt = story.buildSystemPrompt(storyData);
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    if (history && Array.isArray(history) && history.length > 0) {
      history.forEach(msg => {
        if (msg.role && msg.content) {
          messages.push({ role: msg.role, content: msg.content });
        }
      });
    }

    messages.push({ role: 'user', content: question });

    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: apiModel,
        messages,
        max_tokens: 500,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${requestId}] AI API error: ${response.status} - ${errorText.substring(0, 200)}`);
      return res.status(response.status).json({ 
        error: 'AI API error',
        message: `External API returned ${response.status}`,
        details: errorText.substring(0, 500),
        requestId
      });
    }

    const data = await response.json();
    let content = '';
    
    if (data.choices && data.choices[0]?.message) {
      content = data.choices[0].message.content || data.choices[0].message.reasoning_content || '';
    }

    if (!content) {
      console.error(`[${requestId}] No content in AI response`);
      return res.status(500).json({ 
        error: 'Empty AI response',
        message: 'AI returned no content',
        requestId 
      });
    }

    const result = story.parseResponse(content);
    const duration = Date.now() - startTime;
    
    console.log(`[${requestId}] Response: ${result.content} (${result.answerType}) - ${duration}ms`);

    res.json({
      ...result,
      requestId,
      duration
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Server error after ${duration}ms:`, error.message);
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      requestId
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `Route ${req.method} ${req.url} not found`,
    availableRoutes: ['GET /', 'GET /api/test', 'GET /api/health', 'POST /api/chat']
  });
});

app.use((err, req, res, next) => {
  console.error('[Global Error Handler]', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message || 'Unknown error'
  });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`  AI海龟汤游戏服务器`);
  console.log('='.repeat(50));
  console.log(`  Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('  Available endpoints:');
  console.log(`    GET  /            -> 服务信息 (含接口文档)`);
  console.log(`    GET  /api/test    -> 测试接口`);
  console.log(`    GET  /api/health  -> 健康检查`);
  console.log(`    POST /api/chat   -> AI对话`);
  console.log('='.repeat(50));
  console.log(`  API Key: ${process.env.API_KEY ? '✓ Configured' : '✗ Not configured'}`);
  console.log(`  API Model: ${process.env.API_MODEL || 'MiniMax-M2.7'}`);
  console.log(`  API Base URL: ${process.env.API_BASE_URL || 'https://wellapi.ai'}`);
  console.log('='.repeat(50));
});
