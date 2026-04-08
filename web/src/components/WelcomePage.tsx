import { useNavigate } from 'react-router-dom'

export default function AISeaTurtleMysticLanding() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/bg-ocean.jpg')" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-300/20 blur-3xl animate-[floatLight_6s_infinite]" />

      <DeepSeaBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-[900px] text-center">
          <h1 className="text-[72px] font-serif text-white drop-shadow-[0_0_25px_rgba(140,150,255,0.8)]">
            AI海龟汤
          </h1>

          <p className="mt-6 text-[22px] tracking-widest text-white/90">
            一场推理与真相的神秘之旅
          </p>

          <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-8 shadow-xl">
            <h2 className="text-2xl mb-6">💡 游戏规则</h2>

            <div className="space-y-4 text-left text-lg text-white/90">
              <p>① AI会给出一个看似离奇神秘情景</p>
              <p>② 你可以提出是/否问题</p>
              <p>③ AI只回答"是 / 否 / 无关"</p>
              <p>④ 推理还原事件真相</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="mt-10 px-10 py-5 rounded-xl bg-gradient-to-b from-indigo-400 to-indigo-700 shadow-[0_0_20px_rgba(100,120,255,0.6)] hover:scale-105 transition"
          >
            开始游戏 ✦
          </button>

          <p className="mt-8 text-white/70">
            准备好挑战你的智慧了吗？
          </p>
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

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
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
