import LZString from 'lz-string';

/**
 * 压缩字符串为 URL 安全的格式
 * 使用 LZ-String 的 Base64 URI 编码方式
 */
export const compressToURL = (str: string): string => {
  try {
    return LZString.compressToEncodedURIComponent(str);
  } catch (error) {
    console.error('Compression error:', error);
    return '';
  }
};

/**
 * 从 URL 安全的格式解压缩字符串
 */
export const decompressFromURL = (compressed: string): string => {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
    return decompressed || '';
  } catch (error) {
    console.error('Decompression error:', error);
    return '';
  }
};

/**
 * 生成分享 URL
 */
export interface ShareParams {
  code?: string;
  theme?: string;
  background?: string;
  font?: string;
  example?: string;
}

export const generateShareURL = (params: ShareParams): string => {
  const url = new URL(window.location.origin + window.location.pathname);
  
  // 如果有代码，压缩后添加
  if (params.code && params.code.trim()) {
    const compressed = compressToURL(params.code);
    if (compressed) {
      url.searchParams.set('c', compressed);
    }
  }
  
  // 添加其他参数
  if (params.theme) {
    url.searchParams.set('theme', params.theme);
  }
  
  if (params.background) {
    url.searchParams.set('bg', params.background);
  }
  
  if (params.font) {
    url.searchParams.set('font', params.font);
  }
  
  // 如果有 example，也添加（虽然通常 code 和 example 不会同时存在）
  if (params.example) {
    url.searchParams.set('example', params.example);
  }
  
  return url.toString();
};

/**
 * 从 URL 解析分享参数
 */
export const parseShareURL = (): ShareParams | null => {
  try {
    const url = new URL(window.location.href);
    const params: ShareParams = {};
    
    // 解压缩代码
    const compressedCode = url.searchParams.get('c');
    if (compressedCode) {
      const decompressed = decompressFromURL(compressedCode);
      if (decompressed) {
        params.code = decompressed;
      }
    }
    
    // 获取其他参数
    const theme = url.searchParams.get('theme');
    if (theme) {
      params.theme = theme;
    }
    
    const bg = url.searchParams.get('bg');
    if (bg) {
      params.background = bg;
    }
    
    const font = url.searchParams.get('font');
    if (font) {
      params.font = font;
    }
    
    const example = url.searchParams.get('example');
    if (example) {
      params.example = example;
    }
    
    // 如果有任何参数，返回结果
    if (Object.keys(params).length > 0) {
      return params;
    }
    
    return null;
  } catch (error) {
    console.error('Parse share URL error:', error);
    return null;
  }
};

