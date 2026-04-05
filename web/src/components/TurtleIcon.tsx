export default function TurtleIcon() {
  return (
    <span className="turtle-icon turtle-icon--neon flex-shrink-0" aria-hidden="true">
      <svg
        className="turtle-svg"
        viewBox="0 0 64 64"
        width="320"
        height="320"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="shellGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#7CB342" stopOpacity="1" />
            <stop offset="45%" stopColor="#558B2F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#33691E" stopOpacity="0.22" />
          </radialGradient>
          <linearGradient id="turtleBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8BC34A" stopOpacity="1" />
            <stop offset="100%" stopColor="#33691E" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="outlineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7CB342" stopOpacity="1" />
            <stop offset="70%" stopColor="#558B2F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#33691E" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Turtle body (头/四肢) */}
        <g className="turtle-body">
          {/* Head (更修长的头部轮廓) */}
          <g className="turtle-head">
            <path
              d="M28 7
                 C29 5, 35 5, 36 7
                 C40 12, 39 21, 32 21
                 C25 21, 24 12, 28 7 Z"
              fill="url(#turtleBody)"
            />
            <circle cx="30.7" cy="14.2" r="1.55" fill="#1B5E20" opacity="0.95" />
            <circle cx="33.9" cy="14.2" r="1.55" fill="#1B5E20" opacity="0.95" />
            <path
              d="M31.8 17.2 C32.7 18.0, 33.7 18.0, 34.6 17.2"
              fill="none"
              stroke="#1B5E20"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* Torso (主体轮廓，让壳更像“盖”在龟身上) */}
          <path
            d="M18 30
               C18 23, 23 18, 32 18
               C41 18, 46 23, 46 30
               C46 41, 39 49, 32 49
               C25 49, 18 41, 18 30 Z"
            fill="url(#turtleBody)"
            opacity="0.9"
          />

          {/* Front arms (左右一致) */}
          <g className="turtle-arm-left">
            <path
              d="M16 31
                 C11 29, 10 22, 16 20
                 C22 18, 26 24, 26 28
                 C26 32, 21 34, 16 31 Z"
              fill="url(#turtleBody)"
            />
            <path
              d="M16 31
                 C14 31, 12.5 33, 13.2 35
                 C14 37, 16.4 37, 17.8 35.8"
              fill="none"
              stroke="#1B5E20"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.35"
            />
          </g>
          <g className="turtle-arm-right">
            <path
              d="M48 31
                 C53 29, 54 22, 48 20
                 C42 18, 38 24, 38 28
                 C38 32, 43 34, 48 31 Z"
              fill="url(#turtleBody)"
            />
            <path
              d="M48 31
                 C50 31, 51.5 33, 50.8 35
                 C50 37, 47.6 37, 46.2 35.8"
              fill="none"
              stroke="#1B5E20"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.35"
            />
          </g>

          {/* Back legs (前后同款轮廓，并做“上下摆动”动画) */}
          <g className="turtle-leg-left">
            <path
              d="M24 45
                 C20 43, 19 38, 23 36
                 C27 34, 32 37, 31 42
                 C30 46, 27 47, 24 45 Z"
              fill="url(#turtleBody)"
              opacity="0.86"
            />
          </g>
          <g className="turtle-leg-right">
            <path
              d="M40 45
                 C44 43, 45 38, 41 36
                 C37 34, 32 37, 33 42
                 C34 46, 37 47, 40 45 Z"
              fill="url(#turtleBody)"
              opacity="0.86"
            />
          </g>
        </g>

        {/* Shell / target rings (龟壳纹路 + 目标环) */}
        <g className="turtle-shell">
          <circle cx="32" cy="30" r="18" fill="rgba(0,0,0,0.34)" />
          <circle
            cx="32"
            cy="30"
            r="18"
            fill="none"
            stroke="url(#shellGlow)"
            strokeWidth="7"
            opacity="0.98"
          />

          {/* Shell texture (龟壳纹路) */}
          <g opacity="0.65">
            <path
              d="M20 30 C26 25, 38 25, 44 30"
              fill="none"
              stroke="#7CB342"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M19 34 C26 29, 38 29, 45 34"
              fill="none"
              stroke="#558B2F"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M20 26 C26 22, 38 22, 44 26"
              fill="none"
              stroke="#33691E"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M24 22 C26 26, 28 38, 32 42"
              fill="none"
              stroke="#7CB342"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              d="M40 22 C38 26, 36 38, 32 42"
              fill="none"
              stroke="#7CB342"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.35"
            />
          </g>

          {/* inner rings */}
          <g className="turtle-rings">
            <circle
              cx="32"
              cy="30"
              r="13"
              fill="none"
              stroke="#558B2F"
              strokeWidth="2"
              opacity="0.6"
            />
            <circle
              cx="32"
              cy="30"
              r="8"
              fill="none"
              stroke="#33691E"
              strokeWidth="2"
              opacity="0.35"
            />
            <circle
              cx="32"
              cy="30"
              r="5"
              fill="none"
              stroke="#7CB342"
              strokeWidth="2"
              opacity="0.45"
            />
          </g>

          {/* Neon ticks around shell (参考图那种目标环刻度更醒目) */}
          <g className="turtle-ticks">
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16
              const rad = (angle * Math.PI) / 180
              const x1 = 32 + Math.cos(rad) * 12.5
              const y1 = 30 + Math.sin(rad) * 12.5
              const x2 = 32 + Math.cos(rad) * 21.5
              const y2 = 30 + Math.sin(rad) * 21.5
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#7CB342"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  opacity={0.18 + i * 0.016}
                />
              )
            })}
          </g>

          {/* Spiral core (animated sweep) */}
          <path
            className="turtle-spiral"
            d="M42 27
               C44 35, 36 42, 28 39
               C19 35, 22 24, 32 24
               C42 24, 45 35, 36 40
               C27 45, 18 37, 22 29
               C26 21, 40 20, 41 30
               C42 39, 32 44, 26 39"
            fill="none"
            stroke="#7CB342"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.98"
            strokeDasharray="32 10"
            strokeDashoffset="0"
          />
        </g>
      </svg>
    </span>
  )
}

