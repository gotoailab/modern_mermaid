import { Bot, Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Mermaid <span className="text-indigo-600">Advanced</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow">
          Share
        </button>
      </div>
    </header>
  );
};

export default Header;

