import React, { useRef, useEffect, useState } from 'react';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  // 更新行号
  useEffect(() => {
    const lines = code.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [code]);

  // 同步滚动
  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current && lineNumberRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // 简单的 Mermaid 语法高亮
  const highlightCode = (code: string): React.ReactElement[] => {
    if (!code) return [];
    
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      const parts: React.ReactElement[] = [];
      let key = 0;

      // 注释检测
      const commentMatch = line.match(/%%.*$/);
      if (commentMatch && commentMatch.index !== undefined) {
        const beforeComment = line.substring(0, commentMatch.index);
        if (beforeComment) {
          parts.push(...highlightLineSegment(beforeComment, lineIndex, key));
          key += 100; // 跳过一些键值以避免冲突
        }
        parts.push(
          <span key={`${lineIndex}-${key++}`} className="text-gray-400 dark:text-gray-500 italic">
            {commentMatch[0]}
          </span>
        );
        return <div key={lineIndex}>{parts}</div>;
      }

      // 处理整行
      parts.push(...highlightLineSegment(line, lineIndex, key));
      return <div key={lineIndex}>{parts.length > 0 ? parts : '\u00A0'}</div>;
    });
  };

  // 辅助函数：处理一行中的高亮
  const highlightLineSegment = (text: string, lineIndex: number, startKey: number): React.ReactElement[] => {
    if (!text) return [];
    
    const parts: React.ReactElement[] = [];
    let key = startKey;
    
    // 定义所有匹配模式及其样式类
    const patterns = [
      // 字符串（方括号、圆括号、花括号、引号内的内容）- 先匹配以避免内部关键字被高亮
      { 
        regex: /(\[([^\[\]]*)\]|\(([^()]*)\)|\{([^{}]*)\}|"([^"]*)"|'([^']*)')/g,
        className: 'text-orange-600 dark:text-orange-400'
      },
      // 图表类型关键字
      { 
        regex: /\b(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|stateDiagram-v2|erDiagram|journey|gantt|pie|gitGraph|mindmap|timeline|quadrantChart|xyChart)\b/gi,
        className: 'text-purple-600 dark:text-purple-400 font-semibold'
      },
      // 方向关键字
      { 
        regex: /\b(TD|TB|BT|RL|LR)\b/g,
        className: 'text-blue-600 dark:text-blue-400 font-semibold'
      },
      // style 和其他关键字
      { 
        regex: /\b(style|class|classDef|click|subgraph|end|participant|activate|deactivate|Note|loop|alt|opt|par)\b/gi,
        className: 'text-pink-600 dark:text-pink-400 font-semibold'
      },
      // 箭头
      { 
        regex: /(-->|---|-\.->|\.-|===>|==>|->|<--|<->)/g,
        className: 'text-green-600 dark:text-green-400 font-bold'
      },
    ];
    
    // 收集所有匹配项及其位置
    interface Match {
      start: number;
      end: number;
      text: string;
      className: string;
      priority: number; // 用于处理重叠，优先级高的优先
    }
    
    const matches: Match[] = [];
    
    patterns.forEach((pattern, priority) => {
      let match;
      const regex = new RegExp(pattern.regex);
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
          className: pattern.className,
          priority
        });
      }
    });
    
    // 按位置排序，并移除重叠的匹配（优先级高的保留）
    matches.sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      if (a.end !== b.end) return b.end - a.end; // 更长的匹配优先
      return a.priority - b.priority;
    });
    
    // 移除重叠项
    const filteredMatches: Match[] = [];
    for (const match of matches) {
      const hasOverlap = filteredMatches.some(
        existing => !(match.end <= existing.start || match.start >= existing.end)
      );
      if (!hasOverlap) {
        filteredMatches.push(match);
      }
    }
    
    // 重新按位置排序
    filteredMatches.sort((a, b) => a.start - b.start);
    
    // 生成 JSX 元素
    let lastIndex = 0;
    for (const match of filteredMatches) {
      // 添加匹配前的普通文本
      if (match.start > lastIndex) {
        const plainText = text.substring(lastIndex, match.start);
        parts.push(<span key={`${lineIndex}-${key++}`}>{plainText}</span>);
      }
      
      // 添加高亮的匹配文本
      parts.push(
        <span key={`${lineIndex}-${key++}`} className={match.className}>
          {match.text}
        </span>
      );
      
      lastIndex = match.end;
    }
    
    // 添加剩余的普通文本
    if (lastIndex < text.length) {
      const plainText = text.substring(lastIndex);
      parts.push(<span key={`${lineIndex}-${key++}`}>{plainText}</span>);
    }
    
    return parts;
  };

  return (
    <div className="h-full relative flex overflow-hidden">
      {/* 行号区域 */}
      <div className="flex-shrink-0 w-12 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
        <div 
          ref={lineNumberRef}
          className="h-full py-6 px-2 text-right text-sm leading-relaxed font-mono overflow-hidden"
        >
          {lineNumbers.map((lineNum) => (
            <div 
              key={lineNum} 
              className="text-gray-400 dark:text-gray-600 select-none"
            >
              {lineNum}
            </div>
          ))}
        </div>
      </div>

      {/* 编辑区域 */}
      <div className="flex-1 relative bg-white dark:bg-gray-800 overflow-hidden">
        {/* 语法高亮层 - 在底层 */}
        <div
          ref={highlightRef}
          className="absolute inset-0 p-6 font-mono text-sm leading-relaxed overflow-auto pointer-events-none select-none text-gray-800 dark:text-gray-200"
          style={{ 
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            tabSize: 2,
            whiteSpace: 'pre-wrap'
          }}
        >
          {code ? highlightCode(code) : <div className="text-gray-400 dark:text-gray-500">Enter Mermaid code here...</div>}
        </div>

        {/* Textarea 输入层 - 在上层，透明 */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          className="absolute inset-0 w-full h-full p-6 m-0 resize-none focus:outline-none font-mono text-sm leading-relaxed bg-transparent transition-colors duration-200 overflow-auto"
          style={{
            color: 'transparent',
            caretColor: '#6366f1', // indigo-500
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            tabSize: 2,
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            outline: 'none'
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
};

export default Editor;
