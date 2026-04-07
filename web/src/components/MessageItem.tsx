import type { Message } from '../types/message'

export default function MessageItem({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'
  const isError = message.content.startsWith('抱歉')

  const getAvatar = () => {
    if (isUser) {
      return (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-medium text-white shadow-lg shadow-violet-500/20">
          U
        </div>
      )
    }
    if (isAssistant && !isError) {
      return (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 shadow-lg shadow-emerald-500/10">
          <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      )
    }
    if (isError) {
      return (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500/30 to-red-600/20 shadow-lg shadow-red-500/10">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
      )
    }
    return null
  }

  const getMessageStyle = () => {
    if (isUser) {
      return 'bg-gradient-to-br from-violet-500/30 to-violet-600/20 border border-violet-400/30 text-violet-100 shadow-lg shadow-violet-500/10'
    }
    if (isAssistant && !isError) {
      return 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-400/20 text-white/90 shadow-lg shadow-emerald-500/5'
    }
    if (isError) {
      return 'bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-400/20 text-red-100/90 shadow-lg shadow-red-500/5'
    }
    return 'bg-white/5 border border-white/10 text-white/70'
  }

  const getAnswerBadge = () => {
    if (message.answerType && isAssistant && !isError) {
      const badgeStyles = {
        yes: 'bg-emerald-500/40 text-emerald-200 border border-emerald-400/40 shadow-lg shadow-emerald-500/20',
        no: 'bg-red-500/40 text-red-200 border border-red-400/40 shadow-lg shadow-red-500/20',
        irrelevant: 'bg-gray-500/40 text-gray-200 border border-gray-400/40',
        hint: 'bg-amber-500/40 text-amber-200 border border-amber-400/40 shadow-lg shadow-amber-500/20',
        summary: 'bg-blue-500/40 text-blue-200 border border-blue-400/40 shadow-lg shadow-blue-500/20',
      }
      const labels = {
        yes: '是',
        no: '否',
        irrelevant: '无关',
        hint: '💡 提示',
        summary: '📋 总结',
      }
      return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyles[message.answerType]}`}>
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
        <div
          className={`inline-block max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${getMessageStyle()}`}
          style={{
            borderRadius: isUser ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
          }}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}