# 摄取与解析(各类资料抽料)

目标:把每份资料变成"结构化文本 + 图清单",落到 `复习/<科目>/抽取/`。**题目/公式若是图片,务必看图记下原始数字符号,别凭印象。**

## 第0步(教材/讲义类必做):先建「章 → 页码」索引

长资料**不要从头读到尾**。先定位目录页(或书签),把每章的**起止页码**写进 `抽取/索引.md`(格式:`第N章 <标题> → pX–pY`)。之后:
- 阶段3 讲哪章,**只渲染/读取那几页**——省 token,又保证讲解**严格基于教材原文**;
- 讲解引用具体数字/结论时,可回指"教材 pX"作出处。
目录也无法读取时(纯扫描无目录),按每 10 页抽 1 页粗扫建大致索引。

## 按类型处理

### PDF(通用做法,不依赖专有 skill)
- **有文字层**:`pdftotext -layout x.pdf out.txt` 抽文字;大文件按页范围。
- **中文图形字体 / 扫描件**(pdftotext 报 `CMap` 错、或输出乱码 mojibake):用本 skill 打包的脚本把页面渲染成 PNG 再**视觉读取**(相当于 OCR):
  ```bash
  pip install pymupdf   # 缺库时
  python <skill目录>/scripts/render_pdf.py "教材.pdf" 1 8 /tmp/pages   # 起页 止页 输出目录
  ```
  **先渲染目录页拿章节结构(建索引),再按需逐章渲染读取**(省 token)。
- 有 `pdf` skill 的环境可直接用它;没有(如 Codex)就走上面命令,效果一样。

### docx(常见:作业/答案,且公式与图常是图片)
docx 本质是 zip。步骤:
```bash
unzip -o -q "文件.docx" -d /tmp/docx_extract
```
然后用本 skill 的脚本抽文本 + 图引用:
```bash
node ~/.claude/skills/fuxi/scripts/extract_docx.js /tmp/docx_extract
```
脚本输出每段文字,并在含图处标 `[IMG:imageN.png]`(已把 rId 解析成真实文件名)。再用 Read 逐张看 `/tmp/docx_extract/word/media/imageN.png`(尤其计算题、公式、接线图)。
- ⚠️ Git Bash 的 `/tmp` 实际路径可能是 `C:/Users/<user>/AppData/Local/Temp/...`;Read 图片时用 `pwd -W` 或 `cygpath -w` 拿到 Windows 路径。

### pptx / xlsx
- 有 `pptx` / `xlsx` skill 就用。无该 skill 时(如 Codex):pptx 用 `unzip` 抽 `ppt/slides/*.xml` 文字;xlsx 用 Python `openpyxl` 读单元格。

### 图片(jpg/png:提纲、题目、公式、图表截图)
- 直接 Read,视觉理解。把关键文字/数字/图形转述记下。

### Markdown / txt
- 直接 Read。

## 抽完做什么

把每份资料归类:**提纲/考点、题目、答案、教材正文**,为阶段2(建知识图谱)做准备。记下:哪些是计算题、哪些是画图/分析题(这两类后面要重点讲)。
