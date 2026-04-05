# 🧱 技术设计文档模板

> 项目名称：AI海龟汤游戏  
> 文档类型：技术设计文档 / 开发落地版  
> 适用阶段：MVP 开发、联调、验收  
> 说明：以下内容基于《AI海龟汤游戏 PRD》扩展整理，采用示例图片中的「标题 + 代码块」形式编排，便于直接复制到 Notion、语雀、飞书文档或 Git 仓库中。

## 代码块

```markdown
# AI海龟汤游戏技术设计

## 1. 项目定位
一个 AI 驱动的海龟汤推理游戏网站，用户通过阅读“汤面”、向 AI 主持人提问，并在 AI 仅返回“是 / 否 / 无关 / 提示”的规则下，逐步推理出故事真相。

## 2. 项目目标
- 让用户在 3 分钟内完成首局进入
- 让新用户理解海龟汤玩法，并愿意继续游玩
- 通过神秘悬疑的 UI 与稳定的 AI 裁判机制，提升沉浸感和复玩率
- 支持后续扩展多人模式、题库管理、用户系统与数据分析

## 3. 核心设计原则
- 规则清晰：AI 回答必须稳定，不胡乱发挥
- 氛围统一：整体界面保持神秘、诡异、悬疑
- 上手简单：新手也能快速理解如何提问
- 内容可扩展：题库、提示系统、日志系统都能后续升级
- 结果可复盘：用户玩完后可以看到完整汤底与自己的推理路径
```

## 代码块

```markdown
## 技术栈

- 前端：React + TypeScript + Vite
- 样式：Tailwind CSS
- 状态管理：React Hooks（useState / useReducer / useContext）
- 路由：React Router
- 网络请求：Axios / Fetch
- 动画：Framer Motion（推荐，用于按钮抖动、揭晓动画、光晕脉冲）
- 图标：Lucide React / 自定义 SVG
- 后端：Node.js + Express
- AI API：DeepSeek / Claude API
- 数据存储（MVP 可选）：
  - 方案A：前端本地静态 stories.ts
  - 方案B：后端 JSON / SQLite
  - 方案C：正式版使用 MySQL / PostgreSQL
- 日志与监控：
  - 前端埋点：自定义事件上报
  - 后端日志：Winston / Pino
- 部署：
  - 前端：Vercel
  - 后端：Render / Railway / Vercel Serverless / 云服务器
```

## 代码块

```markdown
## 项目结构

src/
  components/                 # 组件目录
    GameCard.tsx              # 游戏卡片（大厅中的题目卡片）
    DifficultyTag.tsx         # 难度标签
    ChatBox.tsx               # 聊天区域容器
    MessageItem.tsx           # 单条消息
    PromptInput.tsx           # 提问输入框
    ActionBar.tsx             # 查看汤底 / 结束游戏 / 提示按钮区
    StoryReveal.tsx           # 汤底揭晓组件
    HintPanel.tsx             # 提示面板
    ProgressPanel.tsx         # 推理进度面板
    ResultStats.tsx           # 结果统计组件
    TypewriterText.tsx        # 打字机文本效果
    GlitchButton.tsx          # 破碎感/故障风按钮
    Layout.tsx                # 页面基础布局
    LoadingMask.tsx           # AI思考中的遮罩层

  pages/                      # 页面目录
    Home.tsx                  # 首页 / 游戏大厅
    Game.tsx                  # 游戏页
    Result.tsx                # 结果页 / 汤底页
    Guide.tsx                 # 新手引导页（建议加入）
    NotFound.tsx              # 404 页面

  data/                       # 本地静态数据（MVP）
    stories.ts                # 海龟汤故事题库
    hints.ts                  # 提示模板
    config.ts                 # 难度配置、按钮文案、风格常量

  services/                   # 服务层
    ai.ts                     # AI 请求封装
    story.ts                  # 获取题目、切题、校验逻辑
    analytics.ts              # 埋点上报
    prompt.ts                 # Prompt 模板生成

  hooks/                      # 自定义 hooks
    useGameSession.ts         # 管理当前游戏会话
    useChatHistory.ts         # 管理消息记录
    useCountdown.ts           # 倒计时（如后续启用）
    useLocalStorage.ts        # 本地存储玩家记录

  utils/                      # 工具函数
    judge.ts                  # 回答判定结果处理
    format.ts                 # 时间、文案格式化
    normalize.ts              # 用户输入归一化处理
    validate.ts               # 输入合法性校验

  types/                      # 类型定义
    story.ts                  # Story / Hint / Difficulty 等类型
    message.ts                # Message 类型
    session.ts                # 会话数据类型
    api.ts                    # API 返回类型

  styles/
    globals.css               # 全局样式
    effects.css               # 故障、光晕、抖动等特效样式

  App.tsx
  main.tsx
```

