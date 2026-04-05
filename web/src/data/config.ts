export const STORY_DIFFICULTY_LABEL: Record<
  'easy' | 'medium' | 'hard' | 'hell',
  string
> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  hell: '地狱',
}

export const MAX_HINT_COUNT = {
  light: 3,
  medium: 2,
  strong: 1,
} as const

