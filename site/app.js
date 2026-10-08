/**
 * Spreadsheet Cell Highlighter - Landing Page Application
 * Handles i18n (EN, JA, PT-BR), Theme Switching, Interactive Spreadsheet Demo,
 * Screenshot Showcase, and Accordions.
 */

// ==========================================
// 1. Multilingual Dictionary (EN, JA, PT-BR)
// ==========================================
const i18nData = {
  en: {
    // Nav
    navFeatures: "Features",
    navSimulator: "Live Demo",
    navGallery: "Screenshots",
    navHowItWorks: "How It Works",
    navFaq: "FAQ",
    navInstallBtn: "Add to Chrome",
    langName: "English",

    // Hero
    heroBadge: "Chrome Extension • Manifest V3 • 100% Free & Private",
    heroTitlePrefix: "Never lose your place in ",
    heroTitleGradient: "massive spreadsheets",
    heroTitleSuffix: " again.",
    heroDescription: "An ultra-lightweight Chrome extension that tracks your active cell in Google Sheets and highlights the active row and column in real time. Boost accuracy, navigate effortlessly, and eliminate eye strain.",
    heroBtnInstall: "Install Extension (Free)",
    heroBtnDemo: "Try Live Simulator",
    heroChip1: "Real-time Tracking",
    heroChip2: "Line & Cell Modes",
    heroChip3: "Zero Latency (~20 FPS)",
    heroChip4: "100% Client-Side Privacy",
    heroFloatingTitle: "Active Cell Focus",
    heroFloatingSubtitle: "Crosshair guide follows your every keystroke",

    // Simulator
    simTag: "Interactive Playground",
    simTitle: "Test Drive the Highlighter Right Now",
    simSubtitle: "Click cells in the interactive grid below and tweak the controls to see how both Line and Cell modes work in real time.",
    simPanelTitle: "Extension Settings",
    simPanelBadge: "Live Preview",
    simEnableLabel: "Row & Column Highlight",
    simStyleLabel: "Highlight Type",
    simStyleLine: "Line",
    simStyleCell: "Cell",
    simRowLimitLabel: "Row Highlight Limit",
    simThicknessLabel: "Line Thickness",
    simColorLabel: "Highlight Color",
    simOpacityLabel: "Opacity",
    simHint: "💡 Click any cell or use Arrow Keys to navigate. Notice how the guides align automatically!",
    simFormulaLabel: "fx",

    // Features Section
    featuresTag: "Powerful Capabilities",
    featuresTitle: "Engineered for Spreadsheet Power Users",
    featuresSubtitle: "Everything you need to work faster and more accurately inside Google Sheets without distractions.",
    feat1Title: "Real-Time Cell Tracking",
    feat1Desc: "Smoothly tracks your active cell whether you click with your mouse or fly through cells using keyboard arrow shortcuts. Intelligently respects Google Sheets formula editors and frozen panes.",
    feat1Tag1: "Keyboard & Mouse",
    feat1Tag2: "Instant Response",
    feat1Tag3: "Frozen Panes Support",

    feat2Title: "Two Distinct Highlight Modes",
    feat2Desc: "Switch seamlessly between Line Mode (minimalist crosshair guides along cell boundaries) and Cell Mode (translucent colored bands highlighting the entire active row and column).",
    feat2Tag1: "Line Crosshair",
    feat2Tag2: "Cell Banding",
    feat2Tag3: "Customizable",

    feat3Title: "Row Highlight Limit",
    feat3Desc: "Hate infinite horizontal lines cluttering your screen? Enable the Row Highlight Limit to stop the guide at your active cell, keeping your spreadsheet clean and focused.",
    feat3Tag1: "Visual Clarity",
    feat3Tag2: "Clean Interface",
    feat3Tag3: "Toggleable",

    feat4Title: "Range Selection Awareness",
    feat4Desc: "When dragging or selecting multi-cell blocks, the extension intelligently adapts. Choose to show guides around your selection or suppress them during bulk operations.",
    feat4Tag1: "Smart Detection",
    feat4Tag2: "No Clutter",
    feat4Tag3: "Workflow Friendly",

    feat5Title: "Full Visual Customization",
    feat5Desc: "Personalize your guide colors with a full-spectrum hex color picker, adjust opacity from 0% to 100%, and configure line thickness from 1px to 12px for perfect visibility.",
    feat5Tag1: "Color Picker",
    feat5Tag2: "Opacity Slider",
    feat5Tag3: "1px - 12px Width",

    feat6Title: "Dark & Light Theme Support",
    feat6Desc: "The popup control panel comes equipped with instant dark and light mode switching, matching your operating system or personal workflow preference.",
    feat6Tag1: "Dark Mode",
    feat6Tag2: "Light Mode",
    feat6Tag3: "Eyesight Friendly",

    feat7Title: "Zero Latency & Battery Friendly",
    feat7Desc: "Built with throttled requestAnimationFrame (~20 FPS) and DOM element recycling. Consumes near-zero CPU and memory, ensuring spreadsheets stay silky smooth.",
    feat7Tag1: "DOM Pooling",
    feat7Tag2: "Near-Zero CPU",
    feat7Tag3: "No Bloat",

    feat8Title: "Trilingual Out-of-the-Box",
    feat8Desc: "Available in English, Japanese (日本語), and Brazilian Portuguese (Português). Switch languages instantly directly from the extension popup.",
    feat8Tag1: "English",
    feat8Tag2: "日本語",
    feat8Tag3: "Português",

    // Gallery Section
    galleryTag: "Visual Showcase",
    galleryTitle: "Clean, Unobtrusive, and Effective",
    gallerySubtitle: "See how Spreadsheet Cell Highlighter looks in real Google Sheets environments and in both popup themes.",
    tabLine: "Line Mode",
    tabCell: "Cell Mode",
    tabPopupLight: "Popup (Light)",
    tabPopupDark: "Popup (Dark)",
    tabPromo: "Overview",
    capLineTitle: "Line Mode Crosshair Guide",
    capLineDesc: "High-precision horizontal and vertical crosshairs intersecting at cell C3.",
    capCellTitle: "Cell Mode Colored Bands",
    capCellDesc: "Gentle translucent yellow bands highlighting row 3 and column C simultaneously.",
    capPopupLightTitle: "Light Mode Popup Panel",
    capPopupLightDesc: "Clean, responsive settings popup with instant controls and color sliders.",
    capPopupDarkTitle: "Dark Mode Popup Panel",
    capPopupDarkDesc: "OLED-friendly dark theme designed for comfortable late-night data sessions.",
    capPromoTitle: "Spreadsheet Cell Highlighter Banner",
    capPromoDesc: "Designed specifically to boost data accuracy and reduce eye fatigue.",

    // Trust / Privacy Section
    trustTag: "Security & Privacy",
    trustTitle: "Your Data Stays 100% Private",
    trustSubtitle: "We take privacy and performance seriously. Here is our unwavering promise to you.",
    trust1Title: "Zero Data Collection",
    trust1Desc: "The extension never reads, stores, or transmits your spreadsheet cells, formulas, or personal information.",
    trust2Title: "Zero External Requests",
    trust2Desc: "Operates 100% offline. No telemetry, no third-party tracking scripts, and no analytics beacons whatsoever.",
    trust3Title: "Local Browser Storage",
    trust3Desc: "Settings like your favorite color and opacity are saved locally via chrome.storage.local on your computer.",
    trust4Title: "Manifest V3 Compliant",
    trust4Desc: "Built on Google Chrome's newest Manifest V3 standard with minimal, transparent permissions scoped only to Google Sheets.",

    // How It Works
    howTag: "Quick Start",
    howTitle: "Get Started in Under 30 Seconds",
    howSubtitle: "Zero complicated setup. Install the extension and open any Google Sheet to begin.",
    step1Title: "1. Install Extension",
    step1Desc: "Add Spreadsheet Cell Highlighter to Google Chrome (or any Chromium browser like Edge, Brave, or Opera).",
    step2Title: "2. Open Google Sheets",
    step2Desc: "Navigate to docs.google.com/spreadsheets and open any workbook or create a new sheet.",
    step3Title: "3. Click Any Cell",
    step3Desc: "Your row and column guides will appear immediately! Click the toolbar icon anytime to customize.",
    devAccordionBtn: "Need to install via Developer Mode (Source Code)? Click here",
    devStep1: "1. Clone or download this repository to your computer.",
    devStep2: "2. Open Chrome and navigate to chrome://extensions/ in the address bar.",
    devStep3: "3. Toggle on 'Developer mode' in the top-right corner.",
    devStep4: "4. Click 'Load unpacked' and select the extension directory.",

    // FAQ Section
    faqTag: "Frequently Asked Questions",
    faqTitle: "Common Questions Answered",
    faqSubtitle: "Find answers regarding performance, browser compatibility, and customization.",
    faqQ1: "Does this extension slow down Google Sheets?",
    faqA1: "Not at all! The extension is engineered using DOM element pooling and throttled requestAnimationFrame cycles. It creates only 2 persistent guide elements in memory instead of creating elements on every click, ensuring buttery smooth 60 FPS scrolling.",
    faqQ2: "Can the extension see or steal my financial or company data?",
    faqA2: "No. The extension only inspects the coordinate position (bounding rectangle) of the active cell border in the DOM to place the guide lines. It never reads the text content, cell values, or formulas of your spreadsheet.",
    faqQ3: "Does it work with frozen rows, columns, and filter views?",
    faqA3: "Yes! The guide overlays are placed directly over the sheet viewport and automatically adapt as you scroll, select, and edit cells across frozen panes and standard sheets.",
    faqQ4: "Can I customize the highlight color and transparency?",
    faqA4: "Yes! Click the extension icon in your Chrome toolbar to open the settings popup. You can select any color using the color picker, adjust opacity from 0% to 100%, and set line thickness from 1px to 12px.",
    faqQ5: "Is Spreadsheet Cell Highlighter free?",
    faqA5: "Yes, it is 100% free and open-source under the permissive MIT License. You are free to inspect the code, modify it, or contribute on GitHub.",

    // CTA
    ctaTitle: "Ready to Supercharge Your Spreadsheets?",
    ctaDesc: "Join thousands of professionals who save time, prevent data-entry mistakes, and navigate large sheets with ease.",
    ctaInstallBtn: "Add to Chrome — It's Free",
    ctaGithubBtn: "View on GitHub",

    // Footer
    footerDesc: "A lightweight Google Chrome extension enhancing Google Sheets navigation.",
    footerPrivacy: "Privacy Policy",
    footerLicense: "MIT License",
    footerCopyright: "© 2026 Spreadsheet Cell Highlighter. All rights reserved."
  },

  ja: {
    // Nav
    navFeatures: "機能一覧",
    navSimulator: "ライブデモ",
    navGallery: "スクリーンショット",
    navHowItWorks: "使い方",
    navFaq: "よくある質問",
    navInstallBtn: "Chromeに追加",
    langName: "日本語",

    // Hero
    heroBadge: "Chrome拡張機能 • Manifest V3 • 完全無料・安全",
    heroTitlePrefix: "膨大なスプレッドシートでも、",
    heroTitleGradient: "もう行や列を見失わない。",
    heroTitleSuffix: "",
    heroDescription: "Google スプレッドシートのアクティブセルをリアルタイムで追跡し、選択中の行と列を瞬時にハイライト。データの見間違いや入力ミス、目の疲労を劇的に解消する軽量拡張機能です。",
    heroBtnInstall: "拡張機能をインストール (無料)",
    heroBtnDemo: "シミュレーターを試す",
    heroChip1: "リアルタイム追跡",
    heroChip2: "線・セル全体の2モード",
    heroChip3: "ゼロ遅延 (~20 FPS)",
    heroChip4: "100% ローカル完結の安全性",
    heroFloatingTitle: "アクティブセルを即座に捕捉",
    heroFloatingSubtitle: "矢印キーやマウスクリックに素早く追従します",

    // Simulator
    simTag: "インタラクティブ体験",
    simTitle: "今すぐハイライトの使い心地を体感",
    simSubtitle: "下の表でセルをクリックし、設定パネルを操作して「線モード」と「セル全体モード」の表示を切り替えてみてください。",
    simPanelTitle: "拡張機能の設定",
    simPanelBadge: "リアルタイム変更",
    simEnableLabel: "行列ハイライト",
    simStyleLabel: "ハイライトの種類",
    simStyleLine: "線 (Line)",
    simStyleCell: "セル全体 (Cell)",
    simRowLimitLabel: "行ハイライトの限界",
    simThicknessLabel: "線の太さ",
    simColorLabel: "ハイライト色",
    simOpacityLabel: "透明度",
    simHint: "💡 任意のセルをクリックするか、キーボードの矢印キーで移動してみてください！",
    simFormulaLabel: "fx",

    // Features Section
    featuresTag: "主な機能",
    featuresTitle: "スプレッドシートを毎日使う方のための機能美",
    featuresSubtitle: "作業効率とデータ入力精度を最大化するために設計された、スマートで無駄のない機能群。",
    feat1Title: "リアルタイムなセル追跡",
    feat1Desc: "矢印キーでの高速移動やマウスクリックに完全追従。数式バーや固定枠（フリーズペイン）の邪魔をすることなく、現在位置を常に明瞭に示します。",
    feat1Tag1: "キーボード&マウス対応",
    feat1Tag2: "超高速レスポンス",
    feat1Tag3: "固定枠対応",

    feat2Title: "2種類のハイライトスタイル",
    feat2Desc: "セルの境界線に沿ってシャープな十字線を表示する「線モード」と、アクティブな行・列全体をやさしい帯状に着色する「セル全体モード」をワンクリックで切替可能。",
    feat2Tag1: "線 (Line)",
    feat2Tag2: "セル全体 (Cell)",
    feat2Tag3: "即時切替",

    feat3Title: "行ハイライトの限界（停止機能）",
    feat3Desc: "画面の端まで線が伸びると見づらい場合は「行ハイライトの限界」をオンに。選択したセルで行ガイドがピタッと止まり、画面の煩雑さを防ぎます。",
    feat3Tag1: "視認性向上",
    feat3Tag2: "スッキリ表示",
    feat3Tag3: "オン/オフ対応",

    feat4Title: "範囲選択時のスマート検知",
    feat4Desc: "複数セルをまとめてドラッグ選択した際も賢く検知。データの一括編集作業を邪魔しないよう、範囲選択時のハイライト表示/非表示を自由に設定できます。",
    feat4Tag1: "範囲認識",
    feat4Tag2: "快適な一括編集",
    feat4Tag3: "柔軟な設定",

    feat5Title: "自由自在なカラー＆透明度カスタマイズ",
    feat5Desc: "カラーピッカーでお好みのカラー（蛍光イエロー、ブルー、グリーン等）を指定可能。透明度（0〜100%）や線の太さ（1〜12px）も細かくスライダーで調整できます。",
    feat5Tag1: "カラーパレット",
    feat5Tag2: "透明度スライダー",
    feat5Tag3: "線幅 1px〜12px",

    feat6Title: "ダーク＆ライトテーマ対応",
    feat6Desc: "設定用ポップアップはワンタップでダークモードとライトモードの切り替えに対応。深夜のデータチェックやダークテーマ環境でも目に優しい設計です。",
    feat6Tag1: "ダークモード",
    feat6Tag2: "ライトモード",
    feat6Tag3: "目の疲れ軽減",

    feat7Title: "超軽量・驚きの省メモリ設計",
    feat7Desc: "requestAnimationFrameによる最適化（~20 FPS間引き）とDOM要素プール技術を採用。CPU消費やメモリ負荷が実質ゼロで、スプレッドシートが重くなりません。",
    feat7Tag1: "DOMプーリング",
    feat7Tag2: "CPU負荷ゼロ",
    feat7Tag3: "超軽量",

    feat8Title: "3言語対応 (日・英・ポ)",
    feat8Desc: "日本語、英語、ポルトガル語（ブラジル）の3言語を標準搭載。ポップアップ内の言語メニューから即座に切り替えられます。",
    feat8Tag1: "English",
    feat8Tag2: "日本語",
    feat8Tag3: "Português",

    // Gallery Section
    galleryTag: "実際の画面",
    galleryTitle: "邪魔にならず、圧倒的に見やすい",
    gallerySubtitle: "Google スプレッドシート上での実際のハイライト表示と設定画面をご覧ください。",
    tabLine: "線モード",
    tabCell: "セル全体モード",
    tabPopupLight: "設定 (ライト)",
    tabPopupDark: "設定 (ダーク)",
    tabPromo: "概要紹介",
    capLineTitle: "線モード（Line）の十字ガイド",
    capLineDesc: "選択セル（C3）の境界線に沿って引かれた高精度な十字ライン。",
    capCellTitle: "セル全体モード（Cell）のハイライト帯",
    capCellDesc: "行3と列C全体に半透明のイエローバンドが表示され、対応関係が一目で分かります。",
    capPopupLightTitle: "ライトテーマの設定パネル",
    capPopupLightDesc: "直感的で操作しやすいポップアップUI。変更は即座にシートへ反映されます。",
    capPopupDarkTitle: "ダークテーマの設定パネル",
    capPopupDarkDesc: "目に優しい洗練されたダークUI。夜間作業に最適です。",
    capPromoTitle: "Spreadsheet Cell Highlighter プロモ",
    capPromoDesc: "目の疲れを減らし、業務の正確性を向上させるために設計されました。",

    // Trust / Privacy Section
    trustTag: "プライバシーとセキュリティ",
    trustTitle: "大切なスプレッドシートのデータを守ります",
    trustSubtitle: "安全性とプライバシーを最優先に設計されています。以下の安全をお約束します。",
    trust1Title: "データ収集ゼロ",
    trust1Desc: "拡張機能がスプレッドシートの内容や計算式、個人情報を読み取ったり外部送信することは一切ありません。",
    trust2Title: "外部通信ゼロ（完全オフライン）",
    trust2Desc: "外部サーバーとの通信は一切行いません。トラッカーやアナリティクス等の外部コードも含まれていません。",
    trust3Title: "ブラウザ内ローカル保存",
    trust3Desc: "設定（カラー、透明度、言語など）はお使いのブラウザ内部（chrome.storage.local）にのみ安全に保存されます。",
    trust4Title: "Manifest V3 準拠",
    trust4Desc: "Google Chromeの最新セキュリティ基準「Manifest V3」に準拠し、必要最小限の権限のみを使用します。",

    // How It Works
    howTag: "導入方法",
    howTitle: "わずか30秒で使い始められます",
    howSubtitle: "複雑な初期設定は不要。インストール後、スプレッドシートを開くだけで自動で有効になります。",
    step1Title: "1. 拡張機能を追加",
    step1Desc: "Google Chrome（またはEdge、BraveなどのChromium系ブラウザ）に拡張機能を追加します。",
    step2Title: "2. スプレッドシートを開く",
    step2Desc: "Google スプレッドシート（docs.google.com/spreadsheets）で既存のシートを開くか新規作成します。",
    step3Title: "3. セルをクリック",
    step3Desc: "任意のセルをクリックすると、自動的に行・列ハイライトが表示されます！ツールバーのアイコンからカスタマイズも自由自在。",
    devAccordionBtn: "ソースコード（デベロッパーモード）からインストールする場合はこちら",
    devStep1: "1. 本リポジトリをダウンロードまたは git clone します。",
    devStep2: "2. Chromeのアドレスバーに chrome://extensions/ と入力して開きます。",
    devStep3: "3. 右上の「デベロッパーモード」をONにします。",
    devStep4: "4. 左上の「パッケージ化されていない拡張機能を読み込む」を押し、本フォルダを選択します。",

    // FAQ Section
    faqTag: "よくあるご質問",
    faqTitle: "FAQ",
    faqSubtitle: "パフォーマンスや動作に関するよくある質問をまとめました。",
    faqQ1: "スプレッドシートの動作が重くなったりしませんか？",
    faqA1: "全く重くなりません！DOM要素を毎回新しく生成せず再利用する「エレメントプーリング」と、アニメーションフレーム間引き（~20 FPS）により、CPUやメモリの消費はほぼゼロです。数千行の大きなシートでも快適に動作します。",
    faqQ2: "社内や財務の機密データが漏洩する心配はありませんか？",
    faqA2: "一切心配ありません。本拡張機能はセルの枠線の座標（矩形位置）のみを検出してガイドを描画しており、セルの中身やテキスト、数式を読み取る処理は存在しません。ネットワーク通信も行いません。",
    faqQ3: "行や列の固定枠（フリーズ）があっても正常に動きますか？",
    faqA3: "はい！固定枠やスクロール枠を考慮した座標計算を行っているため、上下左右にスクロールしても正確にセルに追従します。",
    faqQ4: "線の色や太さは変更できますか？",
    faqA4: "はい！ブラウザツールバーのアイコンをクリックすると設定画面が開き、カラーピッカーでお好みの色、スライダーで透明度や太さ（1px〜12px）を自由に調整できます。",
    faqQ5: "無料で使えますか？",
    faqA5: "はい、100%完全無料でご利用いただけます。MITライセンスのオープンソースソフトウェアとして公開されています。",

    // CTA
    ctaTitle: "スプレッドシート作業を、もっと快適に。",
    ctaDesc: "行のズレや見間違いのストレスから解放されましょう。今すぐ数秒で導入できます。",
    ctaInstallBtn: "Chromeに追加する (無料)",
    ctaGithubBtn: "GitHubを見る",

    // Footer
    footerDesc: "Google スプレッドシートの視認性と作業効率を劇的に向上させるChrome拡張機能。",
    footerPrivacy: "プライバシーポリシー",
    footerLicense: "MIT ライセンス",
    footerCopyright: "© 2026 Spreadsheet Cell Highlighter. All rights reserved."
  },

  "pt-BR": {
    // Nav
    navFeatures: "Recursos",
    navSimulator: "Demonstração",
    navGallery: "Capturas de Tela",
    navHowItWorks: "Como Funciona",
    navFaq: "Perguntas Frequentes",
    navInstallBtn: "Instalar no Chrome",
    langName: "Português",

    // Hero
    heroBadge: "Extensão para Chrome • Manifest V3 • 100% Gratuito & Seguro",
    heroTitlePrefix: "Nunca mais se perca em ",
    heroTitleGradient: "planilhas gigantescas",
    heroTitleSuffix: ".",
    heroDescription: "Uma extensão ultra leve para o Chrome que rastreia a célula ativa no Google Planilhas e destaca a linha e a coluna em tempo real. Evite erros de alinhamento, acelere sua digitação e reduza o cansaço visual.",
    heroBtnInstall: "Instalar Extensão (Grátis)",
    heroBtnDemo: "Testar Simulador Interativo",
    heroChip1: "Rastreamento em Tempo Real",
    heroChip2: "Modos Linha e Célula",
    heroChip3: "Latência Zero (~20 FPS)",
    heroChip4: "Privacidade 100% Local",
    heroFloatingTitle: "Foco Imediato na Célula",
    heroFloatingSubtitle: "As guias em cruz acompanham cada clique e seta do teclado",

    // Simulator
    simTag: "Simulador Interativo",
    simTitle: "Experimente o Destacador Agora Mesmo",
    simSubtitle: "Clique em qualquer célula da tabela abaixo e ajuste o painel ao lado para testar os modos Linha e Célula ao vivo.",
    simPanelTitle: "Configurações da Extensão",
    simPanelBadge: "Ao Vivo",
    simEnableLabel: "Destaque de Linha e Coluna",
    simStyleLabel: "Tipo de Destaque",
    simStyleLine: "Linha",
    simStyleCell: "Célula",
    simRowLimitLabel: "Limite da Linha",
    simThicknessLabel: "Espessura da Linha",
    simColorLabel: "Cor do Destaque",
    simOpacityLabel: "Opacidade",
    simHint: "💡 Clique em uma célula ou use as setas do teclado. Veja como as guias se alinham perfeitamente!",
    simFormulaLabel: "fx",

    // Features Section
    featuresTag: "Funcionalidades Principais",
    featuresTitle: "Projetado para Quem Trabalha com Planilhas Todos os Dias",
    featuresSubtitle: "Tudo o que você precisa para navegar com rapidez e precisão cirúrgica no Google Planilhas sem poluição visual.",
    feat1Title: "Rastreamento de Célula em Tempo Real",
    feat1Desc: "Acompanha com fluidez a célula focada, quer você use as setas do teclado ou clique com o mouse. Respeita a barra de fórmulas e painéis congelados do Google Sheets.",
    feat1Tag1: "Teclado e Mouse",
    feat1Tag2: "Resposta Imediata",
    feat1Tag3: "Painéis Congelados",

    feat2Title: "Dois Modos Distintos de Destaque",
    feat2Desc: "Alterne instantaneamente entre o Modo Linha (linhas de mira de alta precisão nas bordas da célula) e o Modo Célula (faixas translúcidas coloridas cruzando toda a linha e coluna).",
    feat2Tag1: "Modo Linha",
    feat2Tag2: "Modo Célula",
    feat2Tag3: "Fácil Alternância",

    feat3Title: "Limite do Destaque da Linha",
    feat3Desc: "Não quer linhas horizontais atravessando a tela inteira? Ative o Limite da Linha para que a guia horizontal termine exatamente na célula ativa, mantendo o visual limpo.",
    feat3Tag1: "Foco Visual",
    feat3Tag2: "Interface Limpa",
    feat3Tag3: "Ativável",

    feat4Title: "Detecção Inteligente de Intervalos",
    feat4Desc: "Ao selecionar múltiplos blocos de células arrastando o mouse, a extensão adapta o destaque para não atrapalhar operações em massa e edições em lote.",
    feat4Tag1: "Detecção Inteligente",
    feat4Tag2: "Sem Poluição",
    feat4Tag3: "Produtividade",

    feat5Title: "Personalização Visual Completa",
    feat5Desc: "Escolha qualquer cor com o seletor hexadecimal, defina a transparência de 0% a 100% e configure a espessura da linha de 1px a 12px para visualização perfeita.",
    feat5Tag1: "Seletor de Cor",
    feat5Tag2: "Slider de Opacidade",
    feat5Tag3: "Espessura 1px a 12px",

    feat6Title: "Temas Escuro e Claro",
    feat6Desc: "O painel popup da extensão possui alternância instantânea entre modo claro e escuro, combinando com as preferências visuais do seu sistema operacional.",
    feat6Tag1: "Modo Escuro",
    feat6Tag2: "Modo Claro",
    feat6Tag3: "Conforto para os Olhos",

    feat7Title: "Desempenho Extremo e Zero Latência",
    feat7Desc: "Desenvolvido com requestAnimationFrame (~20 FPS) e reciclagem de elementos no DOM (pooling). Consumo quase nulo de CPU e memória RAM.",
    feat7Tag1: "DOM Pooling",
    feat7Tag2: "Zero Sobrecarga",
    feat7Tag3: "Super Leve",

    feat8Title: "Totalmente Trilíngue",
    feat8Desc: "Disponível nativamente em Português do Brasil, Inglês e Japonês. Mude de idioma a qualquer momento diretamente no popup.",
    feat8Tag1: "Português",
    feat8Tag2: "English",
    feat8Tag3: "日本語",

    // Gallery Section
    galleryTag: "Galeria de Telas",
    galleryTitle: "Design Limpo, Preciso e Eficiente",
    gallerySubtitle: "Veja como o Spreadsheet Cell Highlighter se comporta no Google Planilhas real e em ambos os temas.",
    tabLine: "Modo Linha",
    tabCell: "Modo Célula",
    tabPopupLight: "Popup (Claro)",
    tabPopupDark: "Popup (Escuro)",
    tabPromo: "Visão Geral",
    capLineTitle: "Guia em Cruz no Modo Linha",
    capLineDesc: "Linhas de mira de alta precisão que delimitam a célula C3 com clareza.",
    capCellTitle: "Faixas Coloridas no Modo Célula",
    capCellDesc: "Faixas amarelas translúcidas destacando toda a linha 3 e coluna C simultaneamente.",
    capPopupLightTitle: "Painel de Controle no Modo Claro",
    capPopupLightDesc: "Interface limpa e intuitiva para ajuste de cores, espessura e modos de exibição.",
    capPopupDarkTitle: "Painel de Controle no Modo Escuro",
    capPopupDarkDesc: "Tema escuro relaxante para jornadas prolongadas de análise de dados.",
    capPromoTitle: "Banner Promocional da Extensão",
    capPromoDesc: "Criado especificamente para aumentar a precisão e evitar a fadiga visual.",

    // Trust / Privacy Section
    trustTag: "Segurança e Privacidade",
    trustTitle: "Seus Dados Continuam 100% Privados",
    trustSubtitle: "Levamos sua privacidade a sério. Aqui está nosso compromisso transparente com você.",
    trust1Title: "Coleta de Dados Zero",
    trust1Desc: "A extensão nunca lê, armazena nem envia os dados, fórmulas ou conteúdos das suas planilhas para nenhum lugar.",
    trust2Title: "Zero Requisições Externas",
    trust2Desc: "Funciona 100% offline. Não há telemetria, scripts de rastreamento de terceiros nem ferramentas de análise.",
    trust3Title: "Armazenamento 100% Local",
    trust3Desc: "Suas preferências (cor, opacidade, idioma) são salvas unicamente no seu navegador via chrome.storage.local.",
    trust4Title: "Compatível com Manifest V3",
    trust4Desc: "Construído de acordo com os padrões de segurança modernos do Google Chrome, exigindo permissões mínimas.",

    // How It Works
    howTag: "Início Rápido",
    howTitle: "Pronto para Usar em Menos de 30 Segundos",
    howSubtitle: "Nenhuma configuração complicada. Basta instalar e abrir qualquer planilha no Google Sheets.",
    step1Title: "1. Instale a Extensão",
    step1Desc: "Adicione a extensão ao Google Chrome (ou qualquer navegador Chromium como Edge, Brave ou Opera).",
    step2Title: "2. Abra o Google Planilhas",
    step2Desc: "Acesse docs.google.com/spreadsheets e abra sua planilha de trabalho ou crie uma nova.",
    step3Title: "3. Clique em Qualquer Célula",
    step3Desc: "As guias de linha e coluna surgirão instantaneamente! Clique no ícone na barra do Chrome para personalizar.",
    devAccordionBtn: "Deseja instalar pelo Modo Desenvolvedor (Código Fonte)? Clique aqui",
    devStep1: "1. Baixe ou clone este repositório no seu computador.",
    devStep2: "2. Abra o Chrome e digite chrome://extensions/ na barra de endereços.",
    devStep3: "3. Ative o 'Modo do desenvolvedor' no canto superior direito.",
    devStep4: "4. Clique em 'Carregar sem compactação' e selecione a pasta da extensão.",

    // FAQ Section
    faqTag: "Dúvidas Frequentes",
    faqTitle: "Perguntas Frequentes",
    faqSubtitle: "Tudo o que você precisa saber sobre velocidade, segurança e personalização.",
    faqQ1: "A extensão deixa o Google Planilhas lento?",
    faqA1: "Não, de forma alguma! A extensão usa reciclagem de elementos no DOM (pooling) e limites de atualização por requestAnimationFrame (~20 FPS). Ela cria apenas 2 elementos fixos na página em vez de recriar o DOM a cada clique, garantindo navegação a 60 FPS.",
    faqQ2: "A extensão tem acesso aos meus dados financeiros ou confidenciais?",
    faqA2: "Não. A extensão apenas lê as coordenadas físicas da borda da célula ativa no navegador para posicionar as linhas visuais. Ela nunca lê os textos, números ou fórmulas da sua planilha.",
    faqQ3: "Funciona com linhas e colunas congeladas e filtros?",
    faqA3: "Sim! Os guias sobrepõem a tela do Google Planilhas de forma fluida e acompanham a rolagem normalmente mesmo em planilhas com congelamento de painéis.",
    faqQ4: "Posso mudar a cor e a transparência do destaque?",
    faqA4: "Sim! Ao clicar no ícone da extensão na barra de ferramentas do Chrome, você abre o painel onde pode escolher qualquer cor, controlar a opacidade (0% a 100%) e a espessura da linha (1px a 12px).",
    faqQ5: "O Spreadsheet Cell Highlighter é gratuito?",
    faqA5: "Sim, é 100% gratuito e de código aberto sob a licença MIT. Você pode usar, inspecionar o código e contribuir livremente no GitHub.",

    // CTA
    ctaTitle: "Pronto para Navegar com Máxima Precisão?",
    ctaDesc: "Instale em instantes e experimente a forma mais intuitiva de trabalhar no Google Planilhas.",
    ctaInstallBtn: "Adicionar ao Chrome — É Grátis",
    ctaGithubBtn: "Ver no GitHub",

    // Footer
    footerDesc: "Extensão leve para o Google Chrome que aprimora a navegação no Google Planilhas.",
    footerPrivacy: "Política de Privacidade",
    footerLicense: "Licença MIT",
    footerCopyright: "© 2026 Spreadsheet Cell Highlighter. Todos os direitos reservados."
  }
};