## 代码块

```markdown
## 页面结构设计

### 1. 首页 / 游戏大厅
目标：
- 让用户快速理解玩法
- 快速选择题目进入游戏
- 建立神秘、诡异、可探索的第一印象

模块：
- 顶部 Logo / 海龟图腾图标
- 游戏玩法简介
- 难度筛选（简单 / 中等 / 困难 / 地狱）
- 类型筛选（经典 / 惊悚 / 脑洞 / 反转）
- 海龟汤卡片列表
- 开始游戏按钮
- 新手引导入口

### 2. 游戏页面
目标：
- 聚焦问答体验
- 保持推理节奏
- 突出“只回答是/否/无关”的规则感

模块：
- 顶部故事信息栏（标题 / 难度 / 进度）
- 汤面展示区
- 对话历史区
- 输入框与发送按钮
- 操作区（轻提示 / 中提示 / 强提示 / 查看汤底 / 结束游戏）
- AI 状态区（思考中、处理中、已回复）
- 可选：提问计数器、耗时展示

### 3. 汤底 / 结果页面
目标：
- 形成揭晓仪式感
- 告诉玩家自己哪里猜对、哪里偏离
- 促进复玩

模块：
- 真相揭晓标题
- 汤底全文
- 关键线索总结
- 玩家提问统计
- 关键问题回放
- AI 复盘评价
- 再来一局按钮
- 分享结果按钮（后续）
```

## 代码块

```markdown
## 数据模型

### Story（海龟汤故事）
type Story = {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard' | 'hell'
  category: 'classic' | 'thriller' | 'twist' | 'daily' | 'brain'
  tags: string[]
  cover?: string
  surface: string                  // 汤面
  bottom: string                   // 汤底
  hints: {
    light: string[]                // 轻提示
    medium: string[]               // 中提示
    strong: string[]               // 强提示
  }
  keywords: string[]               // 核心判题关键词
  coreFacts: string[]              // 真相关键点
  forbiddenTopics?: string[]       // 不适合问或不应直接透露的点
  estimatedQuestions?: number      // 预计提问数
  estimatedDuration?: number       // 预计时长（分钟）
  ageRating?: 'all' | '13+' | '16+'
  status: 'draft' | 'published'
}

### Message（对话消息）
type Message = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  answerType?: 'yes' | 'no' | 'irrelevant' | 'hint' | 'summary'
  createdAt: number
}

### GameSession（游戏会话）
type GameSession = {
  sessionId: string
  storyId: string
  status: 'playing' | 'revealed' | 'finished' | 'abandoned'
  questionCount: number
  usedHints: {
    light: number
    medium: number
    strong: number
  }
  startedAt: number
  endedAt?: number
  messages: Message[]
  guessedCorrectly: boolean
  revealReason?: 'user_click' | 'timeout' | 'correct_guess' | 'quit'
}

### PromptPayload（发给 AI 的数据）
type PromptPayload = {
  storyId: string
  surface: string
  bottom: string
  coreFacts: string[]
  keywords: string[]
  userQuestion: string
  history: Message[]
  mode: 'judge' | 'hint' | 'summary'
}
```

## 代码块

```markdown
## 难度定义标准

### easy（简单）
- 核心转折少
- 线索比较直白
- 5~8 个问题内可以接近真相
- 适合新手教学与首局体验

### medium（中等）
- 存在 1~2 个误导点
- 需要多轮排除无关方向
- 8~15 个问题内可推理完成
- 适合大部分普通玩家

### hard（困难）
- 信息隐藏更深
- 需要跨场景联想
- 误导项较强
- 可能需要提示系统辅助

### hell（地狱）
- 反直觉、脑洞大
- 对提问质量要求高
- 适合老玩家或挑战模式
- 默认应增加敏感提示与强提示保护
```

## 代码块

