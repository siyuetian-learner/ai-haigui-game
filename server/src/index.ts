import express, { Request, Response as ExpressResponse } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 3002)

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean)

app.use(express.json({ limit: '1mb' }))

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true)

      if (ALLOWED_ORIGINS.length === 0) {
        return callback(null, true)
      }

      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
  })
)

interface JudgeRequest {
  systemPrompt: string
  userPrompt: string
  storyId: string
  mode: 'judge' | 'hint' | 'summary'
}

interface AiResponse {
  answerType: 'yes' | 'no' | 'irrelevant' | 'hint' | 'summary'
  content: string
}

interface Story {
  id: string
  title: string
  surface: string
  bottom: string
  keyPoints: string[]
  hints?: string[]
  difficulty: string
  category: string
}

interface ChatRequest {
  question: string
  story: Story
  history?: Array<{ role: 'user' | 'assistant'; content: string }>
}

function parseAndValidateResponse(content: string): {
  answerType: AiResponse['answerType']
  content: string
} {
  const trimmed = content.trim()

  const yesPatterns = ['是', 'yes', 'Yes', 'YES', '对', '正确', '的确']
  const noPatterns = ['否', 'no', 'No', 'NO', '不是', '错', '错误', '没有']
  const irrelevantPatterns = ['无关', 'irrelevant', '没关系', '无意义']

  if (yesPatterns.some((p) => trimmed === p || trimmed.startsWith(p))) {
    return { answerType: 'yes', content: '是' }
  }

  if (noPatterns.some((p) => trimmed === p || trimmed.startsWith(p))) {
    return { answerType: 'no', content: '否' }
  }

  if (irrelevantPatterns.some((p) => trimmed === p || trimmed.startsWith(p))) {
    return { answerType: 'irrelevant', content: '无关' }
  }

  return { answerType: 'irrelevant', content: '无关' }
}

function extractAiContent(data: Record<string, unknown>): string {
  if (data.choices && Array.isArray(data.choices) && data.choices[0]) {
    const choice = data.choices[0] as Record<string, unknown>

    if (choice.message && typeof choice.message === 'object') {
      const msg = choice.message as Record<string, unknown>
      const content = String(msg.content || '')
      if (content.trim()) return content

      const reasoningContent = String(msg.reasoning_content || '')
      if (reasoningContent.trim()) return reasoningContent
    }

    if (choice.text) {
      return String(choice.text)
    }
  }

  if (data.text) return String(data.text)
  if (data.content) return String(data.content)
  if (data.reasoning_content) return String(data.reasoning_content)

  return ''
}

function buildSystemPrompt(story: Story): string {
  return `你是海龟汤游戏的主持人。你的职责是根据故事设定判断玩家的问题是“是”、“否”还是“无关”。

## 故事设定（汤面）
${story.surface}

## 关键真相要素（用于判断）
${story.keyPoints.map((k, i) => `${i + 1}. ${k}`).join('\n')}

## 回答规则（必须严格遵守）
1. 只能回答一个词：是 / 否 / 无关
2. 不得解释
3. 不得泄露故事结局
4. 输出必须只有“是”、“否”或“无关”

## 判断逻辑
- 与关键要素直接相关且符合事实 → 是
- 与关键要素直接相关但不符合事实 → 否
- 与关键要素无关 → 无关
- 不是是非类问题 → 无关`
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 30000
): Promise<globalThis.Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    })
  } finally {
    clearTimeout(timeout)
  }
}

