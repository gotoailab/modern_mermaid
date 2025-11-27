import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import mermaid from 'mermaid';
import { toPng, toJpeg } from 'html-to-image';
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';
import type { ThemeConfig } from '../utils/themes';
import type { BackgroundStyle } from '../utils/backgrounds';
import type { FontOption } from '../utils/fonts';
import { useLanguage } from '../contexts/LanguageContext';
import ColorPicker from './ColorPicker';

interface PreviewProps {
  code: string;
  themeConfig: ThemeConfig;
  customBackground?: BackgroundStyle;
  customFont?: FontOption;
  onCodeChange?: (code: string) => void;
}

export interface PreviewHandle {
  exportImage: (transparent: boolean) => Promise<void>;
}

// Initialize globally once
mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  suppressErrorRendering: true, // 隐藏错误渲染到 DOM
});

const Preview = forwardRef<PreviewHandle, PreviewProps>(({ code, themeConfig, customBackground, customFont, onCodeChange }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false); // 导出Loading状态
  const { t } = useLanguage();
  
  // 颜色选择器状态
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerPos, setColorPickerPos] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [selectedNodeDomId, setSelectedNodeDomId] = useState<string>(''); // 保存 DOM ID
  
  // 节点颜色映射 - 用于 CSS hack
  const [nodeColors, setNodeColors] = useState<Record<string, { fill: string; stroke: string }>>({});
  
  // Determine actual background and font to use
  const actualBg = customBackground?.id === 'default' ? themeConfig.bgClass : (customBackground?.bgClass || themeConfig.bgClass);
  const actualBgStyle = customBackground?.id === 'default' ? themeConfig.bgStyle : (customBackground?.bgStyle || themeConfig.bgStyle);
  const actualFont = customFont?.id === 'default' ? '' : (customFont?.fontFamily || '');
  
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

  // 滚轮缩放 - 使用 useEffect 添加原生事件监听器
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(0.5, Math.min(5, prev + delta)));
    };

    // 添加事件监听器，设置 passive: false 以允许 preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

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

  // 处理右键点击
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const target = e.target as HTMLElement;
    
    // 查找被点击的节点元素
    let nodeElement: HTMLElement | null = target;
    let nodeId = '';
    let domId = '';
    
    // 向上遍历找到包含节点 ID 的元素
    while (nodeElement && nodeElement !== contentRef.current) {
      // 检查 <g> 元素，可能包含各种图表类型的节点
      if (nodeElement.tagName === 'g' && nodeElement.id) {
        const rawId = nodeElement.id;
        domId = rawId; // 保存完整的 DOM ID
        
        // 尝试多种模式匹配
        // 1. Flowchart: "flowchart-A-123"
        let match = rawId.match(/flowchart-([A-Za-z0-9_]+)-\d+/);
        
        // 2. State diagram: "state-已建立-2" 或 "state-SomeName-2" (支持Unicode)
        if (!match) {
          match = rawId.match(/^state-(.+?)-\d+$/);
        }
        
        // 3. Sequence diagram: "actor-User-123"
        if (!match) {
          match = rawId.match(/^actor-(.+?)-\d+$/);
        }
        
        // 4. 通用格式: "SomeName-123"
        if (!match) {
          match = rawId.match(/^([A-Za-z0-9_]+)-\d+$/);
        }
        
        // 5. 其他图表类型的前缀格式
        if (!match) {
          match = rawId.match(/^[a-z]+-(.+?)-\d+$/);
        }
        
        if (match) {
          nodeId = match[1];
          break;
        }
      }
      
      // 检查是否是节点元素（通常有 id 属性或特定的 class）
      if (nodeElement.classList.contains('node') || 
          nodeElement.classList.contains('actor') ||
          nodeElement.classList.contains('task') ||
          nodeElement.classList.contains('section') ||
          nodeElement.classList.contains('state')) {
        const rawId = nodeElement.id || nodeElement.getAttribute('data-id') || '';
        if (rawId) {
          domId = rawId;
          // 提取真实的节点ID（去掉前缀和后缀）
          const match = rawId.match(/flowchart-([A-Za-z0-9_]+)-\d+/) || 
                       rawId.match(/^state-(.+?)-\d+$/) ||
                       rawId.match(/^actor-(.+?)-\d+$/) ||
                       rawId.match(/^([A-Za-z0-9_]+)-\d+$/) ||
                       rawId.match(/^[a-z]+-(.+?)-\d+$/) ||
                       rawId.match(/^(.+)$/);
          nodeId = match ? match[1] : rawId;
          if (nodeId) break;
        }
      }
      
      nodeElement = nodeElement.parentElement;
    }
    
    if (nodeId && domId) {
      console.log('Selected node - ID:', nodeId, 'DOM ID:', domId); // 调试日志
      setSelectedNodeId(nodeId);
      setSelectedNodeDomId(domId);
      setColorPickerPos({ x: e.clientX, y: e.clientY });
      setShowColorPicker(true);
    }
  };

  // 生成边框颜色（比填充色深一些）
  const darkenColor = (hexColor: string): string => {
    // 移除 # 号
    const hex = hexColor.replace('#', '');
    
    // 转换为 RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // 降低亮度（乘以0.6使其变深）
    const newR = Math.floor(r * 0.6);
    const newG = Math.floor(g * 0.6);
    const newB = Math.floor(b * 0.6);
    
    // 转换回 hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  // 判断节点ID是否需要用引号包裹
  const needsQuotes = (id: string): boolean => {
    // 如果包含非ASCII字符、空格、特殊符号等，需要用引号
    return /[^a-zA-Z0-9_]/.test(id);
  };

  // 检测图表类型
  const detectDiagramType = (code: string): string => {
    const firstLine = code.trim().split('\n')[0].toLowerCase();
    if (firstLine.includes('statediagram')) return 'state';
    if (firstLine.includes('sequencediagram')) return 'sequence';
    if (firstLine.includes('gantt')) return 'gantt';
    if (firstLine.includes('classdiagram')) return 'class';
    if (firstLine.includes('erdiagram')) return 'er';
    if (firstLine.includes('journey')) return 'journey';
    if (firstLine.includes('pie')) return 'pie';
    if (firstLine.includes('graph') || firstLine.includes('flowchart')) return 'flowchart';
    return 'flowchart'; // default
  };

  // 应用颜色到节点 - 使用 CSS hack 方式
  const handleApplyColor = (color: string) => {
    if (!selectedNodeId || !selectedNodeDomId) return;
    
    // 检测图表类型
    const diagramType = detectDiagramType(code);
    
    // 为填充色生成更深的边框色
    const strokeColor = darkenColor(color);
    
    // 对于不支持原生样式的图表类型，使用 CSS hack
    const useCssHack = ['state', 'sequence', 'gantt', 'class', 'er', 'journey', 'pie'].includes(diagramType);
    
    if (useCssHack) {
      // 使用 CSS hack 方式 - 保存颜色映射，不修改代码
      setNodeColors(prev => ({
        ...prev,
        [selectedNodeDomId]: { fill: color, stroke: strokeColor }
      }));
      console.log(`Applied CSS hack color for ${diagramType} diagram:`, selectedNodeDomId);
    } else {
      // 流程图使用原生 style 命令修改代码
      if (!onCodeChange) return;
      
      const lines = code.split('\n');
      const shouldQuote = needsQuotes(selectedNodeId);
      const quotedNodeId = shouldQuote ? `"${selectedNodeId}"` : selectedNodeId;
      const escapedNodeId = selectedNodeId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      const styleRegex = new RegExp(`^\\s*style\\s+(?:"${escapedNodeId}"|${escapedNodeId})\\s+`, 'i');
      let styleLineIndex = -1;
      
      for (let i = 0; i < lines.length; i++) {
        if (styleRegex.test(lines[i])) {
          styleLineIndex = i;
          break;
        }
      }
      
      const styleDefinition = `    style ${quotedNodeId} fill:${color},stroke:${strokeColor},stroke-width:2px`;
      
      if (styleLineIndex >= 0) {
        lines[styleLineIndex] = styleDefinition;
      } else {
        let lastNonEmptyIndex = lines.length - 1;
        while (lastNonEmptyIndex >= 0 && lines[lastNonEmptyIndex].trim() === '') {
          lastNonEmptyIndex--;
        }
        lines.splice(lastNonEmptyIndex + 1, 0, styleDefinition);
      }
      
      const newCode = lines.join('\n');
      onCodeChange(newCode);
    }
  };

  useImperativeHandle(ref, () => ({
    exportImage: async (transparent: boolean) => {
      if (!contentRef.current || !svg) return;
      
      setExporting(true); // 开始导出Loading
      
      try {
        const node = contentRef.current;
        
        // 保存当前的 transform 和 transition 状态
        const originalTransform = node.style.transform;
        const originalTransition = node.style.transition;
        
        // 临时重置 transform 到居中状态，不应用任何缩放和位移
        node.style.transform = 'translate(0px, 0px) scale(1)';
        node.style.transition = 'none';
        
        // 等待三帧确保样式已经完全应用
        await new Promise(resolve => requestAnimationFrame(resolve));
        await new Promise(resolve => requestAnimationFrame(resolve));
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        // 使用更高的导出倍率以获得更清晰的图片
        const exportScale = 3; // 3x 分辨率，更清晰
        
        // 获取背景色 - 优先使用 actualBgStyle 中的 backgroundColor
        let bgColor = transparent ? undefined : getComputedStyle(containerRef.current!).backgroundColor;
        if (!transparent && actualBgStyle?.backgroundColor) {
          bgColor = actualBgStyle.backgroundColor;
        }
        
        // 获取SVG元素的实际尺寸
        const svgElement = node.querySelector('svg');
        let targetWidth = node.offsetWidth;
        let targetHeight = node.offsetHeight;
        
        // 如果能获取到SVG的实际尺寸，使用它
        if (svgElement) {
          const svgWidth = svgElement.getAttribute('width');
          const svgHeight = svgElement.getAttribute('height');
          if (svgWidth && svgHeight) {
            targetWidth = Math.max(parseFloat(svgWidth) + 96, node.offsetWidth); // 加上padding
            targetHeight = Math.max(parseFloat(svgHeight) + 96, node.offsetHeight);
          }
        }
        
        // 设置导出样式 - 使用当前选择的背景样式
        const baseStyle: any = {
             transform: 'scale(1)',
             transformOrigin: 'center',
             width: `${targetWidth}px`,
             height: `${targetHeight}px`,
        };

        // 如果不是透明导出，应用当前选择的背景样式
        if (!transparent && actualBgStyle) {
          Object.assign(baseStyle, actualBgStyle);
        }

        const param = {
             quality: 0.98, // 高质量
             backgroundColor: bgColor,
             pixelRatio: exportScale, // 3x分辨率
             width: targetWidth,
             height: targetHeight,
             style: baseStyle,
             cacheBust: true,
             skipAutoScale: true, // 禁用自动缩放
             fontEmbedCSS: '', // 跳过字体嵌入以避免跨域错误
             filter: (node: HTMLElement) => {
               // 过滤掉外部样式表以避免 CORS 错误
               if (node.tagName === 'LINK' && node.getAttribute('rel') === 'stylesheet') {
                 const href = node.getAttribute('href');
                 if (href && (href.includes('fonts.googleapis.com') || href.startsWith('http'))) {
                   return false;
                 }
               }
               return true;
             },
        };

        let dataUrl;
        if (transparent) {
             dataUrl = await toPng(node, { 
               ...param, 
               backgroundColor: undefined,
               style: { ...baseStyle, backgroundColor: 'transparent' }
             });
        } else {
             dataUrl = await toJpeg(node, param);
        }
        
        // 恢复原来的 transform 状态
        node.style.transform = originalTransform;
        node.style.transition = originalTransition;
        
        // 下载图片
        const link = document.createElement('a');
        link.download = `mermaid-diagram-${Date.now()}.${transparent ? 'png' : 'jpg'}`;
        link.href = dataUrl;
        link.click();
        
        // 短暂延迟后关闭Loading，让用户看到成功反馈
        setTimeout(() => {
          setExporting(false);
        }, 500);
      } catch (err) {
        console.error('Export failed', err);
        setExporting(false);
        alert('导出失败，请查看控制台了解详情。\n错误: ' + (err as Error).message);
        
        // 确保即使出错也恢复原状态
        if (contentRef.current) {
          contentRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
          contentRef.current.style.transition = isDragging ? 'none' : 'transform 0.1s ease-out';
        }
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
        
        // Apply custom font if selected
        const configWithFont = actualFont ? {
          ...themeConfig.mermaidConfig,
          themeVariables: {
            ...themeConfig.mermaidConfig.themeVariables,
            fontFamily: actualFont,
          },
          themeCSS: `
            ${themeConfig.mermaidConfig.themeCSS || ''}
            /* Custom font override */
            * { 
              font-family: ${actualFont} !important; 
            }
            .node .label, .edgeLabel, .messageText, .noteText, .labelText, .loopText, 
            .actor text, .taskText, .sectionTitle, .titleText, text {
              font-family: ${actualFont} !important;
            }
          `
        } : themeConfig.mermaidConfig;

        mermaid.initialize({
            startOnLoad: false,
            suppressErrorRendering: true,
            ...configWithFont,
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
        
        // Add hand-drawn filter for handDrawn theme
        if (themeConfig.bgClass === 'bg-[#fffef9]') {
          // Inject SVG filter definition for realistic hand-drawn effect
          const filterDef = `<defs>
  <filter id="roughen" x="-25%" y="-25%" width="150%" height="150%" filterUnits="objectBoundingBox">
    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.04" numOctaves="3" result="noise" seed="2"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="2" result="noise2" seed="5"/>
    <feDisplacementMap in="displaced" in2="noise2" scale="1" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="roughen-line" x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox">
    <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="3" result="noise" seed="1"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves="2" result="noise2" seed="3"/>
    <feDisplacementMap in="displaced" in2="noise2" scale="0.8" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs>`;
          // Find existing defs or insert new one
          if (processedSvg.includes('<defs>')) {
            processedSvg = processedSvg.replace(/<defs>/, filterDef);
          } else {
            processedSvg = processedSvg.replace(/<svg[^>]*>/, match => match + filterDef);
          }
        }
        
        // Apply custom font via style injection
        let customStyles = '';
        if (actualFont) {
          customStyles += `
  text, .label, .messageText, .noteText, .labelText, .loopText, .taskText, 
  .sectionTitle, .titleText, .legendText, tspan {
    font-family: ${actualFont} !important;
  }`;
        }
        
        // Apply node colors via CSS hack
        if (Object.keys(nodeColors).length > 0) {
          for (const [domId, colors] of Object.entries(nodeColors)) {
            customStyles += `
  #${domId} rect,
  #${domId} circle,
  #${domId} polygon,
  #${domId} path:not(.arrowhead):not(.path),
  #${domId} .note,
  #${domId} .actor {
    fill: ${colors.fill} !important;
    stroke: ${colors.stroke} !important;
    stroke-width: 2px !important;
  }`;
          }
        }
        
        if (customStyles) {
          const styleTag = `<style>${customStyles}</style>`;
          // Inject style after defs or at the beginning
          if (processedSvg.includes('</defs>')) {
            processedSvg = processedSvg.replace(/<\/defs>/, `</defs>${styleTag}`);
          } else if (processedSvg.includes('<defs>')) {
            processedSvg = processedSvg.replace(/<\/defs>/, `</defs>${styleTag}`);
          } else {
            processedSvg = processedSvg.replace(/<svg[^>]*>/, match => match + styleTag);
          }
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
  }, [code, themeConfig, actualFont, nodeColors]);

  return (
    <div 
        className={`flex-1 overflow-hidden flex relative transition-colors duration-300 ${actualBg}`} 
        style={actualBgStyle}
        ref={containerRef}
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
       
       {/* 导出Loading */}
       {exporting && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30">
               <div className="bg-white rounded-lg shadow-2xl p-6 flex flex-col items-center gap-4">
                   <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
                   <div className="text-gray-700 font-medium">{t.export}...</div>
            <div className="text-gray-500 text-sm">{t.exportDesc}</div>
               </div>
           </div>
       )}
       
       {/* 缩放和移动控制按钮 */}
       <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
         <button
           onClick={handleZoomIn}
           className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-colors"
           title={t.zoomIn}
         >
           <ZoomIn size={20} className="text-gray-700" />
         </button>
         <button
           onClick={handleZoomOut}
           className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-colors"
           title={t.zoomOut}
         >
           <ZoomOut size={20} className="text-gray-700" />
         </button>
         <button
           onClick={handleResetZoom}
           className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-colors"
           title={t.resetView}
         >
           <Maximize2 size={20} className="text-gray-700" />
         </button>
         <div className="p-2 bg-white/90 rounded-lg shadow-md flex items-center justify-center" title={t.dragToMove}>
           <Move size={16} className="text-gray-500" />
         </div>
       </div>
       
       {/* 缩放级别显示 */}
       <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 rounded-lg shadow-md text-sm text-gray-700 z-20">
         {Math.round(scale * 100)}%
       </div>
       
       {/* 提示信息 */}
       <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 rounded-lg shadow-md text-xs text-gray-600 z-20">
         {t.scrollZoom} | {t.dragMove}
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
           onContextMenu={handleContextMenu}
           style={{
             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
             transformOrigin: 'center',
             transition: isDragging ? 'none' : 'transform 0.1s ease-out',
             fontFamily: actualFont || 'inherit',
           }}
           dangerouslySetInnerHTML={{ __html: svg }} 
         />
       </div>
       
       {/* 颜色选择器 */}
       {showColorPicker && (
         <ColorPicker
           position={colorPickerPos}
           nodeId={selectedNodeId}
           onClose={() => setShowColorPicker(false)}
           onSelectColor={handleApplyColor}
         />
       )}
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;
