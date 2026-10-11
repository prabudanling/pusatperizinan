// ============================================================
// PUSATPERIZINAN.COM — Translations Part A (East & Southeast Asia)
// zh, ja, ko, vi, th, tl, ms — Task 7-a
//
// Kontrak key: interface Translation (src/lib/i18n/types.ts)
// Token yang DIPERTAHANKAN apa adanya: {p}, {n}, {name}, {year},
// **RIZKI** (bold), \n (newline), 👋 & 😊 (chatWelcome).
// Key kosong wajib "": calcT2, hubT2, blogT2, courseT2, whyT2,
// processT2, pricingT2, testiT2, compT2, faqT2, ctaT2, sitemapT2.
// ============================================================

import type { LangCode, Translation } from "./types";

export const TRANSLATIONS_A: Partial<Record<LangCode, Translation>> = {
  // ============================================================
  // zh — 中文（简体） Chinese Simplified
  // ============================================================
  zh: {
    // Header
    navServices: "服务",
    navCheckAI: "AI 执照检测",
    navCalculator: "费用计算器",
    navGuides: "办证指南",
    navBlog: "博客",
    navCoverage: "服务范围",
    navPricing: "价格",
    navFaq: "常见问题",
    headerTagline: "印尼第一企业执照咨询顾问",
    ctaFree: "免费咨询",
    // Hero
    heroBadge: "深受 1,247+ 家企业信赖 — 覆盖印尼 38 省 & 514 座城市",
    heroTitle1: "企业执照",
    heroHigh1: "一站式代办",
    heroTitle2: "您只需安心收证 —",
    heroHigh2: "轻松搞定",
    heroSubtitle:
      "从 NIB、PT、CV、清真认证、BPOM 到 AMDAL — 专家团队全程代办，100% 合法合规，未下证全额退款。35万印尼盾起，最快 1 个工作日出证。",
    heroBullet1: "NIB 1 天 • PT 3 天 • 告别政府部门排队奔波",
    heroBullet2: "官方政府渠道 — 文件合法且经认证",
    heroBullet3: "执照未获签发，100% 全额退款保证",
    heroReviews: "来自 890+ 条客户评价",
    // Hero form
    formTitle: "15 分钟免费咨询",
    formSubtitle: "零费用、零承诺 — 资深顾问直接对接。",
    labelFree: "免费",
    labelName: "姓名 *",
    labelWa: "WhatsApp 号码 *",
    labelSector: "业务类型",
    phSector: "请选择行业",
    labelNeed: "您的需求",
    phNeed: "请选择套餐",
    pkgNotSure: "还不确定 / 先咨询",
    pkgPrefix: "{p} 套餐",
    labelDesc: "简单介绍一下您的业务（选填）",
    phDesc: "例如：我想在万隆开一家咖啡馆，场地已就绪，但还没有注册公司主体……",
    btnSubmit: "报名免费咨询",
    btnSending: "提交中...",
    privacyNote: "您的数据安全无忧，绝不与第三方共享",
    successTitle: "报名成功！🎉",
    successBody:
      "谢谢您，{name}！我们的资深顾问将在 24 小时内通过 WhatsApp 与您联系（工作时间内通常不到 15 分钟）。",
    btnAnother: "登记另一家企业",
    // Toasts
    toastSuccess: "免费咨询已报名！🎉",
    toastFail: "发送失败",
    toastConn: "网络连接异常",
    // Stats
    statClients: "已服务客户",
    statPermits: "已办理执照",
    statProvinces: "省",
    statCities: "县市",
    statSatisfaction: "客户满意度",
    statAvgTime: "平均办理时长",
    statHours: "小时",
    // Section titles
    servicesT1: "企业所有",
    servicesTHigh: "合规证照需求",
    servicesT2: "一站办齐",
    checkerT1: "30 秒查出",
    checkerTHigh: "您需要的执照",
    checkerT2: "清单",
    calcT1: "执照费用计算器 —",
    calcTHigh: "先算账，后决策",
    calcT2: "",
    hubT1: "印尼企业办证指南 —",
    hubTHigh: "全面、清晰、随时更新",
    hubT2: "",
    blogT1: "执照文章文库",
    blogTHigh: "全印尼最丰富",
    blogT2: "",
    courseT1: "7 天精通",
    courseTHigh: "印尼企业办证",
    courseT2: "",
    coverageT1: "覆盖 {n} 个省与",
    coverageTHigh: "{n} 个县市",
    coverageT2: "— 从沙璜到马老奇",
    whyT1: "不止是办证中介 —",
    whyTHigh: "更是企业的合规伙伴",
    whyT2: "",
    processT1: "4 步迈向",
    processTHigh: "合法经营",
    processT2: "",
    pricingT1: "价格透明在先，",
    pricingTHigh: "绝无隐性收费",
    pricingT2: "",
    testiT1: "1,247+ 家企业已",
    testiTHigh: "合法合规",
    testiT2: "",
    compT1: "为什么选择我们，",
    compTHigh: "而不是其他顾问？",
    compT2: "",
    faqT1: "客户",
    faqTHigh: "最常问的问题",
    faqT2: "",
    ctaT1: "生意已经开起来了？",
    ctaTHigh: "现在就办齐执照。",
    ctaT2: "",
    sitemapT1: "完整目录：",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "从中小企业到大型集团 — 40+ 种证照，我们通过官方政府渠道全程办妥。",
    checkerSub:
      "只需简单描述您的业务。我们的 AI 深谙《创造就业综合法》（UU Cipta Kerja）与 OSS-RBA 法规，将为您生成完整的办证路线图 — 免费，无需注册。",
    calcSub:
      "选择您需要的执照，系统立即估算费用与周期。从第一分钟起就透明 — 没有任何隐藏费用。",
    hubSub:
      "关于 NIB、PT、CV、清真认证、BPOM、PBG/SLF、AMDAL、PMA 乃至企业税务的一切 — 从基础知识到技术细节，依据《创造就业综合法》与最新法规编写。",
    blogSub:
      "{n} 篇由法规专家团队撰写的深度文章 — PT 注册费用、餐饮业 KBLI、PMA、矿业 RKAB、朝觐旅行，直到进军沙特阿拉伯。免费阅读，持续更新。",
    courseSub:
      "每天早晨，一份 5 分钟精炼课程 + 实用清单直达您的邮箱。由我们的法规专家执笔 — 不讲理论，只讲行业中真正在用的实操干货。",
    coverageSub:
      "无论您的企业位于巴淡岛、瓦梅纳还是巴厘巴板 — 整个办证流程我们在线完成，文件通过快递寄送；如需实地审核、AMDAL 或矿业服务，我们的现场团队会上门办理。",
    whySub:
      "数千位企业主在别的咨询公司那里失望之后，转而选择了我们。原因如下：",
    processSub: "您无需为办证跑一趟政府部门。所有协调都由我们完成。",
    pricingSub:
      "所有套餐均含官方费用与服务费。首付 50%，执照下证后再付 50%。",
    testiSub:
      "890+ 条评价，评分 4.9/5。听听这些客户的故事 — 他们的生意如今合法无忧。",
    compSub:
      "与印尼执照代办行业常见做法的客观对比（Infiniti Office、EasyLegal、Izin.co.id 等）。",
    faqSub: "仍有疑虑？这些答案也许能帮到您。也可以直接咨询我们的 AI 顾问。",
    ctaSub:
      "没有正规执照的每一天 = 罚款、处罚的风险，以及与招投标、融资机会擦肩而过。15 分钟免费咨询 — 我们为您规划所需的一切，之后由您自由决定。",
    sitemapSub:
      "一页导航直达我们的全部内容与服务 — 为您，也为搜索引擎。",
    // Final CTA extras
    ctaBadge: "每日名额有限",
    ctaFormTitle: "预约免费咨询",
    ctaFormSub: "30 秒填完 — 资深顾问主动联系您。",
    ctaSubmit: "预约免费咨询",
    ctaSuccessTitle: "请求已收到！🎉",
    ctaSuccessBody:
      "顾问将在 24 小时内通过 WhatsApp 与您联系。等待期间，不妨试试「AI 执照检测」功能！",
    ctaWaBtn: "立即 WhatsApp 咨询",
    ctaPrivacy: "100% 免费 • 无任何约束 • 数据安全",
    // Knowledge hub tabs
    tabPerIzin: "按执照",
    tabPerSektor: "按行业",
    tabPerWilayah: "按地区",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "免费邮件课程 — 100% 不收费",
    courseFormTitle: "立即免费报名",
    courseFormSub: "8 天 × 5 分钟 = 企业 100% 合法，从此不怕罚款。",
    courseSuccessTitle: "欢迎加入课程！",
    // Footer
    footerTagline:
      "值得信赖的印尼企业执照咨询公司。企业合法化事务交由专家团队打理 — 快速、透明、有保障。",
    footerVerified:
      "已注册并与 38 个省、514 个县市的官方公证机构合作",
    footerColServices: "服务",
    footerColCompany: "公司",
    footerColContact: "联系我们",
    footerHours: "周一至周六，08.00-20.00 WIB",
    footerNote:
      "与印尼证券交易所同一楼层 • 在线服务全印尼",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen，保留所有权利。",
    footerMade: "以 ❤️ 助力印尼中小企业腾飞",
    // Chat
    chatTitle: "RIZKI — AI 顾问",
    chatStatus: "在线 • 秒级回复",
    chatWelcome:
      "您好！👋 我是 **RIZKI**，PusatPerizinan.com 的 AI 顾问 — 全天 24 小时在线，解答所有企业办证问题。\n\nNIB、PT、CV、清真认证、BPOM 或其他执照？尽管问！😊",
    chatPlaceholder: "咨询企业执照问题……",
    chatTyping: "RIZKI 正在输入……",
    chatQr1: "开咖啡馆需要哪些执照？",
    chatQr2: "注册 PT 公司要多少钱？",
    chatQr3: "中小企业如何注册 NIB",
    chatQr4: "PIRT 和 BPOM 有什么区别？",
    // Language
    languageLabel: "语言",
    searchLanguages: "搜索语言……",
    contentNote:
      "下方的完整指南为印尼语 — 可让 RIZKI AI 用您的语言为您讲解。",
  },

  // ============================================================
  // ja — 日本語 Japanese
  // ============================================================
  ja: {
    // Header
    navServices: "サービス",
    navCheckAI: "AI許認可チェック",
    navCalculator: "料金計算",
    navGuides: "ガイド",
    navBlog: "ブログ",
    navCoverage: "対応エリア",
    navPricing: "料金",
    navFaq: "よくある質問",
    headerTagline: "インドネシアNo.1の許認可コンサルタント",
    ctaFree: "無料相談",
    // Hero
    heroBadge: "1,247社以上が信頼 — インドネシア38州・514都市をカバー",
    heroTitle1: "許認可は",
    heroHigh1: "すべて丸ごと代行",
    heroTitle2: "あとは受け取るだけ —",
    heroHigh2: "ラクラク完了",
    heroSubtitle:
      "NIB、PT、CV、ハラル認証、BPOMからAMDALまで — 専門チームがすべて代行、100%合法、許可が下りなければ全額返金保証。35万ルピアから、最短1営業日で取得。",
    heroBullet1: "NIB 1日 • PT 3日 • 役所へ並ぶ手間はゼロ",
    heroBullet2: "政府の正規ルート — 有効かつ認証済みの書類",
    heroBullet3: "許可が発行されない場合は100%全額返金保証",
    heroReviews: "890件以上のお客様レビューから",
    // Hero form
    formTitle: "15分の無料相談",
    formSubtitle: "費用不要、契約不要 — シニアコンサルタントが直接対応。",
    labelFree: "無料",
    labelName: "氏名 *",
    labelWa: "WhatsApp番号 *",
    labelSector: "業種",
    phSector: "セクターを選択",
    labelNeed: "ご要望",
    phNeed: "プランを選択",
    pkgNotSure: "まだ決まっていない / まずは相談",
    pkgPrefix: "{p}プラン",
    labelDesc: "事業内容を簡単にお知らせください（任意）",
    phDesc: "例：バンドンでカフェを開きたい。物件はあるが、法人はまだない……",
    btnSubmit: "無料相談に申し込む",
    btnSending: "送信中...",
    privacyNote: "お客様のデータは安全に保護され、第三者に提供されません",
    successTitle: "申し込み完了！🎉",
    successBody:
      "ありがとうございます、{name}さん！シニアコンサルタントが24時間以内にWhatsAppでご連絡します（営業時間内なら通常15分以内）。",
    btnAnother: "別の事業を登録する",
    // Toasts
    toastSuccess: "無料相談を予約しました！🎉",
    toastFail: "送信に失敗しました",
    toastConn: "接続に問題があります",
    // Stats
    statClients: "サポートした企業",
    statPermits: "取得した許認可",
    statProvinces: "州",
    statCities: "市・郡",
    statSatisfaction: "顧客満足度",
    statAvgTime: "平均処理時間",
    statHours: "時間",
    // Section titles
    servicesT1: "あらゆる",
    servicesTHigh: "法的ニーズ",
    servicesT2: "をワンストップで",
    checkerT1: "必要な許認可が",
    checkerTHigh: "30秒",
    checkerT2: "でわかる",
    calcT1: "許認可費用シミュレーション —",
    calcTHigh: "まず計算、それから決断",
    calcT2: "",
    hubT1: "インドネシア許認可ガイド —",
    hubTHigh: "網羅的・明快・最新",
    hubT2: "",
    blogT1: "許認可アーカイブ",
    blogTHigh: "インドネシア最大級",
    blogT2: "",
    courseT1: "インドネシアの許認可を",
    courseTHigh: "7日間でマスター",
    courseT2: "",
    coverageT1: "{n}州と",
    coverageTHigh: "{n}市・郡",
    coverageT2: "— サバンからメラウケまで",
    whyT1: "ただの代行業者ではなく —",
    whyTHigh: "事業の法務パートナー",
    whyT2: "",
    processT1: "4ステップで",
    processTHigh: "合法ビジネスへ",
    processT2: "",
    pricingT1: "料金は最初から明確、",
    pricingTHigh: "隠れた費用は一切なし",
    pricingT2: "",
    testiT1: "1,247社以上の事業が",
    testiTHigh: "合法化を実現",
    testiT2: "",
    compT1: "他のコンサルタントではなく",
    compTHigh: "当社が選ばれる理由は？",
    compT2: "",
    faqT1: "お客様から",
    faqTHigh: "よくあるご質問",
    faqT2: "",
    ctaT1: "ビジネスはすでに動いている？",
    ctaTHigh: "今すぐ合法的に。",
    ctaT2: "",
    sitemapT1: "PusatPerizinan.com の",
    sitemapTHigh: "完全ディレクトリ",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "中小企業から大企業まで — 40種類以上の許認可を政府の正規ルートでトータルサポート。",
    checkerSub:
      "事業内容を書くだけ。雇用創出法（UU Cipta Kerja）とOSS-RBA規制で訓練されたAIが、完全な許認可ロードマップを作成 — 無料、登録不要。",
    calcSub:
      "必要な許認可を選ぶだけで、費用と期間の概算を即時計算。最初の1分から透明 — 隠れた費用はありません。",
    hubSub:
      "NIB、PT、CV、ハラル認証、BPOM、PBG/SLF、AMDAL、PMA、事業税まで — 基礎から技術的詳細まで網羅。雇用創出法と最新規制に基づいて作成。",
    blogSub:
      "規制の専門家チームによる{n}本の深掘り記事 — PT設立費用、飲食業のKBLI、PMA、鉱業RKAB、ウムラ旅行からサウジアラビア進出まで。読むのは無料、常に更新。",
    courseSub:
      "毎朝、5分のコンパクトなレッスン＋実践チェックリストをメールでお届け。規制の専門家チーム執筆 — 理論ではなく、現場で本当に使われているノウハウです。",
    coverageSub:
      "事業地がバタム、ワメナ、バリクパパンのどこであっても — 許認可プロセスはすべてオンラインで完結、書類は宅配便で発送、実地監査・AMDAL・鉱業セクターが必要な場合は現地チームが対応します。",
    whySub:
      "他のコンサルタントに失望した何千もの事業主が、当社へ乗り換えてきました。その理由は：",
    processSub: "役所へ行く必要は1日もありません。調整はすべて当社が行います。",
    pricingSub:
      "すべてのプランに公式費用とサービス料が含まれています。前払い50%、許可発行後に50%。",
    testiSub:
      "890件以上のレビューで4.9/5の評価。事業が正式に合法化され、安心して運営できるようになったお客様の声です。",
    compSub:
      "インドネシアの許認可代行サービスで一般的な慣行との客観的な比較（Infiniti Office、EasyLegal、Izin.co.id など）。",
    faqSub: "まだ迷っていますか？これらの回答が参考になるはずです。またはAIコンサルタントに直接質問してください。",
    ctaSub:
      "正式な許可のない1日1日 = 罰金・制裁のリスク、入札や資金調達の機会損失。15分の無料相談 — 必要なものをすべてマッピングし、決断するのはその後で自由です。",
    sitemapSub:
      "当社のすべてのコンテンツ＆サービスへの1ページナビゲーション — あなたのため、そして検索エンジンのために。",
    // Final CTA extras
    ctaBadge: "1日あたりの受付枠は限定",
    ctaFormTitle: "無料相談を予約",
    ctaFormSub: "30秒で入力完了 — シニアコンサルタントがご連絡します。",
    ctaSubmit: "無料相談を予約する",
    ctaSuccessTitle: "リクエストを受け付けました！🎉",
    ctaSuccessBody:
      "コンサルタントが24時間以内にWhatsAppでご連絡します。お待ちの間、AI許認可チェック機能をお試しください！",
    ctaWaBtn: "今すぐWhatsAppでチャット",
    ctaPrivacy: "100%無料 • コミットメントなし • データは安全",
    // Knowledge hub tabs
    tabPerIzin: "許認可別",
    tabPerSektor: "業種別",
    tabPerWilayah: "地域別",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "無料メール講座 — 完全無料",
    courseFormTitle: "今すぐ無料登録",
    courseFormSub: "8日 × 5分 = 事業は100%合法、罰金の心配なし。",
    courseSuccessTitle: "講座へようこそ！",
    // Footer
    footerTagline:
      "インドネシアで信頼される許認可コンサルタント。事業の合法性をエキスパートチームが対応 — 迅速、透明、保証付き。",
    footerVerified:
      "38州・514市郡の公証人に登録・提携",
    footerColServices: "サービス",
    footerColCompany: "会社情報",
    footerColContact: "お問い合わせ",
    footerHours: "月曜〜土曜、8:00〜20:00（WIB）",
    footerNote:
      "インドネシア証券取引所と同じフロア • インドネシア全土をオンラインでサポート",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. All rights reserved.",
    footerMade: "❤️を込めて — インドネシア中小企業の発展のために",
    // Chat
    chatTitle: "RIZKI — AIコンサルタント",
    chatStatus: "オンライン • 数秒で回答",
    chatWelcome:
      "こんにちは！👋 私は **RIZKI**、PusatPerizinan.com のAIコンサルタント — 許認可に関するご質問に24時間対応します。\n\nNIB、PT、CV、ハラル、BPOMなど、どんな許認可でも気軽にどうぞ！😊",
    chatPlaceholder: "許認可について質問...",
    chatTyping: "RIZKIが入力中...",
    chatQr1: "カフェ開業に必要な許可は？",
    chatQr2: "PT設立の費用はいくら？",
    chatQr3: "中小企業のNIB登録方法",
    chatQr4: "PIRTとBPOMの違いは？",
    // Language
    languageLabel: "言語",
    searchLanguages: "言語を検索...",
    contentNote:
      "以下の完全ガイドはインドネシア語です — RIZKI AIに聞けば、あなたの言語で説明します。",
  },

  // ============================================================
  // ko — 한국어 Korean
  // ============================================================
  ko: {
    // Header
    navServices: "서비스",
    navCheckAI: "AI 허가 체크",
    navCalculator: "비용 계산기",
    navGuides: "가이드",
    navBlog: "블로그",
    navCoverage: "서비스 지역",
    navPricing: "요금",
    navFaq: "자주 묻는 질문",
    headerTagline: "인도네시아 1위 사업 허가 컨설팅",
    ctaFree: "무료 상담",
    // Hero
    heroBadge: "1,247개 이상 기업이 신뢰 — 인도네시아 38개 주 & 514개 도시 커버",
    heroTitle1: "사업 허가,",
    heroHigh1: "전부 우리가 대행",
    heroTitle2: "수령만 하면 끝 —",
    heroHigh2: "편하게 완료",
    heroSubtitle:
      "NIB, PT, CV, 할랄 인증, BPOM부터 AMDAL까지 — 전문가 팀이 처리하고 100% 합법, 허가 미발급 시 전액 환불 보장. 35만 루피아부터, 최단 1영업일.",
    heroBullet1: "NIB 1일 • PT 3일 • 관공서 줄 서기 없이",
    heroBullet2: "정부 공식 채널 — 유효하고 검증된 서류",
    heroBullet3: "허가 발급 실패 시 100% 전액 환불 보장",
    heroReviews: "890개 이상 고객 후기 기준",
    // Hero form
    formTitle: "15분 무료 상담",
    formSubtitle: "비용 없음, 의무 없음 — 시니어 컨설턴트가 바로 상담합니다.",
    labelFree: "무료",
    labelName: "성함 *",
    labelWa: "WhatsApp 번호 *",
    labelSector: "업종",
    phSector: "업종 선택",
    labelNeed: "필요 사항",
    phNeed: "패키지 선택",
    pkgNotSure: "아직 미정 / 먼저 상담",
    pkgPrefix: "{p} 패키지",
    labelDesc: "사업을 간단히 소개해 주세요 (선택)",
    phDesc: "예: 반둥에 카페를 열고 싶습니다. 장소는 있는데 법인은 아직 없습니다...",
    btnSubmit: "무료 상담 신청",
    btnSending: "전송 중...",
    privacyNote: "고객님의 데이터는 안전하게 보호되며 제3자에게 제공되지 않습니다",
    successTitle: "신청 완료! 🎉",
    successBody:
      "감사합니다, {name}님! 시니어 컨설턴트가 24시간 이내에 WhatsApp으로 연락드립니다 (근무 시간 내에는 보통 15분 이내).",
    btnAnother: "다른 사업 등록하기",
    // Toasts
    toastSuccess: "무료 상담 신청 완료! 🎉",
    toastFail: "전송 실패",
    toastConn: "연결에 문제가 있습니다",
    // Stats
    statClients: "서비스 고객",
    statPermits: "처리한 허가",
    statProvinces: "주",
    statCities: "시·군",
    statSatisfaction: "고객 만족도",
    statAvgTime: "평균 처리 시간",
    statHours: "시간",
    // Section titles
    servicesT1: "사업에 필요한",
    servicesTHigh: "모든 법무",
    servicesT2: "를 한 곳에서",
    checkerT1: "필요한 허가를",
    checkerTHigh: "30초",
    checkerT2: "만에 확인",
    calcT1: "허가 비용 계산기 —",
    calcTHigh: "먼저 계산, 나중에 결정",
    calcT2: "",
    hubT1: "인도네시아 사업 허가 가이드 —",
    hubTHigh: "완벽 · 명확 · 최신",
    hubT2: "",
    blogT1: "허가 아티클 라이브러리",
    blogTHigh: "인도네시아 최다",
    blogT2: "",
    courseT1: "7일 만에 정복하는",
    courseTHigh: "인도네시아 사업 허가",
    courseT2: "",
    coverageT1: "{n}개 주와",
    coverageTHigh: "{n}개 시·군",
    coverageT2: "— 사방에서 메라우케까지",
    whyT1: "단순 대행업체가 아닌 —",
    whyTHigh: "사업의 법무 파트너",
    whyT2: "",
    processT1: "4단계로 완성하는",
    processTHigh: "합법 비즈니스",
    processT2: "",
    pricingT1: "처음부터 명확한 가격,",
    pricingTHigh: "숨은 비용 없음",
    pricingT2: "",
    testiT1: "1,247개 이상 기업이",
    testiTHigh: "합법화를 입증",
    testiT2: "",
    compT1: "다른 컨설턴트 대신",
    compTHigh: "우리를 선택하는 이유는?",
    compT2: "",
    faqT1: "자주",
    faqTHigh: "묻는 질문",
    faqT2: "",
    ctaT1: "사업이 이미 돌아가고 있나요?",
    ctaTHigh: "지금 합법으로 만드세요.",
    ctaT2: "",
    sitemapT1: "PusatPerizinan.com",
    sitemapTHigh: "전체 디렉터리",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "중소기업부터 대기업까지 — 40종 이상의 허가를 정부 공식 채널로 끝까지 처리합니다.",
    checkerSub:
      "사업 내용만 적어주세요. 일자리 창출법(UU Cipta Kerja)과 OSS-RBA 규정으로 학습된 AI가 완전한 허가 로드맵을 작성합니다 — 무료, 회원가입 불필요.",
    calcSub:
      "필요한 허가를 선택하면 비용과 기간 추정치가 바로 계산됩니다. 첫 순간부터 투명 — 숨은 비용은 없습니다.",
    hubSub:
      "NIB, PT, CV, 할랄 인증, BPOM, PBG/SLF, AMDAL, PMA, 사업 세금까지 — 기초부터 기술적 세부사항까지. 일자리 창출법과 최신 규정을 기반으로 구성했습니다.",
    blogSub:
      "규제 전문가 팀이 쓴 {n}편의 심층 아티클 — PT 설립 비용, 외식업 KBLI, PMA, 광업 RKAB, 움라 여행부터 사우디아라비아 진출까지. 무료 열람, 항상 업데이트.",
    courseSub:
      "매일 아침 5분짜리 핵심 강의 + 실전 체크리스트가 이메일로 도착합니다. 규제 전문가 팀 집필 — 이론이 아니라 현장에서 실제 쓰이는 노하우입니다.",
    coverageSub:
      "사업이 바탐, 와메나, 발리크파판 어디에 있든 — 허가 절차 전체를 온라인으로 진행하고 서류는 택배로 발송하며, 현장 실사·AMDAL·광업이 필요하면 현지 팀이 방문합니다.",
    whySub:
      "다른 컨설팅에 실망한 수천 명의 사업주가 우리에게 갈아탔습니다. 그 이유는:",
    processSub: "관공서에 갈 필요가 단 하루도 없습니다. 모든 조정은 우리가 합니다.",
    pricingSub:
      "모든 패키지에 공식 비용과 서비스 수수료가 포함됩니다. 50% 선불, 허가 발급 후 50%.",
    testiSub:
      "890개 이상 후기에서 4.9/5 평점. 이제 합법적이고 안심되는 사업을 하고 있는 고객들의 이야기입니다.",
    compSub:
      "인도네시아 허가 대행 업계의 일반적인 관행과의 객관적 비교 (Infiniti Office, EasyLegal, Izin.co.id 등).",
    faqSub: "아직 고민되시나요? 이 답변이 도움이 될 것입니다. 또는 AI 컨설턴트에게 바로 물어보세요.",
    ctaSub:
      "정식 허가 없는 하루하루 = 벌금·제재 리스크, 입찰과 투자유치 기회 상실. 15분 무료 상담 — 필요한 모든 것을 짜드리고, 결정은 그 후에 자유롭게.",
    sitemapSub:
      "모든 콘텐츠와 서비스로 가는 한 페이지 내비게이션 — 고객을 위해, 그리고 검색엔진을 위해.",
    // Final CTA extras
    ctaBadge: "하루 한정 슬롯",
    ctaFormTitle: "무료 상담 예약",
    ctaFormSub: "30초면 충분 — 시니어 컨설턴트가 연락드립니다.",
    ctaSubmit: "무료 상담 예약하기",
    ctaSuccessTitle: "요청 접수 완료! 🎉",
    ctaSuccessBody:
      "컨설턴트가 24시간 이내 WhatsApp으로 연락드립니다. 기다리는 동안 AI 허가 체크 기능을 이용해 보세요!",
    ctaWaBtn: "지금 WhatsApp으로 채팅",
    ctaPrivacy: "100% 무료 • 의무 없음 • 데이터 안전",
    // Knowledge hub tabs
    tabPerIzin: "허가별",
    tabPerSektor: "업종별",
    tabPerWilayah: "지역별",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "무료 이메일 강좌 — 100% 무료",
    courseFormTitle: "지금 무료로 등록",
    courseFormSub: "8일 × 5분 = 100% 합법 사업, 벌금 걱정 제로.",
    courseSuccessTitle: "클래스에 오신 것을 환영합니다!",
    // Footer
    footerTagline:
      "인도네시아에서 신뢰받는 사업 허가 컨설팅. 사업 합법화를 전문가 팀이 처리 — 빠르고, 투명하고, 보장됩니다.",
    footerVerified:
      "38개 주·514개 시군의 공증인과 등록·제휴",
    footerColServices: "서비스",
    footerColCompany: "회사",
    footerColContact: "연락처",
    footerHours: "월~토, 08.00-20.00 (WIB)",
    footerNote:
      "인도네시아 증권거래소와 같은 층 • 인도네시아 전역 온라인 서비스",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. 모든 권리 보유.",
    footerMade: "인도네시아 중소기업의 발전을 위해 ❤️을 담아 제작",
    // Chat
    chatTitle: "RIZKI — AI 컨설턴트",
    chatStatus: "온라인 • 몇 초 안에 답변",
    chatWelcome:
      "안녕하세요! 👋 저는 **RIZKI**, PusatPerizinan.com의 AI 컨설턴트입니다 — 사업 허가 관련 질문에 24시간 내내 대기 중입니다.\n\nNIB, PT, CV, 할랄, BPOM 등 어떤 허가든 편하게 물어보세요! 😊",
    chatPlaceholder: "사업 허가에 대해 물어보세요...",
    chatTyping: "RIZKI가 입력 중...",
    chatQr1: "카페 오픈에 필요한 허가는?",
    chatQr2: "PT 설립 비용은 얼마인가요?",
    chatQr3: "중소기업 NIB 등록 방법",
    chatQr4: "PIRT와 BPOM의 차이는?",
    // Language
    languageLabel: "언어",
    searchLanguages: "언어 검색...",
    contentNote:
      "아래의 전체 가이드는 인도네시아어로 제공됩니다 — RIZKI AI에게 물으면 고객님의 언어로 설명해 드립니다.",
  },

  // ============================================================
  // vi — Tiếng Việt Vietnamese
  // ============================================================
  vi: {
    // Header
    navServices: "Dịch vụ",
    navCheckAI: "Kiểm tra phép AI",
    navCalculator: "Máy tính chi phí",
    navGuides: "Cẩm nang",
    navBlog: "Blog",
    navCoverage: "Phạm vi",
    navPricing: "Bảng giá",
    navFaq: "Hỏi đáp",
    headerTagline: "Tư vấn giấy phép kinh doanh số 1 tại Indonesia",
    ctaFree: "Tư vấn miễn phí",
    // Hero
    heroBadge: "Hơn 1.247 doanh nghiệp tin dùng tại 38 tỉnh & 514 thành phố của Indonesia",
    heroTitle1: "Mọi giấy phép",
    heroHigh1: "kinh doanh",
    heroTitle2: "chúng tôi lo trọn gói —",
    heroHigh2: "cứ ngồi nhận",
    heroSubtitle:
      "Từ NIB, PT, CV, Halal, BPOM đến AMDAL — đội chuyên gia xử lý trọn gói, hợp pháp 100%, cam kết hoàn tiền nếu không được cấp. Chỉ từ 350 nghìn Rupiah, nhanh nhất 1 ngày làm việc.",
    heroBullet1: "NIB 1 ngày • PT 3 ngày • Không cần xếp hàng ở cơ quan nhà nước",
    heroBullet2: "Kênh chính thống của nhà nước — hồ sơ hợp lệ & được xác minh",
    heroBullet3: "Cam kết hoàn tiền 100% nếu giấy phép không được cấp",
    heroReviews: "từ hơn 890 đánh giá của khách hàng",
    // Hero form
    formTitle: "Tư vấn miễn phí 15 phút",
    formSubtitle: "Không mất phí, không ràng buộc — tư vấn trực tiếp với chuyên gia cao cấp.",
    labelFree: "Miễn phí",
    labelName: "Họ và tên *",
    labelWa: "Số WhatsApp *",
    labelSector: "Loại hình kinh doanh",
    phSector: "Chọn lĩnh vực",
    labelNeed: "Nhu cầu của bạn",
    phNeed: "Chọn gói dịch vụ",
    pkgNotSure: "Chưa chắc / tư vấn trước",
    pkgPrefix: "Gói {p}",
    labelDesc: "Mô tả ngắn về doanh nghiệp của bạn (không bắt buộc)",
    phDesc: "VD: Tôi muốn mở quán cà phê ở Bandung, đã có mặt bằng, nhưng chưa có pháp nhân...",
    btnSubmit: "Đăng ký tư vấn miễn phí",
    btnSending: "Đang gửi...",
    privacyNote: "Dữ liệu của bạn được bảo mật & không chia sẻ cho bên thứ ba",
    successTitle: "Đăng ký thành công! 🎉",
    successBody:
      "Cảm ơn {name}! Chuyên gia cao cấp của chúng tôi sẽ liên hệ WhatsApp của bạn trong vòng 24 giờ (trong giờ làm việc thường dưới 15 phút).",
    btnAnother: "Đăng ký doanh nghiệp khác",
    // Toasts
    toastSuccess: "Đã đăng ký tư vấn miễn phí! 🎉",
    toastFail: "Gửi thất bại",
    toastConn: "Kết nối gặp sự cố",
    // Stats
    statClients: "Khách hàng đã phục vụ",
    statPermits: "Giấy phép đã xử lý",
    statProvinces: "Tỉnh",
    statCities: "Huyện/Thành phố",
    statSatisfaction: "Mức độ hài lòng",
    statAvgTime: "Thời gian xử lý trung bình",
    statHours: "giờ",
    // Section titles
    servicesT1: "Một đầu mối cho",
    servicesTHigh: "mọi nhu cầu pháp lý",
    servicesT2: "của doanh nghiệp",
    checkerT1: "Tra cứu giấy phép",
    checkerTHigh: "bạn cần",
    checkerT2: "trong 30 giây",
    calcT1: "Máy tính chi phí giấy phép —",
    calcTHigh: "tính trước, quyết sau",
    calcT2: "",
    hubT1: "Cẩm nang giấy phép kinh doanh Indonesia —",
    hubTHigh: "đầy đủ, rõ ràng, cập nhật",
    hubT2: "",
    blogT1: "Thư viện bài viết về giấy phép",
    blogTHigh: "đầy đủ nhất Indonesia",
    blogT2: "",
    courseT1: "7 ngày làm chủ",
    courseTHigh: "giấy phép kinh doanh Indonesia",
    courseT2: "",
    coverageT1: "{n} tỉnh &",
    coverageTHigh: "{n} huyện/thành phố",
    coverageT2: "— Từ Sabang đến Merauke",
    whyT1: "Không chỉ là dịch vụ xin phép —",
    whyTHigh: "mà là đối tác pháp lý của bạn",
    whyT2: "",
    processT1: "4 bước đến",
    processTHigh: "doanh nghiệp hợp pháp",
    processT2: "",
    pricingT1: "Giá rõ ràng ngay từ đầu,",
    pricingTHigh: "không phí ẩn",
    pricingT2: "",
    testiT1: "Hơn 1.247 doanh nghiệp",
    testiTHigh: "đã hợp pháp",
    testiT2: "",
    compT1: "Vì sao chọn chúng tôi thay vì",
    compTHigh: "công ty tư vấn khác?",
    compT2: "",
    faqT1: "Những câu hỏi",
    faqTHigh: "thường gặp",
    faqT2: "",
    ctaT1: "Doanh nghiệp đã đang hoạt động?",
    ctaTHigh: "Hãy hợp pháp hóa ngay.",
    ctaT2: "",
    sitemapT1: "Danh mục đầy đủ của",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Từ doanh nghiệp nhỏ và vừa đến tập đoàn — hơn 40 loại giấy phép được xử lý trọn vẹn qua kênh chính thống của nhà nước.",
    checkerSub:
      "Chỉ cần mô tả doanh nghiệp của bạn. AI của chúng tôi được huấn luyện theo Luật Tạo việc làm (UU Cipta Kerja) & quy định OSS-RBA sẽ lập lộ trình giấy phép hoàn chỉnh — miễn phí, không cần đăng ký tài khoản.",
    calcSub:
      "Chọn giấy phép bạn cần, hệ thống tính ngay ước lượng chi phí & thời gian. Minh bạch từ phút đầu tiên — không phí ẩn.",
    hubSub:
      "Tất cả về NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA đến thuế doanh nghiệp — từ cơ bản đến chi tiết kỹ thuật. Biên soạn theo Luật Tạo việc làm & quy định mới nhất.",
    blogSub:
      "{n} bài viết chuyên sâu từ đội chuyên gia pháp quy — chi phí thành lập PT, KBLI ngành F&B, PMA, RKAB khai khoáng, du lịch Umrah đến kinh doanh tại Ả Rập Xê Út. Đọc miễn phí, luôn cập nhật.",
    courseSub:
      "Mỗi sáng một bài học 5 phút + checklist thực hành gửi thẳng vào email của bạn. Do đội chuyên gia pháp quy biên soạn — không phải lý thuyết, mà là những gì thực tế đang dùng.",
    coverageSub:
      "Dù doanh nghiệp của bạn ở Batam, Wamena hay Balikpapan — toàn bộ quy trình xin phép được thực hiện online, hồ sơ gửi qua chuyển phát, và đội ngũ hiện trường của chúng tôi có mặt khi cần kiểm tra thực địa, AMDAL hay ngành khai khoáng.",
    whySub:
      "Hàng nghìn chủ doanh nghiệp đã chuyển sang chúng tôi sau khi thất vọng với các công ty tư vấn khác. Đây là lý do:",
    processSub: "Không cần đến cơ quan nhà nước dù chỉ một ngày. Mọi khâu điều phối chúng tôi lo.",
    pricingSub:
      "Mọi gói đã bao gồm phí chính thức & phí dịch vụ. Trả 50% trước, 50% sau khi giấy phép được cấp.",
    testiSub:
      "Xếp hạng 4.9/5 từ hơn 890 đánh giá. Đây là câu chuyện của những khách hàng mà doanh nghiệp nay đã hợp pháp và yên tâm.",
    compSub:
      "So sánh khách quan với thông lệ phổ biến của các dịch vụ làm giấy phép tại Indonesia (Infiniti Office, EasyLegal, Izin.co.id và các dịch vụ khác).",
    faqSub: "Còn băn khoăn? Những câu trả lời này có thể giúp bạn. Hoặc hỏi trực tiếp chuyên gia AI của chúng tôi.",
    ctaSub:
      "Mỗi ngày không có giấy phép = rủi ro bị phạt, bị xử lý và mất cơ hội thầu cũng như gọi vốn. Tư vấn miễn phí 15 phút — chúng tôi vẽ toàn bộ lộ trình bạn cần, quyết định sau đó tùy bạn.",
    sitemapSub:
      "Điều hướng một trang đến toàn bộ nội dung & dịch vụ của chúng tôi — dành cho bạn, và cho công cụ tìm kiếm.",
    // Final CTA extras
    ctaBadge: "SỐ LƯỢNG CÓ HẠN MỖI NGÀY",
    ctaFormTitle: "Đặt lịch tư vấn miễn phí",
    ctaFormSub: "Điền 30 giây — chuyên gia cao cấp của chúng tôi sẽ liên hệ bạn.",
    ctaSubmit: "Đặt lịch tư vấn miễn phí",
    ctaSuccessTitle: "Đã nhận yêu cầu! 🎉",
    ctaSuccessBody:
      "Chuyên gia của chúng tôi sẽ liên hệ bạn qua WhatsApp trong vòng 24 giờ. Trong lúc chờ, hãy thử tính năng Kiểm tra phép AI nhé!",
    ctaWaBtn: "Chat WhatsApp ngay",
    ctaPrivacy: "100% miễn phí • Không ràng buộc • Dữ liệu an toàn",
    // Knowledge hub tabs
    tabPerIzin: "Theo giấy phép",
    tabPerSektor: "Theo lĩnh vực",
    tabPerWilayah: "Theo khu vực",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Khóa email miễn phí — 100% không mất phí",
    courseFormTitle: "Đăng ký miễn phí ngay",
    courseFormSub: "8 ngày × 5 phút = doanh nghiệp 100% hợp pháp, khỏi lo bị phạt.",
    courseSuccessTitle: "Chào mừng đến với lớp học!",
    // Footer
    footerTagline:
      "Công ty tư vấn giấy phép kinh doanh uy tín tại Indonesia. Tính hợp pháp của doanh nghiệp bạn do đội chuyên gia đảm nhận — nhanh, minh bạch, có bảo đảm.",
    footerVerified:
      "Đã đăng ký & hợp tác với công chứng viên chính thức tại 38 tỉnh & 514 huyện/thành phố",
    footerColServices: "Dịch vụ",
    footerColCompany: "Công ty",
    footerColContact: "Liên hệ",
    footerHours: "Thứ Hai - Thứ Bảy, 08.00-20.00 WIB",
    footerNote:
      "Cùng tầng với Sở Giao dịch Chứng khoán Indonesia • Phục vụ toàn Indonesia trực tuyến",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Mọi quyền được bảo lưu.",
    footerMade: "Tạo ra với ❤️ dành cho sự phát triển của doanh nghiệp nhỏ và vừa Indonesia",
    // Chat
    chatTitle: "RIZKI — Chuyên gia AI",
    chatStatus: "Trực tuyến • Trả lời trong vài giây",
    chatWelcome:
      "Xin chào! 👋 Tôi là **RIZKI**, chuyên gia AI của PusatPerizinan.com — trực 24 giờ cho mọi câu hỏi về giấy phép kinh doanh.\n\nNIB, PT, CV, Halal, BPOM hay giấy phép khác cứ hỏi thoải mái! 😊",
    chatPlaceholder: "Hỏi về giấy phép kinh doanh...",
    chatTyping: "RIZKI đang nhập...",
    chatQr1: "Mở quán cà phê cần những giấy phép gì?",
    chatQr2: "Chi phí thành lập PT là bao nhiêu?",
    chatQr3: "Cách đăng ký NIB cho doanh nghiệp nhỏ và vừa",
    chatQr4: "PIRT và BPOM khác nhau thế nào?",
    // Language
    languageLabel: "Ngôn ngữ",
    searchLanguages: "Tìm ngôn ngữ...",
    contentNote:
      "Cẩm nang đầy đủ bên dưới bằng tiếng Indonesia — hãy hỏi RIZKI AI để được giải thích bằng ngôn ngữ của bạn.",
  },

  // ============================================================
  // th — ไทย Thai
  // ============================================================
  th: {
    // Header
    navServices: "บริการ",
    navCheckAI: "AI เช็คใบอนุญาต",
    navCalculator: "คำนวณค่าใช้จ่าย",
    navGuides: "คู่มือ",
    navBlog: "บล็อก",
    navCoverage: "พื้นที่ให้บริการ",
    navPricing: "ราคา",
    navFaq: "คำถามที่พบบ่อย",
    headerTagline: "ที่ปรึกษาใบอนุญาตธุรกิจอันดับ 1 ของอินโดนีเซีย",
    ctaFree: "ปรึกษาฟรี",
    // Hero
    heroBadge: "ธุรกิจกว่า 1,247 รายไว้วางใจ ครอบคลุม 38 จังหวัด & 514 เมืองทั่วอินโดนีเซีย",
    heroTitle1: "ใบอนุญาตธุรกิจ",
    heroHigh1: "ทุกใบ",
    heroTitle2: "เราจัดการให้หมด —",
    heroHigh2: "รอรับได้เลย",
    heroSubtitle:
      "ตั้งแต่ NIB, PT, CV, ฮาลาล, BPOM ไปจนถึง AMDAL — ทีมผู้เชี่ยวชาญดูแลให้ครบ ถูกกฎหมาย 100% การันตีคืนเงินหากใบอนุญาตไม่ออก เริ่มต้นเพียง 350,000 รูเปียห์ เร็วสุด 1 วันทำการ",
    heroBullet1: "NIB 1 วัน • PT 3 วัน • ไม่ต้องไปต่อคิวหน่วยงานราชการ",
    heroBullet2: "ช่องทางราชการแท้ — เอกสารถูกต้องและตรวจสอบได้",
    heroBullet3: "การันตีคืนเงิน 100% หากใบอนุญาตไม่ออก",
    heroReviews: "จากรีวิวลูกค้ากว่า 890 รายการ",
    // Hero form
    formTitle: "ปรึกษาฟรี 15 นาที",
    formSubtitle: "ไม่มีค่าใช้จ่าย ไม่มีข้อผูกมัด — คุยกับที่ปรึกษาอาวุโสโดยตรง",
    labelFree: "ฟรี",
    labelName: "ชื่อ-นามสกุล *",
    labelWa: "หมายเลข WhatsApp *",
    labelSector: "ประเภทธุรกิจ",
    phSector: "เลือกหมวดธุรกิจ",
    labelNeed: "ความต้องการ",
    phNeed: "เลือกแพ็กเกจ",
    pkgNotSure: "ยังไม่แน่ใจ / ปรึกษาก่อน",
    pkgPrefix: "แพ็กเกจ {p}",
    labelDesc: "เล่าเรื่องธุรกิจของคุณสั้น ๆ (ไม่บังคับ)",
    phDesc: "เช่น: อยากเปิดคาเฟ่ที่บันดุง มีสถานที่แล้ว แต่ยังไม่มีนิติบุคคล...",
    btnSubmit: "ลงทะเบียนปรึกษาฟรี",
    btnSending: "กำลังส่ง...",
    privacyNote: "ข้อมูลของคุณปลอดภัย & ไม่แชร์ให้บุคคลที่สาม",
    successTitle: "ลงทะเบียนสำเร็จ! 🎉",
    successBody:
      "ขอบคุณ {name}! ที่ปรึกษาอาวุโสของเราจะติดต่อคุณทาง WhatsApp ภายใน 24 ชั่วโมง (ช่วงเวลาทำการมักใช้เวลาไม่ถึง 15 นาที)",
    btnAnother: "ลงทะเบียนธุรกิจอื่น",
    // Toasts
    toastSuccess: "ลงทะเบียนปรึกษาฟรีแล้ว! 🎉",
    toastFail: "ส่งไม่สำเร็จ",
    toastConn: "การเชื่อมต่อมีปัญหา",
    // Stats
    statClients: "ลูกค้าที่ดูแลแล้ว",
    statPermits: "ใบอนุญาตที่ดำเนินการ",
    statProvinces: "จังหวัด",
    statCities: "อำเภอ/เมือง",
    statSatisfaction: "ความพึงพอใจของลูกค้า",
    statAvgTime: "เวลาดำเนินการเฉลี่ย",
    statHours: "ชั่วโมง",
    // Section titles
    servicesT1: "ประตูเดียวครบ",
    servicesTHigh: "ทุกเรื่องกฎหมายธุรกิจ",
    servicesT2: "ของคุณ",
    checkerT1: "เช็คใบอนุญาตที่",
    checkerTHigh: "คุณต้องใช้",
    checkerT2: "ใน 30 วินาที",
    calcT1: "เครื่องคำนวณค่าใบอนุญาต —",
    calcTHigh: "คิดก่อน ตัดสินใจทีหลัง",
    calcT2: "",
    hubT1: "คู่มือใบอนุญาตธุรกิจอินโดนีเซีย —",
    hubTHigh: "ครบ ชัด ทันสุด",
    hubT2: "",
    blogT1: "ห้องสมุดบทความใบอนุญาต",
    blogTHigh: "ครบที่สุดในอินโดนีเซีย",
    blogT2: "",
    courseT1: "เชี่ยวชาญเรื่องใบอนุญาตใน",
    courseTHigh: "7 วัน",
    courseT2: "",
    coverageT1: "{n} จังหวัด &",
    coverageTHigh: "{n} อำเภอ/เมือง",
    coverageT2: "— จากสะบางถึงเมอราอูเก",
    whyT1: "ไม่ใช่แค่คนกลางทำใบอนุญาต —",
    whyTHigh: "แต่คือพันธมิตรด้านกฎหมายของคุณ",
    whyT2: "",
    processT1: "4 ขั้นตอนสู่",
    processTHigh: "ธุรกิจที่ถูกกฎหมาย",
    processT2: "",
    pricingT1: "ราคาชัดเจนตั้งแต่ต้น,",
    pricingTHigh: "ไม่มีค่าใช้จ่ายแอบแฝง",
    pricingT2: "",
    testiT1: "ธุรกิจกว่า 1,247 ราย",
    testiTHigh: "ถูกกฎหมายเต็มร้อย",
    testiT2: "",
    compT1: "ทำไมต้องเลือกเรา",
    compTHigh: "แทนที่ปรึกษารายอื่น?",
    compT2: "",
    faqT1: "คำถามที่",
    faqTHigh: "พบบ่อย",
    faqT2: "",
    ctaT1: "ธุรกิจเดินอยู่แล้ว?",
    ctaTHigh: "ทำให้ถูกกฎหมายเดี๋ยวนี้.",
    ctaT2: "",
    sitemapT1: "ไดเรกทอรีครบทุกอย่างของ",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "จาก SME จนถึงบรรษัท — ใบอนุญาตกว่า 40 ประเภท เราจัดการครบจบผ่านช่องทางราชการแท้",
    checkerSub:
      "อธิบายธุรกิจของคุณแค่นั้น AI ของเราที่ฝึกมาจากกฎหมายสร้างการจ้างงาน (UU Cipta Kerja) และกฎ OSS-RBA จะร่างแผนที่ใบอนุญาตฉบับสมบูรณ์ — ฟรี ไม่ต้องสมัครสมาชิก",
    calcSub:
      "เลือกใบอนุญาตที่ต้องใช้ ระบบคำนวณค่าใช้จ่ายและระยะเวลาโดยประมาณทันที โปร่งใสตั้งแต่นาทีแรก — ไม่มีค่าใช้จ่ายแอบแฝง",
    hubSub:
      "ทุกเรื่องเกี่ยวกับ NIB, PT, CV, ฮาลาล, BPOM, PBG/SLF, AMDAL, PMA ไปจนถึงภาษีธุรกิจ — จากพื้นฐานจนถึงรายละเอียดทางเทคนิค เรียบเรียงจากกฎหมายสร้างการจ้างงานและกฎระเบียบล่าสุด",
    blogSub:
      "บทความเจาะลึก {n} ชิ้นจากทีมผู้เชี่ยวชาญกฎระเบียบของเรา — ค่าก่อตั้ง PT, KBLI หมวดร้านอาหาร, PMA, RKAB เหมืองแร่, ท่องเที่ยวอุมรอห์ ไปจนถึงเปิดธุรกิจในซาอุดีอาระเบีย อ่านฟรี อัปเดตตลอด",
    courseSub:
      "ทุกเช้า บทเรียนสั้น 5 นาที + เช็กลิสต์ลงมือทำได้จริง ส่งตรงถึงอีเมลคุณ เขียนโดยทีมผู้เชี่ยวชาญกฎระเบียบ — ไม่ใช่ทฤษฎี แต่คือสิ่งที่ใช้กันจริงในสนาม",
    coverageSub:
      "ไม่ว่าธุรกิจของคุณจะอยู่บาตัม วาเมนา หรือบาลิกปาปัน — ขั้นตอนขอใบอนุญาตทั้งหมดทำออนไลน์ เอกสารส่งทางบริษัทขนส่ง และทีมลงพื้นที่ของเราพร้อมเข้าให้บริการเมื่อต้องตรวจสอบหน้างาน AMDAL หรืองานภาคเหมือง",
    whySub:
      "เจ้าของธุรกิจนับพันย้ายมาใช้เราหลังผิดหวังกับที่ปรึกษารายอื่น นี่คือเหตุผล:",
    processSub: "ไม่ต้องไปหน่วยงานราชการแม้แต่วันเดียว ทุกการประสานงานเป็นหน้าที่ของเรา",
    pricingSub:
      "ทุกแพ็กเกจรวมค่าธรรมเนียมทางการและค่าบริการแล้ว จ่าย 50% ก่อน อีก 50% หลังใบอนุญาตออก",
    testiSub:
      "คะแนน 4.9/5 จากรีวิวกว่า 890 รายการ เรื่องราวจากลูกค้าที่ธุรกิจตอนนี้ถูกกฎหมายและสบายใจ",
    compSub:
      "เปรียบเทียบอย่างเป็นกลางกับแนวปฏิบัติทั่วไปของบริการทำใบอนุญาตในอินโดนีเซีย (Infiniti Office, EasyLegal, Izin.co.id และอื่น ๆ)",
    faqSub: "ยังลังเลอยู่? คำตอบเหล่านี้อาจช่วยได้ หรือถามที่ปรึกษา AI ของเราได้เลย",
    ctaSub:
      "แต่ละวันที่ไม่มีใบอนุญาต = เสี่ยงโดนปรับ โดนสั่งหยุด และพลาดโอกาสประมูลและระดมทุน ปรึกษาฟรี 15 นาที — เราวางแผนทุกอย่างที่คุณต้องใช้ ส่วนจะตัดสินใจอย่างไรคุณเลือกเองได้",
    sitemapSub:
      "เมนูหน้าเดียวไปยังเนื้อหาและบริการทั้งหมดของเรา — เพื่อคุณ และเพื่อเสิร์ชเอนจิน",
    // Final CTA extras
    ctaBadge: "จำนวนจำกัดต่อวัน",
    ctaFormTitle: "จองปรึกษาฟรี",
    ctaFormSub: "กรอก 30 วินาที — ที่ปรึกษาอาวุโสจะติดต่อคุณเอง",
    ctaSubmit: "จองปรึกษาฟรี",
    ctaSuccessTitle: "รับคำขอแล้ว! 🎉",
    ctaSuccessBody:
      "ที่ปรึกษาจะติดต่อคุณทาง WhatsApp ภายใน 24 ชั่วโมง ระหว่างรอ ลองใช้ฟีเจอร์ AI เช็คใบอนุญาตดูนะ!",
    ctaWaBtn: "แชท WhatsApp เลย",
    ctaPrivacy: "ฟรี 100% • ไม่มีข้อผูกมัด • ข้อมูลปลอดภัย",
    // Knowledge hub tabs
    tabPerIzin: "แยกตามใบอนุญาต",
    tabPerSektor: "แยกตามหมวดธุรกิจ",
    tabPerWilayah: "แยกตามพื้นที่",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "คอร์สอีเมลฟรี — ไม่เสียค่าใช้จ่าย 100%",
    courseFormTitle: "สมัครฟรีเดี๋ยวนี้",
    courseFormSub: "8 วัน × 5 นาที = ธุรกิจถูกกฎหมาย 100% ไม่ต้องกลัวโดนปรับ",
    courseSuccessTitle: "ยินดีต้อนรับเข้าสู่คลาส!",
    // Footer
    footerTagline:
      "ที่ปรึกษาใบอนุญาตธุรกิจที่ไว้วางใจได้ในอินโดนีเซีย เรื่องความถูกต้องตามกฎหมายของธุรกิจคุณ ทีมผู้เชี่ยวชาญจัดการ — เร็ว โปร่งใส มีประกัน",
    footerVerified:
      "จดทะเบียนและร่วมงานกับนอตารีทางการใน 38 จังหวัด & 514 อำเภอ/เมือง",
    footerColServices: "บริการ",
    footerColCompany: "บริษัท",
    footerColContact: "ติดต่อ",
    footerHours: "จันทร์-เสาร์ 08.00-20.00 WIB",
    footerNote:
      "ชั้นเดียวกับตลาดหลักทรัพย์อินโดนีเซีย • บริการออนไลน์ทั่วอินโดนีเซีย",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen สงวนลิขสิทธิ์",
    footerMade: "สร้างด้วย ❤️ เพื่อความก้าวหน้าของ SME อินโดนีเซีย",
    // Chat
    chatTitle: "RIZKI — ที่ปรึกษา AI",
    chatStatus: "ออนไลน์ • ตอบในไม่กี่วินาที",
    chatWelcome:
      "สวัสดี! 👋 ผมคือ **RIZKI** ที่ปรึกษา AI ของ PusatPerizinan.com — พร้อมตอบทุกคำถามเรื่องใบอนุญาตธุรกิจตลอด 24 ชั่วโมง\n\nNIB, PT, CV, ฮาลาล, BPOM หรือใบอนุญาตอื่น ๆ ถามมาได้เลย! 😊",
    chatPlaceholder: "ถามเรื่องใบอนุญาตธุรกิจ...",
    chatTyping: "RIZKI กำลังพิมพ์...",
    chatQr1: "เปิดคาเฟ่ต้องมีใบอนุญาตอะไรบ้าง?",
    chatQr2: "ตั้งบริษัท PT ค่าใช้จ่ายเท่าไหร่?",
    chatQr3: "วิธีลงทะเบียน NIB สำหรับ SME",
    chatQr4: "PIRT กับ BPOM ต่างกันอย่างไร?",
    // Language
    languageLabel: "ภาษา",
    searchLanguages: "ค้นหาภาษา...",
    contentNote:
      "คู่มือฉบับเต็มด้านล่างเป็นภาษาอินโดนีเซีย — ถาม RIZKI AI เพื่อรับคำอธิบายเป็นภาษาของคุณ",
  },

  // ============================================================
  // tl — Filipino/Tagalog
  // ============================================================
  tl: {
    // Header
    navServices: "Mga Serbisyo",
    navCheckAI: "AI Lisensya Check",
    navCalculator: "Kalkulador",
    navGuides: "Mga Gabay",
    navBlog: "Blog",
    navCoverage: "Saklaw",
    navPricing: "Presyo",
    navFaq: "FAQ",
    headerTagline: "#1 na konsultant sa lisensya ng negosyo sa Indonesia",
    ctaFree: "Libreng Konsultasyon",
    // Hero
    heroBadge: "Pinagkakatiwalaan ng 1,247+ negosyo sa 38 probinsya & 514 siyudad ng Indonesia",
    heroTitle1: "Lahat ng",
    heroHigh1: "permit ng negosyo",
    heroTitle2: "kami na ang bahala —",
    heroHigh2: "hintayin mo lang",
    heroSubtitle:
      "Mula NIB, PT, CV, Halal, BPOM hanggang AMDAL — pinoproseso ng mga eksperto, 100% legal, may money-back guarantee. Mula Rp 350,000, pinakamabilis na 1 working day.",
    heroBullet1: "NIB 1 araw • PT 3 araw • Walang pila sa mga ahensya ng gobyerno",
    heroBullet2: "Opisyal na daloy ng gobyerno — wasto at beripikadong dokumento",
    heroBullet3: "100% money-back guarantee kung hindi ma-isyu ang permit",
    heroReviews: "mula sa 890+ review ng mga kliyente",
    // Hero form
    formTitle: "Libreng 15-Minutong Konsultasyon",
    formSubtitle: "Walang bayad, walang komitment — diretso mula sa senior consultant.",
    labelFree: "Libre",
    labelName: "Buong Pangalan *",
    labelWa: "WhatsApp Number *",
    labelSector: "Uri ng Negosyo",
    phSector: "Pumili ng sektor",
    labelNeed: "Iyong Pangangailangan",
    phNeed: "Pumili ng pakete",
    pkgNotSure: "Hindi pa sigurado / magpa-consult muna",
    pkgPrefix: "Pakete {p}",
    labelDesc: "Ikwento nang maikli ang negosyo mo (opsyonal)",
    phDesc: "hal.: Gusto kong magbukas ng café sa Bandung, may pwesto na, pero wala pang legal na entidad...",
    btnSubmit: "Magparehistro sa Libreng Konsultasyon",
    btnSending: "Ipinapadala...",
    privacyNote: "Ligtas ang data mo & hindi ibinabahagi sa third party",
    successTitle: "Nakarehistro Ka Na! 🎉",
    successBody:
      "Salamat, {name}! Kokontakin ka ng aming senior consultant sa WhatsApp sa loob ng 24 oras (karaniwang wala pang 15 minuto sa oras ng trabaho).",
    btnAnother: "Irehistro ang Ibang Negosyo",
    // Toasts
    toastSuccess: "Nakarehistro ang Libreng Konsultasyon! 🎉",
    toastFail: "Nabigo ang pagpapadala",
    toastConn: "May problema sa koneksyon",
    // Stats
    statClients: "Mga Kliyenteng Naserbisyohan",
    statPermits: "Mga Permit na Naproseso",
    statProvinces: "Probinsya",
    statCities: "Munisipyo/Siyudad",
    statSatisfaction: "Kasiyahan ng Kliyente",
    statAvgTime: "Average na Oras ng Proseso",
    statHours: "oras",
    // Section titles
    servicesT1: "Isang Pinto Para sa",
    servicesTHigh: "Lahat ng Legal na Pangangailangan",
    servicesT2: "ng Negosyo Mo",
    checkerT1: "Hanapin ang mga Permit na",
    checkerTHigh: "Kailangan Mo",
    checkerT2: "sa 30 Segundo",
    calcT1: "Kalkulador ng Gastos sa Permit —",
    calcTHigh: "Magkalkula Muna, Magdesisyon Mamaya",
    calcT2: "",
    hubT1: "Mga Gabay sa Business Licensing sa Indonesia —",
    hubTHigh: "Kumpleto, Malinaw, Updated",
    hubT2: "",
    blogT1: "Aklatan ng Mga Artikulo sa Permit",
    blogTHigh: "Pinakakumpleto sa Indonesia",
    blogT2: "",
    courseT1: "Pag-aralan ang Business Licensing sa loob ng",
    courseTHigh: "7 Araw",
    courseT2: "",
    coverageT1: "{n} Probinsya &",
    coverageTHigh: "{n} Munisipyo/Siyudad",
    coverageT2: "— Mula Sabang hanggang Merauke",
    whyT1: "Hindi Lang Tagapag-ayos ng Permit —",
    whyTHigh: "Kundi Legal Partner ng Negosyo Mo",
    whyT2: "",
    processT1: "4 Hakbang Tungo sa",
    processTHigh: "Legal na Negosyo",
    processT2: "",
    pricingT1: "Malinaw na Presyo Sa Simula Pa Lang,",
    pricingTHigh: "Walang Nakatagong Bayad",
    pricingT2: "",
    testiT1: "1,247+ Negosyo ang",
    testiTHigh: "Napatunayang Legal",
    testiT2: "",
    compT1: "Bakit Kami ang Piliin",
    compTHigh: "Kaysa Ibang Consultant?",
    compT2: "",
    faqT1: "Mga Tanong na",
    faqTHigh: "Madalas Itanong",
    faqT2: "",
    ctaT1: "Tumatakbo Na ang Negosyo Mo?",
    ctaTHigh: "Gawin itong Legal Ngayon.",
    ctaT2: "",
    sitemapT1: "Kumpletong Direktoryo ng",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Mula MSME hanggang korporasyon — 40+ na uri ng permit, hahawakan nang buo sa opisyal na proseso ng gobyerno.",
    checkerSub:
      "Ilarawan mo lang ang negosyo mo. Ang aming AI, sanay sa Job Creation Law (UU Cipta Kerja) at OSS-RBA rules, bubuo ng kumpletong roadmap ng permit — libre, walang kailangang sign-up.",
    calcSub:
      "Piliin ang mga permit na kailangan mo, magbibigay agad ang sistema ng tinatayang gastos at timeline. Transparent mula sa unang minuto — walang hidden charges.",
    hubSub:
      "Lahat tungkol sa NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA, hanggang business tax — mula basics hanggang technical details. Batay sa Job Creation Law at pinakabagong regulasyon.",
    blogSub:
      "{n} malalim na artikulo mula sa aming regulatory experts — gastos sa pagtatatag ng PT, culinary KBLI, PMA, mining RKAB, Umrah travel, hanggang pag-negosyo sa Saudi Arabia. Libreng basahin, laging updated.",
    courseSub:
      "Tuwing umaga: isang 5-minutong aral + practical checklist diretso sa email mo. Sinulat ng aming regulatory experts — hindi teorya, kundi ang talagang ginagamit sa field.",
    coverageSub:
      "Kahit nasa Batam, Wamena, o Balikpapan ang negosyo mo — buong proseso ng permit ay ginagawa online, ipinapadala ang dokumento via courier, at pupunta ang aming on-site team kapag kailangan ng physical audit, AMDAL, o mining sector.",
    whySub:
      "Libo-libong may-ari ng negosyo ang lumipat sa amin matapos ma-disappoint sa ibang consultant. Ito ang mga dahilan:",
    processSub: "Kahit isang araw, hindi mo kailangang pumunta sa government offices. Kami ang bahala sa lahat ng coordination.",
    pricingSub:
      "Kasama na sa bawat package ang official fees at service fees. Magbayad ng 50% sa simula, 50% pagkatapos ma-isyu ang permit.",
    testiSub:
      "4.9/5 rating mula sa 890+ review. Mga kuwento ito ng mga kliyente na ang negosyo ay opisyal na ngayon at payapa.",
    compSub:
      "Objektibong paghahambing sa karaniwang gawain ng mga permit service sa Indonesia (Infiniti Office, EasyLegal, Izin.co.id, at iba pa).",
    faqSub: "Nag-aalinlangan pa? Baka makatulong ang mga sagot na ito. O kaya'y itanong agad sa aming AI Consultant.",
    ctaSub:
      "Bawat araw na walang opisyal na permit = panganib sa multa, parusa, at pagkawala ng oportunidad sa tender at funding. Libreng 15-minutong konsultasyon — imamapa namin ang lahat ng kailangan mo, desisyon ay sa iyo pagkatapos.",
    sitemapSub:
      "Isang pahinang navigation sa lahat ng content at serbisyo namin — para sa iyo, at para sa search engines.",
    // Final CTA extras
    ctaBadge: "LIMITED SLOTS KADA ARAW",
    ctaFormTitle: "Mag-book ng Libreng Konsultasyon",
    ctaFormSub: "30 segundo lang — ang aming senior consultant ang kokontak sa iyo.",
    ctaSubmit: "I-book ang Libreng Konsultasyon",
    ctaSuccessTitle: "Natanggap ang Request! 🎉",
    ctaSuccessBody:
      "Kokontakin ka ng aming consultant via WhatsApp sa loob ng 24 oras. Habang naghihintay, subukan mo ang AI Lisensya Check feature!",
    ctaWaBtn: "Mag-WhatsApp Na Ngayon",
    ctaPrivacy: "100% libre • Walang komitment • Ligtas ang data",
    // Knowledge hub tabs
    tabPerIzin: "Kada Permit",
    tabPerSektor: "Kada Sektor",
    tabPerWilayah: "Kada Rehiyon",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Libreng Email Course — 100% Walang Bayad",
    courseFormTitle: "Mag-enroll nang Libre Ngayon",
    courseFormSub: "8 araw × 5 minuto = 100% legal na negosyo, walang alalahanin sa multa.",
    courseSuccessTitle: "Maligayang pagdating sa klase!",
    // Footer
    footerTagline:
      "Pinagkakatiwalaang business licensing consultant sa Indonesia. Ang legality ng negosyo mo, hahawakan ng mga eksperto — mabilis, transparent, may garantiya.",
    footerVerified:
      "Nakarehistro at nakapartner sa mga opisyal na notaryo sa 38 probinsya & 514 munisipyo/siyudad",
    footerColServices: "Mga Serbisyo",
    footerColCompany: "Kompanya",
    footerColContact: "Contact",
    footerHours: "Lunes-Sabado, 08.00-20.00 WIB",
    footerNote:
      "Kaparehong palapag ng Indonesia Stock Exchange • Naglilingkod sa buong Indonesia online",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Lahat ng karapatan ay nakalaan.",
    footerMade: "Ginawa nang may ❤️ para sa progreso ng mga MSME ng Indonesia",
    // Chat
    chatTitle: "RIZKI — AI Consultant",
    chatStatus: "Online • Sumasagot sa loob ng ilang segundo",
    chatWelcome:
      "Kumusta! 👋 Ako si **RIZKI**, AI Consultant ng PusatPerizinan.com — 24 oras na bantay para sa lahat ng tanong mo sa business licensing.\n\nNIB, PT, CV, Halal, BPOM, o ibang permit? Itanong lang! 😊",
    chatPlaceholder: "Magtanong tungkol sa business permit...",
    chatTyping: "Nagta-type si RIZKI...",
    chatQr1: "Anong mga permit ang kailangan para magbukas ng café?",
    chatQr2: "Magkano ang gastos sa pagtatatag ng PT?",
    chatQr3: "Paano mag-register ng NIB para sa MSME",
    chatQr4: "Ano ang pagkakaiba ng PIRT at BPOM?",
    // Language
    languageLabel: "Wika",
    searchLanguages: "Maghanap ng wika...",
    contentNote:
      "Ang mga kumpletong gabay sa ibaba ay nasa Indonesian — itanong sa RIZKI AI para sa paliwanag sa wika mo.",
  },

  // ============================================================
  // ms — Bahasa Melayu (Malaysian — BUKAN Bahasa Indonesia)
  // ============================================================
  ms: {
    // Header
    navServices: "Perkhidmatan",
    navCheckAI: "Semakan Lesen AI",
    navCalculator: "Kalkulator",
    navGuides: "Panduan",
    navBlog: "Blog",
    navCoverage: "Liputan",
    navPricing: "Harga",
    navFaq: "Soalan Lazim",
    headerTagline: "Perunding Perlesenan Perniagaan #1 Indonesia",
    ctaFree: "Konsultasi Percuma",
    // Hero
    heroBadge: "Dipercayai oleh 1,247+ perniagaan di 38 negeri & 514 bandar Indonesia",
    heroTitle1: "Semua",
    heroHigh1: "Lesen Perniagaan",
    heroTitle2: "Kami Uruskan, Anda Tinggal Terima —",
    heroHigh2: "Habis Cerita",
    heroSubtitle:
      "NIB, PT, CV, Halal, BPOM hinggalah AMDAL — diproses pasukan pakar, sah 100%, dengan jaminan wang dikembalikan. Bermula Rp 350 ribu, paling pantas 1 hari bekerja.",
    heroBullet1: "NIB 1 hari • PT 3 hari • Tak perlu beratur di jabatan kerajaan",
    heroBullet2: "Saluran rasmi kerajaan — dokumen sah & disahkan",
    heroBullet3: "Jaminan 100% wang dikembalikan sekiranya lesen gagal dikeluarkan",
    heroReviews: "daripada 890+ ulasan pelanggan",
    // Hero form
    formTitle: "Konsultasi Percuma 15 Minit",
    formSubtitle: "Tiada caj, tiada komitmen — terus daripada perunding kanan.",
    labelFree: "Percuma",
    labelName: "Nama Penuh *",
    labelWa: "No. WhatsApp *",
    labelSector: "Jenis Perniagaan",
    phSector: "Pilih sektor",
    labelNeed: "Keperluan Anda",
    phNeed: "Pilih pakej",
    pkgNotSure: "Belum pasti / runding dahulu",
    pkgPrefix: "Pakej {p}",
    labelDesc: "Ceritakan ringkas tentang perniagaan anda (pilihan)",
    phDesc: "cth: Saya mahu buka kafe di Bandung, sudah ada tempat, belum ada badan syarikat...",
    btnSubmit: "Daftar Konsultasi Percuma",
    btnSending: "Menghantar...",
    privacyNote: "Data anda selamat & tidak dikongsi dengan pihak ketiga",
    successTitle: "Anda Telah Berdaftar! 🎉",
    successBody:
      "Terima kasih, {name}! Perunding kanan kami akan menghubungi WhatsApp anda dalam tempoh 24 jam (biasanya bawah 15 minit pada waktu bekerja).",
    btnAnother: "Daftarkan Perniagaan Lain",
    // Toasts
    toastSuccess: "Konsultasi Percuma Berdaftar! 🎉",
    toastFail: "Hantar gagal",
    toastConn: "Masalah sambungan",
    // Stats
    statClients: "Pelanggan Dilayan",
    statPermits: "Lesen Diproses",
    statProvinces: "Negeri",
    statCities: "Daerah/Bandar",
    statSatisfaction: "Kepuasan Pelanggan",
    statAvgTime: "Purata Tempoh Proses",
    statHours: "jam",
    // Section titles
    servicesT1: "Satu Pintu untuk",
    servicesTHigh: "Semua Keperluan Undang-Undang",
    servicesT2: "Perniagaan Anda",
    checkerT1: "Semak Lesen yang",
    checkerTHigh: "Anda Perlukan",
    checkerT2: "dalam 30 Saat",
    calcT1: "Kalkulator Kos Perlesenan —",
    calcTHigh: "Kira Dahulu, Putuskan Kemudian",
    calcT2: "",
    hubT1: "Panduan Perlesenan Perniagaan Indonesia —",
    hubTHigh: "Lengkap, Jelas, Terkini",
    hubT2: "",
    blogT1: "Pustaka Artikel Perlesenan",
    blogTHigh: "Terlengkap di Indonesia",
    blogT2: "",
    courseT1: "Kuasai Perlesenan Perniagaan Dalam",
    courseTHigh: "7 Hari",
    courseT2: "",
    coverageT1: "{n} Negeri &",
    coverageTHigh: "{n} Daerah/Bandar",
    coverageT2: "— Dari Sabang ke Merauke",
    whyT1: "Bukan Sekadar Ejen Urus Lesen —",
    whyTHigh: "Rakan Legal Perniagaan Anda",
    whyT2: "",
    processT1: "4 Langkah Menuju",
    processTHigh: "Perniagaan Sah",
    processT2: "",
    pricingT1: "Harga Jelas di Awal,",
    pricingTHigh: "Tiada Caj Tersembunyi",
    pricingT2: "",
    testiT1: "1,247+ Perniagaan Sudah",
    testiTHigh: "Terbukti Sah",
    testiT2: "",
    compT1: "Kenapa Pilih Kami Berbanding",
    compTHigh: "Perunding Lain?",
    compT2: "",
    faqT1: "Soalan yang",
    faqTHigh: "Selalu Ditanya",
    faqT2: "",
    ctaT1: "Perniagaan Sudah Berjalan?",
    ctaTHigh: "Pastikan Sahnya Sekarang.",
    ctaT2: "",
    sitemapT1: "Direktori Lengkap",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Daripada PKS/UMKM hingga korporat — 40+ jenis lesen kami urus tuntas melalui saluran rasmi kerajaan.",
    checkerSub:
      "Cukup nyatakan perniagaan anda. AI kami yang terlatih Akta Penciptaan Kerja (UU Cipta Kerja) & peraturan OSS-RBA akan menyusun peta jalan lesen yang lengkap — percuma, tanpa perlu daftar akaun.",
    calcSub:
      "Pilih lesen yang anda perlukan, sistem terus mengira anggaran kos & tempoh. Telus seawal minit pertama — tiada kos tersembunyi.",
    hubSub:
      "Segala hal tentang NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA hinggalah cukai perniagaan — dipelajari daripada asas sehingga butiran teknikal. Disusun daripada Akta Penciptaan Kerja & peraturan terkini.",
    blogSub:
      "{n} artikel mendalam daripada pasukan pakar peraturan kami — kos penubuhan PT, KBLI kulinari, PMA, RKAB lombong, travel umrah, hinggalah berniaga di Arab Saudi. Percuma dibaca, sentiasa dikemas kini.",
    courseSub:
      "Setiap pagi, satu bahan ringkas 5 minit + senarai semak praktikal terus ke e-mel anda. Ditulis oleh pasukan pakar peraturan kami — bukan teori, tetapi apa yang benar-benar digunakan di lapangan.",
    coverageSub:
      "Tidak kira perniagaan anda di Batam, Wamena, atau Balikpapan — keseluruhan proses perlesenan kami siapkan secara atas talian, dokumen dihantar melalui kurier, dan pasukan di lokasi kami sedia hadir untuk keperluan audit fizikal, AMDAL, mahupun sektor lombong.",
    whySub:
      "Ribuan pemilik perniagaan bertukar kepada kami selepas kecewa dengan perunding lain. Ini sebabnya:",
    processSub: "Sekali pun tidak perlu ke pejabat jabatan kerajaan. Semua koordinasi kami uruskan.",
    pricingSub:
      "Semua pakej sudah termasuk kos rasmi & yuran perkhidmatan. Bayar 50% di awal, 50% selepas lesen dikeluarkan.",
    testiSub:
      "Penarafan 4.9/5 daripada 890+ ulasan. Ini cerita mereka yang perniagaannya kini sah dan tenteram.",
    compSub:
      "Perbandingan objektif dengan amalan lazim penyedia perkhidmatan urus lesen di Indonesia (Infiniti Office, EasyLegal, Izin.co.id, dan lain-lain).",
    faqSub: "Masih ragu-ragu? Jawapan ini mungkin membantu. Atau tanya terus kepada Perunding AI kami.",
    ctaSub:
      "Setiap hari tanpa lesen rasmi = risiko denda, sekatan, dan hilangnya peluang tender serta pembiayaan. Konsultasi percuma 15 minit — kami petakan semua yang anda perlukan, anda bebas putuskan selepasnya.",
    sitemapSub:
      "Navigasi satu halaman ke seluruh kandungan & perkhidmatan kami — untuk anda, dan untuk enjin carian.",
    // Final CTA extras
    ctaBadge: "SLOT TERHAD SETIAP HARI",
    ctaFormTitle: "Tempah Konsultasi Percuma",
    ctaFormSub: "Isi 30 saat — perunding kanan kami yang hubungi anda.",
    ctaSubmit: "Tempah Konsultasi Percuma",
    ctaSuccessTitle: "Permintaan Diterima! 🎉",
    ctaSuccessBody:
      "Perunding kami akan menghubungi anda melalui WhatsApp dalam tempoh 24 jam. Sementara menunggu, cubalah fungsi Semakan Lesen AI!",
    ctaWaBtn: "Chat WhatsApp Sekarang",
    ctaPrivacy: "100% percuma • Tiada komitmen • Data selamat",
    // Knowledge hub tabs
    tabPerIzin: "Mengikut Lesen",
    tabPerSektor: "Mengikut Sektor",
    tabPerWilayah: "Mengikut Kawasan",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Kursus E-mel Percuma — 100% Tanpa Caj",
    courseFormTitle: "Daftar Percuma Sekarang",
    courseFormSub: "8 hari × 5 minit = perniagaan anda 100% sah & bebas risiko denda.",
    courseSuccessTitle: "Selamat datang ke kelas!",
    // Footer
    footerTagline:
      "Perunding perlesenan perniagaan yang dipercayai di Indonesia. Legitimasi perniagaan anda dikendalikan pasukan pakar — pantas, telus, berjamin.",
    footerVerified:
      "Berdaftar & bekerjasama dengan notari rasmi di 38 negeri & 514 daerah/bandar",
    footerColServices: "Perkhidmatan",
    footerColCompany: "Syarikat",
    footerColContact: "Hubungi",
    footerHours: "Isnin-Sabtu, 08.00-20.00 WIB",
    footerNote:
      "Setingkat dengan Bursa Saham Indonesia • Berkhidmat ke seluruh Indonesia secara atas talian",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Hak cipta terpelihara.",
    footerMade: "Dibina dengan ❤️ untuk kemajuan PKS/UMKM Indonesia",
    // Chat
    chatTitle: "RIZKI — Perunding AI",
    chatStatus: "Dalam talian • Balas dalam beberapa saat",
    chatWelcome:
      "Hai! 👋 Saya **RIZKI**, Perunding AI PusatPerizinan.com — bersiap 24 jam untuk semua soalan lesen perniagaan anda.\n\nNIB, PT, CV, Halal, BPOM atau lesen lain? Tanya sahaja! 😊",
    chatPlaceholder: "Tanya pasal lesen perniagaan...",
    chatTyping: "RIZKI sedang menaip...",
    chatQr1: "Apa lesen perlu untuk buka kafe?",
    chatQr2: "Berapa kos penubuhan PT?",
    chatQr3: "Cara daftar NIB untuk PKS/UMKM",
    chatQr4: "Apakah beza PIRT dan BPOM?",
    // Language
    languageLabel: "Bahasa",
    searchLanguages: "Cari bahasa...",
    contentNote:
      "Panduan lengkap di bawah dalam Bahasa Indonesia — tanya RIZKI AI untuk penjelasan dalam bahasa anda.",
  },
};
