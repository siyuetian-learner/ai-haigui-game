import type { AiAnswerType, AiJudgeResponse } from '../types/api'
import type { Message } from '../types/message'
import type { Story } from '../types/story'

export type AiMode = 'judge' | 'hint' | 'summary'

const API_BASE_URL = import.meta.env.VITE_AI_API_URL || '/api'
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000

export class AiServiceError extends Error {
  code: string
  statusCode?: number

  constructor(message: string, code: string, statusCode?: number) {
    super(message)
    this.name = 'AiServiceError'
    this.code = code
    this.statusCode = statusCode
  }
}

interface AskAIParams {
  story: Story
  question: string
  history: Message[]
  mode: AiMode
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new AiServiceError('请求超时，请稍后重试', 'TIMEOUT_ERROR')
    }
    throw error
  }
}

function parseAndValidateResponse(
  content: string,
  fallbackAnswerType: AiAnswerType
): AiJudgeResponse {
  const trimmed = content.trim()

  const yesPatterns = ['是', 'yes', 'Yes', 'YES', '对', '正确', '的确', '是的']
  const noPatterns = ['否', 'no', 'No', 'NO', '不是', '错', '错误', '没有', '不对']
  const irrelevantPatterns = ['无关', 'irrelevant', 'Irrelevant', '没关系', '无意义', '不相关']

  const cleanMatch = (str: string, patterns: string[]): boolean => {
    return patterns.some((p) => {
      const cleanStr = str.replace(/[。，！？、,!?]/g, '').trim()
      return cleanStr === p || cleanStr.startsWith(p)
    })
  }

  if (cleanMatch(trimmed, yesPatterns)) {
    return { answerType: 'yes', content: '是', isValidMatch: true }
  }

  if (cleanMatch(trimmed, noPatterns)) {
    return { answerType: 'no', content: '否', isValidMatch: true }
  }

  if (cleanMatch(trimmed, irrelevantPatterns)) {
    return { answerType: 'irrelevant', content: '无关', isValidMatch: true }
  }

  return {
    answerType: fallbackAnswerType,
    content: fallbackAnswerType === 'yes' ? '是' : fallbackAnswerType === 'no' ? '否' : '无关',
    isValidMatch: false,
    warning: 'AI回答不规范，已使用默认回答。请用"是"或"否"格式提问。',
  }
}

function validateResponse(data: unknown): AiJudgeResponse {
  if (!data || typeof data !== 'object') {
    throw new AiServiceError('无效的响应格式', 'INVALID_RESPONSE')
  }

  const response = data as Record<string, unknown>

  const validAnswerTypes: AiAnswerType[] = ['yes', 'no', 'irrelevant', 'hint', 'summary']

  if (!response.answerType || !validAnswerTypes.includes(response.answerType as AiAnswerType)) {
    throw new AiServiceError('响应中缺少有效的answerType', 'MISSING_ANSWER_TYPE')
  }

  if (typeof response.content !== 'string') {
    throw new AiServiceError('响应中缺少有效的content', 'MISSING_CONTENT')
  }

  const parsed = parseAndValidateResponse(response.content, response.answerType as AiAnswerType)
  return parsed
}

export async function askAI(params: AskAIParams): Promise<AiJudgeResponse> {
  const { story, question, history } = params

  if (!question.trim()) {
    throw new AiServiceError('问题不能为空', 'EMPTY_QUESTION')
  }

  if (!story || !story.id) {
    throw new AiServiceError('故事信息无效', 'INVALID_STORY')
  }

  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          story,
          history: history.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      },
      API_TIMEOUT
    )

    if (!response.ok) {
      throw new AiServiceError(
        `API请求失败: ${response.status}`,
        'API_ERROR',
        response.status
      )
    }

    const data = await response.json()
    return validateResponse(data)
  } catch (error) {
    if (error instanceof AiServiceError) {
      throw error
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new AiServiceError('网络连接失败，请检查网络', 'NETWORK_ERROR')
    }

    console.error('[AI Service] Unexpected error:', error)
    throw new AiServiceError(
      error instanceof Error ? error.message : '未知错误，请稍后重试',
      'UNKNOWN_ERROR'
    )
  }
}

export async function judgeQuestionWithAi(params: {
  story: Story
  question: string
  history: Message[]
}): Promise<AiJudgeResponse> {
  return askAI({
    ...params,
    mode: 'judge'
  })
}

export async function getHintFromAi(params: {
  story: Story
  question: string
  history: Message[]
}): Promise<AiJudgeResponse> {
  return askAI({
    ...params,
    mode: 'hint'
  })
}

export async function getSummaryFromAi(params: {
  story: Story
  question: string
  history: Message[]
}): Promise<AiJudgeResponse> {
  return askAI({
    ...params,
    mode: 'summary'
  })
}
