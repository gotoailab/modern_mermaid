# 📊 用户行为分析追踪指南

本项目已集成完整的 Google Analytics 事件追踪系统，可以详细分析用户的行为模式。

## 🎯 追踪的事件类型

### 1. 主题相关事件

#### `theme_change` - 主题切换
用户更改主题时触发
```javascript
参数:
- theme: string           // 新主题名称
- previous_theme: string  // 之前的主题名称
```
**分析价值**: 了解用户最喜欢的主题，优化热门主题

#### `background_change` - 背景切换
用户更改背景样式时触发
```javascript
参数:
- background_id: string   // 背景ID
- background_name: string // 背景名称
- theme: string           // 当前主题
```
**分析价值**: 了解哪些背景最受欢迎，是否需要增加更多背景选项

#### `font_change` - 字体切换
用户更改字体时触发
```javascript
参数:
- font_id: string     // 字体ID
- font_name: string   // 字体名称
- theme: string       // 当前主题
```
**分析价值**: 了解用户字体偏好，优化字体库

### 2. 导出相关事件

#### `export_image` - 开始导出
用户点击导出按钮时触发
```javascript
参数:
- format: string          // 'png' 或 'jpg'
- transparent: boolean    // 是否透明背景
- theme: string          // 当前主题
- has_annotations: boolean // 是否有标注
- annotation_count: number // 标注数量
```
**分析价值**: 了解用户导出习惯，PNG vs JPG 偏好

#### `export_success` - 导出成功
图片成功导出时触发
```javascript
参数:
- format: string          // 'png' 或 'jpg'
- transparent: boolean    // 是否透明背景
- width: number          // 图片宽度
- height: number         // 图片高度
- has_annotations: boolean // 是否包含标注
```
**分析价值**: 统计导出成功率，了解常见图片尺寸

#### `export_fail` - 导出失败
图片导出失败时触发
```javascript
参数:
- format: string      // 'png' 或 'jpg'
- error: string       // 错误信息
```
**分析价值**: 识别导出问题，改进导出功能

### 3. 编辑器相关事件

#### `example_select` - 选择示例
用户选择示例代码时触发
```javascript
参数:
- code_length: number // 代码长度
- theme: string       // 当前主题
```
**分析价值**: 了解哪些示例最常用，是否需要添加更多示例

#### `editor_clear` - 清空编辑器
用户清空编辑器内容时触发
```javascript
参数:
- theme: string       // 当前主题
- code_length: number // 清空前的代码长度
```
**分析价值**: 了解用户重新开始的频率

#### `editor_refresh` - 刷新预览
用户手动刷新预览时触发
```javascript
参数:
- theme: string       // 当前主题
```
**分析价值**: 判断自动刷新是否足够，是否需要改进

### 4. 标注相关事件

#### `annotation_create` - 创建标注
用户创建新标注时触发
```javascript
参数:
- annotation_type: string  // 标注类型: 'arrow', 'text', 'rect', 'circle', 'line'
- total_annotations: number // 当前总标注数
```
**分析价值**: 了解哪种标注类型最常用

#### `annotation_update` - 更新标注
用户修改标注时触发
```javascript
参数:
- annotation_type: string  // 标注类型
- update_fields: string    // 更新的字段（逗号分隔）
```
**分析价值**: 了解用户如何编辑标注

#### `annotation_delete` - 删除标注
用户删除标注时触发
```javascript
参数:
- annotation_type: string    // 标注类型
- total_annotations: number  // 删除后剩余标注数
```
**分析价值**: 了解用户删除标注的频率

#### `annotation_clear_all` - 清空所有标注
用户清空所有标注时触发
```javascript
参数:
- annotation_count: number // 清空前的标注数
- theme: string           // 当前主题
```
**分析价值**: 了解用户标注的使用模式

#### `annotation_tool_select` - 选择标注工具
用户切换标注工具时触发
```javascript
参数:
- tool: string           // 当前选择的工具
- previous_tool: string  // 之前的工具
- theme: string         // 当前主题
```
**分析价值**: 了解工具切换模式和使用频率

### 5. 视图控制事件

#### `zoom_in` - 放大
用户放大视图时触发
```javascript
参数:
- scale: number  // 新的缩放比例
```
**分析价值**: 了解用户是否需要更好的默认缩放级别

#### `zoom_out` - 缩小
用户缩小视图时触发
```javascript
参数:
- scale: number  // 新的缩放比例
```

#### `zoom_reset` - 重置缩放
用户重置视图时触发
```javascript
参数:
- previous_scale: number  // 重置前的缩放比例
```
**分析价值**: 了解用户是否经常需要重置视图

