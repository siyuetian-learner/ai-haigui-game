const PDFDocument = require('C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\pdfkit');
const fs = require('fs');
const path = require('path');

const outDir = process.env.USERPROFILE || 'C:\\Users\\Administrator';
const outPath = path.join(outDir, 'Desktop', 'AI科技早报_2026年3月25日.pdf');

const FONT = 'C:\\Windows\\Fonts\\simhei.ttf';

// Colors
const DARK_BLUE = '#1A3A5C';
const MID_BLUE  = '#2E6DB4';
const LIGHT_BLUE = '#EBF3FB';
const GREEN     = '#27AE60';
const PURPLE    = '#8E44AD';
const RED       = '#C0392B';
const TEAL      = '#16A085';
const GRAY      = '#555555';

const doc = new PDFDocument({ size: 'A4', margin: 40 });
const out = fs.createWriteStream(outPath);
doc.pipe(out);

const W = doc.page.width - 80;

// HEADER
doc.rect(40, 40, W, 60).fill(DARK_BLUE);
doc.rect(40, 100, W, 24).fill(MID_BLUE);
doc.font(FONT).fontSize(22).fillColor('#FFFFFF').text('AI 科技早报', 40, 58, { width: W, align: 'center' });
doc.font(FONT).fontSize(10).fillColor('#B0D4FF').text('2026年3月25日 星期三  |  人工智能 × 大模型 × 科技趋势', 40, 106, { width: W, align: 'center' });

// METRICS
const mY = 136;
doc.rect(40, mY, W, 56).fill(LIGHT_BLUE);
const boxW = W / 3;
const metrics = [
  { val: '140万亿+', label: '日均词元(Token)调用量' },
  { val: '1000+倍',  label: '较2024年初增长' },
  { val: '40%+',     label: '较2025年底环比增长' },
];
metrics.forEach((m, i) => {
  const x = 40 + i * boxW;
  doc.font(FONT).fontSize(17).fillColor(MID_BLUE).text(m.val, x, mY + 8, { width: boxW, align: 'center' });
  doc.font(FONT).fontSize(8).fillColor(GRAY).text(m.label, x, mY + 30, { width: boxW, align: 'center' });
});

let y = 210;

function section(title, color) {
  doc.rect(40, y, W, 22).fill(color);
  doc.font(FONT).fontSize(11).fillColor('#FFFFFF').text(title, 50, y + 5, { width: W - 20 });
  y += 28;
}

function newsItem(num, title, body, source) {
  if (y > 740) { doc.addPage(); y = 50; }
  doc.font(FONT).fontSize(10).fillColor(MID_BLUE).text('【' + num + '】', 44, y);
  doc.font(FONT).fontSize(10.5).fillColor(DARK_BLUE).text(title, 66, y, { width: W - 26 });
  y += 16;
  doc.font(FONT).fontSize(9).fillColor(GRAY).text(body, 44, y, { width: W - 8, align: 'justify', lineGap: 1 });
  y += doc.heightOfString(body, { width: W - 8, align: 'justify' }) + 4;
  if (source) {
    doc.font(FONT).fontSize(7.5).fillColor('#999999').text(source, 44, y - 3);
    y += 2;
  }
  y += 6;
}

function trendItem(title, body, color) {
  if (y > 740) { doc.addPage(); y = 50; }
  doc.rect(40, y, 4, 18).fill(color);
  doc.font(FONT).fontSize(10.5).fillColor(color).text(title, 50, y + 1, { width: W - 16 });
  y += 18;
  doc.font(FONT).fontSize(9).fillColor(GRAY).text(body, 50, y, { width: W - 16, align: 'justify', lineGap: 1 });
  y += doc.heightOfString(body, { width: W - 16, align: 'justify' }) + 10;
}

