import { useNavigate } from 'react-router-dom'

export default function AISeaTurtleMysticLanding() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/bg-ocean.jpg')" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-300/20 blur-3xl animate-[floatLight_6s_infinite]" />

      <FloatingParticles />

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
