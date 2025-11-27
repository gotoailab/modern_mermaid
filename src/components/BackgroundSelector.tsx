import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { backgrounds, type BackgroundStyle } from '../utils/backgrounds';

interface BackgroundSelectorProps {
  selectedId: string;
  onSelectBackground: (bg: BackgroundStyle) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ selectedId, onSelectBackground }) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedBg = backgrounds.find(bg => bg.id === selectedId) || backgrounds[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm transition-all"
        title={t.selectBackground}
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{selectedBg.name[language]}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[70] py-1 max-h-80 overflow-y-auto">
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                onClick={() => {
                  onSelectBackground(bg);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${
                  selectedId === bg.id ? 'bg-indigo-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Preview */}
                  <div
                    className={`w-10 h-10 rounded border border-gray-300 flex-shrink-0 ${bg.bgClass}`}
                    style={bg.bgStyle}
                  />
                  {/* Name */}
                  <div className="flex-1">
                    <div className={`font-medium ${selectedId === bg.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                      {bg.name[language]}
                    </div>
                  </div>
                  {/* Selected indicator */}
                  {selectedId === bg.id && (
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BackgroundSelector;

