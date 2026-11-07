# 本站双仓（内容分离）配置

本站采用 Shirone 的内容分离架构，代码与内容分仓管理。

## 仓库分工

| 仓库 | 可见性 | 作用 |
| --- | --- | --- |
| [`xushen666/xushen-blog`](https://github.com/xushen666/xushen-blog) | 公开 | 主题源码、组件、构建脚本与 CI |
| [`xushen666/xushen-blog-content`](https://github.com/xushen666/xushen-blog-content) | 私有 | 文章、`config/*.yaml`、`data/*.ts`、图片 |

内容仓的目录会物化到本仓：`content/` → `src/content/`、`config/` → `src/user/user-config.ts`、
`data/` → `src/data/`、`assets/` → `src/assets/`、`public/` → `public/`。
本仓的 `shirone.content.json` 指向内容仓的 `main`；`content.lock.json` 是由 `pnpm content:sync`
生成的同步凭据，已被 git 忽略。

## 本地开发

需要 Node ≥ 26.13.0 与 pnpm 11。本机 Node 26 位于
`C:\Users\LX\AppData\Local\toolchains\node-v26.13.0-win-x64`，使用前把它加到 `PATH` 前面。

```powershell
cd E:\csdiy\blog
$env:PATH = "C:\Users\LX\AppData\Local\toolchains\node-v26.13.0-win-x64;$env:PATH"
pnpm dev                 # 自动执行 content:sync，只读本地内容仓
pnpm content:watch       # 另开终端：内容仓保存后自动同步
```

`.env.local`（不提交）里写了 `CONTENT_DIR=../xushen-blog-content`，优先于 `shirone.content.json`，
所以本地不需要联网拉取私有内容仓。

## 写作与发布

1. `cd E:\csdiy\xushen-blog-content`，在 `content/posts/` 下写 Markdown（frontmatter 见主题文档）。
2. 提交并推送内容仓 `main`。
3. 内容仓的 `.github/workflows/trigger-build.yml` 调用 Vercel Deploy Hook。
4. Vercel 重新构建本仓，构建时用 `CONTENT_REPO_URL` 拉取内容仓最新 `main` 并发布。

## 需要配置的两个密钥

内容仓是私有的，因此云端构建需要一次性的凭据配置：

| 位置 | 名称 | 值 |
| --- | --- | --- |
| GitHub `xushen-blog-content` → Settings → Secrets → Actions | `VERCEL_DEPLOY_HOOK` | Vercel 项目 Settings → Git → Deploy Hooks 生成的 URL |
| Vercel 项目 → Settings → Environment Variables | `CONTENT_REPO_URL` | `https://x-access-token:<只读 PAT>@github.com/xushen666/xushen-blog-content.git` |
| GitHub `xushen-blog` → Settings → Secrets → Actions | `CONTENT_REPO_URL` | 同上（CI 构建需要读取内容仓） |

PAT 只需对 `xushen-blog-content` 有 `Contents: Read` 权限，建议使用 fine-grained token。
不要把令牌写进任何被提交的文件。

## 常用命令

```powershell
pnpm content:status      # 查看当前内容源与同步状态
pnpm content:sync        # 手动物化内容
pnpm content:validate    # 预检内容仓配置语法（不写盘）
pnpm content:export      # 预演反向导出：把代码仓内容写回内容仓
pnpm content:clean       # 预演还原为单仓状态
```

## 备份分支

`migrate-v1` 保留了 2026-11 之前那版从 Mizuki 迁移过来的完整站点，仅作存档，不再合并。
