export type MessageRole = 'user' | 'assistant' | 'system'
export type AnswerType = 'yes' | 'no' | 'irrelevant' | 'hint' | 'summary'

export type Message = {
  id: string
  role: MessageRole
  content: string
  createdAt: number
  answerType?: AnswerType
}

