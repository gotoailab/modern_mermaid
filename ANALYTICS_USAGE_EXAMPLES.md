# Google Analytics 使用示例

这个文档展示了如何在应用中使用 Google Analytics 追踪功能。

## 基础事件追踪

### 在 Layout 组件中追踪主题变化

```typescript
import { trackEvent, AnalyticsEvents } from '../hooks/useAnalytics';

const handleThemeChange = (theme: ThemeType) => {
  setCurrentTheme(theme);
  
  // 追踪主题变化
  trackEvent(AnalyticsEvents.THEME_CHANGE, {
    theme: theme,
    timestamp: Date.now()
  });
};
```

### 在 Preview 组件中追踪导出操作

```typescript
import { trackEvent, AnalyticsEvents } from '../hooks/useAnalytics';

const exportImage = async (transparent: boolean) => {
  try {
    // 导出逻辑...
    
    // 追踪成功的导出
    trackEvent(AnalyticsEvents.EXPORT_SUCCESS, {
      format: transparent ? 'png_transparent' : 'jpg',
      timestamp: Date.now()
    });
  } catch (err) {
    // 追踪失败的导出
    trackEvent(AnalyticsEvents.EXPORT_FAIL, {
      error: (err as Error).message,
      format: transparent ? 'png_transparent' : 'jpg'
    });
  }
};
```

### 追踪示例选择

```typescript
import { trackEvent, AnalyticsEvents } from '../hooks/useAnalytics';

const handleExampleClick = (category: string, exampleName: string) => {
  // 选择示例的逻辑...
  
  // 追踪示例选择
  trackEvent(AnalyticsEvents.EXAMPLE_SELECT, {
    category: category,
    example: exampleName,
    language: language
  });
};
```

### 追踪标注操作

```typescript
import { trackEvent, AnalyticsEvents } from '../hooks/useAnalytics';

const handleAnnotationCreate = (type: AnnotationType) => {
  // 创建标注的逻辑...
  
  // 追踪标注创建
  trackEvent(AnalyticsEvents.ANNOTATION_CREATE, {
    type: type,
    count: annotations.length + 1
  });
};

const handleClearAnnotations = () => {
  if (annotationCount > 0) {
    // 追踪清空所有标注
    trackEvent(AnalyticsEvents.ANNOTATION_CLEAR_ALL, {
      count: annotationCount
    });
    
    // 清空逻辑...
  }
};
```

## 使用自定义 Hooks

### 追踪组件生命周期

```typescript
import { useComponentTracking } from '../hooks/useAnalytics';

const MyComponent = () => {
  // 自动追踪组件的挂载和卸载
  useComponentTracking('MyComponent');
  
  return <div>...</div>;
};
```

### 使用 Action 追踪包装器

```typescript
import { useActionTracking } from '../hooks/useAnalytics';

const MyComponent = () => {
  const { trackAction } = useActionTracking();
  
  const handleButtonClick = () => {
    trackAction('button_click', {
      button_name: 'submit',
      page: 'editor'
    }, () => {
      // 实际的按钮点击逻辑
      console.log('Button clicked!');
    });
  };
  
  return <button onClick={handleButtonClick}>Submit</button>;
};
```

## 追踪缩放和视图操作

```typescript
import { trackEvent, AnalyticsEvents } from '../hooks/useAnalytics';

const handleZoomIn = () => {
  setScale(prev => Math.min(prev + 0.2, 5));
  trackEvent(AnalyticsEvents.ZOOM_IN, {
    scale: scale + 0.2
  });
};

const handleZoomOut = () => {
  setScale(prev => Math.max(prev - 0.2, 0.5));
  trackEvent(AnalyticsEvents.ZOOM_OUT, {
    scale: scale - 0.2
  });
};

const handleResetZoom = () => {
  setScale(1.2);
  setPosition({ x: 0, y: 0 });
  trackEvent(AnalyticsEvents.ZOOM_RESET);
};

const handleToggleFullscreen = () => {
  setIsFullscreen(!isFullscreen);
  trackEvent(AnalyticsEvents.FULLSCREEN_TOGGLE, {
    fullscreen: !isFullscreen
  });
};
```

## 追踪语言切换

```typescript
import { trackEvent, AnalyticsEvents } from '../hooks/useAnalytics';

const handleLanguageChange = (lang: Language) => {
  setLanguage(lang);
  trackEvent(AnalyticsEvents.LANGUAGE_CHANGE, {
    from: language,
    to: lang
  });
};
```

## 追踪渲染错误

```typescript
import { trackEvent, AnalyticsEvents } from '../hooks/useAnalytics';

const renderDiagram = async () => {
  try {
    // 渲染逻辑...
  } catch (err) {
    console.error('Mermaid render error:', err);
    setError('Syntax Error: Please check your Mermaid syntax.');
    
    // 追踪渲染错误
    trackEvent(AnalyticsEvents.RENDER_ERROR, {
      error: (err as Error).message,
      code_length: code.length
    });
  }
};
```

## 最佳实践

1. **不要过度追踪**：只追踪对业务有意义的关键事件
2. **保护隐私**：不要在事件参数中包含敏感信息（如用户输入的完整代码）
3. **使用常量**：使用 `AnalyticsEvents` 中定义的常量，避免拼写错误
4. **添加上下文**：在事件参数中添加有用的上下文信息
5. **错误追踪**：追踪重要的错误信息，帮助改进产品

## 事件命名规范

建议使用以下命名规范：

- 使用小写字母和下划线：`button_click`, `theme_change`
- 使用清晰的动词：`create`, `delete`, `update`, `change`, `toggle`
- 包含对象类型：`annotation_create`, `theme_change`
- 保持一致性：统一使用相同的命名模式

## 调试

在开发环境中，你可以在浏览器控制台中查看追踪事件：

```typescript
// 临时启用详细日志
window.gtag = new Proxy(window.gtag, {
  apply: (target, thisArg, args) => {
    console.log('GA Event:', args);
    return Reflect.apply(target, thisArg, args);
  }
});
```

## 查看数据

1. 登录 [Google Analytics](https://analytics.google.com/)
2. 选择你的属性
3. 查看 "报告" > "实时" 查看实时数据
4. 查看 "报告" > "互动" > "事件" 查看事件统计

