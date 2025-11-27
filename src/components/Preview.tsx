import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import mermaid from 'mermaid';
import { toPng, toJpeg } from 'html-to-image';
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';
import type { ThemeConfig } from '../utils/themes';
import type { BackgroundStyle } from '../utils/backgrounds';
import type { FontOption } from '../utils/fonts';
import { useLanguage } from '../contexts/LanguageContext';
import ColorPicker from './ColorPicker';
import AnnotationLayer from './AnnotationLayer';
import type { Annotation, AnnotationType, Point } from '../types/annotation';

interface PreviewProps {
  code: string;
  themeConfig: ThemeConfig;
  customBackground?: BackgroundStyle;
  customFont?: FontOption;
  onCodeChange?: (code: string) => void;
  selectedTool: AnnotationType | 'select' | null;
  onSelectTool: (tool: AnnotationType | 'select') => void;
  onAnnotationCountChange: (count: number) => void;
}

export interface PreviewHandle {
  exportImage: (transparent: boolean) => Promise<void>;
  clearAnnotations: () => void;
}

// Initialize globally once
mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  suppressErrorRendering: true, // 隐藏错误渲染到 DOM
});

const Preview = forwardRef<PreviewHandle, PreviewProps>(({ code, themeConfig, customBackground, customFont, onCodeChange, selectedTool, onSelectTool, onAnnotationCountChange }, ref) => {
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
  
  // 标注功能状态
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<Point | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<Point | null>(null);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);
  const svgOverlayRef = useRef<SVGSVGElement>(null);

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

  // 将屏幕坐标转换为 SVG 坐标
  const screenToSVGCoords = (clientX: number, clientY: number): Point | null => {
    if (!containerRef.current) return null;

    const rect = containerRef.current.getBoundingClientRect();
    // 容器坐标
    const containerX = clientX - rect.left;
    const containerY = clientY - rect.top;

    // 转换为 SVG 坐标系（考虑平移和缩放）
    const svgX = (containerX - rect.width / 2 - position.x) / scale;
    const svgY = (containerY - rect.height / 2 - position.y) / scale;

    return { x: svgX, y: svgY };
  };

  // 标注工具 - 开始绘制
  const handleAnnotationMouseDown = (e: React.MouseEvent) => {
    if (!selectedTool || selectedTool === 'select') return;

    const coords = screenToSVGCoords(e.clientX, e.clientY);
    if (!coords) return;

    setIsDrawing(true);
    setDrawStart(coords);
    setCurrentMousePos(coords);

    // 对于文本工具，立即创建
    if (selectedTool === 'text') {
      const newAnnotation: Annotation = {
        id: `annotation-${Date.now()}`,
        type: 'text',
        position: coords,
        text: '双击编辑',
        fontSize: 16,
        fontWeight: 'normal',
        color: themeConfig.annotationColors.text,
        strokeWidth: 2
      };
      setAnnotations(prev => [...prev, newAnnotation]);
      // 创建标注后自动切换到选择模式
      onSelectTool('select');
      setIsDrawing(false);
      setDrawStart(null);
      setCurrentMousePos(null);
    }
  };

  // 标注工具 - 绘制中
  const handleAnnotationMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !drawStart) return;

    const coords = screenToSVGCoords(e.clientX, e.clientY);
    if (!coords) return;

    setCurrentMousePos(coords);
  };

  // 标注工具 - 完成绘制
  const handleAnnotationMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing || !drawStart || !selectedTool || selectedTool === 'select') {
      setIsDrawing(false);
      setDrawStart(null);
      setCurrentMousePos(null);
      return;
    }

    const coords = screenToSVGCoords(e.clientX, e.clientY);
    if (!coords) {
      setIsDrawing(false);
      setDrawStart(null);
      setCurrentMousePos(null);
      return;
    }

    const { x, y } = coords;

    // 检查是否是有效的绘制（移动了至少10像素）
    const distance = Math.sqrt((x - drawStart.x) ** 2 + (y - drawStart.y) ** 2);
    if (distance < 10 && selectedTool !== 'text') {
      setIsDrawing(false);
      setDrawStart(null);
      return;
    }

    const newAnnotation: Annotation | null = (() => {
      const baseId = `annotation-${Date.now()}`;
      const primaryColor = themeConfig.annotationColors.primary;

      // 将颜色转换为 rgba 格式用于填充
      const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      switch (selectedTool) {
        case 'arrow':
          return {
            id: baseId,
            type: 'arrow' as const,
            start: drawStart,
            end: { x, y },
            color: primaryColor,
            strokeWidth: 3
          };

        case 'line':
          return {
            id: baseId,
            type: 'line' as const,
            start: drawStart,
            end: { x, y },
            color: primaryColor,
            strokeWidth: 3
          };

        case 'rect':
          return {
            id: baseId,
            type: 'rect' as const,
            position: {
              x: Math.min(drawStart.x, x),
              y: Math.min(drawStart.y, y) 
            },
            width: Math.abs(x - drawStart.x),
            height: Math.abs(y - drawStart.y),
            color: primaryColor,
            fill: hexToRgba(primaryColor, 0.1),
            opacity: 0.8,
            strokeWidth: 2
          };

        case 'circle':
          const radius = Math.sqrt((x - drawStart.x) ** 2 + (y - drawStart.y) ** 2);
          return {
            id: baseId,
            type: 'circle' as const,
            center: drawStart,
            radius,
            color: primaryColor,
            fill: hexToRgba(primaryColor, 0.1),
            opacity: 0.8,
            strokeWidth: 2
          };

        default:
          return null;
      }
    })();

    if (newAnnotation) {
      setAnnotations(prev => [...prev, newAnnotation]);
      // 创建标注后自动切换到选择模式
      onSelectTool('select');
    }

    setIsDrawing(false);
    setDrawStart(null);
    setCurrentMousePos(null);
  };

  // 切换工具时重置绘制状态
  useEffect(() => {
    if (selectedTool === 'select' || selectedTool === null) {
      setIsDrawing(false);
      setDrawStart(null);
      setCurrentMousePos(null);
    }
  }, [selectedTool]);

  // 通知标注数量变化
  useEffect(() => {
    onAnnotationCountChange(annotations.length);
  }, [annotations.length, onAnnotationCountChange]);

  // 主题切换时更新所有标注的颜色
  useEffect(() => {
    const colors = themeConfig.annotationColors;
    setAnnotations(prev => prev.map(annotation => {
      // 根据标注类型选择合适的颜色
      let newColor = colors.primary;
      if (annotation.type === 'text') {
        newColor = colors.text;
      } else if (annotation.id.endsWith('1')) {
        // 给不同的标注一些颜色变化
        newColor = colors.secondary;
      }

      return {
        ...annotation,
        color: newColor,
      } as Annotation;
    }));
  }, [themeConfig]);

  // 更新标注
  const handleUpdateAnnotation = (id: string, updates: Partial<Annotation>) => {
    setAnnotations(prev => prev.map(a => a.id === id ? { ...a, ...updates } as Annotation : a));
  };

  // 删除标注
  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
  };

  // 拖动开始
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // 只处理左键
    if (selectedTool && selectedTool !== 'select') return; // 如果选中了绘制工具，不进行画布拖动
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
    
    // 取消标注选择（如果有）
    if (selectedAnnotationId) {
      setSelectedAnnotationId(null);
    }

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
    clearAnnotations: () => {
      setAnnotations([]);
      setSelectedAnnotationId(null);
    },
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
        
        // Apply theme-specific xychart styles
        if (themeConfig.mermaidConfig.themeCSS) {
          const themeCSS = themeConfig.mermaidConfig.themeCSS;

          // Extract all xychart-related styles
          const xychartStartIndex = themeCSS.indexOf('/* XYChart');
          if (xychartStartIndex !== -1) {
            // Find the end of xychart styles (next comment or end of string)
            let xychartEndIndex = themeCSS.indexOf('/*', xychartStartIndex + 5);
            if (xychartEndIndex === -1) {
              xychartEndIndex = themeCSS.length;
            }

            let xychartStyles = themeCSS.substring(xychartStartIndex, xychartEndIndex).trim();

            // Remove the svg[aria-roledescription="xychart"] prefix since we're injecting inside the SVG
            xychartStyles = xychartStyles.replace(/svg\[aria-roledescription="xychart"\]\s+/g, '');

            if (xychartStyles) {
              customStyles += `\n${xychartStyles}\n`;
            }
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
        <div className="absolute top-20 right-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded-md text-sm shadow-sm z-20">
               {error}
           </div>
       )}
       
       {/* 加载中 */}
       {loading && !svg && (
           <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
           </div>
       )}
       
       {/* 导出Loading */}
       {exporting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm z-30">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400"></div>
            <div className="text-gray-700 dark:text-gray-200 font-medium">{t.export}...</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{t.exportDesc}</div>
               </div>
           </div>
       )}
       
       {/* 缩放和移动控制按钮 */}
       <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
         <button
           onClick={handleZoomIn}
          className="p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-lg shadow-md transition-colors"
           title={t.zoomIn}
         >
          <ZoomIn size={20} className="text-gray-700 dark:text-gray-300" />
         </button>
         <button
           onClick={handleZoomOut}
          className="p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-lg shadow-md transition-colors"
           title={t.zoomOut}
         >
          <ZoomOut size={20} className="text-gray-700 dark:text-gray-300" />
         </button>
         <button
           onClick={handleResetZoom}
          className="p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-lg shadow-md transition-colors"
           title={t.resetView}
         >
          <Maximize2 size={20} className="text-gray-700 dark:text-gray-300" />
         </button>
        <div className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-md flex items-center justify-center" title={t.dragToMove}>
          <Move size={16} className="text-gray-500 dark:text-gray-400" />
         </div>
       </div>
       
       {/* 缩放级别显示 */}
      <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-md text-sm text-gray-700 dark:text-gray-300 z-20">
         {Math.round(scale * 100)}%
       </div>
       
       {/* 提示信息 */}
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-md text-xs text-gray-600 dark:text-gray-400 z-20">
         {t.scrollZoom} | {t.dragMove}
       </div>
       
       {/* SVG 内容容器 */}
       <div 
        className="w-full h-full flex items-center justify-center overflow-hidden relative"
         style={{
           cursor: selectedTool && selectedTool !== 'select' ? 'crosshair' : (isDragging ? 'grabbing' : 'grab'),
         }}
       >
         <div 
           ref={contentRef}
           className="p-12"
           onContextMenu={handleContextMenu}
          onClick={() => {
            // 点击 Mermaid 图表时取消标注选择
            if (selectedAnnotationId && selectedTool === 'select') {
              setSelectedAnnotationId(null);
            }
          }}
           style={{
             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
             transformOrigin: 'center',
             transition: isDragging ? 'none' : 'transform 0.1s ease-out',
             fontFamily: actualFont || 'inherit',
           }}
           dangerouslySetInnerHTML={{ __html: svg }} 
         />

        {/* 取消选择的点击层 - 只捕获左键点击 */}
        {selectedTool === 'select' && selectedAnnotationId && (
          <div
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'auto', cursor: 'default' }}
            onClick={(e) => {
              // 只处理直接点击此层的事件
              if (e.target === e.currentTarget) {
                setSelectedAnnotationId(null);
              }
            }}
            onMouseDown={(e) => {
              // 只处理左键
              if (e.button === 0 && e.target === e.currentTarget) {
                // 不阻止事件传播，让画布拖动仍然可以工作
              }
            }}
          />
        )}

        {/* 标注覆盖层 */}
        <svg
          ref={svgOverlayRef}
          className="absolute inset-0 w-full h-full"
          style={{
            cursor: selectedTool && selectedTool !== 'select' ? 'crosshair' : 'inherit',
            pointerEvents: 'none',
          }}
        >
          {/* 背景捕获层 - 只在绘制模式下捕获事件 */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="transparent"
            style={{
              pointerEvents: selectedTool && selectedTool !== 'select' ? 'auto' : 'none',
            }}
            onMouseDown={handleAnnotationMouseDown}
            onMouseMove={handleAnnotationMouseMove}
            onMouseUp={handleAnnotationMouseUp}
          />

          <g
            transform={`translate(${containerRef.current ? containerRef.current.offsetWidth / 2 : 0}, ${containerRef.current ? containerRef.current.offsetHeight / 2 : 0})`}
          >
            <g transform={`translate(${position.x}, ${position.y}) scale(${scale})`}>
              {/* 渲染已有标注 */}
              <AnnotationLayer
                annotations={annotations}
                onUpdateAnnotation={handleUpdateAnnotation}
                onDeleteAnnotation={handleDeleteAnnotation}
                selectedTool={selectedTool}
                scale={scale}
                position={position}
                selectedAnnotationId={selectedAnnotationId}
                onSelectAnnotation={setSelectedAnnotationId}
              />

              {/* 绘制中的实时预览 */}
              {isDrawing && drawStart && currentMousePos && (() => {
                const previewColor = themeConfig.annotationColors.secondary;
                const previewOpacity = 0.6;

                if (selectedTool === 'arrow') {
                  const angle = Math.atan2(currentMousePos.y - drawStart.y, currentMousePos.x - drawStart.x);
                  const arrowSize = 12;
                  return (
                    <g opacity={previewOpacity}>
                      <line
                        x1={drawStart.x}
                        y1={drawStart.y}
                        x2={currentMousePos.x}
                        y2={currentMousePos.y}
                        stroke={previewColor}
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeDasharray="5,5"
                      />
                      <polygon
                        points={`
                         ${currentMousePos.x},${currentMousePos.y}
                         ${currentMousePos.x - arrowSize * Math.cos(angle - Math.PI / 6)},${currentMousePos.y - arrowSize * Math.sin(angle - Math.PI / 6)}
                         ${currentMousePos.x - arrowSize * Math.cos(angle + Math.PI / 6)},${currentMousePos.y - arrowSize * Math.sin(angle + Math.PI / 6)}
                       `}
                        fill={previewColor}
                      />
                    </g>
                  );
                } else if (selectedTool === 'line') {
                  return (
                    <line
                      x1={drawStart.x}
                      y1={drawStart.y}
                      x2={currentMousePos.x}
                      y2={currentMousePos.y}
                      stroke={previewColor}
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeDasharray="5,5"
                      opacity={previewOpacity}
                    />
                  );
                } else if (selectedTool === 'rect') {
                  const x = Math.min(drawStart.x, currentMousePos.x);
                  const y = Math.min(drawStart.y, currentMousePos.y);
                  const width = Math.abs(currentMousePos.x - drawStart.x);
                  const height = Math.abs(currentMousePos.y - drawStart.y);

                  // 转换颜色为 rgba
                  const hex = previewColor;
                  const r = parseInt(hex.slice(1, 3), 16);
                  const g = parseInt(hex.slice(3, 5), 16);
                  const b = parseInt(hex.slice(5, 7), 16);
                  const fillColor = `rgba(${r}, ${g}, ${b}, 0.1)`;

                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={fillColor}
                      stroke={previewColor}
                      strokeWidth={2}
                      strokeDasharray="5,5"
                      rx={4}
                      opacity={previewOpacity}
                    />
                  );
                } else if (selectedTool === 'circle') {
                  const radius = Math.sqrt((currentMousePos.x - drawStart.x) ** 2 + (currentMousePos.y - drawStart.y) ** 2);

                  // 转换颜色为 rgba
                  const hex = previewColor;
                  const r = parseInt(hex.slice(1, 3), 16);
                  const g = parseInt(hex.slice(3, 5), 16);
                  const b = parseInt(hex.slice(5, 7), 16);
                  const fillColor = `rgba(${r}, ${g}, ${b}, 0.1)`;

                  return (
                    <circle
                      cx={drawStart.x}
                      cy={drawStart.y}
                      r={radius}
                      fill={fillColor}
                      stroke={previewColor}
                      strokeWidth={2}
                      strokeDasharray="5,5"
                      opacity={previewOpacity}
                    />
                  );
                }
                return null;
              })()}
            </g>
          </g>
        </svg>
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