// ==========================================
// 2. Application State & Controller
// ==========================================
let currentLang = 'en';
let currentTheme = 'light';

// Simulator State
const simState = {
  enabled: true,
  style: 'line', // 'line' or 'cell'
  rowLimit: true,
  color: '#ffff00',
  opacity: 35,
  thickness: 2,
  selectedRow: 3,
  selectedCol: 3
};

// Table Data for Simulator
const sampleSpreadsheetData = [
  ["Product SKU", "Region", "Q1 Sales", "Q2 Sales", "Growth", "Margin %", "Status"],
  ["PROD-1082", "North America", "$24,500", "$31,200", "+27.3%", "41.5%", "Approved"],
  ["PROD-2041", "Europe West", "$18,900", "$22,400", "+18.5%", "38.2%", "Approved"],
  ["PROD-3309", "Asia Pacific", "$42,100", "$49,800", "+18.3%", "45.0%", "Review"],
  ["PROD-4012", "Latin America", "$12,400", "$15,100", "+21.7%", "34.8%", "Pending"],
  ["PROD-5190", "Middle East", "$9,800", "$11,200", "+14.2%", "31.0%", "Approved"],
  ["PROD-6621", "Nordics", "$14,300", "$16,500", "+15.3%", "40.1%", "Approved"],
  ["PROD-7704", "Africa South", "$7,200", "$8,900", "+23.6%", "29.4%", "Pending"]
];

