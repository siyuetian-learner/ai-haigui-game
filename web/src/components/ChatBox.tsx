import { useRef, useEffect, useState } from 'react'
import type { Message } from '../types/message'
import MessageItem from './MessageItem'
import PromptInput from './PromptInput'

interface ChatBoxProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  disabled?: boolean
}

export default function ChatBox({ messages, onSendMessage, disabled }: ChatBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    setIsEmpty(messages.length === 0)
  }, [messages])

  const handleSubmit = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  const isThinking = disabled && messages.length > 0 && messages[messages.length - 1]?.content === '思考中...'

  return (
    <div className="flex h-full flex-col">
      <div
        ref={containerRef}
        className="flex-1 space-y-4 overflow-y-auto pr-2"
      >
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-white/5 p-4">
              <svg className="h-12 w-12 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-white/70">开始你的推理</h3>
            <p className="max-w-xs text-sm text-white/40">
              输入是非类问题，比如"门是关着的吗？"或"那个人认识我吗？"
            </p>
          </div>
        ) : (
          <>
            {messages.map((m, index) => (
              <div
                key={m.id}
                className="animate-slide-up"
                style={{ animationDelay: `${Math.min(index * 50, 200)}ms` }}
              >
                <MessageItem message={m} />
              </div>
            ))}

            {isThinking && (
              <div className="flex items-end gap-2 animate-slide-up">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg className="h-5 w-5 animate-bounce text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-400/20 px-4 py-3">
                    <span className="text-sm text-white/90">思考中</span>
                    <span className="thinking-dots text-sm text-emerald-400" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-3 flex-shrink-0">
        <PromptInput
          value={input}
          placeholder={disabled ? "等待回复..." : "输入你的问题..."}
          disabled={disabled}
          onChange={setInput}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}