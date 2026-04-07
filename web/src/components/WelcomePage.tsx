export default function AISeaTurtleMysticLanding() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050914] text-white relative">
      <BackgroundLayers />

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
                  <button className="group relative inline-flex items-center justify-center rounded-[18px] border border-[#7a7dff]/30 bg-[linear-gradient(180deg,#0d1330,#0a1025)] px-10 py-4 shadow-[0_0_0_1px_rgba(122,125,255,0.12),0_10px_35px_rgba(56,66,150,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(146,150,255,0.2),0_18px_45px_rgba(70,97,215,0.45),0_0_32px_rgba(103,122,255,0.25)] focus:outline-none focus:ring-2 focus:ring-cyan-300/40">
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
  );
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
  );
}

function RulePanel() {
  const rules = [
    'AI会给出一个看似离奇的神秘情景',
    '你可以提出是非题，AI只会回答“是”、“否”或“无关”',
    '通过不断提问，逐步还原事件的真相',
    '考验你的逻辑推理和脑洞能力',
  ];

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
  );
}

function BackgroundLayers() {
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
  );
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
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((cls, idx) => (
        <span
          key={idx}
          className={`absolute rounded-full bg-cyan-100 shadow-[0_0_14px_rgba(186,230,253,0.55)] ${cls}`}
        />
      ))}
    </div>
  );
}

function MoonHalo() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2">
      <div className="relative h-16 w-28">
        <div className="absolute left-1/2 top-1 h-10 w-20 -translate-x-1/2 rounded-[999px_999px_0_0] bg-[linear-gradient(180deg,rgba(72,39,177,0.9),rgba(38,18,101,0.86))] opacity-85 shadow-[0_0_22px_rgba(92,57,194,0.24)]" />
      </div>
    </div>
  );
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
  );
}

function LightBulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.2 14.6C7.45 13.9 7 12.93 7 11.86A5 5 0 0 1 12 7a5 5 0 0 1 5 4.86c0 1.07-.45 2.04-1.2 2.74-.53.5-.94 1.1-1.15 1.78L14.5 18h-5l-.15-1.62c-.2-.68-.61-1.28-1.15-1.78Z" />
    </svg>
  );
}
