import { useRef, useState, useEffect } from 'react';
import Editor from './Editor';
import Preview from './Preview';
import type { PreviewHandle } from './Preview';
import Header from './Header';
import Toolbar from './Toolbar';
import ExampleSelector from './ExampleSelector';
import ResizableDivider from './ResizableDivider';
import { themes } from '../utils/themes';
import type { ThemeType } from '../utils/themes';
import { backgrounds, type BackgroundStyle } from '../utils/backgrounds';
import { fonts, type FontOption } from '../utils/fonts';
import type { AnnotationType } from '../types/annotation';
import { useLanguage } from '../contexts/LanguageContext';
import { Trash2, RefreshCw } from 'lucide-react';

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
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(50); // 默认 50%
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef<PreviewHandle>(null);
  const { t } = useLanguage();

  const handleDownload = (transparent: boolean) => {
    if (previewRef.current) {
      previewRef.current.exportImage(transparent);
    }
  };

  const handleBackgroundChange = (bg: BackgroundStyle) => {
    setSelectedBackground(bg);
  };

  const handleFontChange = (font: FontOption) => {
    setSelectedFont(font);
  };

  // 清空编辑器
  const handleClearEditor = () => {
    if (confirm(t.confirmClear)) {
      setCode('');
    }
  };

  // 刷新编辑器（恢复到默认示例）
  const handleRefreshEditor = () => {
    setCode(defaultCode);
  };

  // 标注工具处理
  const handleSelectTool = (tool: AnnotationType | 'select') => {
    setSelectedTool(tool);
  };

  const handleClearAnnotations = () => {
    if (annotationCount > 0 && confirm(t.confirmClearAnnotations || '确定要清空所有标注吗？')) {
      // 这个会通过 Preview 的 ref 来处理
      if (previewRef.current && 'clearAnnotations' in previewRef.current) {
        (previewRef.current as any).clearAnnotations();
      }
    }
  };

  const handleAnnotationCountChange = (count: number) => {
    setAnnotationCount(count);
  };

  const handleResize = (width: number) => {
    setLeftPanelWidth(width);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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

  // Reset background and font when theme changes
  useEffect(() => {
    setSelectedBackground(backgrounds[0]); // Reset to default
    setSelectedFont(fonts[0]); // Reset to default
  }, [currentTheme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      {!isFullscreen && <Header />}
      <main className={`flex-1 flex flex-col md:flex-row overflow-hidden ${isFullscreen ? 'h-screen' : 'h-[calc(100vh-64px)]'}`}>
        {/* Left Pane: Editor */}
        {!isFullscreen && (
          <div 
            className="border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 shadow-sm z-10"
            style={{ width: `${leftPanelWidth}%` }}
          >
           <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center justify-between">
             <div className="flex items-center gap-3">
               <span>{t.editor}</span>
               <ExampleSelector onSelectExample={setCode} />
               
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
                   <Trash2 className="w-4 h-4" />
                 </button>
               </div>
             </div>
             <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-400 dark:text-gray-500">{t.editorSubtitle}</span>
           </div>
           <Editor code={code} onChange={setCode} />
        </div>
        )}
        
        {/* 可拖动分割线 */}
        {!isFullscreen && <ResizableDivider onResize={handleResize} />}
        
        {/* Right Pane: Preview */}
        <div 
          className="bg-gray-50 dark:bg-gray-900 flex flex-col relative"
          style={{ width: isFullscreen ? '100%' : `${100 - leftPanelWidth}%` }}
        >
           <div className="absolute top-4 right-4 z-10 flex items-start gap-2">
              <Toolbar 
                currentTheme={currentTheme} 
                onThemeChange={setCurrentTheme}
                onDownload={handleDownload}
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
    </div>
  );
};

export default Layout;
