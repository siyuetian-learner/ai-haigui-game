import { Link } from 'react-router-dom'
import { STORIES } from '../data/stories'
import GameCard from '../components/GameCard'
import GlitchButton from '../components/GlitchButton'

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded border border-[var(--border)] bg-[var(--bg-2)] p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-bg)] via-transparent to-transparent opacity-50" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)] opacity-5 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[var(--accent-2)] opacity-5 blur-3xl" />

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-medium tracking-[-0.02em] text-[var(--text-h)] [text-shadow:0_0_40px_rgba(99,102,241,0.15)]">
              AI海龟汤
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--text)]">
              一桩谜案被写入档案。只有「是」「否」「无关」三个答案。{" "}
              <br className="hidden sm:block" />
              提出正确的问题，真相自会浮现。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <GlitchButton to="/guide" variant="neutral">
              调查员手册
            </GlitchButton>
            <GlitchButton
              to={`/game?storyId=${STORIES[0]?.id ?? ''}`}
              variant="primary"
            >
              进入异闻
            </GlitchButton>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-medium tracking-[0.2em] text-[var(--text)] uppercase">
          待解密档案
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {STORIES.map((story) => (
            <Link
              key={story.id}
              to={`/game?storyId=${story.id}`}
              className="block"
            >
              <GameCard story={story} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
