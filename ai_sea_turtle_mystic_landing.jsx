import { useMemo, useState } from 'react';

const CASES = [
  {
    id: 1,
    title: '镜中来信',
    description: '深夜，抽屉里多了一封信。信封上没有地址，却写着我的名字。',
    difficulty: '简单',
    category: '谜题',
    mood: '不安',
    answer:
      '这封信其实是镜子里另一侧的人写来的。那个人和主角生活在结构完全对称的房间中，只能通过镜中缝隙交换物品。',
    scene:
      '深夜，抽屉里多了一封信。信封上没有地址，却写着我的名字。',
  },
  {
    id: 2,
    title: '会自动折叠的纸巾',
    description: '我放在桌上的纸巾，每隔几秒就会自动折叠一次。',
    difficulty: '简单',
    category: '日常',
    mood: '诡异',
    answer:
      '桌子旁边有一台低频振动设备，纸巾被预先压过折痕，所以在持续振动下会不断自行收拢。',
    scene:
      '我放在桌上的纸巾，每隔几秒就会自动折叠一次。',
  },
  {
    id: 3,
    title: '走廊的回声',
    description: '我明明只开了一次门，但走廊里却听见了两声“咔哒”。',
    difficulty: '中等',
    category: '声音',
    mood: '错觉',
    answer:
      '第一次是自己家的门锁声，第二次来自对门住户同步关门。因为走廊狭长，声音间隔被拉开，形成异常感。',
    scene:
      '我明明只开了一次门，但走廊里却听见了两声“咔哒”。',
  },
  {
    id: 4,
    title: '钟停在第十三秒',
    description: '时钟总是在第十三秒“停住”，然后又在同一时刻继续。',
    difficulty: '困难',
    category: '时间',
    mood: '误导',
    answer:
      '这是带有报时补偿结构的机械钟，秒针在某一段会短暂停顿，以校准齿轮误差，并不是真的停止了时间。',
    scene:
      '时钟总是在第十三秒“停住”，然后又在同一时刻继续。',
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'system',
    content: '档案已开启。请发问，但别太早相信你的直觉。',
  },
];

export default function AISeaTurtleMysticApp() {
  const [page, setPage] = useState('home');
  const [selectedCase, setSelectedCase] = useState(CASES[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const totalCases = CASES.length;

  const openCase = (gameCase) => {
    setSelectedCase(gameCase);
    setMessages([
      {
        id: 1,
        role: 'system',
        content: '档案已开启。请发问，但别太早相信你的直觉。',
      },
      {
        id: 2,
        role: 'ai',
        content: `汤面：${gameCase.scene}`,
      },
    ]);
    setPage('game');
  };

  const submitQuestion = () => {
    if (!input.trim()) return;

    const question = input.trim();
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: question,
    };

    const aiReply = buildReply(question, selectedCase.answer);

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: Date.now() + 1,
        role: 'ai',
        content: aiReply,
      },
    ]);
    setInput('');
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050914] text-white relative">
      <BackgroundLayers />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <Header
          page={page}
          onHome={() => setPage('home')}
          onGuide={() => setPage('library')}
          onLibrary={() => setPage('library')}
        />

        <main className="flex flex-1 py-6 sm:py-8">
          {page === 'home' && <HomePage onStart={() => setPage('library')} />}
          {page === 'library' && (
            <LibraryPage
              cases={CASES}
              totalCases={totalCases}
              onOpenCase={openCase}
              onBackHome={() => setPage('home')}
              onQuickStart={() => openCase(CASES[0])}
            />
          )}
          {page === 'game' && (
            <GamePage
              gameCase={selectedCase}
              messages={messages}
              input={input}
              setInput={setInput}
              onSubmit={submitQuestion}
              onRevealAnswer={() =>
                setMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now() + 2,
                    role: 'ai',
                    content: `真相记录：${selectedCase.answer}`,
                  },
                ])
              }
              onEndGame={() => setPage('library')}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function Header({ page, onHome, onGuide, onLibrary }) {
  return (
    <header className="relative z-20 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 backdrop-blur-md sm:px-5">
      <button onClick={onHome} className="flex items-center gap-3 text-left">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-violet-400/15 bg-[radial-gradient(circle_at_30%_35%,rgba(110,67,255,0.9),rgba(54,18,99,0.65)_45%,rgba(7,10,20,0.9)_74%)] shadow-[0_0_24px_rgba(110,67,255,0.22)]">
          <div className="absolute inset-x-1 bottom-1 h-2 rounded-full bg-cyan-300/20 blur-sm" />
        </div>
        <div>
          <div className="text-xl font-semibold tracking-wide text-white">AI海龟汤</div>
          <div className="text-xs tracking-[0.28em] text-slate-300/50">MYSTIC CASES</div>
        </div>
      </button>

      <nav className="flex items-center gap-3">
        <GhostButton onClick={onGuide}>{page === 'home' ? '新手引导' : '返回题库'}</GhostButton>
        <GhostButton onClick={onLibrary}>异闻档案</GhostButton>
      </nav>
    </header>
  );
}

