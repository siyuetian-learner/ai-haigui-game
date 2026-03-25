const fs = require('fs');
const path = require('path');

// PDF generation using pure JS - create HTML first then convert
// We'll use a simple approach: generate HTML and use puppeteer if available,
// otherwise fall back to a well-formatted HTML file that can be printed to PDF

const today = '2026年3月23日';
const outDir = process.env.TEMP || (process.env.USERPROFILE + '\\AppData\\Local\\Temp');

const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI科技早报 ${today}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
    background: #f5f7fa;
    color: #1a1a2e;
    font-size: 14px;
    line-height: 1.7;
  }
  .page {
    max-width: 860px;
    margin: 0 auto;
    background: white;
    min-height: 100vh;
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    color: white;
    padding: 48px 56px 40px;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 240px; height: 240px;
    background: rgba(99,102,241,0.15);
    border-radius: 50%;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -40px; left: 40%;
    width: 160px; height: 160px;
    background: rgba(139,92,246,0.1);
    border-radius: 50%;
  }
  .header-badge {
    display: inline-block;
    background: rgba(99,102,241,0.3);
    border: 1px solid rgba(99,102,241,0.5);
    color: #a5b4fc;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 16px;
  }
  .header h1 {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 8px;
    position: relative;
    z-index: 1;
  }
  .header h1 span { color: #818cf8; }
  .header-meta {
    color: rgba(255,255,255,0.6);
    font-size: 13px;
    position: relative;
    z-index: 1;
  }
  .header-stats {
    display: flex;
    gap: 32px;
    margin-top: 28px;
    position: relative;
    z-index: 1;
  }
  .stat-item { text-align: center; }
  .stat-num {
    font-size: 28px;
    font-weight: 700;
    color: #818cf8;
    display: block;
  }
  .stat-label {
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 1px;
  }

  /* Body */
  .body { padding: 40px 56px; }

  /* Trend Analysis */
  .section-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #6366f1;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, #6366f1, transparent);
  }

  .trend-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }
  .trend-card {
    background: linear-gradient(135deg, #f8f9ff, #eef0ff);
    border: 1px solid #e0e3ff;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }
  .trend-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 4px; height: 100%;
    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
    border-radius: 4px 0 0 4px;
  }
  .trend-icon { font-size: 24px; margin-bottom: 10px; display: block; }
  .trend-title {
    font-size: 13px;
    font-weight: 700;
    color: #312e81;
    margin-bottom: 6px;
  }
  .trend-desc {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.6;
  }
  .trend-tag {
    display: inline-block;
    background: #ede9fe;
    color: #7c3aed;
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 10px;
    margin-top: 8px;
    font-weight: 600;
  }

  /* Key Insight Box */
  .insight-box {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border: 1px solid #f59e0b;
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 40px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .insight-icon { font-size: 28px; flex-shrink: 0; }
  .insight-title {
    font-size: 13px;
    font-weight: 700;
    color: #92400e;
    margin-bottom: 6px;
  }
  .insight-text { font-size: 13px; color: #78350f; line-height: 1.7; }

  /* News Items */
  .news-item {
    border-bottom: 1px solid #f1f5f9;
    padding: 24px 0;
    display: flex;
    gap: 20px;
  }
  .news-item:last-child { border-bottom: none; }
  .news-num {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .news-content { flex: 1; }
  .news-header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .news-emoji { font-size: 18px; flex-shrink: 0; }
  .news-title {
    font-size: 15px;
    font-weight: 700;
    color: #1e1b4b;
    line-height: 1.5;
    flex: 1;
  }
  .news-tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 10px;
    flex-shrink: 0;
    margin-top: 3px;
  }
  .tag-hot { background: #fee2e2; color: #dc2626; }
  .tag-biz { background: #fef3c7; color: #d97706; }
  .tag-tech { background: #dbeafe; color: #2563eb; }
  .tag-policy { background: #d1fae5; color: #059669; }
  .tag-china { background: #ede9fe; color: #7c3aed; }
  .news-body {
    font-size: 13px;
    color: #4b5563;
    line-height: 1.8;
  }
  .news-body strong { color: #374151; }

  /* Footer */
  .footer {
    background: #1e1b4b;
    color: rgba(255,255,255,0.5);
    padding: 24px 56px;
    font-size: 11px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-logo { color: #818cf8; font-weight: 700; font-size: 13px; }

  @media print {
    body { background: white; }
    .page { max-width: 100%; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="header-badge">📰 Daily AI Briefing</div>
    <h1>AI科技 <span>早报</span></h1>
    <div class="header-meta">${today} · 星期一 · 北京时间 10:00</div>
    <div class="header-stats">
      <div class="stat-item">
        <span class="stat-num">10</span>
        <span class="stat-label">条精选资讯</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">3</span>
        <span class="stat-label">大核心趋势</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">5+</span>
        <span class="stat-label">信息来源</span>
      </div>
    </div>
  </div>

  <div class="body">

    <!-- Trend Analysis -->
    <div class="section-title">🔍 关键趋势分析</div>
    <div class="trend-grid">
      <div class="trend-card">
        <span class="trend-icon">🏭</span>
        <div class="trend-title">国产大模型全面爆发</div>
        <div class="trend-desc">美团、小米、MiniMax、腾讯同日发力，国产模型在参数规模、调用量、生态整合三个维度同步突破，与海外差距快速收窄。</div>
        <span class="trend-tag">↑ 加速</span>
      </div>
      <div class="trend-card">
        <span class="trend-icon">💻</span>
        <div class="trend-title">AI Agent 争夺桌面入口</div>
        <div class="trend-desc">马斯克 Grok Computer、小米 MiClaw、腾讯微信 ClawBot 同步布局，AI 从"对话框"向"操作系统级"演进，桌面控制权争夺白热化。</div>
        <span class="trend-tag">↑ 关键战场</span>
      </div>
      <div class="trend-card">
        <span class="trend-icon">⚖️</span>
        <div class="trend-title">商业化与版权双重压力</div>
        <div class="trend-desc">OpenAI 引入广告变现，大英百科全书起诉 AI 训练侵权，Anthropic 版权和解推进——AI 行业正从技术竞赛转向商业与法律的双重博弈。</div>
        <span class="trend-tag">⚠️ 风险</span>
      </div>
    </div>

    <!-- Key Insight -->
    <div class="insight-box">
      <div class="insight-icon">💡</div>
      <div>
        <div class="insight-title">今日核心洞察</div>
        <div class="insight-text">
          本周 AI 行业出现明显的"分层加速"信号：<strong>底层算力</strong>（马斯克 Terafab 芯片厂）、<strong>模型能力</strong>（美团 5600 亿参数开源）、<strong>应用入口</strong>（微信/桌面 Agent）三层同步推进。与此同时，<strong>商业化压力</strong>（OpenAI 广告）和<strong>版权风险</strong>（多起诉讼）正在重塑行业规则。国产模型调用量首超美国，标志着 AI 竞争格局进入新阶段。
        </div>
      </div>
    </div>

    <!-- News List -->
    <div class="section-title">📋 今日要闻</div>

    <div class="news-item">
      <div class="news-num">1</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">🔥</span>
          <span class="news-title">美团开源 5600 亿参数数学大模型，刷新全球 SOTA</span>
          <span class="news-tag tag-china">国产突破</span>
        </div>
        <div class="news-body">
          美团正式开源 <strong>LongCat-Flash-Prover</strong>，采用 MoE 架构，专攻数学形式化证明。在 MiniF2F-Test 测试中达到 <strong>97.1%</strong>，PutnamBench 解题率 <strong>41.5%</strong>，两项均刷新全球最佳。引入 Lean4 形式化语言从根源消除 AI 幻觉，已在 GitHub 和 HuggingFace 全面开源。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">2</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">💰</span>
          <span class="news-title">OpenAI 官宣 ChatGPT 免费版将投放广告</span>
          <span class="news-tag tag-biz">商业化</span>
        </div>
        <div class="news-body">
          坚持"无广告"多年后，OpenAI 宣布将在未来几周内向美国免费用户展示广告，广告技术公司 <strong>Criteo</strong> 为首批合作方，初始投放门槛 <strong>5-10 万美元</strong>。背后原因是算力成本持续攀升，订阅收入难以覆盖运营开支，广告将以更自然的对话流形式嵌入。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">3</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">🤖</span>
          <span class="news-title">马斯克官宣 Grok Computer：AI 智能体接管你的电脑</span>
          <span class="news-tag tag-hot">热点</span>
        </div>
        <div class="news-body">
          马斯克确认 <strong>Grok Computer</strong> 即将上线，定位为 PC 的"大脑决策中心"，分为执行层（操控鼠标键盘）和决策层（Grok 总指挥）两层架构。项目代号"<strong>巨硬（Macrohard）</strong>"，直接对标微软，目标是让 AI 自动化处理企业级文书任务，甚至模拟整家公司运营。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">4</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">🚀</span>
          <span class="news-title">小米 MiMo 大模型上线，雷军证实 MiClaw 电脑版在开发</span>
          <span class="news-tag tag-china">国产</span>
        </div>
        <div class="news-body">
          小米 <strong>MiMo-V2-Pro</strong> 大模型全平台上线，联合 OpenClaw 等五大框架开启首周限免。雷军同时证实，小米电脑版 AI 助手"MiClaw（龙虾）"正在开发中，三年豪掷 <strong>600 亿</strong>押注 AI 赛道，小米 SU7 同步升级。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">5</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">💬</span>
          <span class="news-title">腾讯推出微信 ClawBot 插件，个人 AI 助手可直连微信</span>
          <span class="news-tag tag-china">国产</span>
        </div>
        <div class="news-body">
          腾讯上线微信 <strong>ClawBot</strong> 插件，用户可将 AI 助手"龙虾"直接接入微信聊天。虎嗅实测显示目前功能尚在早期，但方向被认为是微信生态 AI 化的重要一步。腾讯同步重组 AI 研发体系，<strong>混元 3.0</strong> 预计 4 月发布。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">6</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">📊</span>
          <span class="news-title">MiniMax 连续五周夺全球 AI 调用量冠军，中国超越美国</span>
          <span class="news-tag tag-china">国产</span>
        </div>
        <div class="news-body">
          国产大模型 <strong>MiniMax M2.5</strong> 价格仅为海外同类模型十分之一，连续五周登顶全球调用量榜首。中国 AI 调用量已<strong>超越美国</strong>，算力产业链进入"全链通胀"模式，国产模型性价比优势持续扩大。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">7</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">🏗️</span>
          <span class="news-title">马斯克披露 Terafab 芯片工厂计划，自建算力基础设施</span>
          <span class="news-tag tag-tech">算力</span>
        </div>
        <div class="news-body">
          马斯克透露将建设 <strong>Terafab</strong> 自研芯片工厂，专为特斯拉与 SpaceX 提供算力支撑，减少对英伟达的依赖。未来"数字擎天柱"AI 将与特斯拉 Optimus 机器人形成联动，构建软硬一体的 AI 生态闭环。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">8</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">⚖️</span>
          <span class="news-title">大英百科全书起诉 OpenAI，AI 版权争议持续升温</span>
          <span class="news-tag tag-policy">政策法规</span>
        </div>
        <div class="news-body">
          大英百科全书对 OpenAI 提起诉讼，指控其在未经授权的情况下大规模使用版权内容训练模型。此案与 <strong>Anthropic 15 亿美元</strong>版权和解案同期推进，知识界对 AI"搭便车"行为的反击正在形成规模效应。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">9</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">✂️</span>
          <span class="news-title">Cursor 承认底层基于 Moonshot AI 开源底座 Kimi</span>
          <span class="news-tag tag-tech">技术</span>
        </div>
        <div class="news-body">
          AI 编程工具 <strong>Cursor</strong> 发布 Composer2 模型，并公开承认其底层基于 Moonshot AI 开源底座 <strong>Kimi</strong>。这一披露引发开发者社区广泛讨论，也再次印证国产基础模型正在成为全球 AI 应用的重要底座。
        </div>
      </div>
    </div>

    <div class="news-item">
      <div class="news-num">10</div>
      <div class="news-content">
        <div class="news-header">
          <span class="news-emoji">🎓</span>
          <span class="news-title">Reddit CEO：将大规模扩招"AI 原生代"应届生</span>
          <span class="news-tag tag-biz">行业动态</span>
        </div>
        <div class="news-body">
          Reddit CEO 逆势宣布扩招，明确表示不担心 AI 取代岗位，将重点招募能与 AI 协作的新一代人才。OpenAI 同步计划 2026 年底扩员至 <strong>8000 人</strong>，增设"技术大使"加速企业级应用落地，科技公司人才战略正在重构。
        </div>
      </div>
    </div>

  </div>

  <!-- Footer -->
  <div class="footer">
    <span class="footer-logo">📰 AI科技早报</span>
    <span>由 QClaw AI 助手自动生成 · ${today}</span>
    <span>来源：AIbase · 虎嗅 · 机器之心</span>
  </div>

</div>
</body>
</html>`;

const htmlPath = path.join(outDir, 'ai-tech-briefing-2026-03-23.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('HTML_WRITTEN:' + htmlPath);
