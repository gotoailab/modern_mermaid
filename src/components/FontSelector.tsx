import React, { useState } from 'react';
import { Type } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { fonts, type FontOption } from '../utils/fonts';

interface FontSelectorProps {
  selectedId: string;
  onSelectFont: (font: FontOption) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ selectedId, onSelectFont }) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedFont = fonts.find(f => f.id === selectedId) || fonts[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm transition-all"
        title={t.selectFont}
      >
        <Type className="w-4 h-4" />
        <span className="hidden sm:inline">{selectedFont.name[language]}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[70] py-1 max-h-80 overflow-y-auto">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => {
                  onSelectFont(font);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${
                  selectedId === font.id ? 'bg-indigo-50' : ''
                }`}
              >
                <div className="flex flex-col gap-1">
                  {/* Font name */}
                  <div className={`font-medium text-xs ${selectedId === font.id ? 'text-indigo-700' : 'text-gray-500'}`}>
                    {font.name[language]}
                  </div>
                  {/* Preview text */}
                  <div
                    className={`text-base ${selectedId === font.id ? 'text-indigo-900' : 'text-gray-700'}`}
                    style={{ fontFamily: font.fontFamily || 'inherit' }}
                  >
                    {font.previewText[language]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FontSelector;

