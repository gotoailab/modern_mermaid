export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'es' | 'pt';

export interface Translation {
  // Header
  appTitle: string;
  share: string;
  shareSuccess: string;
  shareCopied: string;
  
  // Editor
  editor: string;
  editorSubtitle: string;
  clearEditor: string;
  refreshEditor: string;
  confirmClear: string;
  
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
  copy: string;
  copyDesc: string;
  copying: string;
  copyingDesc: string;
  copySuccess: string;
  copySuccessDesc: string;
  copyWithBackground: string;
  copyWithBackgroundDesc: string;
  copyTransparent: string;
  copyTransparentDesc: string;
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
  
  // Annotations
  annotations: string;
  select: string;
  arrow: string;
  text: string;
  rectangle: string;
  circle: string;
  line: string;
  clearAll: string;
  clearAnnotations: string;
  confirmClearAnnotations: string;
  doubleClickToEdit: string;
  copyAnnotation: string;
  
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
  
  // Fullscreen
  enterFullscreen: string;
  exitFullscreen: string;
  
  // Cookie Consent
  cookieTitle: string;
  cookieMessage: string;
  cookieAccept: string;
  cookieDecline: string;
  
  // Dialog
  confirm: string;
  cancel: string;
}

export const translations: Record<Language, Translation> = {
  'en': {
    // Header
    appTitle: 'Mermaid Advanced',
    share: 'Share',
    shareSuccess: 'Share link copied!',
    shareCopied: 'Link copied to clipboard successfully',
    
    // Editor
    editor: 'Editor',
    editorSubtitle: 'Mermaid Syntax',
    clearEditor: 'Clear',
    refreshEditor: 'Refresh',
    confirmClear: 'Are you sure you want to clear the editor?',
    
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
    copy: 'Copy',
    copyDesc: 'Copy the diagram to clipboard',
    copying: 'Copying...',
    copyingDesc: 'Please wait, generating image',
    copySuccess: 'Copy successful!',
    copySuccessDesc: 'Image copied to clipboard',
    copyWithBackground: 'Copy with background',
    copyWithBackgroundDesc: 'Includes current background',
    copyTransparent: 'Copy transparent',
    copyTransparentDesc: 'PNG format, no background',
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
    
    // Annotations
    annotations: 'Annotations',
    select: 'Select',
    arrow: 'Arrow',
    text: 'Text',
    rectangle: 'Rectangle',
    circle: 'Circle',
    line: 'Line',
    clearAll: 'Clear All',
    clearAnnotations: 'Clear Annotations',
    confirmClearAnnotations: 'Are you sure you want to clear all annotations?',
    doubleClickToEdit: 'Double-click to edit',
    copyAnnotation: 'Copy annotation',
    
    // Fullscreen
    enterFullscreen: 'Enter Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    
    // Cookie Consent
    cookieTitle: 'We use cookies',
    cookieMessage: 'We use cookies and similar technologies to improve your experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline',
    
    // Dialog
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  'zh-CN': {
    // Header
    appTitle: 'Mermaid 高级版',
    share: '分享',
    shareSuccess: '分享链接已复制！',
    shareCopied: '链接已成功复制到剪贴板',
    
    // Editor
    editor: '编辑器',
    editorSubtitle: 'Mermaid 语法',
    clearEditor: '清空',
    refreshEditor: '刷新',
    confirmClear: '确定要清空编辑器吗？',
    
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
    copy: '复制',
    copyDesc: '复制图表到剪贴板',
    copying: '正在复制...',
    copyingDesc: '请稍候，正在生成图片',
    copySuccess: '复制成功！',
    copySuccessDesc: '图片已复制到剪贴板',
    copyWithBackground: '复制带背景图片',
    copyWithBackgroundDesc: '包含当前选择的背景',
    copyTransparent: '复制透明背景',
    copyTransparentDesc: 'PNG格式，无背景',
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
    
    // Annotations
    annotations: '标注工具',
    select: '选择',
    arrow: '箭头',
    text: '文字',
    rectangle: '矩形',
    circle: '圆形',
    line: '直线',
    clearAll: '清空',
    clearAnnotations: '清空标注',
    confirmClearAnnotations: '确定要清空所有标注吗？',
    doubleClickToEdit: '双击编辑',
    copyAnnotation: '复制标注',
    
    // Fullscreen
    enterFullscreen: '进入全屏',
    exitFullscreen: '退出全屏',
    
    // Cookie Consent
    cookieTitle: '我们使用 Cookie',
    cookieMessage: '我们使用 Cookie 和类似技术来改善您的体验、分析网站流量并个性化内容。点击"接受"即表示您同意我们使用 Cookie。',
    cookieAccept: '接受',
    cookieDecline: '拒绝',
    
    // Dialog
    confirm: '确认',
    cancel: '取消',
  },
  'zh-TW': {
    // Header
    appTitle: 'Mermaid 進階版',
    share: '分享',
    shareSuccess: '分享連結已複製！',
    shareCopied: '連結已成功複製到剪貼簿',
    
    // Editor
    editor: '編輯器',
    editorSubtitle: 'Mermaid 語法',
    clearEditor: '清空',
    refreshEditor: '刷新',
    confirmClear: '確定要清空編輯器嗎？',
    
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
    copy: '複製',
    copyDesc: '複製圖表到剪貼板',
    copying: '正在複製...',
    copyingDesc: '請稍候，正在生成圖片',
    copySuccess: '複製成功！',
    copySuccessDesc: '圖片已複製到剪貼板',
    copyWithBackground: '複製帶背景圖片',
    copyWithBackgroundDesc: '包含當前選擇的背景',
    copyTransparent: '複製透明背景',
    copyTransparentDesc: 'PNG格式，無背景',
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
    
    // Annotations
    annotations: '標註工具',
    select: '選擇',
    arrow: '箭頭',
    text: '文字',
    rectangle: '矩形',
    circle: '圓形',
    line: '直線',
    clearAll: '清空',
    clearAnnotations: '清空標註',
    confirmClearAnnotations: '確定要清空所有標註嗎？',
    doubleClickToEdit: '雙擊編輯',
    copyAnnotation: '複製標註',
    
    // Fullscreen
    enterFullscreen: '進入全屏',
    exitFullscreen: '退出全屏',
    
    // Cookie Consent
    cookieTitle: '我們使用 Cookie',
    cookieMessage: '我們使用 Cookie 和類似技術來改善您的體驗、分析網站流量並個性化內容。點擊"接受"即表示您同意我們使用 Cookie。',
    cookieAccept: '接受',
    cookieDecline: '拒絕',
    
    // Dialog
    confirm: '確認',
    cancel: '取消',
  },
  'ja': {
    // Header
    appTitle: 'Mermaid アドバンスト',
    share: '共有',
    shareSuccess: '共有リンクをコピーしました！',
    shareCopied: 'リンクがクリップボードにコピーされました',
    
    // Editor
    editor: 'エディター',
    editorSubtitle: 'Mermaid 構文',
    clearEditor: 'クリア',
    refreshEditor: '更新',
    confirmClear: 'エディターをクリアしてもよろしいですか？',
    
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
    copy: 'コピー',
    copyDesc: '図表をクリップボードにコピー',
    copying: 'コピー中...',
    copyingDesc: 'しばらくお待ちください、画像を生成中',
    copySuccess: 'コピー成功！',
    copySuccessDesc: '画像がクリップボードにコピーされました',
    copyWithBackground: '背景付きでコピー',
    copyWithBackgroundDesc: '現在選択されている背景を含む',
    copyTransparent: '透明背景でコピー',
    copyTransparentDesc: 'PNG形式、背景なし',
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
    
    // Annotations
    annotations: '注釈ツール',
    select: '選択',
    arrow: '矢印',
    text: 'テキスト',
    rectangle: '長方形',
    circle: '円',
    line: '線',
    clearAll: 'すべてクリア',
    clearAnnotations: '注釈をクリア',
    confirmClearAnnotations: 'すべての注釈をクリアしますか？',
    doubleClickToEdit: 'ダブルクリックで編集',
    copyAnnotation: '注釈をコピー',
    
    // Fullscreen
    enterFullscreen: '全画面表示',
    exitFullscreen: '全画面終了',
    
    // Cookie Consent
    cookieTitle: 'Cookieの使用',
    cookieMessage: 'Cookieと類似技術を使用して、エクスペリエンスの向上、サイトトラフィックの分析、コンテンツのパーソナライズを行います。「同意する」をクリックすると、Cookieの使用に同意したことになります。',
    cookieAccept: '同意する',
    cookieDecline: '拒否',
    
    // Dialog
    confirm: '確認',
    cancel: 'キャンセル',
  },
  'es': {
    // Header
    appTitle: 'Mermaid Avanzado',
    share: 'Compartir',
    shareSuccess: '¡Enlace copiado!',
    shareCopied: 'Enlace copiado al portapapeles correctamente',
    
    // Editor
    editor: 'Editor',
    editorSubtitle: 'Sintaxis de Mermaid',
    clearEditor: 'Limpiar',
    refreshEditor: 'Actualizar',
    confirmClear: '¿Está seguro de que desea limpiar el editor?',
    
    // Preview
    preview: 'Vista previa',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    resetView: 'Restablecer vista',
    dragToMove: 'Arrastrar para mover',
    wheelToZoom: 'Rueda para zoom',
    scrollZoom: 'Desplazar para zoom',
    dragMove: 'Arrastrar para mover',
    
    // Toolbar
    theme: 'Tema',
    export: 'Exportar',
    exportDesc: 'Exportar el diagrama como imagen',
    copy: 'Copiar',
    copyDesc: 'Copiar el diagrama al portapapeles',
    copying: 'Copiando...',
    copyingDesc: 'Por favor espere, generando imagen',
    copySuccess: '¡Copia exitosa!',
    copySuccessDesc: 'Imagen copiada al portapapeles',
    copyWithBackground: 'Copiar con fondo',
    copyWithBackgroundDesc: 'Incluye el fondo actual',
    copyTransparent: 'Copiar transparente',
    copyTransparentDesc: 'Formato PNG, sin fondo',
    withBackground: 'Con fondo',
    withBackgroundDesc: 'JPG - Incluye color de fondo',
    transparent: 'Fondo transparente',
    transparentDesc: 'PNG - Fondo transparente',
    
    // Language
    language: 'Idioma',
    languageName: 'Español',
    
    // Examples
    examples: 'Ejemplos',
    selectExample: 'Seleccionar ejemplo',
    loadExample: 'Cargar ejemplo',
    
    // Background
    background: 'Fondo',
    selectBackground: 'Seleccionar fondo',
    
    // Font
    font: 'Fuente',
    selectFont: 'Seleccionar fuente',
    
    // Color Picker
    changeNodeColor: 'Cambiar color del nodo',
    presetColors: 'Colores predefinidos',
    customColor: 'Color personalizado',
    apply: 'Aplicar',
    red: 'Rojo',
    orange: 'Naranja',
    yellow: 'Amarillo',
    green: 'Verde',
    blue: 'Azul',
    purple: 'Púrpura',
    pink: 'Rosa',
    gray: 'Gris',
    
    // Annotations
    annotations: 'Herramientas de anotación',
    select: 'Seleccionar',
    arrow: 'Flecha',
    text: 'Texto',
    rectangle: 'Rectángulo',
    circle: 'Círculo',
    line: 'Línea',
    clearAll: 'Limpiar todo',
    clearAnnotations: 'Limpiar anotaciones',
    confirmClearAnnotations: '¿Está seguro de que desea limpiar todas las anotaciones?',
    doubleClickToEdit: 'Doble clic para editar',
    copyAnnotation: 'Copiar anotación',
    
    // Fullscreen
    enterFullscreen: 'Pantalla completa',
    exitFullscreen: 'Salir de pantalla completa',
    
    // Cookie Consent
    cookieTitle: 'Usamos cookies',
    cookieMessage: 'Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico del sitio y personalizar el contenido. Al hacer clic en "Aceptar", usted acepta nuestro uso de cookies.',
    cookieAccept: 'Aceptar',
    cookieDecline: 'Rechazar',
    
    // Dialog
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },
  'pt': {
    // Header
    appTitle: 'Mermaid Avançado',
    share: 'Compartilhar',
    shareSuccess: 'Link copiado!',
    shareCopied: 'Link copiado para a área de transferência com sucesso',
    
    // Editor
    editor: 'Editor',
    editorSubtitle: 'Sintaxe Mermaid',
    clearEditor: 'Limpar',
    refreshEditor: 'Atualizar',
    confirmClear: 'Tem certeza de que deseja limpar o editor?',
    
    // Preview
    preview: 'Visualização',
    zoomIn: 'Aumentar zoom',
    zoomOut: 'Diminuir zoom',
    resetView: 'Redefinir visualização',
    dragToMove: 'Arrastar para mover',
    wheelToZoom: 'Roda para zoom',
    scrollZoom: 'Rolar para zoom',
    dragMove: 'Arrastar para mover',
    
    // Toolbar
    theme: 'Tema',
    export: 'Exportar',
    exportDesc: 'Exportar o diagrama como imagem',
    copy: 'Copiar',
    copyDesc: 'Copiar o diagrama para a área de transferência',
    copying: 'Copiando...',
    copyingDesc: 'Por favor aguarde, gerando imagem',
    copySuccess: 'Cópia bem-sucedida!',
    copySuccessDesc: 'Imagem copiada para a área de transferência',
    copyWithBackground: 'Copiar com fundo',
    copyWithBackgroundDesc: 'Inclui o fundo atual',
    copyTransparent: 'Copiar transparente',
    copyTransparentDesc: 'Formato PNG, sem fundo',
    withBackground: 'Com fundo',
    withBackgroundDesc: 'JPG - Inclui cor de fundo',
    transparent: 'Fundo transparente',
    transparentDesc: 'PNG - Fundo transparente',
    
    // Language
    language: 'Idioma',
    languageName: 'Português',
    
    // Examples
    examples: 'Exemplos',
    selectExample: 'Selecionar exemplo',
    loadExample: 'Carregar exemplo',
    
    // Background
    background: 'Fundo',
    selectBackground: 'Selecionar fundo',
    
    // Font
    font: 'Fonte',
    selectFont: 'Selecionar fonte',
    
    // Color Picker
    changeNodeColor: 'Alterar cor do nó',
    presetColors: 'Cores predefinidas',
    customColor: 'Cor personalizada',
    apply: 'Aplicar',
    red: 'Vermelho',
    orange: 'Laranja',
    yellow: 'Amarelo',
    green: 'Verde',
    blue: 'Azul',
    purple: 'Roxo',
    pink: 'Rosa',
    gray: 'Cinza',
    
    // Annotations
    annotations: 'Ferramentas de anotação',
    select: 'Selecionar',
    arrow: 'Seta',
    text: 'Texto',
    rectangle: 'Retângulo',
    circle: 'Círculo',
    line: 'Linha',
    clearAll: 'Limpar tudo',
    clearAnnotations: 'Limpar anotações',
    confirmClearAnnotations: 'Tem certeza de que deseja limpar todas as anotações?',
    doubleClickToEdit: 'Clique duplo para editar',
    copyAnnotation: 'Copiar anotação',
    
    // Fullscreen
    enterFullscreen: 'Tela cheia',
    exitFullscreen: 'Sair da tela cheia',
    
    // Cookie Consent
    cookieTitle: 'Usamos cookies',
    cookieMessage: 'Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar o tráfego do site e personalizar o conteúdo. Ao clicar em "Aceitar", você concorda com o uso de cookies.',
    cookieAccept: 'Aceitar',
    cookieDecline: 'Recusar',
    
    // Dialog
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },
};

export const getTranslation = (lang: Language): Translation => {
  return translations[lang] || translations['en'];
};

