import type { StoryDifficulty } from '../types/story'

const DIFFICULTY_META: Record<
  StoryDifficulty,
  { label: string; className: string }
> = {
  easy: { label: '简', className: 'archive-tag easy' },
  medium: { label: '中', className: 'archive-tag medium' },
  hard: { label: '难', className: 'archive-tag hard' },
  hell: { label: '狱', className: 'archive-tag hell' },
}

export default function DifficultyTag({ difficulty }: { difficulty: StoryDifficulty }) {
  const meta = DIFFICULTY_META[difficulty]
  return <span className={meta.className}>{meta.label}</span>
}
