import type { MermaidConfig } from 'mermaid';

export type ThemeType = 'linearLight' | 'linearDark' | 'notion' | 'cyberpunk' | 'monochrome' | 'ghibli' | 'softPop' | 'darkMinimal' | 'wireframe' | 'handDrawn' | 'grafana';

export interface ThemeConfig {
  name: string;
  mermaidConfig: MermaidConfig;
  bgClass: string; 
  bgStyle?: React.CSSProperties; // For custom patterns
    annotationColors: {
        primary: string;
        secondary: string;
        text: string;
    };
}

export const themes: Record<ThemeType, ThemeConfig> = {
  linearLight: {
    name: 'Linear Light',
        annotationColors: {
            primary: '#a0a3a6',
            secondary: '#9e9e9e',
            text: '#454545',
        },
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
        
        /* XYChart styles - Sophisticated muted tones */
        .line-plot-0 path { stroke: #5B7C99 !important; stroke-width: 3px !important; } /* Muted slate blue */
        .line-plot-1 path { stroke: #6B9080 !important; stroke-width: 3px !important; } /* Sage green */
        .line-plot-2 path { stroke: #C17C74 !important; stroke-width: 3px !important; } /* Dusty rose */
        .bar-plot-0 rect { fill: #A8C5DD !important; stroke: #5B7C99 !important; stroke-width: 1.5px !important; }
        .bar-plot-1 rect { fill: #B8CEC2 !important; stroke: #6B9080 !important; stroke-width: 1.5px !important; }
        .bar-plot-2 rect { fill: #E0BAB5 !important; stroke: #C17C74 !important; stroke-width: 1.5px !important; }
        .chart-title text { fill: #171717 !important; font-weight: 600 !important; font-size: 20px !important; }
        .left-axis .label text, .bottom-axis .label text { fill: #171717 !important; font-size: 14px !important; }
        .left-axis .title text { fill: #525252 !important; font-size: 16px !important; }
        .bottom-axis .title text { fill: #525252 !important; font-size: 16px !important; }
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
      annotationColors: {
          primary: '#c7c7c7', // Indigo 400
          secondary: '#c9c9c9', // Indigo 300
          text: '#d4d4d4', // Indigo 100
      },
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
        
        /* XYChart styles - Elegant dark theme palette */
        .line-plot-0 path { stroke: #7B9BAE !important; stroke-width: 3px !important; } /* Cool steel blue */
        .line-plot-1 path { stroke: #8EAFA8 !important; stroke-width: 3px !important; } /* Misty teal */
        .line-plot-2 path { stroke: #D4A5A5 !important; stroke-width: 3px !important; } /* Muted mauve */
        .bar-plot-0 rect { fill: rgba(123, 155, 174, 0.3) !important; stroke: #7B9BAE !important; stroke-width: 1.5px !important; }
        .bar-plot-1 rect { fill: rgba(142, 175, 168, 0.3) !important; stroke: #8EAFA8 !important; stroke-width: 1.5px !important; }
        .bar-plot-2 rect { fill: rgba(212, 165, 165, 0.3) !important; stroke: #D4A5A5 !important; stroke-width: 1.5px !important; }
        .chart-title text { fill: #f4f4f5 !important; font-weight: 600 !important; font-size: 20px !important; }
        .left-axis .label text, .bottom-axis .label text { fill: #d4d4d8 !important; font-size: 14px !important; }
        .left-axis .title text { fill: #a1a1aa !important; font-size: 16px !important; }
        .bottom-axis .title text { fill: #a1a1aa !important; font-size: 16px !important; }
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
      annotationColors: {
          primary: '#6B8CAE', // Notion blue
          secondary: '#73A78D', // Notion green
          text: '#334155', // Slate 700
      },
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
        
        /* XYChart styles - Notion soft professional palette */
        .line-plot-0 path { stroke: #6B8CAE !important; stroke-width: 3px !important; }
        .line-plot-1 path { stroke: #73A78D !important; stroke-width: 3px !important; }
        .line-plot-2 path { stroke: #CB9B7A !important; stroke-width: 3px !important; }
        .bar-plot-0 rect { fill: #D4E1EE !important; stroke: #6B8CAE !important; stroke-width: 1.5px !important; rx: 4px !important; }
        .bar-plot-1 rect { fill: #D5E8DC !important; stroke: #73A78D !important; stroke-width: 1.5px !important; rx: 4px !important; }
        .bar-plot-2 rect { fill: #F0E0D6 !important; stroke: #CB9B7A !important; stroke-width: 1.5px !important; rx: 4px !important; }
        .ticks path { stroke: #e2e8f0 !important; }
        .left-axis .label text, .bottom-axis .label text { fill: #475569 !important; font-size: 14px !important; }
        .chart-title text { fill: #334155 !important; font-weight: 600 !important; font-size: 20px !important; }
        .left-axis .title text, .bottom-axis .title text { fill: #64748b !important; font-size: 16px !important; }
        .legend text { fill: #475569 !important; font-size: 14px !important; }
      `
    },
    bgClass: 'bg-white',
  },
  cyberpunk: {
    name: 'Cyberpunk',
      annotationColors: {
          primary: '#00f2ff', // Neon Cyan
          secondary: '#ff00ff', // Neon Magenta
          text: '#00f2ff', // Neon Cyan
      },
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
        
        /* XYChart styles - Refined neon mystique */
        .line-plot-0 path {
            stroke: #6CC6CB !important;
            stroke-width: 3px !important; 
            filter: drop-shadow(0 0 6px rgba(108, 198, 203, 0.5));
        }
        .line-plot-1 path {
            stroke: #C77DFF !important;
            stroke-width: 3px !important; 
            filter: drop-shadow(0 0 6px rgba(199, 125, 255, 0.5));
        }
        .line-plot-2 path {
            stroke: #7CE38B !important;
            stroke-width: 3px !important; 
            filter: drop-shadow(0 0 6px rgba(124, 227, 139, 0.5));
        }
        .bar-plot-0 rect {
            fill: rgba(108, 198, 203, 0.2) !important;
            stroke: #6CC6CB !important;
            stroke-width: 2px !important;
            filter: drop-shadow(0 0 8px rgba(108, 198, 203, 0.4));
        }
        .bar-plot-1 rect {
            fill: rgba(199, 125, 255, 0.2) !important;
            stroke: #C77DFF !important;
            stroke-width: 2px !important;
            filter: drop-shadow(0 0 8px rgba(199, 125, 255, 0.4));
        }
        .bar-plot-2 rect {
            fill: rgba(124, 227, 139, 0.2) !important;
            stroke: #7CE38B !important;
            stroke-width: 2px !important;
            filter: drop-shadow(0 0 8px rgba(124, 227, 139, 0.4));
        }
        .ticks path { stroke: #00f2ff !important; opacity: 0.3; }
        .chart-title text {
            fill: #00f2ff !important; 
            font-weight: 700 !important;
            font-size: 18px !important;
            text-shadow: 0 0 15px rgba(0, 242, 255, 0.8);
        }
        .left-axis .title text, .bottom-axis .title text {
            fill: #00f2ff !important; 
            font-size: 13px !important;
            text-shadow: 0 0 10px rgba(0, 242, 255, 0.6);
        }
        .legend text {
            fill: #00f2ff !important; 
            font-size: 12px !important;
            text-shadow: 0 0 8px rgba(0, 242, 255, 0.5);
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
      annotationColors: {
          primary: '#000000', // Black
          secondary: '#606060', // Dark gray
          text: '#000000', // Black
      },
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
        
        /* XYChart styles - Elegant grayscale hierarchy */
        .line-plot-0 path { stroke: #2C2C2C !important; stroke-width: 3px !important; }
        .line-plot-1 path { stroke: #606060 !important; stroke-width: 3px !important; stroke-dasharray: 8 4 !important; }
        .line-plot-2 path { stroke: #8C8C8C !important; stroke-width: 3px !important; stroke-dasharray: 4 4 !important; }
        .bar-plot-0 rect { fill: #2C2C2C !important; stroke: #1A1A1A !important; stroke-width: 2px !important; }
        .bar-plot-1 rect { fill: #606060 !important; stroke: #404040 !important; stroke-width: 2px !important; }
        .bar-plot-2 rect { fill: #8C8C8C !important; stroke: #707070 !important; stroke-width: 2px !important; }
        .ticks path { stroke: #d4d4d4 !important; }
        .chart-title text { fill: #000000 !important; font-weight: 700 !important; font-size: 16px !important; }
        .left-axis .title text, .bottom-axis .title text { fill: #525252 !important; font-size: 13px !important; }
        .legend text { fill: #000000 !important; font-size: 12px !important; }
      `
    },
    bgClass: 'bg-white',
  },
  ghibli: {
    name: 'Ghibli',
      annotationColors: {
          primary: '#D4A373', // Warm brown
          secondary: '#FFB300', // Amber yellow
          text: '#6B5B4F', // Deep brown
      },
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
            font-family: "Open Sans", "Noto Sans SC", sans-serif;
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
            font-family: "Open Sans", "Noto Sans SC", sans-serif;
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
            font-family: "Open Sans", "Noto Sans SC", sans-serif;
            font-weight: 600;
        }
        .loopLine {
            stroke: #D2B48C !important;
            stroke-width: 1.5px !important;
            opacity: 0.5;
        }
        
        /* XYChart styles - Warm earth tones */
        .line-plot-0 path {
            stroke: #B8926A !important;
            stroke-width: 3px !important;
        }
        .line-plot-1 path {
            stroke: #7FA882 !important;
            stroke-width: 3px !important;
        }
        .line-plot-2 path {
            stroke: #D4A373 !important;
            stroke-width: 3px !important;
        }
        .bar-plot-0 rect {
            fill: #E6D5C3 !important;
            stroke: #B8926A !important;
            stroke-width: 1.5px !important;
            rx: 6px !important;
            filter: drop-shadow(0 2px 6px rgba(58, 46, 44, 0.12));
        }
        .bar-plot-1 rect {
            fill: #C8DFC8 !important;
            stroke: #7FA882 !important;
            stroke-width: 1.5px !important;
            rx: 6px !important;
            filter: drop-shadow(0 2px 6px rgba(58, 46, 44, 0.12));
        }
        .bar-plot-2 rect {
            fill: #F0DCC4 !important;
            stroke: #D4A373 !important;
            stroke-width: 1.5px !important;
            rx: 6px !important;
            filter: drop-shadow(0 2px 6px rgba(58, 46, 44, 0.12));
        }
        .ticks path { stroke: #E8D5C4 !important; }
        .chart-title text {
            fill: #3A2E2C !important; 
            font-weight: 600 !important;
            font-size: 16px !important;
            font-family: "Open Sans", "Noto Sans SC", sans-serif;
        }
        .left-axis .title text, .bottom-axis .title text { fill: #6B5B4F !important; font-size: 13px !important; }
        .legend text { fill: #6B5B4F !important; font-size: 12px !important; }
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
      annotationColors: {
          primary: '#73D1C8', // Teal
          secondary: '#FCD34D', // Yellow
          text: '#2D3748', // Dark grey
      },
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
        
        /* XYChart styles - Playful pastels */
        .line-plot-0 path {
            stroke: #8FA5C1 !important;
            stroke-width: 3px !important;
        }
        .line-plot-1 path {
            stroke: #D39BAF !important;
            stroke-width: 3px !important;
        }
        .line-plot-2 path {
            stroke: #C9A96E !important;
            stroke-width: 3px !important;
        }
        .bar-plot-0 rect {
            fill: #D9E4F2 !important;
            stroke: #8FA5C1 !important;
            stroke-width: 2px !important;
            rx: 8px !important;
            filter: drop-shadow(0 8px 12px rgba(143, 165, 193, 0.25));
        }
        .bar-plot-1 rect {
            fill: #F5DEE8 !important;
            stroke: #D39BAF !important;
            stroke-width: 2px !important;
            rx: 8px !important;
            filter: drop-shadow(0 8px 12px rgba(211, 155, 175, 0.25));
        }
        .bar-plot-2 rect {
            fill: #F0E7D5 !important;
            stroke: #C9A96E !important;
            stroke-width: 2px !important;
            rx: 8px !important;
            filter: drop-shadow(0 8px 12px rgba(201, 169, 110, 0.25));
        }
        .ticks path { stroke: #CBD5E1 !important; }
        .chart-title text {
            fill: #2D3748 !important; 
            font-weight: 700 !important;
            font-size: 16px !important;
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
        }
        .left-axis .title text, .bottom-axis .title text {
            fill: #566573 !important; 
            font-size: 13px !important;
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
        }
        .legend text {
            fill: #2D3748 !important; 
            font-size: 12px !important;
            font-family: "JetBrains Mono", "Noto Sans SC", monospace;
        }
      `
    },
    bgClass: 'bg-[#EFF1F5]',
  },
  darkMinimal: {
    name: 'Dark Minimal',
      annotationColors: {
          primary: '#ffffff', // White
          secondary: '#9BA5B0', // Light gray
          text: '#e5e5e5', // Light grey
      },
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
        
        /* XYChart styles - Understated elegance */
        .line-plot-0 path {
            stroke: #9BA5B0 !important;
            stroke-width: 3px !important;
        }
        .line-plot-1 path {
            stroke: #A69D93 !important;
            stroke-width: 3px !important;
            stroke-dasharray: 8 4 !important;
        }
        .line-plot-2 path {
            stroke: #B39D9D !important;
            stroke-width: 3px !important;
            stroke-dasharray: 4 4 !important;
        }
        .bar-plot-0 rect {
            fill: rgba(155, 165, 176, 0.25) !important;
            stroke: #9BA5B0 !important;
            stroke-width: 2px !important;
        }
        .bar-plot-1 rect {
            fill: rgba(166, 157, 147, 0.25) !important;
            stroke: #A69D93 !important;
            stroke-width: 2px !important;
        }
        .bar-plot-2 rect {
            fill: rgba(179, 157, 157, 0.25) !important;
            stroke: #B39D9D !important;
            stroke-width: 2px !important;
        }
        .ticks path { stroke: #404040 !important; }
        .chart-title text {
            fill: #ffffff !important; 
            font-weight: 400 !important;
            font-size: 16px !important;
            font-family: "Inter", "Noto Sans SC", system-ui, sans-serif;
        }
        .left-axis .title text, .bottom-axis .title text { fill: #a3a3a3 !important; font-size: 13px !important; }
        .legend text { fill: #e5e5e5 !important; font-size: 12px !important; }
      `
    },
    bgClass: 'bg-[#1a1a1a]',
  },
  wireframe: {
    name: 'Wireframe',
      annotationColors: {
          primary: '#666666', // Dark grey
          secondary: '#999999', // Medium grey
          text: '#333333', // Very dark grey
      },
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
        
        /* XYChart styles - Technical blueprint */
        .line-plot-0 path {
            stroke: #4A5568 !important;
            stroke-width: 3px !important;
        }
        .line-plot-1 path {
            stroke: #718096 !important;
            stroke-width: 3px !important;
            stroke-dasharray: 8 4 !important;
        }
        .line-plot-2 path {
            stroke: #A0AEC0 !important;
            stroke-width: 3px !important;
            stroke-dasharray: 4 4 !important;
        }
        .bar-plot-0 rect {
            fill: #EDF2F7 !important;
            stroke: #4A5568 !important;
            stroke-width: 2px !important;
            rx: 2px !important;
        }
        .bar-plot-1 rect {
            fill: #E2E8F0 !important;
            stroke: #718096 !important;
            stroke-width: 2px !important;
            rx: 2px !important;
        }
        .bar-plot-2 rect {
            fill: #CBD5E0 !important;
            stroke: #A0AEC0 !important;
            stroke-width: 2px !important;
            rx: 2px !important;
        }
        .ticks path { stroke: #999999 !important; stroke-dasharray: 4 2 !important; }
        .chart-title text {
            fill: #333333 !important; 
            font-weight: 500 !important;
            font-size: 16px !important;
            font-family: "Helvetica Neue", "Noto Sans SC", Arial, sans-serif;
        }
        .left-axis .title text, .bottom-axis .title text { fill: #666666 !important; font-size: 13px !important; }
        .legend text { fill: #333333 !important; font-size: 12px !important; }
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
        annotationColors: {
            primary: '#5D6D7E', // Ink gray-blue
            secondary: '#7E6B5D', // Ink brown
            text: '#1a1a1a', // Dark ink
        },
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
                fontFamily: '"Excalifont", "Xiaolai", cursive',
                fontSize: '18px', // Optimized for hand-drawn feel
            },
            themeCSS: `
        /* Hand-drawn sketch style */
        /* Global text styling */
        .titleText, .sectionTitle, .taskText, .taskTextOutsideRight, .taskTextOutsideLeft, 
        .legendText, text.actor, .pieTitleText, text.legend {
            fill: #1a1a1a !important;
            font-family: "Excalifont", "Xiaolai", cursive;
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
            font-family: "Excalifont", "Xiaolai", cursive;
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
            font-family: "Excalifont", "Xiaolai", cursive;
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
            font-family: "Excalifont", "Xiaolai", cursive;
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
            font-family: "Excalifont", "Xiaolai", cursive;
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
            font-family: "Excalifont", "Xiaolai", cursive;
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
            font-family: "Excalifont", "Xiaolai", cursive;
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
            font-family: "Excalifont", "Xiaolai", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* State diagram */
        .stateLabel .label-text {
            font-family: "Excalifont", "Xiaolai", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* ER Diagram */
        .er.entityLabel, .er.relationshipLabel {
            font-family: "Excalifont", "Xiaolai", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* Gantt chart */
        .grid .tick text {
            font-family: "Excalifont", "Xiaolai", cursive;
            font-weight: 600;
            fill: #1a1a1a !important;
        }
        
        /* Pie chart */
        .slice text {
            font-family: "Excalifont", "Xiaolai", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* Git graph */
        .commit-label {
            font-family: "Excalifont", "Xiaolai", cursive;
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
            font-family: "Excalifont", "Xiaolai", cursive;
            font-weight: 700;
            fill: #1a1a1a !important;
        }
        
        /* XYChart styles - Natural ink palette */
        .line-plot-0 path {
            stroke: #5D6D7E !important;
            stroke-width: 3px !important;
            stroke-linecap: round;
            stroke-linejoin: round;
            filter: url(#roughen-line) drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1));
        }
        .line-plot-1 path {
            stroke: #7E6B5D !important;
            stroke-width: 3px !important;
            stroke-linecap: round;
            stroke-linejoin: round;
            filter: url(#roughen-line) drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1));
        }
        .line-plot-2 path {
            stroke: #6B7E5D !important;
            stroke-width: 3px !important;
            stroke-linecap: round;
            stroke-linejoin: round;
            filter: url(#roughen-line) drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1));
        }
        .bar-plot-0 rect {
            fill: #E8EBF0 !important;
            stroke: #5D6D7E !important;
            stroke-width: 2.8px !important;
            rx: 4px !important;
            filter: url(#roughen) drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.15));
        }
        .bar-plot-1 rect {
            fill: #F0EBE8 !important;
            stroke: #7E6B5D !important;
            stroke-width: 2.8px !important;
            rx: 4px !important;
            filter: url(#roughen) drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.15));
        }
        .bar-plot-2 rect {
            fill: #EBF0E8 !important;
            stroke: #6B7E5D !important;
            stroke-width: 2.8px !important;
            rx: 4px !important;
            filter: url(#roughen) drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.15));
        }
        .ticks path {
            stroke: #1a1a1a !important; 
            stroke-width: 1.5px !important;
            opacity: 0.4;
        }
        .chart-title text {
            fill: #1a1a1a !important; 
            font-weight: 700 !important;
            font-size: 20px !important;
            font-family: "Excalifont", "Xiaolai", cursive;
        }
        .left-axis .title text, .bottom-axis .title text {
            fill: #1a1a1a !important; 
            font-size: 16px !important;
            font-family: "Excalifont", "Xiaolai", cursive;
            font-weight: 600;
        }
        .legend text {
            fill: #1a1a1a !important; 
            font-size: 14px !important;
            font-family: "Excalifont", "Xiaolai", cursive;
            font-weight: 600;
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
    grafana: {
        name: 'Grafana',
      annotationColors: {
          primary: '#5794F2', // Grafana blue
          secondary: '#FF9830', // Grafana orange
          text: '#D8D9DA', // Light grey
      },
      mermaidConfig: {
            theme: 'base',
            themeVariables: {
                darkMode: true,
                background: '#181B1F', // Grafana dark background
                primaryColor: '#1F2428', // Slightly lighter for contrast
                primaryTextColor: '#D8D9DA', // Light grey text
                primaryBorderColor: '#3D434B', // Subtle borders
                lineColor: '#5794F2', // Grafana signature blue
                secondaryColor: '#262B31',
                tertiaryColor: '#2C3235',
                fontFamily: '"Roboto", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: '14px',
            },
            themeCSS: `
        /* Grafana-inspired monitoring dashboard style */
        
        /* Flowchart nodes - Clean technical look */
        .node rect, .node circle, .node polygon {
          fill: #1F2428 !important;
          stroke: #3D434B !important;
          stroke-width: 2px !important;
          rx: 3px !important;
          ry: 3px !important;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        .node .label {
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-weight: 500;
          fill: #D8D9DA !important;
          font-size: 14px;
        }
        
        /* Connection lines - Grafana blue */
        .edgePath .path {
          stroke: #5794F2 !important;
          stroke-width: 2px !important;
          stroke-linecap: round;
        }
        
        .arrowheadPath {
          fill: #5794F2 !important;
          stroke: #5794F2 !important;
        }
        
        .edgeLabel {
          background-color: #181B1F !important;
          color: #D8D9DA !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-size: 13px;
          font-weight: 400;
        }
        
        /* Sequence Diagram - Dashboard panel style */
        .actor {
          fill: #1F2428 !important;
          stroke: #3D434B !important;
          stroke-width: 2px !important;
          rx: 3px !important;
          ry: 3px !important;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        .actor text {
          fill: #D8D9DA !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-weight: 500;
        }
        
        .actor-line {
          stroke: #3D434B !important;
          stroke-width: 1.5px !important;
          stroke-dasharray: 5 5 !important;
        }
        
        .activation0, .activation1, .activation2 {
          fill: rgba(87, 148, 242, 0.15) !important;
          stroke: #5794F2 !important;
          stroke-width: 2px !important;
        }
        
        .messageLine0, .messageLine1 {
          stroke: #5794F2 !important;
          stroke-width: 2px !important;
          stroke-linecap: round;
        }
        
        .messageText {
          fill: #D8D9DA !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-weight: 400;
          font-size: 13px;
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #5794F2 !important;
          stroke: #5794F2 !important;
        }
        
        /* Note boxes - Warning style */
        .note {
          fill: #2C2817 !important;
          stroke: #FADE2A !important;
          stroke-width: 2px !important;
          rx: 3px !important;
          ry: 3px !important;
          filter: drop-shadow(0 2px 4px rgba(250, 222, 42, 0.1));
        }
        
        .noteText {
          fill: #FADE2A !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-weight: 500;
          font-size: 13px;
        }
        
        /* Loop/Alt/Opt boxes */
        .labelBox {
          fill: rgba(87, 148, 242, 0.1) !important;
          stroke: #5794F2 !important;
          stroke-width: 2px !important;
          rx: 3px !important;
          ry: 3px !important;
        }
        
        .labelText, .loopText {
          fill: #5794F2 !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-weight: 600;
          font-size: 13px;
        }
        
        .loopLine {
          stroke: #5794F2 !important;
          stroke-width: 2px !important;
          stroke-dasharray: 5 5 !important;
        }
        
        /* Cluster/Subgraph styling */
        .cluster rect {
          fill: rgba(87, 148, 242, 0.05) !important;
          stroke: #3D434B !important;
          stroke-width: 2px !important;
          stroke-dasharray: 6 4 !important;
          rx: 3px !important;
          ry: 3px !important;
        }
        
        .cluster text {
          fill: #73BF69 !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-weight: 600;
        }
        
        /* XYChart styles - Classic Grafana time series colors */
        .line-plot-0 path {
          stroke: #5794F2 !important; /* Classic Grafana blue */
          stroke-width: 3px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 4px rgba(87, 148, 242, 0.5));
        }
        .line-plot-1 path {
          stroke: #FF9830 !important; /* Grafana orange */
          stroke-width: 3px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 4px rgba(255, 152, 48, 0.5));
        }
        .line-plot-2 path {
          stroke: #73BF69 !important; /* Grafana green */
          stroke-width: 3px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 4px rgba(115, 191, 105, 0.5));
        }
        .bar-plot-0 rect {
          fill: rgba(87, 148, 242, 0.25) !important;
          stroke: #5794F2 !important;
          stroke-width: 2px !important;
          rx: 2px !important;
          filter: drop-shadow(0 2px 4px rgba(87, 148, 242, 0.3));
        }
        .bar-plot-1 rect {
          fill: rgba(255, 152, 48, 0.25) !important;
          stroke: #FF9830 !important;
          stroke-width: 2px !important;
          rx: 2px !important;
          filter: drop-shadow(0 2px 4px rgba(255, 152, 48, 0.3));
        }
        .bar-plot-2 rect {
          fill: rgba(115, 191, 105, 0.25) !important;
          stroke: #73BF69 !important;
          stroke-width: 2px !important;
          rx: 2px !important;
          filter: drop-shadow(0 2px 4px rgba(115, 191, 105, 0.3));
        }
        .ticks path {
          stroke: #3D434B !important;
          opacity: 0.5;
        }
        .chart-title text {
          fill: #FFFFFF !important;
          font-weight: 500 !important;
          font-size: 18px !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: #9FA7B3 !important;
          font-size: 12px !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: #D8D9DA !important;
          font-size: 14px !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-weight: 500;
        }
        .legend text {
          fill: #D8D9DA !important;
          font-size: 13px !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
        }
        
        /* State diagram styling */
        .statediagram-state .state-inner {
          fill: #1F2428 !important;
          stroke: #3D434B !important;
        }
        
        .stateLabel text {
          fill: #D8D9DA !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
        }
        
        /* Gantt chart styling */
        .taskText, .taskTextOutsideRight, .taskTextOutsideLeft {
          fill: #D8D9DA !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
        }
        
        .sectionTitle {
          fill: #5794F2 !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
          font-weight: 600;
        }
        
        .titleText {
          fill: #FFFFFF !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
        }
        
        /* Pie chart */
        .pieTitleText {
          fill: #FFFFFF !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
        }
        
        .legendText {
          fill: #D8D9DA !important;
          font-family: "Roboto", "Noto Sans SC", sans-serif;
        }
      `
        },
        bgClass: 'bg-[#181B1F]',
        bgStyle: {
            backgroundColor: '#181B1F',
            backgroundImage: `
        linear-gradient(rgba(61, 67, 75, 0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(61, 67, 75, 0.15) 1px, transparent 1px)
      `,
            backgroundSize: '24px 24px'
        }
    },
};
