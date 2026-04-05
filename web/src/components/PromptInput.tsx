export default function PromptInput(props: {
  value: string
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}) {
  const { value, onChange, onSubmit, placeholder, disabled } = props

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && value.trim().length > 0) {
        onSubmit()
      }
    }
  }

  return (
    <div className="relative">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!disabled) onSubmit()
        }}
      >
        <div className="relative flex-1">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 pr-12 text-sm text-white placeholder:text-white/40 transition-all focus:border-violet-500/40 focus:bg-black/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ minHeight: '44px' }}
          />
          {disabled && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-violet-400" />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled || value.trim().length === 0}
          className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500/30 to-purple-500/30 px-5 py-3 text-sm font-medium text-violet-100 transition-all hover:from-violet-500/40 hover:to-purple-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ minHeight: '44px' }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  )
}