const colHeaders = ["A", "B", "C", "D", "E", "F", "G"];

// ==========================================
// 3. i18n Translation Handler
// ==========================================
function setLanguage(lang) {
  if (!i18nData[lang]) lang = 'en';
  currentLang = lang;
  localStorage.setItem('sch_landing_lang', lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  const t = i18nData[lang];

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Update active status on dropdown
  document.querySelectorAll('.lang-option').forEach(opt => {
    const optLang = opt.getAttribute('data-lang');
    if (optLang === lang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  const currentLangLabel = document.getElementById('current-lang-label');
  if (currentLangLabel) {
    currentLangLabel.textContent = t.langName;
  }

  // Update formula bar sample name
  updateFormulaBar();
}

window.setLanguage = setLanguage;

// ==========================================
// 4. Theme Toggle Handler
// ==========================================
function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sch_landing_theme', theme);

  const iconSun = document.getElementById('theme-icon-sun');
  const iconMoon = document.getElementById('theme-icon-moon');
  if (iconSun && iconMoon) {
    if (theme === 'dark') {
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    } else {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    }
  }
}

window.setTheme = setTheme;

// ==========================================
// 5. Interactive Simulator Logic
// ==========================================
function initSpreadsheetGrid() {
  const table = document.getElementById('sim-grid-table');
  const viewport = document.getElementById('spreadsheet-viewport');
  if (!table) return;

  table.innerHTML = '';

  // 1. Create the Header Row (Corner + A, B, C...)
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  const cornerTh = document.createElement('th');
  cornerTh.className = 'corner-header';
  cornerTh.textContent = '';
  headerRow.appendChild(cornerTh);

  colHeaders.forEach((colLetter, cIndex) => {
    const th = document.createElement('th');
    th.textContent = colLetter;
    th.id = `sim-col-head-${cIndex + 1}`;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 2. Create the Table Body
  const tbody = document.createElement('tbody');
  sampleSpreadsheetData.forEach((row, rIndex) => {
    const tr = document.createElement('tr');

    // Row number header
    const rowTh = document.createElement('th');
    rowTh.className = 'row-header';
    rowTh.textContent = rIndex + 1;
    rowTh.id = `sim-row-head-${rIndex + 1}`;
    tr.appendChild(rowTh);

    // Cells
    row.forEach((cellText, cIndex) => {
      const td = document.createElement('td');
      td.className = 'sheet-cell';
      td.textContent = cellText;
      td.dataset.row = rIndex + 1;
      td.dataset.col = cIndex + 1;

      // Click to select
      td.addEventListener('click', () => {
        selectCell(rIndex + 1, cIndex + 1);
      });

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Sync overlay on scroll
  if (viewport) {
    viewport.addEventListener('scroll', () => {
      renderCellSelection();
    });
  }

  // Render initial selection
  renderCellSelection();
}

function selectCell(row, col) {
  // Clamp boundaries
  const maxRow = sampleSpreadsheetData.length;
  const maxCol = colHeaders.length;
  if (row < 1) row = 1;
  if (row > maxRow) row = maxRow;
  if (col < 1) col = 1;
  if (col > maxCol) col = maxCol;

  simState.selectedRow = row;
  simState.selectedCol = col;

  renderCellSelection();
  updateFormulaBar();
}

function updateFormulaBar() {
  const cellName = document.getElementById('sim-formula-cell-name');
  const cellVal = document.getElementById('sim-formula-cell-val');
  if (!cellName || !cellVal) return;

  const colLetter = colHeaders[simState.selectedCol - 1] || 'A';
  cellName.textContent = `${colLetter}${simState.selectedRow}`;

  const val = sampleSpreadsheetData[simState.selectedRow - 1] 
    ? sampleSpreadsheetData[simState.selectedRow - 1][simState.selectedCol - 1] 
    : '';
  cellVal.textContent = val;
}

function hexToRgba(hex, opacityPercent) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const a = opacityPercent / 100;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function renderCellSelection() {
  const viewport = document.getElementById('spreadsheet-viewport');
  const table = document.getElementById('sim-grid-table');
  const overlay = document.getElementById('sim-overlay');
  if (!viewport || !table || !overlay) return;

  // Clear previous selected cell styling
  table.querySelectorAll('.sheet-cell').forEach(cell => {
    cell.classList.remove('is-selected');
  });

  // Find target cell
  const targetCell = table.querySelector(`[data-row="${simState.selectedRow}"][data-col="${simState.selectedCol}"]`);
  if (!targetCell) return;
  targetCell.classList.add('is-selected');

  overlay.innerHTML = '';

  if (!simState.enabled) return;

  // Calculate cell position relative to table
  const tableRect = table.getBoundingClientRect();
  const cellRect = targetCell.getBoundingClientRect();

  const top = cellRect.top - tableRect.top;
  const left = cellRect.left - tableRect.left;
  const width = cellRect.width;
  const height = cellRect.height;

  const tableWidth = tableRect.width;
  const tableHeight = tableRect.height;

  // Size overlay to table
  overlay.style.width = `${tableWidth}px`;
  overlay.style.height = `${tableHeight}px`;

  const rgbaColor = hexToRgba(simState.color, simState.opacity);

  if (simState.style === 'line') {
    // 1. Horizontal line along bottom edge of cell
    const lineH = document.createElement('div');
    lineH.className = 'sim-guide-line-h';
    lineH.style.position = 'absolute';
    lineH.style.top = `${top + height - simState.thickness}px`;
    lineH.style.left = '0px';
    lineH.style.height = `${simState.thickness}px`;
    lineH.style.backgroundColor = simState.color;
    lineH.style.opacity = (simState.opacity / 100).toString();

    if (simState.rowLimit) {
      // Confine line up to cell right boundary
      lineH.style.width = `${left + width}px`;
    } else {
      lineH.style.width = `${tableWidth}px`;
    }
    overlay.appendChild(lineH);

    // 2. Vertical line along right edge of cell
    const lineV = document.createElement('div');
    lineV.className = 'sim-guide-line-v';
    lineV.style.position = 'absolute';
    lineV.style.top = '0px';
    lineV.style.left = `${left + width - simState.thickness}px`;
    lineV.style.width = `${simState.thickness}px`;
    lineV.style.height = `${tableHeight}px`;
    lineV.style.backgroundColor = simState.color;
    lineV.style.opacity = (simState.opacity / 100).toString();
    overlay.appendChild(lineV);

  } else {
    // Cell Band Mode
    // 1. Row Band
    const bandRow = document.createElement('div');
    bandRow.className = 'sim-cell-band-row';
    bandRow.style.position = 'absolute';
    bandRow.style.top = `${top}px`;
    bandRow.style.left = '0px';
    bandRow.style.height = `${height}px`;
    bandRow.style.backgroundColor = rgbaColor;

    if (simState.rowLimit) {
      bandRow.style.width = `${left + width}px`;
    } else {
      bandRow.style.width = `${tableWidth}px`;
    }
    overlay.appendChild(bandRow);

    // 2. Column Band
    const bandCol = document.createElement('div');
    bandCol.className = 'sim-cell-band-col';
    bandCol.style.position = 'absolute';
    bandCol.style.top = '0px';
    bandCol.style.left = `${left}px`;
    bandCol.style.width = `${width}px`;
    bandCol.style.height = `${tableHeight}px`;
    bandCol.style.backgroundColor = rgbaColor;
    overlay.appendChild(bandCol);
  }
}

// Bind Simulator Control Inputs
function setupSimulatorControls() {
  const toggleEnable = document.getElementById('sim-toggle-enable');
  const btnStyleLine = document.getElementById('sim-style-line');
  const btnStyleCell = document.getElementById('sim-style-cell');
  const toggleRowLimit = document.getElementById('sim-toggle-rowlimit');
  const inputThickness = document.getElementById('sim-input-thickness');
  const thicknessVal = document.getElementById('sim-val-thickness');
  const thicknessGroup = document.getElementById('sim-group-thickness');
  const inputColor = document.getElementById('sim-input-color');
  const inputOpacity = document.getElementById('sim-input-opacity');
  const opacityVal = document.getElementById('sim-val-opacity');

  if (toggleEnable) {
    toggleEnable.checked = simState.enabled;
    toggleEnable.addEventListener('change', (e) => {
      simState.enabled = e.target.checked;
      renderCellSelection();
    });
  }

  if (btnStyleLine && btnStyleCell) {
    btnStyleLine.addEventListener('click', () => {
      simState.style = 'line';
      btnStyleLine.classList.add('active');
      btnStyleCell.classList.remove('active');
      if (thicknessGroup) thicknessGroup.style.display = 'flex';
      renderCellSelection();
    });

    btnStyleCell.addEventListener('click', () => {
      simState.style = 'cell';
      btnStyleCell.classList.add('active');
      btnStyleLine.classList.remove('active');
      if (thicknessGroup) thicknessGroup.style.display = 'none';
      renderCellSelection();
    });
  }

  if (toggleRowLimit) {
    toggleRowLimit.checked = simState.rowLimit;
    toggleRowLimit.addEventListener('change', (e) => {
      simState.rowLimit = e.target.checked;
      renderCellSelection();
    });
  }

  if (inputThickness && thicknessVal) {
    inputThickness.value = simState.thickness;
    thicknessVal.textContent = `${simState.thickness}px`;
    inputThickness.addEventListener('input', (e) => {
      simState.thickness = parseInt(e.target.value, 10);
      thicknessVal.textContent = `${simState.thickness}px`;
      renderCellSelection();
    });
  }

  if (inputColor) {
    inputColor.value = simState.color;
    inputColor.addEventListener('input', (e) => {
      simState.color = e.target.value;
      renderCellSelection();
    });
  }

  // Preset Color Pills
  document.querySelectorAll('.color-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const c = pill.dataset.color;
      if (c) {
        simState.color = c;
        if (inputColor) inputColor.value = c;
        document.querySelectorAll('.color-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderCellSelection();
      }
    });
  });

  if (inputOpacity && opacityVal) {
    inputOpacity.value = simState.opacity;
    opacityVal.textContent = `${simState.opacity}%`;
    inputOpacity.addEventListener('input', (e) => {
      simState.opacity = parseInt(e.target.value, 10);
      opacityVal.textContent = `${simState.opacity}%`;
      renderCellSelection();
    });
  }

  // Arrow Key Navigation in Table
  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectCell(simState.selectedRow - 1, simState.selectedCol);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectCell(simState.selectedRow + 1, simState.selectedCol);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectCell(simState.selectedRow, simState.selectedCol - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectCell(simState.selectedRow, simState.selectedCol + 1);
    }
  });

  // Re-render on window resize
  window.addEventListener('resize', () => {
    renderCellSelection();
  });
}

// ==========================================
// 6. Screenshot Gallery Tabs
// ==========================================
function setupGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab-btn');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      items.forEach(i => i.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.dataset.target;
      const targetItem = document.getElementById(targetId);
      if (targetItem) {
        targetItem.classList.add('active');
      }
    });
  });
}

