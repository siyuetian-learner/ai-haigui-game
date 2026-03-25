import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002

app.use(cors())
app.use(express.json())

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

function parseAndValidateResponse(content: string): { answerType: AiResponse['answerType'], content: string } {
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
      if (content && content.trim()) return content
      const reasoningContent = String(msg.reasoning_content || '')
      if (reasoningContent && reasoningContent.trim()) return reasoningContent
    } else if (choice.text) {
      return String(choice.text)
    }
  }

  if (data.text) {
    return String(data.text)
  }

  if (data.content) {
    return String(data.content)
  }

  if (data.reasoning_content) {
    return String(data.reasoning_content)
  }

  return ''
}

app.post('/api/ai/judge', async (req, res) => {
  const requestId = Date.now()

  try {
    const { systemPrompt, userPrompt, storyId, mode } = req.body as JudgeRequest

    console.log(`[${requestId}] Received request for story: ${storyId}, mode: ${mode}`)

    if (!systemPrompt || !userPrompt) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const apiKey = process.env.API_KEY
    const apiModel = process.env.API_MODEL || 'MiniMax-M2.7'
    const baseUrl = process.env.API_BASE_URL || 'https://wellapi.ai'
    const apiUrl = `${baseUrl}/v1/chat/completions`

    if (!apiKey) {
      console.error(`[${requestId}] API key not configured`)
      return res.status(500).json({ error: 'API key not configured' })
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]

    console.log(`[${requestId}] Calling AI API...`)
    console.log(`[${requestId}] Model: ${apiModel}`)
    console.log(`[${requestId}] URL: ${apiUrl}`)

    const response = await fetch(apiUrl, {
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
    })

    console.log(`[${requestId}] API Response Status: ${response.status}`)

    const responseText = await response.text()

    if (!response.ok) {
      console.error(`[${requestId}] AI API Error:`, response.status, responseText)
      return res.status(response.status).json({
        error: `API request failed: ${response.status}`,
        details: responseText
      })
    }

    let data: Record<string, unknown>
    try {
      data = JSON.parse(responseText)
    } catch {
      console.error(`[${requestId}] Failed to parse JSON response`)
      return res.status(500).json({ error: 'Invalid JSON response from API' })
    }

    const aiContent = extractAiContent(data)
    console.log(`[${requestId}] Extracted content:`, aiContent)

    if (!aiContent) {
      console.error(`[${requestId}] No content in API response`)
      return res.status(500).json({ error: 'No content in API response' })
    }

    const validated = parseAndValidateResponse(aiContent)
    console.log(`[${requestId}] Validated response:`, validated)

    res.json(validated)
  } catch (error) {
    console.error(`[${requestId}] Server error:`, error)
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Test endpoint working!',
    timestamp: Date.now(),
    status: 'ok'
  })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

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
  history?: Array<{ role: 'user' | 'assistant', content: string }>
}

function buildSystemPrompt(story: Story): string {
  return `你是海龟汤游戏的主持人。你的职责是根据故事设定判断玩家的问题是"是"、"否"还是"无关"。

## 故事设定（汤面）
${story.surface}

## 关键真相要素（用于判断）
${story.keyPoints.map((k, i) => `${i + 1}. ${k}`).join('\n')}

## 你的回答规则（必须严格遵守）
1. **只能回答一个字**：是 / 否 / 无关
2. **不得解释**：不要给出任何理由或长文本
3. **不得泄露**：不能透露故事结局或超出汤面的信息
4. **格式严格**：回答必须是"是"、"否"或"无关"之一，不能有其他内容

## 判断逻辑
- 如果问题与故事关键要素**直接相关**且**符合事实** → 回答"是"
- 如果问题与故事关键要素**直接相关**但**不符合事实** → 回答"否"
- 如果问题与故事关键要素**完全无关** → 回答"无关"
- 如果问题**不是是非类问题**（如开放式问题、选择问题）→ 回答"无关"`
}

async function callAIApi(messages: Array<{ role: string, content: string }>): Promise<string> {
  const apiKey = process.env.API_KEY
  const apiModel = process.env.API_MODEL || 'MiniMax-M2.7'
  const baseUrl = process.env.API_BASE_URL || 'https://wellapi.ai'
  const apiUrl = `${baseUrl}/v1/chat/completions`

  if (!apiKey) {
    throw new Error('API key not configured')
  }

  const response = await fetch(apiUrl, {
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
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API request failed: ${response.status} - ${errorText}`)
  }

  const data = await response.json() as Record<string, unknown>
  const content = extractAiContent(data)
  
  if (!content) {
    throw new Error('No content in API response')
  }

  return content
}

app.post('/api/chat', async (req, res) => {
  const requestId = Date.now()

  try {
    const { question, story, history } = req.body as ChatRequest

    console.log(`[${requestId}] Chat request for story: ${story?.id}`)
    console.log(`[${requestId}] Question: ${question}`)

    if (!question || !story) {
      return res.status(400).json({ error: 'Missing required fields: question and story are required' })
    }

    const systemPrompt = buildSystemPrompt(story)
    
    const messages: Array<{ role: string, content: string }> = [
      { role: 'system', content: systemPrompt }
    ]

    if (history && history.length > 0) {
      history.forEach(msg => {
        messages.push({ role: msg.role, content: msg.content })
      })
    }

    messages.push({ role: 'user', content: question })

    console.log(`[${requestId}] Calling AI API...`)
    
    const aiContent = await callAIApi(messages)
    console.log(`[${requestId}] AI response: ${aiContent}`)

    const validated = parseAndValidateResponse(aiContent)
    console.log(`[${requestId}] Validated response:`, validated)

    res.json(validated)
  } catch (error) {
    console.error(`[${requestId}] Server error:`, error)
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API Key configured: ${process.env.API_KEY ? 'Yes' : 'No'}`)
  console.log(`API Model: ${process.env.API_MODEL || 'MiniMax-M2.7'}`)
  console.log(`API Base URL: ${process.env.API_BASE_URL || 'https://wellapi.ai'}`)
})