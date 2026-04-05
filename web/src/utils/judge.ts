import type { AnswerType } from '../types/message'

export function normalizeAiAnswerType(raw: string): AnswerType {
  const t = raw.trim()
  if (t === '是' || t === 'yes') return 'yes'
  if (t === '否' || t === 'no') return 'no'
  if (t === '无关' || t === 'irrelevant') return 'irrelevant'
  if (t === '提示' || t === 'hint') return 'hint'
  if (t === '总结' || t === 'summary') return 'summary'
  return 'irrelevant'
}

