import { NavLink, Outlet } from 'react-router-dom'
import OracleTurtleIcon from './OracleTurtleIcon'

export default function Layout() {
  return (
    <div className="app-bg min-h-screen text-[var(--text-h)]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="text-base font-semibold text-white">
            <span className="inline-flex items-center gap-2">
              <OracleTurtleIcon size="sm" />
              AI海龟汤
            </span>
          </NavLink>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/guide"
              className={({ isActive }) =>
                isActive ? 'text-white' : 'text-white/70 hover:text-white'
              }
            >
              新手引导
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-6 text-center text-xs text-white/60">
        MVP 初始化完成（React + TS + Vite + Tailwind + Router）
      </footer>
    </div>
  )
}

