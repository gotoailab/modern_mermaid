import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AnnotationColorPickerProps {
  position: { x: number; y: number };
  currentColor: string;
  onSelectColor: (color: string) => void;
  onClose?: () => void;
}

const AnnotationColorPicker: React.FC<AnnotationColorPickerProps> = ({
  position,
  currentColor,
  onSelectColor,
  onClose,
}) => {
  const { t } = useLanguage();
  const [customColor, setCustomColor] = useState(currentColor);

  const handleSelectColor = (color: string) => {
    onSelectColor(color);
    onClose?.();
  };

  // 常用标注颜色
  const presetColors = [
    { value: '#ec6f6f', name: t.red || '红色' },
    { value: '#f99157', name: t.orange || '橙色' },
    { value: '#f9c74f', name: t.yellow || '黄色' },
    { value: '#22C55E', name: t.green || '绿色' },
    { value: '#5c9ee6', name: t.blue || '蓝色' },
    { value: '#b56fbe', name: t.purple || '紫色' },
    { value: '#f8c1b0', name: t.pink || '粉色' },
    { value: '#c2c2c2', name: t.gray || '灰色' },
  ];

  return (
    <>
      {/* 遮罩层 */}
      <div className="fixed inset-0 z-[200]" onClick={() => onClose?.()} />
      
      {/* 颜色选择器 */}
      <div
        className="fixed z-[210] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 min-w-[200px]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -10px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {t.changeNodeColor || '修改颜色'}
          </h3>
        </div>

        {/* 预设颜色 */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {presetColors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleSelectColor(color.value)}
              className={`w-8 h-8 rounded-md border-2 transition-all hover:scale-110 cursor-pointer ${
                currentColor === color.value 
                  ? 'border-gray-900 dark:border-gray-100 ring-2 ring-offset-2 ring-indigo-500' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>

        {/* 自定义颜色 */}
        <div className="flex gap-2">
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-10 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="flex-1 px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            placeholder="#3b82f6"
          />
          <button
            onClick={() => handleSelectColor(customColor)}
            className="px-3 py-1 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            ✓
          </button>
        </div>
      </div>
    </>
  );
};

export default AnnotationColorPicker;

