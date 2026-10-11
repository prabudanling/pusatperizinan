// ============================================================
// PUSATPERIZINAN.COM — Translations Part D (Eastern Europe, Africa & Local)
// ru, pl, uk, tr, sw, pa, jv — Task 7-d
// ============================================================
// Kontrak key: sama persis dengan interface Translation (types.ts).
// Token yang DIPERTAHANKAN: {p} {n} {name} {year}, **RIZKI**, \n, 👋 😊 🎉 ❤️
// Key T2 yang WAJIB kosong: calc/hub/blog/course/why/process/pricing/
// testi/comp/faq/cta/sitemap T2.
// ============================================================

import type { LangCode, Translation } from "./types";

export const TRANSLATIONS_D: Partial<Record<LangCode, Translation>> = {
  // ============================================================
  // RU — Russian (Русский)
  // ============================================================
  ru: {
    // Header
    navServices: "Услуги",
    navCheckAI: "ИИ-проверка лицензий",
    navCalculator: "Калькулятор",
    navGuides: "Руководства",
    navBlog: "Блог",
    navCoverage: "Охват",
    navPricing: "Цены",
    navFaq: "FAQ",
    headerTagline: "Консультант по бизнес-лицензиям №1 в Индонезии",
    ctaFree: "Бесплатная консультация",
    // Hero
    heroBadge:
      "Нам доверяют более 1 247 компаний в 38 провинциях и 514 городах Индонезии",
    heroTitle1: "Все",
    heroHigh1: "лицензии",
    heroTitle2: "берём на себя — вам остаётся лишь",
    heroHigh2: "отдохнуть",
    heroSubtitle:
      "NIB, PT, CV, Халяль, BPOM вплоть до AMDAL — оформляет команда экспертов, 100% законно, с гарантией возврата денег. От 350 тысяч рупий, самое быстрое — 1 рабочий день.",
    heroBullet1: "NIB за 1 день • PT за 3 дня • Без очередей в инстанциях",
    heroBullet2:
      "Официальные государственные каналы — документы действительны и подтверждены",
    heroBullet3:
      "Гарантия 100% возврата денег, если лицензию не выдадут",
    heroReviews: "на основе 890+ отзывов клиентов",
    // Hero form
    formTitle: "Бесплатная консультация за 15 минут",
    formSubtitle:
      "Без оплаты и обязательств — сразу от старшего консультанта.",
    labelFree: "Бесплатно",
    labelName: "Полное имя *",
    labelWa: "Номер WhatsApp *",
    labelSector: "Тип бизнеса",
    phSector: "Выберите сектор",
    labelNeed: "Что вам нужно",
    phNeed: "Выберите пакет",
    pkgNotSure: "Пока не знаю / сначала консультация",
    pkgPrefix: "Пакет {p}",
    labelDesc: "Коротко расскажите о вашем бизнесе (необязательно)",
    phDesc: "напр.: хочу открыть кафе в Бандунге, помещение уже есть, юридического лица пока нет...",
    btnSubmit: "Записаться на бесплатную консультацию",
    btnSending: "Отправляем...",
    privacyNote:
      "Ваши данные в безопасности и не передаются третьим лицам",
    successTitle: "Вы зарегистрированы! 🎉",
    successBody:
      "Спасибо, {name}! Наш старший консультант свяжется с вами в WhatsApp в течение 24 часов (обычно < 15 минут в рабочее время).",
    btnAnother: "Зарегистрировать другой бизнес",
    // Toasts
    toastSuccess: "Бесплатная консультация записана! 🎉",
    toastFail: "Не удалось отправить",
    toastConn: "Проблема с соединением",
    // Stats
    statClients: "Клиентов обслужено",
    statPermits: "Оформлено лицензий",
    statProvinces: "Провинций",
    statCities: "Городов и районов",
    statSatisfaction: "Удовлетворённость клиентов",
    statAvgTime: "Средний срок оформления",
    statHours: "часов",
    // Section titles
    servicesT1: "Одно окно для",
    servicesTHigh: "всех юридических вопросов",
    servicesT2: "вашего бизнеса",
    checkerT1: "Узнайте, какие лицензии",
    checkerTHigh: "вам нужны",
    checkerT2: "за 30 секунд",
    calcT1: "Калькулятор стоимости лицензий —",
    calcTHigh: "сначала посчитайте, потом решайте",
    calcT2: "",
    hubT1: "Руководства по лицензированию бизнеса в Индонезии —",
    hubTHigh: "полно, понятно, актуально",
    hubT2: "",
    blogT1: "Библиотека статей о лицензиях",
    blogTHigh: "самая полная в Индонезии",
    blogT2: "",
    courseT1: "Освойте лицензирование бизнеса",
    courseTHigh: "за 7 дней",
    courseT2: "",
    coverageT1: "{n} провинций и",
    coverageTHigh: "{n} городов и районов",
    coverageT2: "— от Сабанга до Мерауке",
    whyT1: "Больше, чем оформление лицензий —",
    whyTHigh: "ваш юридический партнёр по бизнесу",
    whyT2: "",
    processT1: "4 шага к",
    processTHigh: "полностью легальному бизнесу",
    processT2: "",
    pricingT1: "Честные цены заранее,",
    pricingTHigh: "без скрытых платежей",
    pricingT2: "",
    testiT1: "1 247+ компаний уже",
    testiTHigh: "подтвердили легальность",
    testiT2: "",
    compT1: "Почему выбирают нас, а не",
    compTHigh: "других консультантов?",
    compT2: "",
    faqT1: "Вопросы,",
    faqTHigh: "которые задают чаще всего",
    faqT2: "",
    ctaT1: "Ваш бизнес уже работает?",
    ctaTHigh: "Сделайте его официальным сейчас.",
    ctaT2: "",
    sitemapT1: "Полный каталог",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "От малого бизнеса до корпораций — более 40 видов лицензий оформляем под ключ через официальные государственные каналы.",
    checkerSub:
      "Просто опишите ваш бизнес. Наш ИИ, обученный на Законе о создании рабочих мест (UU Cipta Kerja) и правилах OSS-RBA, составит полный план лицензирования — бесплатно, без регистрации аккаунта.",
    calcSub:
      "Выберите нужные лицензии — система сразу рассчитает примерную стоимость и сроки. Прозрачно с первой минуты — без скрытых платежей.",
    hubSub:
      "Всё о NIB, PT, CV, Халяль, BPOM, PBG/SLF, AMDAL, PMA и налогах для бизнеса — от основ до технических деталей. На основе Закона о создании рабочих мест и актуальных норм.",
    blogSub:
      "{n} подробных статей от наших экспертов по регулированию — стоимость регистрации PT, KBLI для общепита, PMA, горнодобывающие RKAB, паломнические туры и даже открытие бизнеса в Саудовской Аравии. Читайте бесплатно, обновляется постоянно.",
    courseSub:
      "Каждое утро — один короткий урок на 5 минут + практический чек-лист прямо на вашу почту. Пишут наши эксперты по регулированию — не теория, а то, что реально применяется на практике.",
    coverageSub:
      "Где бы ни находился ваш бизнес — в Батаме, Вамене или Баликпапане — весь процесс лицензирования мы ведём онлайн, документы отправляем курьером, а наша выездная команда приезжает для физических аудитов, AMDAL или горнодобывающего сектора.",
    whySub:
      "Тысячи владельцев бизнеса переходят к нам после разочарования в других консультантах. Вот почему:",
    processSub:
      "Ни одного дня в государственных учреждениях. Всю координацию берём на себя.",
    pricingSub:
      "Все пакеты включают официальные сборы и наши услуги. Платите 50% сразу и 50% после выдачи лицензии.",
    testiSub:
      "Рейтинг 4,9/5 на основе 890+ отзывов. Истории клиентов, чей бизнес теперь официальный и спокойный.",
    compSub:
      "Объективное сравнение с распространённой практикой сервисов оформления лицензий в Индонезии (Infiniti Office, EasyLegal, Izin.co.id и других).",
    faqSub:
      "Всё ещё сомневаетесь? Возможно, эти ответы помогут. Или спросите напрямую нашего ИИ-консультанта.",
    ctaSub:
      "Каждый день без официальных лицензий = риск штрафов, санкций и упущенных возможностей тендеров и финансирования. Бесплатная консультация 15 минут — мы составим полную карту ваших потребностей, а решение останется за вами.",
    sitemapSub:
      "Навигация по всему нашему контенту и услугам на одной странице — для вас и для поисковых систем.",
    // Final CTA extras
    ctaBadge: "ОГРАНИЧЕННОЕ ЧИСЛО МЕСТ В ДЕНЬ",
    ctaFormTitle: "Забронируйте бесплатную консультацию",
    ctaFormSub:
      "Заполнение за 30 секунд — наш старший консультант сам свяжется с вами.",
    ctaSubmit: "Забронировать бесплатную консультацию",
    ctaSuccessTitle: "Заявка получена! 🎉",
    ctaSuccessBody:
      "Наш консультант свяжется с вами через WhatsApp в течение 24 часов. А пока попробуйте функцию ИИ-проверки лицензий!",
    ctaWaBtn: "Написать в WhatsApp сейчас",
    ctaPrivacy: "100% бесплатно • Без обязательств • Данные в безопасности",
    // Knowledge hub tabs
    tabPerIzin: "По лицензиям",
    tabPerSektor: "По секторам",
    tabPerWilayah: "По регионам",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Бесплатный курс по email — 100% без оплаты",
    courseFormTitle: "Записаться бесплатно сейчас",
    courseFormSub:
      "8 дней × 5 минут = 100% легальный бизнес без страха штрафов.",
    courseSuccessTitle: "Добро пожаловать на курс!",
    // Footer
    footerTagline:
      "Надёжный консультант по бизнес-лицензиям в Индонезии. Легальность вашего бизнеса в руках экспертов — быстро, прозрачно, с гарантией.",
    footerVerified:
      "Зарегистрированы и сотрудничаем с официальными нотариусами в 38 провинциях и 514 городах/районах",
    footerColServices: "Услуги",
    footerColCompany: "Компания",
    footerColContact: "Контакты",
    footerHours: "Понедельник-суббота, 08.00-20.00 WIB",
    footerNote:
      "На одном этаже с Индонезийской фондовой биржей • Обслуживаем всю Индонезию онлайн",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Все права защищены.",
    footerMade: "Сделано с ❤️ ради развития МСП Индонезии",
    // Chat
    chatTitle: "RIZKI — ИИ-консультант",
    chatStatus: "Онлайн • Отвечает за секунды",
    chatWelcome:
      "Здравствуйте! 👋 Я **RIZKI**, ИИ-консультант PusatPerizinan.com — на связи 24 часа для любых вопросов о бизнес-лицензиях.\n\nNIB, PT, CV, Халяль, BPOM или другие разрешения? Спрашивайте! 😊",
    chatPlaceholder: "Спросите о бизнес-лицензиях...",
    chatTyping: "RIZKI печатает...",
    chatQr1: "Какие лицензии нужны, чтобы открыть кафе?",
    chatQr2: "Сколько стоит регистрация PT?",
    chatQr3: "Как оформить NIB для МСП",
    chatQr4: "Чем PIRT отличается от BPOM?",
    // Language
    languageLabel: "Язык",
    searchLanguages: "Поиск языка...",
    contentNote:
      "Полные руководства ниже доступны на индонезийском языке — спросите ИИ-консультанта RIZKI, чтобы получить объяснение на вашем языке.",
  },

  // ============================================================
  // PL — Polish (Polski)
  // ============================================================
  pl: {
    // Header
    navServices: "Usługi",
    navCheckAI: "AI-weryfikacja licencji",
    navCalculator: "Kalkulator",
    navGuides: "Przewodniki",
    navBlog: "Blog",
    navCoverage: "Zasięg",
    navPricing: "Cennik",
    navFaq: "FAQ",
    headerTagline: "Doradca ds. licencji biznesowych nr 1 w Indonezji",
    ctaFree: "Darmowa konsultacja",
    // Hero
    heroBadge:
      "Zaufało nam ponad 1 247 firm w 38 prowincjach i 514 miastach Indonezji",
    heroTitle1: "Załatwimy wszystkie",
    heroHigh1: "licencje",
    heroTitle2: "dla Twojej firmy — a Ty możesz",
    heroHigh2: "odetchnąć",
    heroSubtitle:
      "Od NIB, PT, CV, Halal, BPOM aż po AMDAL — załatwia zespół ekspertów, 100% zgodnie z prawem, z gwarancją zwrotu pieniędzy. Już od 350 tysięcy rupii, najszybciej w 1 dzień roboczy.",
    heroBullet1: "NIB w 1 dzień • PT w 3 dni • Bez kolejek w urzędach",
    heroBullet2:
      "Oficjalne kanały rządowe — dokumenty ważne i zweryfikowane",
    heroBullet3:
      "100% gwarancji zwrotu pieniędzy, jeśli licencja nie zostanie wydana",
    heroReviews: "na podstawie 890+ opinii klientów",
    // Hero form
    formTitle: "Darmowa 15-minutowa konsultacja",
    formSubtitle:
      "Bez opłat i zobowiązań — od razu od starszego doradcy.",
    labelFree: "Za darmo",
    labelName: "Imię i nazwisko *",
    labelWa: "Numer WhatsApp *",
    labelSector: "Rodzaj działalności",
    phSector: "Wybierz sektor",
    labelNeed: "Czego potrzebujesz",
    phNeed: "Wybierz pakiet",
    pkgNotSure: "Jeszcze nie wiem / najpierw konsultacja",
    pkgPrefix: "Pakiet {p}",
    labelDesc: "Opisz krótko swoją firmę (opcjonalnie)",
    phDesc: "np.: chcę otworzyć kawiarnię w Bandungu, lokal mam, ale nie mam jeszcze spółki...",
    btnSubmit: "Zapisz się na darmową konsultację",
    btnSending: "Wysyłamy...",
    privacyNote:
      "Twoje dane są bezpieczne i nie są udostępniane osobom trzecim",
    successTitle: "Zapisano Cię! 🎉",
    successBody:
      "Dziękujemy, {name}! Nasz starszy doradca skontaktuje się z Tobą przez WhatsApp w ciągu 24 godzin (zwykle w mniej niż 15 minut w godzinach pracy).",
    btnAnother: "Zarejestruj kolejną firmę",
    // Toasts
    toastSuccess: "Darmowa konsultacja zapisana! 🎉",
    toastFail: "Nie udało się wysłać",
    toastConn: "Problem z połączeniem",
    // Stats
    statClients: "Obsłużonych klientów",
    statPermits: "Załatwionych pozwoleń",
    statProvinces: "Prowincji",
    statCities: "Miast i powiatów",
    statSatisfaction: "Zadowolenie klientów",
    statAvgTime: "Średni czas realizacji",
    statHours: "godzin",
    // Section titles
    servicesT1: "Jeden adres dla",
    servicesTHigh: "wszystkich potrzeb prawnych",
    servicesT2: "Twojej firmy",
    checkerT1: "Sprawdź, jakie licencje",
    checkerTHigh: "są Ci potrzebne",
    checkerT2: "w 30 sekund",
    calcT1: "Kalkulator kosztów licencji —",
    calcTHigh: "najpierw policz, potem zdecyduj",
    calcT2: "",
    hubT1: "Przewodniki po licencjach biznesowych Indonezji —",
    hubTHigh: "kompletnie, jasno, na bieżąco",
    hubT2: "",
    blogT1: "Biblioteka artykułów o licencjach",
    blogTHigh: "najpełniejsza w Indonezji",
    blogT2: "",
    courseT1: "Opanuj licencjonowanie firm",
    courseTHigh: "w 7 dni",
    courseT2: "",
    coverageT1: "{n} prowincji i",
    coverageTHigh: "{n} miast i powiatów",
    coverageT2: "— od Sabangu po Merauke",
    whyT1: "Więcej niż biuro licencyjne —",
    whyTHigh: "Twój prawny partner biznesowy",
    whyT2: "",
    processT1: "4 kroki do",
    processTHigh: "w pełni legalnej firmy",
    processT2: "",
    pricingT1: "Jasne ceny z góry,",
    pricingTHigh: "bez ukrytych opłat",
    pricingT2: "",
    testiT1: "1 247+ firm już",
    testiTHigh: "potwierdziło legalność",
    testiT2: "",
    compT1: "Dlaczego my, a nie",
    compTHigh: "inni konsultanci?",
    compT2: "",
    faqT1: "Pytania,",
    faqTHigh: "które zadawane są najczęściej",
    faqT2: "",
    ctaT1: "Twoja firma już działa?",
    ctaTHigh: "Zadbaj o jej legalność już teraz.",
    ctaT2: "",
    sitemapT1: "Pełny katalog",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Od MŚP po korporacje — ponad 40 rodzajów pozwoleń załatwiamy kompleksowo, oficjalnymi kanałami rządowymi.",
    checkerSub:
      "Wystarczy, że opiszesz swoją firmę. Nasze AI, przeszkolone na ustawie o tworzeniu miejsc pracy (UU Cipta Kerja) i przepisach OSS-RBA, przygotuje kompletną mapę drogową licencji — bezpłatnie, bez zakładania konta.",
    calcSub:
      "Wybierz potrzebne pozwolenia — system od razu wyliczy szacunkowe koszty i terminy. Przejrzystość od pierwszej minuty — bez ukrytych opłat.",
    hubSub:
      "Wszystko o NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA i podatkach firmowych — od podstaw po szczegóły techniczne. Na podstawie UU Cipta Kerja i najnowszych przepisów.",
    blogSub:
      "{n} dogłębnych artykułów od naszych ekspertów ds. regulacji — koszty założenia PT, KBLI dla gastronomii, PMA, górnicze RKAB, podróże na umrę, aż po otwarcie firmy w Arabii Saudyjskiej. Czytaj bezpłatnie, stale aktualizowane.",
    courseSub:
      "Każdego ranka: jedna 5-minutowa lekcja + praktyczna checklista prosto na Twoją skrzynkę. Piszą nasi eksperci ds. regulacji — nie teoria, tylko to, co naprawdę stosuje się w praktyce.",
    coverageSub:
      "Niezależnie od tego, czy Twoja firma działa w Batam, Wamenie czy Balikpapanie — cały proces licencyjny prowadzimy online, dokumenty wysyłamy kurierem, a nasz zespół terenowy przyjeżdża na audyty fizyczne, AMDAL czy do sektora wydobywczego.",
    whySub:
      "Tysiące przedsiębiorców przeszło do nas po rozczarowaniu innymi konsultantami. Oto dlaczego:",
    processSub:
      "Ani jednego dnia w urzędach. Całą koordynację bierzemy na siebie.",
    pricingSub:
      "Każdy pakiet obejmuje opłaty urzędowe i nasze usługi. Płacisz 50% z góry i 50% po wydaniu licencji.",
    testiSub:
      "Ocena 4,9/5 na podstawie 890+ opinii. Historie klientów, których firmy są teraz w pełni legalne i spokojne.",
    compSub:
      "Obiektywne porównanie z powszechną praktyką usług licencyjnych w Indonezji (Infiniti Office, EasyLegal, Izin.co.id i inne).",
    faqSub:
      "Wciąż się wahasz? Te odpowiedzi mogą pomóc. Albo zapytaj wprost naszego konsultanta AI.",
    ctaSub:
      "Każdy dzień bez oficjalnych pozwoleń = ryzyko kar, sankcji i utraty przetargów oraz finansowania. Darmowa 15-minutowa konsultacja — rozrysujemy wszystko, czego potrzebujesz, a decyzję podejmiesz potem.",
    sitemapSub:
      "Nawigacja do całej naszej treści i usług na jednej stronie — dla Ciebie i dla wyszukiwarek.",
    // Final CTA extras
    ctaBadge: "OGRANICZONA LICZBA MIEJSC DZIENNIE",
    ctaFormTitle: "Umów darmową konsultację",
    ctaFormSub:
      "Wypełnisz w 30 sekund — nasz starszy doradca sam się z Tobą skontaktuje.",
    ctaSubmit: "Umów bezpłatną konsultację",
    ctaSuccessTitle: "Zgłoszenie przyjęte! 🎉",
    ctaSuccessBody:
      "Nasz doradca skontaktuje się z Tobą przez WhatsApp w ciągu 24 godzin. W międzyczasie wypróbuj funkcję AI-weryfikacji licencji!",
    ctaWaBtn: "Napisz na WhatsApp już teraz",
    ctaPrivacy: "100% bezpłatnie • Bez zobowiązań • Dane bezpieczne",
    // Knowledge hub tabs
    tabPerIzin: "Według pozwoleń",
    tabPerSektor: "Według sektorów",
    tabPerWilayah: "Według regionów",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Darmowy kurs e-mail — 100% bez opłat",
    courseFormTitle: "Zapisz się bezpłatnie",
    courseFormSub:
      "8 dni × 5 minut = 100% legalna firma bez strachu przed karami.",
    courseSuccessTitle: "Witaj na kursie!",
    // Footer
    footerTagline:
      "Zaufany doradca ds. licencji biznesowych w Indonezji. Legalność Twojej firmy w rękach ekspertów — szybko, przejrzyście, z gwarancją.",
    footerVerified:
      "Zarejestrowani i współpracujemy z oficjalnymi notariuszami w 38 prowincjach i 514 miastach/powiatach",
    footerColServices: "Usługi",
    footerColCompany: "Firma",
    footerColContact: "Kontakt",
    footerHours: "Poniedziałek-sobota, 08.00-20.00 WIB",
    footerNote:
      "To samo piętro co Giełda Papierów Wartościowych w Indonezji • Obsługujemy całą Indonezję online",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Wszelkie prawa zastrzeżone.",
    footerMade: "Stworzone z ❤️ dla rozwoju MŚP w Indonezji",
    // Chat
    chatTitle: "RIZKI — konsultant AI",
    chatStatus: "Online • Odpowiada w kilka sekund",
    chatWelcome:
      "Cześć! 👋 Jestem **RIZKI**, konsultant AI PusatPerizinan.com — dyżuruję całą dobę, odpowiadając na pytania o licencje biznesowe.\n\nNIB, PT, CV, Halal, BPOM albo inne pozwolenia? Pytaj śmiało! 😊",
    chatPlaceholder: "Zapytaj o licencje biznesowe...",
    chatTyping: "RIZKI pisze...",
    chatQr1: "Jakie licencje są potrzebne, by otworzyć kawiarnię?",
    chatQr2: "Ile kosztuje założenie spółki PT?",
    chatQr3: "Jak wyrobić NIB dla MŚP",
    chatQr4: "Czym różni się PIRT od BPOM?",
    // Language
    languageLabel: "Język",
    searchLanguages: "Szukaj języka...",
    contentNote:
      "Pełne przewodniki poniżej są po indonezyjsku — zapytaj AI RIZKI o wyjaśnienie w Twoim języku.",
  },

  // ============================================================
  // UK — Ukrainian (Українська)
  // ============================================================
  uk: {
    // Header
    navServices: "Послуги",
    navCheckAI: "ШІ-перевірка ліцензій",
    navCalculator: "Калькулятор",
    navGuides: "Гайди",
    navBlog: "Блог",
    navCoverage: "Охоплення",
    navPricing: "Ціни",
    navFaq: "FAQ",
    headerTagline: "Консультант із бізнес-ліцензій №1 в Індонезії",
    ctaFree: "Безкоштовна консультація",
    // Hero
    heroBadge:
      "Нам довіряють понад 1 247 компаній у 38 провінціях та 514 містах Індонезії",
    heroTitle1: "Оформимо всі",
    heroHigh1: "ліцензії",
    heroTitle2: "— вам залишиться лише",
    heroHigh2: "відпочивати",
    heroSubtitle:
      "Від NIB, PT, CV, халяль, BPOM до AMDAL — оформляє команда експертів, 100% легально, з гарантією повернення коштів. Від 350 тисяч рупій, найшвидше — за 1 робочий день.",
    heroBullet1: "NIB за 1 день • PT за 3 дні • Без черг в установах",
    heroBullet2:
      "Офіційні державні канали — документи дійсні та перевірені",
    heroBullet3:
      "Гарантія 100% повернення коштів, якщо ліцензію не видають",
    heroReviews: "на основі 890+ відгуків клієнтів",
    // Hero form
    formTitle: "Безкоштовна 15-хвилинна консультація",
    formSubtitle:
      "Без оплати й зобов'язань — одразу від старшого консультанта.",
    labelFree: "Безкоштовно",
    labelName: "Повне ім'я *",
    labelWa: "Номер WhatsApp *",
    labelSector: "Тип бізнесу",
    phSector: "Оберіть сектор",
    labelNeed: "Що вам потрібно",
    phNeed: "Оберіть пакет",
    pkgNotSure: "Ще не знаю / спершу консультація",
    pkgPrefix: "Пакет {p}",
    labelDesc: "Коротко розкажіть про свій бізнес (необов'язково)",
    phDesc: "напр.: хочу відкрити кав'ярню в Бандунзі, приміщення вже є, юридичної особи ще немає...",
    btnSubmit: "Записатися на безкоштовну консультацію",
    btnSending: "Надсилаємо...",
    privacyNote:
      "Ваші дані в безпеці та не передаються третім сторонам",
    successTitle: "Ви зареєстровані! 🎉",
    successBody:
      "Дякуємо, {name}! Наш старший консультант зв'яжеться з вами в WhatsApp протягом 24 годин (зазвичай < 15 хвилин у робочий час).",
    btnAnother: "Зареєструвати інший бізнес",
    // Toasts
    toastSuccess: "Безкоштовну консультацію записано! 🎉",
    toastFail: "Не вдалося надіслати",
    toastConn: "Проблема зі з'єднанням",
    // Stats
    statClients: "Обслужено клієнтів",
    statPermits: "Оформлено ліцензій",
    statProvinces: "Провінцій",
    statCities: "Міст і районів",
    statSatisfaction: "Задоволеність клієнтів",
    statAvgTime: "Середній термін оформлення",
    statHours: "годин",
    // Section titles
    servicesT1: "Одне вікно для",
    servicesTHigh: "усіх юридичних потреб",
    servicesT2: "вашого бізнесу",
    checkerT1: "Дізнайтеся, які ліцензії",
    checkerTHigh: "вам потрібні",
    checkerT2: "за 30 секунд",
    calcT1: "Калькулятор вартості ліцензій —",
    calcTHigh: "спочатку порахуйте, потім вирішуйте",
    calcT2: "",
    hubT1: "Гайди з бізнес-ліцензій Індонезії —",
    hubTHigh: "повно, зрозуміло, актуально",
    hubT2: "",
    blogT1: "Бібліотека статей про ліцензії",
    blogTHigh: "найповніша в Індонезії",
    blogT2: "",
    courseT1: "Опануйте ліцензування бізнесу",
    courseTHigh: "за 7 днів",
    courseT2: "",
    coverageT1: "{n} провінцій та",
    coverageTHigh: "{n} міст і районів",
    coverageT2: "— від Сабанга до Мерауке",
    whyT1: "Більше, ніж оформлення ліцензій —",
    whyTHigh: "ваш юридичний партнер у бізнесі",
    whyT2: "",
    processT1: "4 кроки до",
    processTHigh: "повністю легального бізнесу",
    processT2: "",
    pricingT1: "Чесні ціни наперед,",
    pricingTHigh: "без прихованих платежів",
    pricingT2: "",
    testiT1: "1 247+ компаній уже",
    testiTHigh: "підтвердили легальність",
    testiT2: "",
    compT1: "Чому обирають нас, а не",
    compTHigh: "інших консультантів?",
    compT2: "",
    faqT1: "Питання,",
    faqTHigh: "які ставлять найчастіше",
    faqT2: "",
    ctaT1: "Ваш бізнес уже працює?",
    ctaTHigh: "Зробіть його офіційним зараз.",
    ctaT2: "",
    sitemapT1: "Повний каталог",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Від малого бізнесу до корпорацій — понад 40 видів ліцензій оформлюємо під ключ через офіційні державні канали.",
    checkerSub:
      "Просто опишіть свій бізнес. Наш ШІ, навчений на Законі про створення робочих місць (UU Cipta Kerja) та правилах OSS-RBA, складе повну дорожню карту ліцензування — безкоштовно, без створення акаунта.",
    calcSub:
      "Оберіть потрібні ліцензії — система одразу розрахує орієнтовну вартість і терміни. Прозоро з першої хвилини — без прихованих платежів.",
    hubSub:
      "Усе про NIB, PT, CV, халяль, BPOM, PBG/SLF, AMDAL, PMA та податки для бізнесу — від основ до технічних деталей. На основі Закону про створення робочих місць та найновіших норм.",
    blogSub:
      "{n} ґрунтовних статей від наших експертів із регулювання — вартість заснування PT, KBLI для закладів харчування, PMA, гірничі RKAB, паломницькі тури та навіть відкриття бізнесу в Саудівській Аравії. Читайте безкоштовно, постійно оновлюється.",
    courseSub:
      "Щоранку: один 5-хвилинний урок + практичний чекліст просто на вашу пошту. Пишуть наші експерти з регулювання — не теорія, а те, що реально застосовується на практиці.",
    coverageSub:
      "Де б не був ваш бізнес — у Батамі, Вамені чи Балікпапані — весь процес ліцензування ми ведемо онлайн, документи надсилаємо кур'єром, а наша виїзна команда приїжджає для фізичних аудитів, AMDAL чи гірничодобувного сектору.",
    whySub:
      "Тисячі власників бізнесу переходять до нас після розчарування в інших консультантах. Ось чому:",
    processSub:
      "Жодного дня в держустановах. Усю координацію беремо на себе.",
    pricingSub:
      "Усі пакети включають офіційні збори та наші послуги. Платіть 50% одразу і 50% після видачі ліцензії.",
    testiSub:
      "Рейтинг 4,9/5 на основі 890+ відгуків. Історії клієнтів, чиї бізнеси тепер офіційні та спокійні.",
    compSub:
      "Об'єктивне порівняння з поширеною практикою сервісів оформлення ліцензій в Індонезії (Infiniti Office, EasyLegal, Izin.co.id та інші).",
    faqSub:
      "Досі вагаєтеся? Ці відповіді можуть допомогти. Або запитайте безпосередньо нашого ШІ-консультанта.",
    ctaSub:
      "Кожен день без офіційних ліцензій = ризик штрафів, санкцій та втрачених можливостей тендерів і фінансування. Безкоштовна 15-хвилинна консультація — ми складемо повну карту ваших потреб, а рішення залишиться за вами.",
    sitemapSub:
      "Навігація по всьому нашому контенту та послугам з однієї сторінки — для вас і для пошукових систем.",
    // Final CTA extras
    ctaBadge: "ОБМЕЖЕНА КІЛЬКІСТЬ МІСЦЬ НА ДЕНЬ",
    ctaFormTitle: "Забронюйте безкоштовну консультацію",
    ctaFormSub:
      "Заповнення за 30 секунд — наш старший консультант сам зв'яжеться з вами.",
    ctaSubmit: "Забронювати безкоштовну консультацію",
    ctaSuccessTitle: "Заявку отримано! 🎉",
    ctaSuccessBody:
      "Наш консультант зв'яжеться з вами через WhatsApp протягом 24 годин. А поки чекаєте, спробуйте функцію ШІ-перевірки ліцензій!",
    ctaWaBtn: "Написати в WhatsApp зараз",
    ctaPrivacy: "100% безкоштовно • Без зобов'язань • Дані в безпеці",
    // Knowledge hub tabs
    tabPerIzin: "За ліцензіями",
    tabPerSektor: "За секторами",
    tabPerWilayah: "За регіонами",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Безкоштовний курс електронною поштою — 100% без оплати",
    courseFormTitle: "Записатися безкоштовно",
    courseFormSub:
      "8 днів × 5 хвилин = 100% легальний бізнес без страху штрафів.",
    courseSuccessTitle: "Вітаємо на курсі!",
    // Footer
    footerTagline:
      "Надійний консультант із бізнес-ліцензій в Індонезії. Легальність вашого бізнесу в руках експертів — швидко, прозоро, з гарантією.",
    footerVerified:
      "Зареєстровані та співпрацюємо з офіційними нотаріусами в 38 провінціях і 514 містах/районах",
    footerColServices: "Послуги",
    footerColCompany: "Компанія",
    footerColContact: "Контакти",
    footerHours: "Понеділок-субота, 08.00-20.00 WIB",
    footerNote:
      "На одному поверсі з Індонезійською фондовою біржею • Обслуговуємо всю Індонезію онлайн",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Усі права захищено.",
    footerMade: "Створено з ❤️ задля розвитку МСП Індонезії",
    // Chat
    chatTitle: "RIZKI — ШІ-консультант",
    chatStatus: "Онлайн • Відповідає за секунди",
    chatWelcome:
      "Вітаю! 👋 Я **RIZKI**, ШІ-консультант PusatPerizinan.com — на зв'язку 24 години для будь-яких питань бізнес-ліцензій.\n\nNIB, PT, CV, халяль, BPOM чи інші дозволи? Питайте! 😊",
    chatPlaceholder: "Запитайте про бізнес-ліцензії...",
    chatTyping: "RIZKI друкує...",
    chatQr1: "Які ліцензії потрібні, щоб відкрити кав'ярню?",
    chatQr2: "Скільки коштує заснування PT?",
    chatQr3: "Як оформити NIB для МСП",
    chatQr4: "Чим PIRT відрізняється від BPOM?",
    // Language
    languageLabel: "Мова",
    searchLanguages: "Пошук мови...",
    contentNote:
      "Повні гайди нижче доступні індонезійською — запитайте ШІ RIZKI, щоб отримати пояснення вашою мовою.",
  },

  // ============================================================
  // TR — Turkish (Türkçe)
  // ============================================================
  tr: {
    // Header
    navServices: "Hizmetler",
    navCheckAI: "AI İzin Kontrolü",
    navCalculator: "Kalkülatör",
    navGuides: "Rehberler",
    navBlog: "Blog",
    navCoverage: "Kapsam",
    navPricing: "Fiyatlar",
    navFaq: "SSS",
    headerTagline: "Endonezya'nın 1 Numaralı İşletme Ruhsatı Danışmanı",
    ctaFree: "Ücretsiz Danışmanlık",
    // Hero
    heroBadge:
      "Endonezya'nın 38 ilinde ve 514 şehrinde 1.247+ işletme bize güveniyor",
    heroTitle1: "Tüm",
    heroHigh1: "işletme ruhsatlarınızı",
    heroTitle2: "biz hallediyoruz — siz sadece",
    heroHigh2: "arkanıza yaslanın",
    heroSubtitle:
      "NIB, PT, CV, Helal, BPOM hatta AMDAL — uzman ekip işliyor, %100 yasal, para iade garantili. 350 bin rupiyadan başlayan fiyatlarla, en hızlı 1 iş günü.",
    heroBullet1: "NIB 1 günde • PT 3 günde • Kamu kurumlarında kuyruk yok",
    heroBullet2:
      "Resmi devlet kanalları — belgeler geçerli ve doğrulanmış",
    heroBullet3: "Ruhsat çıkmazsa %100 para iade garantisi",
    heroReviews: "890+ müşteri yorumuna göre",
    // Hero form
    formTitle: "15 Dakikalık Ücretsiz Danışmanlık",
    formSubtitle:
      "Ücretsiz, taahhütsüz — doğrudan kıdemli danışmandan.",
    labelFree: "Ücretsiz",
    labelName: "Ad Soyad *",
    labelWa: "WhatsApp Numarası *",
    labelSector: "İşletme Türü",
    phSector: "Sektör seçin",
    labelNeed: "İhtiyacınız",
    phNeed: "Paket seçin",
    pkgNotSure: "Emin değilim / önce danışayım",
    pkgPrefix: "{p} Paketi",
    labelDesc: "İşletmenizi kısaca anlatın (isteğe bağlı)",
    phDesc: "örn.: Bandung'da kafe açmak istiyorum, yerim var, şirketim henüz yok...",
    btnSubmit: "Ücretsiz Danışmanlığa Kaydolun",
    btnSending: "Gönderiliyor...",
    privacyNote:
      "Verileriniz güvende ve üçüncü taraflarla paylaşılmıyor",
    successTitle: "Kaydınız Alındı! 🎉",
    successBody:
      "Teşekkürler {name}! Kıdemli danışmanımız 24 saat içinde (iş saatlerinde genellikle 15 dakikadan kısa sürede) WhatsApp'tan size ulaşacak.",
    btnAnother: "Başka Bir İşletme Kaydet",
    // Toasts
    toastSuccess: "Ücretsiz Danışmanlık Kaydı Alındı! 🎉",
    toastFail: "Gönderilemedi",
    toastConn: "Bağlantı sorunu",
    // Stats
    statClients: "Hizmet Verilen Müşteri",
    statPermits: "İşlenen Ruhsat",
    statProvinces: "İl",
    statCities: "Şehir ve İlçe",
    statSatisfaction: "Müşteri Memnuniyeti",
    statAvgTime: "Ortalama İşlem Süresi",
    statHours: "saat",
    // Section titles
    servicesT1: "İşletmenizin",
    servicesTHigh: "tüm yasal ihtiyaçları için",
    servicesT2: "tek çözüm noktası",
    checkerT1: "Hangi ruhsatlara",
    checkerTHigh: "ihtiyacınız olduğunu",
    checkerT2: "30 saniyede öğrenin",
    calcT1: "Ruhsat Maliyet Hesaplayıcı —",
    calcTHigh: "önce hesaplayın, sonra karar verin",
    calcT2: "",
    hubT1: "Endonezya İşletme Ruhsatı Rehberleri —",
    hubTHigh: "eksiksiz, net, güncel",
    hubT2: "",
    blogT1: "Ruhsat Makale Kütüphanesi",
    blogTHigh: "Endonezya'nın en kapsamlısı",
    blogT2: "",
    courseT1: "İşletme ruhsatlarında",
    courseTHigh: "7 günde ustalaşın",
    courseT2: "",
    coverageT1: "{n} il ve",
    coverageTHigh: "{n} şehir ve ilçe",
    coverageT2: "— Sabang'dan Merauke'ye",
    whyT1: "Sadece bir ruhsat bürosu değil —",
    whyTHigh: "işletmenizin yasal ortağı",
    whyT2: "",
    processT1: "4 Adımda",
    processTHigh: "Tam Yasal İşletme",
    processT2: "",
    pricingT1: "Baştan net fiyat,",
    pricingTHigh: "sürpriz maliyet yok",
    pricingT2: "",
    testiT1: "1.247+ işletme",
    testiTHigh: "ruhsatına kavuştu",
    testiT2: "",
    compT1: "Diğer danışmanlar yerine",
    compTHigh: "neden bizi seçmelisiniz?",
    compT2: "",
    faqT1: "En sık",
    faqTHigh: "sorulan sorular",
    faqT2: "",
    ctaT1: "İşletmeniz zaten çalışıyor mu?",
    ctaTHigh: "Hemen yasal hale getirin.",
    ctaT2: "",
    sitemapT1: "PusatPerizinan.com'un",
    sitemapTHigh: "tam dizini",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "KOBİ'lerden kurumsal işletmelere — 40+ ruhsat türünü resmi devlet kanallarıyla uçtan uca biz takip ediyoruz.",
    checkerSub:
      "İşletmenizi anlatmanız yeterli. İş Yasası (UU Cipta Kerja) ve OSS-RBA düzenlemeleriyle eğitilmiş yapay zekâmız size eksiksiz bir ruhsat yol haritası çıkarır — ücretsiz, kayıt gerekmez.",
    calcSub:
      "İhtiyacınız olan ruhsatları seçin — sistem tahmini maliyet ve süreyi anında hesaplar. İlk dakikadan itibaren şeffaf — gizli maliyet yok.",
    hubSub:
      "NIB, PT, CV, Helal, BPOM, PBG/SLF, AMDAL, PMA ve işletme vergileri hakkında her şey — temellerden teknik detaylara. UU Cipta Kerja ve en güncel düzenlemelere dayanır.",
    blogSub:
      "Düzenleme uzmanlarımıza ait {n} derinlemesine makale — PT kuruluş maliyetleri, gastronomi KBLI'si, PMA, madencilik RKAB'ı, umre seyahati ve Suudi Arabistan'da iş açmaya kadar. Ücretsiz okuyun, sürekli güncellenir.",
    courseSub:
      "Her sabah: 5 dakikalık bir ders + pratik bir kontrol listesi doğrudan e-postanızda. Yazanlar düzenleme uzmanlarımız — teori değil, sahada gerçekten kullanılan bilgiler.",
    coverageSub:
      "İşletmeniz Batam'da, Wamena'da ya da Balikpapan'da olsun — ruhsat sürecinin tamamını online yürütür, belgeleri kuryeyle gönderir; saha ekibimiz fiziki denetimler, AMDAL veya madencilik sektörü için bizzat gelir.",
    whySub:
      "Binlerce işletme sahibi diğer danışmanlardan hayal kırıklığına uğradıktan sonra bize geçti. İşte nedeni:",
    processSub:
      "Kamu kurumlarında tek bir gün bile geçirmenize gerek yok. Tüm koordinasyonu biz üstleniyoruz.",
    pricingSub:
      "Her paket resmi harç ve hizmet bedellerini kapsar. %50 başta, ruhsat çıktıktan sonra %50 ödersiniz.",
    testiSub:
      "890+ değerlendirmeye göre 4,9/5 puan. Artık yasal ve gönül rahatlığına kavuşan müşterilerimizin hikâyeleri.",
    compSub:
      "Endonezya'daki ruhsat hizmeti veren firmaların yaygın uygulamalarıyla (Infiniti Office, EasyLegal, Izin.co.id ve diğerleri) tarafsız bir karşılaştırma.",
    faqSub:
      "Hâlâ kararsız mısınız? Bu yanıtlar işinize yarayabilir. Ya da doğrudan yapay zekâ danışmanımıza sorun.",
    ctaSub:
      "Resmi ruhsat olmadan geçen her gün = ceza, yaptırım ve ihale ile finansman fırsatlarının kaçması demektir. 15 dakikalık ücretsiz danışmanlık — ihtiyacınız olan her şeyi haritalarız, kararı sonra siz verirsiniz.",
    sitemapSub:
      "Tüm içerik ve hizmetlerimize tek sayfadan gezinme — hem sizin hem de arama motorları için.",
    // Final CTA extras
    ctaBadge: "GÜNLÜK SINIRLI KONTENJAN",
    ctaFormTitle: "Ücretsiz Danışmanlık Randevusu Alın",
    ctaFormSub:
      "30 saniyede doldurun — kıdemli danışmanımız size ulaşır.",
    ctaSubmit: "Ücretsiz Danışmanlık Randevusu Al",
    ctaSuccessTitle: "Talebiniz Alındı! 🎉",
    ctaSuccessBody:
      "Danışmanımız 24 saat içinde WhatsApp'tan size ulaşacak. Beklerken Yapay Zekâ İzin Kontrolü özelliğini deneyin!",
    ctaWaBtn: "Hemen WhatsApp'tan Yazın",
    ctaPrivacy: "%100 ücretsiz • Taahhütsüz • Verileriniz güvende",
    // Knowledge hub tabs
    tabPerIzin: "Ruhsata Göre",
    tabPerSektor: "Sektöre Göre",
    tabPerWilayah: "Bölgeye Göre",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Ücretsiz E-posta Kursu — Hiçbir Ücret Yok",
    courseFormTitle: "Hemen Ücretsiz Kaydolun",
    courseFormSub:
      "8 gün × 5 dakika = %100 yasal, ceza derdi olmayan bir işletme.",
    courseSuccessTitle: "Sınıfa hoş geldiniz!",
    // Footer
    footerTagline:
      "Endonezya'nın güvenilir işletme ruhsatı danışmanı. İşletmenizin yasallığını uzman ekip hallediyor — hızlı, şeffaf, garantili.",
    footerVerified:
      "38 il ve 514 şehir/ilçedeki resmi noterlerle kayıtlıyız ve iş birliği içindeyiz",
    footerColServices: "Hizmetler",
    footerColCompany: "Kurumsal",
    footerColContact: "İletişim",
    footerHours: "Pazartesi-Cumartesi, 08.00-20.00 WIB",
    footerNote:
      "Endonezya Borsası ile aynı katta • Tüm Endonezya'ya online hizmet",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Tüm hakları saklıdır.",
    footerMade: "Endonezya KOBİ'lerinin gelişimi için ❤️ ile yapıldı",
    // Chat
    chatTitle: "RIZKI — Yapay Zekâ Danışmanı",
    chatStatus: "Çevrimiçi • Saniyeler içinde yanıt verir",
    chatWelcome:
      "Merhaba! 👋 Ben **RIZKI**, PusatPerizinan.com'un yapay zekâ danışmanıyım — işletme ruhsatı sorularınız için 24 saat görev başındayım.\n\nNIB, PT, CV, Helal, BPOM ya da başka bir ruhsat mı? Hemen sorun! 😊",
    chatPlaceholder: "İşletme ruhsatları hakkında sorun...",
    chatTyping: "RIZKI yazıyor...",
    chatQr1: "Kafe açmak için hangi ruhsatlar gerekli?",
    chatQr2: "PT kuruluşu ne kadar tutar?",
    chatQr3: "KOBİ için NIB nasıl alınır",
    chatQr4: "PIRT ile BPOM arasındaki fark ne?",
    // Language
    languageLabel: "Dil",
    searchLanguages: "Dil ara...",
    contentNote:
      "Aşağıdaki tam rehberler Endonezcedir — kendi dilinizde açıklama için RIZKI yapay zekâsına sorun.",
  },

  // ============================================================
  // SW — Swahili (Kiswahili)
  // ============================================================
  sw: {
    // Header
    navServices: "Huduma",
    navCheckAI: "Ukaguzi wa Leseni kwa AI",
    navCalculator: "Kikokotoo",
    navGuides: "Miongozo",
    navBlog: "Blogu",
    navCoverage: "Uenezi",
    navPricing: "Bei",
    navFaq: "Maswali",
    headerTagline: "Mshauri #1 wa Leseni za Biashara nchini Indonesia",
    ctaFree: "Ushauri wa Bure",
    // Hero
    heroBadge:
      "Inaaminiwa na biashara 1,247+ katika mikoa 38 na miji 514 ya Indonesia",
    heroTitle1: "Tunashughulikia",
    heroHigh1: "leseni zote za biashara",
    heroTitle2: "— wewe",
    heroHigh2: "pumzika tu",
    heroSubtitle:
      "Kuanzia NIB, PT, CV, Halal, BPOM hadi AMDAL — yanashughulikiwa na timu ya wataalamu, kisheria 100%, na dhamana ya kurejesha pesa. Kuanzia rupia 350,000, kwa haraka kabisa ndani ya siku 1 za kazi.",
    heroBullet1: "NIB siku 1 • PT siku 3 • Hakuna foleni ofisini",
    heroBullet2:
      "Njia rasmi za serikali — hati halali na zilizothibitishwa",
    heroBullet3:
      "Dhamana ya 100% ya kurejesha pesa ikiwa leseni haitolewi",
    heroReviews: "kutokana na maoni 890+ ya wateja",
    // Hero form
    formTitle: "Ushauri wa Bure wa Dakika 15",
    formSubtitle:
      "Bila gharama, bila ahadi — moja kwa moja kutoka kwa mshauri mkuu.",
    labelFree: "Bure",
    labelName: "Jina Kamili *",
    labelWa: "Nambari ya WhatsApp *",
    labelSector: "Aina ya Biashara",
    phSector: "Chagua sekta",
    labelNeed: "Mahitaji Yako",
    phNeed: "Chagua kifurushi",
    pkgNotSure: "Sijaamua bado / nataka kushauriwa kwanza",
    pkgPrefix: "Kifurushi cha {p}",
    labelDesc: "Tuambie kwa ufupi kuhusu biashara yako (si lazima)",
    phDesc: "mf.: nataka kufungua kafé huko Bandung, nina eneo, bado sina kampuni rasmi...",
    btnSubmit: "Jiandikishe kwa Ushauri wa Bure",
    btnSending: "Inatuma...",
    privacyNote:
      "Taarifa zako ni salama na hazitolewi kwa wahusika wengine",
    successTitle: "Umejiandikisha! 🎉",
    successBody:
      "Asante, {name}! Mshauri wetu mkuu atawasiliana nawe kupitia WhatsApp ndani ya saa 24 (kwa kawaida chini ya dakika 15 wakati wa saa za kazi).",
    btnAnother: "Andikisha Biashara Nyingine",
    // Toasts
    toastSuccess: "Ushauri wa Bure Umeandikishwa! 🎉",
    toastFail: "Imeshindikana kutuma",
    toastConn: "Tatizo la mtandao",
    // Stats
    statClients: "Wateja Waliohudumiwa",
    statPermits: "Leseni Zilizoshughulikiwa",
    statProvinces: "Mikoa",
    statCities: "Miji na Wilaya",
    statSatisfaction: "Kuridhika kwa Wateja",
    statAvgTime: "Muda Wastani wa Usindikaji",
    statHours: "saa",
    // Section titles
    servicesT1: "Lango Moja la",
    servicesTHigh: "Mahitaji Yote ya Kisheria",
    servicesT2: "ya Biashara Yako",
    checkerT1: "Gundua Leseni",
    checkerTHigh: "Unazohitaji",
    checkerT2: "ndani ya Sekunde 30",
    calcT1: "Kikokotoo cha Gharama za Leseni —",
    calcTHigh: "Kokotoa Kwanza, Uamue Baadaye",
    calcT2: "",
    hubT1: "Miongozo ya Leseni za Biashara Indonesia —",
    hubTHigh: "Kamilifu, Wazi, Za Kisasa",
    hubT2: "",
    blogT1: "Maktaba ya Makala za Leseni",
    blogTHigh: "Kubwa Zaidi nchini Indonesia",
    blogT2: "",
    courseT1: "Jifunze Leseni za Biashara",
    courseTHigh: "ndani ya Siku 7",
    courseT2: "",
    coverageT1: "Mikoa {n} na",
    coverageTHigh: "Miji na Wilaya {n}",
    coverageT2: "— Kutoka Sabang hadi Merauke",
    whyT1: "Zaidi ya Wakala wa Leseni —",
    whyTHigh: "Mshirika Wako wa Kisheria wa Biashara",
    whyT2: "",
    processT1: "Hatua 4 Kufikia",
    processTHigh: "Biashara Iliyokamilika Kisheria",
    processT2: "",
    pricingT1: "Bei Wazi Mwanzoni,",
    pricingTHigh: "Hakuna Gharama Zilizofichwa",
    pricingT2: "",
    testiT1: "Biashara 1,247+",
    testiTHigh: "zina Uhalali Ulio Thibitishwa",
    testiT2: "",
    compT1: "Kwa Nini Utuchague Sisi Badala ya",
    compTHigh: "Washauri Wengine?",
    compT2: "",
    faqT1: "Maswali",
    faqTHigh: "Yaulizwayo Mara Kwa Mara",
    faqT2: "",
    ctaT1: "Biashara Yako Inaendelea?",
    ctaTHigh: "Iwe Rasmi Sasa.",
    ctaT2: "",
    sitemapT1: "Orodha Kamili ya",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Kuanzia biashara ndogo hadi makampuni makubwa — aina 40+ za leseni tunazishughulikia kikamilifu kwa njia rasmi za serikali.",
    checkerSub:
      "Eleza tu biashara yako. AI yetu, iliyofundishwa kwa Sheria ya Uundaji Kazi (UU Cipta Kerja) na kanuni za OSS-RBA, itaandaa ramani kamili ya leseni — bure, bila haja ya kuunda akaunti.",
    calcSub:
      "Chagua leseni unazohitaji — mfumo unakokotoa mara moja gharama na muda uliokadiriwa. Wazi kuanzia dakika ya kwanza — hakuna gharama zilizofichwa.",
    hubSub:
      "Kila kitu kuhusu NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA na kodi za biashara — kuanzia misingi hadi maelezo ya kiufundi. Yameandaliwa kwa kuzingatia UU Cipta Kerja na kanuni mpya kabisa.",
    blogSub:
      "Makala {n} za kina kutoka kwa wataalamu wetu wa kanuni — gharama za kuanzisha PT, KBLI za migahawa, PMA, RKAB za madini, usafiri wa umra, hata kufungua biashara nchini Saudi Arabia. Soma bure, zinasasishwa muda wote.",
    courseSub:
      "Kila asubuhi: somo moja la dakika 5 + orodha ya ukaguzi ya vitendo inayofika moja kwa moja barua pepe yako. Wameandika wataalamu wetu wa kanuni — si nadharia, bali yale yanayotumika kweli uwandani.",
    coverageSub:
      "Iwe biashara yako iko Batam, Wamena au Balikpapan — mchakato mzima wa leseni tunauendesha mtandaoni, hati tunatuma kwa huduma ya kufikisha haraka, na timu yetu ya uwanja inakuja kwa ukaguzi wa kivitendo, AMDAL au sekta ya madini.",
    whySub:
      "Wamiliki wa biashara elfu kadhaa wamehamia kwetu baada ya kukata tamaa na washauri wengine. Hii hapa sababu:",
    processSub:
      "Huna haja ya kutumia hata siku moja kwenda ofisini kwa taasisi za serikali. Sisi tunaandaa uratibu wote.",
    pricingSub:
      "Kila kifurushi kinajumuisha ada rasmi na ada za huduma zetu. Lipa asilimia 50 mwanzoni, asilimia 50 baada ya leseni kutolewa.",
    testiSub:
      "Ukadiriaji wa 4.9/5 kutoka kwa maoni 890+. Hizi ni hadithi za wateja ambao biashara zao sasa ni rasmi na wana amani.",
    compSub:
      "Ulinganisho wa kutosha na mazoea ya kawaida ya huduma za leseni nchini Indonesia (Infiniti Office, EasyLegal, Izin.co.id na nyinginezo).",
    faqSub:
      "Bado una wasiwasi? Majibu haya yanaweza kukusaidia. Au muulize moja kwa moja mshauri wetu wa AI.",
    ctaSub:
      "Kila siku bila leseni rasmi = hatari ya faini, adhabu na kupoteza fursa za zabuni na ufadhili. Ushauri wa bure wa dakika 15 — tunaandaa ramani yote unayohitaji, wewe uamue baadaye.",
    sitemapSub:
      "Urambazaji wa maudhui na huduma zote za kampuni yetu kutoka ukurasa mmoja — kwa ajili yako na wa injini za utafutaji.",
    // Final CTA extras
    ctaBadge: "NAFASI CHACHE KWA SIKU",
    ctaFormTitle: "Weka Nafasi ya Ushauri wa Bure",
    ctaFormSub:
      "Jaza kwa sekunde 30 — mshauri wetu mkuu atawasiliana nawe.",
    ctaSubmit: "Weka Nafasi ya Ushauri wa Bure",
    ctaSuccessTitle: "Ombi Limepokelewa! 🎉",
    ctaSuccessBody:
      "Mshauri wetu atawasiliana nawe kwa WhatsApp ndani ya saa 24. Ukiwa unasubiri, jaribu kipengele cha Ukaguzi wa Leseni kwa AI!",
    ctaWaBtn: "Tuma Ujumbe WhatsApp Sasa",
    ctaPrivacy: "100% bure • Bila ahadi • Taarifa salama",
    // Knowledge hub tabs
    tabPerIzin: "Kwa Leseni",
    tabPerSektor: "Kwa Sekta",
    tabPerWilayah: "Kwa Eneo",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Kozi ya Bure ya Barua pepe — 100% Bila Malipo",
    courseFormTitle: "Jiandikishe Bure Sasa",
    courseFormSub:
      "Siku 8 × dakika 5 = biashara 100% halali bila wasiwasi wa faini.",
    courseSuccessTitle: "Karibu darasani!",
    // Footer
    footerTagline:
      "Mshauri mwaminifu wa leseni za biashara Indonesia. Uhalali wa biashara yako unashughulikiwa na wataalamu — kwa haraka, kwa uwazi, kwa dhamana.",
    footerVerified:
      "Tumejiandikisha na tunashirikiana na makanisi rasmi katika mikoa 38 na miji/wilaya 514",
    footerColServices: "Huduma",
    footerColCompany: "Kampuni",
    footerColContact: "Mawasiliano",
    footerHours: "Jumatatu-Jumamosi, 08.00-20.00 WIB",
    footerNote:
      "Ghorofa moja na Soko la Hisa la Indonesia • Tunahudumia Indonesia yote mtandaoni",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Haki zote zimehifadhiwa.",
    footerMade: "Imetengenezwa kwa ❤️ kwa maendeleo ya VIWAMA Indonesia",
    // Chat
    chatTitle: "RIZKI — Mshauri wa AI",
    chatStatus: "Mtandaoni • Hujibu kwa sekunde chache",
    chatWelcome:
      "Habari! 👋 Mimi ni **RIZKI**, Mshauri wa AI wa PusatPerizinan.com — niko tayari saa 24 kwa maswali yote ya leseni za biashara.\n\nNIB, PT, CV, Halal, BPOM au leseni nyingine? Uliza tu! 😊",
    chatPlaceholder: "Uliza kuhusu leseni za biashara...",
    chatTyping: "RIZKI anaandika...",
    chatQr1: "Leseni zipi nahitaji kufungua kafé?",
    chatQr2: "Ni pesa ngapi ya kuanzisha PT?",
    chatQr3: "Jinsi ya kupata NIB kwa biashara ndogo",
    chatQr4: "Tofauti ya PIRT na BPOM ni ipi?",
    // Language
    languageLabel: "Lugha",
    searchLanguages: "Tafuta lugha...",
    contentNote:
      "Miongozo kamili hapa chini imeandikwa kwa Kindonesia — muombe AI RIZKI akueleze kwa lugha yako.",
  },

  // ============================================================
  // PA — Punjabi, Gurmukhi (ਪੰਜਾਬੀ)
  // ============================================================
  pa: {
    // Header
    navServices: "ਸੇਵਾਵਾਂ",
    navCheckAI: "AI ਲਾਇਸੈਂਸ ਜਾਂਚ",
    navCalculator: "ਕੈਲਕੁਲੇਟਰ",
    navGuides: "ਗਾਈਡਾਂ",
    navBlog: "ਬਲੌਗ",
    navCoverage: "ਕਵਰੇਜ",
    navPricing: "ਕੀਮਤ",
    navFaq: "ਸਵਾਲ-ਜਵਾਬ",
    headerTagline: "ਇੰਡੋਨੇਸ਼ੀਆ ਦਾ #1 ਕਾਰੋਬਾਰੀ ਲਾਇਸੈਂਸਿੰਗ ਸਲਾਹਕਾਰ",
    ctaFree: "ਮੁਫ਼ਤ ਸਲਾਹ",
    // Hero
    heroBadge:
      "ਇੰਡੋਨੇਸ਼ੀਆ ਦੇ 38 ਸੂਬਿਆਂ ਅਤੇ 514 ਸ਼ਹਿਰਾਂ ਵਿੱਚ 1,247+ ਕਾਰੋਬਾਰਾਂ ਦਾ ਭਰੋਸਾ",
    heroTitle1: "ਤੁਹਾਡੇ ਸਾਰੇ",
    heroHigh1: "ਕਾਰੋਬਾਰੀ ਲਾਇਸੈਂਸ",
    heroTitle2: "ਅਸੀਂ ਸੰਭਾਲਦੇ ਹਾਂ — ਤੁਸੀਂ ਬੱਸ",
    heroHigh2: "ਆਰਾਮ ਕਰੋ",
    heroSubtitle:
      "NIB, PT, CV, ਹਲਾਲ, BPOM ਤੋਂ AMDAL ਤੱਕ — ਮਾਹਿਰ ਟੀਮ ਪ੍ਰੋਸੈਸ ਕਰਦੀ ਹੈ, 100% ਕਾਨੂੰਨੀ, ਪੈਸੇ ਵਾਪਸੀ ਦੀ ਗਰੰਟੀ। 350 ਹਜ਼ਾਰ ਰੁਪਿਆ ਤੋਂ ਸ਼ੁਰੂ, ਸਭ ਤੋਂ ਤੇਜ਼ 1 ਕਾਰਜ-ਦਿਨ।",
    heroBullet1: "NIB 1 ਦਿਨ ਵਿੱਚ • PT 3 ਦਿਨਾਂ ਵਿੱਚ • ਸਰਕਾਰੀ ਦਫ਼ਤਰਾਂ ਦੀ ਕਤਾਰ ਨਹੀਂ",
    heroBullet2:
      "ਸਰਕਾਰੀ ਅਧਿਕਾਰਤ ਰਾਹ — ਦਸਤਾਵੇਜ਼ ਸਹੀ ਅਤੇ ਤਸਦੀਕ ਸ਼ੁਦਾ",
    heroBullet3:
      "ਜੇ ਲਾਇਸੈਂਸ ਜਾਰੀ ਨਾ ਹੋਵੇ ਤਾਂ 100% ਪੈਸੇ ਵਾਪਸੀ ਦੀ ਗਰੰਟੀ",
    heroReviews: "890+ ਗਾਹਕਾਂ ਦੀਆਂ ਸਮੀਖਿਆਵਾਂ ਦੇ ਆਧਾਰ 'ਤੇ",
    // Hero form
    formTitle: "15 ਮਿੰਟ ਦੀ ਮੁਫ਼ਤ ਸਲਾਹ",
    formSubtitle:
      "ਬਿਨਾਂ ਫ਼ੀਸ, ਬਿਨਾਂ ਪ੍ਰਤੀਬੱਧ — ਸਿੱਧੇ ਸੀਨੀਅਰ ਸਲਾਹਕਾਰ ਤੋਂ।",
    labelFree: "ਮੁਫ਼ਤ",
    labelName: "ਪੂਰਾ ਨਾਮ *",
    labelWa: "WhatsApp ਨੰਬਰ *",
    labelSector: "ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ",
    phSector: "ਖੇਤਰ ਚੁਣੋ",
    labelNeed: "ਤੁਹਾਡੀ ਲੋੜ",
    phNeed: "ਪੈਕੇਜ ਚੁਣੋ",
    pkgNotSure: "ਪੱਕਾ ਨਹੀਂ / ਪਹਿਲਾਂ ਸਲਾਹ ਲਵੋ",
    pkgPrefix: "{p} ਪੈਕੇਜ",
    labelDesc: "ਆਪਣੇ ਕਾਰੋਬਾਰ ਬਾਰੇ ਸੰਖੇਪ ਦੱਸੋ (ਵਿਕਲਪਿਕ)",
    phDesc: "ਉਦਾ.: ਮੈਂ ਬਾਂਦੁੰਗ ਵਿੱਚ ਕੈਫ਼ੇ ਖੋਲ੍ਹਣਾ ਚਾਹੁੰਦਾ ਹਾਂ, ਜਗ੍ਹਾ ਹੈ ਪਰ ਕੰਪਨੀ ਹਾਲੇ ਨਹੀਂ ਬਣੀ...",
    btnSubmit: "ਮੁਫ਼ਤ ਸਲਾਹ ਲਈ ਰਜਿਸਟਰ ਕਰੋ",
    btnSending: "ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ...",
    privacyNote:
      "ਤੁਹਾਡਾ ਡਾਟਾ ਸੁਰੱਖਿਅਤ ਹੈ ਅਤੇ ਤੀਜੀ ਧਿਰ ਨਾਲ ਸਾਂਝਾ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ",
    successTitle: "ਤੁਸੀਂ ਰਜਿਸਟਰ ਹੋ ਗਏ! 🎉",
    successBody:
      "ਧੰਨਵਾਦ, {name}! ਸਾਡਾ ਸੀਨੀਅਰ ਸਲਾਹਕਾਰ 24 ਘੰਟਿਆਂ ਵਿੱਚ (ਕੰਮ ਦੇ ਸਮੇਂ ਆਮ ਤੌਰ 'ਤੇ 15 ਮਿੰਟਾਂ ਤੋਂ ਘੱਟ) ਤੁਹਾਡੇ WhatsApp 'ਤੇ ਸੰਪਰਕ ਕਰੇਗਾ।",
    btnAnother: "ਹੋਰ ਕਾਰੋਬਾਰ ਰਜਿਸਟਰ ਕਰੋ",
    // Toasts
    toastSuccess: "ਮੁਫ਼ਤ ਸਲਾਹ ਰਜਿਸਟਰ ਹੋਈ! 🎉",
    toastFail: "ਭੇਜਣ ਵਿੱਚ ਅਸਫ਼ਲ",
    toastConn: "ਕਨੈਕਸ਼ਨ ਦੀ ਸਮੱਸਿਆ",
    // Stats
    statClients: "ਸੇਵਾ ਕੀਤੇ ਗਾਹਕ",
    statPermits: "ਪ੍ਰੋਸੈਸ ਕੀਤੇ ਲਾਇਸੈਂਸ",
    statProvinces: "ਸੂਬੇ",
    statCities: "ਸ਼ਹਿਰ ਅਤੇ ਜ਼ਿਲ੍ਹੇ",
    statSatisfaction: "ਗਾਹਕ ਸੰਤੁਸ਼ਟੀ",
    statAvgTime: "ਔਸਤ ਪ੍ਰੋਸੈਸਿੰਗ ਸਮਾਂ",
    statHours: "ਘੰਟੇ",
    // Section titles
    servicesT1: "ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦੀਆਂ",
    servicesTHigh: "ਸਾਰੀਆਂ ਕਾਨੂੰਨੀ ਲੋੜਾਂ ਲਈ",
    servicesT2: "ਇੱਕ ਹੀ ਦਰਵਾਜ਼ਾ",
    checkerT1: "30 ਸਕਿੰਟਾਂ ਵਿੱਚ ਜਾਣੋ",
    checkerTHigh: "ਤੁਹਾਨੂੰ ਕਿਹੜੇ ਲਾਇਸੈਂਸ",
    checkerT2: "ਚਾਹੀਦੇ ਹਨ",
    calcT1: "ਲਾਇਸੈਂਸ ਲਾਗਤ ਕੈਲਕੁਲੇਟਰ —",
    calcTHigh: "ਪਹਿਲਾਂ ਗਿਣੋ, ਫਿਰ ਫੈਸਲਾ ਕਰੋ",
    calcT2: "",
    hubT1: "ਇੰਡੋਨੇਸ਼ੀਆ ਕਾਰੋਬਾਰੀ ਲਾਇਸੈਂਸਿੰਗ ਗਾਈਡਾਂ —",
    hubTHigh: "ਪੂਰੀਆਂ, ਸਾਫ਼, ਤਾਜ਼ਾ",
    hubT2: "",
    blogT1: "ਲਾਇਸੈਂਸ ਲੇਖ ਲਾਇਬ੍ਰੇਰੀ",
    blogTHigh: "ਇੰਡੋਨੇਸ਼ੀਆ ਵਿੱਚ ਸਭ ਤੋਂ ਵੱਡੀ",
    blogT2: "",
    courseT1: "ਕਾਰੋਬਾਰੀ ਲਾਇਸੈਂਸਿੰਗ ਸਿੱਖੋ",
    courseTHigh: "7 ਦਿਨਾਂ ਵਿੱਚ",
    courseT2: "",
    coverageT1: "{n} ਸੂਬੇ ਅਤੇ",
    coverageTHigh: "{n} ਸ਼ਹਿਰ ਅਤੇ ਜ਼ਿਲ੍ਹੇ",
    coverageT2: "— ਸਬੰਗ ਤੋਂ ਮੇਰਾਊਕੇ ਤੱਕ",
    whyT1: "ਸਿਰਫ਼ ਲਾਇਸੈਂਸ ਏਜੰਟ ਨਹੀਂ —",
    whyTHigh: "ਤੁਹਾਡਾ ਕਾਨੂੰਨੀ ਕਾਰੋਬਾਰੀ ਸਾਥੀ",
    whyT2: "",
    processT1: "ਪੂਰੇ ਕਾਨੂੰਨੀ ਕਾਰੋਬਾਰ ਲਈ",
    processTHigh: "4 ਕਦਮ",
    processT2: "",
    pricingT1: "ਸ਼ੁਰੂ ਤੋਂ ਸਾਫ਼ ਕੀਮਤ,",
    pricingTHigh: "ਕੋਈ ਲੁਕਵੀਂ ਫ਼ੀਸ ਨਹੀਂ",
    pricingT2: "",
    testiT1: "1,247+ ਕਾਰੋਬਾਰ",
    testiTHigh: "ਕਾਨੂੰਨੀ ਤੌਰ 'ਤੇ ਸਾਬਤ",
    testiT2: "",
    compT1: "ਹੋਰ ਸਲਾਹਕਾਰਾਂ ਦੀ ਥਾਂ",
    compTHigh: "ਸਾਨੂੰ ਕਿਉਂ ਚੁਣੀਏ?",
    compT2: "",
    faqT1: "ਸਵਾਲ",
    faqTHigh: "ਜੋ ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਹਨ",
    faqT2: "",
    ctaT1: "ਤੁਹਾਡਾ ਕਾਰੋਬਾਰ ਚੱਲ ਰਿਹਾ ਹੈ?",
    ctaTHigh: "ਹੁਣੇ ਇਸਨੂੰ ਕਾਨੂੰਨੀ ਬਣਾਓ।",
    ctaT2: "",
    sitemapT1: "PusatPerizinan.com ਦੀ",
    sitemapTHigh: "ਪੂਰੀ ਡਾਇਰੈਕਟਰੀ",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "ਛੋਟੇ ਕਾਰੋਬਾਰਾਂ ਤੋਂ ਕਾਰਪੋਰੇਸ਼ਨਾਂ ਤੱਕ — 40+ ਕਿਸਮਾਂ ਦੇ ਲਾਇਸੈਂਸ ਅਸੀਂ ਸਰਕਾਰੀ ਅਧਿਕਾਰਤ ਰਾਹਾਂ ਰਾਹੀਂ ਪੂਰੇ ਕਰਦੇ ਹਾਂ।",
    checkerSub:
      "ਬੱਸ ਆਪਣਾ ਕਾਰੋਬਾਰ ਦੱਸੋ। ਸਾਡੀ AI, ਜੋ ਰੁਜ਼ਗਾਰ ਸਿਰਜਣ ਕਾਨੂੰਨ (UU Cipta Kerja) ਅਤੇ OSS-RBA ਨਿਯਮਾਂ 'ਤੇ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਹੈ, ਤੁਹਾਡੇ ਲਈ ਪੂਰੀ ਲਾਇਸੈਂਸਿੰਗ ਰੋਡਮੈਪ ਬਣਾਏਗੀ — ਮੁਫ਼ਤ, ਬਿਨਾਂ ਰਜਿਸਟ੍ਰੇਸ਼ਨ।",
    calcSub:
      "ਲੋੜੀਂਦੇ ਲਾਇਸੈਂਸ ਚੁਣੋ — ਸਿਸਟਮ ਤੁਰੰਤ ਅੰਦਾਜ਼ਨ ਲਾਗਤ ਅਤੇ ਸਮਾਂ ਦੱਸ ਦਿੰਦਾ ਹੈ। ਪਹਿਲੇ ਮਿੰਟ ਤੋਂ ਪਾਰਦਰਸ਼ੀ — ਕੋਈ ਲੁਕਵੀਂ ਫ਼ੀਸ ਨਹੀਂ।",
    hubSub:
      "NIB, PT, CV, ਹਲਾਲ, BPOM, PBG/SLF, AMDAL, PMA ਅਤੇ ਕਾਰੋਬਾਰੀ ਟੈਕਸ ਬਾਰੇ ਸਭ ਕੁਝ — ਬੁਨਿਆਦਾਂ ਤੋਂ ਤਕਨੀਕੀ ਵੇਰਵਿਆਂ ਤੱਕ। UU Cipta Kerja ਅਤੇ ਤਾਜ਼ਾ ਨਿਯਮਾਂ 'ਤੇ ਆਧਾਰਿਤ।",
    blogSub:
      "ਸਾਡੇ ਨਿਯਮ-ਮਾਹਿਰਾਂ ਦੇ {n} ਡੂੰਘੇ ਲੇਖ — PT ਬਣਾਉਣ ਦੀ ਲਾਗਤ, ਰੈਸਟੋਰੈਂਟਾਂ ਦੇ KBLI, PMA, ਮਾਈਨਿੰਗ RKAB, ਉਮਰਾਹ ਸਫ਼ਰ, ਤੱਕ ਕਿ ਸਾਊਦੀ ਅਰਬ ਵਿੱਚ ਕਾਰੋਬਾਰ ਸ਼ੁਰੂ ਕਰਨਾ। ਮੁਫ਼ਤ ਪੜ੍ਹੋ, ਹਮੇਸ਼ਾ ਅੱਪਡੇਟ।",
    courseSub:
      "ਹਰ ਸਵੇਰ: ਇੱਕ 5 ਮਿੰਟ ਦਾ ਪਾਠ + ਵਿਹਾਰਕ ਚੈੱਕਲਿਸਟ ਸਿੱਧੀ ਤੁਹਾਡੀ ਈਮੇਲ 'ਤੇ। ਲਿਖਦੇ ਹਨ ਸਾਡੇ ਨਿਯਮ-ਮਾਹਿਰ — ਥਿਊਰੀ ਨਹੀਂ, ਬਲਕਿ ਮੈਦਾਨ ਵਿੱਚ ਅਸਲ ਵਿੱਚ ਵਰਤੀ ਜਾਣ ਵਾਲੀ ਜਾਣਕਾਰੀ।",
    coverageSub:
      "ਭਾਵੇਂ ਤੁਹਾਡਾ ਕਾਰੋਬਾਰ ਬਾਤਮ, ਵਾਮੇਨਾ ਜਾਂ ਬਾਲਿਕਪਾਪਨ ਵਿੱਚ ਹੋਵੇ — ਸਾਰੀ ਲਾਇਸੈਂਸਿੰਗ ਪ੍ਰਕਿਰਿਆ ਅਸੀਂ ਔਨਲਾਈਨ ਕਰਦੇ ਹਾਂ, ਦਸਤਾਵੇਜ਼ ਕੂਰੀਅਰ ਰਾਹੀਂ ਭੇਜਦੇ ਹਾਂ, ਅਤੇ ਸਾਡੀ ਆਨ-ਸਾਈਟ ਟੀਮ ਫਿਜ਼ੀਕਲ ਆਡਿਟ, AMDAL ਜਾਂ ਮਾਈਨਿੰਗ ਸੈਕਟਰ ਲਈ ਆਉਂਦੀ ਹੈ।",
    whySub:
      "ਹਜ਼ਾਰਾਂ ਕਾਰੋਬਾਰੀ ਮਾਲਕ ਹੋਰ ਸਲਾਹਕਾਰਾਂ ਤੋਂ ਨਿਰਾਸ਼ ਹੋ ਕੇ ਸਾਡੇ ਕੋਲ ਆਏ। ਇੱਥੇ ਕਾਰਨ ਹੈ:",
    processSub:
      "ਸਰਕਾਰੀ ਦਫ਼ਤਰ ਜਾਣ ਦੀ ਇੱਕ ਦਿਨ ਵੀ ਲੋੜ ਨਹੀਂ। ਸਾਰਾ ਤਾਲਮੇਲ ਅਸੀਂ ਸੰਭਾਲਦੇ ਹਾਂ।",
    pricingSub:
      "ਹਰ ਪੈਕੇਜ ਵਿੱਚ ਸਰਕਾਰੀ ਫ਼ੀਸਾਂ ਅਤੇ ਸਾਡੀ ਸੇਵਾ ਦੀ ਫ਼ੀਸ ਸ਼ਾਮਲ ਹੈ। 50% ਪਹਿਲਾਂ ਅਦਾ ਕਰੋ, ਲਾਇਸੈਂਸ ਜਾਰੀ ਹੋਣ 'ਤੇ 50%।",
    testiSub:
      "890+ ਸਮੀਖਿਆਵਾਂ ਤੋਂ 4.9/5 ਰੇਟਿੰਗ। ਉਨ੍ਹਾਂ ਗਾਹਕਾਂ ਦੀਆਂ ਕਹਾਣੀਆਂ ਜਿਨ੍ਹਾਂ ਦੇ ਕਾਰੋਬਾਰ ਹੁਣ ਕਾਨੂੰਨੀ ਅਤੇ ਸ਼ਾਂਤ ਹਨ।",
    compSub:
      "ਇੰਡੋਨੇਸ਼ੀਆ ਦੀਆਂ ਲਾਇਸੈਂਸਿੰਗ ਸੇਵਾਵਾਂ ਦੀਆਂ ਆਮ ਪ੍ਰਥਾਵਾਂ ਨਾਲ ਵਸਤੂਨਿਸਠ ਤੁਲਨਾ (Infiniti Office, EasyLegal, Izin.co.id ਅਤੇ ਹੋਰ)।",
    faqSub:
      "ਹਾਲੇ ਵੀ ਸ਼ੱਕ ਹੈ? ਇਹ ਜਵਾਬ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ। ਜਾਂ ਸਿੱਧੇ ਸਾਡੇ AI ਸਲਾਹਕਾਰ ਨੂੰ ਪੁੱਛੋ।",
    ctaSub:
      "ਬਿਨਾਂ ਅਧਿਕਾਰਤ ਲਾਇਸੈਂਸ ਦਾ ਹਰ ਦਿਨ = ਜੁਰਮਾਨੇ, ਪਾਬੰਦੀਆਂ ਅਤੇ ਟੈਂਡਰ ਤੇ ਫੰਡਿੰਗ ਦੇ ਮੌਕਿਆਂ ਦੇ ਗੁੰਮ ਹੋਣ ਦਾ ਜੋਖਮ। 15 ਮਿੰਟ ਦੀ ਮੁਫ਼ਤ ਸਲਾਹ — ਅਸੀਂ ਸਭ ਕੁਝ ਨੱਥੀ ਕਰਦੇ ਹਾਂ, ਫੈਸਲਾ ਤੁਸੀਂ ਬਾਅਦ ਵਿੱਚ ਕਰੋ।",
    sitemapSub:
      "ਸਾਡੇ ਸਾਰੇ ਕੰਟੈਂਟ ਅਤੇ ਸੇਵਾਵਾਂ ਤੱਕ ਇੱਕ ਪੰਨੇ ਤੋਂ ਨੈਵੀਗੇਸ਼ਨ — ਤੁਹਾਡੇ ਲਈ ਅਤੇ ਖੋਜ ਇੰਜਣਾਂ ਲਈ।",
    // Final CTA extras
    ctaBadge: "ਰੋਜ਼ਾਨਾ ਸੀਮਿਤ ਥਾਵਾਂ",
    ctaFormTitle: "ਮੁਫ਼ਤ ਸਲਾਹ ਬੁੱਕ ਕਰੋ",
    ctaFormSub:
      "30 ਸਕਿੰਟਾਂ ਵਿੱਚ ਭਰੋ — ਸਾਡਾ ਸੀਨੀਅਰ ਸਲਾਹਕਾਰ ਤੁਹਾਨੂੰ ਸੰਪਰਕ ਕਰੇਗਾ।",
    ctaSubmit: "ਮੁਫ਼ਤ ਸਲਾਹ ਬੁੱਕ ਕਰੋ",
    ctaSuccessTitle: "ਬੇਨਤੀ ਮਿਲ ਗਈ! 🎉",
    ctaSuccessBody:
      "ਸਾਡਾ ਸਲਾਹਕਾਰ 24 ਘੰਟਿਆਂ ਵਿੱਚ WhatsApp ਰਾਹੀਂ ਤੁਹਾਡੇ ਸੰਪਰਕ ਕਰੇਗਾ। ਉਡੀਕ ਦੌਰਾਨ AI ਲਾਇਸੈਂਸ ਜਾਂਚ ਵਿਸ਼ੇਸ਼ਤਾ ਵਰਤ ਕੇ ਵੇਖੋ!",
    ctaWaBtn: "ਹੁਣੇ WhatsApp 'ਤੇ ਗੱਲ ਕਰੋ",
    ctaPrivacy: "100% ਮੁਫ਼ਤ • ਬਿਨਾਂ ਪ੍ਰਤੀਬੱਧ • ਡਾਟਾ ਸੁਰੱਖਿਅਤ",
    // Knowledge hub tabs
    tabPerIzin: "ਲਾਇਸੈਂਸ ਅਨੁਸਾਰ",
    tabPerSektor: "ਸੈਕਟਰ ਅਨੁਸਾਰ",
    tabPerWilayah: "ਇਲਾਕੇ ਅਨੁਸਾਰ",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "ਮੁਫ਼ਤ ਈਮੇਲ ਕੋਰਸ — 100% ਬਿਨਾਂ ਫ਼ੀਸ",
    courseFormTitle: "ਹੁਣੇ ਮੁਫ਼ਤ ਰਜਿਸਟਰ ਕਰੋ",
    courseFormSub:
      "8 ਦਿਨ × 5 ਮਿੰਟ = 100% ਕਾਨੂੰਨੀ ਕਾਰੋਬਾਰ, ਜੁਰਮਾਨੇ ਦੀ ਚਿੰਤਾ ਤੋਂ ਬਿਨਾਂ।",
    courseSuccessTitle: "ਕਲਾਸ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ!",
    // Footer
    footerTagline:
      "ਇੰਡੋਨੇਸ਼ੀਆ ਦਾ ਭਰੋਸੇਯੋਗ ਕਾਰੋਬਾਰੀ ਲਾਇਸੈਂਸਿੰਗ ਸਲਾਹਕਾਰ। ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦੀ ਕਾਨੂੰਨੀਅਤ ਮਾਹਿਰ ਟੀਮ ਸੰਭਾਲਦੀ ਹੈ — ਤੇਜ਼, ਪਾਰਦਰਸ਼ੀ, ਗਰੰਟੀ ਸਹਿਤ।",
    footerVerified:
      "38 ਸੂਬਿਆਂ ਅਤੇ 514 ਸ਼ਹਿਰਾਂ/ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ ਅਧਿਕਾਰਤ ਨੋਟਰੀਆਂ ਨਾਲ ਰਜਿਸਟਰਡ ਅਤੇ ਸਾਂਝੇਦਾਰੀ ਵਿੱਚ",
    footerColServices: "ਸੇਵਾਵਾਂ",
    footerColCompany: "ਕੰਪਨੀ",
    footerColContact: "ਸੰਪਰਕ",
    footerHours: "ਸੋਮਵਾਰ-ਸ਼ਨੀਵਾਰ, 08.00-20.00 WIB",
    footerNote:
      "ਇੰਡੋਨੇਸ਼ੀਆ ਸਟਾਕ ਐਕਸਚੇਂਜ ਨਾਲ ਇੱਕੋ ਮੰਜ਼ਿਲ • ਪੂਰੇ ਇੰਡੋਨੇਸ਼ੀਆ ਦੀ ਔਨਲਾਈਨ ਸੇਵਾ",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ.",
    footerMade: "ਇੰਡੋਨੇਸ਼ੀਆ ਦੇ ਐਮਐਸਐਮਈ ਦੀ ਤਰੱਕੀ ਲਈ ❤️ ਨਾਲ ਬਣਾਇਆ ਗਿਆ",
    // Chat
    chatTitle: "RIZKI — AI ਸਲਾਹਕਾਰ",
    chatStatus: "ਔਨਲਾਈਨ • ਸਕਿੰਟਾਂ ਵਿੱਚ ਜਵਾਬ",
    chatWelcome:
      "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! 👋 ਮੈਂ **RIZKI** ਹਾਂ, PusatPerizinan.com ਦਾ AI ਸਲਾਹਕਾਰ — ਕਾਰੋਬਾਰੀ ਲਾਇਸੈਂਸ ਦੇ ਸਾਰੇ ਸਵਾਲਾਂ ਲਈ 24 ਘੰਟੇ ਹਾਜ਼ਰ।\n\nNIB, PT, CV, ਹਲਾਲ, BPOM ਜਾਂ ਹੋਰ ਲਾਇਸੈਂਸ? ਬੇਝਿਜਕ ਪੁੱਛੋ! 😊",
    chatPlaceholder: "ਕਾਰੋਬਾਰੀ ਲਾਇਸੈਂਸ ਬਾਰੇ ਪੁੱਛੋ...",
    chatTyping: "RIZKI ਲਿਖ ਰਿਹਾ ਹੈ...",
    chatQr1: "ਕੈਫ਼ੇ ਖੋਲ੍ਹਣ ਲਈ ਕਿਹੜੇ ਲਾਇਸੈਂਸ ਚਾਹੀਦੇ ਹਨ?",
    chatQr2: "PT ਬਣਾਉਣ ਦੀ ਲਾਗਤ ਕਿੰਨੀ ਹੈ?",
    chatQr3: "ਐਮਐਸਐਮਈ ਲਈ NIB ਕਿਵੇਂ ਲਵਾਂ",
    chatQr4: "PIRT ਅਤੇ BPOM ਵਿੱਚ ਕੀ ਫ਼ਰਕ ਹੈ?",
    // Language
    languageLabel: "ਭਾਸ਼ਾ",
    searchLanguages: "ਭਾਸ਼ਾ ਖੋਜੋ...",
    contentNote:
      "ਹੇਠਾਂ ਦੀਆਂ ਪੂਰੀਆਂ ਗਾਈਡਾਂ ਇੰਡੋਨੇਸ਼ੀਆਈ ਵਿੱਚ ਹਨ — ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਉਣ ਲਈ RIZKI AI ਨੂੰ ਪੁੱਛੋ.",
  },

  // ============================================================
  // JV — Javanese, Latin script (Basa Jawa) — ngoko lugu + "sampeyan"
  // ============================================================
  jv: {
    // Header
    navServices: "Layanan",
    navCheckAI: "Cek Izin AI",
    navCalculator: "Kalkulator",
    navGuides: "Panduan",
    navBlog: "Blog",
    navCoverage: "Jangkauan",
    navPricing: "Regi",
    navFaq: "FAQ",
    headerTagline: "Konsultan Perizinan Usaha #1 ing Indonesia",
    ctaFree: "Konsultasi Gratis",
    // Hero
    heroBadge:
      "Dipercaya dening 1.247+ bisnis ing 38 provinsi & 514 kota ing Indonesia",
    heroTitle1: "Urus Kabeh",
    heroHigh1: "Izin Usaha",
    heroTitle2: "Sampeyan Tinggal",
    heroHigh2: "Santai",
    heroSubtitle:
      "NIB, PT, CV, Halal, BPOM nganti AMDAL — diproses tim ahli, legal 100%, digaransi dhuwit bali. Miwiti saka 350 ewu rupiah, paling banter 1 dina kerja.",
    heroBullet1: "NIB 1 dina • PT 3 dina • Ora usah antre ing instansi",
    heroBullet2:
      "Jalur resmi pemerintah — dokumen sah & terverifikasi",
    heroBullet3: "Garansi 100% dhuwit bali yen izine ora terbit",
    heroReviews: "saka 890+ ulasan pelanggan",
    // Hero form
    formTitle: "Konsultasi Gratis 15 Menit",
    formSubtitle:
      "Tanpa bayaran, tanpa ikatan — langsung saka konsultan senior.",
    labelFree: "Gratis",
    labelName: "Jeneng Lengkap *",
    labelWa: "Nomer WhatsApp *",
    labelSector: "Jenis Usaha",
    phSector: "Pilih sektor",
    labelNeed: "Kabutuhan",
    phNeed: "Pilih paket",
    pkgNotSure: "Durung mesthi / konsultasi dhisik",
    pkgPrefix: "Paket {p}",
    labelDesc: "Ceritakake usaha sampeyan sacara cekak (opsional)",
    phDesc: "cth: Aku arep buka kafe ing Bandung, wis nduwe panggonan, durung nduwe badan usaha...",
    btnSubmit: "Daftar Konsultasi Gratis",
    btnSending: "Ngirim...",
    privacyNote:
      "Data sampeyan aman & ora disebarake marang pihak katelu",
    successTitle: "Sampeyan Wis Ndaftar! 🎉",
    successBody:
      "Matur nuhun, {name}! Konsultan senior kita bakal ngubungi WhatsApp sampeyan ing sajroning 1x24 jam (biasane < 15 menit nalika jam kerja).",
    btnAnother: "Ndaptarke Usaha Liyane",
    // Toasts
    toastSuccess: "Konsultasi Gratis Wis Kadaftar! 🎉",
    toastFail: "Gagal ngirim",
    toastConn: "Koneksi ana masalah",
    // Stats
    statClients: "Pelanggan Sing Dilayani",
    statPermits: "Izin Sing Diproses",
    statProvinces: "Provinsi",
    statCities: "Kabupaten/Kota",
    statSatisfaction: "Kepuasan Pelanggan",
    statAvgTime: "Rata-rata Wektu Proses",
    statHours: "jam",
    // Section titles
    servicesT1: "Siji Pintu kanggo",
    servicesTHigh: "Sakabehing Kabutuhan Legal",
    servicesT2: "Usaha Sampeyan",
    checkerT1: "Cek Izin",
    checkerTHigh: "Sing Sampeyan Butuhake",
    checkerT2: "ing 30 Detik",
    calcT1: "Kalkulator Biaya Perizinan —",
    calcTHigh: "Ngitung Dhisik, Mutuske Mengko",
    calcT2: "",
    hubT1: "Panduan Perizinan Usaha Indonesia —",
    hubTHigh: "Lengkap, Jelas, Paling Anyar",
    hubT2: "",
    blogT1: "Perpustakaan Artikel Perizinan",
    blogTHigh: "Paling Lengkap ing Indonesia",
    blogT2: "",
    courseT1: "7 Dina Nguasai Perizinan",
    courseTHigh: "Usaha Indonesia",
    courseT2: "",
    coverageT1: "{n} Provinsi &",
    coverageTHigh: "{n} Kabupaten/Kota",
    coverageT2: "— Saka Sabang nganti Merauke",
    whyT1: "Ora Mung Ngurus Izin —",
    whyTHigh: "Mitra Legal Usaha Sampeyan",
    whyT2: "",
    processT1: "4 Langkah Supaya",
    processTHigh: "Usaha Sampeyan Legal",
    processT2: "",
    pricingT1: "Rega Jelas ing Wiwitan,",
    pricingTHigh: "Tanpa Biaya Siluman",
    pricingT2: "",
    testiT1: "1.247+ Bisnis Wis",
    testiTHigh: "Terbukti Legal",
    testiT2: "",
    compT1: "Ngapa Milih Kita, Dudu",
    compTHigh: "Konsultan Liya?",
    compT2: "",
    faqT1: "Pitakonan",
    faqTHigh: "Sing Sering Ditakokake",
    faqT2: "",
    ctaT1: "Usaha Sampeyan Wis Lumaku?",
    ctaTHigh: "Pasthekake Legalne Saiki.",
    ctaT2: "",
    sitemapT1: "Direktori Lengkap",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Saka UMKM nganti korporasi — 40+ jenis perizinan kita urus tuntas nganggo jalur resmi pemerintah.",
    checkerSub:
      "Cukup carakake usaha sampeyan. AI kita sing wis dilatih karo regulasi UU Cipta Kerja & OSS-RBA bakal nyusun roadmap perizinan lengkap — gratis, tanpa daftar akun.",
    calcSub:
      "Pilih izin sing sampeyan butuhake, sistem langsung ngetung estimasi biaya & wektu. Transparan wiwit menit kapisan — tanpa biaya sing didhelikake.",
    hubSub:
      "Kabeh perkara NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA, nganti pajak usaha — disinaoni saka dhasar nganti detail teknis. Disusun saka UU Cipta Kerja & regulasi paling anyar.",
    blogSub:
      "{n} artikel jero saka tim ahli regulasi kita — biaya ngadegake PT, KBLI kuliner, PMA, RKAB tambang, travel umroh, nganti buka usaha ing Arab Saudi. Gratis diwaca, terus dianyarke.",
    courseSub:
      "Saben enjing, siji materi ringkes 5 menit + checklist praktis langsung menyang email sampeyan. Ditulis tim ahli regulasi kita — dudu teori, nanging sing pancen dienggo ing lapangan.",
    coverageSub:
      "Ora peduli usaha sampeyan ana ing Batam, Wamena, utawa Balikpapan — kabeh proses perizinan kita garap online, dokumen dikirim liwat kurir, lan tim on-site kita teka kanggo audit fisik, AMDAL, utawa sektor tambang.",
    whySub:
      "Ribuan pemilik usaha pindah menyang kita sawise kecewa karo konsultan liya. Iki alesane:",
    processSub:
      "Sedina wae ora usah menyang kantor instansi. Kabeh kita sing ngatur.",
    pricingSub:
      "Kabeh paket wis kalebu biaya resmi & jasa. Bayar 50% ing wiwitan, 50% sawise izin terbit.",
    testiSub:
      "Rating 4,9/5 saka 890+ ulasan. Iki critane pelanggan sing usahane saiki resmi lan tentrem.",
    compSub:
      "Perbandingan objektif karo praktik umum layanan ngurusi perizinan ing Indonesia (Infiniti Office, EasyLegal, Izin.co.id, lan jasa liyane).",
    faqSub:
      "Isih ragu? Jembare iki bisa mbantu. Utawa takon langsung marang Konsultan AI kita.",
    ctaSub:
      "Saben dina tanpa izin resmi = resiko denda, sanksi, lan ilange kesempatan tender sarta pendanaan. Konsultasi gratis 15 menit — kita petakake kabeh sing sampeyan butuhake, sampeyan bebas mutusake mengko.",
    sitemapSub:
      "Navigasi siji kaca menyang kabeh konten & layanan kita — kanggo sampeyan, lan kanggo mesin panggolekan.",
    // Final CTA extras
    ctaBadge: "SLOT WATES SABEN DINA",
    ctaFormTitle: "Booking Konsultasi Gratis",
    ctaFormSub:
      "Isi 30 detik — konsultan senior kita sing ngubungi sampeyan.",
    ctaSubmit: "Booking Konsultasi Gratis",
    ctaSuccessTitle: "Panjaluke Wis Ketrima! 🎉",
    ctaSuccessBody:
      "Konsultan kita bakal ngubungi sampeyan via WhatsApp maksimal 1x24 jam. Sambi ngenteni, coba fitur Cek Izin AI ya!",
    ctaWaBtn: "Chat WhatsApp Saiki",
    ctaPrivacy: "100% gratis • Tanpa ikatan • Data aman",
    // Knowledge hub tabs
    tabPerIzin: "Per Izin",
    tabPerSektor: "Per Sektor",
    tabPerWilayah: "Per Wilayah",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Kursus Email Gratis — 100% Tanpa Biaya",
    courseFormTitle: "Daftar Gratis Saiki",
    courseFormSub:
      "8 dina × 5 menit = usaha sampeyan 100% legal & ora perlu kuwatir denda.",
    courseSuccessTitle: "Sugeng rawuh ing kelas!",
    // Footer
    footerTagline:
      "Konsultan perizinan usaha sing dipercaya ing Indonesia. Legalitas usaha sampeyan diurusi tim ahli — banter, transparan, digaransi.",
    footerVerified:
      "Kadaftar & kerja sama karo notaris resmi ing 38 provinsi & 514 kabupaten/kota",
    footerColServices: "Layanan",
    footerColCompany: "Perusahaan",
    footerColContact: "Kontak",
    footerHours: "Senen-Sabtu, 08.00-20.00 WIB",
    footerNote:
      "Sewang lante karo Bursa Efek Indonesia • Nglayani kabeh Indonesia online",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Kabeh hak dilindhungi.",
    footerMade: "Digawe nganggo ❤️ kanggo kemajuan UMKM Indonesia",
    // Chat
    chatTitle: "RIZKI — Konsultan AI",
    chatStatus: "Online • Mangsuli mung sawetara detik",
    chatWelcome:
      "Halo Kaka! 👋 Aku **RIZKI**, Konsultan AI PusatPerizinan.com — siaga 24 jam kanggo kabeh pitakon perizinan usaha.\n\nNIB, PT, CV, Halal, BPOM, utawa izin liyane? Takona wae langsung! 😊",
    chatPlaceholder: "Takona babagan izin usaha...",
    chatTyping: "RIZKI lagi ngetik...",
    chatQr1: "Apa wae izin kanggo buka kafe?",
    chatQr2: "Pira biaya ngadegake PT?",
    chatQr3: "Cara ndaftar NIB kanggo UMKM",
    chatQr4: "Bedane PIRT karo BPOM apa?",
    // Language
    languageLabel: "Basa",
    searchLanguages: "Goleki basa...",
    contentNote:
      "Panduan lengkap ing ngisor iki kasedhiya ing Basa Indonesia — takon RIZKI AI kanggo penjelasan nganggo basa sampeyan.",
  },
};
