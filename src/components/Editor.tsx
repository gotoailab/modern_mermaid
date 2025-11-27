import React from 'react';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  return (
    <div className="flex-1 relative">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-6 resize-none focus:outline-none font-mono text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 leading-relaxed placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors duration-200"
        spellCheck={false}
        placeholder="Enter Mermaid code here..."
      />
    </div>
  );
};

export default Editor;