function HomePage({ onStart }) {
  return (
    <section className="relative flex w-full items-center justify-center py-4 sm:py-8">
      <div className="relative w-full max-w-5xl">
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
              <PrimaryButton onClick={onStart}>开始游戏 ✦</PrimaryButton>
              <p className="text-sm tracking-[0.18em] text-slate-200/60 sm:text-base">
                准备好挑战你的智慧了吗？
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LibraryPage({ cases, totalCases, onOpenCase, onBackHome, onQuickStart }) {
  return (
    <section className="w-full">
      <div className="mb-5 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,28,0.82),rgba(6,10,22,0.66))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.34em] text-cyan-100/55">Archive Hall</p>
            <h2 className="text-4xl font-semibold tracking-wide text-white">AI海龟汤</h2>
            <p className="mt-4 text-lg leading-8 text-slate-200/78">
              阅读「汤面」，用是非类问题逼近真相。AI 主持人只回答「是 / 否 / 无关」，帮你逐步还原事件。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <GhostButton onClick={onBackHome}>返回首页</GhostButton>
            <PrimaryButton onClick={onQuickStart}>直接开始（示例题）</PrimaryButton>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between px-1">
        <p className="text-sm tracking-[0.18em] text-slate-300/60">当前已收录 {totalCases} 份异闻档案</p>
        <p className="text-sm tracking-[0.18em] text-slate-300/50">请选择一则案件进入调查</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {cases.map((gameCase) => (
          <CaseCard key={gameCase.id} gameCase={gameCase} onOpen={() => onOpenCase(gameCase)} />
        ))}
      </div>
    </section>
  );
}

function GamePage({ gameCase, messages, input, setInput, onSubmit, onRevealAnswer, onEndGame }) {
  const progress = useMemo(() => Math.min(92, 18 + messages.length * 8), [messages.length]);

  return (
    <section className="flex w-full flex-col gap-5">
      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,16,30,0.84),rgba(8,12,24,0.68))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h2 className="text-4xl font-semibold tracking-wide text-white">{gameCase.title}</h2>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-100/85">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]" />
                进行中
              </span>
            </div>
            <p className="text-lg text-slate-300/75">难度：{gameCase.difficulty.toLowerCase()} / 题材：{gameCase.category.toLowerCase()}</p>

            <div className="mt-5 rounded-[22px] border border-white/8 bg-black/18 px-5 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div className="mb-3 text-2xl font-semibold text-slate-100">汤面</div>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-200/82">{gameCase.scene}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <GhostButton onClick={onRevealAnswer}>查看汤底</GhostButton>
            <DangerButton onClick={onEndGame}>结束游戏</DangerButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex min-h-[620px] flex-col rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,32,0.86),rgba(10,13,25,0.72))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-5">
          <div className="mb-4 flex items-center justify-between px-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/15 bg-blue-400/10 px-3 py-1 text-sm text-blue-100/85">
              🗒️ 总结
            </span>
            <span className="text-xs tracking-[0.24em] text-slate-400/60">INTERROGATION TERMINAL</span>
          </div>

          <div className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-1 space-y-4 overflow-y-auto px-1 py-2">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          <div className="mt-4 rounded-[22px] border border-white/8 bg-black/18 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                placeholder="输入你的问题…"
                className="h-14 flex-1 rounded-2xl border border-white/8 bg-[#090d18] px-5 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/25 focus:shadow-[0_0_0_1px_rgba(103,232,249,0.12),0_0_18px_rgba(34,211,238,0.1)]"
              />
              <button
                onClick={onSubmit}
                className="group inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/18 bg-[linear-gradient(180deg,#3f2b77,#2b1d55)] text-slate-100 shadow-[0_10px_24px_rgba(59,39,128,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(76,60,170,0.42)]"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <InfoPanel title="调查进度" subtitle="真相浓度">
            <div className="mb-3 flex items-center justify-between text-sm text-slate-300/75">
              <span>已推进线索</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(90,130,255,0.8),rgba(110,240,255,0.78))] shadow-[0_0_18px_rgba(110,240,255,0.35)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </InfoPanel>

          <InfoPanel title="案件标签" subtitle="异常记录">
            <div className="flex flex-wrap gap-2">
              <Badge variant={gameCase.difficulty}>{gameCase.difficulty}</Badge>
              <Badge>{gameCase.category}</Badge>
              <Badge>{gameCase.mood}</Badge>
            </div>
          </InfoPanel>

          <InfoPanel title="提示" subtitle="主持人低语">
            <p className="text-sm leading-7 text-slate-300/78">
              先确认人物、时间、地点是否真实存在，再去追问“为什么会这样”。很多汤面的异常感来自叙述误导，而不是超自然现象。
            </p>
          </InfoPanel>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ gameCase, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,22,35,0.86),rgba(11,14,26,0.72))] p-6 text-left shadow-[0_16px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/15 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(103,232,249,0.08)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(104,87,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(95,196,255,0.06),transparent_22%)] opacity-70 transition duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl font-semibold tracking-wide text-white">{gameCase.title}</h3>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-200/76">{gameCase.description}</p>
          </div>
          <Badge variant={gameCase.difficulty}>{gameCase.difficulty}</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>{gameCase.category}</Badge>
          <Badge>{gameCase.mood}</Badge>
        </div>
      </div>
    </button>
  );
}

