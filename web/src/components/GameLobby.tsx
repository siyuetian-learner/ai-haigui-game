import { Link } from 'react-router-dom'
import { STORIES } from '../data/stories'
import GameCard from './GameCard'
import BrokenButton from './BrokenButton'

export default function GameLobby() {
  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">AI海龟汤</h1>
          <p className="text-white/70">
            阅读「汤面」，用是非类问题提问。AI 主持人只回答「是 / 否 /
            无关」，帮你逐步还原真相。
          </p>
          <div className="flex flex-wrap gap-3">
            <BrokenButton to="/guide" className="text-sm font-medium" variant="neutral">
              新手引导
            </BrokenButton>
            <BrokenButton
              to={`/game?storyId=${STORIES[0]?.id ?? ''}`}
              className="text-sm font-medium"
              variant="primary"
            >
              直接开始（示例题）
            </BrokenButton>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 transition-all hover:bg-purple-500/20 hover:border-purple-400/40"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="hidden sm:inline">欢迎页</span>
        </Link>
      </div>

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
    </section>
  )
}
