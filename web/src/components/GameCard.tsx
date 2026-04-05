import type { Story } from '../types/story'
import DifficultyTag from './DifficultyTag'

export default function GameCard({ story }: { story: Story }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-shadow duration-200 hover:border-violet-400/25 hover:shadow-[0_0_24px_rgba(192,132,252,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">{story.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/70">{story.surface}</p>
        </div>
        <DifficultyTag difficulty={story.difficulty} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {story.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

