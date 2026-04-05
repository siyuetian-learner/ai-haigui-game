import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { STORIES } from '../data/stories'
import TurtleIcon from '../components/TurtleIcon'
import BrokenButton from '../components/BrokenButton'
import TypewriterText from '../components/TypewriterText'

export default function Result() {
  const [searchParams] = useSearchParams()

  const storyId = searchParams.get('storyId') ?? ''
  const abandoned = searchParams.get('abandoned') === '1'

  const [showContent, setShowContent] = useState(false)
  const [showKeyPoints, setShowKeyPoints] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const story = useMemo(
    () => STORIES.find((s) => s.id === storyId),
    [storyId],
  )

  useEffect(() => {
    if (!story) return

    const timer1 = setTimeout(() => setShowContent(true), 300)
    const timer2 = setTimeout(() => setShowKeyPoints(true), 1500)
    const timer3 = setTimeout(() => setShowActions(true), 2200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [story])

  if (!story) {
    return (
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">未找到该结局</h2>
        <BrokenButton to="/" variant="neutral" className="text-sm font-medium">
          返回大厅
        </BrokenButton>
      </div>
    )
  }

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
          <TurtleIcon />
          汤底揭晓
        </h2>
        <p className="mt-1 text-sm text-white/70">
          {abandoned ? '已结束对局' : '你已解开谜题'}
        </p>

        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-white/90">{story.title}</h3>
            <span className="ml-auto text-xs text-white/50">
              {story.difficulty} / {story.category}
            </span>
          </div>

          {showContent ? (
            <div className="relative mt-3 overflow-hidden rounded-lg border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute -top-10 -left-10 h-20 w-20 rounded-full bg-purple-500/10 blur-2xl" />
              <div className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full bg-indigo-500/10 blur-2xl" />
              <div className="relative">
                <TypewriterText
                  text={story.bottom}
                  speed={20}
                  className="whitespace-pre-wrap text-sm leading-relaxed text-white/90"
                />
              </div>
            </div>
          ) : (
            <div className="mt-3 flex h-32 items-center justify-center">
              <div className="h-2 w-48 rounded-full bg-white/10">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
              </div>
            </div>
          )}
        </div>

        {showKeyPoints && (
          <div className="mt-4 space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white/90">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              关键线索
            </h3>
            <ul className="space-y-2">
              {story.keyPoints.map((k, index) => (
                <li
                  key={k}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showActions && (
          <div className="mt-5 flex flex-wrap gap-3">
            <BrokenButton
              to={`/game?storyId=${story.id}`}
              variant="primary"
              className="text-sm font-medium"
            >
              再来一局
            </BrokenButton>
            <BrokenButton to="/" variant="neutral" className="text-sm font-medium">
              返回大厅
            </BrokenButton>
          </div>
        )}
      </div>

      {abandoned && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm text-amber-200/80">
            你选择了中途退出，错过了揭晓真相的机会。但别灰心，随时可以再来一局！
          </p>
        </div>
      )}
    </section>
  )
}