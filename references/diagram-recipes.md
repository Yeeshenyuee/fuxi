# 图形解释配方(SVG via visualize)

**出图前先调用 `visualize` 的 read_me(diagram 模块)了解完整约束。** 本文件是常用图型的速用配方,省得每次从零设计。

## 通用硬规则(必守)

- 根元素 `<svg width="100%" viewBox="0 0 680 H" role="img"><title>…</title><desc>…</desc>`。**680 宽度固定**,H 按内容高度。
- 文字必须带类:`t`(14px 正文)、`ts`(12px 次要)、`th`(14px 中等/标题)。盒内文字加 `dominant-baseline="central"`。
- 颜色用 ramp 类:`c-blue c-teal c-coral c-amber c-green c-purple c-gray c-pink`(自动适配深浅色)。一张图≤2~3个 ramp + gray。连线/曲线用内联 `stroke="#..."`(中间色号如 `#1D9E75` 两种模式都可见)。
- 箭头:在 `<defs>` 放标准 marker,连线用 `class="arr" marker-end="url(#arrow)"`;折线路径要 `fill="none"`。
- 句式小写、无 emoji;盒子副标题≤5字词;别让标签互相压、别超出 viewBox。

标准箭头 defs(每张图都加):
```
<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
```

## 五种常用图型(按需选)

### 1. 全局脑图 / 流程(structural/flow)
用途:开课先建框架(主线、左右分支、章节挂哪)。盒子(rect class=c-* 或 box)+ 箭头。单列或分支。每个盒子 `<g class="c-xx"><rect/><text class="th"/><text class="ts"/></g>`。可加 `class="node" onclick="sendPrompt('…')"` 让盒子可点跳转。

### 2. 特性曲线 / 坐标图(chart-like)
用途:功频特性、调节特性下垂线、负荷曲线等。画法:
- 纵横轴各一条 `<line>` 带 `marker-end`,轴标用 `ts`。
- 数据线用内联 stroke 的 `<line>`/`<path>`,虚线辅助用 `stroke-dasharray`。
- 关键点用 `<circle>` + 旁注;斜率/区间用短标注。
- 复杂曲线(波形、包络)**用 node 预先算坐标**生成 path 的 `d`(见下),别手凑。

### 3. 接线框图 / 读图题(structural)
用途:励磁系统等"认图/画图"题。元件用带 `c-*` 的盒子(注明符号+名),按"主回路一行、控制回路一行"两层排,箭头连;复杂反馈在文字里说明,别让线乱穿。先给"元件词典"再给图最好懂。

### 4. 波形 / 周期图(illustrative)
用途:脉动电压、调制波等。**坐标用 node 生成**:
```
node -e 'const X=d=>80+(d/(2*Math.PI))*520; let p=[];for(let i=0;i<=160;i++){let d=2*Math.PI*i/160;let y=150-95*Math.sin(d/2)*Math.cos(12*d);p.push(X(d).toFixed(1)+" "+y.toFixed(1));} console.log("M"+p.join("L"));'
```
把输出贴进 `<path d="…" fill="none" stroke="#1D9E75"/>`。包络另算。标出最大/最小/周期点。

### 5. 架构 / 流水线(flow)
用途:讲方法论、系统结构。单列竖排盒子+箭头,底部一行小字注"用到的工具/调用"。

> 上面 1–5 偏理工(A/D 类)。下面 6–9 是文科记忆(B 类)常用图型,同样守通用硬规则。

### 6. 思维导图 / 框架树(structural)
用途:把一章知识点编成"几大块,每块几点"。中心主题盒 → 分支盒(用 `c-*` 区分大类)→ 叶子要点。横向或放射状,层级≤3。叶子多时换两列或拆多张。

### 7. 时间线(flow)
用途:历史、发展脉络、流程。一条横轴 + 等距节点(`<circle>`),每个节点上/下交错放"时间 + 事件"小标签(避免拥挤);关键转折用颜色强调。

### 8. 对比表(用 HTML 而非 SVG)
用途:易混概念/人物/学派/近义词并排比——**这是文科最强提分图**。直接在回复里用 Markdown 表格,或需要更整齐时用 HTML 表格 widget。列=对比对象,行=对比维度,差异格高亮。

### 9. 因果链 / 分类图(flow / structural)
用途:事件"背景→原因→过程→影响";或概念分类。因果用单向箭头链;分类用树。每盒只放关键词,细节留给文字。

## 出图后务必导出文件

同一段 `<svg>…</svg>` 源码用 Write 落到 `复习/<科目>/图/<描述名>.svg`(纯 svg,可浏览器单开)。命名用内容描述(如 `ch3_自并励接线图.svg`),别用 image1。

## 易错清单(出图前自检)

- viewBox 高度 = 最低元素底边 + ~20,别留大片空白也别裁切。
- 同行盒子间留 ≥20px;`text-anchor="end"` 的标签别越过 x=0。
- 折线/曲线 path 一定 `fill="none"`,否则糊成黑块。
- 深色模式:每个文字/线在近黑底上仍可读(用 ramp 类或中间色号 + 语义变量)。
