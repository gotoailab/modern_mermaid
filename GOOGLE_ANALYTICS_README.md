# 🔍 Google Analytics 集成指南

本项目已集成 Google Analytics (GA4)，但**默认不启用**。只有在配置了有效的 Measurement ID 时才会加载。

---

## 📋 目录

- [快速开始](#快速开始)
- [配置方式](#配置方式)
- [验证集成](#验证集成)
- [事件追踪](#事件追踪)
- [相关文档](#相关文档)

---

## 🚀 快速开始

### 1️⃣ 获取 Measurement ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 登录并选择你的账户
3. 导航至：**管理（齿轮图标）** → **数据流** → **选择网站**
4. 复制 **衡量 ID**（格式：`G-XXXXXXXXXX`）

### 2️⃣ 配置项目

**方法一：使用环境变量（推荐）**

```bash
# 1. 复制示例文件
cp .env.local.example .env.local

# 2. 编辑 .env.local，添加你的 Measurement ID
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**方法二：直接修改配置**

编辑 `src/config/analytics.ts`：

```typescript
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
```

### 3️⃣ 重启开发服务器

```bash
npm run dev
# 或
pnpm dev
```

---

## ⚙️ 配置方式

### 环境变量配置（推荐）

在项目根目录创建 `.env.local` 文件：

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**优点：**
- ✅ 不会被提交到 Git（已添加到 .gitignore）
- ✅ 支持不同环境使用不同配置
- ✅ 更安全，适合团队协作

### 直接配置

修改 `src/config/analytics.ts` 文件：

```typescript
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
```

**优点：**
- ✅ 配置简单直观
- ✅ 适合个人项目或公开项目

---

## ✅ 验证集成

### 1. 检查控制台日志

打开浏览器开发者工具（F12），在 Console 中查看：

```
✅ 已配置：Google Analytics: 已初始化，Measurement ID: G-XXXXXXXXXX
❌ 未配置：Google Analytics: 未配置 Measurement ID，跳过初始化
```

### 2. 检查网络请求

在开发者工具的 Network 面板中，筛选 `google-analytics.com` 或 `analytics.js`，应该能看到相关请求。

### 3. 实时报告

在 Google Analytics 后台查看：

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 选择你的属性
3. 导航至：**报告** → **实时**
4. 访问你的应用，应该能看到实时用户

---

## 📊 事件追踪

项目已预设多个事件追踪点：

### 自动追踪的事件

- ✅ 页面浏览（Page Views）
- ✅ 页面停留时间
- ✅ 用户互动（由 GA 自动收集）

### 可用的自定义事件

在代码中使用以下方式追踪自定义事件：

```typescript
import { trackEvent, AnalyticsEvents } from './hooks/useAnalytics';

// 追踪主题变化
trackEvent(AnalyticsEvents.THEME_CHANGE, {
  theme: 'dark'
});

// 追踪导出操作
trackEvent(AnalyticsEvents.EXPORT_IMAGE, {
  format: 'png',
  transparent: true
});

// 追踪示例选择
trackEvent(AnalyticsEvents.EXAMPLE_SELECT, {
  category: 'flowchart',
  example: 'basic'
});
```

### 预定义事件列表

| 事件名称 | 说明 |
|---------|------|
| `theme_change` | 主题切换 |
| `background_change` | 背景切换 |
| `font_change` | 字体切换 |
| `export_image` | 导出图片 |
| `export_success` | 导出成功 |
| `export_fail` | 导出失败 |
| `example_select` | 选择示例 |
| `annotation_create` | 创建标注 |
| `annotation_delete` | 删除标注 |
| `zoom_in` / `zoom_out` | 缩放操作 |
| `fullscreen_toggle` | 全屏切换 |
| `language_change` | 语言切换 |

---

## 📚 相关文档

- [📖 详细配置说明](./ANALYTICS_SETUP.md) - 完整的配置指南
- [💡 使用示例](./ANALYTICS_USAGE_EXAMPLES.md) - 代码示例和最佳实践

---

## 🔒 隐私说明

- Google Analytics 会收集用户的访问数据
- 建议在应用中添加隐私政策说明
- 考虑添加 Cookie 同意提示
- 遵守 GDPR、CCPA 等隐私法规

---

## ❌ 禁用分析

如果不需要使用 Google Analytics：

1. **删除环境变量**：删除或注释 `.env.local` 中的 `VITE_GA_MEASUREMENT_ID`
2. **或清空配置**：将 `src/config/analytics.ts` 中的 `GA_MEASUREMENT_ID` 设置为空字符串

重新启动开发服务器后，Google Analytics 将不会加载。

---

## 🛠️ 技术实现

- **条件加载**：只在配置了 Measurement ID 时才加载 GA 脚本
- **动态注入**：使用 JavaScript 动态注入 GA 脚本，不影响初始加载
- **类型安全**：完整的 TypeScript 类型定义
- **环境隔离**：支持通过环境变量在不同环境使用不同配置

---

## 📝 更新日志

- **2024-11** - 初始集成 Google Analytics (GA4)
- 支持环境变量配置
- 添加自定义事件追踪
- 提供完整的 TypeScript 类型定义

---

## 🤝 贡献

如果你有改进建议或发现问题，欢迎提交 Issue 或 Pull Request！

---

**Happy Tracking! 📈**

