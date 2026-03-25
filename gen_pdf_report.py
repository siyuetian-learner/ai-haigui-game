# -*- coding: utf-8 -*-
import os, platform, base64, textwrap

script = textwrap.dedent('''
    # -*- coding: utf-8 -*-
    import os, platform, datetime
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
    from reportlab.lib.colors import HexColor
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
    from reportlab.lib.units import cm

    def _win_font_dirs():
        dirs = []
        try:
            import winreg
            key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\FontManagementService")
            font_dir = winreg.QueryValueEx(key, "FontPath")[0]
            winreg.CloseKey(key)
            if font_dir:
                dirs.append(font_dir)
        except Exception:
            pass
        windir = os.environ.get("WINDIR", "C:\\\\Windows")
        dirs.append(os.path.join(windir, "Fonts"))
        local = os.environ.get("LOCALAPPDATA", "")
        if local:
            dirs.append(os.path.join(local, "Microsoft", "Windows", "Fonts"))
        return dirs

    def register_chinese_font():
        font_files = [
            ("msyh.ttc",   "MicrosoftYaHei", 0),
            ("msyhbd.ttc", "MicrosoftYaHeiBold", 0),
            ("simhei.ttf", "SimHei", 0),
            ("simsun.ttc", "SimSun", 0),
        ]
        for d in _win_font_dirs():
            for fname, name, idx in font_files:
                p = os.path.join(d, fname)
                if os.path.exists(p):
                    try:
                        pdfmetrics.registerFont(TTFont(name, p, subfontIndex=idx))
                        return name
                    except Exception:
                        continue
        raise RuntimeError("No CJK font found")

    cn = register_chinese_font()
    styles = getSampleStyleSheet()

    # Colors
    DARK_BLUE = HexColor("#1A3A5C")
    MID_BLUE  = HexColor("#2E6DB4")
    LIGHT_BLUE = HexColor("#EBF3FB")
    ACCENT_RED = HexColor("#E74C3C")
    GRAY_TEXT  = HexColor("#555555")
    LINE_GRAY  = HexColor("#CCCCCC")

    # Custom styles
    title_style = ParagraphStyle("MainTitle",
        fontName=cn, fontSize=22, textColor=HexColor("#FFFFFF"),
        alignment=TA_CENTER, spaceAfter=4,
    )
    subtitle_style = ParagraphStyle("Subtitle",
        fontName=cn, fontSize=11, textColor=HexColor("#B0D4FF"),
        alignment=TA_CENTER, spaceAfter=2,
    )
    section_style = ParagraphStyle("SectionHead",
        fontName=cn, fontSize=13, textColor=HexColor("#FFFFFF"),
        alignment=TA_LEFT, spaceAfter=0,
    )
    news_title_style = ParagraphStyle("NewsTitle",
        fontName=cn, fontSize=11, textColor=DARK_BLUE,
        alignment=TA_LEFT, spaceAfter=2, leading=15,
    )
    news_body_style = ParagraphStyle("NewsBody",
        fontName=cn, fontSize=9.5, textColor=GRAY_TEXT,
        alignment=TA_JUSTIFY, spaceAfter=8, leading=14,
    )
    trend_style = ParagraphStyle("Trend",
        fontName=cn, fontSize=10, textColor=DARK_BLUE,
        alignment=TA_LEFT, spaceAfter=4, leading=14,
    )
    tag_style = ParagraphStyle("Tag",
        fontName=cn, fontSize=9, textColor=HexColor("#FFFFFF"),
        alignment=TA_CENTER,
    )

    def make_section_header(text, color=DARK_BLUE):
        data = [[Paragraph(text, section_style)]]
        t = Table(data, colWidths=[17*cm])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0,0), (-1,-1), color),
            ("LEFTPADDING", (0,0), (-1,-1), 10),
            ("RIGHTPADDING", (0,0), (-1,-1), 10),
            ("TOPPADDING", (0,0), (-1,-1), 6),
            ("BOTTOMPADDING", (0,0), (-1,-1), 6),
            ("ROUNDEDCORNERS", [4,4,4,4]),
        ]))
        return t

    def news_item(num, title, body, source=""):
        items = []
        num_para = Paragraph(f"<b>【{num}】</b>", ParagraphStyle("Num",
            fontName=cn, fontSize=11, textColor=MID_BLUE, alignment=TA_LEFT))
        title_para = Paragraph(f"<b>{title}</b>", news_title_style)
        body_para = Paragraph(body, news_body_style)
        if source:
            src = Paragraph(f"<font color='#999999'>{source}</font>", ParagraphStyle("Src",
                fontName=cn, fontSize=8, alignment=TA_LEFT))
            items.append(num_para)
            items.append(title_para)
            items.append(body_para)
            items.append(src)
        else:
            items.append(num_para)
            items.append(title_para)
            items.append(body_para)
        return items

    out_path = os.path.join(os.path.expanduser("~"), "Desktop", "AI科技早报_2026年3月25日.pdf")
    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=2*cm, rightMargin=2*cm,
        topMargin=2*cm, bottomMargin=2*cm,
    )

    story = []

    # ===== HEADER BANNER =====
    header_data = [[
        Paragraph("AI 科技早报", title_style),
    ]]
    header_table = Table(header_data, colWidths=[17*cm])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), DARK_BLUE),
        ("TOPPADDING", (0,0), (-1,-1), 16),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
    ]))
    story.append(header_table)

    sub_data = [[
        Paragraph("2026年3月25日 星期三 | 人工智能 × 大模型 × 科技趋势", subtitle_style),
    ]]
    sub_table = Table(sub_data, colWidths=[17*cm])
    sub_table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), MID_BLUE),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
    ]))
    story.append(sub_table)
    story.append(Spacer(1, 0.3*cm))

    # ===== KEY METRICS =====
    story.append(make_section_header("  核心数据 | Key Metrics", DARK_BLUE))
    metrics_data = [
        [
            Paragraph("140万亿+", ParagraphStyle("mval", fontName=cn, fontSize=18, textColor=MID_BLUE, alignment=TA_CENTER, fontName=cn)),
            Paragraph("1000+倍", ParagraphStyle("mval", fontName=cn, fontSize=18, textColor=MID_BLUE, alignment=TA_CENTER, fontName=cn)),
            Paragraph("40%+", ParagraphStyle("mval", fontName=cn, fontSize=18, textColor=MID_BLUE, alignment=TA_CENTER, fontName=cn)),
        ],
        [
            Paragraph("日均词元(Token)\n调用量", ParagraphStyle("mlabel", fontName=cn, fontSize=9, textColor=GRAY_TEXT, alignment=TA_CENTER, leading=13)),
            Paragraph("较2024年初\n增长倍数", ParagraphStyle("mlabel", fontName=cn, fontSize=9, textColor=GRAY_TEXT, alignment=TA_CENTER, leading=13)),
            Paragraph("较2025年底\n环比增长", ParagraphStyle("mlabel", fontName=cn, fontSize=9, textColor=GRAY_TEXT, alignment=TA_CENTER, leading=13)),
        ],
    ]
    metrics_table = Table(metrics_data, colWidths=[5.67*cm, 5.67*cm, 5.67*cm])
    metrics_table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), LIGHT_BLUE),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LINEAFTER", (0,0), (1,-1), 0.5, LINE_GRAY),
        ("BOX", (0,0), (-1,-1), 0.5, LINE_GRAY),
    ]))
    story.append(metrics_table)
    story.append(Spacer(1, 0.4*cm))

    # ===== SECTION 1: 国内动态 =====
    story.append(make_section_header("  国内动态 | Domestic Highlights", HexColor("#27AE60")))

    domestic = [
        ("我国日均词元调用量突破 140 万亿", 
         "国家数据局局长刘烈宏在国新办新闻发布会上披露，截至2026年3月，我国日均词元（Token）调用量已超过140万亿，较2024年初的1000亿增长超过1000倍，较2025年底的100万亿环比增长40%+。这一数据有力证明中国AI产业已进入高速增长阶段，数字中国建设成效显著。",
         "来源：国新办发布会 / 新浪财经"),
        ("第九届数字中国建设峰会即将举办",
         "本届峰会将专题讨论"数据要素赋能新型工业化"，国家数据局宣布新一轮高质量数据集建设行动计划，包括强基扩容、标注攻坚、提质增效、应用赋能等六大专项行动，以场景需求为牵引，打造AI-Ready高质量数据集。",
         "来源：数字中国建设峰会组委会"),
        ("AIGC 全面支撑 2026 央视春晚，内容工业化生产能力获验证",
         "2026年央视春晚AIGC技术应用含量高达80%，数字人与真人同屏共舞、虚拟场景动态渲染、AI模拟运镜轨迹等大规模应用，标志着AIGC已具备支撑工业化内容生产的能力，成为可稳定交付的生产力工具。",
         "来源：雷锋网"),
        ("中关村论坛：机器人从\"单机表演\"进化为\"群体智能\"",
         "2026中关村论坛年会上，多品牌机器人实现了集群式控制与协同任务执行。机器人展示内容从单点演示转向AI与具体场景深度融合，机器人餐吧等多场景融合应用成为现场最热"打卡点"。",
         "来源：新华财经"),
        ("博鳌报告：全球AI发展呈\"东移\"趋势，亚洲从追随变引领者",
         "《亚洲经济前景及一体化进程2026年度报告》指出，凭借庞大数字人口、丰富应用场景、完善产业链及系统化政策推动，亚洲经济体正从AI追随者转变为引领者，重塑全球AI创新秩序。",
         "来源：博鳌亚洲论坛"),
    ]

    for i, (t, b, s) in enumerate(domestic, 1):
        for para in news_item(i, t, b, s):
            story.append(para)
        story.append(Spacer(1, 0.1*cm))

    story.append(Spacer(1, 0.3*cm))

    # ===== SECTION 2: 国际动态 =====
    story.append(make_section_header("  国际动态 | Global Highlights", HexColor("#8E44AD")))

    global_news = [
        ("OpenAI 完成新 AI 模型初步开发，Altman 转向数据中心建设",
         "据报道，OpenAI 已完成新 AI 模型的初步开发。Sam Altman 将不再直接负责 OpenAI 安全团队，工作重心转向数据中心建设、募资及供应链管理。这一战略调整意味着 OpenAI 正从模型研发向基础设施倾斜。",
         "来源：钛媒体"),
        ("亚马逊 AWS 开发 AI 代理引爆软件板块恐慌，iGV 跌超 4.3%",
         "一则关于亚马逊开发 AI 工具自动化销售与业务拓展职能的报道，导致美股软件板块大幅下跌。iShares 扩展科技软件行业 ETF（iGV）跌超 4.3%，UiPath 和 HubSpot 跌超 8%，Palantir 和 SAP 跌超 4%。市场对\"AI 颠覆逻辑\"的担忧再度升温。",
         "来源：新浪财经"),
        ("英伟达与微软联手开发核能领域 AI 工具",
         "英伟达与微软宣布合作开发面向核能行业的人工智能工具，进一步扩大 AI 在能源领域的应用版图。同日，美光科技发布强劲业绩指引，AI 支出正在为数据中心内存与存储组件创造"无上限"需求。",
         "来源：新浪财经"),
        ("MIT 用生成式 AI 让机器人\"透视\"障碍物精准操控隐藏物体",
         "MIT 研究人员十余年磨一剑，结合生成式 AI 模型，根据障碍物反射的无线信号构建隐藏物体局部模型，并补全其缺失形态。该技术可保护环境中人员隐私，已计划构建无线信号领域大型基础模型。",
         "来源：科学网"),
        ("技术安达学院×剑桥大学：首次发现大型语言模型具有\"动机\"现象",
         "技术安达学院、赖希曼大学、剑桥大学和希伯来大学联合发表突破性研究（arXiv:2603.14347v1），首次系统性地证明大型语言模型具备类似人类的\"动机\"现象，研究成果已发表于计算机科学领域顶级期刊。",
         "来源：技术安达学院"),
    ]

    for i, (t, b, s) in enumerate(global_news, 1):
        for para in news_item(i, t, b, s):
            story.append(para)
        story.append(Spacer(1, 0.1*cm))

    story.append(Spacer(1, 0.3*cm))

    # ===== SECTION 3: 关键趋势分析 =====
    story.append(make_section_header("  关键趋势分析 | Trend Analysis", ACCENT_RED))

    trends = [
        ("1. AI 从\"对话\"到\"执行\"的范式跃迁",
         "2026 年以 Agent（智能体）为核心的应用生态百花齐放，AI 大模型正式告别聊天对话模式，迈入主动执行新阶段。评估模型的核心标准从\"参数越大越好\"转向\"运行越高效越好\"，MoE 架构、多模态融合、超长上下文成为标配。",
         HexColor("#E74C3C")),
        ("2. Token 经济加速成形，数据成为核心资产",
         "日均 Token 调用量从 2024 年初 1000 亿飙升至 140 万亿，Token 经济的价值正在被重新定义。数据要素市场化建设政策工具箱逐步完备，\"确权难\"问题有望破解，各方将更敢于供数、放心用数。",
         HexColor("#27AE60")),
        ("3. AI\"东移\"加速，亚洲从跟随到引领",
         "博鳌报告显示亚洲 AI 发展呈现\"东移\"趋势，中国凭借庞大数字人口和丰富应用场景，正从追随者转变为引领者。与此同时，亚马逊 AWS AI 代理对软件业的冲击，凸显出\"AI 颠覆逻辑\"对传统行业的挑战已从概念变为现实。",
         HexColor("#2E6DB4")),
        ("4. 硬件基础提速：玄铁 C950 打入云计算与 AI 边缘",
         "阿里巴巴达摩院发布玄铁 C950（RISC-V 架构），单核通用性能突破 SPECint2006 基准 70 分，全球性能最高的 RISC-V CPU，并首次原生支持 Qwen3、DeepSeek V3 等千亿参数大模型，适用于云计算、生成式 AI、高端机器人、边缘计算。",
         HexColor("#8E44AD")),
        ("5. AI 气象预报突破：39 秒完成 5 天全球业务化预报",
         "中国气象科学研究院发布全球首个气溶胶-气象耦合 AI 预报模型 AI-GAMFS，仅需 39 秒即可完成未来 5 天、时段精细至 3 小时的全球业务化预报，54 个关键环境气象要素全覆盖，精度优于国际主流物理模型，成果发表于《自然》。",
         HexColor("#E67E22")),
    ]

    for t, b, c in trends:
        trend_head = Paragraph(f"<b>{t}</b>", ParagraphStyle("TrendHead",
            fontName=cn, fontSize=11, textColor=c, alignment=TA_LEFT, spaceAfter=2, leading=15))
        trend_body = Paragraph(b, trend_style)
        story.append(trend_head)
        story.append(trend_body)
        story.append(Spacer(1, 0.15*cm))

    story.append(Spacer(1, 0.3*cm))

    # ===== SECTION 4: 产业应用 =====
    story.append(make_section_header("  产业应用 | Industry Applications", HexColor("#16A085")))

    apps = [
        ("AI 面试官全面上线，银行春招进入\"人机协同\"时代",
         "多家银行在2026春季校园招聘中大规模部署AI面试系统，对数据挖掘、人工智能等科技岗位应聘者进行AI面试筛选，全程记录答题内容、表情和动作。业内人士指出，这折射出银行业推进科技金融、数字金融转型的迫切需求。",
         "来源：中国金融信息网"),
        ("贵州省人工智能应用推广中心揭牌",
         "贵州省人工智能应用推广中心在贵阳国家高新区正式揭牌，同期召开贵州省人工智能供需对接会，加速推动AI技术在贵州各产业的落地应用。",
         "来源：贵州日报"),
        ("全球首个气溶胶 AI 预报模型 AI-GAMFS 落地",
         "该模型在沙尘、黑碳、硫酸盐等关键组分预报精度上优于国际主流物理模型，标志着 AI 在科学预测领域达到新高度，为全球气候变化应对提供更精准的数据支撑。",
         "来源：新浪科技"),
    ]

    for i, (t, b, s) in enumerate(apps, 1):
        for para in news_item(i, t, b, s):
            story.append(para)
        story.append(Spacer(1, 0.1*cm))

    story.append(Spacer(1, 0.4*cm))

    # ===== FOOTER =====
    story.append(HRFlowable(width="100%", thickness=1, color=MID_BLUE))
    story.append(Spacer(1, 0.2*cm))
    footer_data = [[
        Paragraph("AI 科技早报 | 2026年3月25日 | 仅供参考，不构成投资建议", ParagraphStyle("Footer",
            fontName=cn, fontSize=8, textColor=GRAY_TEXT, alignment=TA_CENTER)),
    ]]
    footer_table = Table(footer_data, colWidths=[17*cm])
    footer_table.setStyle(TableStyle([
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("TOPPADDING", (0,0), (-1,-1), 4),
    ]))
    story.append(footer_table)

    doc.build(story)
    print("PDF_SAVED:" + out_path)
''').encode('utf-8')

payload = base64.b64encode(script).decode()
launch = (
    'import base64,os\\n'
    'open("gen_pdf_report.py","wb").write(base64.b64decode("' + payload + '"))\\n'
    'exit(os.system("python gen_pdf_report.py"))\\n'
)
with open("launch_pdf.py", "w") as f:
    f.write(launch)
os.system("python launch_pdf.py")
''').strip()

with open("C:\\Users\\Administrator\\.qclaw\\workspace\\gen_pdf.py", "w") as f:
    f.write("# -*- coding: utf-8 -*-\n" + script.decode('utf-8'))

# Write launcher
launcher = 'import base64,os\nout=open("gp.py","wb");out.write(base64.b64decode("{}"));out.close()\nos.system("python gp.py")'.format(base64.b64encode(script).decode())
with open("C:\\Users\\Administrator\\.qclaw\\workspace\\launch_pdf.py", "w") as f:
    f.write(launcher)
