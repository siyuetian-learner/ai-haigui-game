export default function DeepSeaBackground() {
  const particles = [
    { left: '5%', top: '15%', size: '2px', delay: '0s', duration: '18s', opacity: 0.2 },
    { left: '25%', top: '8%', size: '1px', delay: '1.2s', duration: '20s', opacity: 0.15 },
    { left: '45%', top: '22%', size: '3px', delay: '2.5s', duration: '16s', opacity: 0.25 },
    { left: '65%', top: '5%', size: '2px', delay: '0.8s', duration: '22s', opacity: 0.18 },
    { left: '85%', top: '18%', size: '1px', delay: '3.2s', duration: '19s', opacity: 0.12 },
    { left: '12%', top: '35%', size: '2px', delay: '1.5s', duration: '17s', opacity: 0.22 },
    { left: '35%', top: '42%', size: '1px', delay: '2.8s', duration: '21s', opacity: 0.1 },
    { left: '55%', top: '28%', size: '3px', delay: '0.3s', duration: '15s', opacity: 0.28 },
    { left: '75%', top: '38%', size: '2px', delay: '4s', duration: '23s', opacity: 0.16 },
    { left: '92%', top: '45%', size: '1px', delay: '2.1s', duration: '18s', opacity: 0.14 },
    { left: '8%', top: '55%', size: '2px', delay: '1.8s', duration: '20s', opacity: 0.2 },
    { left: '28%', top: '62%', size: '1px', delay: '3.5s', duration: '16s', opacity: 0.12 },
    { left: '48%', top: '58%', size: '3px', delay: '0.6s', duration: '24s', opacity: 0.18 },
    { left: '68%', top: '52%', size: '2px', delay: '2.3s', duration: '19s', opacity: 0.24 },
    { left: '88%', top: '65%', size: '1px', delay: '4.2s', duration: '17s', opacity: 0.1 },
    { left: '18%', top: '78%', size: '2px', delay: '1.1s', duration: '21s', opacity: 0.16 },
    { left: '38%', top: '85%', size: '1px', delay: '2.9s', duration: '18s', opacity: 0.13 },
    { left: '58%', top: '72%', size: '3px', delay: '0.4s', duration: '22s', opacity: 0.2 },
    { left: '78%', top: '88%', size: '2px', delay: '3.7s', duration: '20s', opacity: 0.15 },
    { left: '95%', top: '92%', size: '1px', delay: '1.6s', duration: '16s', opacity: 0.11 },
  ]

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#0a0e1a] to-[#0d1020]" />

      <div className="absolute left-1/4 top-0 h-[500px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(30,40,80,0.4)_0%,transparent_70%)] blur-[100px]" />
      <div className="absolute right-1/4 top-20 h-[400px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(40,20,60,0.3)_0%,transparent_70%)] blur-[80px]" />
      <div className="absolute bottom-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(20,30,60,0.5)_0%,transparent_70%)] blur-[120px]" />

      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="jellyfish absolute h-[60px] w-[40px] opacity-20" style={{ left: '15%', top: '20%', animationDelay: '0s' }}>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(100,150,255,0.6)] to-transparent blur-sm" />
          <div className="absolute -bottom-1 left-1/2 h-[30px] w-[20px] -translate-x-1/2 rounded-b-full border-l border-r border-t border-[rgba(100,150,255,0.3)] bg-[rgba(100,150,255,0.1)]" />
        </div>
      </div>

      <div className="jellyfish absolute h-[40px] w-[25px] opacity-15" style={{ right: '25%', top: '35%', animationDelay: '4s' }}>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(150,100,200,0.5)] to-transparent blur-sm" />
          <div className="absolute -bottom-1 left-1/2 h-[20px] w-[12px] -translate-x-1/2 rounded-b-full border-l border-r border-t border-[rgba(150,100,200,0.25)] bg-[rgba(150,100,200,0.08)]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[rgba(10,15,30,0.9)] to-transparent" />

      <div className="wave absolute bottom-0 left-0 right-0 h-[150px] opacity-10">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="url(#waveGradient)"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,165.3C672,171,768,213,864,208C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </div>

      <div className="fog absolute inset-0 opacity-5">
        <div className="fog-layer fog-1" />
        <div className="fog-layer fog-2" />
      </div>
    </div>
  )
}
