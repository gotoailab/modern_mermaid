import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ColorPickerProps {
  position: { x: number; y: number };
  onClose: () => void;
  onSelectColor: (color: string) => void;
  nodeId: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ position, onClose, onSelectColor, nodeId }) => {
  const { t } = useLanguage();
  const [customColor, setCustomColor] = useState('#3b82f6');

  const presetColors = [
    { name: t.red || '红色', value: '#fecaca' },      // 淡红色
    { name: t.orange || '橙色', value: '#fed7aa' },   // 淡橙色
    { name: t.yellow || '黄色', value: '#fef08a' },   // 淡黄色
    { name: t.green || '绿色', value: '#bbf7d0' },    // 淡绿色
    { name: t.blue || '蓝色', value: '#bfdbfe' },     // 淡蓝色
    { name: t.purple || '紫色', value: '#e9d5ff' },   // 淡紫色
    { name: t.pink || '粉色', value: '#fbcfe8' },     // 淡粉色
    { name: t.gray || '灰色', value: '#e5e7eb' },     // 淡灰色
  ];

  const handleColorSelect = (color: string) => {
    onSelectColor(color);
    onClose();
  };

  return (
    <>
      {/* 遮罩层 */}
      <div className="fixed inset-0 z-[200]" onClick={onClose} />
      
      {/* 颜色选择器 */}
      <div
        className="fixed z-[210] bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[280px]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -10px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">
            {t.changeNodeColor || '修改节点颜色'}: {nodeId}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 预设颜色 */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">{t.presetColors || '预设颜色'}</p>
          <div className="grid grid-cols-4 gap-2">
            {presetColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className="group relative w-full aspect-square rounded-md border-2 border-gray-200 hover:border-gray-400 transition-all hover:scale-110"
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-medium text-white drop-shadow-md">✓</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 自定义颜色 */}
        <div>
          <p className="text-xs text-gray-500 mb-2">{t.customColor || '自定义颜色'}</p>
          <div className="flex gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="#3b82f6"
            />
            <button
              onClick={() => handleColorSelect(customColor)}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition-colors"
            >
              {t.apply || '应用'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPicker;

