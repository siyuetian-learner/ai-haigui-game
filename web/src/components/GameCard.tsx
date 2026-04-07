import type { Story } from '../types/story'
import DifficultyTag from './DifficultyTag'

export default function GameCard({ story }: { story: Story }) {
  return (
    <article className="archive-card group cursor-pointer p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-medium text-[var(--text-h)] transition-colors group-hover:text-[var(--accent-2)]">
            {story.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text)]">
            {story.surface}
          </p>
        </div>
        <DifficultyTag difficulty={story.difficulty} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {story.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="archive-tag text-[10px]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text)] opacity-0 transition-opacity group-hover:opacity-60">
        <span className="tracking-wider">开启调查</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </article>
  )
}
