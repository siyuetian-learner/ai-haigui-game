export default function OracleTurtleIcon({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  return (
    <span
      className={[
        'oracle-turtle-icon',
        size === 'lg' ? 'oracle-turtle-icon--lg' : 'oracle-turtle-icon--sm',
      ].join(' ')}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 96 96"
        className="oracle-turtle-icon__svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="oracleTurtleGreenGradient" x1="24" y1="14" x2="72" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d8ffe7" />
            <stop offset="38%" stopColor="#79ff9f" />
            <stop offset="72%" stopColor="#28df64" />
            <stop offset="100%" stopColor="#11b84a" />
          </linearGradient>
        </defs>

        <rect x="6" y="6" width="84" height="84" rx="24" className="oracle-turtle-icon__bg" />

        <g className="oracle-turtle-icon__glow">
          <path
            d="M48 24C38.5 24 30.7 28.8 26.8 36.8C23 44.6 23 53.6 26.8 61.3C30.7 69.2 38.5 74 48 74C57.5 74 65.3 69.2 69.2 61.3C73 53.6 73 44.6 69.2 36.8C65.3 28.8 57.5 24 48 24Z"
            className="oracle-turtle-icon__shell"
          />

          <path
            d="M48 34.5C41.7 34.5 36.5 39.4 36.5 45.7C36.5 52 41.7 57.2 48 57.2C54.3 57.2 59.5 52 59.5 45.7C59.5 39.4 54.3 34.5 48 34.5Z"
            className="oracle-turtle-icon__spiral-base"
          />
          <path
            d="M48 39.5C44.4 39.5 41.8 42 41.8 45C41.8 47.8 44.1 50.1 47.1 50.1C49.8 50.1 52 48.3 52 46C52 43.9 50.4 42.4 48.3 42.4C46.7 42.4 45.6 43.4 45.6 44.9C45.6 46 46.5 46.8 47.5 46.8C48.3 46.8 48.9 46.4 49.3 45.9"
            className="oracle-turtle-icon__spiral"
          />

          <circle cx="48" cy="18" r="8" className="oracle-turtle-icon__head" />
          <circle cx="44.5" cy="17.5" r="1.5" className="oracle-turtle-icon__eye" />
          <circle cx="51.5" cy="17.5" r="1.5" className="oracle-turtle-icon__eye" />

          <rect x="21" y="40" width="10" height="12" rx="5" className="oracle-turtle-icon__limb" />
          <rect x="65" y="40" width="10" height="12" rx="5" className="oracle-turtle-icon__limb" />
          <rect x="31" y="64" width="10" height="11" rx="5" className="oracle-turtle-icon__limb" />
          <rect x="55" y="64" width="10" height="11" rx="5" className="oracle-turtle-icon__limb" />

          <path d="M48 74V80" className="oracle-turtle-icon__tail" />
        </g>
      </svg>
    </span>
  )
}


