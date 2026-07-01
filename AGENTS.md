# AGENTS.md — fuxi（复习教练）

本仓库是一个**学科通用的"复习教练"技能**。任何 agent(Claude Code / **Codex** / 其他)在本目录工作时:

> **请阅读并遵循 `SKILL.md` 全文,按它的五阶段流程执行。** `references/` 是按需加载的方法库,`scripts/` 是抽料脚本,`templates/` 是产物模板。

在 Codex 上"启用本技能"= 读 `SKILL.md` 并照做,**无需任何特殊命令**;本文件会让 Codex 自动把技能载入上下文。

## 跨工具兼容(本技能不绑定任何厂商专有工具,缺什么走退路,流程照常)

- **出图**:图形解释一律以 **SVG 文件**为最终产物——把 `<svg>…</svg>` 写到 `复习/<科目>/图/*.svg`(浏览器可开)。有渲染器(如 Claude 的 `visualize` MCP)就同时渲染在对话里;**无渲染器(如 Codex)时,写文件就是"出图"**,并在回复里给出文件路径 + 一句话说明图意。
- **抽取资料**(用系统命令/脚本,不依赖专有 skill):
  - docx:`unzip x.docx -d out` + `node scripts/extract_docx.js out`
  - PDF 文字:`pdftotext -layout x.pdf out.txt`;中文图形字体/扫描件失败(CMap 报错或乱码)时,用 Python `pymupdf` 渲染页面成 PNG 再**视觉读取**(先读目录页拿结构,再按需逐章渲染)。缺库 `pip install pymupdf`。
  - 图片:直接视觉读取。
- **进度/记忆**:无 memory 工具时,`复习/<科目>/进度.json` 就是续学依据。

## 快速开始

用户说"帮我复习 X / 把资料讲到懂 / 出自测卷"→ 按 `SKILL.md` **阶段0 先做 intake**(确认资料 + 学习者画像,**含让用户自述想法**)→ 再逐阶段推进。
