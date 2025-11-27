import { useEffect } from 'react';
import { trackEvent, trackPageView } from '../components/GoogleAnalytics';

/**
 * 自定义 Hook：用于追踪组件挂载和卸载
 * 
 * @param componentName - 组件名称
 */
export const useComponentTracking = (componentName: string) => {
  useEffect(() => {
    trackEvent('component_mount', {
      component: componentName,
    });

    return () => {
      trackEvent('component_unmount', {
        component: componentName,
      });
    };
  }, [componentName]);
};

/**
 * 自定义 Hook：用于追踪用户操作
 * 
 * 返回一个包装函数，可以在执行任何操作时自动追踪
 */
export const useActionTracking = () => {
  const trackAction = (
    actionName: string,
    params?: Record<string, any>,
    callback?: () => void
  ) => {
    trackEvent(actionName, params);
    if (callback) {
      callback();
    }
  };

  return { trackAction };
};

/**
 * 自定义 Hook：用于追踪页面浏览（SPA 路由变化）
 */
export const usePageTracking = (path: string, title?: string) => {
  useEffect(() => {
    trackPageView(path, title);
  }, [path, title]);
};

/**
 * 预定义的分析事件
 */
export const AnalyticsEvents = {
  // 主题相关
  THEME_CHANGE: 'theme_change',
  BACKGROUND_CHANGE: 'background_change',
  FONT_CHANGE: 'font_change',
  
  // 导出相关
  EXPORT_IMAGE: 'export_image',
  EXPORT_SUCCESS: 'export_success',
  EXPORT_FAIL: 'export_fail',
  
  // 编辑器相关
  CODE_CHANGE: 'code_change',
  EXAMPLE_SELECT: 'example_select',
  EDITOR_CLEAR: 'editor_clear',
  EDITOR_REFRESH: 'editor_refresh',
  
  // 标注相关
  ANNOTATION_CREATE: 'annotation_create',
  ANNOTATION_DELETE: 'annotation_delete',
  ANNOTATION_UPDATE: 'annotation_update',
  ANNOTATION_CLEAR_ALL: 'annotation_clear_all',
  
  // 视图相关
  ZOOM_IN: 'zoom_in',
  ZOOM_OUT: 'zoom_out',
  ZOOM_RESET: 'zoom_reset',
  FULLSCREEN_TOGGLE: 'fullscreen_toggle',
  
  // 语言相关
  LANGUAGE_CHANGE: 'language_change',
  
  // 错误相关
  RENDER_ERROR: 'render_error',
} as const;

export type AnalyticsEventType = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

