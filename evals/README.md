# evals — 回归与触发评测

改动 skill 后用这两份评测防止改坏:

- **`evals.json`** — 3 个行为回归 case(启动铁律不抢跑 / B 类文科讲法 / A 类公式讲法),每个带可核对的 assertions。跑法:对每个 case 起一个"装有本 skill"的子代理执行 prompt,对照 assertions 逐条判 pass/fail(skill-creator 的评测流程可直接复用)。
- **`trigger-evals.json`** — 20 条触发评测(10 应触发 / 10 不应触发,后者全是近似易混场景)。跑法:用 skill-creator 的 `run_loop.py --eval-set trigger-evals.json --skill-path ..` 自动优化 description,或手动抽查。

新增功能时:先在 `evals.json` 补一个 case,再改 skill。
