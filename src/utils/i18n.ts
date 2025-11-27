export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ja';

export interface Translation {
  // Header
  appTitle: string;
  share: string;
  
  // Editor
  editor: string;
  editorSubtitle: string;
  
  // Preview
  preview: string;
  zoomIn: string;
  zoomOut: string;
  resetView: string;
  dragToMove: string;
  wheelToZoom: string;
  scrollZoom: string;
  dragMove: string;
  
  // Toolbar
  theme: string;
  export: string;
  exportDesc: string;
  withBackground: string;
  withBackgroundDesc: string;
  transparent: string;
  transparentDesc: string;
  
  // Language
  language: string;
  languageName: string;
  
  // Examples
  examples: string;
  selectExample: string;
  loadExample: string;
  
  // Background
  background: string;
  selectBackground: string;
  
  // Font
  font: string;
  selectFont: string;
  
  // Color Picker
  changeNodeColor: string;
  presetColors: string;
  customColor: string;
  apply: string;
  red: string;
  orange: string;
  yellow: string;
  green: string;
  blue: string;
  purple: string;
  pink: string;
  gray: string;
}

export const translations: Record<Language, Translation> = {
  'en': {
    // Header
    appTitle: 'Mermaid Advanced',
    share: 'Share',
    
    // Editor
    editor: 'Editor',
    editorSubtitle: 'Mermaid Syntax',
    
    // Preview
    preview: 'Preview',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetView: 'Reset View',
    dragToMove: 'Drag to Move',
    wheelToZoom: 'Wheel to Zoom',
    scrollZoom: 'Scroll to zoom',
    dragMove: 'Drag to move',
    
    // Toolbar
    theme: 'Theme',
    export: 'Export',
    exportDesc: 'Export the diagram as an image',
    withBackground: 'With Background',
    withBackgroundDesc: 'JPG - Includes background color',
    transparent: 'Transparent',
    transparentDesc: 'PNG - Transparent background',
    
    // Language
    language: 'Language',
    languageName: 'English',
    
    // Examples
    examples: 'Examples',
    selectExample: 'Select Example',
    loadExample: 'Load Example',
    
    // Background
    background: 'Background',
    selectBackground: 'Select Background',
    
    // Font
    font: 'Font',
    selectFont: 'Select Font',
    
    // Color Picker
    changeNodeColor: 'Change Node Color',
    presetColors: 'Preset Colors',
    customColor: 'Custom Color',
    apply: 'Apply',
    red: 'Red',
    orange: 'Orange',
    yellow: 'Yellow',
    green: 'Green',
    blue: 'Blue',
    purple: 'Purple',
    pink: 'Pink',
    gray: 'Gray',
  },
  'zh-CN': {
    // Header
    appTitle: 'Mermaid 高级版',
    share: '分享',
    
    // Editor
    editor: '编辑器',
    editorSubtitle: 'Mermaid 语法',
    
    // Preview
    preview: '预览',
    zoomIn: '放大',
    zoomOut: '缩小',
    resetView: '重置视图',
    dragToMove: '拖动移动',
    wheelToZoom: '滚轮缩放',
    scrollZoom: '滚轮缩放',
    dragMove: '拖动移动',
    
    // Toolbar
    theme: '主题',
    export: '导出',
    exportDesc: '导出图表为图片',
    withBackground: '带背景',
    withBackgroundDesc: 'JPG - 包含背景色',
    transparent: '透明背景',
    transparentDesc: 'PNG - 透明背景',
    
    // Language
    language: '语言',
    languageName: '简体中文',
    
    // Examples
    examples: '示例',
    selectExample: '选择示例',
    loadExample: '加载示例',
    
    // Background
    background: '背景',
    selectBackground: '选择背景',
    
    // Font
    font: '字体',
    selectFont: '选择字体',
    
    // Color Picker
    changeNodeColor: '修改节点颜色',
    presetColors: '预设颜色',
    customColor: '自定义颜色',
    apply: '应用',
    red: '红色',
    orange: '橙色',
    yellow: '黄色',
    green: '绿色',
    blue: '蓝色',
    purple: '紫色',
    pink: '粉色',
    gray: '灰色',
  },
  'zh-TW': {
    // Header
    appTitle: 'Mermaid 進階版',
    share: '分享',
    
    // Editor
    editor: '編輯器',
    editorSubtitle: 'Mermaid 語法',
    
    // Preview
    preview: '預覽',
    zoomIn: '放大',
    zoomOut: '縮小',
    resetView: '重置視圖',
    dragToMove: '拖動移動',
    wheelToZoom: '滾輪縮放',
    scrollZoom: '滾輪縮放',
    dragMove: '拖動移動',
    
    // Toolbar
    theme: '主題',
    export: '匯出',
    exportDesc: '將圖表導出為圖片',
    withBackground: '帶背景',
    withBackgroundDesc: 'JPG - 包含背景色',
    transparent: '透明背景',
    transparentDesc: 'PNG - 透明背景',
    
    // Language
    language: '語言',
    languageName: '繁體中文',
    
    // Examples
    examples: '範例',
    selectExample: '選擇範例',
    loadExample: '載入範例',
    
    // Background
    background: '背景',
    selectBackground: '選擇背景',
    
    // Font
    font: '字體',
    selectFont: '選擇字體',
    
    // Color Picker
    changeNodeColor: '修改節點顏色',
    presetColors: '預設顏色',
    customColor: '自定義顏色',
    apply: '應用',
    red: '紅色',
    orange: '橙色',
    yellow: '黃色',
    green: '綠色',
    blue: '藍色',
    purple: '紫色',
    pink: '粉色',
    gray: '灰色',
  },
  'ja': {
    // Header
    appTitle: 'Mermaid アドバンスト',
    share: '共有',
    
    // Editor
    editor: 'エディター',
    editorSubtitle: 'Mermaid 構文',
    
    // Preview
    preview: 'プレビュー',
    zoomIn: '拡大',
    zoomOut: '縮小',
    resetView: 'ビューをリセット',
    dragToMove: 'ドラッグして移動',
    wheelToZoom: 'ホイールでズーム',
    scrollZoom: 'スクロールでズーム',
    dragMove: 'ドラッグして移動',
    
    // Toolbar
    theme: 'テーマ',
    export: 'エクスポート',
    exportDesc: '図表を画像としてエクスポート',
    withBackground: '背景あり',
    withBackgroundDesc: 'JPG - 背景色を含む',
    transparent: '透明背景',
    transparentDesc: 'PNG - 透明な背景',
    
    // Language
    language: '言語',
    languageName: '日本語',
    
    // Examples
    examples: 'サンプル',
    selectExample: 'サンプルを選択',
    loadExample: 'サンプルを読み込む',
    
    // Background
    background: '背景',
    selectBackground: '背景を選択',
    
    // Font
    font: 'フォント',
    selectFont: 'フォントを選択',
    
    // Color Picker
    changeNodeColor: 'ノードの色を変更',
    presetColors: 'プリセット色',
    customColor: 'カスタム色',
    apply: '適用',
    red: '赤',
    orange: 'オレンジ',
    yellow: '黄色',
    green: '緑',
    blue: '青',
    purple: '紫',
    pink: 'ピンク',
    gray: 'グレー',
  },
};

export const getTranslation = (lang: Language): Translation => {
  return translations[lang] || translations['en'];
};

