const { chromium } = require('C:\\Program Files\\QClaw\\resources\\openclaw\\node_modules\\playwright-core');
const path = require('path');
const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>AI科技早报 2026年3月23日</title>
<style>
  @page { margin: 0; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Microsoft YaHei', 'PingFang SC', Arial, sans-serif;
    background: white;
    color: #1a1a2e;
    font-size: 13px;
    line-height: 1.7;
    width: 210mm;
  }
  .header {
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    color: white;
    padding: 36px 48px 32px;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 200px; height: 200px;
    background: rgba(99,102,241,0.15);
    border-radius: 50%;
  }
  .header-badge {
    display: inline-block;
    background: rgba(99,102,241,0.3);
    border: 1px solid rgba(99,102,241,0.5);
    color: #a5b4fc;
    font-size: 10px;
    letter-spacing: 2px;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 12px;
  }
  .header h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 6px;
    position: relative;
    z-index: 1;
  }
  .header h1 span { color: #818cf8; }
  .header-meta { color: rgba(255,255,255,0.6); font-size: 12px; }
  .header-stats {
    display: flex;
    gap: 40px;
    margin-top: 24px;
    position: relative;
    z-index: 1;
  }
  .stat-num { font-size: 26px; font-weight: 700; color: #818cf8; display: block; }
  .stat-label { font-size: 10px; color: rgba(255,255,255,0.5); letter-spacing: 1px; }

  .body { padding: 32px 48px; }

  .section-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #6366f1;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
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
    gap: 12px;
    margin-bottom: 28px;
  }
  .trend-card {
    background: linear-gradient(135deg, #f8f9ff, #eef0ff);
    border: 1px solid #e0e3ff;
    border-radius: 10px;
    padding: 16px;
    position: relative;
    overflow: hidden;
  }
  .trend-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
    border-radius: 3px 0 0 3px;
  }
  .trend-icon { font-size: 20px; margin-bottom: 8px; display: block; }
  .trend-title { font-size: 12px; font-weight: 700; color: #312e81; margin-bottom: 5px; }
  .trend-desc { font-size: 11px; color: #6b7280; line-height: 1.6; }
  .trend-tag {
    display: inline-block;
    background: #ede9fe;
    color: #7c3aed;
    font-size: 9px;
    padding: 2px 7px;
    border-radius: 10px;
    margin-top: 6px;
    font-weight: 600;
  }

  .insight-box {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border: 1px solid #f59e0b;
    border-radius: 10px;
    padding: 16px 20px;
    margin-bottom: 28px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .insight-icon { font-size: 24px; flex-shrink: 0; }
  .insight-title { font-size: 12px; font-weight: 700; color: #92400e; margin-bottom: 5px; }
  .insight-text { font-size: 12px; color: #78350f; line-height: 1.7; }

  .news-item {
    border-bottom: 1px solid #f1f5f9;
    padding: 16px 0;
    display: flex;
    gap: 16px;
  }
  .news-item:last-child { border-bottom: none; }
  .news-num {
    width: 30px; height: 30px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .news-content { flex: 1; }
  .news-header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
    flex-wrap: wrap;
  }
  .news-emoji { font-size: 16px; flex-shrink: 0; }
  .news-title { font-size: 14px; font-weight: 700; color: #1e1b4b; line-height: 1.5; flex: 1; }
  .news-tag {
    display: inline-block;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 10px;
    flex-shrink: 0;
    margin-top: 3px;
  }
  .tag-hot { background: #fee2e2; color: #dc2626; }
  .tag-biz { background: #fef3c7; color: #d97706; }
  .tag-tech { background: #dbeafe; color: #2563eb; }
  .tag-policy { background: #d1fae5; color: #059669; }
  .tag-china { background: #ede9fe; color: #7c3aed; }
  .news-body { font-size: 12px; color: #4b5563; line-height: 1.8; }
  .news-body strong { color: #374151; }

  .footer {
    background: #1e1b4b;
    color: rgba(255,255,255,0.5);
    padding: 18px 48px;
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-logo { color: #818cf8; font-weight: 700; font-size: 12px; }
</style>
</head>
<body>
<div class="header">
  <div class="header-badge">DAILY AI BRIEFING</div>
  <h1>AI科技 <span>早报</span></h1>
  <div class="header-meta">2026年3月23日 · 星期一 · 北京时间 10:00</div>
  <div class="header-stats">
    <div><span class="stat-num">10</span><span class="stat-label">条精选资讯</span></div>
    <div><span class="stat-num">3</span><span class="stat-label">大核心趋势</span></div>
    <div><span class="stat-num">5+</span><span class="stat-label">信息来源</span></div>
  </div>
</div>

<div class="body">
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

  <div class="insight-box">
    <div class="insight-icon">💡</div>
    <div>
      <div class="insight-title">今日核心洞察</div>
      <div class="insight-text">本周 AI 行业出现明显的"分层加速"信号：<strong>底层算力</strong>（马斯克 Terafab 芯片厂）、<strong>模型能力</strong>（美团 5600 亿参数开源）、<strong>应用入口</strong>（微信/桌面 Agent）三层同步推进。与此同时，<strong>商业化压力</strong>（OpenAI 广告）和<strong>版权风险</strong>（多起诉讼）正在重塑行业规则。国产模型调用量首超美国，标志着 AI 竞争格局进入新阶段。</div>
    </div>
  </div>

  <div class="section-title">📋 今日要闻</div>

  <div class="news-item">
    <div class="news-num">1</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">🔥</span><span class="news-title">美团开源 5600 亿参数数学大模型，刷新全球 SOTA</span><span class="news-tag tag-china">国产突破</span></div>
      <div class="news-body">美团正式开源 <strong>LongCat-Flash-Prover</strong>，采用 MoE 架构，专攻数学形式化证明。MiniF2F-Test 达到 <strong>97.1%</strong>，PutnamBench 解题率 <strong>41.5%</strong>，两项均刷新全球最佳。引入 Lean4 形式化语言消除 AI 幻觉，已在 GitHub 和 HuggingFace 全面开源。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">2</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">💰</span><span class="news-title">OpenAI 官宣 ChatGPT 免费版将投放广告</span><span class="news-tag tag-biz">商业化</span></div>
      <div class="news-body">坚持"无广告"多年后，OpenAI 宣布将在未来几周内向美国免费用户展示广告，广告技术公司 <strong>Criteo</strong> 为首批合作方，初始投放门槛 <strong>5-10 万美元</strong>。背后是算力成本持续攀升，订阅收入难以覆盖运营开支。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">3</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">🤖</span><span class="news-title">马斯克官宣 Grok Computer：AI 智能体接管你的电脑</span><span class="news-tag tag-hot">热点</span></div>
      <div class="news-body">马斯克确认 <strong>Grok Computer</strong> 即将上线，定位为 PC 的"大脑决策中心"，分执行层（操控鼠标键盘）和决策层（Grok 总指挥）两层架构。项目代号"<strong>巨硬（Macrohard）</strong>"，直接对标微软，目标是让 AI 自动化处理企业级文书任务。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">4</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">🚀</span><span class="news-title">小米 MiMo 大模型上线，雷军证实 MiClaw 电脑版在开发</span><span class="news-tag tag-china">国产</span></div>
      <div class="news-body">小米 <strong>MiMo-V2-Pro</strong> 全平台上线，联合 OpenClaw 等五大框架开启首周限免。雷军证实电脑版 AI 助手"MiClaw"正在开发，三年豪掷 <strong>600 亿</strong>押注 AI 赛道。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">5</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">💬</span><span class="news-title">腾讯推出微信 ClawBot 插件，AI 助手可直连微信</span><span class="news-tag tag-china">国产</span></div>
      <div class="news-body">腾讯上线微信 <strong>ClawBot</strong> 插件，用户可将 AI 助手"龙虾"直接接入微信聊天。腾讯同步重组 AI 研发体系，<strong>混元 3.0</strong> 预计 4 月发布。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">6</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">📊</span><span class="news-title">MiniMax 连续五周夺全球 AI 调用量冠军，中国超越美国</span><span class="news-tag tag-china">国产</span></div>
      <div class="news-body">国产大模型 <strong>MiniMax M2.5</strong> 价格仅为海外同类模型十分之一，连续五周登顶全球调用量榜首。中国 AI 调用量已<strong>超越美国</strong>，算力产业链进入"全链通胀"模式。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">7</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">🏗️</span><span class="news-title">马斯克披露 Terafab 芯片工厂计划，自建算力基础设施</span><span class="news-tag tag-tech">算力</span></div>
      <div class="news-body">马斯克透露将建设 <strong>Terafab</strong> 自研芯片工厂，专为特斯拉与 SpaceX 提供算力支撑，减少对英伟达依赖。未来与特斯拉 Optimus 机器人形成软硬一体 AI 生态闭环。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">8</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">⚖️</span><span class="news-title">大英百科全书起诉 OpenAI，AI 版权争议持续升温</span><span class="news-tag tag-policy">政策法规</span></div>
      <div class="news-body">大英百科全书对 OpenAI 提起诉讼，指控其未经授权大规模使用版权内容训练模型。与 <strong>Anthropic 15 亿美元</strong>版权和解案同期推进，知识界反击形成规模效应。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">9</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">✂️</span><span class="news-title">Cursor 承认底层基于 Moonshot AI 开源底座 Kimi</span><span class="news-tag tag-tech">技术</span></div>
      <div class="news-body">AI 编程工具 <strong>Cursor</strong> 发布 Composer2 模型，公开承认底层基于 Moonshot AI 开源底座 <strong>Kimi</strong>，再次印证国产基础模型正成为全球 AI 应用的重要底座。</div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-num">10</div>
    <div class="news-content">
      <div class="news-header"><span class="news-emoji">🎓</span><span class="news-title">Reddit CEO：将大规模扩招"AI 原生代"应届生</span><span class="news-tag tag-biz">行业动态</span></div>
      <div class="news-body">Reddit CEO 逆势宣布扩招，重点招募能与 AI 协作的新一代人才。OpenAI 同步计划 2026 年底扩员至 <strong>8000 人</strong>，增设"技术大使"加速企业级应用落地。</div>
    </div>
  </div>
</div>

<div class="footer">
  <span class="footer-logo">📰 AI科技早报</span>
  <span>由 QClaw AI 助手自动生成 · 2026年3月23日</span>
  <span>来源：AIbase · 虎嗅 · 机器之心</span>
</div>
</body>
</html>`;

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    
    // Write to a path we can access - try multiple locations
    const locations = [
      'C:\\Users\\Administrator\\Documents\\AI-Tech-Briefing-2026-03-23.pdf',
      'C:\\Users\\Administrator\\Desktop\\AI-Tech-Briefing-2026-03-23.pdf',
      'C:\\Users\\Administrator\\Downloads\\AI-Tech-Briefing-2026-03-23.pdf',
    ];
    
    let saved = false;
    for (const loc of locations) {
      try {
        require('fs').writeFileSync(loc, pdfBuffer);
        console.log('PDF_SAVED:' + loc);
        saved = true;
        break;
      } catch(e) {
        console.log('FAILED:' + loc + ':' + e.message);
      }
    }
    
    if (!saved) {
      console.log('PDF_SIZE:' + pdfBuffer.length);
      console.log('PDF_BASE64:' + pdfBuffer.toString('base64').substring(0, 100) + '...');
    }
    
  } catch(e) {
    console.error('ERROR:', e.message);
  } finally {
    if (browser) await browser.close();
  }
})();