// ==========================================
// 7. Accordions & Dropdown Handlers
// ==========================================
function setupAccordionsAndModals() {
  // Language Dropdown
  const langBtn = document.getElementById('lang-select-btn');
  const langDropdown = document.getElementById('lang-dropdown');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.dataset.lang;
        setLanguage(lang);
        langDropdown.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target) && !langBtn.contains(e.target)) {
        langDropdown.classList.remove('active');
      }
    });
  }

  // Theme Toggle
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Developer Mode Accordion
  const devHeader = document.getElementById('dev-accordion-toggle');
  const devContent = document.getElementById('dev-accordion-content');
  if (devHeader && devContent) {
    devHeader.addEventListener('click', () => {
      devContent.classList.toggle('active');
      const arrow = devHeader.querySelector('.dev-arrow');
      if (arrow) {
        arrow.textContent = devContent.classList.contains('active') ? '▲' : '▼';
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

// ==========================================
// 8. Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Detect language: URL query ?lang= or localStorage or navigator.language
  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = urlParams.get('lang');
  const savedLang = localStorage.getItem('sch_landing_lang');
  let initialLang = 'en';

  if (paramLang && i18nData[paramLang]) {
    initialLang = paramLang;
  } else if (savedLang && i18nData[savedLang]) {
    initialLang = savedLang;
  } else {
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('ja')) initialLang = 'ja';
    else if (browserLang.startsWith('pt')) initialLang = 'pt-BR';
    else initialLang = 'en';
  }

  // Detect theme
  const savedTheme = localStorage.getItem('sch_landing_theme');
  const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(initialTheme);
  setLanguage(initialLang);

  initSpreadsheetGrid();
  setupSimulatorControls();
  setupGalleryTabs();
  setupAccordionsAndModals();
});
