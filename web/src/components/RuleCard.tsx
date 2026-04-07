const RULES = [
  '阅读「汤面」，了解谜案的基本情境',
  '通过输入是非类问题，向主持人获取线索',
  'AI 仅回答「是」「否」或「无关」',
  '根据线索推理真相，揭开谜底',
]

export default function RuleCard() {
  return (
    <div className="rule-card relative overflow-hidden rounded border border-[var(--border)] bg-[rgba(10,15,30,0.6)] backdrop-blur-md">
      <div className="rule-card-glow absolute inset-0 opacity-30" />
      <div className="relative z-10 p-6">
        <h2 className="mb-5 text-xs font-medium tracking-[0.25em] uppercase text-[var(--text)]">
          游戏规则
        </h2>
        <ul className="space-y-4">
          {RULES.map((rule, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="rule-number mt-0.5 h-2 w-2 flex-shrink-0 rounded-full" />
              <span className="text-sm leading-relaxed text-[var(--text)]">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
