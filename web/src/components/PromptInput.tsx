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
            className="query-input w-full resize-none"
            style={{ minHeight: '44px' }}
          />
          {disabled && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border border-[var(--border)] border-t-[var(--accent)]" />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled || value.trim().length === 0}
          className="seal-button flex items-center justify-center px-4"
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
