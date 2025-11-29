import { useRef, useState, useEffect } from 'react';
import Editor from './Editor';
import Preview from './Preview';
import type { PreviewHandle } from './Preview';
import Header from './Header';
import Toolbar from './Toolbar';
import ExampleSelector from './ExampleSelector';
import ResizableDivider from './ResizableDivider';
import ConfirmDialog from './ConfirmDialog';
import Toast from './Toast';
import { themes } from '../utils/themes';
import type { ThemeType } from '../utils/themes';
import { backgrounds, type BackgroundStyle } from '../utils/backgrounds';
import { fonts, type FontOption } from '../utils/fonts';
import type { AnnotationType } from '../types/annotation';
import { useLanguage } from '../contexts/LanguageContext';
import { X, RefreshCw } from 'lucide-react';
import { trackEvent } from './GoogleAnalytics';
import { AnalyticsEvents } from '../hooks/useAnalytics';
import { findExampleById } from '../utils/examples';
import { generateShareURL, parseShareURL } from '../utils/compression';

const Layout: React.FC = () => {
  const defaultCode = `graph TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Great!]
  B -- No --> D[Debug]`;
  
  const [code, setCode] = useState<string>(defaultCode);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('linearLight');
  const [selectedBackground, setSelectedBackground] = useState<BackgroundStyle>(backgrounds[0]);
  const [selectedFont, setSelectedFont] = useState<FontOption>(fonts[0]);
  const [selectedTool, setSelectedTool] = useState<AnnotationType | 'select' | null>('select');
  const [annotationCount, setAnnotationCount] = useState<number>(0);
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(30); // 默认 30%
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showClearAnnotationsDialog, setShowClearAnnotationsDialog] = useState(false);
  const [loadedFromUrl, setLoadedFromUrl] = useState<boolean>(false); // 追踪是否从 URL 加载
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true); // 追踪是否是初始加载
  const [customStylesLoaded, setCustomStylesLoaded] = useState<boolean>(false); // 追踪是否加载了自定义背景/字体
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const previewRef = useRef<PreviewHandle>(null);
  const { t, language } = useLanguage();

  const handleDownload = (transparent: boolean) => {
    // 追踪导出操作
    trackEvent(AnalyticsEvents.EXPORT_IMAGE, {
      format: transparent ? 'png' : 'jpg',
      transparent: transparent,
      theme: currentTheme,
      has_annotations: annotationCount > 0,
      annotation_count: annotationCount
    });
    
    if (previewRef.current) {
      previewRef.current.exportImage(transparent);
    }
  };

  const handleCopy = (transparent: boolean) => {
    // 追踪复制操作
    trackEvent('copy_image', {
      transparent: transparent,
      theme: currentTheme,
      has_annotations: annotationCount > 0,
      annotation_count: annotationCount
    });
    
    if (previewRef.current) {
      previewRef.current.copyImage(transparent);
    }
  };

  const handleShare = () => {
    // 生成分享链接
    const shareURL = generateShareURL({
      code: code,
      theme: currentTheme,
      background: selectedBackground.id,
      font: selectedFont.id
    });
    
    // 追踪分享操作
    trackEvent('share_link', {
      theme: currentTheme,
      background: selectedBackground.id,
      font: selectedFont.id,
      code_length: code.length,
      compressed_url_length: shareURL.length
    });
    
    // 复制到剪贴板
    navigator.clipboard.writeText(shareURL).then(() => {
      setToastMessage(t.shareCopied);
      setShowToast(true);
    }).catch((err) => {
      console.error('Failed to copy share link:', err);
      // 降级方案：显示链接让用户手动复制
      prompt(t.share, shareURL);
    });
  };

  const handleBackgroundChange = (bg: BackgroundStyle) => {
    // 追踪背景更改
    trackEvent(AnalyticsEvents.BACKGROUND_CHANGE, {
      background_id: bg.id,
      background_name: bg.name,
      theme: currentTheme
    });
    
    setSelectedBackground(bg);
    // 用户手动更改了背景，允许后续主题切换时重置
    setCustomStylesLoaded(false);
  };

  const handleFontChange = (font: FontOption) => {
    // 追踪字体更改
    trackEvent(AnalyticsEvents.FONT_CHANGE, {
      font_id: font.id,
      font_name: font.name,
      theme: currentTheme
    });
    
    setSelectedFont(font);
    // 用户手动更改了字体，允许后续主题切换时重置
    setCustomStylesLoaded(false);
  };

  // 清空编辑器
  const handleClearEditor = () => {
    setShowClearDialog(true);
  };

  const confirmClearEditor = () => {
    // 追踪清空编辑器操作
    trackEvent(AnalyticsEvents.EDITOR_CLEAR, {
      theme: currentTheme,
      code_length: code.length
    });
    
    setCode('');
    
    // 清除示例 URL 参数（但保留主题参数）
    const url = new URL(window.location.href);
    if (url.searchParams.has('example')) {
      url.searchParams.delete('example');
      // 保留主题参数
      window.history.replaceState({}, '', url.toString());
    }
    setLoadedFromUrl(false);
  };

  // 刷新预览（重新触发预览生成）
  const handleRefreshEditor = () => {
    // 追踪刷新操作
    trackEvent(AnalyticsEvents.EDITOR_REFRESH, {
      theme: currentTheme
    });
    
    if (previewRef.current) {
      previewRef.current.refresh();
    }
  };

  // 标注工具处理
  const handleSelectTool = (tool: AnnotationType | 'select') => {
    // 追踪标注工具选择
    trackEvent('annotation_tool_select', {
      tool: tool,
      previous_tool: selectedTool,
      theme: currentTheme
    });
    
    setSelectedTool(tool);
  };

  const handleClearAnnotations = () => {
    if (annotationCount > 0) {
      setShowClearAnnotationsDialog(true);
    }
  };

  const confirmClearAnnotations = () => {
    // 追踪清空标注操作
    trackEvent(AnalyticsEvents.ANNOTATION_CLEAR_ALL, {
      annotation_count: annotationCount,
      theme: currentTheme
    });
    
    // 这个会通过 Preview 的 ref 来处理
    if (previewRef.current && 'clearAnnotations' in previewRef.current) {
      (previewRef.current as any).clearAnnotations();
    }
    setShowClearAnnotationsDialog(false);
  };

  const handleAnnotationCountChange = (count: number) => {
    setAnnotationCount(count);
  };

  const handleResize = (width: number) => {
    setLeftPanelWidth(width);
  };

  const handleToggleFullscreen = () => {
    const newFullscreenState = !isFullscreen;
    
    // 追踪全屏切换
    trackEvent(AnalyticsEvents.FULLSCREEN_TOGGLE, {
      fullscreen: newFullscreenState,
      theme: currentTheme
    });
    
    setIsFullscreen(newFullscreenState);
  };

  // 主题更改处理
  const handleThemeChange = (theme: ThemeType) => {
    // 追踪主题更改
    trackEvent(AnalyticsEvents.THEME_CHANGE, {
      theme: theme,
      previous_theme: currentTheme
    });
    
    setCurrentTheme(theme);
    
    // 更新 URL 参数
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme);
    window.history.pushState({}, '', url.toString());
  };

  // 示例选择处理
  const handleExampleSelect = (exampleCode: string, exampleId?: string) => {
    // 追踪示例选择
    trackEvent(AnalyticsEvents.EXAMPLE_SELECT, {
      code_length: exampleCode.length,
      theme: currentTheme,
      example_id: exampleId
    });
    
    setCode(exampleCode);
    setLoadedFromUrl(true);
    
    // 更新 URL 参数（保留主题参数）
    if (exampleId) {
      const url = new URL(window.location.href);
      url.searchParams.set('example', exampleId);
      // 确保主题参数也存在
      url.searchParams.set('theme', currentTheme);
      window.history.pushState({}, '', url.toString());
    }
  };

  // 自定义的 setCode 函数，用于清除示例 URL 参数（保留主题参数）
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    
    // 如果代码被修改，且之前是从 URL 加载的，清除示例参数（但保留主题参数）
    if (loadedFromUrl) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('example')) {
        url.searchParams.delete('example');
        // 保留主题参数
        window.history.replaceState({}, '', url.toString());
        setLoadedFromUrl(false);
      }
    }
  };

  // 初始化：从 URL 参数加载示例、主题和分享内容
  useEffect(() => {
    // 尝试解析分享参数（包含压缩的代码）
    const shareParams = parseShareURL();
    
    if (shareParams) {
      // 检查是否有自定义背景/字体
      const hasCustomStyles = !!(shareParams.background || shareParams.font);
      if (hasCustomStyles) {
        setCustomStylesLoaded(true);
      }
      
      // 加载背景（在主题之前）
      if (shareParams.background) {
        const bg = backgrounds.find(b => b.id === shareParams.background);
        if (bg) {
          setSelectedBackground(bg);
        }
      }
      
      // 加载字体（在主题之前）
      if (shareParams.font) {
        const font = fonts.find(f => f.id === shareParams.font);
        if (font) {
          setSelectedFont(font);
        }
      }
      
      // 加载主题（在背景和字体之后）
      if (shareParams.theme) {
        const validThemes: ThemeType[] = ['linearLight', 'linearDark', 'notion', 'ghibli', 'spotless', 'brutalist', 'glassmorphism', 'memphis', 'softPop', 'cyberpunk', 'monochrome', 'darkMinimal', 'wireframe', 'handDrawn', 'grafana', 'noir', 'material', 'aurora'];
        if (validThemes.includes(shareParams.theme as ThemeType)) {
          setCurrentTheme(shareParams.theme as ThemeType);
          
          // 追踪从 URL 加载主题
          trackEvent('theme_loaded_from_url', {
            theme: shareParams.theme,
            from_share: !!shareParams.code
          });
        }
      }
      
      // 标记初始加载完成
      setIsInitialLoad(false);
      
      // 加载代码（从分享链接）
      if (shareParams.code) {
        setCode(shareParams.code);
        setLoadedFromUrl(true);
        
        // 追踪从分享链接加载
        trackEvent('shared_link_opened', {
          theme: shareParams.theme || currentTheme,
          background: shareParams.background,
          font: shareParams.font,
          code_length: shareParams.code.length
        });
      } else if (shareParams.example) {
        // 加载示例（如果没有代码但有示例 ID）
        const found = findExampleById(shareParams.example);
        if (found) {
          const exampleCode = found.example.code[language];
          setCode(exampleCode);
          setLoadedFromUrl(true);
          
          // 追踪从 URL 加载示例
          trackEvent('example_loaded_from_url', {
            example_id: shareParams.example,
            category: found.category,
            theme: shareParams.theme || currentTheme
          });
        }
      }
    } else {
      // 没有 URL 参数时也要标记初始加载完成
      setIsInitialLoad(false);
    }
  }, []); // 只在组件挂载时执行一次

  // ESC 键退出全屏
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Reset background and font when theme changes (but not on initial load or if custom styles were loaded from URL)
  useEffect(() => {
    if (!isInitialLoad && !customStylesLoaded) {
      setSelectedBackground(backgrounds[0]); // Reset to default
      setSelectedFont(fonts[0]); // Reset to default
    }
  }, [currentTheme, isInitialLoad, customStylesLoaded]);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      {!isFullscreen && <Header />}
      <main 
        className={`flex-1 flex flex-col md:flex-row overflow-hidden ${isFullscreen ? '' : ''}`}
      >
        {/* Left Pane: Editor */}
        {!isFullscreen && (
          <div 
            className="border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 shadow-sm z-10"
            style={{ width: `${leftPanelWidth}%` }}
          >
           <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center justify-between">
             <div className="flex items-center gap-3">
               <span>{t.editor}</span>
               <ExampleSelector onSelectExample={handleExampleSelect} />
               
               {/* 清空和刷新按钮 */}
               <div className="flex items-center gap-2">
                 <button
                   onClick={handleRefreshEditor}
                   className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors cursor-pointer"
                   title={t.refreshEditor}
                 >
                   <RefreshCw className="w-4 h-4" />
                 </button>
                 <button
                   onClick={handleClearEditor}
                   className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors cursor-pointer"
                   title={t.clearEditor}
                 >
                   <X className="w-4 h-4" />
                 </button>
               </div>
             </div>
             <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-400 dark:text-gray-500">{t.editorSubtitle}</span>
           </div>
           <div className="flex-1 overflow-hidden min-h-0">
             <Editor code={code} onChange={handleCodeChange} />
           </div>
        </div>
        )}
        
        {/* 可拖动分割线 */}
        {!isFullscreen && <ResizableDivider onResize={handleResize} />}
        
        {/* Right Pane: Preview */}
        <div 
          className="bg-gray-50 dark:bg-gray-900 flex flex-col relative flex-1"
          style={{ width: isFullscreen ? '100%' : `${100 - leftPanelWidth}%` }}
        >
           <div className="absolute top-4 right-4 z-10 flex items-start gap-2">
              <Toolbar 
                currentTheme={currentTheme} 
                onThemeChange={handleThemeChange}
                onDownload={handleDownload}
                onCopy={handleCopy}
                onShare={handleShare}
                selectedBackground={selectedBackground.id}
                onBackgroundChange={handleBackgroundChange}
                selectedFont={selectedFont.id}
                onFontChange={handleFontChange}
                selectedTool={selectedTool}
                onSelectTool={handleSelectTool}
                onClearAnnotations={handleClearAnnotations}
                annotationCount={annotationCount}
              />
           </div>
           <Preview 
             ref={previewRef} 
             code={code} 
             themeConfig={themes[currentTheme]}
             customBackground={selectedBackground}
             customFont={selectedFont}
             onCodeChange={setCode}
             selectedTool={selectedTool}
             onSelectTool={handleSelectTool}
             onAnnotationCountChange={handleAnnotationCountChange}
             isFullscreen={isFullscreen}
             onToggleFullscreen={handleToggleFullscreen}
           />
        </div>
      </main>

      {/* 清空编辑器确认对话框 */}
      <ConfirmDialog
        isOpen={showClearDialog}
        title={t.clearEditor}
        message={t.confirmClear}
        onConfirm={confirmClearEditor}
        onCancel={() => setShowClearDialog(false)}
        variant="danger"
      />

      {/* 清空标注确认对话框 */}
      <ConfirmDialog
        isOpen={showClearAnnotationsDialog}
        title={t.clearAnnotations}
        message={t.confirmClearAnnotations}
        onConfirm={confirmClearAnnotations}
        onCancel={() => setShowClearAnnotationsDialog(false)}
        variant="danger"
      />

      {/* Toast 通知 */}
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
          duration={3000}
          type="success"
        />
      )}
    </div>
  );
};

export default Layout;
