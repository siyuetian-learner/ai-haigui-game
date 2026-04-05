import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">404 - 页面不存在</h2>
      <p className="text-white/70">你可能输入了错误地址。</p>
      <Link
        to="/"
        className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
      >
        返回大厅
      </Link>
    </section>
  )
}

