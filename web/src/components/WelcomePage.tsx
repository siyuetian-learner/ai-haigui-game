import { useNavigate } from 'react-router-dom'

export default function AISeaTurtleMysticLanding() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen overflow-hidden bg-[#050914] text-white relative">
      <DeepSeaBackground />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Header />

        <main className="flex flex-1 items-center justify-center py-8 sm:py-12">
          <section className="relative w-full max-w-5xl">
            <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(113,107,255,0.16),transparent_34%),radial-gradient(circle_at_bottom,rgba(65,181,255,0.12),transparent_30%)] blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.72),rgba(7,10,20,0.78))] p-6 shadow-[0_0_0_1px_rgba(124,132,255,0.06),0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 lg:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(109,96,255,0.18),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(72,155,255,0.10),transparent_24%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8d8cff]/45 to-transparent" />
              <div className="pointer-events-none absolute left-1/2 top-14 h-28 w-28 -translate-x-1/2 rounded-full bg-[#4324a8]/30 blur-2xl" />
              <MoonHalo />

              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/12 bg-white/5 px-3 py-1 text-[11px] tracking-[0.3em] text-cyan-100/65 uppercase backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                  深海异闻档案
                </div>

                <h1 className="font-serif text-5xl tracking-wide text-white drop-shadow-[0_0_18px_rgba(145,148,255,0.55)] sm:text-6xl lg:text-7xl">
                  <span className="bg-[linear-gradient(180deg,#ffffff_0%,#d9dcff_40%,#a9b1ff_72%,#eef1ff_100%)] bg-clip-text text-transparent [text-shadow:0_0_24px_rgba(135,141,255,0.45)]">
                    AI海龟汤
                  </span>
                </h1>

                <p className="mt-5 text-base tracking-[0.22em] text-slate-200/88 sm:text-lg">
                  一场推理与真相的神秘之旅
                </p>

                <RulePanel />

                <div className="mt-8 flex flex-col items-center gap-5">
                  <button
                    onClick={() => navigate('/home')}
                    className="group relative inline-flex items-center justify-center rounded-[18px] border border-[#7a7dff]/30 bg-[linear-gradient(180deg,#0d1330,#0a1025)] px-10 py-4 shadow-[0_0_0_1px_rgba(122,125,255,0.12),0_10px_35px_rgba(56,66,150,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(146,150,255,0.2),0_18px_45px_rgba(70,97,215,0.45),0_0_32px_rgba(103,122,255,0.25)] focus:outline-none focus:ring-2 focus:ring-cyan-300/40">
                    <span className="absolute inset-[1px] rounded-[17px] bg-[radial-gradient(circle_at_50%_10%,rgba(131,138,255,0.26),transparent_38%),linear-gradient(180deg,rgba(16,21,48,0.82),rgba(8,12,24,0.9))]" />
                    <span className="absolute inset-0 rounded-[18px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(120,130,255,0.0),rgba(120,130,255,0.14),rgba(99,228,255,0.0),rgba(120,130,255,0.16),rgba(120,130,255,0.0))] opacity-70 blur-sm" />
                    <span className="absolute -left-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-cyan-300/25 blur-lg transition group-hover:bg-cyan-300/40" />
                    <span className="absolute -right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-violet-300/25 blur-lg transition group-hover:bg-violet-300/45" />
                    <span className="relative z-10 flex items-center gap-3 text-2xl font-semibold tracking-widest text-cyan-50 drop-shadow-[0_0_12px_rgba(164,190,255,0.42)]">
                      开始游戏
                      <span className="text-xl text-amber-200/90">✦</span>
                    </span>
                  </button>

                  <p className="text-sm tracking-[0.18em] text-slate-200/60 sm:text-base">
                    准备好挑战你的智慧了吗？
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 backdrop-blur-md sm:px-5">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-violet-400/15 bg-[radial-gradient(circle_at_30%_35%,rgba(110,67,255,0.9),rgba(54,18,99,0.65)_45%,rgba(7,10,20,0.9)_74%)] shadow-[0_0_24px_rgba(110,67,255,0.22)]">
          <div className="absolute inset-x-1 bottom-1 h-2 rounded-full bg-cyan-300/20 blur-sm" />
        </div>
        <div>
          <div className="text-xl font-semibold tracking-wide text-white">AI海龟汤</div>
          <div className="text-xs tracking-[0.28em] text-slate-300/50">MYSTIC CASES</div>
        </div>
      </div>

      <nav className="flex items-center gap-3">
        <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-100/85 transition hover:border-cyan-300/25 hover:bg-white/[0.06] hover:text-white">
          新手引导
        </button>
      </nav>
    </header>
  )
}

