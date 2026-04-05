import type { ButtonHTMLAttributes } from 'react'

export default function GlitchButton({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={[
        'rounded-xl border border-white/10 bg-violet-500/20 px-4 py-2 text-sm text-violet-100 hover:bg-violet-500/30',
        className ?? '',
      ].join(' ')}
    />
  )
}

