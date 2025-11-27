import React, { useState, useRef, useEffect } from 'react';
import { X, Edit2, Palette } from 'lucide-react';
import type { Annotation, Point, AnnotationType } from '../types/annotation';

interface AnnotationLayerProps {
  annotations: Annotation[];
  onUpdateAnnotation: (id: string, updates: Partial<Annotation>) => void;
  onDeleteAnnotation: (id: string) => void;
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
  selectedTool,
  scale,
  position,
  selectedAnnotationId,
  onSelectAnnotation,
  onShowColorPicker
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const textInputRef = useRef<HTMLInputElement>(null);

  // 选中标注
  const handleSelectAnnotation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (selectedTool === 'select' || selectedTool === null) {
      onSelectAnnotation(id);
    }
  };

  // 开始拖动
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (selectedTool !== 'select' && selectedTool !== null) return;
    
    setIsDragging(true);
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
      
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, selectedAnnotationId, dragStart, annotations, onUpdateAnnotation, scale]);

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
    if (editingTextId) {
      onUpdateAnnotation(editingTextId, { text: editingText });
      setEditingTextId(null);
    }
  };

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
        
        {/* 选中状态的控制点 */}
        {isSelected && (
          <>
            <circle cx={annotation.start.x} cy={annotation.start.y} r="4" fill="#4F46E5" />
            <circle cx={annotation.end.x} cy={annotation.end.y} r="4" fill="#4F46E5" />
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
        
        {isSelected && (
          <>
            <circle cx={annotation.position.x} cy={annotation.position.y} r="4" fill="#4F46E5" />
            <circle cx={annotation.position.x + annotation.width} cy={annotation.position.y + annotation.height} r="4" fill="#4F46E5" />
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
        
        {isSelected && (
          <circle cx={annotation.center.x} cy={annotation.center.y} r="4" fill="#4F46E5" />
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
        
        {isSelected && (
          <>
            <circle cx={annotation.start.x} cy={annotation.start.y} r="4" fill="#4F46E5" />
            <circle cx={annotation.end.x} cy={annotation.end.y} r="4" fill="#4F46E5" />
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

    return (
      <foreignObject
        x={buttonX - 60}
        y={buttonY - 15}
        width="120"
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
            className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs flex items-center gap-1 shadow-lg"
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
              }}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs flex items-center gap-1 shadow-lg"
            >
              <Edit2 size={12} />
            </button>
          )}
          
          {/* 删除按钮 */}
          <button
            onClick={() => {
              onDeleteAnnotation(selectedAnnotationId);
              onSelectAnnotation(null);
            }}
            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs flex items-center gap-1 shadow-lg"
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

