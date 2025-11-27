import React from 'react';
import { Download, Palette, Image, FileImage } from 'lucide-react';
import { themes } from '../utils/themes';
import type { ThemeType } from '../utils/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface ToolbarProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  onDownload: (transparent: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ currentTheme, onThemeChange, onDownload }) => {
  const [isThemeOpen, setIsThemeOpen] = React.useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {/* Theme Selector */}
      <div className="relative">
        <button
          onClick={() => setIsThemeOpen(!isThemeOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm transition-all"
        >
          <Palette className="w-4 h-4" />
          <span>{themes[currentTheme].name}</span>
        </button>
        
        {isThemeOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsThemeOpen(false)} />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 py-1">
              {(Object.keys(themes) as ThemeType[]).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => {
                    onThemeChange(themeKey);
                    setIsThemeOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentTheme === themeKey ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {themes[themeKey].name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Download Button */}
      <div className="relative">
        <button
          onClick={() => setIsDownloadOpen(!isDownloadOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-md shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{t.export}</span>
        </button>
        
        {isDownloadOpen && (
           <>
           <div className="fixed inset-0 z-10" onClick={() => setIsDownloadOpen(false)} />
           <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 py-1">
             <button
               onClick={() => { onDownload(false); setIsDownloadOpen(false); }}
               className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
             >
               <Image className="w-4 h-4 text-gray-500" />
               <div>
                 <span className="block font-medium">{t.withBackground}</span>
                 <span className="block text-xs text-gray-500">{t.withBackgroundDesc}</span>
               </div>
             </button>
             <button
               onClick={() => { onDownload(true); setIsDownloadOpen(false); }}
               className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
             >
               <FileImage className="w-4 h-4 text-gray-500" />
               <div>
                 <span className="block font-medium">{t.transparent}</span>
                 <span className="block text-xs text-gray-500">{t.transparentDesc}</span>
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
