import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type BrokenButtonVariant = 'primary' | 'danger' | 'neutral'

type BrokenButtonProps = {
  children: ReactNode
  to?: string
  variant?: BrokenButtonVariant
  className?: string
  disabled?: boolean
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled'>

export default function BrokenButton({
  children,
  to,
  variant = 'neutral',
  className,
  disabled,
  ...buttonProps
}: BrokenButtonProps) {
  const base = ['broken-btn', `broken-btn--${variant}`]
  const cls = [...base, className ?? ''].join(' ').trim()

  if (to) {
    return (
      <Link
        to={disabled ? '#' : to}
        className={disabled ? `${cls} pointer-events-none opacity-60` : cls}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    )
  }

  return (
    <button disabled={disabled} className={cls} {...buttonProps}>
      {children}
    </button>
  )
}

