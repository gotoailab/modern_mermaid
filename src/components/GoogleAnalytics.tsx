import { useEffect } from 'react';
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from '../config/analytics';

/**
 * Google Analytics 组件
 * 
 * 只有在配置了有效的 Measurement ID 时才会加载和初始化 Google Analytics
 */
const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    // 如果没有启用分析，直接返回
    if (!isAnalyticsEnabled()) {
      console.log('Google Analytics: 未配置 Measurement ID，跳过初始化');
      return;
    }

    // 动态加载 Google Analytics 脚本
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // 初始化 Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);

    console.log('Google Analytics: 已初始化，Measurement ID:', GA_MEASUREMENT_ID);

    // 清理函数
    return () => {
      // 注意：在实际应用中，通常不需要移除这些脚本
      // 因为 Google Analytics 是持久化的服务
    };
  }, []);

  // 这个组件不渲染任何内容
  return null;
};

export default GoogleAnalytics;

/**
 * 页面浏览追踪函数
 * 
 * 用于在单页应用中手动追踪页面浏览
 * 
 * @param path - 页面路径
 * @param title - 页面标题（可选）
 */
export const trackPageView = (path: string, title?: string) => {
  if (!isAnalyticsEnabled()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * 事件追踪函数
 * 
 * 用于追踪用户自定义事件
 * 
 * @param eventName - 事件名称
 * @param eventParams - 事件参数
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (!isAnalyticsEnabled()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// 扩展 Window 接口以支持 gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

