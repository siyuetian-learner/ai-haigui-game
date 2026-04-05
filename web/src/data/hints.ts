export type HintLevel = 'light' | 'medium' | 'strong'

export function getDefaultHintLevel(level: HintLevel) {
  if (level === 'light') return '轻提示'
  if (level === 'medium') return '中提示'
  return '强提示'
}

