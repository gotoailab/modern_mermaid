import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import mermaid from 'mermaid';
import { toPng, toJpeg } from 'html-to-image';
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';
import type { ThemeConfig } from '../utils/themes';

interface PreviewProps {
  code: string;
  themeConfig: ThemeConfig;
}

export interface PreviewHandle {
  exportImage: (transparent: boolean) => Promise<void>;
}

// Initialize globally once
mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
});

const Preview = forwardRef<PreviewHandle, PreviewProps>(({ code, themeConfig }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // 缩放和平移状态
  const [scale, setScale] = useState(1.2); // 默认放大到120%
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  // 缩放控制函数
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1.2);
    setPosition({ x: 0, y: 0 });
  };

  // 滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(5, prev + delta)));
  };

  // 拖动开始
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // 只处理左键
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    dragStartPos.current = { ...position };
    e.preventDefault();
  };

  // 拖动中
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setPosition({
      x: dragStartPos.current.x + deltaX,
      y: dragStartPos.current.y + deltaY,
    });
  };

  // 拖动结束
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useImperativeHandle(ref, () => ({
    exportImage: async (transparent: boolean) => {
      if (!contentRef.current) return;
      
      try {
        const node = contentRef.current;
        const exportScale = 2; // Better quality
        
        const bgColor = transparent ? undefined : getComputedStyle(containerRef.current!).backgroundColor;
        
        // Cast style to any to bypass strict TS check on CSSProperties vs html-to-image expected types
        const baseStyle: any = {
             transform: `scale(${exportScale})`,
             transformOrigin: 'top left',
             width: `${node.offsetWidth}px`,
             height: `${node.offsetHeight}px`,
             ...(transparent ? {} : themeConfig.bgStyle)
        };

        const param = {
             quality: 1.0,
             backgroundColor: bgColor,
             pixelRatio: exportScale,
             width: node.offsetWidth,
             height: node.offsetHeight,
             style: baseStyle
        };

        let dataUrl;
        if (transparent) {
             const transparentStyle = { ...baseStyle, background: 'none' };
             dataUrl = await toPng(node, { ...param, backgroundColor: undefined, style: transparentStyle });
        } else {
             dataUrl = await toJpeg(node, param);
        }
        
        const link = document.createElement('a');
        link.download = `mermaid-diagram-${Date.now()}.${transparent ? 'png' : 'jpg'}`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Export failed', err);
        alert('Export failed. See console for details.');
      }
    }
  }));

  useEffect(() => {
    const renderDiagram = async () => {
      if (!code) {
          setSvg('');
          return;
      }
      
      setLoading(true);
      try {
        setError(null);
        // Unique ID for each render
        const id = `mermaid-${Date.now()}`;
        
        mermaid.initialize({
            startOnLoad: false,
            ...themeConfig.mermaidConfig,
        });

        const { svg: renderedSvg } = await mermaid.render(id, code);
        
        // Post-process SVG to force dash array for specific themes
        let processedSvg = renderedSvg;
        if (themeConfig.mermaidConfig.themeVariables?.lineColor === '#ffffff' && 
            themeConfig.bgClass === 'bg-[#1a1a1a]') {
          // Dark Minimal theme - force dashed lines
          processedSvg = renderedSvg.replace(
            /<path class="path"/g, 
            '<path class="path" stroke-dasharray="10,8"'
          );
        }
        
        setSvg(processedSvg);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Syntax Error: Please check your Mermaid syntax.');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      renderDiagram();
    }, 600); 

    return () => clearTimeout(timeoutId);
  }, [code, themeConfig]);

  return (
    <div 
        className={`flex-1 overflow-hidden flex relative transition-colors duration-300 ${themeConfig.bgClass}`} 
        style={themeConfig.bgStyle}
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
       {/* 错误提示 */}
       {error && (
           <div className="absolute top-4 right-4 bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm shadow-sm z-20">
               {error}
           </div>
       )}
       
       {/* 加载中 */}
       {loading && !svg && (
           <div className="absolute inset-0 flex items-center justify-center z-10">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
           </div>
       )}
       
       {/* 缩放和移动控制按钮 */}
       <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
         <button
           onClick={handleZoomIn}
           className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-colors"
           title="放大 (Zoom In)"
         >
           <ZoomIn size={20} className="text-gray-700" />
         </button>
         <button
           onClick={handleZoomOut}
           className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-colors"
           title="缩小 (Zoom Out)"
         >
           <ZoomOut size={20} className="text-gray-700" />
         </button>
         <button
           onClick={handleResetZoom}
           className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-colors"
           title="重置视图 (Reset View)"
         >
           <Maximize2 size={20} className="text-gray-700" />
         </button>
         <div className="p-2 bg-white/90 rounded-lg shadow-md flex items-center justify-center">
           <Move size={16} className="text-gray-500" />
         </div>
       </div>
       
       {/* 缩放级别显示 */}
       <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 rounded-lg shadow-md text-sm text-gray-700 z-20">
         {Math.round(scale * 100)}%
       </div>
       
       {/* 提示信息 */}
       <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 rounded-lg shadow-md text-xs text-gray-600 z-20">
         滚轮缩放 | 拖动移动
       </div>
       
       {/* SVG 内容容器 */}
       <div 
         className="w-full h-full flex items-center justify-center overflow-hidden"
         style={{
           cursor: isDragging ? 'grabbing' : 'grab',
         }}
       >
         <div 
           ref={contentRef}
           className="p-12"
           style={{
             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
             transformOrigin: 'center',
             transition: isDragging ? 'none' : 'transform 0.1s ease-out',
           }}
           dangerouslySetInnerHTML={{ __html: svg }} 
         />
       </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;
