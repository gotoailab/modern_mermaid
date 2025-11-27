import React from 'react';
import { Download, Palette, Image, FileImage, MousePointer, ArrowRight, Type, Square, Circle, Minus, Trash2 } from 'lucide-react';
import { themes } from '../utils/themes';
import type { ThemeType } from '../utils/themes';
import { useLanguage } from '../contexts/LanguageContext';
import BackgroundSelector from './BackgroundSelector';
import FontSelector from './FontSelector';
import type { BackgroundStyle } from '../utils/backgrounds';
import type { FontOption } from '../utils/fonts';
import type { AnnotationType } from '../types/annotation';

interface ToolbarProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  onDownload: (transparent: boolean) => void;
  selectedBackground: string;
  onBackgroundChange: (bg: BackgroundStyle) => void;
  selectedFont: string;
  onFontChange: (font: FontOption) => void;
  selectedTool: AnnotationType | 'select' | null;
  onSelectTool: (tool: AnnotationType | 'select') => void;
  onClearAnnotations: () => void;
  annotationCount: number;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  currentTheme, 
  onThemeChange, 
  onDownload,
  selectedBackground,
  onBackgroundChange,
  selectedFont,
  onFontChange,
  selectedTool,
  onSelectTool,
  onClearAnnotations,
  annotationCount
}) => {
  const [isThemeOpen, setIsThemeOpen] = React.useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);
  const [isAnnotationOpen, setIsAnnotationOpen] = React.useState(false);
  const { t } = useLanguage();

  const annotationTools = [
    { id: 'select' as const, icon: MousePointer, label: t.select || '选择' },
    { id: 'arrow' as const, icon: ArrowRight, label: t.arrow || '箭头' },
    { id: 'text' as const, icon: Type, label: t.text || '文字' },
    { id: 'rect' as const, icon: Square, label: t.rectangle || '矩形' },
    { id: 'circle' as const, icon: Circle, label: t.circle || '圆形' },
    { id: 'line' as const, icon: Minus, label: t.line || '直线' },
  ];

  const currentToolConfig = annotationTools.find(tool => tool.id === selectedTool) || annotationTools[0];

  return (
    <div className="flex items-center gap-2">
      {/* Theme Selector */}
      <div className="relative">
        <button
          onClick={() => setIsThemeOpen(!isThemeOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm transition-all cursor-pointer"
        >
          <Palette className="w-4 h-4" />
          <span>{themes[currentTheme].name}</span>
        </button>
        
        {isThemeOpen && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setIsThemeOpen(false)} />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 z-[70] py-1 max-h-80 overflow-y-auto">
              {(Object.keys(themes) as ThemeType[]).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => {
                    onThemeChange(themeKey);
                    setIsThemeOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                    currentTheme === themeKey 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {themes[themeKey].name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Background Selector */}
      <BackgroundSelector
        selectedId={selectedBackground}
        onSelectBackground={onBackgroundChange}
      />

      {/* Font Selector */}
      <FontSelector
        selectedId={selectedFont}
        onSelectFont={onFontChange}
      />

      {/* Annotation Tool Selector */}
      <div className="relative">
        <button
          onClick={() => setIsAnnotationOpen(!isAnnotationOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm transition-all cursor-pointer"
          title={t.annotations || '标注工具'}
        >
          <currentToolConfig.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{currentToolConfig.label}</span>
          {annotationCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full">
              {annotationCount}
            </span>
          )}
        </button>
        
        {isAnnotationOpen && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setIsAnnotationOpen(false)} />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 z-[70] py-1">
              {annotationTools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = selectedTool === tool.id;
                
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onSelectTool(tool.id);
                      setIsAnnotationOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm cursor-pointer ${
                      isSelected 
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tool.label}</span>
                  </button>
                );
              })}
              
              {annotationCount > 0 && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                  <button
                    onClick={() => {
                      onClearAnnotations();
                      setIsAnnotationOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t.clearAll || '清空'}</span>
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Download Button */}
      <div className="relative">
        <button
          onClick={() => setIsDownloadOpen(!isDownloadOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 border border-transparent rounded-md shadow-sm transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{t.export}</span>
        </button>
        
        {isDownloadOpen && (
           <>
           <div className="fixed inset-0 z-[60]" onClick={() => setIsDownloadOpen(false)} />
           <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 z-[70] py-1 max-h-80 overflow-y-auto">
             <button
               onClick={() => { onDownload(false); setIsDownloadOpen(false); }}
               className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
             >
               <Image className="w-4 h-4 text-gray-500 dark:text-gray-400" />
               <div>
                 <span className="block font-medium">{t.withBackground}</span>
                 <span className="block text-xs text-gray-500 dark:text-gray-400">{t.withBackgroundDesc}</span>
               </div>
             </button>
             <button
               onClick={() => { onDownload(true); setIsDownloadOpen(false); }}
               className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
             >
               <FileImage className="w-4 h-4 text-gray-500 dark:text-gray-400" />
               <div>
                 <span className="block font-medium">{t.transparent}</span>
                 <span className="block text-xs text-gray-500 dark:text-gray-400">{t.transparentDesc}</span>
               </div>
             </button>
           </div>
         </>
        )}
      </div>      
    </div>
  );
};

export default Toolbar;