async function callAIApi(
  messages: Array<{ role: string; content: string }>,
  requestId: number
): Promise<string> {
  const apiKey = process.env.API_KEY
  const apiModel = process.env.API_MODEL || 'deepseek-chat'
  const baseUrl = process.env.API_BASE_URL || 'https://api.deepseek.com'
  const apiUrl = `${baseUrl}/v1/chat/completions`

  if (!apiKey) {
    throw new Error('API key not configured')
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Invalid messages format')
  }

  if (messages.length > 20) {
    throw new Error('Too many messages (limit 20)')
  }

  console.log(`[${requestId}] Calling AI API`)
  console.log(`[${requestId}] Model: ${apiModel}`)
  console.log(`[${requestId}] URL: ${apiUrl}`)

  let response: globalThis.Response

  try {
    response = await fetchWithTimeout(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: apiModel,
          messages,
          temperature: 0.3,
          max_tokens: 300
        })
      },
      30000
    )
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('AI request timeout')
    }
    throw new Error('Network error when calling AI API')
  }

  const responseText = await response.text()

  if (!response.ok) {
    console.error(`[${requestId}] AI API error status: ${response.status}`)
    throw new Error(`AI API request failed (${response.status})`)
  }

  let data: Record<string, unknown>
  try {
    data = JSON.parse(responseText)
  } catch {
    throw new Error('Invalid JSON response from AI API')
  }

  const content = extractAiContent(data)

  if (!content) {
    throw new Error('Empty response from AI')
  }

  return content.trim()
}

app.get('/', (_req: Request, res: ExpressResponse) => {
  res.json({
    ok: true,
    message: 'AI Haigui Game backend is running'
  })
})

app.get('/api/health', (_req: Request, res: ExpressResponse) => {
  res.json({
    ok: true,
    status: 'ok',
    timestamp: Date.now(),
    nodeEnv: process.env.NODE_ENV || 'development'
  })
})

app.get('/api/test', (_req: Request, res: ExpressResponse) => {
  res.json({
    ok: true,
    message: 'Test endpoint working!',
    timestamp: Date.now()
  })
})

app.post('/api/ai/judge', async (req: Request, res: ExpressResponse) => {
  const requestId = Date.now()

  try {
    const { systemPrompt, userPrompt, storyId, mode } = req.body as JudgeRequest

    console.log(`[${requestId}] Judge request - storyId: ${storyId}, mode: ${mode}`)

    if (!systemPrompt || !userPrompt) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields'
      })
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]

    const aiContent = await callAIApi(messages, requestId)
    const validated = parseAndValidateResponse(aiContent)

    return res.json({
      ok: true,
      ...validated
    })
  } catch (error) {
    console.error(`[${requestId}] Judge error:`, error)

    return res.status(500).json({
      ok: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

app.post('/api/chat', async (req: Request, res: ExpressResponse) => {
  const requestId = Date.now()

  try {
    const { question, story, history } = req.body as ChatRequest

    console.log(`[${requestId}] Chat request - storyId: ${story?.id}`)

    if (!question || !story) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields: question and story are required'
      })
    }

    if (typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({
        ok: false,
        error: 'Question cannot be empty'
      })
    }

    if (question.length > 200) {
      return res.status(400).json({
        ok: false,
        error: 'Question too long'
      })
    }

    if (!story.surface || !Array.isArray(story.keyPoints) || story.keyPoints.length === 0) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid story data'
      })
    }

    const systemPrompt = buildSystemPrompt(story)

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt }
    ]

    if (history && Array.isArray(history) && history.length > 0) {
      history.slice(-10).forEach((msg) => {
        if (
          msg &&
          (msg.role === 'user' || msg.role === 'assistant') &&
          typeof msg.content === 'string' &&
          msg.content.trim()
        ) {
          messages.push({
            role: msg.role,
            content: msg.content.trim()
          })
        }
      })
    }

    messages.push({
      role: 'user',
      content: question.trim()
    })

    const aiContent = await callAIApi(messages, requestId)
    const validated = parseAndValidateResponse(aiContent)

    return res.json({
      ok: true,
      ...validated
    })
  } catch (error) {
    console.error(`[${requestId}] Chat error:`, error)

    return res.status(500).json({
      ok: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

app.use((_req: Request, res: ExpressResponse) => {
  res.status(404).json({
    ok: false,
    error: 'Not found'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API Key configured: ${process.env.API_KEY ? 'Yes' : 'No'}`)
  console.log(`API Model: ${process.env.API_MODEL || 'deepseek-chat'}`)
  console.log(`API Base URL: ${process.env.API_BASE_URL || 'https://api.deepseek.com'}`)
  console.log(`Allowed origins: ${ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS.join(', ') : 'ALL'}`)
})