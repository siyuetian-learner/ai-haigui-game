import { API_BASE_URL } from './config'

export interface Story {
 id: string
 title: string
 surface: string
 bottom: string
 keyPoints: string[]
 hints?: string[]
 difficulty: string
 category: string
}

export interface ChatHistoryItem {
 role: 'user' | 'assistant'
 content: string
}

export interface ChatResponse {
 ok: boolean
 answerType?: 'yes' | 'no' | 'irrelevant' | 'hint' | 'summary'
 content?: string
 error?: string
 message?: string
}

export async function sendChatMessage(params: {
 question: string
 story: Story
 history?: ChatHistoryItem[]
}): Promise<ChatResponse> {
 const response = await fetch(`${API_BASE_URL}/api/chat`, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify({
 question: params.question,
 story: params.story,
 history: params.history || []
 })
 })

 const data = await response.json()

 if (!response.ok) {
 throw new Error(data?.message || data?.error || '请求失败')
 }

 return data
}
