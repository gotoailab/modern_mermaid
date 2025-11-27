# 谷歌分析配置说明

## 如何启用 Google Analytics

本项目已集成 Google Analytics 支持，但默认不启用。要启用谷歌分析，请按以下步骤操作：

### 方法 1: 使用环境变量（推荐）

1. 在项目根目录创建 `.env.local` 文件（此文件不会被提交到 Git）
2. 在文件中添加以下内容：

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

将 `G-XXXXXXXXXX` 替换为你的 Google Analytics Measurement ID。

### 方法 2: 直接修改配置文件

1. 打开 `src/config/analytics.ts` 文件
2. 修改 `GA_MEASUREMENT_ID` 的值：

```typescript
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
```

将 `G-XXXXXXXXXX` 替换为你的 Google Analytics Measurement ID。

## 获取 Measurement ID

1. 登录 [Google Analytics](https://analytics.google.com/)
2. 选择你的账户和属性
3. 点击左下角的 "管理"（齿轮图标）
4. 在 "属性" 列中，点击 "数据流"
5. 选择你的网站数据流
6. 在详情页面中找到 "衡量 ID"（格式为 G-XXXXXXXXXX）

## 验证是否启用

启用后，在浏览器控制台中应该能看到以下日志：

```
Google Analytics: 已初始化，Measurement ID: G-XXXXXXXXXX
```

如果没有配置 Measurement ID，会看到：

```
Google Analytics: 未配置 Measurement ID，跳过初始化
```

## 自定义事件追踪

你可以在应用的任何地方使用以下函数来追踪自定义事件：

```typescript
import { trackEvent } from './components/GoogleAnalytics';

// 追踪按钮点击
trackEvent('button_click', {
  button_name: '导出图表',
  format: 'png'
});

// 追踪主题切换
trackEvent('theme_change', {
  theme: 'dark'
});
```

## 页面浏览追踪

如果你的应用使用了路由，可以使用以下函数来追踪页面浏览：

```typescript
import { trackPageView } from './components/GoogleAnalytics';

// 追踪页面浏览
trackPageView('/about', '关于页面');
```

## 隐私注意事项

- Google Analytics 会收集用户的访问数据
- 建议在隐私政策中说明使用了 Google Analytics
- 考虑添加 Cookie 同意提示
- 遵守 GDPR、CCPA 等隐私法规

## 禁用分析

要禁用谷歌分析：

1. 删除 `.env.local` 文件中的 `VITE_GA_MEASUREMENT_ID` 配置，或
2. 将 `src/config/analytics.ts` 中的 `GA_MEASUREMENT_ID` 设置为空字符串

重新构建应用后，谷歌分析将不会加载。

