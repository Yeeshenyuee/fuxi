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

`摄取解析 → 建知识图谱(含类型分类) → 生成大白话+SVG图文讲解 → 交互式学/测 → 产出复习线路并存进度`

## 目录结构

```
fuxi/
├─ SKILL.md                          # 分类驱动主流程 + 交互指令 + 进度schema
├─ references/
│  ├─ teaching-style.md              # 分类器 + 普适原则 + 路由表
│  ├─ methods-stem-logic.md          # A 理工逻辑(含造类比通法)
│  ├─ methods-humanities-memory.md   # B 文科记忆(记忆术库)
│  ├─ methods-language.md            # C 语言
│  ├─ methods-applied.md             # D 操作实务
│  ├─ diagram-recipes.md             # 9 种 SVG 图型(理工5 + 文科4)
│  ├─ ingestion.md                   # 各类文件抽料法
│  └─ exam-mode.md                   # 出卷 + 批改
├─ scripts/
│  └─ extract_docx.js                # docx → 文字 + 图清单
└─ templates/                        # 复习线路 / 押题清单 模板
```

## 安装

把 `fuxi/` 整个文件夹放到 Claude Code 的技能目录(用户级:`~/.claude/skills/fuxi/`),重启会话即可。

## 用法

直接对 Claude 说要复习/备考/把资料讲到懂,或 `/fuxi`,然后把资料丢给它。它会自动判学科类型、建框架、配图讲解,并支持"继续 / 这个不懂 / 自测"等交互。

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
