/**
 * Google Analytics 配置
 * 
 * 如果需要启用谷歌分析，请在这里设置你的 Measurement ID
 * 格式为: G-XXXXXXXXXX
 * 
 * 示例: export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
 * 
 * 如果不需要启用，请保持为空字符串或 undefined
 */
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

/**
 * 检查是否启用了谷歌分析
 */
export const isAnalyticsEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.trim() !== '';
};

