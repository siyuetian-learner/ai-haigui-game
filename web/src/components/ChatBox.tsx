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
            <div className="mb-6 rounded border border-[var(--border)] bg-[var(--bg-2)] p-5">
              <svg className="h-10 w-10 text-[var(--text)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <h3 className="mb-2 text-sm font-medium tracking-wider text-[var(--text-h)]">
              请开始提问
            </h3>
            <p className="max-w-xs text-xs leading-relaxed text-[var(--text)] opacity-70">
              输入是非类问题，如"门是关着的吗"
            </p>
          </div>
        ) : (
          <>
            {messages.map((m, index) => (
              <div
                key={m.id}
                className="reveal-up"
                style={{ animationDelay: `${Math.min(index * 30, 200)}ms` }}
              >
                <MessageItem message={m} />
              </div>
            ))}

            {isThinking && (
              <div className="flex items-end gap-2 reveal-up">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] text-[10px] font-medium text-[var(--accent-2)]">
                  AI
                </div>
                <div className="thinking-indicator interrogation-bubble ai">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-4 border-t border-[var(--border)] pt-4">
        <PromptInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          disabled={disabled}
          placeholder="输入你的问题..."
        />
      </div>
    </div>
  )
}