// 国内动态
section('  国内动态  Domestic Highlights', GREEN);
newsItem(1, '我国日均词元调用量突破 140 万亿',
  '国家数据局局长刘烈宏在国新办新闻发布会上披露，截至2026年3月，我国日均词元（Token）调用量已超过140万亿，较2024年初的1000亿增长超过1000倍，较2025年底的100万亿环比增长40%+。有力证明中国AI产业已进入高速增长阶段，数字中国建设成效显著。',
  '来源：国新办 / 新浪财经');
newsItem(2, '第九届数字中国建设峰会：以数据要素赋能新型工业化',
  '国家数据局宣布新一轮高质量数据集建设行动计划，包括强基扩容、标注攻坚、提质增效、应用赋能等六大专项行动，以场景需求为牵引，打造AI-Ready高质量数据集，推动数字中国建设全面深化。',
  '来源：数字中国建设峰会组委会');
newsItem(3, 'AIGC 全面支撑 2026 央视春晚，工业化内容生产能力获验证',
  '2026年央视春晚AIGC技术应用含量高达80%，数字人与真人同屏共舞、虚拟场景动态渲染、AI模拟运镜轨迹等大规模应用全面落地，标志着AIGC已成为可稳定交付的生产力工具。',
  '来源：雷锋网');
newsItem(4, '中关村论坛：机器人从"单机表演"进化为"群体智能"',
  '2026中关村论坛年会上，多品牌机器人实现了集群式控制与协同任务执行，从单点演示转向AI与具体场景深度融合，机器人餐吧等多场景融合应用成为现场最热"打卡点"。',
  '来源：新华财经');
newsItem(5, '博鳌报告：全球AI发展呈"东移"趋势，亚洲从追随变引领',
  '《亚洲经济前景及一体化进程2026年度报告》指出，凭借庞大数字人口、丰富应用场景、完善产业链及系统化政策推动，亚洲经济体正从AI追随者转变为引领者，重塑全球AI创新秩序。',
  '来源：博鳌亚洲论坛');
y += 8;

// 国际动态
section('  国际动态  Global Highlights', PURPLE);
newsItem(1, 'OpenAI 完成新 AI 模型初步开发，Altman 战略重心转向基础设施',
  '据报道，OpenAI 已完成新 AI 模型的初步开发。Sam Altman 将不再直接负责 OpenAI 安全团队，工作重心转向数据中心建设、募资及供应链管理，战略布局从模型研发向基础设施全面倾斜。',
  '来源：钛媒体');
newsItem(2, '亚马逊 AWS AI 代理引美股软件板块暴跌，iGV 跌超 4.3%',
  '一则关于亚马逊 AWS 开发 AI 工具自动化销售与业务拓展职能的报道导致美股软件板块大幅下跌。iShares 扩展科技软件行业 ETF（iGV）跌超 4.3%，UiPath 和 HubSpot 跌超 8%，Palantir 和 SAP 跌超 4%，"AI颠覆逻辑"担忧再度升温。',
  '来源：新浪财经');
newsItem(3, '英伟达与微软联手开发核能领域 AI 工具',
  '英伟达与微软宣布合作开发面向核能行业的人工智能工具，扩大AI在能源领域应用版图。同日美光科技发布强劲业绩指引，AI支出正在为数据中心内存与存储组件创造"无上限"需求。',
  '来源：新浪财经');
newsItem(4, 'MIT 生成式 AI 让机器人"透视"障碍物精准操控隐藏物体',
  'MIT研究人员十余年磨一剑，结合生成式AI模型，根据障碍物反射的无线信号构建隐藏物体局部模型并补全缺失形态。该技术可保护环境中人员隐私，已计划构建无线信号领域大型基础模型。',
  '来源：科学网');
newsItem(5, '技术安达学院×剑桥大学：首次发现大型语言模型具有"动机"现象',
  '技术安达学院、赖希曼大学、剑桥大学和希伯来大学联合发表突破性研究（arXiv:2603.14347v1），首次系统性地证明大型语言模型具备类似人类的"动机"现象，成果发表于计算机科学领域顶级期刊。',
  '来源：技术安达学院 / arXiv');
