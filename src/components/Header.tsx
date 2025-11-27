import { Bot, Moon, Sun } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useDarkMode } from '../contexts/DarkModeContext';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between relative z-50 transition-colors duration-200">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 dark:bg-indigo-500 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Mordern <span className="text-indigo-600 dark:text-indigo-400">Mermaid</span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;

