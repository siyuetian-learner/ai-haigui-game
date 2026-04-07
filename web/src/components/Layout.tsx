import { NavLink, Outlet } from 'react-router-dom'
import OracleTurtleIcon from './OracleTurtleIcon'

export default function Layout() {
  return (
    <div className="app-bg min-h-screen text-[var(--text-h)]">
      <header className="glass-dark sticky top-0 z-50 border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="group flex items-center gap-2">
            <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
              <OracleTurtleIcon size="sm" />
            </span>
            <span className="text-sm font-medium tracking-[0.1em] text-[var(--text-h)] transition-all duration-300 group-hover:text-[var(--accent-2)]">
              AI海龟汤
            </span>
          </NavLink>
          <nav className="flex items-center gap-6 text-xs">
            <NavLink
              to="/guide"
              className={({ isActive }) =>
                `tracking-[0.08em] transition-all duration-300 ${
                  isActive
                    ? 'text-[var(--accent-2)]'
                    : 'text-[var(--text)] hover:text-[var(--text-h)]'
                }`
              }
            >
              调查员手册
            </NavLink>
          </nav>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-border)] to-transparent opacity-50" />
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center">
          <p className="text-[10px] tracking-[0.15em] text-[var(--text)] opacity-50">
            档案编号：2026-0001 | 系统状态：运行中
          </p>
        </div>
      </footer>
    </div>
  )
}
