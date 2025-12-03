import React, { useState, useRef, useEffect } from 'react';
import { X, Edit2, Palette, Copy } from 'lucide-react';
import type { Annotation, Point, AnnotationType } from '../types/annotation';
import { useLanguage } from '../contexts/LanguageContext';

interface AnnotationLayerProps {
  annotations: Annotation[];
  onUpdateAnnotation: (id: string, updates: Partial<Annotation>) => void;
  onDeleteAnnotation: (id: string) => void;
  onCopyAnnotation?: (annotation: Annotation) => void;
  selectedTool: AnnotationType | 'select' | null;
  scale: number;
  position: Point;
  selectedAnnotationId: string | null;
  onSelectAnnotation: (id: string | null) => void;
  onShowColorPicker: (position: { x: number; y: number }) => void;
}

const AnnotationLayer: React.FC<AnnotationLayerProps> = ({
  annotations,
  onUpdateAnnotation,
  onDeleteAnnotation,
  onCopyAnnotation,
  selectedTool,
  scale,
  selectedAnnotationId,
  onSelectAnnotation,
  onShowColorPicker
}) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const textInputRef = useRef<HTMLInputElement>(null);
  
  // 调整控制点类型
  const [resizingHandle, setResizingHandle] = useState<string | null>(null);

  // 选中标注
  const handleSelectAnnotation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (selectedTool === 'select' || selectedTool === null) {
      onSelectAnnotation(id);
    }
  };

  // 开始拖动
  const handleMouseDown = (e: React.MouseEvent, id: string, handle?: string) => {
    e.stopPropagation();
    if (selectedTool !== 'select' && selectedTool !== null) return;
    
    setIsDragging(true);
    setResizingHandle(handle || null);
    onSelectAnnotation(id);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  // 拖动中
  useEffect(() => {
    if (!isDragging || !selectedAnnotationId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - dragStart.x) / scale;
      const deltaY = (e.clientY - dragStart.y) / scale;
      
      const annotation = annotations.find(a => a.id === selectedAnnotationId);
      if (!annotation) return;

      // 如果有调整控制点，则调整形状而非移动
      if (resizingHandle) {
        if (annotation.type === 'arrow' || annotation.type === 'line') {
          if (resizingHandle === 'start') {
            onUpdateAnnotation(selectedAnnotationId, {
              start: {
                x: annotation.start.x + deltaX,
                y: annotation.start.y + deltaY
              }
            });
          } else if (resizingHandle === 'end') {
            onUpdateAnnotation(selectedAnnotationId, {
              end: {
                x: annotation.end.x + deltaX,
                y: annotation.end.y + deltaY
              }
            });
          }
        } else if (annotation.type === 'rect') {
          // 矩形调整大小
          if (resizingHandle === 'topLeft') {
            const newWidth = annotation.width - deltaX;
            const newHeight = annotation.height - deltaY;
            if (newWidth > 10 && newHeight > 10) {
              onUpdateAnnotation(selectedAnnotationId, {
                position: {
                  x: annotation.position.x + deltaX,
                  y: annotation.position.y + deltaY
                },
                width: newWidth,
                height: newHeight
              });
            }
          } else if (resizingHandle === 'topRight') {
            const newWidth = annotation.width + deltaX;
            const newHeight = annotation.height - deltaY;
            if (newWidth > 10 && newHeight > 10) {
              onUpdateAnnotation(selectedAnnotationId, {
                position: {
                  x: annotation.position.x,
                  y: annotation.position.y + deltaY
                },
                width: newWidth,
                height: newHeight
              });
            }
          } else if (resizingHandle === 'bottomLeft') {
            const newWidth = annotation.width - deltaX;
            const newHeight = annotation.height + deltaY;
            if (newWidth > 10 && newHeight > 10) {
              onUpdateAnnotation(selectedAnnotationId, {
                position: {
                  x: annotation.position.x + deltaX,
                  y: annotation.position.y
                },
                width: newWidth,
                height: newHeight
              });
            }
          } else if (resizingHandle === 'bottomRight') {
            const newWidth = annotation.width + deltaX;
            const newHeight = annotation.height + deltaY;
            if (newWidth > 10 && newHeight > 10) {
              onUpdateAnnotation(selectedAnnotationId, {
                width: newWidth,
                height: newHeight
              });
            }
          }
        } else if (annotation.type === 'circle' && resizingHandle === 'radius') {
          // 圆形调整半径
          const newRadius = annotation.radius + deltaX;
          if (newRadius > 10) {
            onUpdateAnnotation(selectedAnnotationId, {
              radius: newRadius
            });
          }
        }
      } else {
        // 移动整个标注
        if (annotation.type === 'arrow' || annotation.type === 'line') {
          onUpdateAnnotation(selectedAnnotationId, {
            start: {
              x: annotation.start.x + deltaX,
              y: annotation.start.y + deltaY
            },
            end: {
              x: annotation.end.x + deltaX,
              y: annotation.end.y + deltaY
            }
          });
        } else if (annotation.type === 'text') {
          onUpdateAnnotation(selectedAnnotationId, {
            position: {
              x: annotation.position.x + deltaX,
              y: annotation.position.y + deltaY
            }
          });
        } else if (annotation.type === 'rect') {
          onUpdateAnnotation(selectedAnnotationId, {
            position: {
              x: annotation.position.x + deltaX,
              y: annotation.position.y + deltaY
            }
          });
        } else if (annotation.type === 'circle') {
          onUpdateAnnotation(selectedAnnotationId, {
            center: {
              x: annotation.center.x + deltaX,
              y: annotation.center.y + deltaY
            }
          });
        }
      }
      
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setResizingHandle(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, selectedAnnotationId, dragStart, annotations, onUpdateAnnotation, scale, resizingHandle]);

  // 双击编辑文字
  const handleDoubleClick = (e: React.MouseEvent, annotation: Annotation) => {
    e.stopPropagation();
    if (annotation.type === 'text') {
      setEditingTextId(annotation.id);
      setEditingText(annotation.text);
      setTimeout(() => textInputRef.current?.focus(), 0);
    }
  };

  // 保存文字编辑
  const handleSaveText = () => {
    if (editingTextId && editingText.trim()) {
      onUpdateAnnotation(editingTextId, { text: editingText });
    }
    setEditingTextId(null);
  };

  // 监听编辑状态，点击外部时保存
  useEffect(() => {
    if (!editingTextId) return;

    const handleClickOutside = (e: MouseEvent | PointerEvent) => {
      // 如果点击的不是输入框本身，保存并关闭编辑
      if (textInputRef.current && !textInputRef.current.contains(e.target as Node)) {
        if (editingText.trim()) {
          onUpdateAnnotation(editingTextId, { text: editingText });
        }
        setEditingTextId(null);
      }
    };

    // 延迟添加监听器，避免立即触发（等待输入框渲染和聚焦）
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('pointerdown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [editingTextId, editingText, onUpdateAnnotation]);

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 如果正在编辑文字，不处理快捷键
      if (editingTextId) return;
      
      // 如果没有选中标注，不处理
      if (!selectedAnnotationId) return;

      // Delete 或 Backspace 删除选中的标注
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onDeleteAnnotation(selectedAnnotationId);
        onSelectAnnotation(null);
      }

      // Ctrl/Cmd + C 复制选中的标注
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const annotation = annotations.find(a => a.id === selectedAnnotationId);
        if (annotation && onCopyAnnotation) {
          e.preventDefault();
          onCopyAnnotation(annotation);
        }
      }

      // Ctrl/Cmd + D 复制选中的标注（另一个常用快捷键）
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        const annotation = annotations.find(a => a.id === selectedAnnotationId);
        if (annotation && onCopyAnnotation) {
          e.preventDefault();
          onCopyAnnotation(annotation);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedAnnotationId, editingTextId, annotations, onDeleteAnnotation, onSelectAnnotation, onCopyAnnotation]);

  // 当选中的标注改变时，如果之前在编辑，保存编辑
  useEffect(() => {
    if (editingTextId && selectedAnnotationId !== editingTextId) {
      if (editingText.trim()) {
        onUpdateAnnotation(editingTextId, { text: editingText });
      }
      setEditingTextId(null);
    }
  }, [selectedAnnotationId, editingTextId, editingText, onUpdateAnnotation]);

  // 渲染箭头
  const renderArrow = (annotation: Annotation) => {
    if (annotation.type !== 'arrow') return null;
    
    const isSelected = selectedAnnotationId === annotation.id;
    const angle = Math.atan2(annotation.end.y - annotation.start.y, annotation.end.x - annotation.start.x);
    const arrowSize = 12;

    return (
      <g key={annotation.id} style={{ pointerEvents: 'auto' }}>
        {/* 线条 */}
        <line
          x1={annotation.start.x}
          y1={annotation.start.y}
          x2={annotation.end.x}
          y2={annotation.end.y}
          stroke={annotation.color}
          strokeWidth={annotation.strokeWidth}
          strokeLinecap="round"
          onMouseDown={(e) => handleMouseDown(e, annotation.id)}
          onClick={(e) => handleSelectAnnotation(e, annotation.id)}
          style={{ cursor: 'move' }}
          className={isSelected ? 'filter drop-shadow-lg' : ''}
        />
        
        {/* 箭头头部 */}
        <polygon
          points={`
            ${annotation.end.x},${annotation.end.y}
            ${annotation.end.x - arrowSize * Math.cos(angle - Math.PI / 6)},${annotation.end.y - arrowSize * Math.sin(angle - Math.PI / 6)}
            ${annotation.end.x - arrowSize * Math.cos(angle + Math.PI / 6)},${annotation.end.y - arrowSize * Math.sin(angle + Math.PI / 6)}
          `}
          fill={annotation.color}
          onMouseDown={(e) => handleMouseDown(e, annotation.id)}
          onClick={(e) => handleSelectAnnotation(e, annotation.id)}
          style={{ cursor: 'move' }}
        />
        
        {/* 选中状态的可拖动控制点 */}
        {isSelected && (
          <>
            <circle 
              cx={annotation.start.x} 
              cy={annotation.start.y} 
              r="6" 
              fill="#4F46E5" 
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'start')}
              style={{ cursor: 'grab' }}
              className="hover:fill-indigo-700"
            />
            <circle 
              cx={annotation.end.x} 
              cy={annotation.end.y} 
              r="6" 
              fill="#4F46E5"
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'end')}
              style={{ cursor: 'grab' }}
              className="hover:fill-indigo-700"
            />
          </>
        )}
      </g>
    );
  };

  // 渲染文字
  const renderText = (annotation: Annotation) => {
    if (annotation.type !== 'text') return null;
    
    const isSelected = selectedAnnotationId === annotation.id;
    const isEditing = editingTextId === annotation.id;

    if (isEditing) {
      return (
        <foreignObject
          key={annotation.id}
          x={annotation.position.x - 50}
          y={annotation.position.y - 15}
          width="200"
          height="40"
          style={{ pointerEvents: 'auto' }}
        >
          <input
            ref={textInputRef}
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onBlur={handleSaveText}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveText();
              if (e.key === 'Escape') setEditingTextId(null);
            }}
            className="w-full px-2 py-1 text-sm bg-white dark:bg-gray-800 border-2 border-indigo-500 rounded focus:outline-none"
            style={{ fontSize: `${annotation.fontSize}px`, fontWeight: annotation.fontWeight }}
          />
        </foreignObject>
      );
    }

    return (
      <g key={annotation.id} style={{ pointerEvents: 'auto' }}>
        <text
          x={annotation.position.x}
          y={annotation.position.y}
          fill={annotation.color}
          fontSize={annotation.fontSize}
          fontWeight={annotation.fontWeight}
          textAnchor="middle"
          dominantBaseline="middle"
          onMouseDown={(e) => handleMouseDown(e, annotation.id)}
          onClick={(e) => handleSelectAnnotation(e, annotation.id)}
          onDoubleClick={(e) => handleDoubleClick(e, annotation)}
          style={{ cursor: 'move', userSelect: 'none' }}
          className={isSelected ? 'filter drop-shadow-lg' : ''}
        >
          {annotation.text}
        </text>
        
        {isSelected && (
          <circle cx={annotation.position.x} cy={annotation.position.y} r="4" fill="#4F46E5" />
        )}
      </g>
    );
  };

  // 渲染矩形
  const renderRect = (annotation: Annotation) => {
    if (annotation.type !== 'rect') return null;
    
    const isSelected = selectedAnnotationId === annotation.id;

    return (
      <g key={annotation.id} style={{ pointerEvents: 'auto' }}>
        <rect
          x={annotation.position.x}
          y={annotation.position.y}
          width={annotation.width}
          height={annotation.height}
          fill={annotation.fill}
          stroke={annotation.color}
          strokeWidth={annotation.strokeWidth}
          opacity={annotation.opacity}
          rx="4"
          onMouseDown={(e) => handleMouseDown(e, annotation.id)}
          onClick={(e) => handleSelectAnnotation(e, annotation.id)}
          style={{ cursor: 'move' }}
          className={isSelected ? 'filter drop-shadow-lg' : ''}
        />
        
        {/* 选中状态的可拖动缩放控制点 */}
        {isSelected && (
          <>
            {/* 左上角 */}
            <circle 
              cx={annotation.position.x} 
              cy={annotation.position.y} 
              r="6" 
              fill="#4F46E5"
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'topLeft')}
              style={{ cursor: 'nwse-resize' }}
              className="hover:fill-indigo-700"
            />
            {/* 右上角 */}
            <circle 
              cx={annotation.position.x + annotation.width} 
              cy={annotation.position.y} 
              r="6" 
              fill="#4F46E5"
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'topRight')}
              style={{ cursor: 'nesw-resize' }}
              className="hover:fill-indigo-700"
            />
            {/* 左下角 */}
            <circle 
              cx={annotation.position.x} 
              cy={annotation.position.y + annotation.height} 
              r="6" 
              fill="#4F46E5"
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'bottomLeft')}
              style={{ cursor: 'nesw-resize' }}
              className="hover:fill-indigo-700"
            />
            {/* 右下角 */}
            <circle 
              cx={annotation.position.x + annotation.width} 
              cy={annotation.position.y + annotation.height} 
              r="6" 
              fill="#4F46E5"
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'bottomRight')}
              style={{ cursor: 'nwse-resize' }}
              className="hover:fill-indigo-700"
            />
          </>
        )}
      </g>
    );
  };

  // 渲染圆形
  const renderCircle = (annotation: Annotation) => {
    if (annotation.type !== 'circle') return null;
    
    const isSelected = selectedAnnotationId === annotation.id;

    return (
      <g key={annotation.id} style={{ pointerEvents: 'auto' }}>
        <circle
          cx={annotation.center.x}
          cy={annotation.center.y}
          r={annotation.radius}
          fill={annotation.fill}
          stroke={annotation.color}
          strokeWidth={annotation.strokeWidth}
          opacity={annotation.opacity}
          onMouseDown={(e) => handleMouseDown(e, annotation.id)}
          onClick={(e) => handleSelectAnnotation(e, annotation.id)}
          style={{ cursor: 'move' }}
          className={isSelected ? 'filter drop-shadow-lg' : ''}
        />
        
        {/* 选中状态的控制点 */}
        {isSelected && (
          <>
            {/* 中心点 */}
            <circle 
              cx={annotation.center.x} 
              cy={annotation.center.y} 
              r="4" 
              fill="#4F46E5" 
              stroke="white"
              strokeWidth="1"
            />
            {/* 可拖动的半径控制点（右侧） */}
            <circle 
              cx={annotation.center.x + annotation.radius} 
              cy={annotation.center.y} 
              r="6" 
              fill="#4F46E5"
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'radius')}
              style={{ cursor: 'ew-resize' }}
              className="hover:fill-indigo-700"
            />
          </>
        )}
      </g>
    );
  };

  // 渲染直线
  const renderLine = (annotation: Annotation) => {
    if (annotation.type !== 'line') return null;
    
    const isSelected = selectedAnnotationId === annotation.id;

    return (
      <g key={annotation.id} style={{ pointerEvents: 'auto' }}>
        <line
          x1={annotation.start.x}
          y1={annotation.start.y}
          x2={annotation.end.x}
          y2={annotation.end.y}
          stroke={annotation.color}
          strokeWidth={annotation.strokeWidth}
          strokeLinecap="round"
          onMouseDown={(e) => handleMouseDown(e, annotation.id)}
          onClick={(e) => handleSelectAnnotation(e, annotation.id)}
          style={{ cursor: 'move' }}
          className={isSelected ? 'filter drop-shadow-lg' : ''}
        />
        
        {/* 选中状态的可拖动端点 */}
        {isSelected && (
          <>
            <circle 
              cx={annotation.start.x} 
              cy={annotation.start.y} 
              r="6" 
              fill="#4F46E5"
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'start')}
              style={{ cursor: 'grab' }}
              className="hover:fill-indigo-700"
            />
            <circle 
              cx={annotation.end.x} 
              cy={annotation.end.y} 
              r="6" 
              fill="#4F46E5"
              stroke="white"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(e, annotation.id, 'end')}
              style={{ cursor: 'grab' }}
              className="hover:fill-indigo-700"
            />
          </>
        )}
      </g>
    );
  };

  // 渲染删除按钮
  const renderDeleteButton = () => {
    if (!selectedAnnotationId) return null;
    
    const annotation = annotations.find(a => a.id === selectedAnnotationId);
    if (!annotation) return null;

    let buttonX = 0, buttonY = 0;

    if (annotation.type === 'arrow' || annotation.type === 'line') {
      buttonX = (annotation.start.x + annotation.end.x) / 2;
      buttonY = Math.min(annotation.start.y, annotation.end.y) - 20;
    } else if (annotation.type === 'text') {
      buttonX = annotation.position.x;
      buttonY = annotation.position.y - 30;
    } else if (annotation.type === 'rect') {
      buttonX = annotation.position.x + annotation.width / 2;
      buttonY = annotation.position.y - 20;
    } else if (annotation.type === 'circle') {
      buttonX = annotation.center.x;
      buttonY = annotation.center.y - annotation.radius - 20;
    }

    // 根据按钮数量计算宽度（文字标注有4个按钮，其他有3个）
    const buttonCount = annotation.type === 'text' ? 4 : 3;
    const toolbarWidth = buttonCount * 32 + (buttonCount - 1) * 4; // 每个按钮约32px，间距4px

    return (
      <foreignObject
        x={buttonX - toolbarWidth / 2}
        y={buttonY - 15}
        width={toolbarWidth}
        height="30"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex gap-1 justify-center">
          {/* 颜色选择按钮 */}
          <button
            onClick={(e) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              onShowColorPicker({
                x: rect.left + rect.width / 2,
                y: rect.top
              });
            }}
            className="px-2 py-1 bg-white-600 hover:text-indigo-600 hover:bg-indigo-50 text-black rounded text-xs flex items-center gap-1 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
            title="修改颜色"
          >
            <Palette size={12} />
          </button>
          
          {/* 编辑按钮（仅文字） */}
          {annotation.type === 'text' && (
            <button
              onClick={() => {
                setEditingTextId(annotation.id);
                setEditingText(annotation.text);
                // 添加 setTimeout 来确保输入框被渲染后再聚焦
                setTimeout(() => textInputRef.current?.focus(), 0);
              }}
              className="px-2 py-1 bg-white-600 hover:text-indigo-600 hover:bg-indigo-50 text-black rounded text-xs flex items-center gap-1 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
              title={t.text}
            >
              <Edit2 size={12} />
            </button>
          )}
          
          {/* 复制按钮 */}
          <button
            onClick={() => {
              if (onCopyAnnotation) {
                onCopyAnnotation(annotation);
              }
            }}
            className="px-2 py-1 bg-white-600 hover:text-green-600 hover:bg-green-50 text-black rounded text-xs flex items-center gap-1 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
            title={t.copyAnnotation}
          >
            <Copy size={12} />
          </button>
          
          {/* 删除按钮 */}
          <button
            onClick={() => {
              onDeleteAnnotation(selectedAnnotationId);
              onSelectAnnotation(null);
            }}
            className="px-2 py-1 bg-white-600 hover:text-red-600 hover:bg-red-50 text-black rounded text-xs flex items-center gap-1 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      </foreignObject>
    );
  };

  return (
    <>
      {annotations.map(annotation => {
        switch (annotation.type) {
          case 'arrow': return renderArrow(annotation);
          case 'text': return renderText(annotation);
          case 'rect': return renderRect(annotation);
          case 'circle': return renderCircle(annotation);
          case 'line': return renderLine(annotation);
          default: return null;
        }
      })}
      {renderDeleteButton()}
    </>
  );
};

export default AnnotationLayer;

