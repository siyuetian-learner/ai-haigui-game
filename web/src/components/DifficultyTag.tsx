import type { StoryDifficulty } from '../types/story'

const DIFFICULTY_META: Record<
  StoryDifficulty,
  { label: string; className: string }
> = {
  easy: { label: '简单', className: 'bg-emerald-500/15 text-emerald-200' },
  medium: { label: '中等', className: 'bg-sky-500/15 text-sky-200' },
  hard: { label: '困难', className: 'bg-violet-500/15 text-violet-200' },
  hell: { label: '地狱', className: 'bg-rose-500/15 text-rose-200' },
}

export default function DifficultyTag({ difficulty }: { difficulty: StoryDifficulty }) {
  const meta = DIFFICULTY_META[difficulty]
  return (
    <span
      className={[
        'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
        meta.className,
      ].join(' ')}
    >
      {meta.label}
    </span>
  )
}

