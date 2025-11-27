import { useRef, useState, useEffect } from 'react';
import Editor from './Editor';
import Preview from './Preview';
import type { PreviewHandle } from './Preview';
import Header from './Header';
import Toolbar from './Toolbar';
import ExampleSelector from './ExampleSelector';
import { themes } from '../utils/themes';
import type { ThemeType } from '../utils/themes';
import { backgrounds, type BackgroundStyle } from '../utils/backgrounds';
import { fonts, type FontOption } from '../utils/fonts';
import { useLanguage } from '../contexts/LanguageContext';

const Layout: React.FC = () => {
  const [code, setCode] = useState<string>(`graph TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Great!]
  B -- No --> D[Debug]`);
  
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('linearLight');
  const [selectedBackground, setSelectedBackground] = useState<BackgroundStyle>(backgrounds[0]);
  const [selectedFont, setSelectedFont] = useState<FontOption>(fonts[0]);
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

  // Reset background and font when theme changes
  useEffect(() => {
    setSelectedBackground(backgrounds[0]); // Reset to default
    setSelectedFont(fonts[0]); // Reset to default
  }, [currentTheme]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* Left Pane: Editor */}
        <div className="w-full md:w-1/2 border-r border-gray-200 flex flex-col bg-white shadow-sm z-10">
           <div className="p-4 border-b border-gray-200 bg-white font-semibold text-xs text-gray-500 uppercase tracking-wider flex items-center justify-between">
             <div className="flex items-center gap-3">
               <span>{t.editor}</span>
               <ExampleSelector onSelectExample={setCode} />
             </div>
             <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-400">{t.editorSubtitle}</span>
           </div>
           <Editor code={code} onChange={setCode} />
        </div>
        
        {/* Right Pane: Preview */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col relative">
           <div className="absolute top-4 right-4 z-10">
              <Toolbar 
                currentTheme={currentTheme} 
                onThemeChange={setCurrentTheme}
                onDownload={handleDownload}
                selectedBackground={selectedBackground.id}
                onBackgroundChange={handleBackgroundChange}
                selectedFont={selectedFont.id}
                onFontChange={handleFontChange}
              />
           </div>
           <Preview 
             ref={previewRef} 
             code={code} 
             themeConfig={themes[currentTheme]}
             customBackground={selectedBackground}
             customFont={selectedFont}
           />
        </div>
      </main>
    </div>
  );
};

export default Layout;