y += 8;

// 关键趋势
section('  关键趋势分析  Trend Analysis', RED);
trendItem('1. AI 从"对话"到"执行"的范式跃迁',
  '2026 年以 Agent（智能体）为核心的应用生态百花齐放，AI 大模型正式告别聊天对话模式，迈入主动执行新阶段。评估模型的核心标准从"参数越大越好"转向"运行越高效越好"，MoE 架构、多模态融合、超长上下文成为标配。',
  '#C0392B');
trendItem('2. Token 经济加速成形，数据成为核心资产',
  '日均 Token 调用量从 2024 年初 1000 亿飙升至 140 万亿，Token 经济的价值正在被重新定义。数据要素市场化建设政策工具箱逐步完备，"确权难"问题有望破解，各方将更敢于供数、放心用数。',
  '#27AE60');
trendItem('3. AI"东移"加速，亚洲从跟随到引领',
  '博鳌报告指出亚洲 AI 发展呈现"东移"趋势，中国凭借庞大数字人口和丰富应用场景，正从追随者转变为引领者。亚马逊 AWS AI 代理对软件业的冲击，凸显"AI 颠覆逻辑"对传统行业的挑战已从概念变为现实。',
  '#2E6DB4');
trendItem('4. 硬件基础提速：玄铁 C950 打入云计算与 AI 边缘',
  '阿里巴巴达摩院发布玄铁 C950（RISC-V 架构），单核通用性能突破 SPECint2006 基准 70 分，全球性能最高的 RISC-V CPU，并首次原生支持 Qwen3、DeepSeek V3 等千亿参数大模型，适用于云计算、生成式 AI、高端机器人、边缘计算。',
  '#8E44AD');
trendItem('5. AI 气象预报突破：39 秒完成 5 天全球业务化预报',
  '中国气象科学研究院发布全球首个气溶胶-气象耦合 AI 预报模型 AI-GAMFS，仅需 39 秒即可完成未来 5 天、时段精细至 3 小时的全球业务化预报，54 个关键环境气象要素全覆盖，精度优于国际主流物理模型，成果发表于《自然》。',
  '#E67E22');
y += 8;

// 产业应用
section('  产业应用  Industry Applications', TEAL);
newsItem(1, 'AI 面试官全面上线，银行春招进入"人机协同"时代',
  '多家银行在2026春季校园招聘中大规模部署AI面试系统，对数据挖掘、人工智能等科技岗位应聘者进行AI面试筛选，全程记录答题内容、表情和动作。业内人士指出，这折射出银行业推进科技金融、数字金融转型的迫切需求。',
  '来源：中国金融信息网');
newsItem(2, '贵州省人工智能应用推广中心揭牌',
  '贵州省人工智能应用推广中心在贵阳国家高新区正式揭牌，同期召开贵州省人工智能供需对接会，加速推动AI技术在贵州各产业的落地应用。',
  '来源：贵州日报');
newsItem(3, '全球首个气溶胶 AI 预报模型 AI-GAMFS 落地',
  '该模型在沙尘、黑碳、硫酸盐等关键组分预报精度上优于国际主流物理模型，标志着 AI 在科学预测领域达到新高度，为全球气候变化应对提供更精准的数据支撑。',
  '来源：新浪科技');

// FOOTER
if (y > 740) { doc.addPage(); y = 50; }
doc.moveTo(40, y + 4).lineTo(40 + W, y + 4).strokeColor(MID_BLUE).stroke();
doc.font(FONT).fontSize(7.5).fillColor('#999999').text('AI 科技早报  |  2026年3月25日  |  仅供参考，不构成投资建议', 40, y + 10, { width: W, align: 'center' });

doc.end();
out.on('finish', function() { console.log('DONE:' + outPath); });
