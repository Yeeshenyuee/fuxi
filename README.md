# fuxi · 复习教练（一个 Claude Code / Claude Skill）

把**任意科目**的复习资料(PDF / 图片 / docx / PPT / Markdown / 真题作业)变成**零基础也能听懂的「底层逻辑 + 图文讲解」**,并支持逐章交互式学习、随时就不懂的概念提问重讲、按考试题型出模拟卷并批改。

> A subject-agnostic study/review skill: ingest any materials → build a knowledge map → generate plain-language, first-principles explanations **with diagrams** → learn chapter-by-chapter interactively → self-test by exam format. It **classifies each subject/topic first and routes to a matching method**, so STEM, humanities, languages, and hands-on skills each get the right treatment.

## 它和普通"讲解"最大的不同:先判类型,再用对应方法

| 类型 | 学科例 | 应对方法 |
|---|---|---|
| **A 理工逻辑·推导计算** | 高数/物理/电路/算法 | 底层逻辑+类比 → 机制图/曲线 → 公式卡(来历+陷阱) → 题型套路+计算专练 |
| **B 文科记忆·框架概念** | 历史/政治/地理/法理 | 框架(分类树/时间线/因果链) → 对比表 → 现成记忆术(口诀/故事/首字母) → 默写+间隔重复 |
| **C 语言** | 英语/二外/古文 | 词根词缀/语境 → 语法规则+例外 → 例句 → 输出练习 |
| **D 操作·实务** | 编程/会计/临床/案例 | 流程图/决策树 → checklist → 案例走查 → 常见坑 |
| **E 混合** | 经济/医学/生物 | 按考点逐个判型,分别套用 |

## 五阶段流水线

`开课前对齐(确认资料 + 学习者画像) → 摄取解析 → 建知识图谱(含类型分类) → 生成大白话+SVG图文讲解 → 交互式学/测 → 产出复习线路并存进度`

**记得住 & 考得出**:每章自动产 Q/A 闪卡(附 Anki 导入块)+ 按"当天/1天/3天/1周"节奏复盘;自测错题自动进错题本(带错因分类,重练过关制);拿到考期即生成逐日倒计时计划(考前2天自动切冲刺模式)。讲解中的具体数字/年份必须可回指教材页码,资料没有的明确标注——**不编造**。

## 目录结构

```
fuxi/
├─ SKILL.md                          # 分类驱动主流程 + 交互指令 + 进度schema
├─ references/
│  ├─ teaching-style.md              # 分类器 + 普适原则 + 路由表
│  ├─ intake.md                      # 开课前:资料确认 + 学习者画像
│  ├─ methods-stem-logic.md          # A 理工逻辑(含造类比通法)
│  ├─ methods-humanities-memory.md   # B 文科记忆(记忆术库)
│  ├─ methods-language.md            # C 语言
│  ├─ methods-applied.md             # D 操作实务
│  ├─ diagram-recipes.md             # 9 种 SVG 图型(理工5 + 文科4)
│  ├─ ingestion.md                   # 各类文件抽料法(含章→页码索引)
│  ├─ exam-mode.md                   # 出卷 + 批改(错题入本)
│  ├─ memory-tools.md                # 闪卡·间隔重复·错题本·倒计时日程
│  ├─ exemplar-lesson.md             # 标杆讲解样例(few-shot 质量基准)
│  └─ intake.md                      # 开课前对齐(资料+画像菜单)
├─ scripts/
│  └─ extract_docx.js                # docx → 文字 + 图清单
└─ templates/                        # 复习线路/押题清单/资料清单/闪卡/错题本/倒计时计划
```

## 安装

**Claude Code**:把 `fuxi/` 整个文件夹放到技能目录(用户级 `~/.claude/skills/fuxi/`),重启会话(说要复习 / 或 `/fuxi` 触发)。

**Codex(及其他读 AGENTS.md 的 agent)**:仓库根带 `AGENTS.md` 入口——在本仓库目录里运行 Codex,或把本仓库路径写进你的 `~/.codex/AGENTS.md`(如"复习/学习任务时,阅读并遵循 `<path>/fuxi/SKILL.md`"),Codex 即会自动按流程走。本技能**不依赖任何厂商专有工具**:出图=写 SVG 文件、抽料=`pdftotext`/`pymupdf`/`unzip`+脚本,缺渲染器或专有 skill 也能正常跑。

## 一键安装(推荐:复制整段发给你的 Claude Code 或 Codex)

```text
帮我安装并配置 "fuxi 复习教练" 技能,让我在 Claude Code 和 Codex 里都能用。
仓库:https://github.com/Yeeshenyuee/fuxi

请用 shell 按以下步骤执行(自动判断我的操作系统;Windows 用 %USERPROFILE% 代替 ~):

1) 把仓库克隆或更新到 Claude Code 技能目录 ~/.claude/skills/fuxi :
   - 若该目录已存在 → 进去执行 git pull 更新;
   - 否则执行 git clone https://github.com/Yeeshenyuee/fuxi.git ~/.claude/skills/fuxi
   - (没有 git 就从上面网址点 Code→Download ZIP,解压到该目录,确保存在 ~/.claude/skills/fuxi/SKILL.md)

2) 让 Codex 也能用:在 Codex 全局指引文件(通常是 ~/.codex/AGENTS.md,不存在就新建)里追加下面这行(已有同样内容就别重复):
   学习/复习/备考/把资料讲到懂/出自测卷等任务时,请阅读并遵循 ~/.claude/skills/fuxi/SKILL.md 全文,按其流程执行。

3) 校验:确认 ~/.claude/skills/fuxi/SKILL.md 和 ~/.claude/skills/fuxi/AGENTS.md 都存在,并打印它们各自的第一行给我看。

4) 完成后告诉我"安装成功",以及用法:Claude Code 里说"帮我复习<某门课>"或输入 /fuxi(可能需重启会话);Codex 里直接说"帮我复习<某门课>"即可。

装好后先别开始复习,等我提供资料。
```

## 用法

直接对 Claude 说要复习/备考/把资料讲到懂,或 `/fuxi`,然后把资料丢给它。开课前它会先**确认资料清单(可随时增删改)+ 摸清你的基础与学习偏好**,再自动判学科类型、建框架、配图讲解,并支持"继续 / 这个不懂 / 自测 / 加删资料"等交互。

## 效果示例

见 [`examples/`](examples/):文科(B 类)完整讲解产物 + 导出的自包含 SVG 图;理工(A 类)风格见 [`references/exemplar-lesson.md`](references/exemplar-lesson.md)。

## 开发

- 更新日志:[`CHANGELOG.md`](CHANGELOG.md)
- 回归/触发评测:[`evals/`](evals/)(改动 skill 前先补 case,改后跑一遍防改坏)
- 协议:[MIT](LICENSE)

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
