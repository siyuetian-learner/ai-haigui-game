/**
 * 简化校验：MVP 先确保问题长度合规。
 * 后续可在后端增加更严格的“是非问题”裁判。
 */
export function isValidYesNoQuestion(question: string) {
  const trimmed = question.trim()
  if (!trimmed) return false
  if (trimmed.length < 2) return false
  if (trimmed.length > 120) return false
  return true
}