```markdown
## 核心流程

### 主流程
1. 玩家进入首页
2. 选择故事 / 难度 / 类型
3. 进入游戏页，展示汤面
4. 玩家输入问题
5. 系统校验问题是否合法
6. AI 根据汤底与规则判定回答
7. 返回“是 / 否 / 无关”或提示
8. 前端写入聊天记录并更新计数
9. 玩家继续提问，直到：
   - 猜中真相
   - 主动查看汤底
   - 主动结束游戏
10. 进入结果页，展示汤底与复盘信息
11. 玩家选择再来一局

### 提问处理流程
1. 用户输入问题
2. 前端执行输入规范化
3. 判断是否是有效问句：
   - 不能为空
   - 长度不能过长
   - 尽量引导成“是非题”
4. 构造 PromptPayload
5. 调用 AI 服务
6. 解析 AI 结果
7. 若结果非法，则执行兜底规则：
   - 非“是/否/无关”时进行结果归一化
   - 仍异常则由规则引擎返回“无关”
8. 渲染消息并滚动到底部

### 结束条件
- 玩家猜中关键真相
- 玩家点击“查看汤底”
- 玩家点击“结束游戏”
- 后续版本可增加：超时结束 / 达到最大提问数
```

## 代码块

```markdown
## AI Prompt 设计

### 基础主持人 Prompt
你是一个海龟汤游戏的主持人，你的唯一任务是根据“汤底真相”判断玩家的问题是否成立。

当前故事信息：
- 汤面：{surface}
- 汤底：{bottom}
- 核心事实：{coreFacts}
- 关键词：{keywords}

玩家会提出问题，你必须遵守以下规则：
1. 只能基于汤底判断，不允许自由发挥或新增设定
2. 默认只能回答以下三种之一：
   - “是”：玩家猜测与汤底一致
   - “否”：玩家猜测与汤底矛盾
   - “无关”：玩家猜测与汤底无直接关系，或无法从汤底判断
3. 不允许直接泄露汤底
4. 不允许解释原因
5. 不允许输出多余语气词、表情或长句
6. 若用户请求提示，则切换到提示模式
7. 若用户请求总结，则只总结已确认信息，不补充未知信息

玩家问题：{question}
请严格按规则回答。

### 提示模式 Prompt
你是海龟汤主持人。现在用户请求提示。
你不能直接说出汤底，只能根据当前故事给出分级提示。

提示等级：
- light：仅指出应该关注的方向
- medium：帮助用户排除错误方向
- strong：给出关键突破口，但不完整泄底

当前等级：{hintLevel}
当前故事汤底：{bottom}
已问历史：{history}

请输出一句提示，不超过 30 个字。

### 总结模式 Prompt
请基于已确认问答，输出用户目前已经确认的线索。
要求：
- 不得补充新信息
- 不得直接剧透汤底
- 使用简洁条目式语句
```

## 代码块

```markdown
## AI 回答稳定性方案

### 1. 双层判定机制
方案：
- 第一层：大模型理解用户问题语义
- 第二层：本地规则对结果做归一化与兜底

目标：
- 避免 AI 输出多余解释
- 避免前后矛盾
- 保证产品规则一致性

### 2. 输出归一化
将 AI 原始输出统一映射为：
- yes -> 是
- no -> 否
- irrelevant -> 无关
- hint -> 提示文本
- summary -> 总结文本

### 3. 异常处理
异常情况：
- AI 超时
- AI 输出为空
- AI 输出多段解释
- AI 回答与历史冲突

兜底策略：
- 超时：提示“AI 正在重新整理线索，请稍后再试”
- 空输出：重试 1 次
- 非法输出：使用规则引擎归类为“无关”
- 历史冲突：以前一次判断为准，并记录日志供后端排查

### 4. 建议的最优实现
- 对每道题人工维护 coreFacts / keywords / hints
- AI 负责理解玩家问题意图
- 规则引擎负责最终落地答案
- 复杂模式下再引入复盘生成能力
```

## 代码块

```markdown
## 题库设计建议

### MVP 阶段
- 先使用人工整理的静态题库
- 每道题必须包含：
  - 标题
  - 难度
  - 汤面
  - 汤底
  - 3级提示
  - 核心事实
  - 关键词
  - 敏感分级

### 后续阶段
- 后台可新增 / 编辑 / 删除题目
- 支持题目审核流程
- 支持 AI 辅助生成题目草稿
- 支持按类型和难度推荐

### 题库质量标准
- 汤面必须有悬念
- 汤底必须逻辑自洽
- 提示必须循序渐进
- 不能依赖极冷门常识
- 尽量避免歧义判断
```

