import type { MermaidConfig } from 'mermaid';

export type ThemeType = 'linearLight' | 'linearDark' | 'notion' | 'ghibli' | 'spotless' | 'brutalist' | 'glassmorphism' | 'memphis' | 'softPop' | 'cyberpunk' | 'monochrome' | 'darkMinimal' | 'wireframe' | 'handDrawn' | 'grafana' | 'noir' | 'material' | 'aurora' | 'win95' | 'doodle' | 'organic' | 'hightech';

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
      backgroundColor: '#09090b',
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
      backgroundColor: '#051423',
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
  spotless: {
    name: 'Spotless',
    annotationColors: {
      primary: '#2C2416', // Deep brown-black
      secondary: '#5A4A38', // Medium brown
      text: '#1a1a1a', // Pure black
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#EDE8DC', // Cream/beige background
        primaryColor: '#F5F1E8', // Light cream for nodes
        primaryTextColor: '#1a1a1a', // Black text
        primaryBorderColor: '#2C2416', // Dark brown border
        lineColor: '#2C2416', // Dark brown lines
        secondaryColor: '#E8DCC8',
        tertiaryColor: '#DFD3C3',
        fontFamily: '"Helvetica Neue", "Arial", "Noto Sans SC", sans-serif',
        fontSize: '15px',
      },
      themeCSS: `
        /* Spotless - Vintage manual/instruction booklet style */
        
        /* Flowchart nodes - Clean rectangular boxes like manual diagrams */
        .node rect, .node circle, .node polygon {
          fill: #F5F1E8 !important;
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
          rx: 2px !important;
          ry: 2px !important;
        }
        
        .node .label {
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 700;
          fill: #1a1a1a !important;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Connection lines - Bold and clear like instruction diagrams */
        .edgePath .path {
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
          stroke-linecap: square;
        }
        
        .arrowheadPath {
          fill: #2C2416 !important;
          stroke: #2C2416 !important;
        }
        
        .edgeLabel {
          background-color: #EDE8DC !important;
          color: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        /* Sequence Diagram - Instruction manual style */
        .actor {
          fill: #F5F1E8 !important;
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
          rx: 2px !important;
          ry: 2px !important;
        }
        
        .actor text {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .actor-line {
          stroke: #2C2416 !important;
          stroke-width: 2px !important;
          stroke-dasharray: 6 3 !important;
        }
        
        .activation0, .activation1, .activation2 {
          fill: #E8DCC8 !important;
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
        }
        
        .messageLine0, .messageLine1 {
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
          stroke-linecap: square;
        }
        
        .messageText {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 600;
          font-size: 13px;
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #2C2416 !important;
          stroke: #2C2416 !important;
        }
        
        /* Note boxes - Warning/attention style */
        .note {
          fill: #FFF9E6 !important;
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
          rx: 2px !important;
          ry: 2px !important;
        }
        
        .noteText {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 600;
          font-size: 13px;
        }
        
        /* Loop/Alt/Opt boxes */
        .labelBox {
          fill: #DFD3C3 !important;
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
          rx: 2px !important;
          ry: 2px !important;
        }
        
        .labelText, .loopText {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        
        .loopLine {
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
        }
        
        /* Cluster/Subgraph styling */
        .cluster rect {
          fill: rgba(223, 211, 195, 0.3) !important;
          stroke: #2C2416 !important;
          stroke-width: 2px !important;
          stroke-dasharray: 8 4 !important;
          rx: 2px !important;
          ry: 2px !important;
        }
        
        .cluster text {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* State diagram */
        .stateLabel text {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
        }
        
        /* Gantt chart */
        .titleText {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .sectionTitle {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
        }
        
        .taskText, .taskTextOutsideRight, .taskTextOutsideLeft {
          fill: #1a1a1a !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 600;
        }
        
        /* XYChart styles - Technical manual data visualization */
        .line-plot-0 path {
          stroke: #2C2416 !important;
          stroke-width: 3px !important;
          stroke-linecap: square;
        }
        .line-plot-1 path {
          stroke: #5A4A38 !important;
          stroke-width: 3px !important;
          stroke-linecap: square;
        }
        .line-plot-2 path {
          stroke: #8B7355 !important;
          stroke-width: 3px !important;
          stroke-linecap: square;
        }
        .bar-plot-0 rect {
          fill: #F5F1E8 !important;
          stroke: #2C2416 !important;
          stroke-width: 2.5px !important;
          rx: 1px !important;
        }
        .bar-plot-1 rect {
          fill: #E8DCC8 !important;
          stroke: #5A4A38 !important;
          stroke-width: 2.5px !important;
          rx: 1px !important;
        }
        .bar-plot-2 rect {
          fill: #DFD3C3 !important;
          stroke: #8B7355 !important;
          stroke-width: 2.5px !important;
          rx: 1px !important;
        }
        .ticks path {
          stroke: #2C2416 !important;
          opacity: 0.3;
        }
        .chart-title text {
          fill: #1a1a1a !important;
          font-weight: 700 !important;
          font-size: 18px !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: #1a1a1a !important;
          font-size: 13px !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 600;
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: #2C2416 !important;
          font-size: 14px !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .legend text {
          fill: #1a1a1a !important;
          font-size: 13px !important;
          font-family: "Helvetica Neue", "Arial", "Noto Sans SC", sans-serif;
          font-weight: 600;
        }
      `
    },
    bgClass: 'bg-[#EDE8DC]',
    bgStyle: {
      backgroundColor: '#EDE8DC',
      backgroundImage: `
        repeating-linear-gradient(
          0deg,
          rgba(44, 36, 22, 0.02) 0px,
          rgba(44, 36, 22, 0.02) 1px,
          transparent 1px,
          transparent 40px
        ),
        repeating-linear-gradient(
          90deg,
          rgba(44, 36, 22, 0.02) 0px,
          rgba(44, 36, 22, 0.02) 1px,
          transparent 1px,
          transparent 40px
        )
      `,
      backgroundSize: '40px 40px'
    }
  },
  brutalist: {
    name: 'Brutalist',
    annotationColors: {
      primary: '#FF6B35', // Bold orange
      secondary: '#4ECDC4', // Bright teal
      text: '#000000', // Pure black
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#f6f3e9', // Light warm beige
        primaryColor: '#ffffff', // White for nodes
        primaryTextColor: '#000000', // Black text
        primaryBorderColor: '#000000', // Black border
        lineColor: '#000000', // Black lines
        secondaryColor: '#FFE66D', // Bright yellow
        tertiaryColor: '#FF6B35', // Bold orange
        fontFamily: '"Arial", "Helvetica", "Noto Sans SC", sans-serif',
        fontSize: '16px',
      },
      themeCSS: `
        /* Brutalist/Neobrutalism - Hard shadows and bold borders */
        
        /* Flowchart nodes - Hard shadow effect */
        .node rect, .node polygon {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
          /* Hard shadow simulation using double drop-shadow */
          filter: 
            drop-shadow(6px 6px 0px #000000);
        }

        .node circle {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
        }
        
        .node .label {
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
          fill: #000000 !important;
          font-size: 16px;
        }
        
        /* Connection lines - Bold and straight */
        .edgePath .path {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          stroke-linecap: square;
        }
        
        .arrowheadPath {
          fill: #000000 !important;
          stroke: #000000 !important;
        }
        
        .edgeLabel {
          background-color: #f6f3e9 !important;
          color: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-size: 14px;
          font-weight: 700;
        }
        
        /* Color accent nodes */
        .node:nth-child(2n) rect,
        .node:nth-child(2n) circle,
        .node:nth-child(2n) polygon {
          fill: #FFE66D !important;
        }
        
        .node:nth-child(3n) rect,
        .node:nth-child(3n) circle,
        .node:nth-child(3n) polygon {
          fill: #4ECDC4 !important;
        }
        
        .node:nth-child(5n) rect,
        .node:nth-child(5n) circle,
        .node:nth-child(5n) polygon {
          fill: #FF6B35 !important;
        }
        
        /* Sequence Diagram - Brutalist style */
        /* Actor boxes - Only shadow on rect, not text */
        .actor rect {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        
        .actor {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
        }
        
        .actor text {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        .actor-line {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .activation0, .activation1, .activation2 {
          fill: #FFE66D !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        .messageLine0, .messageLine1 {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          stroke-linecap: square;
        }
        
        .messageText {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
          font-size: 14px;
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #000000 !important;
          stroke: #000000 !important;
        }
        
        /* Note boxes - Bright yellow with hard shadow */
        .note {
          fill: #FFE66D !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        
        .noteText {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        /* Loop/Alt/Opt boxes - Orange accent */
        .labelBox {
          fill: #FF6B35 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        
        .labelText, .loopText {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        .loopLine {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        /* Cluster/Subgraph styling */
        .cluster rect {
          fill: #4ECDC4 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(8px 8px 0px #000000);
        }
        
        .cluster text {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 900;
        }
        
        /* Class Diagram - Brutalist style with hard shadows */
        .classGroup rect {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        
        .classLabel .label,
        .classLabel text {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        .relationshipLine {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .relationshipLabelBox {
          fill: #FFE66D !important;
          stroke: #000000 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(4px 4px 0px #000000);
        }
        
        /* State diagram - Brutalist style with hard shadows */
        .statediagram-state rect,
        .statediagram-state .state-inner {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        
        /* State diagram start/end circles - smaller shadow offset */
        .start-state circle,
        .end-state circle {
          fill: #000000 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(3px 3px 0px #000000) !important;
        }
        
        .statediagram-state circle {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .stateLabel text,
        .statediagram-state text {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        .transition {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }

        .classDiagram .node.default {
          filter: drop-shadow(6px 6px 0px #000000);
        }
        
        /* ER Diagram - Brutalist style */
        .er.entityBox {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        
        .er.relationshipLabelBox {
          fill: #FFE66D !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(4px 4px 0px #000000);
        }
        
        .er.entityLabel,
        .er.relationshipLabel {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        .er .relationshipLine {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        /* Gantt chart */
        .titleText {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 900;
        }
        
        .sectionTitle {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        .taskText, .taskTextOutsideRight, .taskTextOutsideLeft {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        .task0, .task1, .task2, .task3 {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        /* Pie chart */
        .pieCircle {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .pieTitleText {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 900;
        }
        
        .slice {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .legendText {
          fill: #000000 !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        
        /* XYChart styles - Bold brutalist colors */
        .line-plot-0 path {
          stroke: #000000 !important;
          stroke-width: 4px !important;
          stroke-linecap: square;
        }
        .line-plot-1 path {
          stroke: #FF6B35 !important;
          stroke-width: 4px !important;
          stroke-linecap: square;
        }
        .line-plot-2 path {
          stroke: #4ECDC4 !important;
          stroke-width: 4px !important;
          stroke-linecap: square;
        }
        .bar-plot-0 rect {
          fill: #FFE66D !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 2px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        .bar-plot-1 rect {
          fill: #FF6B35 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 2px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        .bar-plot-2 rect {
          fill: #4ECDC4 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 2px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        .ticks path {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        .chart-title text {
          fill: #000000 !important;
          font-weight: 900 !important;
          font-size: 20px !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: #000000 !important;
          font-size: 14px !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: #000000 !important;
          font-size: 16px !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 900;
        }
        .legend text {
          fill: #000000 !important;
          font-size: 14px !important;
          font-family: "Arial", "Helvetica", "Noto Sans SC", sans-serif;
          font-weight: 700;
        }
      `
    },
    bgClass: 'bg-[#f6f3e9]',
    bgStyle: {
      backgroundColor: '#f6f3e9',
    }
  },
  glassmorphism: {
    name: 'Glassmorphism',
    annotationColors: {
      primary: '#8B5CF6', // Purple
      secondary: '#EC4899', // Pink
      text: '#1F2937', // Dark gray
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
        primaryColor: 'rgba(255, 255, 255, 0.25)', // Glass white
        primaryTextColor: '#1F2937', // Dark gray text
        primaryBorderColor: 'rgba(255, 255, 255, 0.4)', // Light border
        lineColor: 'rgba(139, 92, 246, 0.6)', // Purple lines
        secondaryColor: 'rgba(236, 72, 153, 0.2)', // Pink tint
        tertiaryColor: 'rgba(59, 130, 246, 0.2)', // Blue tint
        fontFamily: '"SF Pro Display", "Inter", "Noto Sans SC", -apple-system, sans-serif',
        fontSize: '15px',
      },
      themeCSS: `
        /* Glassmorphism - Modern glass effect */
        
        /* Flowchart nodes - Glass effect with backdrop blur */
        .node rect, .node circle, .node polygon {
          fill: rgba(255, 255, 255, 0.25) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 1.5px !important;
          rx: 12px !important;
          ry: 12px !important;
          filter: drop-shadow(0 4px 16px rgba(139, 92, 246, 0.15)) 
                  drop-shadow(0 8px 32px rgba(0, 0, 0, 0.1));
          /* Note: backdrop-filter doesn't work in SVG, but we simulate the effect */
        }
        
        .node .label {
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 600;
          fill: #1F2937 !important;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
        }
        
        /* Connection lines - Gradient glass effect */
        .edgePath .path {
          stroke: rgba(139, 92, 246, 0.6) !important;
          stroke-width: 2.5px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.3));
        }
        
        .arrowheadPath {
          fill: rgba(139, 92, 246, 0.6) !important;
          stroke: rgba(139, 92, 246, 0.6) !important;
        }
        
        .edgeLabel {
          color: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-size: 13px;
          font-weight: 500;
        }
        
        .edgeLabel rect {
          fill: rgba(255, 255, 255, 0.85) !important;
          stroke: rgba(139, 92, 246, 0.2) !important;
          stroke-width: 1px !important;
          rx: 6px !important;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08));
        }
        
        .edgeLabel .label {
          fill: #1F2937 !important;
          font-weight: 500;
        }
        
        /* Sequence Diagram - Glass panels */
        .actor {
          fill: rgba(255, 255, 255, 0.25) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 1.5px !important;
          rx: 12px !important;
          ry: 12px !important;
          filter: drop-shadow(0 4px 16px rgba(139, 92, 246, 0.15)) 
                  drop-shadow(0 8px 32px rgba(0, 0, 0, 0.1));
        }
        
        .actor text {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 600;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
        }
        
        .actor-line {
          stroke: rgba(139, 92, 246, 0.4) !important;
          stroke-width: 2px !important;
          stroke-dasharray: 8 4 !important;
          stroke-linecap: round;
        }
        
        .activation0, .activation1, .activation2 {
          fill: rgba(139, 92, 246, 0.15) !important;
          stroke: rgba(139, 92, 246, 0.5) !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 4px 12px rgba(139, 92, 246, 0.2));
        }
        
        .messageLine0, .messageLine1 {
          stroke: rgba(139, 92, 246, 0.6) !important;
          stroke-width: 2.5px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.3));
        }
        
        .messageText {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 500;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
        }
        
        #arrowhead path, .arrowheadPath {
          fill: rgba(139, 92, 246, 0.6) !important;
          stroke: rgba(139, 92, 246, 0.6) !important;
        }
        
        /* Note boxes - Pink glass accent */
        .note {
          fill: rgba(236, 72, 153, 0.2) !important;
          stroke: rgba(236, 72, 153, 0.4) !important;
          stroke-width: 1.5px !important;
          rx: 12px !important;
          ry: 12px !important;
          filter: drop-shadow(0 4px 16px rgba(236, 72, 153, 0.15)) 
                  drop-shadow(0 4px 24px rgba(0, 0, 0, 0.08));
        }
        
        .noteText {
          fill: #831843 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 500;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.6));
        }
        
        /* Loop/Alt/Opt boxes - Blue glass accent */
        .labelBox {
          fill: rgba(59, 130, 246, 0.2) !important;
          stroke: rgba(59, 130, 246, 0.4) !important;
          stroke-width: 1.5px !important;
          rx: 12px !important;
          ry: 12px !important;
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.15));
        }
        
        .labelText, .loopText {
          fill: #1E40AF !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 600;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.6));
        }
        
        .loopLine {
          stroke: rgba(59, 130, 246, 0.5) !important;
          stroke-width: 1.5px !important;
          stroke-dasharray: 8 4 !important;
        }
        
        /* Cluster/Subgraph styling */
        .cluster rect {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.3) !important;
          stroke-width: 1.5px !important;
          stroke-dasharray: 8 4 !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: drop-shadow(0 4px 24px rgba(0, 0, 0, 0.08));
        }
        
        .cluster text {
          fill: #374151 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 700;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
        }
        
        /* State diagram */
        .statediagram-state rect,
        .statediagram-state .state-inner {
          fill: rgba(255, 255, 255, 0.25) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 1.5px !important;
          rx: 12px !important;
          filter: drop-shadow(0 4px 16px rgba(139, 92, 246, 0.15)) 
                  drop-shadow(0 8px 32px rgba(0, 0, 0, 0.1));
        }
        
        .stateLabel text {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 600;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
        }
        
        .transition {
          stroke: rgba(139, 92, 246, 0.6) !important;
          stroke-width: 2.5px !important;
        }
        
        /* XYChart styles - Gradient glass palette */
        .line-plot-0 path {
          stroke: rgba(139, 92, 246, 0.8) !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.4));
        }
        .line-plot-1 path {
          stroke: rgba(236, 72, 153, 0.8) !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 2px 8px rgba(236, 72, 153, 0.4));
        }
        .line-plot-2 path {
          stroke: rgba(59, 130, 246, 0.8) !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.4));
        }
        .bar-plot-0 rect {
          fill: rgba(139, 92, 246, 0.25) !important;
          stroke: rgba(139, 92, 246, 0.5) !important;
          stroke-width: 1.5px !important;
          rx: 8px !important;
          filter: drop-shadow(0 4px 12px rgba(139, 92, 246, 0.2));
        }
        .bar-plot-1 rect {
          fill: rgba(236, 72, 153, 0.25) !important;
          stroke: rgba(236, 72, 153, 0.5) !important;
          stroke-width: 1.5px !important;
          rx: 8px !important;
          filter: drop-shadow(0 4px 12px rgba(236, 72, 153, 0.2));
        }
        .bar-plot-2 rect {
          fill: rgba(59, 130, 246, 0.25) !important;
          stroke: rgba(59, 130, 246, 0.5) !important;
          stroke-width: 1.5px !important;
          rx: 8px !important;
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.2));
        }
        .ticks path {
          stroke: rgba(255, 255, 255, 0.3) !important;
        }
        .chart-title text {
          fill: #1F2937 !important;
          font-weight: 700 !important;
          font-size: 18px !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.8));
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: #374151 !important;
          font-size: 13px !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.6));
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: #1F2937 !important;
          font-size: 15px !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 600;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
        }
        .legend text {
          fill: #1F2937 !important;
          font-size: 13px !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.6));
        }
        
        /* Class Diagram */
        .classGroup rect {
          fill: rgba(255, 255, 255, 0.25) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 1.5px !important;
          rx: 12px !important;
          filter: drop-shadow(0 4px 16px rgba(139, 92, 246, 0.15));
        }
        
        .classLabel .label {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 600;
        }
        
        .relationshipLine {
          stroke: rgba(139, 92, 246, 0.6) !important;
          stroke-width: 2px !important;
        }
        
        .relationshipLabelBox {
          fill: rgba(255, 255, 255, 0.85) !important;
          stroke: rgba(139, 92, 246, 0.3) !important;
          stroke-width: 1px !important;
          rx: 6px !important;
        }
        
        /* ER Diagram */
        .er.entityBox {
          fill: rgba(255, 255, 255, 0.25) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 1.5px !important;
          rx: 12px !important;
          filter: drop-shadow(0 4px 16px rgba(139, 92, 246, 0.15));
        }
        
        .er.relationshipLabelBox {
          fill: rgba(255, 255, 255, 0.85) !important;
          stroke: rgba(139, 92, 246, 0.3) !important;
          stroke-width: 1px !important;
          rx: 6px !important;
        }
        
        .er.entityLabel,
        .er.relationshipLabel {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 600;
        }
        
        .er .relationshipLine {
          stroke: rgba(139, 92, 246, 0.6) !important;
          stroke-width: 2px !important;
        }
        
        /* Gantt Chart */
        .titleText {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 700;
          filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.8));
        }
        
        .sectionTitle {
          fill: #6B21A8 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 600;
        }
        
        .taskText, .taskTextOutsideRight, .taskTextOutsideLeft {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 500;
        }
        
        .task, .task0, .task1, .task2, .task3 {
          fill: rgba(139, 92, 246, 0.3) !important;
          stroke: rgba(139, 92, 246, 0.5) !important;
          stroke-width: 1.5px !important;
          rx: 8px !important;
          filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.2));
        }
        
        .taskDone0, .taskDone1, .taskDone2, .taskDone3 {
          fill: rgba(236, 72, 153, 0.3) !important;
          stroke: rgba(236, 72, 153, 0.5) !important;
        }
        
        /* Pie Chart */
        .pieCircle {
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
        }
        
        .pieTitleText {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 700;
          filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.8));
        }
        
        .slice {
          stroke: rgba(255, 255, 255, 0.6) !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
        }
        
        .legendText {
          fill: #1F2937 !important;
          font-family: "SF Pro Display", "Inter", "Noto Sans SC", sans-serif;
          font-weight: 500;
        }
      `
    },
    bgClass: 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50',
    bgStyle: {
      background: 'linear-gradient(135deg, #F3E8FF 0%, #FCE7F3 30%, #DBEAFE 60%, #F3E8FF 100%)',
      position: 'relative' as const,
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
    bgStyle: {
      backgroundColor: '#1a1a1a',
    }
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
  memphis: {
    name: 'Memphis',
    annotationColors: {
      primary: '#FF6B6B', // Memphis red
      secondary: '#FECA57', // Memphis yellow
      text: '#000000', // Black
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#FFFFFF',
        primaryColor: '#FF6B6B', // Red
        primaryTextColor: '#000000',
        primaryBorderColor: '#000000',
        lineColor: '#000000',
        secondaryColor: '#FECA57', // Yellow
        tertiaryColor: '#48DBFB', // Blue
        fontFamily: '"Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif',
        fontSize: '16px',
      },
      themeCSS: `
        /* Memphis - 80s Pop Art Style */
        
        /* Flowchart nodes - Bold colors with thick black borders */
        .node rect, .node polygon {
          fill: #FF6B6B !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          rx: 8px !important;
          ry: 8px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        .node circle {
          fill: #FF6B6B !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          filter: drop-shadow(1px 1px 0px #000000);
        }
        
        .node .label {
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
          fill: #000000 !important;
          font-size: 16px;
        }
        
        /* Alternate node colors - Memphis style */
        .node:nth-child(2n) rect,
        .node:nth-child(2n) circle,
        .node:nth-child(2n) polygon {
          fill: #FECA57 !important;
        }
        
        .node:nth-child(3n) rect,
        .node:nth-child(3n) circle,
        .node:nth-child(3n) polygon {
          fill: #48DBFB !important;
        }
        
        .node:nth-child(5n) rect,
        .node:nth-child(5n) circle,
        .node:nth-child(5n) polygon {
          fill: #FF9FF3 !important;
        }
        
        /* Connection lines - Bold black */
        .edgePath .path {
          stroke: #000000 !important;
          stroke-width: 4px !important;
          stroke-linecap: round;
        }
        
        .arrowheadPath {
          fill: #000000 !important;
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .edgeLabel {
          color: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-size: 14px;
          font-weight: 900;
        }
        
        .edgeLabel rect {
          fill: #FFFFFF !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 4px !important;
          filter: drop-shadow(3px 3px 0px #000000);
        }
        
        /* Sequence Diagram - Memphis style */
        .actor {
          fill: #FF6B6B !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          rx: 8px !important;
          ry: 8px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        .actor:nth-child(2n) {
          fill: #FECA57 !important;
        }
        
        .actor:nth-child(3n) {
          fill: #48DBFB !important;
        }
        
        .actor text {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        .actor-line {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          stroke-dasharray: 8 4 !important;
        }
        
        .activation0, .activation1, .activation2 {
          fill: #FF9FF3 !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          filter: drop-shadow(4px 4px 0px #000000);
        }
        
        .messageLine0, .messageLine1 {
          stroke: #000000 !important;
          stroke-width: 4px !important;
          stroke-linecap: round;
        }
        
        .messageText {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
          font-size: 14px;
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #000000 !important;
          stroke: #000000 !important;
        }
        
        /* Note boxes - Bright yellow */
        .note {
          fill: #FECA57 !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          rx: 8px !important;
          ry: 8px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        .noteText {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        /* Loop/Alt/Opt boxes - Pink */
        .labelBox {
          fill: #FF9FF3 !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          rx: 8px !important;
          ry: 8px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        .labelText, .loopText {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        .loopLine {
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        /* Cluster/Subgraph styling - Blue */
        .cluster rect {
          fill: #48DBFB !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          rx: 8px !important;
          ry: 8px !important;
          filter: drop-shadow(6px 6px 0px #000000);
        }
        
        .cluster text {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        /* State diagram */
        .statediagram-state rect,
        .statediagram-state .state-inner {
          fill: #FF6B6B !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          rx: 8px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        .statediagram-state:nth-child(2n) rect,
        .statediagram-state:nth-child(2n) .state-inner {
          fill: #FECA57 !important;
        }
        
        .statediagram-state:nth-child(3n) rect,
        .statediagram-state:nth-child(3n) .state-inner {
          fill: #48DBFB !important;
        }
        
        .stateLabel text {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        .transition {
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        /* Class Diagram */
        .classGroup rect {
          fill: #FF6B6B !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          rx: 8px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        .classLabel .label {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        .relationshipLine {
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        /* ER Diagram */
        .er.entityBox {
          fill: #48DBFB !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          rx: 8px !important;
          filter: drop-shadow(5px 5px 0px #000000);
        }
        
        .er.entityLabel,
        .er.relationshipLabel {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        .er .relationshipLine {
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        /* Gantt Chart */
        .titleText {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
          font-size: 20px;
        }
        
        .sectionTitle {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        .taskText, .taskTextOutsideRight, .taskTextOutsideLeft {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        .task0 {
          fill: #FF6B6B !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        .task1 {
          fill: #FECA57 !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        .task2 {
          fill: #48DBFB !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        .task3 {
          fill: #FF9FF3 !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        /* Pie Chart */
        .pieCircle {
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        .pieTitleText {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
          font-size: 20px;
        }
        
        .slice {
          stroke: #000000 !important;
          stroke-width: 4px !important;
        }
        
        .legendText {
          fill: #000000 !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        
        /* XYChart styles - Memphis bright colors */
        .line-plot-0 path {
          stroke: #FF6B6B !important;
          stroke-width: 5px !important;
          stroke-linecap: round;
        }
        .line-plot-1 path {
          stroke: #FECA57 !important;
          stroke-width: 5px !important;
          stroke-linecap: round;
        }
        .line-plot-2 path {
          stroke: #48DBFB !important;
          stroke-width: 5px !important;
          stroke-linecap: round;
        }
        .bar-plot-0 rect {
          fill: #FF6B6B !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          filter: drop-shadow(4px 4px 0px #000000);
        }
        .bar-plot-1 rect {
          fill: #FECA57 !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          filter: drop-shadow(4px 4px 0px #000000);
        }
        .bar-plot-2 rect {
          fill: #48DBFB !important;
          stroke: #000000 !important;
          stroke-width: 4px !important;
          filter: drop-shadow(4px 4px 0px #000000);
        }
        .ticks path {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        .chart-title text {
          fill: #000000 !important;
          font-weight: 900 !important;
          font-size: 22px !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: #000000 !important;
          font-size: 14px !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: #000000 !important;
          font-size: 16px !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
        .legend text {
          fill: #000000 !important;
          font-size: 14px !important;
          font-family: "Comic Sans MS", "Arial Black", "Noto Sans SC", cursive, sans-serif;
          font-weight: 900;
        }
      `
    },
    bgClass: 'bg-white',
    bgStyle: {
      backgroundColor: '#FEFEFE',
      backgroundImage: `
        linear-gradient(45deg, rgba(255, 107, 107, 0.3) 25%, transparent 25%, transparent 75%, rgba(255, 107, 107, 0.3) 75%, rgba(255, 107, 107, 0.3)),
        linear-gradient(45deg, rgba(255, 107, 107, 0.3) 25%, transparent 25%, transparent 75%, rgba(255, 107, 107, 0.3) 75%, rgba(255, 107, 107, 0.3)),
        linear-gradient(45deg, transparent 25%, rgba(254, 202, 87, 0.08) 25%, rgba(254, 202, 87, 0.08) 50%, transparent 50%, transparent),
        linear-gradient(-45deg, rgba(72, 219, 251, 0.06) 25%, transparent 25%, transparent 75%, rgba(72, 219, 251, 0.06) 75%, rgba(72, 219, 251, 0.06)),
        linear-gradient(90deg, rgba(255, 159, 243, 0.04) 1px, transparent 1px),
        linear-gradient(rgba(255, 159, 243, 0.04) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px, 50px 50px, 25px 25px, 25px 25px, 10px 10px, 10px 10px',
      backgroundPosition: '0px 0px, 25px 25px, 25px 0px, 0px 12.5px, 0px 0px, 0px 0px',
    }
  },
  noir: {
    name: 'Noir',
    annotationColors: {
      primary: '#ffffff', // Pure white
      secondary: '#cccccc', // Light gray
      text: '#ffffff', // Pure white
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        darkMode: true,
        background: '#0a0a0a', // Deep black
        primaryColor: '#1a1a1a', // Dark gray for nodes
        primaryTextColor: '#ffffff', // White text
        primaryBorderColor: '#ffffff', // White borders
        lineColor: '#ffffff', // White lines
        secondaryColor: '#1a1a1a',
        tertiaryColor: '#1a1a1a',
        fontFamily: '"Courier New", "Consolas", "Monaco", monospace',
        fontSize: '16px',
      },
      themeCSS: `
        /* Noir Cinematic - Film noir style with spotlight effects */
        
        /* Flowchart nodes - High contrast with glow */
        .node rect, .node circle, .node polygon {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
        }
        
        .node .label {
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          fill: #ffffff !important;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        /* Connection lines - Glowing white */
        .edgePath .path {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
        }
        
        .arrowheadPath {
          fill: #ffffff !important;
          stroke: #ffffff !important;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
        }
        
        .edgeLabel {
          background-color: #0a0a0a !important;
          color: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        /* Sequence Diagram - Noir style */
        .actor rect,
        g.actor rect,
        rect.actor {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)) !important;
        }
        
        .actor {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
        }
        
        g.actor {
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
        }
        
        .actor text {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .actor-line {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          opacity: 0.6;
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
        }
        
        .activation0, .activation1, .activation2,
        rect.activation0, rect.activation1, rect.activation2 {
          fill: #2a2a2a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.3)) !important;
        }
        
        .messageLine0, .messageLine1 {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
        }
        
        .messageText {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #ffffff !important;
          stroke: #ffffff !important;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
        }
        
        /* Note boxes - Spotlight effect */
        .note,
        rect.note,
        g.note rect {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)) !important;
        }
        
        .noteText,
        text.noteText {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
        }
        
        /* Loop/Alt/Opt boxes */
        .labelBox,
        rect.labelBox {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)) !important;
        }
        
        .labelText, .loopText,
        text.labelText, text.loopText {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .loopLine,
        path.loopLine {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          opacity: 0.7;
        }
        
        /* Cluster/Subgraph styling */
        .cluster rect {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          stroke-dasharray: 8 4 !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
          opacity: 0.6;
        }
        
        .cluster text {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 900;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
        }
        
        /* Class Diagram - Film noir cards */
        .classGroup rect,
        g.classGroup rect,
        g[id*="classid"] rect,
        g[id^="classid"] rect,
        svg[aria-roledescription="classDiagram"] g.classGroup rect {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) !important;
        }
        
        .classLabel .label,
        .classLabel text,
        .class-label text {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .relationshipLine,
        .relation {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
        }
        
        .divider {
          stroke: #ffffff !important;
          stroke-width: 1px !important;
          opacity: 0.4;
        }
        
        /* State diagram - Cinematic states */
        g[id*="state-"] rect,
        g[id^="state-"] rect,
        g.stateGroup rect,
        .statediagram-state rect,
        .statediagram-state .state-inner,
        g[class*="state"] rect,
        svg[aria-roledescription="statediagram"] g rect:not(circle):not([id*="start"]):not([id*="end"]) {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) !important;
        }
        
        .start-state circle,
        .end-state circle,
        circle[id*="start"],
        circle[id*="end"] {
          fill: #ffffff !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.8));
        }
        
        .statediagram-state circle {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
        }
        
        .stateLabel text,
        .statediagram-state text,
        .state-note text {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .transition,
        path.transition {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
        }
        
        g.stateGroup.statediagram-cluster rect {
          fill: #1a1a1a !important;
          rx: 4px !important;
          ry: 4px !important;
          opacity: 0.6;
        }
        
        /* ER Diagram - Noir entities */
        .er.entityBox,
        .entityBox,
        g[id*="entity-"] rect,
        g[id^="entity"] rect,
        svg[aria-roledescription="er"] .entityBox,
        svg[aria-roledescription="er"] g rect {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) !important;
        }
        
        .er.relationshipLabelBox,
        .relationshipLabelBox {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
        }
        
        .er.entityLabel,
        .er.relationshipLabel,
        .entityLabel text,
        .relationshipLabel {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .er .relationshipLine,
        .relationshipLine {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
        }
        
        .er .attributeBoxEven,
        .er .attributeBoxOdd {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 1px !important;
        }
        
        /* Gantt chart - Cinematic timeline */
        .titleText,
        text.titleText {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 900;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
        }
        
        .sectionTitle,
        text.sectionTitle {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .taskText, 
        .taskTextOutsideRight, 
        .taskTextOutsideLeft,
        text.taskText {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
        
        .task0, .task1, .task2, .task3,
        rect.task,
        rect[class*="task"],
        svg[aria-roledescription="gantt"] rect.task,
        g.task rect {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)) !important;
        }
        
        .taskText0, .taskText1, .taskText2, .taskText3 {
          fill: #ffffff !important;
        }
        
        .grid .tick line {
          stroke: #ffffff !important;
          opacity: 0.2;
        }
        
        .grid path {
          stroke: none !important;
        }
        
        /* Pie chart - Noir spotlight slices */
        .pieCircle,
        circle.pieCircle {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
        }
        
        .pieTitleText,
        text.pieTitleText {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 900;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
        }
        
        .legendText,
        text.legendText,
        text.legend {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
        
        .slice,
        path.slice,
        svg[aria-roledescription="pie"] path {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)) !important;
        }
        
        /* Journey diagram */
        .section0, .section1, .section2 {
          fill: #1a1a1a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
        }
        
        .journey-section rect {
          rx: 4px !important;
        }
        
        /* Global text styling */
        text {
          fill: #ffffff !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
        
        /* XYChart styles - High contrast data viz */
        .line-plot-0 path {
          stroke: #ffffff !important;
          stroke-width: 3px !important;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }
        .line-plot-1 path {
          stroke: #cccccc !important;
          stroke-width: 3px !important;
          filter: drop-shadow(0 0 10px rgba(204, 204, 204, 0.5));
        }
        .line-plot-2 path {
          stroke: #999999 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(0 0 10px rgba(153, 153, 153, 0.5));
        }
        .bar-plot-0 rect {
          fill: #2a2a2a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
        }
        .bar-plot-1 rect {
          fill: #3a3a3a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
        }
        .bar-plot-2 rect {
          fill: #4a4a4a !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 4px !important;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
        }
        .ticks path {
          stroke: #ffffff !important;
          opacity: 0.3;
        }
        .chart-title text {
          fill: #ffffff !important;
          font-weight: 900 !important;
          font-size: 20px !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: #ffffff !important;
          font-size: 14px !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: #ffffff !important;
          font-size: 16px !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          font-weight: 700;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
        }
        .legend text {
          fill: #ffffff !important;
          font-size: 14px !important;
          font-family: "Courier New", "Consolas", "Monaco", monospace;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
      `
    },
    bgClass: 'bg-[#0a0a0a]',
    bgStyle: {
      backgroundColor: '#0a0a0a',
      backgroundImage: `
        linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%),
        radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
      `,
    }
  },
  material: {
    name: 'Material',
    annotationColors: {
      primary: '#6200ee', // Material Purple
      secondary: '#03dac6', // Material Teal
      text: '#333333', // Dark gray
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#ffffff',
        primaryColor: '#ffffff', // White for nodes
        primaryTextColor: 'rgba(0, 0, 0, 0.87)', // Material Design primary text
        primaryBorderColor: '#e0e0e0', // Light gray border
        lineColor: '#757575', // Medium gray lines
        secondaryColor: '#ffffff',
        tertiaryColor: '#ffffff',
        fontFamily: '"Roboto", "Noto Sans SC", -apple-system, sans-serif',
        fontSize: '14px',
      },
      themeCSS: `
        /* Material Design - Elevation and shadows */
        
        /* Flowchart nodes - Material elevation 2 */
        .node rect, .node circle, .node polygon {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24));
        }
        
        .node .label {
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
          fill: rgba(0, 0, 0, 0.87) !important;
          font-size: 14px;
        }
        
        /* Connection lines - Material style */
        .edgePath .path {
          stroke: #757575 !important;
          stroke-width: 2px !important;
          stroke-linecap: round;
        }
        
        .arrowheadPath {
          fill: #757575 !important;
          stroke: #757575 !important;
        }
        
        .edgeLabel {
          background-color: #ffffff !important;
          color: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
          font-size: 13px;
        }
        
        /* All nodes use white surface - Material Design spec */
        
        /* Sequence Diagram - Material cards */
        .actor rect,
        g.actor rect,
        rect.actor {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24)) !important;
        }
        
        .actor {
          fill: #ffffff !important;
          stroke: none !important;
        }
        
        g.actor {
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24));
        }
        
        .actor text {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
        }
        
        .actor-line {
          stroke: #bdbdbd !important;
          stroke-width: 2px !important;
          stroke-dasharray: 4 4 !important;
        }
        
        .activation0, .activation1, .activation2,
        rect.activation0, rect.activation1, rect.activation2 {
          fill: #ffffff !important;
          stroke: none !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24)) !important;
        }
        
        .messageLine0, .messageLine1 {
          stroke: #757575 !important;
          stroke-width: 2px !important;
        }
        
        .messageText {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
          font-size: 13px;
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #757575 !important;
          stroke: #757575 !important;
        }
        
        /* Note boxes - Material elevation 4 */
        .note,
        rect.note,
        g.note rect {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: 
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.14))
            drop-shadow(0 4px 5px rgba(0, 0, 0, 0.12)) !important;
        }
        
        .noteText,
        text.noteText {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
        }
        
        /* Loop/Alt/Opt boxes - Elevated */
        .labelBox,
        rect.labelBox {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24)) !important;
        }
        
        .labelText, .loopText,
        text.labelText, text.loopText {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 12px;
        }
        
        .loopLine,
        path.loopLine {
          stroke: #bdbdbd !important;
          stroke-width: 2px !important;
        }
        
        /* Cluster/Subgraph styling - Material surface */
        .cluster rect {
          fill: #ffffff !important;
          stroke: #e0e0e0 !important;
          stroke-width: 1px !important;
          rx: 8px !important;
          ry: 8px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.16));
        }
        
        .cluster text {
          fill: rgba(0, 0, 0, 0.60) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 12px;
        }
        
        /* Class Diagram - Material cards */
        .classGroup rect,
        g.classGroup rect,
        g[id*="classid"] rect,
        g[id^="classid"] rect,
        svg[aria-roledescription="classDiagram"] g.classGroup rect {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24)) !important;
        }
        
        .classLabel .label,
        .classLabel text,
        .class-label text {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
        }
        
        .relationshipLine,
        .relation {
          stroke: #757575 !important;
          stroke-width: 2px !important;
        }
        
        .divider {
          stroke: #e0e0e0 !important;
          stroke-width: 1px !important;
        }
        
        /* State diagram - Material surfaces */
        g[id*="state-"] rect,
        g[id^="state-"] rect,
        g.stateGroup rect,
        .statediagram-state rect,
        .statediagram-state .state-inner,
        g[class*="state"] rect,
        svg[aria-roledescription="statediagram"] g rect:not(circle):not([id*="start"]):not([id*="end"]) {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24)) !important;
        }
        
        .start-state circle,
        .end-state circle,
        circle[id*="start"],
        circle[id*="end"] {
          fill: #6200ee !important;
          stroke: none !important;
          filter: 
            drop-shadow(0 2px 4px rgba(98, 0, 238, 0.3))
            drop-shadow(0 4px 8px rgba(98, 0, 238, 0.2));
        }
        
        .statediagram-state circle {
          stroke: none !important;
        }
        
        .stateLabel text,
        .statediagram-state text,
        .state-note text {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
        }
        
        .transition,
        path.transition {
          stroke: #757575 !important;
          stroke-width: 2px !important;
        }
        
        g.stateGroup.statediagram-cluster rect {
          fill: #ffffff !important;
          stroke: #e0e0e0 !important;
          stroke-width: 1px !important;
          rx: 8px !important;
          ry: 8px !important;
        }
        
        /* ER Diagram - Material entities */
        .er.entityBox,
        .entityBox,
        g[id*="entity-"] rect,
        g[id^="entity"] rect,
        svg[aria-roledescription="er"] .entityBox,
        svg[aria-roledescription="er"] g rect {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24)) !important;
        }
        
        .er.relationshipLabelBox,
        .relationshipLabelBox {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          ry: 4px !important;
          filter: 
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.10))
            drop-shadow(0 1px 1px rgba(0, 0, 0, 0.16));
        }
        
        .er.entityLabel,
        .er.relationshipLabel,
        .entityLabel text,
        .relationshipLabel {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
        }
        
        .er .relationshipLine,
        .relationshipLine {
          stroke: #757575 !important;
          stroke-width: 2px !important;
        }
        
        .er .attributeBoxEven,
        .er .attributeBoxOdd {
          fill: #ffffff !important;
          stroke: none !important;
        }
        
        /* Gantt chart - Material timeline */
        .titleText,
        text.titleText {
          fill: #212121 !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1.25px;
        }
        
        .sectionTitle,
        text.sectionTitle {
          fill: rgba(0, 0, 0, 0.60) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
        }
        
        .taskText, 
        .taskTextOutsideRight, 
        .taskTextOutsideLeft,
        text.taskText {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 400;
        }
        
        .task0, .task1, .task2, .task3,
        rect.task,
        rect[class*="task"],
        svg[aria-roledescription="gantt"] rect.task,
        g.task rect {
          stroke: none !important;
          rx: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24)) !important;
        }
        
        .taskText0, .taskText1, .taskText2, .taskText3 {
          fill: rgba(0, 0, 0, 0.87) !important;
        }
        
        .grid .tick line {
          stroke: #e0e0e0 !important;
        }
        
        .grid path {
          stroke: none !important;
        }
        
        /* Pie chart - Material slices */
        .pieCircle,
        circle.pieCircle {
          stroke: none !important;
        }
        
        .pieTitleText,
        text.pieTitleText {
          fill: #212121 !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1.25px;
        }
        
        .legendText,
        text.legendText,
        text.legend {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 400;
        }
        
        .slice,
        path.slice,
        svg[aria-roledescription="pie"] path {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24)) !important;
        }
        
        /* Pie slices with Material palette */
        .pieChart .slice0 { fill: #6200ee !important; }
        .pieChart .slice1 { fill: #03dac6 !important; }
        .pieChart .slice2 { fill: #b00020 !important; }
        .pieChart .slice3 { fill: #018786 !important; }
        .pieChart .slice4 { fill: #3700b3 !important; }
        .pieChart .slice5 { fill: #cf6679 !important; }
        
        /* Journey diagram */
        .section0, .section1, .section2 {
          fill: #ffffff !important;
          stroke: none !important;
          rx: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.24));
        }
        
        .journey-section rect {
          rx: 4px !important;
        }
        
        /* Global text styling */
        text {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
        }
        
        /* XYChart styles - Material data visualization */
        .line-plot-0 path {
          stroke: #6200ee !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
        }
        .line-plot-1 path {
          stroke: #03dac6 !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
        }
        .line-plot-2 path {
          stroke: #b00020 !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
        }
        .bar-plot-0 rect {
          fill: #6200ee !important;
          stroke: none !important;
          rx: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(98, 0, 238, 0.15))
            drop-shadow(0 1px 2px rgba(98, 0, 238, 0.25));
        }
        .bar-plot-1 rect {
          fill: #03dac6 !important;
          stroke: none !important;
          rx: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(3, 218, 198, 0.15))
            drop-shadow(0 1px 2px rgba(3, 218, 198, 0.25));
        }
        .bar-plot-2 rect {
          fill: #b00020 !important;
          stroke: none !important;
          rx: 4px !important;
          filter: 
            drop-shadow(0 1px 3px rgba(176, 0, 32, 0.15))
            drop-shadow(0 1px 2px rgba(176, 0, 32, 0.25));
        }
        .ticks path {
          stroke: #e0e0e0 !important;
        }
        .chart-title text {
          fill: #212121 !important;
          font-weight: 500 !important;
          font-size: 18px !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          text-transform: uppercase;
          letter-spacing: 1.25px;
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: rgba(0, 0, 0, 0.60) !important;
          font-size: 13px !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-size: 14px !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 500;
        }
        .legend text {
          fill: rgba(0, 0, 0, 0.87) !important;
          font-size: 13px !important;
          font-family: "Roboto", "Noto Sans SC", -apple-system, sans-serif;
        }
      `
    },
    bgClass: 'bg-white',
    bgStyle: {
      backgroundColor: '#ffffff',
    }
  },
  aurora: {
    name: 'Aurora',
    annotationColors: {
      primary: '#f093fb', // Soft pink
      secondary: '#667eea', // Soft purple
      text: '#ffffff', // White
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        darkMode: true,
        background: '#667eea',
        primaryColor: 'rgba(255, 255, 255, 0.15)', // Glass-like
        primaryTextColor: '#ffffff',
        primaryBorderColor: 'rgba(255, 255, 255, 0.3)',
        lineColor: 'rgba(255, 255, 255, 0.6)',
        secondaryColor: 'rgba(255, 255, 255, 0.15)',
        tertiaryColor: 'rgba(255, 255, 255, 0.15)',
        fontFamily: '"Inter", "Noto Sans SC", -apple-system, sans-serif',
        fontSize: '15px',
      },
      themeCSS: `
        /* Aurora - Dreamy gradient style with glowing effects */
        
        /* Flowchart nodes - Glass morphism with glow */
        .node rect, .node circle, .node polygon {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          backdrop-filter: blur(10px);
          filter: 
            drop-shadow(0 0 20px rgba(246, 147, 251, 0.4))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }
        
        .node .label {
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          fill: #ffffff !important;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        /* Connection lines - Soft glow */
        .edgePath .path {
          stroke: rgba(255, 255, 255, 0.7) !important;
          stroke-width: 2px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 0 8px rgba(246, 147, 251, 0.5));
        }
        
        .arrowheadPath {
          fill: rgba(255, 255, 255, 0.7) !important;
          stroke: rgba(255, 255, 255, 0.7) !important;
          filter: drop-shadow(0 0 8px rgba(246, 147, 251, 0.5));
        }
        
        .edgeLabel {
          background-color: rgba(102, 126, 234, 0.8) !important;
          color: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
        
        /* Sequence Diagram - Glass cards */
        .actor rect,
        g.actor rect,
        rect.actor {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: 
            drop-shadow(0 0 20px rgba(246, 147, 251, 0.4))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) !important;
        }
        
        .actor {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
        }
        
        g.actor {
          filter: 
            drop-shadow(0 0 20px rgba(246, 147, 251, 0.4))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }
        
        .actor text {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .actor-line {
          stroke: rgba(255, 255, 255, 0.5) !important;
          stroke-width: 2px !important;
          stroke-dasharray: 6 4 !important;
          filter: drop-shadow(0 0 5px rgba(246, 147, 251, 0.3));
        }
        
        .activation0, .activation1, .activation2,
        rect.activation0, rect.activation1, rect.activation2 {
          fill: rgba(246, 147, 251, 0.2) !important;
          stroke: rgba(255, 255, 255, 0.5) !important;
          stroke-width: 2px !important;
          filter: 
            drop-shadow(0 0 15px rgba(246, 147, 251, 0.5))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) !important;
        }
        
        .messageLine0, .messageLine1 {
          stroke: rgba(255, 255, 255, 0.7) !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(246, 147, 251, 0.5));
        }
        
        .messageText {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        #arrowhead path, .arrowheadPath {
          fill: rgba(255, 255, 255, 0.7) !important;
          stroke: rgba(255, 255, 255, 0.7) !important;
          filter: drop-shadow(0 0 8px rgba(246, 147, 251, 0.5));
        }
        
        /* Note boxes - Dreamy glow */
        .note,
        rect.note,
        g.note rect {
          fill: rgba(246, 147, 251, 0.2) !important;
          stroke: rgba(255, 255, 255, 0.5) !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: 
            drop-shadow(0 0 25px rgba(246, 147, 251, 0.6))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) !important;
        }
        
        .noteText,
        text.noteText {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
        }
        
        /* Loop/Alt/Opt boxes */
        .labelBox,
        rect.labelBox {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: 
            drop-shadow(0 0 20px rgba(102, 126, 234, 0.4))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) !important;
        }
        
        .labelText, .loopText,
        text.labelText, text.loopText {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .loopLine,
        path.loopLine {
          stroke: rgba(255, 255, 255, 0.5) !important;
          stroke-width: 2px !important;
        }
        
        /* Cluster/Subgraph styling */
        .cluster rect {
          fill: rgba(255, 255, 255, 0.1) !important;
          stroke: rgba(255, 255, 255, 0.3) !important;
          stroke-width: 2px !important;
          stroke-dasharray: 8 4 !important;
          rx: 20px !important;
          ry: 20px !important;
          filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.3));
        }
        
        .cluster text {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 700;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
        }
        
        /* Class Diagram - Glass cards */
        .classGroup rect,
        g.classGroup rect,
        g[id*="classid"] rect,
        g[id^="classid"] rect,
        svg[aria-roledescription="classDiagram"] g.classGroup rect {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: 
            drop-shadow(0 0 20px rgba(246, 147, 251, 0.4))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) !important;
        }
        
        .classLabel .label,
        .classLabel text,
        .class-label text {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .relationshipLine,
        .relation {
          stroke: rgba(255, 255, 255, 0.6) !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(246, 147, 251, 0.4));
        }
        
        .divider {
          stroke: rgba(255, 255, 255, 0.3) !important;
          stroke-width: 1px !important;
        }
        
        /* State diagram - Dreamy states */
        g[id*="state-"] rect,
        g[id^="state-"] rect,
        g.stateGroup rect,
        .statediagram-state rect,
        .statediagram-state .state-inner,
        g[class*="state"] rect,
        svg[aria-roledescription="statediagram"] g rect:not(circle):not([id*="start"]):not([id*="end"]) {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: 
            drop-shadow(0 0 20px rgba(246, 147, 251, 0.4))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) !important;
        }
        
        .start-state circle,
        .end-state circle,
        circle[id*="start"],
        circle[id*="end"] {
          fill: rgba(246, 147, 251, 0.8) !important;
          stroke: rgba(255, 255, 255, 0.6) !important;
          stroke-width: 2px !important;
          filter: 
            drop-shadow(0 0 30px rgba(246, 147, 251, 0.9))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }
        
        .statediagram-state circle {
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
        }
        
        .stateLabel text,
        .statediagram-state text,
        .state-note text {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .transition,
        path.transition {
          stroke: rgba(255, 255, 255, 0.6) !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(246, 147, 251, 0.4));
        }
        
        g.stateGroup.statediagram-cluster rect {
          fill: rgba(255, 255, 255, 0.1) !important;
          rx: 20px !important;
          ry: 20px !important;
        }
        
        /* ER Diagram - Glass entities */
        .er.entityBox,
        .entityBox,
        g[id*="entity-"] rect,
        g[id^="entity"] rect,
        svg[aria-roledescription="er"] .entityBox,
        svg[aria-roledescription="er"] g rect {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: 
            drop-shadow(0 0 20px rgba(246, 147, 251, 0.4))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1)) !important;
        }
        
        .er.relationshipLabelBox,
        .relationshipLabelBox {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 12px !important;
          ry: 12px !important;
          filter: 
            drop-shadow(0 0 15px rgba(102, 126, 234, 0.4))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .er.entityLabel,
        .er.relationshipLabel,
        .entityLabel text,
        .relationshipLabel {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .er .relationshipLine,
        .relationshipLine {
          stroke: rgba(255, 255, 255, 0.6) !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(246, 147, 251, 0.4));
        }
        
        .er .attributeBoxEven,
        .er .attributeBoxOdd {
          fill: rgba(255, 255, 255, 0.1) !important;
          stroke: none !important;
        }
        
        /* Gantt chart - Dreamy timeline */
        .titleText,
        text.titleText {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 700;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
        }
        
        .sectionTitle,
        text.sectionTitle {
          fill: rgba(255, 255, 255, 0.9) !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .taskText, 
        .taskTextOutsideRight, 
        .taskTextOutsideLeft,
        text.taskText {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
        
        .task0, .task1, .task2, .task3,
        rect.task,
        rect[class*="task"],
        svg[aria-roledescription="gantt"] rect.task,
        g.task rect {
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 8px !important;
          filter: 
            drop-shadow(0 0 15px rgba(246, 147, 251, 0.4))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) !important;
        }
        
        .taskText0, .taskText1, .taskText2, .taskText3 {
          fill: #ffffff !important;
        }
        
        .grid .tick line {
          stroke: rgba(255, 255, 255, 0.2) !important;
        }
        
        .grid path {
          stroke: none !important;
        }
        
        /* Pie chart - Aurora slices */
        .pieCircle,
        circle.pieCircle {
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
        }
        
        .pieTitleText,
        text.pieTitleText {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }
        
        .legendText,
        text.legendText,
        text.legend {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
        
        .slice,
        path.slice,
        svg[aria-roledescription="pie"] path {
          stroke: rgba(255, 255, 255, 0.3) !important;
          stroke-width: 2px !important;
          filter: 
            drop-shadow(0 0 15px rgba(246, 147, 251, 0.4))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) !important;
        }
        
        /* Journey diagram */
        .section0, .section1, .section2 {
          fill: rgba(255, 255, 255, 0.15) !important;
          stroke: rgba(255, 255, 255, 0.4) !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          filter: 
            drop-shadow(0 0 20px rgba(246, 147, 251, 0.4))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }
        
        .journey-section rect {
          rx: 16px !important;
        }
        
        /* Global text styling */
        text {
          fill: #ffffff !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
        
        /* XYChart styles - Gradient data visualization */
        .line-plot-0 path {
          stroke: rgba(246, 147, 251, 0.9) !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 0 10px rgba(246, 147, 251, 0.6));
        }
        .line-plot-1 path {
          stroke: rgba(255, 255, 255, 0.8) !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }
        .line-plot-2 path {
          stroke: rgba(102, 126, 234, 0.9) !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.6));
        }
        .bar-plot-0 rect {
          fill: rgba(246, 147, 251, 0.3) !important;
          stroke: rgba(246, 147, 251, 0.6) !important;
          stroke-width: 2px !important;
          rx: 8px !important;
          filter: 
            drop-shadow(0 0 15px rgba(246, 147, 251, 0.5))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        .bar-plot-1 rect {
          fill: rgba(255, 255, 255, 0.2) !important;
          stroke: rgba(255, 255, 255, 0.5) !important;
          stroke-width: 2px !important;
          rx: 8px !important;
          filter: 
            drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        .bar-plot-2 rect {
          fill: rgba(102, 126, 234, 0.3) !important;
          stroke: rgba(102, 126, 234, 0.6) !important;
          stroke-width: 2px !important;
          rx: 8px !important;
          filter: 
            drop-shadow(0 0 15px rgba(102, 126, 234, 0.5))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        .ticks path {
          stroke: rgba(255, 255, 255, 0.3) !important;
        }
        .chart-title text {
          fill: #ffffff !important;
          font-weight: 700 !important;
          font-size: 18px !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: rgba(255, 255, 255, 0.8) !important;
          font-size: 13px !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: #ffffff !important;
          font-size: 14px !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          font-weight: 600;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
        }
        .legend text {
          fill: #ffffff !important;
          font-size: 13px !important;
          font-family: "Inter", "Noto Sans SC", -apple-system, sans-serif;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }
      `
    },
    bgClass: 'bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]',
    bgStyle: {
      backgroundColor: '#667eea',
      backgroundImage: `
        linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%),
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(246, 147, 251, 0.15) 0%, transparent 50%)
      `,
    }
  },
  win95: {
    name: 'Windows 95',
    annotationColors: {
      primary: '#000080', // Windows Blue
      secondary: '#008080', // Windows Teal
      text: '#000000', // Black
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#008080', // Classic teal desktop
        primaryColor: '#c0c0c0', // Win95 gray
        primaryTextColor: '#000000', // Black text
        primaryBorderColor: '#808080', // Gray border
        lineColor: '#000000', // Black lines
        secondaryColor: '#c0c0c0',
        tertiaryColor: '#c0c0c0',
        fontFamily: '"MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif',
        fontSize: '13px',
      },
      themeCSS: `
        /* Windows 95/98 - Retro 3D interface style */
        
        /* Flowchart nodes - Classic Win95 3D button */
        .node rect, .node polygon {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          ry: 0px !important;
          /* Classic Win95 3D border effect */
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #000000)
            drop-shadow(0 -2px 0 #000000)
            drop-shadow(3px 3px 0 #808080);
        }
        
        .node circle {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: 
            drop-shadow(1px 1px 0 #808080);
        }

        g line.actor-line, g path.actor-line {
          stroke: #030303 !important;
          stroke-width: 2px !important;
          stroke-dasharray: 4 2 !important;
        }
        
        .node .label {
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
          fill: #000000 !important;
          font-size: 13px;
        }
        
        /* Connection lines - Simple black lines */
        .edgePath .path {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .arrowheadPath {
          fill: #000000 !important;
          stroke: #000000 !important;
        }
        
        .edgeLabel {
          color: #000000 !important;
        }
        
        .edgeLabel rect {
          fill: #c0c0c0 !important;
          stroke: #000000 !important;
          stroke-width: 1px !important;
          rx: 0px !important;
          /* Win95 3D inset border effect */
          filter: 
            drop-shadow(1px 0 0 #808080)
            drop-shadow(0 1px 0 #808080)
            drop-shadow(-1px 0 0 #ffffff)
            drop-shadow(0 -1px 0 #ffffff);
        }
        
        .edgeLabel .label,
        .edgeLabel text {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-size: 12px;
          font-weight: 400;
        }
        
        /* Sequence Diagram - Win95 window style */
        .actor rect,
        g.actor rect,
        rect.actor {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          ry: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #000000)
            drop-shadow(0 -2px 0 #000000)
            drop-shadow(3px 3px 0 #808080) !important;
        }
        
        .actor {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
        }
        
        g.actor {
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #000000)
            drop-shadow(0 -2px 0 #000000)
            drop-shadow(3px 3px 0 #808080);
        }
        
        .actor text {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
        }
        
        .actor-line {
          stroke: #808080 !important;
          stroke-width: 1px !important;
          stroke-dasharray: 4 2 !important;
        }
        
        .activation0, .activation1, .activation2,
        rect.activation0, rect.activation1, rect.activation2 {
          fill: #c0c0c0 !important;
          stroke: #808080 !important;
          stroke-width: 2px !important;
          filter: 
            drop-shadow(1px 1px 0 #808080) !important;
        }
        
        .messageLine0, .messageLine1 {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .messageText {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
          font-size: 12px;
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #000000 !important;
          stroke: #000000 !important;
        }
        
        /* Note boxes - Yellow sticky note style */
        .note,
        rect.note,
        g.note rect {
          fill: #ffff99 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          ry: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #808080)
            drop-shadow(0 -2px 0 #808080)
            drop-shadow(3px 3px 0 #666666) !important;
        }
        
        .noteText,
        text.noteText {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
        }
        
        /* Loop/Alt/Opt boxes - Classic window style */
        .labelBox,
        rect.labelBox {
          fill: #000080 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          ry: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #000000)
            drop-shadow(0 -2px 0 #000000)
            drop-shadow(3px 3px 0 #808080) !important;
        }
        
        .labelText, .loopText,
        text.labelText, text.loopText {
          fill: #ffffff !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 700;
        }
        
        .loopLine,
        path.loopLine {
          stroke: #000080 !important;
          stroke-width: 3px !important;
        }
        
        .node.statediagram-state:has(.label-container) {
          filter: drop-shadow(2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(-2px 0 0 #000000) drop-shadow(0 -2px 0 #000000) drop-shadow(3px 3px 0 #808080);
        }

        /* Cluster/Subgraph styling - Window frame */
        .cluster rect {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          ry: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #000000)
            drop-shadow(0 -2px 0 #000000)
            drop-shadow(3px 3px 0 #808080);
        }
        
        .cluster text {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 700;
        }
        
        /* Class Diagram - Win95 cards */
        .classGroup rect,
        g.classGroup rect,
        g[id*="classid"] rect,
        g[id^="classid"] rect,
        svg[aria-roledescription="classDiagram"] g.classGroup rect {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          ry: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #000000)
            drop-shadow(0 -2px 0 #000000)
            drop-shadow(3px 3px 0 #808080) !important;
        }
        
        .classLabel .label,
        .classLabel text,
        .class-label text {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
        }
        
        .relationshipLine,
        .relation {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .divider {
          stroke: #808080 !important;
          stroke-width: 1px !important;
        }
        
        /* State diagram - Win95 buttons */
        g[id*="state-"] rect,
        g[id^="state-"] rect,
        g.stateGroup rect,
        .statediagram-state rect,
        .statediagram-state .state-inner,
        g[class*="state"] rect,
        svg[aria-roledescription="statediagram"] g rect:not(circle):not([id*="start"]):not([id*="end"]) {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          ry: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #000000)
            drop-shadow(0 -2px 0 #000000)
            drop-shadow(3px 3px 0 #808080) !important;
        }
        
        .start-state circle,
        .end-state circle,
        circle[id*="start"],
        circle[id*="end"] {
          fill: #000080 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(2px 2px 0 #808080);
        }
        
        .statediagram-state circle {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
        }

        .edgeLabel p {
          background-color: #9c9c9c !important;
        }

        .node.default:has(.attribute-type), .node.default:has(.annotation-group) {
          filter: drop-shadow(2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(-2px 0 0 #000000) drop-shadow(0 -2px 0 #000000) drop-shadow(3px 3px 0 #808080);
        }
        
        .stateLabel text,
        .statediagram-state text,
        .state-note text {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
        }
        
        .transition,
        path.transition {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        g.stateGroup.statediagram-cluster rect {
          fill: #c0c0c0 !important;
          rx: 0px !important;
          ry: 0px !important;
        }
        
        /* ER Diagram - Win95 entities */
        .er.entityBox,
        .entityBox,
        g[id*="entity-"] rect,
        g[id^="entity"] rect,
        svg[aria-roledescription="er"] .entityBox,
        svg[aria-roledescription="er"] g rect {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          ry: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #000000)
            drop-shadow(0 -2px 0 #000000)
            drop-shadow(3px 3px 0 #808080) !important;
        }
        
        .er.relationshipLabelBox,
        .relationshipLabelBox {
          fill: #c0c0c0 !important;
          stroke: #808080 !important;
          stroke-width: 1px !important;
          rx: 0px !important;
          ry: 0px !important;
        }
        
        .er.entityLabel,
        .er.relationshipLabel,
        .entityLabel text,
        .relationshipLabel {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
        }
        
        .er .relationshipLine,
        .relationshipLine {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .er .attributeBoxEven,
        .er .attributeBoxOdd {
          fill: #c0c0c0 !important;
          stroke: #808080 !important;
          stroke-width: 1px !important;
        }
        
        /* Gantt chart - Win95 timeline */
        .titleText,
        text.titleText {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 700;
        }
        
        .sectionTitle,
        text.sectionTitle {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 700;
        }
        
        .taskText, 
        .taskTextOutsideRight, 
        .taskTextOutsideLeft,
        text.taskText {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
        }
        
        .task0, .task1, .task2, .task3,
        rect.task,
        rect[class*="task"],
        svg[aria-roledescription="gantt"] rect.task,
        g.task rect {
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          filter: 
            drop-shadow(1px 0 0 #ffffff)
            drop-shadow(0 1px 0 #ffffff)
            drop-shadow(-1px 0 0 #808080)
            drop-shadow(0 -1px 0 #808080) !important;
        }
        
        .taskText0, .taskText1, .taskText2, .taskText3 {
          fill: #000000 !important;
        }
        
        .grid .tick line {
          stroke: #808080 !important;
        }
        
        .grid path {
          stroke: #808080 !important;
          stroke-width: 1px !important;
        }
        
        /* Pie chart - Win95 style */
        .pieCircle,
        circle.pieCircle {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .pieTitleText,
        text.pieTitleText {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 700;
        }
        
        .legendText,
        text.legendText,
        text.legend {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 400;
        }
        
        .slice,
        path.slice,
        svg[aria-roledescription="pie"] path {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        /* Journey diagram */
        .section0, .section1, .section2 {
          fill: #c0c0c0 !important;
          stroke: #ffffff !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-2px 0 0 #808080)
            drop-shadow(0 -2px 0 #808080);
        }
        
        .journey-section rect {
          rx: 0px !important;
        }
        
        /* Global text styling */
        text {
          fill: #000000 !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
        }
        
        /* XYChart styles - Win95 data visualization */
        .line-plot-0 path {
          stroke: #000080 !important;
          stroke-width: 3px !important;
        }
        .line-plot-1 path {
          stroke: #800000 !important;
          stroke-width: 3px !important;
        }
        .line-plot-2 path {
          stroke: #008080 !important;
          stroke-width: 3px !important;
        }
        .bar-plot-0 rect {
          fill: #0000ff !important;
          stroke: #000080 !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-1px 0 0 #000080)
            drop-shadow(0 -1px 0 #000080);
        }
        .bar-plot-1 rect {
          fill: #ff0000 !important;
          stroke: #800000 !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-1px 0 0 #800000)
            drop-shadow(0 -1px 0 #800000);
        }
        .bar-plot-2 rect {
          fill: #00ffff !important;
          stroke: #008080 !important;
          stroke-width: 2px !important;
          rx: 0px !important;
          filter: 
            drop-shadow(2px 0 0 #ffffff)
            drop-shadow(0 2px 0 #ffffff)
            drop-shadow(-1px 0 0 #008080)
            drop-shadow(0 -1px 0 #008080);
        }
        .ticks path {
          stroke: #808080 !important;
        }
        .chart-title text {
          fill: #000000 !important;
          font-weight: 700 !important;
          font-size: 14px !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
        }
        .left-axis .label text, .bottom-axis .label text {
          fill: #000000 !important;
          font-size: 12px !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
        }
        .left-axis .title text, .bottom-axis .title text {
          fill: #000000 !important;
          font-size: 13px !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
          font-weight: 700;
        }
        .legend text {
          fill: #000000 !important;
          font-size: 12px !important;
          font-family: "MS Sans Serif", "Microsoft YaHei", Tahoma, sans-serif;
        }
      `
    },
    bgClass: 'bg-[#008080]',
    bgStyle: {
      backgroundColor: '#008080',
      backgroundImage: `
        linear-gradient(45deg, #008080 25%, transparent 25%),
        linear-gradient(-45deg, #008080 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #008080 75%),
        linear-gradient(-45deg, transparent 75%, #008080 75%)
      `,
      backgroundSize: '2px 2px',
      backgroundPosition: '0 0, 0 1px, 1px -1px, -1px 0px',
    }
  },
  doodle: {
    name: 'Playful Doodle',
    annotationColors: {
      primary: '#9333ea', // Purple
      secondary: '#ec4899', // Pink
      text: '#000000', // Black
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#ffeef8',
        primaryColor: '#ffdff6', // Light pink
        primaryTextColor: '#000000',
        primaryBorderColor: '#000000',
        lineColor: '#000000',
        secondaryColor: '#dff4ff', // Light blue
        tertiaryColor: '#f0e7ff', // Light purple
        fontFamily: '"Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif',
        fontSize: '15px',
      },
      themeCSS: `
        /* Playful Doodle Style - Hand-drawn whimsical design */
        
        /* Flowchart nodes - Soft colors with hand-drawn borders */
        .node rect, .node polygon {
          fill: #ffdff6 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 20px !important;
          ry: 20px !important;
          filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.2));
        }
        
        .node circle {
          fill: #ffdff6 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(3px 3px 0px rgba(0,0,0,0.15));
        }
        
        .node .label {
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
          fill: #000000 !important;
          font-size: 15px;
        }
        
        /* Alternate node colors - Doodle style palette */
        .node:nth-child(2n) rect,
        .node:nth-child(2n) circle,
        .node:nth-child(2n) polygon {
          fill: #dff4ff !important;
        }
        
        .node:nth-child(3n) rect,
        .node:nth-child(3n) circle,
        .node:nth-child(3n) polygon {
          fill: #f0e7ff !important;
        }
        
        .node:nth-child(5n) rect,
        .node:nth-child(5n) circle,
        .node:nth-child(5n) polygon {
          fill: #fff4e6 !important;
        }
        
        .node:nth-child(7n) rect,
        .node:nth-child(7n) circle,
        .node:nth-child(7n) polygon {
          fill: #e7f9f5 !important;
        }
        
        /* Connection lines - Hand-drawn style */
        .edgePath .path {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .arrowheadPath {
          fill: #000000 !important;
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .edgeLabel {
          color: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-size: 14px;
          font-weight: 600;
        }
        
        .edgeLabel rect {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 2px !important;
          rx: 12px !important;
          filter: drop-shadow(2px 2px 0px rgba(0,0,0,0.1));
        }
        
        /* Sequence Diagram - Doodle style */
        .actor {
          fill: #ffdff6 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 20px !important;
          ry: 20px !important;
          filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.2));
        }
        
        .actor:nth-child(2n) {
          fill: #dff4ff !important;
        }
        
        .actor:nth-child(3n) {
          fill: #f0e7ff !important;
        }
        
        .actor:nth-child(4n) {
          fill: #fff4e6 !important;
        }
        
        .actor text {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
        }
        
        .actor-line, g line.actor-line, g path.actor-line {
          stroke: #000000 !important;
          stroke-width: 2px !important;
          stroke-dasharray: 6 3 !important;
        }
        
        .activation0, .activation1, .activation2 {
          fill: #f0e7ff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 8px !important;
          filter: drop-shadow(3px 3px 0px rgba(0,0,0,0.15));
        }
        
        .messageLine0, .messageLine1 {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
        }
        
        .messageText {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
          font-size: 14px;
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #000000 !important;
          stroke: #000000 !important;
        }
        
        /* Note boxes - Soft yellow */
        .note {
          fill: #fff4e6 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 15px !important;
          ry: 15px !important;
          filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.2));
        }
        
        .noteText {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
        }
        
        /* Loop/Alt/Opt boxes - Soft purple */
        .labelBox {
          fill: #f0e7ff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 15px !important;
          ry: 15px !important;
          filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.2));
        }
        
        .labelText, .loopText {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
        }
        
        .loopLine {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 15px !important;
        }
        
        /* Cluster/Subgraph styling - Soft blue */
        .cluster rect {
          fill: #dff4ff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 25px !important;
          ry: 25px !important;
          filter: drop-shadow(5px 5px 0px rgba(0,0,0,0.15));
        }
        
        .cluster text {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
        }
        
        /* State diagram */
        .statediagram-state rect,
        .statediagram-state .state-inner {
          fill: #ffdff6 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 20px !important;
          filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.2));
        }
        
        .statediagram-state:nth-child(2n) rect,
        .statediagram-state:nth-child(2n) .state-inner {
          fill: #dff4ff !important;
        }
        
        .statediagram-state:nth-child(3n) rect,
        .statediagram-state:nth-child(3n) .state-inner {
          fill: #f0e7ff !important;
        }
        
        .statediagram-state:nth-child(5n) rect,
        .statediagram-state:nth-child(5n) .state-inner {
          fill: #fff4e6 !important;
        }
        
        .stateLabel text {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
        }
        
        .transition {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        /* Class Diagram */
        .classGroup rect {
          fill: #ffdff6 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 20px !important;
          filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.2));
        }
        
        .classGroup:nth-child(2n) rect {
          fill: #dff4ff !important;
        }
        
        .classGroup:nth-child(3n) rect {
          fill: #f0e7ff !important;
        }
        
        .classGroup line {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .classLabel .label {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
        }
        
        .classLabel .box {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 20px !important;
        }
        
        .relationshipLine {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .relationshipLabelBox {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 2px !important;
          rx: 10px !important;
        }
        
        /* ER Diagram */
        .er.entityBox {
          fill: #dff4ff !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 20px !important;
          filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.2));
        }
        
        .er.entityBox:nth-child(2n) {
          fill: #ffdff6 !important;
        }
        
        .er.entityBox:nth-child(3n) {
          fill: #f0e7ff !important;
        }
        
        .er.entityLabel,
        .er.relationshipLabel {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
        }
        
        .er .relationshipLine {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .er .relationshipLabelBox {
          fill: #ffffff !important;
          stroke: #000000 !important;
          stroke-width: 2px !important;
          rx: 10px !important;
        }
        
        /* Gantt Chart */
        .titleText {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
          font-size: 20px;
        }
        
        .grid .tick text {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-size: 13px;
        }
        
        .grid line {
          stroke: #e0e0e0 !important;
          stroke-width: 1px !important;
          opacity: 0.5;
        }
        
        .taskText {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
        }
        
        .taskTextOutsideRight,
        .taskTextOutsideLeft {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
        }
        
        .task0, .task1, .task2, .task3 {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 12px !important;
        }
        
        .task0 {
          fill: #ffdff6 !important;
        }
        
        .task1 {
          fill: #dff4ff !important;
        }
        
        .task2 {
          fill: #f0e7ff !important;
        }
        
        .task3 {
          fill: #fff4e6 !important;
        }
        
        .section0, .section1, .section2, .section3 {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
          font-size: 14px;
        }
        
        .sectionTitle0, .sectionTitle1, .sectionTitle2, .sectionTitle3 {
          fill: #ffffff !important;
        }
        
        .done0, .done1, .done2, .done3 {
          stroke: #22c55e !important;
          stroke-width: 3px !important;
          fill: #bbf7d0 !important;
        }
        
        .active0, .active1, .active2, .active3 {
          stroke: #3b82f6 !important;
          stroke-width: 3px !important;
          fill: #bfdbfe !important;
        }
        
        .crit0, .crit1, .crit2, .crit3 {
          stroke: #ef4444 !important;
          stroke-width: 3px !important;
          fill: #fecaca !important;
        }
        
        .activeCrit0, .activeCrit1, .activeCrit2, .activeCrit3 {
          stroke: #9333ea !important;
          stroke-width: 3px !important;
          fill: #e9d5ff !important;
        }
        
        /* Pie Chart */
        .pieCircle {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .pieTitleText {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
          font-size: 20px;
        }
        
        .slice {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(2px 2px 0px rgba(0,0,0,0.1));
        }
        
        .slice:nth-child(1) {
          fill: #ffdff6 !important;
        }
        
        .slice:nth-child(2) {
          fill: #dff4ff !important;
        }
        
        .slice:nth-child(3) {
          fill: #f0e7ff !important;
        }
        
        .slice:nth-child(4) {
          fill: #fff4e6 !important;
        }
        
        .slice:nth-child(5) {
          fill: #e7f9f5 !important;
        }
        
        .slice:nth-child(6) {
          fill: #fef3c7 !important;
        }
        
        .pieOuterCircle {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          fill: none;
        }
        
        .legend text {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
          font-size: 14px;
        }
        
        .legend rect {
          stroke: #000000 !important;
          stroke-width: 2px !important;
          rx: 6px !important;
        }
        
        /* Journey Diagram */
        .journey-section {
          stroke: #000000 !important;
          stroke-width: 3px !important;
          fill: #f0e7ff !important;
          rx: 15px !important;
        }
        
        .task-section {
          fill: #ffdff6 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 12px !important;
        }
        
        .task-section:nth-child(2n) {
          fill: #dff4ff !important;
        }
        
        .task-section:nth-child(3n) {
          fill: #fff4e6 !important;
        }
        
        /* XYChart styles - Doodle theme colors */
        .line-plot-0 path {
          stroke: #ec4899 !important;
          stroke-width: 4px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .line-plot-1 path {
          stroke: #3b82f6 !important;
          stroke-width: 4px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .line-plot-2 path {
          stroke: #9333ea !important;
          stroke-width: 4px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .bar-plot-0 rect {
          fill: #fce7f3 !important;
          stroke: #ec4899 !important;
          stroke-width: 3px !important;
          rx: 8px !important;
        }
        
        .bar-plot-1 rect {
          fill: #dbeafe !important;
          stroke: #3b82f6 !important;
          stroke-width: 3px !important;
          rx: 8px !important;
        }
        
        .bar-plot-2 rect {
          fill: #f3e8ff !important;
          stroke: #9333ea !important;
          stroke-width: 3px !important;
          rx: 8px !important;
        }
        
        .ticks path {
          stroke: #000000 !important;
          stroke-width: 2px !important;
        }
        
        .chart-title text {
          fill: #000000 !important;
          font-weight: 700 !important;
          font-size: 20px !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
        }
        
        .left-axis .label text, .bottom-axis .label text {
          fill: #000000 !important;
          font-size: 14px !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
        }
        
        .left-axis .title text, .bottom-axis .title text {
          fill: #000000 !important;
          font-size: 16px !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 700;
        }
        
        .legend text {
          fill: #000000 !important;
          font-size: 14px !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
        }
        
        .legend rect {
          stroke: #000000 !important;
          stroke-width: 2px !important;
          rx: 6px !important;
        }
        
        /* Git Graph */
        .commit-id, .commit-msg, .branch-label {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
        }
        
        .commit {
          stroke: #000000 !important;
          stroke-width: 3px !important;
        }
        
        .commit0 {
          fill: #ffdff6 !important;
        }
        
        .commit1 {
          fill: #dff4ff !important;
        }
        
        .commit2 {
          fill: #f0e7ff !important;
        }
        
        .commit3 {
          fill: #fff4e6 !important;
        }
        
        .commit-highlight-outer {
          fill: #fbbf24;
          opacity: 0.3;
        }
        
        .commit-highlight-inner {
          fill: #fbbf24;
          opacity: 0.5;
          stroke: #f59e0b;
        }
        
        .branch path {
          stroke-width: 3px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .branch.branch0 {
          stroke: #ec4899 !important;
        }
        
        .branch.branch1 {
          stroke: #3b82f6 !important;
        }
        
        .branch.branch2 {
          stroke: #9333ea !important;
        }
        
        .branch.branch3 {
          stroke: #f59e0b !important;
        }
        
        /* Timeline */
        .timeline-event {
          fill: #ffdff6 !important;
          stroke: #000000 !important;
          stroke-width: 3px !important;
          rx: 15px !important;
          filter: drop-shadow(3px 3px 0px rgba(0,0,0,0.15));
        }
        
        .timeline-event:nth-child(2n) {
          fill: #dff4ff !important;
        }
        
        .timeline-event:nth-child(3n) {
          fill: #f0e7ff !important;
        }
        
        .timeline-event-text {
          fill: #000000 !important;
          font-family: "Comic Neue", "Comic Sans MS", "Noto Sans SC", cursive, sans-serif;
          font-weight: 600;
        }
      `
    },
    bgClass: 'bg-gradient-to-br from-[#ffeef8] to-[#e0f7ff]',
    bgStyle: {
      background: 'linear-gradient(135deg, #ffeef8 0%, #e0f7ff 100%)',
    }
  },
  organic: {
    name: 'Organic Natural',
    annotationColors: {
      primary: '#6a9c89', // Sage green
      secondary: '#8ba888', // Light sage
      text: '#2d5016', // Dark green
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        background: '#f5f9f3',
        primaryColor: '#d4e7d0', // Light green
        primaryTextColor: '#2d5016', // Dark green for good contrast
        primaryBorderColor: '#8ba888',
        lineColor: '#6a9c89',
        secondaryColor: '#e8f4e5', // Very light green
        tertiaryColor: '#c8d5b9', // Soft sage
        fontFamily: '"Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: '14px',
      },
      themeCSS: `
        /* Organic Natural Style - Soft, flowing, nature-inspired design */
        
        /* Flowchart nodes - Organic shapes with soft colors */
        .node rect, .node polygon {
          fill: #d4e7d0 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .node circle {
          fill: #d4e7d0 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .node .label {
          fill: #2d5016 !important;
          font-weight: 500;
          font-size: 14px;
        }
        
        /* Alternate node colors - Natural palette */
        .node:nth-child(2n) rect,
        .node:nth-child(2n) circle,
        .node:nth-child(2n) polygon {
          fill: #e8f4e5 !important;
          stroke: #8ba888 !important;
        }
        
        .node:nth-child(3n) rect,
        .node:nth-child(3n) circle,
        .node:nth-child(3n) polygon {
          fill: #c8d5b9 !important;
          stroke: #6a9c89 !important;
        }
        
        .node:nth-child(5n) rect,
        .node:nth-child(5n) circle,
        .node:nth-child(5n) polygon {
          fill: #b8cdb1 !important;
          stroke: #5a7c3e !important;
        }
        
        /* Connection lines - Smooth organic flow */
        .edgePath .path {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .arrowheadPath {
          fill: #6a9c89 !important;
          stroke: #6a9c89 !important;
        }
        
        .edgeLabel {
          color: #2d5016 !important;
          font-size: 13px;
          font-weight: 500;
        }
        
        .edgeLabel rect {
          fill: #f5f9f3 !important;
          stroke: #8ba888 !important;
          stroke-width: 1.5px !important;
          rx: 8px !important;
          filter: drop-shadow(1px 1px 2px rgba(45,80,22,0.1));
        }
        
        /* Sequence Diagram - Natural organic style */
        .actor {
          fill: #d4e7d0 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          ry: 16px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .actor:nth-child(2n) {
          fill: #e8f4e5 !important;
        }
        
        .actor:nth-child(3n) {
          fill: #c8d5b9 !important;
        }
        
        .actor:nth-child(4n) {
          fill: #b8cdb1 !important;
        }
        
        .actor text {
          fill: #2d5016 !important;
          font-weight: 600;
        }
        
        .actor-line, g line.actor-line, g path.actor-line {
          stroke: #8ba888 !important;
          stroke-width: 1.5px !important;
          stroke-dasharray: 4 2 !important;
        }
        
        .activation0, .activation1, .activation2 {
          fill: #b8cdb1 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 8px !important;
          filter: drop-shadow(2px 2px 3px rgba(45,80,22,0.12));
        }
        
        .messageLine0, .messageLine1 {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          stroke-linecap: round;
        }
        
        .messageText {
          fill: #2d5016 !important;
          font-weight: 500;
          font-size: 13px;
        }
        
        #arrowhead path, .arrowheadPath {
          fill: #6a9c89 !important;
          stroke: #6a9c89 !important;
        }
        
        /* Note boxes - Soft yellow-green */
        .note {
          fill: #f5f9dc !important;
          stroke: #8ba888 !important;
          stroke-width: 2px !important;
          rx: 12px !important;
          ry: 12px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .noteText {
          fill: #2d5016 !important;
          font-weight: 500;
        }
        
        /* Loop/Alt/Opt boxes */
        .labelBox {
          fill: #c8d5b9 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 12px !important;
          ry: 12px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .labelText, .loopText {
          fill: #2d5016 !important;
          font-weight: 600;
        }
        
        .loopLine {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 12px !important;
        }
        
        /* Cluster/Subgraph styling */
        .cluster rect {
          fill: rgba(200,213,185,0.3) !important;
          stroke: #8ba888 !important;
          stroke-width: 2px !important;
          rx: 20px !important;
          ry: 20px !important;
          stroke-dasharray: 5 3;
          filter: drop-shadow(1px 1px 2px rgba(45,80,22,0.1));
        }
        
        .cluster text {
          fill: #2d5016 !important;
          font-weight: 600;
        }
        
        /* State diagram */
        .statediagram-state rect,
        .statediagram-state .state-inner {
          fill: #d4e7d0 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 16px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .statediagram-state:nth-child(2n) rect,
        .statediagram-state:nth-child(2n) .state-inner {
          fill: #e8f4e5 !important;
        }
        
        .statediagram-state:nth-child(3n) rect,
        .statediagram-state:nth-child(3n) .state-inner {
          fill: #c8d5b9 !important;
        }
        
        .statediagram-state:nth-child(5n) rect,
        .statediagram-state:nth-child(5n) .state-inner {
          fill: #b8cdb1 !important;
        }
        
        .stateLabel text {
          fill: #2d5016 !important;
          font-weight: 600;
        }
        
        .transition {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
        }
        
        /* Class Diagram */
        .classGroup rect {
          fill: #d4e7d0 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 12px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .classGroup:nth-child(2n) rect {
          fill: #e8f4e5 !important;
        }
        
        .classGroup:nth-child(3n) rect {
          fill: #c8d5b9 !important;
        }
        
        .classGroup line {
          stroke: #6a9c89 !important;
          stroke-width: 1.5px !important;
        }
        
        .classLabel .label {
          fill: #2d5016 !important;
          font-weight: 600;
        }
        
        .classLabel .box {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 12px !important;
        }
        
        .relationshipLine {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
        }
        
        .relationshipLabelBox {
          fill: #f5f9f3 !important;
          stroke: #8ba888 !important;
          stroke-width: 1.5px !important;
          rx: 8px !important;
        }
        
        /* ER Diagram */
        .er.entityBox {
          fill: #e8f4e5 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 12px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .er.entityBox:nth-child(2n) {
          fill: #d4e7d0 !important;
        }
        
        .er.entityBox:nth-child(3n) {
          fill: #c8d5b9 !important;
        }
        
        .er.entityLabel,
        .er.relationshipLabel {
          fill: #2d5016 !important;
          font-weight: 600;
        }
        
        .er .relationshipLine {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
        }
        
        .er .relationshipLabelBox {
          fill: #f5f9f3 !important;
          stroke: #8ba888 !important;
          stroke-width: 1.5px !important;
          rx: 8px !important;
        }
        
        /* Gantt Chart */
        .titleText {
          fill: #2d5016 !important;
          font-weight: 700;
          font-size: 20px;
        }
        
        .grid .tick text {
          fill: #2d5016 !important;
          font-size: 12px;
        }
        
        .grid line {
          stroke: #c8d5b9 !important;
          stroke-width: 1px !important;
          opacity: 0.6;
        }
        
        .taskText {
          fill: #2d5016 !important;
          font-weight: 500;
        }
        
        .taskTextOutsideRight,
        .taskTextOutsideLeft {
          fill: #2d5016 !important;
          font-weight: 500;
        }
        
        .task0, .task1, .task2, .task3 {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 10px !important;
        }
        
        .task0 {
          fill: #d4e7d0 !important;
        }
        
        .task1 {
          fill: #e8f4e5 !important;
        }
        
        .task2 {
          fill: #c8d5b9 !important;
        }
        
        .task3 {
          fill: #b8cdb1 !important;
        }
        
        .section0, .section1, .section2, .section3 {
          fill: #2d5016 !important;
          font-weight: 700;
          font-size: 14px;
        }
        
        .sectionTitle0, .sectionTitle1, .sectionTitle2, .sectionTitle3 {
          fill: #f5f9f3 !important;
        }
        
        .done0, .done1, .done2, .done3 {
          stroke: #4d7c0f !important;
          stroke-width: 2px !important;
          fill: #a3e635 !important;
          opacity: 0.8;
        }
        
        .active0, .active1, .active2, .active3 {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          fill: #8ba888 !important;
        }
        
        .crit0, .crit1, .crit2, .crit3 {
          stroke: #b45309 !important;
          stroke-width: 2px !important;
          fill: #fbbf24 !important;
          opacity: 0.8;
        }
        
        .activeCrit0, .activeCrit1, .activeCrit2, .activeCrit3 {
          stroke: #854d0e !important;
          stroke-width: 2px !important;
          fill: #fde047 !important;
        }
        
        /* Pie Chart */
        .pieCircle {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
        }
        
        .pieTitleText {
          fill: #2d5016 !important;
          font-weight: 700;
          font-size: 20px;
        }
        
        .slice {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(1px 1px 2px rgba(45,80,22,0.1));
        }
        
        .slice:nth-child(1) {
          fill: #d4e7d0 !important;
        }
        
        .slice:nth-child(2) {
          fill: #e8f4e5 !important;
        }
        
        .slice:nth-child(3) {
          fill: #c8d5b9 !important;
        }
        
        .slice:nth-child(4) {
          fill: #b8cdb1 !important;
        }
        
        .slice:nth-child(5) {
          fill: #a8c5a1 !important;
        }
        
        .slice:nth-child(6) {
          fill: #8ba888 !important;
        }
        
        .pieOuterCircle {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          fill: none;
        }
        
        .legend text {
          fill: #2d5016 !important;
          font-weight: 500;
          font-size: 13px;
        }
        
        .legend rect {
          stroke: #6a9c89 !important;
          stroke-width: 1.5px !important;
          rx: 4px !important;
        }
        
        /* Journey Diagram */
        .journey-section {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          fill: #c8d5b9 !important;
          rx: 12px !important;
        }
        
        .task-section {
          fill: #d4e7d0 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 10px !important;
        }
        
        .task-section:nth-child(2n) {
          fill: #e8f4e5 !important;
        }
        
        .task-section:nth-child(3n) {
          fill: #b8cdb1 !important;
        }
        
        /* XYChart styles - Natural organic colors */
        .line-plot-0 path {
          stroke: #6a9c89 !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .line-plot-1 path {
          stroke: #5a7c3e !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .line-plot-2 path {
          stroke: #7ba05b !important;
          stroke-width: 3px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .bar-plot-0 rect {
          fill: #d4e7d0 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 6px !important;
        }
        
        .bar-plot-1 rect {
          fill: #c8d5b9 !important;
          stroke: #5a7c3e !important;
          stroke-width: 2px !important;
          rx: 6px !important;
        }
        
        .bar-plot-2 rect {
          fill: #b8cdb1 !important;
          stroke: #7ba05b !important;
          stroke-width: 2px !important;
          rx: 6px !important;
        }
        
        .ticks path {
          stroke: #6a9c89 !important;
          stroke-width: 1.5px !important;
        }
        
        .chart-title text {
          fill: #2d5016 !important;
          font-weight: 700 !important;
          font-size: 20px !important;
        }
        
        .left-axis .label text, .bottom-axis .label text {
          fill: #2d5016 !important;
          font-size: 13px !important;
          font-weight: 500;
        }
        
        .left-axis .title text, .bottom-axis .title text {
          fill: #2d5016 !important;
          font-size: 15px !important;
          font-weight: 600;
        }
        
        .legend text {
          fill: #2d5016 !important;
          font-size: 13px !important;
          font-weight: 500;
        }
        
        .legend rect {
          stroke: #6a9c89 !important;
          stroke-width: 1.5px !important;
          rx: 4px !important;
        }
        
        /* Git Graph */
        .commit-id, .commit-msg, .branch-label {
          fill: #2d5016 !important;
          font-weight: 600;
        }
        
        .commit {
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
        }
        
        .commit0 {
          fill: #d4e7d0 !important;
        }
        
        .commit1 {
          fill: #e8f4e5 !important;
        }
        
        .commit2 {
          fill: #c8d5b9 !important;
        }
        
        .commit3 {
          fill: #b8cdb1 !important;
        }
        
        .commit-highlight-outer {
          fill: #fbbf24;
          opacity: 0.3;
        }
        
        .commit-highlight-inner {
          fill: #fbbf24;
          opacity: 0.5;
          stroke: #f59e0b;
        }
        
        .branch path {
          stroke-width: 2.5px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .branch.branch0 {
          stroke: #6a9c89 !important;
        }
        
        .branch.branch1 {
          stroke: #5a7c3e !important;
        }
        
        .branch.branch2 {
          stroke: #7ba05b !important;
        }
        
        .branch.branch3 {
          stroke: #8ba888 !important;
        }
        
        /* Timeline */
        .timeline-event {
          fill: #d4e7d0 !important;
          stroke: #6a9c89 !important;
          stroke-width: 2px !important;
          rx: 12px !important;
          filter: drop-shadow(2px 2px 4px rgba(45,80,22,0.15));
        }
        
        .timeline-event:nth-child(2n) {
          fill: #e8f4e5 !important;
        }
        
        .timeline-event:nth-child(3n) {
          fill: #c8d5b9 !important;
        }
        
        .timeline-event-text {
          fill: #2d5016 !important;
          font-weight: 600;
        }
      `
    },
    bgClass: 'bg-gradient-to-br from-[#c8d5b9] to-[#8ba888]',
    bgStyle: {
      background: 'linear-gradient(135deg, #c8d5b9 0%, #8ba888 100%)',
    }
  },
  hightech: {
    name: 'High Tech',
    annotationColors: {
      primary: '#00ff41',
      secondary: '#00ffff',
      text: '#00ff41',
    },
    mermaidConfig: {
      theme: 'base',
      themeVariables: {
        darkMode: true,
        background: '#0a0f1a',
        primaryColor: '#0a0f1a',
        primaryTextColor: '#00ff41',
        primaryBorderColor: '#00ff41',
        lineColor: '#00ff41',
        secondaryColor: '#0a0f1a',
        tertiaryColor: '#0a0f1a',
        fontFamily: '"Courier New", "Noto Sans SC", monospace',
        fontSize: '14px',
        mainBkg: '#0a0f1a',
        nodeBorder: '#00ff41',
        clusterBkg: '#0a0f1a',
        clusterBorder: '#00ff41',
        edgeLabelBackground: '#0a0f1a',
      },
      themeCSS: `
        /* 全局样式 - 科技感绿色主题 */
        .node rect, .node circle, .node polygon, .node path {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          fill: rgba(10, 15, 26, 0.9) !important;
          rx: 5px !important;
          ry: 5px !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.4)) drop-shadow(0 0 15px rgba(0, 255, 65, 0.2));
        }
        
        .edgePath .path {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.5));
        }
        
        .arrowheadPath {
          fill: #00ff41 !important;
          stroke: #00ff41 !important;
        }
        
        .edgeLabel {
          background-color: #0a0f1a !important;
          color: #00ff41 !important;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(0, 255, 65, 0.6);
        }
        
        .label, .nodeLabel {
          color: #00ff41 !important;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(0, 255, 65, 0.6);
        }
        
        /* 流程图节点样式 */
        .flowchart-link {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
        }
        
        /* 序列图样式 */
        .actor {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          rx: 5px !important;
          ry: 5px !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.4));
        }
        
        .actor text {
          fill: #00ff41 !important;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(0, 255, 65, 0.6);
        }
        
        .actor-line {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          stroke-dasharray: 4 4;
          filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.4));
        }
        
        .activation0, .activation1, .activation2 {
          fill: rgba(0, 255, 65, 0.15) !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
        }
        
        .messageLine0, .messageLine1 {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.5));
        }
        
        .note {
          fill: rgba(10, 15, 26, 0.95) !important;
          stroke: #00ffff !important;
          stroke-width: 2px !important;
          rx: 5px !important;
          ry: 5px !important;
          filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.4));
        }
        
        .noteText {
          fill: #00ffff !important;
          font-weight: 700;
          text-shadow: 0 0 6px rgba(0, 255, 255, 0.5);
        }
        
        /* 类图样式 */
        .classGroup rect {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.4));
        }
        
        .classGroup line {
          stroke: #00ff41 !important;
          stroke-width: 1.5px !important;
        }
        
        .classGroup text {
          fill: #00ff41 !important;
          font-weight: 600;
        }
        
        .classLabel .box {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
        }
        
        .classLabel .label {
          fill: #00ff41 !important;
          font-weight: 700;
        }
        
        .relation {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.4));
        }
        
        /* 状态图样式 */
        .stateGroup rect {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          rx: 5px !important;
          ry: 5px !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.4));
        }
        
        .stateGroup text {
          fill: #00ff41 !important;
          font-weight: 600;
        }
        
        .transition {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
        }
        
        .stateLabel .box {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
        }
        
        .state-start circle, .state-end circle {
          fill: #00ff41 !important;
          stroke: #00ff41 !important;
          filter: drop-shadow(0 0 10px rgba(0, 255, 65, 0.6));
        }
        
        /* 甘特图样式 */
        .grid .tick line {
          stroke: rgba(0, 255, 65, 0.3) !important;
          stroke-width: 1px !important;
        }
        
        .grid .tick text {
          fill: #00ff41 !important;
          font-size: 12px !important;
        }
        
        .taskText {
          fill: #00ff41 !important;
          font-weight: 600;
          text-shadow: 0 0 5px rgba(0, 255, 65, 0.4);
        }
        
        .taskTextOutsideRight, .taskTextOutsideLeft {
          fill: #00ff41 !important;
          font-weight: 600;
        }
        
        .task {
          fill: rgba(0, 255, 65, 0.2) !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          rx: 3px !important;
          filter: drop-shadow(0 0 6px rgba(0, 255, 65, 0.3));
        }
        
        .task0, .task1, .task2, .task3 {
          fill: rgba(0, 255, 65, 0.2) !important;
          stroke: #00ff41 !important;
        }
        
        .taskDone0, .taskDone1, .taskDone2, .taskDone3 {
          fill: rgba(0, 255, 65, 0.4) !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
        }
        
        .activeTask0, .activeTask1, .activeTask2, .activeTask3 {
          fill: rgba(0, 255, 255, 0.3) !important;
          stroke: #00ffff !important;
          stroke-width: 2px !important;
        }
        
        .section0, .section1, .section2, .section3 {
          fill: rgba(0, 255, 65, 0.1) !important;
        }
        
        .sectionTitle {
          fill: #00ff41 !important;
          font-weight: 700;
          font-size: 16px !important;
        }
        
        .today {
          stroke: #00ffff !important;
          stroke-width: 2px !important;
          stroke-dasharray: 4 4;
          fill: rgba(0, 255, 255, 0.1) !important;
        }
        
        /* 饼图样式 */
        .pieCircle {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
        }
        
        .pieTitleText {
          fill: #00ff41 !important;
          font-weight: 700;
          font-size: 20px !important;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
        }
        
        .slice {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 6px rgba(0, 255, 65, 0.3));
        }
        
        .pieOuterCircle {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          fill: none !important;
        }
        
        .legend text {
          fill: #00ff41 !important;
          font-size: 13px !important;
          font-weight: 600;
        }
        
        .legend rect {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          rx: 3px !important;
        }
        
        /* XY图表样式 */
        .line-plot-0 path {
          stroke: #00ff41 !important;
          stroke-width: 3px !important;
          filter: drop-shadow(0 0 6px rgba(0, 255, 65, 0.5));
        }
        
        .line-plot-1 path {
          stroke: #00ffff !important;
          stroke-width: 3px !important;
          filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.5));
        }
        
        .line-plot-2 path {
          stroke: #ff00ff !important;
          stroke-width: 3px !important;
          filter: drop-shadow(0 0 6px rgba(255, 0, 255, 0.5));
        }
        
        .bar-plot-0 rect {
          fill: rgba(0, 255, 65, 0.3) !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 6px rgba(0, 255, 65, 0.3));
        }
        
        .bar-plot-1 rect {
          fill: rgba(0, 255, 255, 0.3) !important;
          stroke: #00ffff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.3));
        }
        
        .bar-plot-2 rect {
          fill: rgba(255, 0, 255, 0.3) !important;
          stroke: #ff00ff !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 6px rgba(255, 0, 255, 0.3));
        }
        
        .chart-title text {
          fill: #00ff41 !important;
          font-weight: 700;
          font-size: 20px !important;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
        }
        
        .left-axis .label text,
        .bottom-axis .label text {
          fill: #00ff41 !important;
          font-size: 13px !important;
          font-weight: 600;
        }
        
        .left-axis .title text,
        .bottom-axis .title text {
          fill: #00ff41 !important;
          font-size: 15px !important;
          font-weight: 700;
        }
        
        .left-axis line,
        .bottom-axis line {
          stroke: rgba(0, 255, 65, 0.3) !important;
        }
        
        .grid line {
          stroke: rgba(0, 255, 65, 0.15) !important;
        }
        
        /* Git Graph样式 */
        .commit-id, .commit-msg, .branch-label {
          fill: #00ff41 !important;
          font-weight: 700;
          text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
        }
        
        .commit {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.4));
        }
        
        .commit0 {
          fill: rgba(0, 255, 65, 0.3) !important;
        }
        
        .commit1 {
          fill: rgba(0, 255, 255, 0.3) !important;
        }
        
        .commit2 {
          fill: rgba(0, 255, 65, 0.2) !important;
        }
        
        .commit3 {
          fill: rgba(0, 255, 255, 0.2) !important;
        }
        
        .commit-highlight-outer {
          fill: #00ffff;
          opacity: 0.3;
        }
        
        .commit-highlight-inner {
          fill: #00ffff;
          opacity: 0.5;
          stroke: #00ffff;
        }
        
        .branch path {
          stroke-width: 2.5px !important;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.4));
        }
        
        .branch.branch0 {
          stroke: #00ff41 !important;
        }
        
        .branch.branch1 {
          stroke: #00ffff !important;
        }
        
        .branch.branch2 {
          stroke: #00ff88 !important;
        }
        
        .branch.branch3 {
          stroke: #88ffaa !important;
        }
        
        /* Timeline样式 */
        .timeline-event {
          fill: rgba(10, 15, 26, 0.9) !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          rx: 5px !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.4));
        }
        
        .timeline-event:nth-child(2n) {
          stroke: #00ffff !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.4));
        }
        
        .timeline-event:nth-child(3n) {
          stroke: #00ff88 !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.4));
        }
        
        .timeline-event-text {
          fill: #00ff41 !important;
          font-weight: 700;
          text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
        }
        
        /* ER图样式 */
        .er.entityBox {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.4));
        }
        
        .er.entityLabel {
          fill: #00ff41 !important;
          font-weight: 700;
        }
        
        .er.relationshipLine {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
        }
        
        .er.relationshipLabelBox {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
        }
        
        .er.relationshipLabel {
          fill: #00ff41 !important;
        }
        
        .er.attributeBoxOdd {
          fill: rgba(0, 255, 65, 0.05) !important;
        }
        
        .er.attributeBoxEven {
          fill: rgba(0, 255, 65, 0.1) !important;
        }
        
        /* Journey图样式 */
        .journey-section {
          fill: rgba(0, 255, 65, 0.05) !important;
        }
        
        .journey-task {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 6px rgba(0, 255, 65, 0.3));
        }
        
        .journey-actor {
          fill: #00ff41 !important;
          stroke: #00ff41 !important;
        }
        
        .journey-label {
          fill: #00ff41 !important;
          font-weight: 600;
        }
        
        /* Mindmap样式 */
        .mindmap-node {
          fill: #0a0f1a !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          filter: drop-shadow(0 0 8px rgba(0, 255, 65, 0.4));
        }
        
        .mindmap-node-text {
          fill: #00ff41 !important;
          font-weight: 600;
        }
        
        .mindmap-edge {
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
        }
        
        /* 通用文本样式 */
        text {
          fill: #00ff41 !important;
        }
        
        tspan {
          fill: #00ff41 !important;
        }
        
        /* Cluster/子图样式 */
        .cluster rect {
          fill: rgba(0, 255, 65, 0.05) !important;
          stroke: #00ff41 !important;
          stroke-width: 2px !important;
          stroke-dasharray: 6 6;
          rx: 5px !important;
          ry: 5px !important;
        }
        
        .cluster text {
          fill: #00ff41 !important;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(0, 255, 65, 0.6);
        }
        
        .cluster-label {
          fill: #00ff41 !important;
          font-weight: 700;
        }
      `
    },
    bgClass: 'bg-[#0a0f1a]',
    bgStyle: {
      background: 'radial-gradient(circle at center, #0a0f1a, #000000)',
      boxShadow: '0 0 20px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.1)',
    }
  },  
};
