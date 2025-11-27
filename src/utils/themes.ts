import type { MermaidConfig } from 'mermaid';

export type ThemeType = 'linearLight' | 'linearDark' | 'notion' | 'cyberpunk' | 'monochrome' | 'ghibli' | 'softPop' | 'darkMinimal' | 'wireframe' | 'handDrawn';

export interface ThemeConfig {
  name: string;
  mermaidConfig: MermaidConfig;
  bgClass: string; 
  bgStyle?: React.CSSProperties; // For custom patterns
}

export const themes: Record<ThemeType, ThemeConfig> = {
  linearLight: {
    name: 'Linear Light',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#ffffff',
        primaryColor: '#ffffff',
        primaryTextColor: '#171717', // Neutral 900
        primaryBorderColor: '#e5e5e5', // Neutral 200
        lineColor: '#737373', // Neutral 500
        secondaryColor: '#fafafa',
        tertiaryColor: '#f5f5f5',
        fontFamily: '"Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: '14px',
      },
      themeCSS: `
        .node rect, .node circle, .node polygon, .node path { stroke-width: 1.5px; }
        .edgePath .path { stroke-width: 1.5px; }
        .cluster rect { stroke-dasharray: 4 4; stroke: #d4d4d4; fill: #fafafa; }
      `
    },
    bgClass: 'bg-white',
    bgStyle: {
        backgroundImage: 'radial-gradient(#e5e5e5 1px, transparent 1px)',
        backgroundSize: '20px 20px'
    }
  },
  linearDark: {
    name: 'Linear Dark',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        darkMode: true,
        background: '#09090b', // Zinc 950
        primaryColor: '#18181b', // Zinc 900
        primaryTextColor: '#f4f4f5', // Zinc 100
        primaryBorderColor: '#27272a', // Zinc 800
        lineColor: '#52525b', // Zinc 600
        secondaryColor: '#27272a',
        tertiaryColor: '#27272a',
        fontFamily: '"Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: '14px',
      },
      themeCSS: `
        .node rect, .node circle, .node polygon, .node path { stroke-width: 1.5px; }
        .edgePath .path { stroke-width: 1.5px; }
      `
    },
    bgClass: 'bg-[#09090b]',
    bgStyle: {
        backgroundImage: 'radial-gradient(#27272a 1px, transparent 1px)',
        backgroundSize: '20px 20px'
    }
  },
  notion: {
    name: 'Notion',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#ffffff',
        primaryColor: '#f1f5f9', // Slate 100
        primaryTextColor: '#334155', // Slate 700
        primaryBorderColor: '#cbd5e1', // Slate 300 (for sequence diagram lifelines)
        lineColor: '#94a3b8', // Slate 400
        secondaryColor: '#e2e8f0', // Slate 200
        tertiaryColor: '#cbd5e1', // Slate 300
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Helvetica, Arial, sans-serif',
        fontSize: '15px',
      },
      themeCSS: `
        /* Flowchart Node Styling */
        .node rect, .node polygon { 
            rx: 4px !important; 
            ry: 4px !important; 
        }
        .node polygon {
            stroke-width: 1px;
        }
        .node .label {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif;
        }
        /* Keep edge labels simple - don't override too much */
        .edgeLabel { 
            color: #64748b; 
            font-size: 13px;
        }
        
        /* Sequence Diagram Styling */
        /* Actor boxes - match flowchart style */
        .actor {
            fill: #f1f5f9 !important;
            stroke: #cbd5e1 !important;
            stroke-width: 1px !important;
            rx: 4px !important;
            ry: 4px !important;
        }
        .actor-line {
            stroke: #94a3b8 !important;
            stroke-width: 2px !important;
        }
        .activation0, .activation1, .activation2 {
            fill: #e2e8f0 !important;
            stroke: #94a3b8 !important;
            stroke-width: 2px !important;
        }
        /* Note boxes */
        .note {
            fill: #fef3c7 !important;
            stroke: #fbbf24 !important;
            stroke-width: 1px !important;
            rx: 4px !important;
            ry: 4px !important;
        }
        .noteText {
            fill: #78350f !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif;
        }
        /* Loop/Alt/Opt boxes */
        .labelBox {
            fill: #e2e8f0 !important;
            stroke: #cbd5e1 !important;
            stroke-width: 1px !important;
            rx: 4px !important;
            ry: 4px !important;
        }
        .labelText, .loopText {
            fill: #334155 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif;
            font-weight: 500;
        }
        .loopLine {
            stroke: #cbd5e1 !important;
            stroke-width: 1px !important;
        }
      `
    },
    bgClass: 'bg-white',
  },
  cyberpunk: {
    name: 'Cyberpunk',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        darkMode: true,
        background: '#051423', // Navy Blue
        primaryColor: '#051423', // Transparent/Bg match
        primaryTextColor: '#00f2ff', // Neon Cyan
        primaryBorderColor: '#00f2ff',
        lineColor: '#00f2ff',
        secondaryColor: '#051423',
        tertiaryColor: '#051423',
        fontFamily: '"Inter", "Noto Sans SC", system-ui, sans-serif',
        fontSize: '16px',
        mainBkg: '#051423',
        nodeBorder: '#00f2ff',
        clusterBkg: '#051423',
        clusterBorder: '#00f2ff',
        edgeLabelBackground: '#051423',
      },
      themeCSS: `
        /* Flowchart Node Styling */
        .node rect, .node circle, .node polygon, .node path {
            stroke: #00f2ff !important;
            stroke-width: 3px !important;
            fill: #051423 !important;
            rx: 10px !important;
            ry: 10px !important;
            filter: drop-shadow(0 0 8px rgba(0, 242, 255, 0.5)) drop-shadow(0 0 16px rgba(0, 242, 255, 0.3));
        }
        .edgePath .path {
            stroke: #00f2ff !important;
            stroke-width: 2px !important;
            filter: drop-shadow(0 0 6px rgba(0, 242, 255, 0.6));
        }
        .arrowheadPath {
            fill: #00f2ff !important;
            stroke: #00f2ff !important;
        }
        .edgeLabel {
            background-color: #051423 !important;
            color: #00f2ff !important;
            font-weight: 600;
            text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
        }
        .label {
            color: #00f2ff !important;
            font-weight: 600;
            text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
        }
        
        /* Sequence Diagram Styling - Match cyberpunk neon aesthetic */
        /* Actor boxes - neon cyan border with glow */
        .actor {
            fill: #051423 !important;
            stroke: #00f2ff !important;
            stroke-width: 3px !important;
            rx: 10px !important;
            ry: 10px !important;
            filter: drop-shadow(0 0 8px rgba(0, 242, 255, 0.5)) drop-shadow(0 0 16px rgba(0, 242, 255, 0.3));
        }
        .actor text {
            fill: #00f2ff !important;
            font-weight: 600;
            text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
        }
        .actor-line {
            stroke: #00f2ff !important;
            stroke-width: 2px !important;
            filter: drop-shadow(0 0 6px rgba(0, 242, 255, 0.6));
        }
        .activation0, .activation1, .activation2 {
            fill: rgba(0, 242, 255, 0.1) !important;
            stroke: #00f2ff !important;
            stroke-width: 3px !important;
        }
        /* Message lines - neon glow */
        .messageLine0, .messageLine1 {
            stroke: #00f2ff !important;
            stroke-width: 2px !important;
            filter: drop-shadow(0 0 6px rgba(0, 242, 255, 0.6));
        }
        /* Note boxes */
        .note {
            fill: #051423 !important;
            stroke: #ff00ff !important;
            stroke-width: 2px !important;
            rx: 10px !important;
            ry: 10px !important;
            filter: drop-shadow(0 0 8px rgba(255, 0, 255, 0.4));
        }
        .noteText {
            fill: #ff00ff !important;
            font-weight: 600;
            text-shadow: 0 0 8px rgba(255, 0, 255, 0.4);
        }
        /* Loop/Alt/Opt boxes */
        .labelBox {
            fill: #051423 !important;
            stroke: #00f2ff !important;
            stroke-width: 2px !important;
            rx: 10px !important;
            ry: 10px !important;
            filter: drop-shadow(0 0 6px rgba(0, 242, 255, 0.4));
        }
        .labelText, .loopText {
            fill: #00f2ff !important;
            font-weight: 600;
            text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
        }
        .loopLine {
            stroke: #00f2ff !important;
            stroke-width: 2px !important;
            filter: drop-shadow(0 0 4px rgba(0, 242, 255, 0.5));
        }
      `
    },
    bgClass: 'bg-[#051423]',
    bgStyle: {
        backgroundImage: `
            linear-gradient(rgba(0, 242, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 242, 255, 0.03) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.05), transparent 70%)
        `,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%',
        backgroundBlendMode: 'screen'
    }
  },
  monochrome: {
    name: 'Monochrome',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#ffffff',
        primaryColor: '#ffffff',
        primaryTextColor: '#000000',
        primaryBorderColor: '#000000',
        lineColor: '#000000',
        secondaryColor: '#ffffff',
        tertiaryColor: '#ffffff',
        fontFamily: '"Inter", "Noto Sans SC", sans-serif',
        mainBkg: '#ffffff',
        nodeBorder: '#000000',
        clusterBkg: '#ffffff',
        clusterBorder: '#000000',
      },
      themeCSS: `
        .node rect, .node circle { stroke-width: 2px; fill: #fff; }
        .edgePath .path { stroke-width: 2px; }
        .cluster rect { stroke-width: 2px; fill: #fff; }
        .node rect, .node circle, .node ellipse, .node polygon, .node path { stroke-width: 2px !important; }
      `
    },
    bgClass: 'bg-white',
  },
  ghibli: {
    name: 'Ghibli',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#FDF6E3', // Ghibli Cream
        primaryColor: '#ffffff',
        primaryTextColor: '#3A2E2C', // Deep Brown
        primaryBorderColor: '#D2B48C', // Tan color for borders/lifelines
        lineColor: '#3A2E2C', // Matching text color for lines
        secondaryColor: '#fff3e0', 
        tertiaryColor: '#e8f5e9',
        fontFamily: 'Open Sans, Noto Sans SC, sans-serif',
        fontSize: '16px',
        edgeLabelBackground: '#FDF6E3',
      },
      themeCSS: `
        /* Flowchart Node Styling */
        .node rect, .node circle, .node polygon {
            fill: #ffffff !important;
            stroke: none !important;
            filter: drop-shadow(0 2px 8px rgba(58, 46, 44, 0.05));
            rx: 8px !important;
            ry: 8px !important;
        }
        .node .label {
            font-weight: 600;
            fill: #3A2E2C !important;
        }
        .edgePath .path {
            stroke: #3A2E2C !important;
            stroke-width: 1.5px !important;
            opacity: 0.8;
        }
        .arrowheadPath {
            fill: #3A2E2C !important;
            stroke: #3A2E2C !important;
        }
        .edgeLabel {
            background-color: #FDF6E3 !important;
            color: #3A2E2C !important;
            font-family: "Open Sans", "Noto Sans SC", sans-serif;
        }
        /* Highlight styles using the Amber Yellow */
        .node#B rect, .node#B circle, .node#B polygon {
             fill: #FFB300 !important;
             fill-opacity: 0.1 !important;
             stroke: #FFB300 !important;
             stroke-width: 2px !important;
        }
        
        /* Sequence Diagram Styling - Match flowchart aesthetic */
        /* Actor boxes - soft white with shadow, no border like flowchart */
        .actor {
            fill: #ffffff !important;
            stroke: none !important;
            filter: drop-shadow(0 2px 8px rgba(58, 46, 44, 0.05));
            rx: 8px !important;
            ry: 8px !important;
        }
        .actor text {
            fill: #6B5B4F !important;
            font-weight: 600;
        }
        .actor-line {
            stroke: #D2B48C !important;
            stroke-width: 2px !important;
            opacity: 0.7;
        }
        .activation0, .activation1, .activation2 {
            fill: #fff3e0 !important;
            stroke: #D2B48C !important;
            stroke-width: 2px !important;
            opacity: 0.9;
        }
        /* Message lines - softer brown */
        .messageLine0, .messageLine1 {
            stroke: #B8956A !important;
            stroke-width: 1.5px !important;
            opacity: 0.75;
        }
        /* Message text - softer color */
        .messageText {
            fill: #8B7355 !important;
            font-family: "Noto Serif SC", "Noto Sans SC", serif;
            font-weight: 500;
        }
        /* Sequence diagram arrows - match message line color */
        #arrowhead path, .arrowheadPath {
            fill: #B8956A !important;
            stroke: #B8956A !important;
        }
        /* Note boxes - warm yellow tone */
        .note {
            fill: #FFF9E6 !important;
            stroke: none !important;
            filter: drop-shadow(0 2px 6px rgba(58, 46, 44, 0.04));
            rx: 8px !important;
            ry: 8px !important;
        }
        .noteText {
            fill: #8B7355 !important;
            font-family: "Noto Serif SC", "Noto Sans SC", serif;
            font-weight: 500;
        }
        /* Loop/Alt/Opt boxes */
        .labelBox {
            fill: #e8f5e9 !important;
            stroke: none !important;
            filter: drop-shadow(0 1px 4px rgba(58, 46, 44, 0.03));
            rx: 8px !important;
            ry: 8px !important;
        }
        .labelText, .loopText {
            fill: #6B5B4F !important;
            font-family: "Noto Serif SC", "Noto Sans SC", serif;
            font-weight: 600;
        }
        .loopLine {
            stroke: #D2B48C !important;
            stroke-width: 1.5px !important;
            opacity: 0.5;
        }
      `
    },
    bgClass: 'bg-[#FDF6E3]',
    bgStyle: {
        backgroundColor: '#FDF6E3',
        backgroundImage: `
            linear-gradient(45deg, rgba(210, 180, 140, 0.03) 25%, transparent 25%), 
            linear-gradient(-45deg, rgba(210, 180, 140, 0.03) 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, rgba(210, 180, 140, 0.03) 75%), 
            linear-gradient(-45deg, transparent 75%, rgba(210, 180, 140, 0.03) 75%)
        `,
        backgroundSize: '20px 20px'
    }
  },
  softPop: {
    name: 'Soft Pop',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#EFF1F5',
        primaryColor: '#73D1C8', // Teal
          primaryTextColor: '#2D3748', // Dark grey for better visibility
        primaryBorderColor: '#73D1C8', // Use teal for borders/lifelines
        secondaryColor: '#FCD34D', // Yellow
        secondaryTextColor: '#4B5563',
        tertiaryColor: '#5D6D7E', // Grey
          tertiaryTextColor: '#2D3748', // Dark grey for better visibility
        lineColor: '#566573', // Dark Grey Lines
        fontFamily: '"JetBrains Mono", "Noto Sans SC", monospace',
        fontSize: '15px',
      },
      themeCSS: `
        /* Global text styling - ensure titles and legends are dark */
        .titleText, .sectionTitle, .taskText, .taskTextOutsideRight, .taskTextOutsideLeft,
        .legendText, text.actor, .pieTitleText, text.legend, text.loopText {
            fill: #2D3748 !important;
        }

        /* Flowchart Node Styling - Increased Shadow */
        .node rect, .node circle, .node polygon {
            stroke: none !important;
            rx: 8px !important;
            ry: 8px !important;
            filter: drop-shadow(0 8px 12px rgba(0,0,0,0.12)) drop-shadow(0 2px 4px rgba(0,0,0,0.08));
        }

        .node .label {
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
            font-weight: 500;
        }

        .edgePath .path {
            stroke: #566573 !important;
            stroke-width: 3px !important;
            stroke-dasharray: 8 5;
            stroke-linecap: round;
        }
        .arrowheadPath {
            fill: #566573 !important;
            stroke: #566573 !important;
        }
        
        /* Keep edge labels simple - minimal styling */
        .edgeLabel {
            color: #566573 !important;
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
            font-size: 13px;
            font-weight: 500;
        }

        /* Color Hierarchy Logic for Flowchart */
        /* Default (Process/Rect) - Teal */
        .node rect { fill: #73D1C8 !important; }
        .node rect + .label { fill: #ffffff !important; }

        /* Decision (Diamond/Polygon) - Yellow */
        .node polygon { fill: #FCD34D !important; }
        .node polygon + .label { fill: #4B5563 !important; } 
        
        /* Circle (Start/End/Point) - Grey */
        .node circle { fill: #5D6D7E !important; }
        .node circle + .label { fill: #ffffff !important; }

        /* Sequence Diagram Styling - Match flowchart aesthetic */
        /* Actor boxes - Teal like flowchart rect nodes */
        .actor {
            fill: #73D1C8 !important;
            stroke: none !important;
            filter: drop-shadow(0 8px 12px rgba(0,0,0,0.12)) drop-shadow(0 2px 4px rgba(0,0,0,0.08));
            rx: 8px !important;
            ry: 8px !important;
        }
        .actor text {
            fill: #ffffff !important;
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
            font-weight: 500;
        }
        .actor-line {
            stroke: #566573 !important;
            stroke-width: 3px !important;
            stroke-dasharray: 8 5 !important;
            stroke-linecap: round;
        }
        .activation0, .activation1, .activation2 {
            fill: rgba(115, 209, 200, 0.3) !important;
            stroke: #73D1C8 !important;
            stroke-width: 3px !important;
        }
        /* Message lines - dark grey, visible */
        .messageLine0, .messageLine1 {
            stroke: #566573 !important;
            stroke-width: 3px !important;
            stroke-dasharray: 8 5;
            stroke-linecap: round;
        }
        /* Message text - dark grey */
        .messageText {
            fill: #566573 !important;
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
            font-weight: 500;
        }
        /* Sequence diagram arrows - match message line color */
        #arrowhead path, .arrowheadPath {
            fill: #566573 !important;
            stroke: #566573 !important;
        }
        /* Note boxes - Yellow like decision nodes */
        .note {
            fill: #FCD34D !important;
            stroke: none !important;
            filter: drop-shadow(0 6px 10px rgba(0,0,0,0.10)) drop-shadow(0 2px 3px rgba(0,0,0,0.06));
            rx: 8px !important;
            ry: 8px !important;
        }
        .noteText {
            fill: #4B5563 !important;
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
            font-weight: 500;
        }
        /* Loop/Alt/Opt boxes - Grey */
        .labelBox {
            fill: #5D6D7E !important;
            stroke: none !important;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08));
            rx: 8px !important;
            ry: 8px !important;
        }
        .labelText, .loopText {
            fill: #ffffff !important;
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
            font-weight: 500;
        }
        .loopLine {
            stroke: #566573 !important;
            stroke-width: 3px !important;
            stroke-dasharray: 8 5;
            stroke-linecap: round;
        }

        /* Ensure all diagram types have dark text for titles and legends */
        /* Gantt chart */
        .grid .tick text {
            fill: #2D3748 !important;
        }
        /* Pie chart */
        .slice text {
            fill: #2D3748 !important;
        }
        /* Git graph */
        .commit-label {
            fill: #2D3748 !important;
        }
        /* ER Diagram */
        .er.entityLabel, .er.relationshipLabel {
            fill: #2D3748 !important;
        }
        /* State Diagram */
        .stateLabel .label-text {
            fill: #2D3748 !important;
        }
        /* Class Diagram */
        .classLabel .label {
            fill: #2D3748 !important;
        }
      `
    },
    bgClass: 'bg-[#EFF1F5]',
  },
  darkMinimal: {
    name: 'Dark Minimal',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        darkMode: true,
        background: '#1a1a1a', // Dark grey bg
        primaryColor: '#1a1a1a', // Match background for transparent look
        primaryTextColor: '#e5e5e5', // Light grey text
        primaryBorderColor: '#404040', // Subtle border
        lineColor: '#ffffff', // White lines
        secondaryColor: '#1a1a1a',
        tertiaryColor: '#1a1a1a',
        fontFamily: '"Inter", "Noto Sans SC", system-ui, sans-serif',
        fontSize: '15px',
      },
      themeCSS: `
        /* Minimal node styling with subtle borders */
        .node rect, .node circle, .node polygon {
            fill: #1a1a1a !important;
            stroke: #404040 !important;
            stroke-width: 1px !important;
            rx: 4px !important;
            ry: 4px !important;
        }

        .node .label {
            font-family: "Inter", "Noto Sans SC", system-ui, sans-serif;
            font-weight: 400;
            fill: #e5e5e5 !important;
        }

        /* Dotted lines for connections - White and thicker */
        .edgePath .path {
            stroke: #ffffff !important;
            stroke-width: 3px !important;
            stroke-dasharray: 10 8 !important;
            stroke-linecap: butt !important;
        }
        
        .arrowheadPath {
            fill: #ffffff !important;
            stroke: #ffffff !important;
        }
        
        .edgeLabel {
            color: #e5e5e5 !important;
            font-family: "Inter", "Noto Sans SC", system-ui, sans-serif;
            font-size: 13px;
            font-weight: 400;
        }
      `
    },
    bgClass: 'bg-[#1a1a1a]',
  },
  wireframe: {
    name: 'Wireframe',
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#f5f5f5', // Light grey background
        primaryColor: '#ffffff', // White for nodes
        primaryTextColor: '#333333', // Dark grey text
        primaryBorderColor: '#999999', // Medium grey borders
        lineColor: '#666666', // Dark grey lines
        secondaryColor: '#e8e8e8', // Light grey secondary
        tertiaryColor: '#d4d4d4', // Medium grey tertiary
        fontFamily: '"Helvetica Neue", "Noto Sans SC", Arial, sans-serif',
        fontSize: '14px',
      },
      themeCSS: `
        /* Wireframe/Blueprint style - Clean rectangular boxes */
        .node rect, .node polygon {
            fill: #ffffff !important;
            stroke: #999999 !important;
            stroke-width: 2px !important;
            rx: 2px !important;
            ry: 2px !important;
        }
        
        .node circle {
            fill: #ffffff !important;
            stroke: #999999 !important;
            stroke-width: 2px !important;
        }

        .node .label {
            font-family: "Helvetica Neue", "Noto Sans SC", Arial, sans-serif;
            font-weight: 400;
            fill: #333333 !important;
        }

        /* Simple straight lines for connections */
        .edgePath .path {
            stroke: #666666 !important;
            stroke-width: 2px !important;
        }
        
        .arrowheadPath {
            fill: #666666 !important;
            stroke: #666666 !important;
        }
        
        .edgeLabel {
            background-color: #f5f5f5 !important;
            color: #333333 !important;
            font-family: "Helvetica Neue", "Noto Sans SC", Arial, sans-serif;
            font-size: 13px;
            font-weight: 400;
        }
        
        /* Sequence Diagram Styling */
        .actor {
            fill: #e8e8e8 !important;
            stroke: #999999 !important;
            stroke-width: 2px !important;
            rx: 2px !important;
            ry: 2px !important;
        }
        
        .actor text {
            fill: #333333 !important;
            font-weight: 500;
        }
        
        .actor-line {
            stroke: #999999 !important;
            stroke-width: 1.5px !important;
            stroke-dasharray: 5 5 !important;
        }
        
        .activation0, .activation1, .activation2 {
            fill: #ffffff !important;
            stroke: #999999 !important;
            stroke-width: 2px !important;
        }
        
        .messageLine0, .messageLine1 {
            stroke: #666666 !important;
            stroke-width: 2px !important;
        }
        
        .messageText {
            fill: #333333 !important;
            font-family: "Helvetica Neue", "Noto Sans SC", Arial, sans-serif;
        }
        
        #arrowhead path, .arrowheadPath {
            fill: #666666 !important;
            stroke: #666666 !important;
        }
        
        /* Note boxes */
        .note {
            fill: #ffffff !important;
            stroke: #999999 !important;
            stroke-width: 2px !important;
            rx: 2px !important;
            ry: 2px !important;
        }
        
        .noteText {
            fill: #333333 !important;
            font-family: "Helvetica Neue", "Noto Sans SC", Arial, sans-serif;
        }
        
        /* Loop/Alt/Opt boxes */
        .labelBox {
            fill: #e8e8e8 !important;
            stroke: #999999 !important;
            stroke-width: 2px !important;
            rx: 2px !important;
            ry: 2px !important;
        }
        
        .labelText, .loopText {
            fill: #333333 !important;
            font-family: "Helvetica Neue", "Noto Sans SC", Arial, sans-serif;
            font-weight: 500;
        }
        
        .loopLine {
            stroke: #999999 !important;
            stroke-width: 2px !important;
        }
        
        /* Cluster styling */
        .cluster rect {
            fill: #fafafa !important;
            stroke: #999999 !important;
            stroke-width: 2px !important;
            stroke-dasharray: 8 4 !important;
            rx: 2px !important;
            ry: 2px !important;
        }
      `
    },
    bgClass: 'bg-[#f5f5f5]',
    bgStyle: {
        backgroundImage: `
            linear-gradient(#d4d4d4 1px, transparent 1px),
            linear-gradient(90deg, #d4d4d4 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
    }
  },
    handDrawn: {
        name: 'Hand Drawn',
        mermaidConfig: {
            theme: 'base',
            themeVariables: {
                background: '#fffef9', // Warm off-white, like paper
                primaryColor: '#ffffff',
                primaryTextColor: '#1a1a1a',
                primaryBorderColor: '#1a1a1a',
                lineColor: '#1a1a1a',
                secondaryColor: '#fff9e6',
                tertiaryColor: '#ffe8cc',
                fontFamily: '"Caveat", "Patrick Hand", "Kalam", cursive',
                fontSize: '18px', // Larger for hand-drawn feel
            },
            themeCSS: `
        /* Hand-drawn sketch style */
        /* Global text styling */
        .titleText, .sectionTitle, .taskText, .taskTextOutsideRight, .taskTextOutsideLeft, 
        .legendText, text.actor, .pieTitleText, text.legend {
            fill: #1a1a1a !important;
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 600;
        }
        
        /* Flowchart nodes - rough hand-drawn style */
        .node rect, .node circle, .node polygon {
            fill: #ffffff !important;
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            rx: 8px !important;
            ry: 8px !important;
            /* Simulate hand-drawn with slight irregularity */
            filter: url(#roughen) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
        }
        
        .node .label {
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 600;
            font-size: 18px;
            fill: #1a1a1a !important;
        }
        
        /* Hand-drawn lines for connections */
        .edgePath .path {
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none !important;
            filter: url(#roughen-line);
        }
        
        .arrowheadPath {
            fill: #1a1a1a !important;
            stroke: #1a1a1a !important;
            stroke-width: 2px !important;
        }
        
        .edgeLabel {
            background-color: #fffef9 !important;
            color: #1a1a1a !important;
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-size: 16px;
            font-weight: 600;
            padding: 4px 8px;
        }
        
        /* Sequence Diagram - Hand-drawn style */
        .actor {
            fill: #ffffff !important;
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            rx: 8px !important;
            ry: 8px !important;
            filter: url(#roughen) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
        }
        
        .actor text {
            fill: #1a1a1a !important;
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 600;
            font-size: 18px;
        }
        
        .actor-line {
            stroke: #1a1a1a !important;
            stroke-width: 2.5px !important;
            stroke-dasharray: 8 4 !important;
            stroke-linecap: round;
            filter: url(#roughen-line);
        }
        
        .activation0, .activation1, .activation2 {
            fill: #fff9e6 !important;
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            filter: url(#roughen);
        }
        
        .messageLine0, .messageLine1 {
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            stroke-linecap: round;
            filter: url(#roughen-line);
        }
        
        .messageText {
            fill: #1a1a1a !important;
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 600;
            font-size: 16px;
        }
        
        #arrowhead path, .arrowheadPath {
            fill: #1a1a1a !important;
            stroke: #1a1a1a !important;
        }
        
        /* Note boxes - sketchy style */
        .note {
            fill: #fffacd !important;
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            rx: 8px !important;
            ry: 8px !important;
            filter: url(#roughen) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
        }
        
        .noteText {
            fill: #1a1a1a !important;
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 600;
            font-size: 16px;
        }
        
        /* Loop/Alt/Opt boxes */
        .labelBox {
            fill: #ffe8cc !important;
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            rx: 8px !important;
            ry: 8px !important;
            filter: url(#roughen) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
        }
        
        .labelText, .loopText {
            fill: #1a1a1a !important;
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 700;
            font-size: 16px;
        }
        
        .loopLine {
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            stroke-dasharray: 8 4 !important;
            stroke-linecap: round;
            filter: url(#roughen-line);
        }
        
        /* Class diagram */
        .classLabel .label {
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* State diagram */
        .stateLabel .label-text {
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* ER Diagram */
        .er.entityLabel, .er.relationshipLabel {
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* Gantt chart */
        .grid .tick text {
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 600;
            fill: #1a1a1a !important;
        }
        
        /* Pie chart */
        .slice text {
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* Git graph */
        .commit-label {
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 600;
            fill: #1a1a1a !important;
        }
        
        /* Cluster/subgraph styling */
        .cluster rect {
            fill: #fff9e6 !important;
            stroke: #1a1a1a !important;
            stroke-width: 2.8px !important;
            stroke-dasharray: 8 4 !important;
            rx: 8px !important;
            ry: 8px !important;
            filter: url(#roughen) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
        }
        
        .cluster text {
            font-family: "Caveat", "Patrick Hand", "Kalam", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
      `
        },
        bgClass: 'bg-[#fffef9]',
        bgStyle: {
            backgroundColor: '#fffef9',
            backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(26, 26, 26, 0.03) 1px, transparent 1px)
        `,
            backgroundSize: '30px 30px'
        }
    },
};
