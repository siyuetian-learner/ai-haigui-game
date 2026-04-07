import { useMemo, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { STORIES } from '../data/stories'
import type { Story } from '../types/story'
import type { Message } from '../types/message'
import { askAI, AiServiceError } from '../services/ai'
import BackgroundEffects from './BackgroundEffects'
import { SendIcon } from './BackgroundEffects'

export type GameStatus = 'playing' | 'abandoned' | 'finished'

interface GameInterfaceProps {
  storyId: string
}

export default function GameInterface({ storyId }: GameInterfaceProps) {
  const navigate = useNavigate()

  const story = useMemo(
    () => STORIES.find((s: Story) => s.id === storyId),
    [storyId],
  )

  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAbandonDialog, setShowAbandonDialog] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    if (story) {
      setMessages([
        {
          id: 'm-hello',
          role: 'assistant',
          createdAt: Date.now(),
          answerType: 'summary',
          content: '档案已开启。请发问，但别太早相信你的直觉。',
        },
        {
          id: 'm-surface',
          role: 'assistant',
          createdAt: Date.now() + 1,
          answerType: 'summary',
          content: `汤面：${story.surface}`,
        },
      ])
      setGameStatus('playing')
      setShowAbandonDialog(false)
    }
  }, [story])

  const progress = useMemo(() => Math.min(92, 18 + messages.length * 8), [messages.length])

  const handleSendMessage = useCallback(async (content: string) => {
    if (!story || isLoading || gameStatus !== 'playing') return

    const userMessage: Message = {
      id: `m-user-${Date.now()}`,
      role: 'user',
      createdAt: Date.now(),
      content: content,
    }

    const thinkingMessage: Message = {
      id: `m-thinking-${Date.now()}`,
      role: 'assistant',
      createdAt: Date.now() + 1,
      answerType: undefined,
      content: '思考中...',
    }

    setMessages((prev) => [...prev, userMessage, thinkingMessage])
    setIsLoading(true)
    setInput('')

    try {
      const aiResponse = await askAI({
        story,
        question: content,
        history: messages,
        mode: 'judge',
      })

      const aiMessage: Message = {
        id: `m-assistant-${Date.now() + 2}`,
        role: 'assistant',
        createdAt: Date.now() + 2,
        content: aiResponse.content,
        answerType: aiResponse.answerType,
      }

      if (aiResponse.warning) {
        const warningMessage: Message = {
          id: `m-warning-${Date.now() + 3}`,
          role: 'assistant',
          createdAt: Date.now() + 3,
          content: aiResponse.warning,
          answerType: undefined,
        }
        setMessages((prev) => {
          const withoutThinking = prev.filter((m) => m.id !== thinkingMessage.id)
          return [...withoutThinking, aiMessage, warningMessage]
        })
      } else {
        setMessages((prev) => {
          const withoutThinking = prev.filter((m) => m.id !== thinkingMessage.id)
          return [...withoutThinking, aiMessage]
        })
      }
    } catch (err) {
      let errorMessage: string

      if (err instanceof AiServiceError) {
        errorMessage = err.message
      } else if (err instanceof Error) {
        errorMessage = err.message
      } else {
        errorMessage = '发送失败，请稍后重试'
      }

      const errorAiMessage: Message = {
        id: `m-error-${Date.now() + 2}`,
        role: 'assistant',
        createdAt: Date.now() + 2,
        answerType: undefined,
        content: `抱歉，${errorMessage}`,
      }

      setMessages((prev) => {
        const withoutThinking = prev.filter((m) => m.id !== thinkingMessage.id)
        return [...withoutThinking, errorAiMessage]
      })
    } finally {
      setIsLoading(false)
    }
  }, [story, messages, isLoading, gameStatus])

  const handleSubmit = useCallback(() => {
    if (input.trim() && !isLoading && gameStatus === 'playing') {
      handleSendMessage(input.trim())
    }
  }, [input, isLoading, gameStatus, handleSendMessage])

  const handleViewResult = () => {
    if (story) {
      navigate(`/result?storyId=${story.id}`)
    }
  }

  const handleAbandonGame = () => {
    if (story) {
      setGameStatus('abandoned')
      navigate(`/result?storyId=${story.id}&abandoned=1`)
    }
  }

  const handleConfirmAbandon = () => {
    setShowAbandonDialog(false)
    handleAbandonGame()
  }

  if (!story) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#050914] text-white relative">
        <BackgroundEffects />
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-semibold text-white">未找到该题目</h2>
            <p className="text-white/70">请回到大厅重新选择。</p>
            <GhostButton onClick={() => navigate('/home')}>返回大厅</GhostButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#050914] text-white relative">
      <BackgroundEffects />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <main className="flex flex-1 flex-col gap-5 py-6 sm:py-8">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,16,30,0.84),rgba(8,12,24,0.68))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl font-semibold tracking-wide text-white">{story.title}</h2>
                  {gameStatus === 'playing' && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-100/85">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]" />
                      进行中
                    </span>
                  )}
                  {gameStatus === 'abandoned' && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-400/10 px-3 py-1 text-sm text-amber-100/85">
                      已放弃
                    </span>
                  )}
                  {gameStatus === 'finished' && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-300/15 bg-purple-400/10 px-3 py-1 text-sm text-purple-100/85">
                      已结束
                    </span>
                  )}
                </div>
                <p className="text-lg text-slate-300/75">难度：{story.difficulty} / 题材：{story.category}</p>

                <div className="mt-5 rounded-[22px] border border-white/8 bg-black/18 px-5 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <div className="mb-3 text-2xl font-semibold text-slate-100">汤面</div>
                  <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-200/82">{story.surface}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <GhostButton onClick={handleViewResult}>查看汤底</GhostButton>
                <DangerButton onClick={() => setShowAbandonDialog(true)} disabled={gameStatus !== 'playing'}>结束游戏</DangerButton>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="flex min-h-[620px] flex-col rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,32,0.86),rgba(10,13,25,0.72))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between px-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/15 bg-blue-400/10 px-3 py-1 text-sm text-blue-100/85">
                  🗒️ 总结
                </span>
                <span className="text-xs tracking-[0.24em] text-slate-400/60">INTERROGATION TERMINAL</span>
              </div>

              <div className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-1 space-y-4 overflow-y-auto px-1 py-2">
                {messages.map((message: Message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>

              <div className="mt-4 rounded-[22px] border border-white/8 bg-black/18 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="flex items-center gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="输入你的问题…"
                    disabled={isLoading || gameStatus !== 'playing'}
                    className="h-14 flex-1 rounded-2xl border border-white/8 bg-[#090d18] px-5 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/25 focus:shadow-[0_0_0_1px_rgba(103,232,249,0.12),0_0_18px_rgba(34,211,238,0.1)] disabled:opacity-50"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || gameStatus !== 'playing'}
                    className="group inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/18 bg-[linear-gradient(180deg,#3f2b77,#2b1d55)] text-slate-100 shadow-[0_10px_24px_rgba(59,39,128,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(76,60,170,0.42)] disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <InfoPanel title="调查进度" subtitle="真相浓度">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300/75">
                  <span>已推进线索</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,rgba(90,130,255,0.8),rgba(110,240,255,0.78))] shadow-[0_0_18px_rgba(110,240,255,0.35)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </InfoPanel>

              <InfoPanel title="案件标签" subtitle="异常记录">
                <div className="flex flex-wrap gap-2">
                  <Badge>{story.difficulty}</Badge>
                  <Badge>{story.category}</Badge>
                </div>
              </InfoPanel>

              <InfoPanel title="提示" subtitle="主持人低语">
                <p className="text-sm leading-7 text-slate-300/78">
                  先确认人物、时间、地点是否真实存在，再去追问"为什么会这样"。很多汤面的异常感来自叙述误导，而不是超自然现象。
                </p>
              </InfoPanel>
            </div>
          </div>

          {gameStatus !== 'playing' && (
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,16,30,0.84),rgba(8,12,24,0.68))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {gameStatus === 'abandoned' ? '你已放弃本次对局' : '游戏已结束'}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    {gameStatus === 'abandoned'
                      ? '很遗憾你选择了中途退出，但随时可以再来一局！'
                      : '恭喜你完成了本次推理！'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <PrimaryButton onClick={() => navigate(`/game?storyId=${story.id}`)}>再来一局</PrimaryButton>
                  <GhostButton onClick={() => navigate('/home')}>返回大厅</GhostButton>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {showAbandonDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-[#1a1a2e] p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white">确认放弃游戏？</h3>
            <p className="mt-2 text-sm text-white/70">
              如果你放弃本次对局，将无法获得完整推理评价。确定要退出吗？
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <GhostButton onClick={() => setShowAbandonDialog(false)}>继续游戏</GhostButton>
              <DangerButton onClick={handleConfirmAbandon}>确认放弃</DangerButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[72%] rounded-[20px] border border-violet-300/14 bg-[linear-gradient(180deg,rgba(74,49,132,0.3),rgba(41,26,77,0.22))] px-5 py-4 text-base leading-8 text-slate-100/90 shadow-[0_14px_28px_rgba(56,36,102,0.22)]">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/14 bg-cyan-300/10 text-lg shadow-[0_0_22px_rgba(34,211,238,0.18)]">
        ✦
      </div>
      <div className="max-w-[78%] rounded-[20px] border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(16,27,47,0.84),rgba(11,18,34,0.65))] px-5 py-4 text-base leading-8 text-slate-100/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        {message.content}
      </div>
    </div>
  )
}

function InfoPanel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,31,0.8),rgba(10,13,24,0.68))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-4">
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.28em] text-slate-400/60">{subtitle}</div>
      </div>
      {children}
    </div>
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

function DangerButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition-all hover:bg-red-500/20 hover:border-red-400/30 disabled:opacity-40 disabled:hover:translate-y-0"
    >
      {children}
    </button>
  )
}
