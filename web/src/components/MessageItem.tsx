import type { Message } from '../types/message'

export default function MessageItem({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'
  const isError = message.content.startsWith('抱歉')

  const getAvatar = () => {
    if (isUser) {
      return (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border border-[var(--border)] bg-[var(--bg-3)] text-[10px] font-medium text-[var(--text-h)]">
          U
        </div>
      )
    }
    if (isAssistant && !isError) {
      return (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] text-[10px] font-medium text-[var(--accent-2)]">
          AI
        </div>
      )
    }
    if (isError) {
      return (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border border-[var(--danger)] bg-[var(--bg-3)] text-[10px] font-medium text-red-400">
          !
        </div>
      )
    }
    return null
  }

  const getMessageStyle = () => {
    if (isUser) {
      return 'interrogation-bubble user text-sm text-[var(--text-h)]'
    }
    if (isAssistant && !isError) {
      return 'interrogation-bubble ai text-sm text-[var(--text-h)]'
    }
    if (isError) {
      return 'interrogation-bubble text-sm text-red-400 border-red-500/30 bg-red-500/5'
    }
    return 'interrogation-bubble text-sm text-[var(--text)]'
  }

  const getAnswerBadge = () => {
    if (message.answerType && isAssistant && !isError) {
      const badgeStyles: Record<string, string> = {
        yes: 'archive-tag easy',
        no: 'archive-tag hard',
        irrelevant: 'archive-tag',
        hint: 'archive-tag medium',
        summary: 'archive-tag',
      }
      const labels: Record<string, string> = {
        yes: '是',
        no: '否',
        irrelevant: '无关',
        hint: '提示',
        summary: '总结',
      }
      return (
        <span className={badgeStyles[message.answerType]}>
          {labels[message.answerType]}
        </span>
      )
    }
    return null
  }

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0">{getAvatar()}</div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1.5`}>
        {getAnswerBadge()}
        <div className={getMessageStyle()}>
          {message.content}
        </div>
      </div>
    </div>
  )
}
