export type AiAnswerType = 'yes' | 'no' | 'irrelevant' | 'hint' | 'summary'

export type AiJudgeResponse = {
  answerType: AiAnswerType
  content: string
  isValidMatch?: boolean
  warning?: string
}

