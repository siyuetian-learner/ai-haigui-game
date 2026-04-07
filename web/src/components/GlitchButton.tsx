import type { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

interface GlitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string
  variant?: 'primary' | 'neutral'
}

export default function GlitchButton({
  className = '',
  to,
  variant = 'primary',
  children,
  ...rest
}: GlitchButtonProps) {
  const baseClass = 'seal-button text-xs tracking-wider'
  const variantClass = variant === 'primary' ? 'primary' : ''

  const combinedClass = [baseClass, variantClass, className].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        {children}
      </Link>
    )
  }

  return (
    <button {...rest} className={combinedClass}>
      {children}
    </button>
  )
}