function RulePanel() {
  const rules = [
    'AI会给出一个看似离奇的神秘情景',
    '你可以提出是非题，AI只会回答"是"、"否"或"无关"',
    '通过不断提问，逐步还原事件的真相',
    '考验你的逻辑推理和脑洞能力',
  ]

  return (
    <div className="relative mt-10 w-full overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,28,0.82),rgba(8,13,24,0.6))] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_60px_rgba(3,6,18,0.45)] backdrop-blur-xl sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(94,105,255,0.10),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(79,214,255,0.07),transparent_26%)]" />
      <div className="relative">
        <div className="mb-8 flex items-center justify-center gap-3 text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/15 bg-white/[0.04] text-cyan-50/90 shadow-[0_0_18px_rgba(119,238,255,0.12)]">
            <LightBulbIcon />
          </span>
          <h2 className="text-3xl font-semibold tracking-[0.18em] text-slate-50">游戏规则</h2>
        </div>

        <div className="space-y-5 text-left">
          {rules.map((rule, index) => (
            <div key={rule} className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-300/18 bg-[linear-gradient(180deg,rgba(122,109,255,0.2),rgba(113,86,255,0.08))] text-xl font-semibold text-violet-100 shadow-[0_0_18px_rgba(147,123,255,0.12)]">
                {index + 1}
              </div>
              <p className="pt-1 text-lg leading-8 text-slate-100/88 sm:text-[1.32rem]">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DeepSeaBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#17345a_0%,#0a1120_32%,#050914_68%,#02050d_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(122,135,255,0.18),transparent_18%),radial-gradient(circle_at_50%_68%,rgba(80,187,255,0.08),transparent_22%)]" />

      <FogMist />

      <WaterRipples />

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
        <GlowingJellyfish className="left-[4%] top-[18%] scale-[0.72] opacity-35" />
        <GlowingJellyfish className="right-[6%] top-[11%] scale-100 opacity-55" />
        <GlowingJellyfish className="left-[45%] top-[25%] scale-[0.5] opacity-25" />
      </div>

      <DistantBuildings />

      <FloatingParticles />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-[radial-gradient(circle_at_50%_0%,rgba(120,183,255,0.16),transparent_22%),linear-gradient(180deg,transparent,rgba(2,4,10,0.32)_46%,rgba(0,2,7,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-[radial-gradient(ellipse_at_center,rgba(171,225,255,0.16),transparent_30%)] blur-2xl" />
    </>
  )
}

function FogMist() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(100,120,180,0.15),transparent_50%),radial-gradient(ellipse_at_70%_40%,rgba(80,100,160,0.12),transparent_45%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(90,110,170,0.1),transparent_40%)] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] left-0 right-0 h-[30%] bg-[linear-gradient(to_top,rgba(20,30,60,0.4),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,0.3),transparent_30%,transparent_70%,rgba(2,4,10,0.5))]" />
    </div>
  )
}

function WaterRipples() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[200%] h-[2px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(100,180,255,0.3),transparent)] animate-ripple" />
      </div>
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[180%] h-[1px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(100,180,255,0.2),transparent)] animate-ripple" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-[21%] left-1/2 -translate-x-1/2 w-[160%] h-[1px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(100,180,255,0.15),transparent)] animate-ripple" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[220%] h-[3px] opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(80,150,220,0.2),transparent)] animate-ripple" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}

function DistantBuildings() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none">
      <svg className="absolute bottom-0 left-0 right-0 h-full w-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 300">
        <defs>
          <linearGradient id="buildingFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
          <filter id="buildingBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <g filter="url(#buildingBlur)" opacity="0.6">
          <rect x="50" y="180" width="40" height="120" fill="#0d1020" />
          <rect x="95" y="150" width="35" height="150" fill="#0a0e18" />
          <rect x="135" y="200" width="50" height="100" fill="#0d1020" />
          <rect x="200" y="120" width="30" height="180" fill="#080c14" />
          <rect x="240" y="170" width="45" height="130" fill="#0d1020" />
          <rect x="300" y="140" width="55" height="160" fill="#0a0e18" />
          <rect x="370" y="190" width="35" height="110" fill="#080c14" />
          <rect x="420" y="100" width="40" height="200" fill="#0d1020" />
          <rect x="475" y="160" width="50" height="140" fill="#0a0e18" />
          <rect x="540" y="130" width="45" height="170" fill="#080c14" />
          <rect x="600" y="180" width="60" height="120" fill="#0d1020" />
          <rect x="680" y="150" width="35" height="150" fill="#0a0e18" />
          <rect x="730" y="110" width="50" height="190" fill="#080c14" />
          <rect x="800" y="170" width="40" height="130" fill="#0d1020" />
          <rect x="855" y="140" width="55" height="160" fill="#0a0e18" />
          <rect x="925" y="190" width="45" height="110" fill="#080c14" />
          <rect x="985" y="120" width="35" height="180" fill="#0d1020" />
          <rect x="1035" y="160" width="50" height="140" fill="#0a0e18" />
          <rect x="1100" y="180" width="40" height="120" fill="#080c14" />
          <rect x="1155" y="150" width="45" height="150" fill="#0d1020" />
        </g>
        <rect x="0" y="280" width="1200" height="20" fill="url(#buildingFade)" />
      </svg>
    </div>
  )
}

