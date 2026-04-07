import { Link } from 'react-router-dom'
import { STORIES } from '../data/stories'
import type { Story } from '../types/story'
import BackgroundEffects from './BackgroundEffects'

export default function GameLobby() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050914] text-white relative">
      <BackgroundEffects />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="relative z-20 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 backdrop-blur-md sm:px-5">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-violet-400/15 bg-[radial-gradient(circle_at_30%_35%,rgba(110,67,255,0.9),rgba(54,18,99,0.65)_45%,rgba(7,10,20,0.9)_74%)] shadow-[0_0_24px_rgba(110,67,255,0.22)]">
              <div className="absolute inset-x-1 bottom-1 h-2 rounded-full bg-cyan-300/20 blur-sm" />
            </div>
            <div>
              <div className="text-xl font-semibold tracking-wide text-white">AI海龟汤</div>
              <div className="text-xs tracking-[0.28em] text-slate-300/50">MYSTIC CASES</div>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <GhostButton onClick={() => {}}>
              <Link to="/guide">新手引导</Link>
            </GhostButton>
            <GhostButton onClick={() => {}}>异闻档案</GhostButton>
          </nav>
        </header>

        <main className="flex flex-1 py-6 sm:py-8">
          <section className="w-full">
            <div className="mb-5 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,28,0.82),rgba(6,10,22,0.66))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs uppercase tracking-[0.34em] text-cyan-100/55">Archive Hall</p>
                  <h2 className="text-4xl font-semibold tracking-wide text-white">AI海龟汤</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200/78">
                    阅读「汤面」，用是非类问题逼近真相。AI 主持人只回答「是 / 否 / 无关」，帮你逐步还原事件。
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <GhostButton onClick={() => {}}>
                    <Link to="/">返回首页</Link>
                  </GhostButton>
                  <PrimaryButton onClick={() => {}}>
                    <Link to={`/game?storyId=${STORIES[0]?.id ?? ''}`}>直接开始（示例题）</Link>
                  </PrimaryButton>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between px-1">
              <p className="text-sm tracking-[0.18em] text-slate-300/60">当前已收录 {STORIES.length} 份异闻档案</p>
              <p className="text-sm tracking-[0.18em] text-slate-300/50">请选择一则案件进入调查</p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {STORIES.map((story: Story) => (
                <Link
                  key={story.id}
                  to={`/game?storyId=${story.id}`}
                  className="block"
                >
                  <CaseCard story={story} />
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function CaseCard({ story }: { story: Story }) {
  const difficultyColors: Record<string, string> = {
    '简单': 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100/85',
    '中等': 'border-amber-300/20 bg-amber-400/10 text-amber-100/85',
    '困难': 'border-orange-300/20 bg-orange-400/10 text-orange-100/85',
    '地狱': 'border-red-300/20 bg-red-400/10 text-red-100/85',
  }

  const difficultyColor = difficultyColors[story.difficulty] || difficultyColors['简单']

  return (
    <button
      className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,22,35,0.86),rgba(11,14,26,0.72))] p-6 text-left shadow-[0_16px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/15 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(103,232,249,0.08)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(104,87,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(95,196,255,0.06),transparent_22%)] opacity-70 transition duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl font-semibold tracking-wide text-white">{story.title}</h3>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-200/76">{story.surface}</p>
          </div>
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${difficultyColor}`}>
            {story.difficulty}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>{story.category}</Badge>
        </div>
      </div>
    </button>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300/85">
      {children}
    </span>
  )
}

function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-all hover:bg-white/10 hover:border-white/20"
    >
      {children}
    </button>
  )
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center rounded-[18px] border border-[#7a7dff]/30 bg-[linear-gradient(180deg,#0d1330,#0a1025)] px-6 py-3 shadow-[0_0_0_1px_rgba(122,125,255,0.12),0_10px_35px_rgba(56,66,150,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(146,150,255,0.2),0_18px_45px_rgba(70,97,215,0.45),0_0_32px_rgba(103,122,255,0.25)]"
    >
      <span className="relative z-10 flex items-center gap-2 text-base font-semibold tracking-wider text-cyan-50 drop-shadow-[0_0_12px_rgba(164,190,255,0.42)]">
        {children}
      </span>
    </button>
  )
}
