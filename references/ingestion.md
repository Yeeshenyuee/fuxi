# 摄取与解析(各类资料抽料)

目标:把每份资料变成"结构化文本 + 图清单",落到 `复习/<科目>/抽取/`。**题目/公式若是图片,务必看图记下原始数字符号,别凭印象。**

## 按类型处理

### PDF
- 优先用 `pdf` skill 抽文字与图;含表格用其表格抽取。
- 扫描件(无文字层)→ OCR。
- 大文件按页范围读。

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
- 用 `pptx` / `xlsx` skill 抽取(讲义、数据表)。

### 图片(jpg/png:提纲、题目、公式、图表截图)
- 直接 Read,视觉理解。把关键文字/数字/图形转述记下。

### Markdown / txt
- 直接 Read。

## 抽完做什么

把每份资料归类:**提纲/考点、题目、答案、教材正文**,为阶段2(建知识图谱)做准备。记下:哪些是计算题、哪些是画图/分析题(这两类后面要重点讲)。
