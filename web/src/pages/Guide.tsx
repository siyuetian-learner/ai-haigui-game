import { Link } from 'react-router-dom'

export default function Guide() {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold text-white">新手引导</h2>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h3 className="text-lg font-semibold text-white">什么是“是非提问”</h3>
        <p className="text-white/70">
          你提出的问题需要能被回答为「是」或「否」，例如：
          「信封上是否有地址？」、「第二声咔哒是否来自门外？」
        </p>
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h3 className="text-lg font-semibold text-white">“无关”的含义</h3>
        <p className="text-white/70">
          当问题无法从汤底判断、或不直接对应关键线索时，主持人会回答
          「无关」。这表示你需要换一种问法或更聚焦某个细节。
        </p>
      </div>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          返回大厅
        </Link>
      </div>
    </section>
  )
}