function FloatingParticles() {
  const particles = [
    { cls: 'left-[5%] top-[15%]', size: 'h-1 w-1', opacity: 'opacity-60', delay: '0s' },
    { cls: 'left-[12%] top-[35%]', size: 'h-1.5 w-1.5', opacity: 'opacity-70', delay: '0.4s' },
    { cls: 'left-[20%] top-[8%]', size: 'h-0.5 w-0.5', opacity: 'opacity-50', delay: '0.8s' },
    { cls: 'left-[28%] top-[55%]', size: 'h-2 w-2', opacity: 'opacity-40', delay: '1.2s' },
    { cls: 'left-[35%] top-[22%]', size: 'h-1 w-1', opacity: 'opacity-65', delay: '1.6s' },
    { cls: 'left-[42%] top-[68%]', size: 'h-1.5 w-1.5', opacity: 'opacity-55', delay: '2s' },
    { cls: 'left-[50%] top-[12%]', size: 'h-1 w-1', opacity: 'opacity-70', delay: '2.4s' },
    { cls: 'left-[58%] top-[45%]', size: 'h-0.5 w-0.5', opacity: 'opacity-45', delay: '2.8s' },
    { cls: 'left-[65%] top-[28%]', size: 'h-2 w-2', opacity: 'opacity-50', delay: '3.2s' },
    { cls: 'left-[72%] top-[72%]', size: 'h-1 w-1', opacity: 'opacity-60', delay: '3.6s' },
    { cls: 'left-[80%] top-[18%]', size: 'h-1.5 w-1.5', opacity: 'opacity-65', delay: '4s' },
    { cls: 'left-[88%] top-[52%]', size: 'h-1 w-1', opacity: 'opacity-55', delay: '4.4s' },
    { cls: 'left-[95%] top-[38%]', size: 'h-0.5 w-0.5', opacity: 'opacity-40', delay: '4.8s' },
    { cls: 'left-[8%] top-[80%]', size: 'h-1 w-1', opacity: 'opacity-30', delay: '5.2s' },
    { cls: 'left-[45%] top-[85%]', size: 'h-1.5 w-1.5', opacity: 'opacity-35', delay: '5.6s' },
    { cls: 'left-[75%] top-[88%]', size: 'h-1 w-1', opacity: 'opacity-25', delay: '6s' },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, idx) => (
        <span
          key={idx}
          className={`absolute rounded-full bg-cyan-100 shadow-[0_0_14px_rgba(186,230,253,0.55)] ${p.cls} ${p.size} ${p.opacity} animate-float`}
          style={{ animationDelay: p.delay }}
        />
      ))}
    </div>
  )
}

function GlowingJellyfish({ className = '' }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative h-44 w-28">
        <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[radial-gradient(circle_at_50%_35%,rgba(223,243,255,0.5),rgba(143,217,255,0.18)_45%,rgba(120,190,255,0.08)_68%,transparent_74%)] blur-[0.5px]" />
        <div className="absolute left-1/2 top-3 h-16 w-20 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,230,255,0.3),transparent_70%)] blur-md animate-pulse" />
        <div className="absolute left-1/2 top-6 h-12 w-16 -translate-x-1/2 rounded-full bg-cyan-100/10 blur-xl animate-glow" />
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-16 w-px origin-top rounded-full bg-gradient-to-b from-cyan-100/45 via-cyan-200/18 to-transparent animate-tentacle"
            style={{
              left: `${22 + i * 8}%`,
              height: `${90 + (i % 3) * 16}px`,
              transform: `rotate(${(i - 3) * 4}deg)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function MoonHalo() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2">
      <div className="relative h-16 w-28">
        <div className="absolute left-1/2 top-1 h-10 w-20 -translate-x-1/2 rounded-[999px_999px_0_0] bg-[linear-gradient(180deg,rgba(72,39,177,0.9),rgba(38,18,101,0.86))] opacity-85 shadow-[0_0_22px_rgba(92,57,194,0.24)]" />
      </div>
    </div>
  )
}

function LightBulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.2 14.6C7.45 13.9 7 12.93 7 11.86A5 5 0 0 1 12 7a5 5 0 0 1 5 4.86c0 1.07-.45 2.04-1.2 2.74-.53.5-.94 1.1-1.15 1.78L14.5 18h-5l-.15-1.62c-.2-.68-.61-1.28-1.15-1.78Z" />
    </svg>
  )
}
