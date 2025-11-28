import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Translation } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';
import { trackEvent } from '../components/GoogleAnalytics';
import { AnalyticsEvents } from '../hooks/useAnalytics';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 从 URL 获取语言参数
const getLanguageFromURL = (): Language | null => {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  const validLanguages: Language[] = ['en', 'zh-CN', 'zh-TW', 'ja', 'es', 'pt'];
  return langParam && validLanguages.includes(langParam as Language) ? (langParam as Language) : null;
};

// 更新 URL 中的语言参数
const updateURLLanguage = (lang: Language) => {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 优先级：URL 参数 > localStorage > 默认 'en'
    const urlLang = getLanguageFromURL();
    if (urlLang) {
      return urlLang;
    }
    
    const saved = localStorage.getItem('mermaid-language');
    return (saved as Language) || 'en';
  });

  // 监听 URL 变化（例如浏览器前进/后退）
  useEffect(() => {
    const handlePopState = () => {
      const urlLang = getLanguageFromURL();
      if (urlLang && urlLang !== language) {
        setLanguageState(urlLang);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  // 动态更新 HTML lang 属性
  useEffect(() => {
    const langMap: Record<Language, string> = {
      'en': 'en',
      'zh-CN': 'zh-CN',
      'zh-TW': 'zh-TW',
      'ja': 'ja',
      'es': 'es',
      'pt': 'pt',
    };
    
    document.documentElement.lang = langMap[language] || 'en';
  }, [language]);

  const setLanguage = (lang: Language) => {
    // 追踪语言切换
    trackEvent(AnalyticsEvents.LANGUAGE_CHANGE, {
      language: lang,
      previous_language: language
    });
    
    setLanguageState(lang);
    localStorage.setItem('mermaid-language', lang);
    // 更新 URL 参数
    updateURLLanguage(lang);
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

