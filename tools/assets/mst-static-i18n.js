(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MSTStaticI18n = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  var DEFAULT_LANG = 'en';
  var TEXT = {
    zh: {
      'Home': '首页',
      'Store / RFQ': '商城 / 询价',
      'MPW': 'MPW',
      'P&ID to SolidWorks': 'P&ID 到 SolidWorks',
      'Tools': '工具',
      'Design Automation': '设计自动化',
      'News': '新闻',
      'Mail': '邮箱',
      'Language': '语言',
      'MST Home': 'MST 首页',
      'Main navigation': '主导航',
      'Moore Solution Technology': 'Moore Solution Technology',
      'MST Open Tools - free MPW, P&ID and engineering RFQ utilities': 'MST 开放工具 - 免费 MPW、P&ID 与工程 RFQ 工具',
      'BOM RFQ Normalizer - sourcing-ready MPN manufacturer quantity CSV | MST': 'BOM RFQ 规范化工具 - 可寻源 MPN、制造商、数量 CSV | MST',
      'GDS/OASIS Handoff Manifest Generator - file checklist | MST': 'GDS/OASIS 交付清单生成器 - 文件检查清单 | MST',
      'MPW Prototype Estimator — dies per wafer, reticle utilization, indicative cost | MST': 'MPW 原型估算器 - 每片 die 数、光罩利用率与指示性成本 | MST',
      'Local GDSII Inspector — die size, layers & cell tree, 100% in your browser | MST': '本地 GDSII 检查器 - die 尺寸、层与 cell 树，100% 浏览器本地运行 | MST',
      'MPW Reticle & Wafer Planner — free shared-reticle floorplan, yield & cost-share tool | MST': 'MPW 光罩与晶圆规划器 - 免费共享光罩布局、良率与成本分摊工具 | MST',
      'MPW Procurement Timeline Planner - reverse schedule | MST': 'MPW 采购时间线规划器 - 反向排期 | MST',
      'MPW Tapeout Readiness Checker - PDK, DRC/LVS and RFQ gaps | MST': 'MPW 流片准备度检查器 - PDK、DRC/LVS 与 RFQ 缺口 | MST',
      'MPW RFQ Pack Builder - non-confidential tapeout brief generator | MST': 'MPW RFQ 包生成器 - 非保密流片 brief 生成器 | MST',
      'MPW Shuttle Schedule Finder - public-source schedule filter | MST': 'MPW Shuttle 排期筛选器 - 公开来源排期筛选 | MST',
      'Package & Assembly Selector - QFN BGA WLCSP COB guidance | MST': '封装与装配选择器 - QFN、BGA、WLCSP、COB 指引 | MST',
      'PDK / Foundry Requirement Checklist - DRC LVS models | MST': 'PDK / Foundry 需求检查清单 - DRC、LVS、模型 | MST',
      'P&ID Assembly Intake Checklist - native SOLIDWORKS pilot brief | MST': 'P&ID 装配 Intake 检查清单 - 原生 SOLIDWORKS pilot brief | MST',
      'P&ID BOM Completeness Checker - tag MPN material connection | MST': 'P&ID BOM 完整度检查器 - tag、MPN、材料与连接 | MST',
      'P&ID Tag & Instrument Index Parser - MFC valve pressure tags | MST': 'P&ID 标签与仪表索引解析器 - MFC、阀门、压力标签 | MST',
      'UHP Gas Stick Rule Checklist - SEMI F82 VCR C-seal weld | MST': 'UHP Gas Stick 规则检查清单 - SEMI F82、VCR、C-seal、焊接 | MST',
      'Free browser tools from MST for MPW planning, tapeout readiness checking, non-confidential RFQ preparation, local-only GDSII inspection, P&ID-to-SOLIDWORKS intake and engineering sourcing workflows.': 'MST 免费浏览器工具，覆盖 MPW 规划、流片准备度检查、非保密 RFQ 准备、本地 GDSII 检查、P&ID 到 SOLIDWORKS intake 和工程寻源流程。',
      'A dedicated directory for real browser tools: MPW planning, tapeout readiness checking, local GDSII inspection, non-confidential RFQ packs, P&ID-to-SOLIDWORKS intake and engineering sourcing utilities.': '真实浏览器工具目录：MPW 规划、流片准备度检查、本地 GDSII 检查、非保密 RFQ 包、P&ID 到 SOLIDWORKS intake 和工程寻源工具。',
      'Engineering and RFQ tools': '工程与询价工具',
      'Free tools for': '免费工具',
      'Free tools for MPW, P&ID and sourcing work.': '面向 MPW、P&ID 和寻源工作的免费工具。',
      'MST publishes practical browser tools for engineers, founders and procurement teams: MPW planning, local-only GDSII inspection, non-confidential RFQ packs, and P&ID-to-SOLIDWORKS intake. The goal is simple: help users do useful work before they contact us.': 'MST 发布面向工程师、创业团队和采购团队的实用浏览器工具：MPW 规划、本地 GDSII 检查、非保密 RFQ 包，以及 P&ID 到 SOLIDWORKS 的 intake。目标很简单：在联系 MST 之前，先帮助用户完成有用的准备工作。',
      'Check MPW readiness': '检查 MPW 准备度',
      'Build MPW RFQ Pack': '生成 MPW RFQ 包',
      'P&ID Intake Tool': 'P&ID Intake 工具',
      '15 live tools': '15 个在线工具',
      'MPW, GDSII, P&ID, UHP and sourcing utilities.': '覆盖 MPW、GDSII、P&ID、UHP 和寻源的工具。',
      'Browser-first': '浏览器优先',
      'Tools run locally and avoid confidential uploads.': '工具在本地浏览器运行，避免上传保密文件。',
      'Open-source path': '开源路径',
      'MPW utilities are mirrored to GitHub.': 'MPW 工具已同步到 GitHub。',
      'Live MPW tools': '在线 MPW 工具',
      'For fabless teams, universities, researchers and procurement managers who need a practical read before a partner-confirmed MPW RFQ.': '面向 fabless 团队、高校、研究人员和采购经理，用于在伙伴确认的 MPW 询价前做初步判断。',
      'Live tool · RFQ preparation': '在线工具 · RFQ 准备',
      'MPW RFQ Pack Builder': 'MPW RFQ 包生成器',
      'Build RFQ pack →': '生成 RFQ 包 →',
      'Live tool · readiness': '在线工具 · 准备度',
      'MPW Tapeout Readiness Checker': 'MPW 流片准备度检查器',
      'Check readiness →': '检查准备度 →',
      'Live tool · privacy': '在线工具 · 隐私',
      'Local GDSII Inspector': '本地 GDSII 检查器',
      'Open tool →': '打开工具 →',
      'Live tool · MPW planning': '在线工具 · MPW 规划',
      'Reticle & Wafer Planner': '光罩与晶圆规划器',
      'Open planner →': '打开规划器 →',
      'Live tool · cost intuition': '在线工具 · 成本直觉',
      'Cost & Dies Estimator': '成本与 Die 数估算器',
      'Open estimator →': '打开估算器 →',
      'Source on GitHub': 'GitHub 源码',
      'Live P&ID, UHP and sourcing tools': '在线 P&ID、UHP 与寻源工具',
      'Planned roadmap': '计划路线图',
      'Inputs': '输入',
      'Readiness checks': '准备度检查',
      'Generated output': '生成结果',
      'Copy output': '复制输出',
      'Copy brief': '复制简报',
      'Download Markdown': '下载文档',
      'Download CSV': '下载 CSV',
      'Download JSON': '下载 JSON',
      'Submit RFQ': '提交询价',
      'Email MST': '邮件联系 MST',
      'Capability page': '能力页面',
      'Generated output tabs': '生成结果标签',
      'Tools': '工具',
      'Copied': '已复制',
      'Output copied': '输出已复制',
      'score': '得分',
      'Ready': '已就绪',
      'No first-pass gaps found.': '首轮未发现明显缺口。',
      'Matching rows': '匹配排期',
      'Manifest readiness': '交付清单准备度',
      'Checklist score': '检查清单得分',
      'Parsed tags': '解析标签数',
      'Candidate packages': '候选封装',
      'Timeline steps': '时间线步骤',
      'BOM completeness': 'BOM 完整度',
      'Rule coverage': '规则覆盖度',
      'RFQ normalization': 'RFQ 规范化',
      'Tool not configured': '工具未配置',
      'Missing tool type.': '缺少工具类型。',
      'This is not a package quote or partner availability confirmation. Packaging, wafer probe and test scope remain case-by-case.': '这不是封装报价或伙伴可用性确认。封装、晶圆测试和测试范围仍需逐案确认。',
      'File-level handoff manifest. Use after NDA/partner path for actual delivery.': '文件级交付清单。实际交付应在 NDA / 伙伴路径确认后使用。',
      'PDK and signoff requirements remain partner-confirmed.': 'PDK 与 signoff 要求仍需伙伴确认。',
      'Tag families are heuristic; engineering review remains required.': '标签类别为启发式判断，仍需工程复核。',
      'Reverse plan only. Shuttle, payment, partner review and logistics dates must be confirmed.': '仅用于反向规划。Shuttle、付款、伙伴审核和物流日期都必须另行确认。',
      'Completeness score only. Customer engineering and sourcing review remain required.': '仅为完整度评分，仍需客户工程与寻源复核。',
      'UHP rules are project-specific; engineering review remains required.': 'UHP 规则依项目而定，仍需工程复核。',
      'Normalized sourcing table. Supplier price, MOQ, lead time and export checks remain case-by-case.': '规范化后的寻源表。供应商价格、MOQ、交期和出口检查仍需逐案确认。',

      'MPW Shuttle Schedule Finder': 'MPW Shuttle 排期筛选器',
      'Free MPW tool': '免费 MPW 工具',
      'Filter MPW': '筛选 MPW',
      'shuttle schedule rows.': 'shuttle 排期行。',
      'Paste public-source or user-supplied shuttle rows and filter by node or region before RFQ planning.': '粘贴公开来源或用户自有 shuttle 排期行，在 RFQ 规划前按节点或区域筛选。',
      'No booking claim.': '不代表预订确认。',
      'This finder does not confirm wafer capacity, eligibility, PDK access or schedule. Verify every row with its source and partner path.': '此工具不确认晶圆产能、资格、PDK 访问或排期。每一行都需要按来源和伙伴路径复核。',
      'Paste dated rows from public pages or your own notes. Keep the source/date field.': '粘贴来自公开页面或自有笔记的带日期行，并保留来源/日期字段。',
      'Node filter': '节点筛选',
      'Region filter': '区域筛选',
      'Schedule rows CSV': '排期 CSV 行',
      'Columns: Route, Region, Node, Date, Source': '列：Route、Region、Node、Date、Source',

      'GDS/OASIS Handoff Manifest Generator': 'GDS/OASIS 交付清单生成器',
      'Build a': '生成',
      'handoff manifest.': '交付清单。',
      'Create a file-level GDS/OASIS delivery manifest with top-cell, units, roles, checksums and missing items.': '生成文件级 GDS/OASIS 交付清单，包含 top cell、单位、角色、校验和与缺失项。',
      'Manifest only.': '仅为清单。',
      'Do not paste confidential layout geometry. Actual layout delivery belongs only in the approved NDA and partner handoff path.': '不要粘贴保密版图几何。实际版图交付只应在批准的 NDA 和伙伴交付路径中进行。',
      'Use filenames, roles and checksums; keep design content out of public notes.': '仅使用文件名、角色和校验和；不要把设计内容写进公开备注。',
      'Project label': '项目标签',
      'Top cell': 'Top cell',
      'Units / grid': '单位 / 网格',
      'Files': '文件',
      'One per line: filename, role, sha256': '每行一个：filename、role、sha256',

      'PDK / Foundry Requirement Checklist': 'PDK / Foundry 需求检查清单',
      'Check your': '检查',
      'PDK readiness.': 'PDK 准备度。',
      'Organize the NDA, PDK, rule-deck, model, corner and handoff items that block a credible MPW review.': '整理会影响 MPW 审核可信度的 NDA、PDK、规则 deck、模型、corner 和交付项。',
      'Partner-confirmed.': '需伙伴确认。',
      'This is not foundry documentation. PDK access, decks, models and handoff rules remain partner-confirmed.': '这不是 foundry 官方文档。PDK 访问、deck、模型和交付规则仍需伙伴确认。',
      'Select known gates before using the brief in RFQ preparation.': '在将 brief 用于 RFQ 准备前，先选择已知 gate。',
      'Target node': '目标节点',
      'Process family': '工艺家族',
      'NDA path': 'NDA 路径',
      'NDA or access path is identified.': '已识别 NDA 或访问路径。',
      'PDK version': 'PDK 版本',
      'PDK release/version is known.': '已知 PDK release / 版本。',
      'DRC deck': 'DRC deck',
      'DRC deck access is known.': '已知 DRC deck 访问情况。',
      'LVS deck': 'LVS deck',
      'LVS deck access is known.': '已知 LVS deck 访问情况。',
      'Model libraries': '模型库',
      'SPICE/model libraries are known.': '已知 SPICE / 模型库。',
      'Corners': 'Corners',
      'Corner list and simulation conditions are known.': '已知 corner 列表和仿真条件。',
      'Handoff rules': '交付规则',
      'GDS/OASIS handoff requirement is known.': '已知 GDS/OASIS 交付要求。',

      'Package & Assembly Selector': '封装与装配选择器',
      'Choose package': '选择封装',
      'assumptions early.': '早期假设。',
      'Map rough die size, IO, power, frequency and sample quantity to likely prototype packaging options before partner review.': '在伙伴审核前，根据粗略 die 尺寸、IO、功耗、频率和样品数量映射可能的原型封装选项。',
      'Not a package quote.': '不是封装报价。',
      'Packaging, wafer probe, reliability and assembly availability remain partner-confirmed case by case.': '封装、晶圆测试、可靠性和装配可用性仍需伙伴逐案确认。',
      'Use approximate values. This is for first-screen RFQ assumptions only.': '使用近似值即可。此工具仅用于首轮 RFQ 假设。',
      'Die width mm': 'Die 宽度 mm',
      'Die height mm': 'Die 高度 mm',
      'IO count': 'IO 数量',
      'Power W': '功耗 W',
      'Frequency MHz': '频率 MHz',
      'Sample quantity': '样品数量',
      'Bare die acceptable': '可接受裸 die',
      'Lab or COB route is acceptable for first prototype.': '首个原型可接受实验室或 COB 路径。',

      'MPW Procurement Timeline Planner': 'MPW 采购时间线规划器',
      'Build a reverse': '生成反向',
      'procurement timeline.': '采购时间线。',
      'Work backwards from a target shuttle, submission or sample date to expose RFQ, approval, package/test and logistics lead-time risk.': '从目标 shuttle、提交或样品日期倒推，暴露 RFQ、审批、封装/测试和物流交期风险。',
      'Planning only.': '仅用于规划。',
      'Dates are planning assumptions, not shuttle booking, quote, payment or delivery commitments.': '日期只是规划假设，不是 shuttle 预订、报价、付款或交付承诺。',
      'List steps closest to the target date first: step name, duration days.': '先列最接近目标日期的步骤：步骤名、持续天数。',
      'Target date': '目标日期',
      'Steps': '步骤',
      'One per line: step name, days': '每行一个：步骤名、天数',

      'P&ID BOM Completeness Checker': 'P&ID BOM 完整度检查器',
      'Free P&ID tool': '免费 P&ID 工具',
      'Check P&ID': '检查 P&ID',
      'BOM completeness.': 'BOM 完整度。',
      'Find missing tag, MPN, manufacturer, size, material and connection data before native assembly intake or sourcing RFQ.': '在原生装配 intake 或寻源 RFQ 前，找出缺失的 tag、MPN、制造商、尺寸、材料和连接信息。',
      'Completeness only.': '仅检查完整度。',
      'This does not validate part correctness, compatibility or release status. Engineering and sourcing review remain required.': '此工具不验证零件正确性、兼容性或 release 状态，仍需工程与寻源复核。',
      'Paste CSV or TSV. Common header aliases are normalized.': '粘贴 CSV 或 TSV。常见表头别名会被规范化。',
      'P&ID BOM': 'P&ID BOM',

      'P&ID Tag & Instrument Index Parser': 'P&ID 标签与仪表索引解析器',
      'Parse': '解析',
      'instrument tags.': '仪表标签。',
      'Turn pasted P&ID tag lists into a first-pass instrument index for BOM and native assembly-intake review.': '将粘贴的 P&ID 标签列表转为首轮仪表索引，用于 BOM 和原生装配 intake 复核。',
      'Heuristic parser.': '启发式解析器。',
      'Tag families are a first-pass classification. Customer naming rules and engineering review remain required.': '标签类别只是首轮分类，仍需结合客户命名规则和工程复核。',
      'Paste a tag list or copied drawing notes; do not paste confidential customer rulepacks.': '粘贴标签列表或图纸备注，不要粘贴客户保密 rulepack。',
      'P&ID tags': 'P&ID 标签',

      'UHP Gas Stick Rule Checklist': 'UHP Gas Stick 规则检查清单',
      'Organize UHP': '整理 UHP',
      'gas stick rules.': 'gas stick 规则。',
      'Turn high-level SEMI/UHP gas stick assumptions into a review checklist for pilot scoping and native assembly work.': '将高层级 SEMI/UHP gas stick 假设转成用于 pilot 范围界定和原生装配工作的复核清单。',
      'Review required.': '需要复核。',
      'This checklist is not a safety, code, fabrication or release approval. Qualified engineering review remains required.': '此清单不是安全、规范、制造或 release 批准，仍需合格工程复核。',
      'Check the rule areas you can define before pilot review.': '在 pilot 复核前，勾选你能定义的规则区域。',
      'Gas service': '气体服务',
      'Gas service and hazard class are known.': '已知气体服务和危险类别。',
      'Material / finish': '材料 / 表面处理',
      'Wetted material and finish expectations are known.': '已知接液材料和表面处理预期。',
      'Connection standard': '连接标准',
      'VCR, C-seal, W-seal or weld assumptions are known.': '已知 VCR、C-seal、W-seal 或焊接假设。',
      'Purge path': '吹扫路径',
      'Purge and vent path is defined.': '已定义吹扫和排放路径。',
      'Service clearance': '维护空间',
      'Maintainability and access clearance are defined.': '已定义可维护性和访问空间。',
      'Leak test': '泄漏测试',
      'Leak or pressure test expectation is known.': '已知泄漏或压力测试预期。',
      'Flow direction': '流向',
      'Flow direction and labeling are defined.': '已定义流向和标识。',
      'Mounting': '安装',
      'Mounting rail or surface-mount assumptions are known.': '已知导轨或表面安装假设。',

      'BOM RFQ Normalizer': 'BOM RFQ 规范化工具',
      'Free sourcing tool': '免费寻源工具',
      'Normalize a': '规范化',
      'BOM for RFQ.': '用于 RFQ 的 BOM。',
      'Map messy BOM columns into a sourcing-ready CSV and flag missing manufacturer, quantity, description or drawing data.': '将混乱 BOM 列映射为可寻源 CSV，并标记缺失的制造商、数量、描述或图纸信息。',
      'RFQ prep only.': '仅用于 RFQ 准备。',
      'Supplier price, MOQ, lead time, lifecycle status, export controls and alternates remain case-by-case.': '供应商价格、MOQ、交期、生命周期状态、出口管制和替代料仍需逐案确认。',
      'Paste CSV or TSV. Header aliases like Part Number, MFR, Qty and Description are accepted.': '粘贴 CSV 或 TSV。支持 Part Number、MFR、Qty、Description 等表头别名。',
      'BOM rows': 'BOM 行'
      ,
      'Check your': '检查',
      'MPW tapeout readiness': 'MPW 流片准备度',
      'before RFQ.': '再提交 RFQ。',
      'Score the high-level inputs a coordination team needs before a useful MPW first screen: node, process family, die area, PDK/NDA path, DRC/LVS status, package/test assumptions, timeline and compliance context.': '检查 MPW 首轮筛选所需的高层级信息：节点、工艺家族、die 面积、PDK/NDA 路径、DRC/LVS 状态、封装/测试假设、时间线和合规背景。',
      'No GDS, no upload.': '不上传 GDS。',
      'This page stores nothing and sends nothing. Do not paste GDS, netlists, RTL, schematics, masks, layer maps or confidential design IP into a public browser tool.': '本页面不保存、不发送任何内容。请不要在公开浏览器工具中粘贴 GDS、网表、RTL、原理图、mask、层表或保密设计 IP。',
      'REQUESTER TYPE': '请求方类型',
      'COMPANY COUNTRY': '公司国家/地区',
      'END-USE CATEGORY': '最终用途类别',
      'TARGET TIMELINE': '目标时间线',
      'DIE AREA ESTIMATE': 'Die 面积估算',
      'COPY BRIEF': '复制简报',
      'DOWNLOAD JSON': '下载 JSON',
      'Copy brief': '复制简报',
      'Download JSON': '下载 JSON',

      'Build a clean MPW RFQ pack before NDA.': '在 NDA 前生成干净的 MPW RFQ 包。',
      'Turn early tapeout requirements into a structured, non-confidential brief: node, process family, die area, package/test assumptions, timeline, country/end-use context and open questions. The output is for first-screening only, not a quote.': '将早期流片需求整理成结构化、非保密 brief：节点、工艺家族、die 面积、封装/测试假设、时间线、国家/地区与最终用途背景，以及待确认问题。输出仅用于首轮筛选，不是报价。',
      'PROJECT LABEL': '项目标签',
      'PACKAGE ASSUMPTION': '封装假设',

      'Local GDSII Inspector': '本地 GDSII 检查器',
      'Free · open-source · runs 100% in your browser': '免费 · 开源 · 100% 在浏览器本地运行',
      'Drop a .gds file to read its top cell, die size, layer list, cell hierarchy and element counts — then generate a non-confidential RFQ summary. Built to prove our promise: we never take your layout. Here, it doesn\'t even leave your machine.': '拖入 .gds 文件，读取 top cell、die 尺寸、层列表、cell 层级和元素数量，并生成非保密 RFQ 摘要。这个工具用于证明我们的承诺：我们不拿走你的版图，在这里它甚至不会离开你的机器。',
      '100% local.': '100% 本地。',
      'No upload, no server, no backend — parsed in a Web Worker on your device.': '无上传、无服务器、无后端，文件在你设备上的 Web Worker 中解析。',
      'Drop your .gds file here': '将 .gds 文件拖到这里',
      'or click to choose — it is read locally and never uploaded. OASIS (.oas) not yet supported.': '或点击选择。文件只在本地读取，绝不会上传。暂不支持 OASIS (.oas)。',
      'Choose .gds file': '选择 .gds 文件',
      'Start MPW RFQ with this die size →': '用此 die 尺寸开始 MPW RFQ →',
      'Copy summary': '复制摘要',
      'Download .txt': '下载 .txt',
      'Inspect another file': '检查另一个文件',

      'Scope a native SOLIDWORKS assembly pilot from P&ID.': '从 P&ID 界定原生 SOLIDWORKS 装配 pilot。',
      'Build a structured intake brief for gas panels, gas sticks, gas boxes, skids and other process-equipment assemblies. The checklist focuses on P&ID quality, BOM fields, customer part-library reuse, spatial envelope, UHP gas rules and review expectations.': '为 gas panel、gas stick、gas box、skid 和其他工艺设备装配建立结构化 intake brief。清单聚焦 P&ID 质量、BOM 字段、客户零件库复用、空间边界、UHP 气路规则和复核预期。',
      'PILOT BRIEF': '试点简报',
      'Pilot brief': '试点简报',
      'ENGINEER QUESTIONS': '工程问题',
      'Engineer questions': '工程问题',
      'SUGGESTED SCOPE': '建议范围',
      'Suggested scope': '建议范围',
      'EQUIPMENT TYPE': '设备类型',
      'APPLICATION': '应用场景',
      'P&ID STATUS': 'P&ID 状态',
      'SOLIDWORKS VERSION': 'SOLIDWORKS 版本',
      'CUSTOMER PART LIBRARY': '客户零件库',
      'BOM / TAG DATA': 'BOM / 标签数据',
      'SPATIAL ENVELOPE': '空间边界',
      'EXPECTED OUTPUT': '预期输出',

      'MPW Reticle & Wafer Planner': 'MPW 光罩与晶圆规划器',
      'Pack several projects into one shared reticle, step it across the wafer, and estimate gross dies, good dies (defect-density yield), and each project\'s area-based cost share — the way a real multi-project wafer is actually budgeted. No signup. No GDS. Nothing leaves this page.': '将多个项目放入同一共享光罩，在晶圆上步进排布，并估算 gross dies、good dies（基于缺陷密度良率）以及每个项目按面积分摊的成本。这更接近真实 MPW 的预算方式。无需注册，无需 GDS，任何内容都不会离开本页面。',
      '+ add project': '+ 添加项目',
      'Copy share link': '复制分享链接',
      'Copy JSON': '复制 JSON',
      'Reset': '重置',
      'Download PNG': '下载 PNG',
      'Diameter': '直径',
      'Edge exclusion (mm)': '边缘排除 (mm)',
      'Field W (mm)': '曝光场宽度 (mm)',
      'Field H (mm)': '曝光场高度 (mm)',
      'Scribe / street (mm)': '划片道 / street (mm)',
      'Process node': '工艺节点',
      'Defect density D₀ (/cm²)': '缺陷密度 D₀ (/cm²)',
      'Yield model': '良率模型',
      'Cluster α (neg-bin)': '聚集参数 α（负二项）',
      'Systematic yield Y₀': '系统良率 Y₀',
      'Die W (mm)': 'Die 宽度 (mm)',
      'Die H (mm)': 'Die 高度 (mm)',

      'MPW prototype estimator': 'MPW 原型估算器',
      'SUBMIT MPW RFQ →': '提交 MPW 询价 →',
      'WAFER DIAMETER': '晶圆直径',
      'DIE WIDTH (MM)': 'Die 宽度 (mm)',
      'DIE HEIGHT (MM)': 'Die 高度 (mm)',
      'SCRIBE (MM)': '划片道 (mm)',
      'EDGE EXCLUSION (MM)': '边缘排除 (mm)',
      'PROTOTYPE SAMPLES (PACKAGED)': '原型样品数（已封装）'
    }
  };

  var TOOL_DICTIONARY = {
    zh: {
      'mpw-shuttle-finder': true,
      'gds-handoff-manifest': true,
      'pdk-checklist': true,
      'package-selector': true,
      'mpw-procurement-timeline': true,
      'pid-bom-checker': true,
      'pid-tag-parser': true,
      'uhp-gas-stick-checklist': true,
      'bom-rfq-normalizer': true
    }
  };

  var PAGE_OVERRIDES = {
    zh: {
      '/tools/mpw-readiness-checker/': [
        { selector: '.hero h1', html: '检查 <span>MPW 流片准备度</span> 再提交 RFQ。' },
        { selector: '.hero .lede', text: '检查 MPW 首轮筛选所需的高层级信息：节点、工艺家族、die 面积、PDK/NDA 路径、DRC/LVS 状态、封装/测试假设、时间线和合规背景。' },
        { selector: 'label[for="requesterType"]', text: '请求方类型' },
        { selector: 'label[for="country"]', text: '公司国家/地区' },
        { selector: 'label[for="endUse"]', text: '最终用途类别' },
        { selector: 'label[for="timeline"]', text: '目标时间线' },
        { selector: 'label[for="dieArea"]', text: 'Die 面积估算' },
        { selector: 'label[for="designStage"]', text: '设计阶段' },
        { selector: 'label[for="pdkStatus"]', text: 'PDK 访问状态' },
        { selector: 'label[for="drcLvsStatus"]', text: 'DRC/LVS 状态' },
        { selector: 'label[for="handoffFormat"]', text: '交付格式' },
        { selector: 'label[for="packagePlan"]', text: '封装计划' },
        { selector: 'label[for="testPlan"]', text: '晶圆测试 / 测试计划' },
        { selector: 'label[for="notes"]', text: '非保密备注' },
        { selector: '#copyBtn', text: '复制简报' },
        { selector: '#mdBtn', text: '下载文档' },
        { selector: '#jsonBtn', text: '下载 JSON' }
      ],
      '/tools/mpw-rfq-pack/': [
        { selector: '.hero h1', html: '在 NDA 前生成干净的 <span>MPW RFQ 包</span>。' },
        { selector: '.hero .lede', text: '将早期流片需求整理成结构化、非保密 brief：节点、工艺家族、die 面积、封装/测试假设、时间线、国家/地区与最终用途背景，以及待确认问题。输出仅用于首轮筛选，不是报价。' },
        { selector: 'label[for="persona"]', text: '请求方类型' },
        { selector: 'label[for="country"]', text: '公司国家/地区' },
        { selector: 'label[for="die"]', text: 'Die 面积估算' },
        { selector: 'label[for="samples"]', text: '样品数量' },
        { selector: 'label[for="packageNeed"]', text: '封装假设' },
        { selector: 'label[for="testNeed"]', text: '晶圆测试 / 测试范围' },
        { selector: 'label[for="timeline"]', text: '目标时间线' },
        { selector: 'label[for="endUse"]', text: '最终用途类别' },
        { selector: 'label[for="stage"]', text: '设计阶段' },
        { selector: 'label[for="notes"]', text: '非保密备注' },
        { selector: '#copyBtn', text: '复制简报' },
        { selector: '#mdBtn', text: '下载文档' },
        { selector: '#jsonBtn', text: '下载 JSON' }
      ],
      '/tools/mpw-gds/': [
        { selector: '.hero .lede', text: '拖入 .gds 文件，读取 top cell、die 尺寸、层列表、cell 层级和元素数量，并生成非保密 RFQ 摘要。这个工具用于证明我们的承诺：我们不拿走你的版图，在这里它甚至不会离开你的机器。' },
        { selector: '.dropzone .big', html: '将 <span class="mono">.gds</span> 文件拖到这里' },
        { selector: '.dropzone .sub', text: '或点击选择。文件只在本地读取，绝不会上传。暂不支持 OASIS (.oas)。' },
        { selector: '.dropzone .pick', text: '选择 .gds 文件' }
      ],
      '/tools/pid-assembly-intake/': [
        { selector: '.hero h1', html: '从 P&amp;ID 界定 <span>原生 SOLIDWORKS 装配</span> pilot。' },
        { selector: '.hero .lede', text: '为 gas panel、gas stick、gas box、skid 和其他工艺设备装配建立结构化 intake brief。清单聚焦 P&ID 质量、BOM 字段、客户零件库复用、空间边界、UHP 气路规则和复核预期。' },
        { selector: 'label[for="equipment"]', text: '设备类型' },
        { selector: 'label[for="industry"]', text: '应用场景' },
        { selector: 'label[for="pidQuality"]', text: 'P&ID 状态' },
        { selector: 'label[for="solidworks"]', text: 'SOLIDWORKS 版本' },
        { selector: 'label[for="library"]', text: '客户零件库' },
        { selector: 'label[for="bom"]', text: 'BOM / 标签数据' },
        { selector: 'label[for="envelope"]', text: '空间边界' },
        { selector: 'label[for="output"]', text: '预期输出' },
        { selector: 'label[for="standards"]', text: '标准 / 规则背景' },
        { selector: 'label[for="notes"]', text: 'Pilot 备注' },
        { selector: '.tabs .tab[data-mode="brief"]', text: '试点简报' },
        { selector: '.tabs .tab[data-mode="questions"]', text: '工程问题' },
        { selector: '.tabs .tab[data-mode="scope"]', text: '建议范围' },
        { selector: '#copyBtn', text: '复制结果' },
        { selector: '#mdBtn', text: '下载文档' },
        { selector: '#jsonBtn', text: '下载 JSON' },
        { selector: '.actions a[href="/pid-to-native-solidworks-assembly/"]', text: '能力页面' }
      ],
      '/tools/mpw-planner/': [
        { selector: '.hero h1', text: 'MPW 光罩与晶圆规划器' },
        { selector: '.hero .lede', text: '将多个项目放入同一共享光罩，在晶圆上步进排布，并估算 gross dies、good dies（基于缺陷密度良率）以及每个项目按面积分摊的成本。这更接近真实 MPW 的预算方式。无需注册，无需 GDS，任何内容都不会离开本页面。' },
        { selector: 'label[for="waferD"]', text: '直径' },
        { selector: 'label[for="edge"]', text: '边缘排除 (mm)' },
        { selector: 'label[for="fieldW"]', text: '曝光场宽度 (mm)' },
        { selector: 'label[for="fieldH"]', text: '曝光场高度 (mm)' },
        { selector: 'label[for="scribe"]', text: '划片道 / street (mm)' },
        { selector: 'label[for="node"]', text: '工艺节点' },
        { selector: 'label[for="d0"]', text: '缺陷密度 D₀ (/cm²)' },
        { selector: 'label[for="model"]', text: '良率模型' },
        { selector: 'label[for="alpha"]', text: '聚集参数 α（负二项）' },
        { selector: 'label[for="y0"]', text: '系统良率 Y₀' },
        { selector: 'label[for="target"]', text: '每个项目目标 good samples' }
      ],
      '/tools/mpw-estimator/': [
        { selector: '.hero h1', html: 'MPW 原型<span class="hl">估算器</span>' },
        { selector: '#rfqCta,.btn[href*="mpw-tapeout-rfq"]', text: '提交 MPW 询价 →' }
      ]
    }
  };

  function normalizeLang(value) {
    value = String(value || '').toLowerCase();
    if (value === 'zh' || value.indexOf('zh-') === 0) return 'zh';
    return DEFAULT_LANG;
  }

  function resolveLang(search, cookie, languages) {
    var params = new URLSearchParams(String(search || '').replace(/^\?/, ''));
    if (params.get('lang')) return normalizeLang(params.get('lang'));
    var match = String(cookie || '').match(/(?:^|;\s*)mst_lang=(zh|en)\b/);
    if (match) return normalizeLang(match[1]);
    languages = languages || [];
    return normalizeLang(languages[0] || DEFAULT_LANG);
  }

  function currentLang() {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    return resolveLang(window.location.search, window.document.cookie, window.navigator.languages || [window.navigator.language]);
  }

  function t(value, lang) {
    lang = normalizeLang(lang);
    if (lang === DEFAULT_LANG) return value;
    var key = String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
    return (TEXT[lang] && TEXT[lang][key]) || value;
  }

  function shouldTranslateConfigKey(key) {
    return !/^(id|slug|type|value|external|href|url|name)$/.test(key);
  }

  function translateToolConfig(config, lang) {
    lang = normalizeLang(lang);
    if (lang === DEFAULT_LANG || !config) return clone(config);
    function walk(value, key) {
      if (typeof value === 'string') return shouldTranslateConfigKey(key || '') ? t(value, lang) : value;
      if (Array.isArray(value)) return value.map(function (item) { return walk(item, key); });
      if (value && typeof value === 'object') {
        var out = {};
        Object.keys(value).forEach(function (childKey) { out[childKey] = walk(value[childKey], childKey); });
        return out;
      }
      return value;
    }
    return walk(config, '');
  }

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function hasToolDictionary(slug, lang) {
    lang = normalizeLang(lang);
    return !!(TOOL_DICTIONARY[lang] && TOOL_DICTIONARY[lang][slug]);
  }

  function setCookie(lang) {
    if (typeof document === 'undefined') return;
    document.cookie = 'mst_lang=' + normalizeLang(lang) + '; path=/; max-age=31536000; SameSite=Lax';
  }

  function updateLanguageLinks(lang) {
    if (typeof document === 'undefined') return;
    Array.prototype.forEach.call(document.querySelectorAll('.lang-switch a'), function (link) {
      var href = link.getAttribute('href') || '';
      var linkLang = /lang=zh/.test(href) || link.getAttribute('lang') === 'zh' ? 'zh' : 'en';
      link.classList.toggle('is-active', linkLang === lang);
    });
  }

  function translateAttributes(rootEl, lang) {
    var attrs = ['aria-label', 'alt', 'title', 'placeholder'];
    attrs.forEach(function (attr) {
      Array.prototype.forEach.call(rootEl.querySelectorAll('[' + attr + ']'), function (el) {
        var next = t(el.getAttribute(attr), lang);
        if (next !== el.getAttribute(attr)) el.setAttribute(attr, next);
      });
    });
  }

  function translateMetaContent(lang) {
    if (typeof document === 'undefined') return;
    document.title = t(document.title, lang);
    Array.prototype.forEach.call(document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]'), function (el) {
      var value = el.getAttribute('content');
      var next = t(value, lang);
      if (next !== value) el.setAttribute('content', next);
    });
  }

  function translateTextNodes(rootEl, lang) {
    if (!rootEl || typeof document === 'undefined') return;
    var skip = /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION|PRE|CODE|SVG)$/;
    var walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || skip.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.replace(/\s+/g, '').length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var original = node.nodeValue;
      var translated = t(original, lang);
      if (translated !== original) node.nodeValue = translated;
    });
  }

  function normalizePathname(pathname) {
    pathname = String(pathname || '/');
    if (!pathname.endsWith('/')) pathname += '/';
    return pathname;
  }

  function applyPageOverrides(lang) {
    if (typeof document === 'undefined') return;
    var rules = PAGE_OVERRIDES[lang] && PAGE_OVERRIDES[lang][normalizePathname(window.location.pathname)];
    if (!rules) return;
    rules.forEach(function (rule) {
      Array.prototype.forEach.call(document.querySelectorAll(rule.selector), function (el) {
        if (rule.html != null) el.innerHTML = rule.html;
        else el.textContent = rule.text;
      });
    });
  }

  function applyStaticTranslations(lang) {
    if (typeof document === 'undefined') return;
    lang = normalizeLang(lang || currentLang());
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    setCookie(lang);
    updateLanguageLinks(lang);
    if (lang === DEFAULT_LANG) return;
    translateMetaContent(lang);
    translateAttributes(document, lang);
    translateTextNodes(document.body, lang);
    applyPageOverrides(lang);
  }

  function reapplyAfterPageScripts(lang) {
    if (typeof window === 'undefined' || normalizeLang(lang) === DEFAULT_LANG) return;
    [0, 250].forEach(function (delay) {
      window.setTimeout(function () {
        translateTextNodes(document.body, lang);
        applyPageOverrides(lang);
      }, delay);
    });
  }

  if (typeof document !== 'undefined') {
    var lang = currentLang();
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        applyStaticTranslations(lang);
        reapplyAfterPageScripts(lang);
      });
    } else {
      applyStaticTranslations(lang);
      reapplyAfterPageScripts(lang);
    }
  }

  return {
    resolveLang: resolveLang,
    currentLang: currentLang,
    t: t,
    translateToolConfig: translateToolConfig,
    hasToolDictionary: hasToolDictionary,
    applyStaticTranslations: applyStaticTranslations
  };
});
