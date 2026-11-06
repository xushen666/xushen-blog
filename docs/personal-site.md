# 本站维护说明

这是从 [Shirone](https://github.com/LyraVoid/Shirone)（MIT，基于 Fuwari / Material 3 Expressive）改造的个人站点。
主题自身的完整文档在 `README.md`、`docs/` 与 `src/config/README.md`，本文只记录「本站怎么改、怎么发」。

## 环境

- Node.js **≥ 26.13.0**（`package.json` 的 `engines`，Astro 7 / Svelte 5 需要）
- pnpm 11（`.npmrc` 开启 `manage-package-manager-versions`，会自动匹配 `packageManager` 字段）

```powershell
pnpm install
pnpm dev        # 本地开发 http://localhost:4321
pnpm build      # 生产构建：content sync → astro build → pagefind → 字体体积检查
pnpm preview    # 预览 dist
```

常用校验：

```powershell
pnpm check            # astro check，要求 0 errors
pnpm exec biome ci src
pnpm check:manifest   # 校验 Markdown 语法 manifest / skills 路径
```

## 内容放在哪

| 内容 | 位置 | 说明 |
| --- | --- | --- |
| 文章 | `src/content/posts/*.md` | frontmatter 至少 `title`、`published`、`description`；`draft: true` 不会进生产构建 |
| 关于页 | `src/content/spec/about.md` | 对应 `aboutConfig.enable` |
| 项目 | `src/data/projects.ts` | 分类在 `src/config/projectsConfig.ts`，卡片字段 `key/title/summary/category/phase/technologies/featured/repository/year` |
| 技能 | `src/data/skills.ts` | 分类在 `src/config/skillsConfig.ts` |
| 头像 / 横幅 | `src/assets/images/avatar.webp`、`src/assets/images/banner/{desktop,mobile}/*.webp` | 构建时由 Astro 生成多尺寸 |
| 项目封面 | `public/assets/projects/*.webp` | 按 `projects.ts` 里的 `cover` 引用 |

新建文章：`pnpm new-post`（脚本会按模板生成骨架）。

## 站点配置

所有配置集中在 `src/config/`，入口约定见 `src/config/README.md`。当前已个性化：

- `siteConfig.ts`：站点地址、标题、副标题、`lang: zh_CN`、主题色 hue 240 且对访客固定
- `profileConfig.ts`：头像、昵称、简介、GitHub / Email / RSS
- `navBarConfig.ts`：导航只保留 主页 / 归档 / 项目 / 技能 / 关于 / GitHub

不在导航里的功能页（动画、设备、游戏、指南针、相册、友链、动态、时间线、系列、音乐）已把各自
`xxxConfig.enable` 设为 `false`；关闭后对应路由会重定向到 404，导航入口自动隐藏。

## 已知的构建期提示（非错误）

- `[glob-loader] No files found matching "**/*.md" in directory "src\content\{series,moments}"`：
  这两个集合当前为空，功能已关闭；有需要时再放内容即可。
- Pagefind 提示部分路由没有 `<html>` 元素：那些是已关闭功能页的重定向页，不参与索引。
- `src/plugins/markdown/remark-restore-bare-directives.mjs:36` 的 biome 提示为主题既有问题。

## CI

`.github/workflows/ci.yml` 保留四个 job：`Code quality`（biome）、`Diagnostics and tests`（astro / svelte 检查、
manifest 校验、Node 单测）、`Windows path regressions`、`Build`（Node 26.13.0 生产构建）。

主题原有的两个 Playwright 浏览器回归 job（`comment-tests` / `comment-regressions`、`style-tests` / `styles`）
已移除：它们的用例写死了模板示例文章（`/posts/guide/`、`/posts/markdown-extended/`、`/posts/mdx-showcase/`），
模板内容删除后必然 404。`tests/site/*.spec.ts` 与 `scripts/ci/*` 仍保留在仓库里，需要时可单独本地运行；
要恢复这套整套回归，需先把对应示例文章放回（开发模式可见、生产构建会过滤 `draft: true`）。

## 部署

构建产物是纯静态 `dist/`，`vercel.json` 为空对象，Vercel 用默认的 Astro 预设即可（Build `pnpm build`，
Output `dist`）。注意构建第一步 `node scripts/content/sync.mjs` 在单仓模式下是空操作，不依赖外部内容仓。

