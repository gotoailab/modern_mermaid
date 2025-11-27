import React, { useState } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../utils/i18n';
import { translations } from '../utils/i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zh-CN', name: 'Simplified Chinese', nativeName: '简体中文' },
    { code: 'zh-TW', name: 'Traditional Chinese', nativeName: '繁體中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm transition-all"
        title={t.language}
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">{translations[language].languageName}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === lang.code
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-gray-500">{lang.name}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;