## 代码块

```markdown
## 交互与视觉实现建议

### 整体风格
- 主色：深蓝、暗紫、黑色
- 辅色：冷青、品红、幽绿色
- 关键词：神秘、诡异、悬疑、仪式感

### 关键视觉元素
- 破碎边缘按钮
- 紫色 / 品红光晕
- 甲骨文感海龟图腾
- 微弱噪点、迷雾、星尘背景
- 打字机式文字揭晓动画

### 关键动效
- 开始按钮：悬停时轻微抖动 + 边缘裂纹光
- AI 回复前：显示“思考中”脉冲动画
- 汤底揭晓：分段渐显 + 背景暗化
- 卡片切换：淡入淡出 + 轻微缩放
- 错误输入：输入框短暂红色闪烁

### 氛围增强建议
- 页面切换不要太快，建议有 200~500ms 过渡
- 重要反馈不应瞬间出现，应有节奏感
- 使用少量环境音效（后续版本可选）
```

## 代码块

```markdown
## 安全与内容分级

### 内容风险
海龟汤题材可能涉及：
- 死亡
- 惊悚
- 暴力
- 心理不适
- 误导性内容

### 处理方案
- 为每道题添加 ageRating 和 warningTag
- 题目前显示“本题含惊悚元素”提示
- 首页支持筛除惊悚 / 血腥题材
- 新手模式优先展示轻量题目
- 后续如接入用户投稿，必须审核后发布
```

## 代码块

```markdown
## 埋点与数据分析

### 关键埋点
- enter_home                # 进入首页
- click_start_game          # 点击开始游戏
- select_story              # 选择题目
- send_question             # 发送问题
- use_hint_light            # 使用轻提示
- use_hint_medium           # 使用中提示
- use_hint_strong           # 使用强提示
- reveal_bottom             # 查看汤底
- quit_game                 # 中途退出
- finish_game               # 正常结束
- play_again                # 再来一局

### 关键指标
- 首局开始率
- 首局完成率
- 单局平均提问数
- 单局平均时长
- 提示使用率
- 查看汤底率
- 再来一局点击率
- 中途退出率

### 数据用途
- 判断哪类题目最容易流失
- 判断新手模式是否有效
- 判断 AI 规则是否过严或过松
- 判断提示系统是否合理
```

## 代码块

```markdown
## 开发阶段拆分建议

### Phase 1：静态 MVP
目标：
- 完成 3 个页面
- 接入本地静态题库
- 实现基础对话交互
- 不接真实 AI，只用规则模拟

交付：
- 首页 / 游戏页 / 结果页
- 3~5 道测试题
- 基础 UI 风格实现

### Phase 2：接入 AI
目标：
- 对接 DeepSeek / Claude API
- 完成问答裁判逻辑
- 增加提示模式与总结模式

交付：
- 可实际游玩的单人版本
- 基础异常处理与日志系统

### Phase 3：优化体验
目标：
- 增加新手引导
- 增强视觉动效
- 增加埋点与结果复盘
- 优化 Prompt 稳定性

### Phase 4：扩展版本
目标：
- 登录系统
- 记录保存
- 排行榜
- 自定义题目
- 多人模式
```

## 代码块

```markdown
## 验收标准

### 首页
- 用户能看到题目列表
- 能按难度查看或筛选
- 能点击进入具体题目
- 视觉风格符合神秘悬疑方向

### 游戏页
- 能正常显示汤面
- 用户可输入问题并发送
- AI 返回内容符合规则
- 对话历史可见
- 提示按钮、查看汤底、结束游戏按钮可用
- 10 次连续问答不出现明显格式错误

### 结果页
- 能正常展示完整汤底
- 能显示玩家提问统计与历史
- 再来一局按钮可跳转
- 页面有明显的揭晓感和完成感

### 技术验收
- 主要流程无阻塞
- 页面切换正常
- 刷新后关键数据不报错
- AI 接口异常时有兜底提示
- 核心组件具备 TypeScript 类型约束
```

## 代码块

```markdown
## 后续扩展方向

- 用户登录与进度保存
- 历史对局查看
- 用户成就系统
- 每日挑战题
- 用户投稿题库
- 多人合作模式
- 多人对抗模式
- AI 主持人风格切换（冷淡 / 神秘 / 戏谑 / 审判者）
- 音效与背景音乐系统
- 后台题库管理系统
```
