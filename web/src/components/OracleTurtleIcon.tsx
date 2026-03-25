export default function OracleTurtleIcon({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  return (
    <span
      className={[
        'oracle-turtle',
        size === 'lg' ? 'oracle-turtle--lg' : 'oracle-turtle--sm',
      ].join(' ')}
      aria-hidden="true"
    >
      🐢
    </span>
  )
}

