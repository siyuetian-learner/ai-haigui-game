import { useNavigate } from 'react-router-dom'

const WELCOME_RULES = [
  'AI会给出一个看似离奇的神秘情景。',
  '你可以提出是非题，AI只会回答“是”、“否”或“无关”。',
  '通过不断提问，逐步还原事件的真相。',
  '考验你的逻辑推理和脑洞能力。',
]

/**
 * 参考图是完整的欢迎页视觉稿，这里直接以参考图作为首屏主视觉，
 * 再在“开始游戏”区域叠加可点击按钮，保证视觉一致的同时保留交互。
 */
export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(78,132,255,0.22),transparent_34%),linear-gradient(180deg,#10243a_0%,#08131f_42%,#050b14_100%)]" />
      <div className="absolute inset-0 bg-[url('/bg-ocean.webp')] bg-cover bg-center opacity-20 blur-[2px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-0 sm:p-4">
        <section
          aria-labelledby="welcome-title"
          className="relative aspect-square w-full max-w-[100vh] overflow-hidden sm:rounded-[28px] sm:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        >
          <picture>
            <source srcSet="/reference-picture.webp" type="image/webp" />
            <img
              src="/reference picture.png"
              alt="AI海龟汤欢迎页参考图"
              className="h-full w-full object-cover object-center"
              draggable={false}
              fetchPriority="high"
            />
          </picture>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,20,0.06),rgba(6,11,20,0.02),rgba(6,11,20,0.08))]" />

          <div className="sr-only">
            <h1 id="welcome-title">AI海龟汤</h1>
            <p>一场推理与真相的神秘之旅。</p>
            <h2>游戏规则</h2>
            <ul>
              {WELCOME_RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            aria-label="开始游戏"
            onClick={() => navigate('/home')}
            className="absolute left-1/2 top-[73.8%] h-[9.8%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent outline-none transition hover:scale-[1.015] focus-visible:ring-4 focus-visible:ring-cyan-300/50"
          >
            <span className="sr-only">开始游戏</span>
          </button>
        </section>
      </div>
    </main>
  )
}
