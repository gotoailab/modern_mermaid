import { Bot, Github } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  // const { t } = useLanguage();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Mordern <span className="text-indigo-600">Mermaid</span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
          <Github className="w-5 h-5" />
        </a>
        {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow">
          {t.share}
        </button> */}
      </div>
    </header>
  );
};

export default Header;