#### `fullscreen_toggle` - 切换全屏
用户切换全屏模式时触发
```javascript
参数:
- fullscreen: boolean  // 是否进入全屏
- theme: string       // 当前主题
```
**分析价值**: 了解全屏功能的使用频率

### 6. 语言相关事件

#### `language_change` - 切换语言
用户切换界面语言时触发
```javascript
参数:
- language: string           // 新语言
- previous_language: string  // 之前的语言
```
**分析价值**: 了解用户语言偏好，判断国际化支持是否充分

## 📈 如何在 Google Analytics 中查看数据

### 方法 1: 事件报告
1. 登录 Google Analytics
2. 进入 **报告** > **参与度** > **事件**
3. 查看所有自定义事件列表

### 方法 2: 探索分析
1. 进入 **探索**
2. 创建自定义报告
3. 按事件名称和参数筛选

### 方法 3: 创建自定义维度
1. 进入 **管理** > **自定义定义**
2. 创建自定义维度（如 `theme`、`language` 等）
3. 在报告中使用这些维度

## 💡 有用的分析查询示例

### 1. 最受欢迎的主题
```
事件: theme_change
维度: theme
指标: 事件计数
```

### 2. 导出格式偏好
```
事件: export_success
维度: format
指标: 事件计数
```

### 3. 标注功能使用率
```
事件: annotation_create
维度: annotation_type
指标: 事件计数
```

### 4. 各语言用户分布
```
事件: language_change
维度: language
指标: 用户数
```

### 5. 功能漏斗分析
```
1. 页面访问
2. theme_change (主题切换)
3. annotation_create (添加标注)
4. export_success (导出成功)
```

## 🎨 Google Analytics 4 实时调试

### 使用 DebugView 实时查看事件
1. 安装 Google Analytics Debugger 扩展
2. 打开开发者工具
3. 在 GA4 中进入 **管理** > **DebugView**
4. 实时查看触发的事件

### 浏览器控制台验证
打开浏览器控制台，你会看到：
```
Google Analytics: 已初始化，Measurement ID: G-XXXXXXXXXX
```

每次事件触发时，可以在控制台的 Network 标签中看到发送到 Google Analytics 的请求。

## 🔍 常见分析场景

### 场景 1: 用户流失分析
**问题**: 用户在哪个环节流失？

**分析方法**:
1. 追踪页面访问
2. 查看 `editor_clear` 频率
3. 对比 `export_image` vs `export_success` 的比率

### 场景 2: 功能优先级
**问题**: 应该优先开发哪些功能？

**分析方法**:
1. 统计各功能的使用频率
2. 查看 `annotation_tool_select` 了解最常用的标注类型
3. 对比 `background_change` 和 `font_change` 的频率

### 场景 3: 国际化效果
**问题**: 哪些地区的用户最活跃？

**分析方法**:
1. 查看 `language_change` 事件
2. 结合 GA 的地理位置报告
3. 分析不同语言用户的行为差异

### 场景 4: 性能优化
**问题**: 用户体验是否流畅？

**分析方法**:
1. 追踪 `editor_refresh` 频率（过高说明自动刷新有问题）
2. 查看 `export_fail` 比率
3. 分析 `zoom_reset` 频率（判断默认缩放是否合适）

## 📊 推荐的自定义仪表板

### Dashboard 1: 核心功能使用
- 主题切换次数
- 导出成功率
- 标注使用率
- 语言分布

### Dashboard 2: 用户行为流
- 页面访问 → 选择主题 → 添加标注 → 导出
- 转化率分析

### Dashboard 3: 功能热度图
- 各功能的使用频率排序
- 时间趋势分析

## 🚀 下一步优化建议

根据收集到的数据，你可以：

1. **优化热门功能**: 将使用频率高的功能放在更显眼的位置
2. **改进冷门功能**: 分析为什么某些功能使用率低
3. **个性化体验**: 根据用户的语言和主题偏好提供定制化体验
4. **减少流失**: 识别用户流失的关键节点并优化
5. **A/B 测试**: 使用追踪数据验证新功能的效果

## 📝 注意事项

1. **隐私合规**: 确保符合 GDPR、CCPA 等隐私法规
2. **数据采样**: GA4 可能会对大流量进行采样，注意数据的代表性
3. **事件限制**: GA4 对事件名称和参数有字符限制
4. **实时延迟**: 实时报告可能有几分钟的延迟

## 📖 相关文档

- [Google Analytics 4 文档](https://support.google.com/analytics/)
- [事件追踪最佳实践](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [自定义维度和指标](https://support.google.com/analytics/answer/10075209)

---

**提示**: 这些追踪数据将帮助你做出数据驱动的产品决策！🎯

