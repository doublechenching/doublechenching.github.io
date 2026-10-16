# Eric Ching · Personal Page

Eric Ching（[@doublechenching](https://github.com/doublechenching)）的个人主页。中文 / English、浅色 / 深色主题、开源项目分类筛选及移动端导航。内容来自公开 GitHub 资料与项目说明；没有虚构的职位、论文或联系方式。

使用 Vite、TypeScript 和 CSS 构建，字体本地打包，不依赖运行时 API、外部字体服务、数据库或密钥。图形为本地生成的装饰性 SVG，不代表医学影像或模型输出。

## 本地开发

需要 Node.js 24（见 `.nvmrc`）。

```sh
npm ci
npm run dev
```

构建与预览：

```sh
npm run build
npm run preview
```

## 浏览器测试

```sh
# 首次在没有 Chromium 的机器上运行时安装浏览器：
npx playwright install chromium
npm run build
npm test
```

测试覆盖项目筛选、双语内容及偏好持久化、系统主题及手动覆盖、移动端菜单、键盘入口、禁用存储的降级处理，以及两种语言在 320–1440px 下的横向溢出。测试针对生产构建，Playwright 会自行启动预览服务。

云环境已提供 `/usr/bin/chromium`，测试配置会自动使用它；其他机器默认使用 Playwright 安装的浏览器，也可通过 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 指定路径。若 npm 默认缓存目录不可写，可在 `npm ci` 后加 `--cache /tmp/eric-ching-npm`。

## 更新内容

- `src/content.ts`：中英文文案、精选项目、项目归档年份与分类。
- `index.html`：页面结构、默认语言文案、搜索与分享元信息。
- `src/style.css`：颜色、排版与响应式布局。
- `src/art.ts`：数学曲线及项目装饰图。
- `public/`：图标、robots 和 sitemap。

目前收录五个自有公开项目，标注原项目年份；「关于我」另有公开 GitHub 置顶的 TencentAI4S/tFold 链接，不将其标为自有项目。仓库链接提供完整技术细节；没有使用会过时的星标或关注者统计。中文标语沿用 GitHub 个人简介。修改项目或文案后运行构建和测试。

## GitHub Pages

仓库对应站点为 `https://doublechenching.github.io/`，默认部署在域名根路径。

1. 在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
2. 将审阅后的代码推送至 `main`，或手动运行 **Build, test, and deploy personal page** 工作流。
3. 工作流安装锁定的依赖，构建并运行浏览器测试，成功后将 `dist/` 发布至 GitHub Pages。PR 只构建和测试，不发布。

现有旧 Node.js 14/16/18 模板已由此工作流替换。无需部署密钥或个人访问令牌；工作流使用 GitHub 提供的 Pages 权限。修改仓库域名时，同时更新 `index.html` 的 canonical / Open Graph URL 和 `public/` 中的 sitemap / robots。

此仓库的本地实现与验证不意味着已经推送或发布到线上。
