import { useMemo, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { STORIES } from '../data/stories'
import type { Message } from '../types/message'
import { askAI, AiServiceError } from '../services/ai'
import BrokenButton from './BrokenButton'
import ChatBox from './ChatBox'

export type GameStatus = 'playing' | 'abandoned' | 'finished'

interface GameInterfaceProps {
  storyId: string
}

export default function GameInterface({ storyId }: GameInterfaceProps) {
  const navigate = useNavigate()

  const story = useMemo(
    () => STORIES.find((s) => s.id === storyId),
    [storyId],
  )

  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAbandonDialog, setShowAbandonDialog] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected')

  useEffect(() => {
    if (story) {
      setMessages([
        {
          id: 'm-hello',
          role: 'assistant',
          createdAt: Date.now(),
          answerType: 'summary',
          content: '欢迎进入对局。请提出是/否类问题开始推理。',
        },
      ])
      setGameStatus('playing')
      setShowAbandonDialog(false)
    }
  }, [story])

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
      let isNetworkError = false

      if (err instanceof AiServiceError) {
        errorMessage = err.message
        isNetworkError = err.code === 'NETWORK_ERROR' || err.code === 'TIMEOUT_ERROR'
      } else if (err instanceof Error) {
        errorMessage = err.message
        isNetworkError = err.message.includes('fetch') || err.message.includes('network')
      } else {
        errorMessage = '发送失败，请稍后重试'
      }

      if (isNetworkError) {
        setConnectionStatus('disconnected')
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
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">未找到该题目</h2>
        <p className="text-white/70">请回到大厅重新选择。</p>
        <BrokenButton
          variant="neutral"
          className="text-sm font-medium"
          onClick={() => navigate('/')}
        >
          返回大厅
        </BrokenButton>
      </div>
    )
  }

  return (
    <section className="flex h-[calc(100vh-140px)] flex-col space-y-4">
      <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-white">{story.title}</h2>
              {gameStatus === 'playing' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  进行中
                </span>
              )}
              {gameStatus === 'abandoned' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                  已放弃
                </span>
              )}
              {gameStatus === 'finished' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300">
                  已结束
                </span>
              )}
            </div>
            {connectionStatus !== 'connected' && (
              <div className="mt-1 flex items-center gap-1.5 text-xs">
                {connectionStatus === 'disconnected' ? (
                  <button
                    onClick={() => {
                      setConnectionStatus('reconnecting')
                      window.location.reload()
                    }}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.58 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
                    </svg>
                    连接断开 - 点击重试
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-amber-400">
                    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    重连中...
                  </span>
                )}
              </div>
            )}
            <p className="text-sm text-white/70">
              难度：{story.difficulty} / 题材：{story.category}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BrokenButton
              onClick={handleViewResult}
              className="text-sm font-medium"
              variant="neutral"
            >
              查看汤底
            </BrokenButton>
            <BrokenButton
              onClick={() => setShowAbandonDialog(true)}
              className="text-sm font-medium"
              variant="danger"
              disabled={gameStatus !== 'playing'}
            >
              结束游戏
            </BrokenButton>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
          <h3 className="text-sm font-semibold text-white/90">汤面</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm text-white/75">
            {story.surface}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-2xl border border-white/10 bg-white/5 p-4">
        <ChatBox
          messages={messages}
          onSendMessage={handleSendMessage}
          disabled={isLoading || gameStatus !== 'playing'}
        />
      </div>

      {gameStatus !== 'playing' && (
        <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4">
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
              <BrokenButton
                onClick={() => navigate(`/game?storyId=${story.id}`)}
                variant="primary"
                className="text-sm font-medium"
              >
                再来一局
              </BrokenButton>
              <BrokenButton
                onClick={() => navigate('/')}
                variant="neutral"
                className="text-sm font-medium"
              >
                返回大厅
              </BrokenButton>
            </div>
          </div>
        </div>
      )}

      {showAbandonDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-[#1a1a2e] p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white">确认放弃游戏？</h3>
            <p className="mt-2 text-sm text-white/70">
              如果你放弃本次对局，将无法获得完整推理评价。确定要退出吗？
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <BrokenButton
                onClick={() => setShowAbandonDialog(false)}
                variant="neutral"
                className="text-sm font-medium"
              >
                继续游戏
              </BrokenButton>
              <BrokenButton
                onClick={handleConfirmAbandon}
                variant="danger"
                className="text-sm font-medium"
              >
                确认放弃
              </BrokenButton>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
