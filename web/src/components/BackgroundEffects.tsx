export default function BackgroundEffects() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#17345a_0%,#0a1120_32%,#050914_68%,#02050d_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(122,135,255,0.18),transparent_18%),radial-gradient(circle_at_50%_68%,rgba(80,187,255,0.08),transparent_22%)]" />
      <div className="absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,rgba(0,0,0,0.15))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(133,188,255,0.08),transparent_12%),radial-gradient(circle_at_82%_22%,rgba(159,224,255,0.11),transparent_12%),radial-gradient(circle_at_50%_100%,rgba(134,190,255,0.10),transparent_25%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
        <Jellyfish className="left-[4%] top-[18%] scale-[0.72] opacity-35" />
        <Jellyfish className="right-[6%] top-[11%] scale-100 opacity-55" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[26%] w-[22%] bg-[radial-gradient(circle_at_30%_60%,rgba(0,0,0,0.68),transparent_58%)]" />
        <div className="absolute bottom-0 right-0 h-[42%] w-[24%] opacity-55">
          <div className="absolute bottom-0 right-6 h-[55%] w-3 rounded-t-full bg-slate-900/70 blur-[1px]" />
          <div className="absolute bottom-[22%] right-2 h-[36%] w-4 rounded-t-full bg-slate-900/75 blur-[1px]" />
          <div className="absolute bottom-[42%] right-5 h-24 w-20 border-x border-t border-slate-700/25 bg-slate-900/18" />
          <div className="absolute bottom-[49%] right-7 h-10 w-16 border-x border-t border-slate-700/20 bg-slate-900/12" />
          <div className="absolute bottom-[57%] right-10 h-8 w-10 rounded-t-full border border-slate-700/20 bg-slate-900/10" />
          <div className="absolute bottom-[44%] right-[4.5rem] h-1.5 w-1.5 rounded-full bg-cyan-200/45 shadow-[0_0_10px_rgba(165,243,252,0.7)]" />
          <div className="absolute bottom-[38%] right-[7.2rem] h-1.5 w-1.5 rounded-full bg-cyan-200/35 shadow-[0_0_10px_rgba(165,243,252,0.6)]" />
          <div className="absolute bottom-[33%] right-[5.8rem] h-1 w-1 rounded-full bg-cyan-200/30 shadow-[0_0_8px_rgba(165,243,252,0.55)]" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-[radial-gradient(circle_at_50%_0%,rgba(120,183,255,0.16),transparent_22%),linear-gradient(180deg,transparent,rgba(2,4,10,0.32)_46%,rgba(0,2,7,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-[radial-gradient(ellipse_at_center,rgba(171,225,255,0.16),transparent_30%)] blur-2xl" />

      <FloatingParticles />
    </>
  )
}

function FloatingParticles() {
  const particles = [
    'left-[9%] top-[20%] h-1 w-1 opacity-70',
    'left-[18%] top-[49%] h-1.5 w-1.5 opacity-75',
    'left-[29%] top-[13%] h-1 w-1 opacity-45',
    'left-[38%] top-[74%] h-2 w-2 opacity-55',
    'left-[51%] top-[30%] h-1.5 w-1.5 opacity-65',
    'left-[60%] top-[16%] h-1 w-1 opacity-65',
    'left-[72%] top-[63%] h-1 w-1 opacity-60',
    'left-[81%] top-[34%] h-1.5 w-1.5 opacity-80',
    'left-[89%] top-[71%] h-1 w-1 opacity-65',
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((cls, idx) => (
        <span
          key={idx}
          className={`absolute rounded-full bg-cyan-100 shadow-[0_0_14px_rgba(186,230,253,0.55)] ${cls}`}
        />
      ))}
    </div>
  )
}

function Jellyfish({ className = '' }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative h-44 w-28">
        <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[radial-gradient(circle_at_50%_35%,rgba(223,243,255,0.5),rgba(143,217,255,0.18)_45%,rgba(120,190,255,0.08)_68%,transparent_74%)] blur-[0.5px]" />
        <div className="absolute left-1/2 top-6 h-12 w-16 -translate-x-1/2 rounded-full bg-cyan-100/10 blur-xl" />
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-16 w-px origin-top rounded-full bg-gradient-to-b from-cyan-100/45 via-cyan-200/18 to-transparent"
            style={{
              left: `${22 + i * 8}%`,
              height: `${90 + (i % 3) * 16}px`,
              transform: `rotate(${(i - 3) * 4}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function MoonHalo() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2">
      <div className="relative h-16 w-28">
        <div className="absolute left-1/2 top-1 h-10 w-20 -translate-x-1/2 rounded-[999px_999px_0_0] bg-[linear-gradient(180deg,rgba(72,39,177,0.9),rgba(38,18,101,0.86))] opacity-85 shadow-[0_0_22px_rgba(92,57,194,0.24)]" />
      </div>
    </div>
  )
}

export function LightBulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.2 14.6C7.45 13.9 7 12.93 7 11.86A5 5 0 0 1 12 7a5 5 0 0 1 5 4.86c0 1.07-.45 2.04-1.2 2.74-.53.5-.94 1.1-1.15 1.78L14.5 18h-5l-.15-1.62c-.2-.68-.61-1.28-1.15-1.78Z" />
    </svg>
  )
}

export function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}
