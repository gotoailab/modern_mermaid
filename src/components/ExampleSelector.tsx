import React, { useState, useEffect } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { examples, getCategoryName, type ExampleCategory } from '../utils/examples';

interface ExampleSelectorProps {
  onSelectExample: (code: string) => void;
}

const ExampleSelector: React.FC<ExampleSelectorProps> = ({ onSelectExample }) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExampleCategory | null>(null);
  const [selectedExample, setSelectedExample] = useState<{ category: ExampleCategory; index: number } | null>(null);

  const categories = Object.keys(examples) as ExampleCategory[];

  // Get current example name based on language
  const getSelectedExampleName = () => {
    if (!selectedExample) return null;
    const example = examples[selectedExample.category][selectedExample.index];
    return example.name[language];
  };

  const handleCategoryClick = (category: ExampleCategory) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleExampleClick = (category: ExampleCategory, exampleIndex: number) => {
    const example = examples[category][exampleIndex];
    const code = example.code[language];
    setSelectedExample({ category, index: exampleIndex });
    onSelectExample(code);
    setIsOpen(false);
    setSelectedCategory(null);
  };

  // Update code when language changes
  useEffect(() => {
    if (selectedExample) {
      const example = examples[selectedExample.category][selectedExample.index];
      const code = example.code[language];
      onSelectExample(code);
    }
  }, [language]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm transition-all max-w-xs"
        title={t.selectExample}
      >
        <FileText className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline truncate">{getSelectedExampleName() || t.examples}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => { setIsOpen(false); setSelectedCategory(null); }} />
          <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[70] py-1 max-h-96 overflow-y-auto">
            {categories.map((category) => (
              <div key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  <span>{getCategoryName(category, language)}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${
                      selectedCategory === category ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {selectedCategory === category && (
                  <div className="bg-gray-50">
                    {examples[category].map((example, index) => (
                      <button
                        key={example.id}
                        onClick={() => handleExampleClick(category, index)}
                        className="w-full text-left px-8 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {example.name[language]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExampleSelector;