function MessageBubble({ message }) {
  if (message.role === 'system') {
    return (
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-emerald-300/15 bg-emerald-300/10 text-lg shadow-[0_0_22px_rgba(16,185,129,0.18)]">
          🌐
        </div>
        <div className="max-w-[78%] rounded-[20px] border border-emerald-300/16 bg-[linear-gradient(180deg,rgba(13,63,54,0.26),rgba(8,34,32,0.18))] px-5 py-4 text-base leading-8 text-slate-100/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          {message.content}
        </div>
      </div>
    );
  }

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[72%] rounded-[20px] border border-violet-300/14 bg-[linear-gradient(180deg,rgba(74,49,132,0.3),rgba(41,26,77,0.22))] px-5 py-4 text-base leading-8 text-slate-100/90 shadow-[0_14px_28px_rgba(56,36,102,0.22)]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/14 bg-cyan-300/10 text-lg shadow-[0_0_22px_rgba(34,211,238,0.18)]">
        ✦
      </div>
      <div className="max-w-[78%] rounded-[20px] border border-cyan-300/10 bg-[linear-gradient(180deg,rgba(16,27,47,0.84),rgba(11,18,34,0.65))] px-5 py-4 text-base leading-8 text-slate-100/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        {message.content}
      </div>
    </div>
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

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center rounded-[18px] border border-[#7a7dff]/30 bg-[linear-gradient(180deg,#0d1330,#0a1025)] px-10 py-4 shadow-[0_0_0_1px_rgba(122,125,255,0.12),0_10px_35px_rgba(56,66,150,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(146,150,255,0.2),0_18px_45px_rgba(70,97,215,0.45),0_0_32px_rgba(103,122,255,0.25)] focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
    >
      <span className="absolute inset-[1px] rounded-[17px] bg-[radial-gradient(circle_at_50%_10%,rgba(131,138,255,0.26),transparent_38%),linear-gradient(180deg,rgba(16,21,48,0.82),rgba(8,12,24,0.9))]" />
      <span className="absolute inset-0 rounded-[18px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(120,130,255,0.0),rgba(120,130,255,0.14),rgba(99,228,255,0.0),rgba(120,130,255,0.16),rgba(120,130,255,0.0))] opacity-70 blur-sm" />
      <span className="absolute -left-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-cyan-300/25 blur-lg transition group-hover:bg-cyan-300/40" />
      <span className="absolute -right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-violet-300/25 blur-lg transition group-hover:bg-violet-300/45" />
      <span className="relative z-10 flex items-center gap-3 text-lg font-semibold tracking-widest text-cyan-50 drop-shadow-[0_0_12px_rgba(164,190,255,0.42)] sm:text-2xl">
        {children}
      </span>
    </button>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-100/85 transition hover:border-cyan-300/25 hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </button>
  );
}

function DangerButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-rose-300/14 bg-rose-400/10 px-4 py-2 text-sm text-rose-50/90 transition hover:border-rose-300/25 hover:bg-rose-400/14"
    >
      {children}
    </button>
  );
}

function Badge({ children, variant }) {
  const classes =
    variant === '简单'
      ? 'border-emerald-300/12 bg-emerald-400/10 text-emerald-100/88'
      : variant === '中等'
        ? 'border-sky-300/12 bg-sky-400/10 text-sky-100/88'
        : variant === '困难'
          ? 'border-violet-300/16 bg-violet-400/10 text-violet-100/88'
          : 'border-white/10 bg-white/5 text-slate-200/82';

  return <span className={`rounded-full border px-3 py-1 text-sm ${classes}`}>{children}</span>;
}

function InfoPanel({ title, subtitle, children }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,31,0.8),rgba(10,13,24,0.68))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mb-4">
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.28em] text-slate-400/60">{subtitle}</div>
      </div>
      {children}
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

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function buildReply(question, answer) {
  const q = question.toLowerCase();

  if (q.includes('是') && q.includes('超自然')) return '否。异常感来自信息差，而不是超自然力量。';
  if (q.includes('有人') || q.includes('人物')) return '是。人物关系通常是突破口。';
  if (q.includes('时间') || q.includes('几点')) return '有关系。时间顺序值得继续确认。';
  if (q.includes('地点') || q.includes('房间') || q.includes('走廊')) return '是。空间结构对理解真相很重要。';
  if (q.includes('死亡') || q.includes('凶手')) return '无关。先别急着往极端方向推。';
  if (q.includes('为什么')) return '这是个好问题，但你还缺少一个关键前提。';
  if (q.includes('真相') || q.includes('答案')) return `你已经靠近了。提示：${answer.slice(0, 24)}……`;
  return '已记录。这个问题有价值，请继续缩小范围。';
}
