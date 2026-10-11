// ============================================================
// PUSATPERIZINAN.COM — Translations Part C (Western Europe & Brazil)
// es, fr, de, it, nl, pt, el — Task 7-c
// ============================================================

import type { LangCode, Translation } from "./types";

export const TRANSLATIONS_C: Partial<Record<LangCode, Translation>> = {
  es: {
    // Header
    navServices: "Servicios",
    navCheckAI: "Verificación con IA",
    navCalculator: "Calculadora",
    navGuides: "Guías",
    navBlog: "Blog",
    navCoverage: "Cobertura",
    navPricing: "Precios",
    navFaq: "FAQ",
    headerTagline: "El Consultor de Licencias Empresariales N.º 1 de Indonesia",
    ctaFree: "Consulta Gratuita",
    // Hero
    heroBadge: "Con la confianza de más de 1.247 empresas en 38 provincias y 514 ciudades de Indonesia",
    heroTitle1: "Gestione Todas",
    heroHigh1: "las Licencias",
    heroTitle2: "de su Negocio —",
    heroHigh2: "Nosotros las Tramitamos",
    heroSubtitle:
      "Desde el NIB, PT, CV, Halal, BPOM hasta el AMDAL — gestionados por un equipo de expertos, 100% legal y con garantía de devolución. Desde 350 mil rupias, en tan solo 1 día hábil.",
    heroBullet1: "NIB en 1 día • PT en 3 días • Sin filas en oficinas públicas",
    heroBullet2: "Canales oficiales del gobierno — documentos válidos y verificados",
    heroBullet3: "Garantía de devolución del 100% si la licencia no se emite",
    heroReviews: "según más de 890 reseñas de clientes",
    // Hero form
    formTitle: "Consulta Gratuita de 15 Minutos",
    formSubtitle: "Sin cargos ni compromiso — atención directa de un consultor sénior.",
    labelFree: "Gratis",
    labelName: "Nombre Completo *",
    labelWa: "Número de WhatsApp *",
    labelSector: "Tipo de Negocio",
    phSector: "Elija un sector",
    labelNeed: "Lo que Necesita",
    phNeed: "Elija un paquete",
    pkgNotSure: "Aún no lo sé / consultar primero",
    pkgPrefix: "Paquete {p}",
    labelDesc: "Cuéntenos brevemente sobre su negocio (opcional)",
    phDesc: "p. ej.: Quiero abrir una cafetería en Bandung, ya tengo local pero aún no tengo empresa constituida...",
    btnSubmit: "Solicitar Consulta Gratuita",
    btnSending: "Enviando...",
    privacyNote: "Sus datos están seguros y nunca se comparten con terceros",
    successTitle: "¡Registro Recibido! 🎉",
    successBody:
      "¡Gracias, {name}! Nuestro consultor sénior se pondrá en contacto con usted por WhatsApp dentro de las próximas 24 horas (normalmente en menos de 15 minutos en horario laboral).",
    btnAnother: "Registrar Otro Negocio",
    // Toasts
    toastSuccess: "¡Consulta Gratuita Registrada! 🎉",
    toastFail: "Error al enviar",
    toastConn: "Problema de conexión",
    // Stats
    statClients: "Clientes Atendidos",
    statPermits: "Licencias Tramitadas",
    statProvinces: "Provincias",
    statCities: "Ciudades y Regencias",
    statSatisfaction: "Satisfacción del Cliente",
    statAvgTime: "Tiempo Promedio de Trámite",
    statHours: "horas",
    // Section titles
    servicesT1: "Un Solo Punto para",
    servicesTHigh: "Todas sus Necesidades Legales",
    servicesT2: "como Empresa",
    checkerT1: "Descubra las Licencias",
    checkerTHigh: "que su Negocio Necesita",
    checkerT2: "en 30 Segundos",
    calcT1: "Calculadora de Costos de Licencias —",
    calcTHigh: "Calcule Primero, Decida Después",
    calcT2: "",
    hubT1: "Guías de Licencias para Negocios en Indonesia —",
    hubTHigh: "Completas, Claras, Actualizadas",
    hubT2: "",
    blogT1: "Biblioteca de Artículos sobre Licencias",
    blogTHigh: "— la más Completa de Indonesia",
    blogT2: "",
    courseT1: "Domine las Licencias Empresariales en",
    courseTHigh: "7 Días",
    courseT2: "",
    coverageT1: "{n} Provincias y",
    coverageTHigh: "{n} Ciudades y Regencias",
    coverageT2: "— de Sabang a Merauke",
    whyT1: "Más que una Gestoría de Licencias —",
    whyTHigh: "Su Socio Legal de Confianza",
    whyT2: "",
    processT1: "4 Pasos hacia un",
    processTHigh: "Negocio 100% Legal",
    processT2: "",
    pricingT1: "Precios Claros desde el Inicio,",
    pricingTHigh: "Sin Costos Ocultos",
    pricingT2: "",
    testiT1: "Más de 1.247 Negocios con",
    testiTHigh: "Legalidad Comprobada",
    testiT2: "",
    compT1: "¿Por Qué Elegirnos Antes que",
    compTHigh: "Otros Consultores?",
    compT2: "",
    faqT1: "Preguntas",
    faqTHigh: "Frecuentes",
    faqT2: "",
    ctaT1: "¿Su Negocio ya Está en Marcha?",
    ctaTHigh: "Póngalo en Regla Hoy Mismo.",
    ctaT2: "",
    sitemapT1: "Directorio Completo de",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Desde pymes hasta grandes corporaciones — más de 40 tipos de licencias gestionados de principio a fin por canales gubernamentales oficiales.",
    checkerSub:
      "Solo describa su negocio. Nuestra IA, entrenada en la Ley de Creación de Empleo (UU Cipta Kerja) y en la normativa OSS-RBA, elaborará su hoja de ruta completa de licencias — gratis y sin registro.",
    calcSub:
      "Seleccione las licencias que necesita y obtenga al instante una estimación de costos y plazos. Transparencia desde el primer minuto — sin cargos ocultos.",
    hubSub:
      "Todo sobre el NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA y los impuestos empresariales — desde lo básico hasta los detalles técnicos. Basado en la Ley de Creación de Empleo y la normativa más reciente.",
    blogSub:
      "{n} artículos en profundidad de nuestro equipo de expertos en regulación — costos de constitución de una PT, KBLI de gastronomía, PMA, RKAB minero, viajes de Umrah y cómo hacer negocios en Arabia Saudita. Lectura gratuita, siempre actualizados.",
    courseSub:
      "Cada mañana: una lección de 5 minutos + una lista de verificación práctica directamente en su correo. Escrita por nuestros expertos en regulación — no teoría, sino lo que realmente se aplica sobre el terreno.",
    coverageSub:
      "No importa si su negocio está en Batam, Wamena o Balikpapan — todo el proceso de licencias se realiza en línea, los documentos se envían por mensajería y nuestro equipo presencial acude cuando se requieren auditorías físicas, AMDAL o proyectos del sector minero.",
    whySub:
      "Miles de empresarios se cambiaron a nosotros tras quedarse decepcionados con otros consultores. Estas son las razones:",
    processSub: "Ni un solo día de visitas a oficinas públicas. De toda la coordinación nos encargamos nosotros.",
    pricingSub:
      "Todos los paquetes incluyen las tasas oficiales y los honorarios del servicio. Pague 50% por adelantado y 50% cuando la licencia esté emitida.",
    testiSub:
      "Valoración de 4,9/5 según más de 890 reseñas. Historias de clientes cuyos negocios hoy son 100% legales y viven tranquilos.",
    compSub:
      "Una comparación objetiva con las prácticas habituales de los proveedores de servicios de licencias en Indonesia (Infiniti Office, EasyLegal, Izin.co.id y otros).",
    faqSub: "¿Aún con dudas? Estas respuestas pueden ayudarle. O pregunte directamente a nuestro Consultor IA.",
    ctaSub:
      "Cada día sin licencias oficiales = riesgo de multas, sanciones y pérdida de licitaciones y financiación. Consulta gratuita de 15 minutos — le trazamos el mapa completo de lo que necesita y usted decide después.",
    sitemapSub:
      "Navegación en una sola página hacia todo nuestro contenido y servicios — para usted y para los motores de búsqueda.",
    // Final CTA extras
    ctaBadge: "CUPOS LIMITADOS POR DÍA",
    ctaFormTitle: "Reserve una Consulta Gratuita",
    ctaFormSub: "Complételo en 30 segundos — nuestro consultor sénior lo contacta.",
    ctaSubmit: "Reservar Consulta Gratuita",
    ctaSuccessTitle: "¡Solicitud Recibida! 🎉",
    ctaSuccessBody:
      "Nuestro consultor lo contactará por WhatsApp en un máximo de 24 horas. Mientras espera, pruebe nuestra Verificación de Licencias con IA.",
    ctaWaBtn: "Chatear por WhatsApp Ahora",
    ctaPrivacy: "100% gratis • Sin compromiso • Datos protegidos",
    // Knowledge hub tabs
    tabPerIzin: "Por Licencia",
    tabPerSektor: "Por Sector",
    tabPerWilayah: "Por Región",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Curso por Email Gratuito — 100% sin Cargos",
    courseFormTitle: "Regístrese Gratis Ahora",
    courseFormSub: "8 días × 5 minutos = un negocio 100% legal y libre de multas.",
    courseSuccessTitle: "¡Bienvenido a la clase!",
    // Footer
    footerTagline:
      "El consultor de licencias empresariales de confianza en Indonesia. La legalidad de su negocio en manos de expertos — rápido, transparente y con garantía.",
    footerVerified:
      "Registrados y en alianza con notarios oficiales en 38 provincias y 514 ciudades/regencias",
    footerColServices: "Servicios",
    footerColCompany: "Empresa",
    footerColContact: "Contacto",
    footerHours: "Lunes a Sábado, 08.00-20.00 WIB",
    footerNote:
      "En el mismo piso que la Bolsa de Valores de Indonesia • Atendemos toda Indonesia en línea",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Todos los derechos reservados.",
    footerMade: "Hecho con ❤️ para el progreso de las pymes de Indonesia",
    // Chat
    chatTitle: "RIZKI — Consultor IA",
    chatStatus: "En línea • Responde en segundos",
    chatWelcome:
      "¡Hola! 👋 Soy **RIZKI**, el Consultor IA de PusatPerizinan.com — a su disposición 24 horas para todas sus preguntas sobre licencias empresariales.\n\n¿NIB, PT, CV, Halal, BPOM u otra licencia? ¡Pregunte con confianza! 😊",
    chatPlaceholder: "Pregunte sobre licencias empresariales...",
    chatTyping: "RIZKI está escribiendo...",
    chatQr1: "¿Qué licencias necesito para abrir una cafetería?",
    chatQr2: "¿Cuánto cuesta constituir una PT?",
    chatQr3: "Cómo registrar el NIB para pymes",
    chatQr4: "¿En qué se diferencian PIRT y BPOM?",
    // Language
    languageLabel: "Idioma",
    searchLanguages: "Buscar idioma...",
    contentNote:
      "Las guías completas a continuación están en indonesio — pregunte a la IA RIZKI para una explicación en su idioma.",
  },

  fr: {
    // Header
    navServices: "Services",
    navCheckAI: "Vérification par IA",
    navCalculator: "Simulateur",
    navGuides: "Guides",
    navBlog: "Blog",
    navCoverage: "Couverture",
    navPricing: "Tarifs",
    navFaq: "FAQ",
    headerTagline: "Le Consultant N°1 en Licences d'Entreprise en Indonésie",
    ctaFree: "Consultation Gratuite",
    // Hero
    heroBadge: "La confiance de plus de 1 247 entreprises dans 38 provinces et 514 villes d'Indonésie",
    heroTitle1: "Gérez Toutes vos",
    heroHigh1: "Licences d'Entreprise",
    heroTitle2: "— Nous Nous Occupons",
    heroHigh2: "de Tout",
    heroSubtitle:
      "Du NIB, PT, CV, Halal, BPOM jusqu'à l'AMDAL — le tout traité par des experts, 100 % légal, avec garantie de remboursement. À partir de 350 000 roupies, en 1 jour ouvré seulement.",
    heroBullet1: "NIB en 1 jour • PT en 3 jours • Zéro file d'attente en administration",
    heroBullet2: "Canaux gouvernementaux officiels — documents valides et vérifiés",
    heroBullet3: "Garantie de remboursement à 100 % si votre licence n'est pas délivrée",
    heroReviews: "sur plus de 890 avis clients",
    // Hero form
    formTitle: "Consultation Gratuite de 15 Minutes",
    formSubtitle: "Sans frais ni engagement — directement avec un consultant senior.",
    labelFree: "Gratuit",
    labelName: "Nom Complet *",
    labelWa: "Numéro WhatsApp *",
    labelSector: "Secteur d'Activité",
    phSector: "Choisissez un secteur",
    labelNeed: "Votre Besoin",
    phNeed: "Choisissez une formule",
    pkgNotSure: "Pas encore sûr / consulter d'abord",
    pkgPrefix: "Formule {p}",
    labelDesc: "Présentez brièvement votre activité (facultatif)",
    phDesc: "ex. : je veux ouvrir un café à Bandung, j'ai déjà un local mais pas encore de structure juridique...",
    btnSubmit: "Demander ma Consultation Gratuite",
    btnSending: "Envoi en cours...",
    privacyNote: "Vos données sont en sécurité et ne sont jamais partagées avec des tiers",
    successTitle: "Inscription Confirmée ! 🎉",
    successBody:
      "Merci, {name} ! Notre consultant senior vous contactera sur WhatsApp dans les 24 heures (généralement en moins de 15 minutes pendant les heures ouvrées).",
    btnAnother: "Inscrire une Autre Entreprise",
    // Toasts
    toastSuccess: "Consultation Gratuite Enregistrée ! 🎉",
    toastFail: "Échec de l'envoi",
    toastConn: "Problème de connexion",
    // Stats
    statClients: "Clients Accompagnés",
    statPermits: "Licences Traitées",
    statProvinces: "Provinces",
    statCities: "Villes et Kabupaten",
    statSatisfaction: "Satisfaction Client",
    statAvgTime: "Délai Moyen de Traitement",
    statHours: "heures",
    // Section titles
    servicesT1: "Un Guichet Unique pour",
    servicesTHigh: "Tous vos Besoins Juridiques",
    servicesT2: "d'Entreprise",
    checkerT1: "Identifiez les Licences",
    checkerTHigh: "dont vous Avez Besoin",
    checkerT2: "en 30 Secondes",
    calcT1: "Simulateur des Coûts des Licences —",
    calcTHigh: "Calculez d'Abord, Décidez Ensuite",
    calcT2: "",
    hubT1: "Guides des Licences d'Entreprise en Indonésie —",
    hubTHigh: "Complets, Clairs, à Jour",
    hubT2: "",
    blogT1: "La Bibliothèque d'Articles sur les Licences",
    blogTHigh: "— la Plus Complète d'Indonésie",
    blogT2: "",
    courseT1: "Maîtrisez les Licences d'Entreprise en",
    courseTHigh: "7 Jours",
    courseT2: "",
    coverageT1: "{n} Provinces &",
    coverageTHigh: "{n} Villes et Kabupaten",
    coverageT2: "— de Sabang à Merauke",
    whyT1: "Bien Plus qu'un Agent de Licences —",
    whyTHigh: "Votre Partenaire Juridique",
    whyT2: "",
    processT1: "4 Étapes vers une",
    processTHigh: "Entreprise 100 % Légale",
    processT2: "",
    pricingT1: "Des Tarifs Clairs dès le Départ,",
    pricingTHigh: "Sans Frais Cachés",
    pricingT2: "",
    testiT1: "Plus de 1 247 Entreprises",
    testiTHigh: "Légalement en Règle",
    testiT2: "",
    compT1: "Pourquoi Nous Choisir Plutôt que",
    compTHigh: "d'Autres Consultants ?",
    compT2: "",
    faqT1: "Les Questions",
    faqTHigh: "Fréquentes",
    faqT2: "",
    ctaT1: "Votre Activité Tourne déjà ?",
    ctaTHigh: "Mettez-la en Règle dès Maintenant.",
    ctaT2: "",
    sitemapT1: "Annuaire Complet de",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "De la PME à la grande entreprise — plus de 40 types de licences traités de A à Z par les canaux gouvernementaux officiels.",
    checkerSub:
      "Décrivez simplement votre activité. Notre IA, entraînée sur la législation indonésienne (Job Creation Law) et les règles OSS-RBA, établit votre feuille de route complète de licences — gratuitement, sans inscription.",
    calcSub:
      "Sélectionnez les licences dont vous avez besoin et obtenez immédiatement une estimation des coûts et des délais. Transparence dès la première minute — aucun frais caché.",
    hubSub:
      "Tout sur le NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA et la fiscalité des entreprises — des bases jusqu'aux détails techniques. Rédigé d'après le Job Creation Law et la réglementation la plus récente.",
    blogSub:
      "{n} articles approfondis par nos experts en réglementation — coûts de création d'une PT, KBLI de la restauration, PMA, RKAB minier, voyages Omra, jusqu'à s'implanter en Arabie Saoudite. Lecture gratuite, mise à jour permanente.",
    courseSub:
      "Chaque matin : une leçon de 5 minutes + une check-list pratique directement dans votre boîte mail. Écrite par nos experts en réglementation — pas de la théorie, mais ce qui se pratique vraiment sur le terrain.",
    coverageSub:
      "Que votre entreprise soit à Batam, Wamena ou Balikpapan — tout le processus se fait en ligne, les documents sont expédiés par coursier, et notre équipe sur place se déplace pour les audits physiques, l'AMDAL ou le secteur minier.",
    whySub:
      "Des milliers d'entrepreneurs nous ont rejoint après avoir été déçus par d'autres consultants. Voici pourquoi :",
    processSub: "Pas un seul jour à passer dans les administrations. Nous gérons toute la coordination.",
    pricingSub:
      "Chaque formule inclut les frais officiels et nos honoraires. Payez 50 % au départ, 50 % une fois la licence délivrée.",
    testiSub:
      "Note de 4,9/5 sur plus de 890 avis. Les récits de clients dont l'entreprise est aujourd'hui en règle et l'esprit tranquille.",
    compSub:
      "Une comparaison objective avec les pratiques courantes des prestataires de services de licences en Indonésie (Infiniti Office, EasyLegal, Izin.co.id et autres).",
    faqSub: "Encore un doute ? Ces réponses pourront vous aider. Ou posez directement la question à notre Consultant IA.",
    ctaSub:
      "Chaque jour sans autorisation officielle = risque d'amendes, de sanctions et d'opportunités d'appels d'offres et de financement perdues. Consultation gratuite de 15 minutes — nous cartographions tout ce dont vous avez besoin, vous décidez ensuite.",
    sitemapSub:
      "Une navigation en une seule page vers tout notre contenu et nos services — pour vous, et pour les moteurs de recherche.",
    // Final CTA extras
    ctaBadge: "PLACES LIMITÉES PAR JOUR",
    ctaFormTitle: "Réserver une Consultation Gratuite",
    ctaFormSub: "Remplissez en 30 secondes — notre consultant senior vous contacte.",
    ctaSubmit: "Réserver ma Consultation Gratuite",
    ctaSuccessTitle: "Demande Reçue ! 🎉",
    ctaSuccessBody:
      "Notre consultant vous contactera via WhatsApp sous 24 heures maximum. En attendant, essayez notre Vérification de Licences par IA !",
    ctaWaBtn: "Discuter sur WhatsApp Maintenant",
    ctaPrivacy: "100 % gratuit • Sans engagement • Données protégées",
    // Knowledge hub tabs
    tabPerIzin: "Par Licence",
    tabPerSektor: "Par Secteur",
    tabPerWilayah: "Par Région",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Cours par Email Gratuit — 100 % Sans Frais",
    courseFormTitle: "Inscrivez-vous Gratuitement",
    courseFormSub: "8 jours × 5 minutes = une entreprise 100 % légale, à l'abri des amendes.",
    courseSuccessTitle: "Bienvenue au cours !",
    // Footer
    footerTagline:
      "Le consultant en licences d'entreprise de confiance en Indonésie. La légalité de votre entreprise entre les mains d'experts — rapide, transparent, garanti.",
    footerVerified:
      "Enregistré et partenaire de notaires officiels dans 38 provinces et 514 villes/kabupaten",
    footerColServices: "Services",
    footerColCompany: "Entreprise",
    footerColContact: "Contact",
    footerHours: "Lundi-Samedi, 08h00-20h00 WIB",
    footerNote:
      "Au même étage que la Bourse d'Indonésie • Nous servons toute l'Indonésie en ligne",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Tous droits réservés.",
    footerMade: "Fait avec ❤️ pour le progrès des PME indonésiennes",
    // Chat
    chatTitle: "RIZKI — Consultant IA",
    chatStatus: "En ligne • Répond en quelques secondes",
    chatWelcome:
      "Bonjour ! 👋 Je suis **RIZKI**, le Consultant IA de PusatPerizinan.com — de garde 24h/24 pour toutes vos questions sur les licences d'entreprise.\n\nNIB, PT, CV, Halal, BPOM ou une autre licence ? Posez votre question ! 😊",
    chatPlaceholder: "Posez votre question sur les licences...",
    chatTyping: "RIZKI est en train d'écrire...",
    chatQr1: "Quelles licences pour ouvrir un café ?",
    chatQr2: "Combien coûte la création d'une PT ?",
    chatQr3: "Comment obtenir un NIB pour les PME",
    chatQr4: "Quelle différence entre PIRT et BPOM ?",
    // Language
    languageLabel: "Langue",
    searchLanguages: "Rechercher une langue...",
    contentNote:
      "Les guides complets ci-dessous sont en indonésien — demandez à l'IA RIZKI une explication dans votre langue.",
  },

  de: {
    // Header
    navServices: "Leistungen",
    navCheckAI: "KI-Genehmigungscheck",
    navCalculator: "Rechner",
    navGuides: "Ratgeber",
    navBlog: "Blog",
    navCoverage: "Abdeckung",
    navPricing: "Preise",
    navFaq: "FAQ",
    headerTagline: "Die Nr. 1 für Unternehmensgenehmigungen in Indonesien",
    ctaFree: "Kostenlose Beratung",
    // Hero
    heroBadge: "Über 1.247 Unternehmen in 38 Provinzen und 514 Städten Indonesiens vertrauen uns",
    heroTitle1: "Alle",
    heroHigh1: "Genehmigungen",
    heroTitle2: "erledigt — lehnen Sie sich",
    heroHigh2: "zurück",
    heroSubtitle:
      "Vom NIB über PT, CV, Halal und BPOM bis zum AMDAL — bearbeitet von Experten, 100 % legal, mit Geld-zurück-Garantie. Ab 350.000 Rupien, in nur 1 Werktag.",
    heroBullet1: "NIB in 1 Tag • PT in 3 Tagen • Kein Behörden-Marathon",
    heroBullet2: "Offizielle Regierungswege — gültige & verifizierte Dokumente",
    heroBullet3: "100 % Geld-zurück-Garantie, falls die Genehmigung nicht erteilt wird",
    heroReviews: "aus über 890 Kundenbewertungen",
    // Hero form
    formTitle: "Kostenlose Beratung in 15 Minuten",
    formSubtitle: "Ohne Gebühren, ohne Verpflichtung — direkt mit einem Senior-Berater.",
    labelFree: "Kostenlos",
    labelName: "Vollständiger Name *",
    labelWa: "WhatsApp-Nummer *",
    labelSector: "Branche",
    phSector: "Branche auswählen",
    labelNeed: "Ihr Anliegen",
    phNeed: "Paket auswählen",
    pkgNotSure: "Noch unsicher / erst beraten lassen",
    pkgPrefix: "{p}-Paket",
    labelDesc: "Erzählen Sie kurz von Ihrem Unternehmen (optional)",
    phDesc: "z. B.: Ich möchte in Bandung ein Café eröffnen, habe bereits Räumlichkeiten, aber noch kein registriertes Unternehmen...",
    btnSubmit: "Kostenlose Beratung anfragen",
    btnSending: "Wird gesendet...",
    privacyNote: "Ihre Daten sind sicher & werden niemals an Dritte weitergegeben",
    successTitle: "Erfolgreich Registriert! 🎉",
    successBody:
      "Vielen Dank, {name}! Unser Senior-Berater meldet sich innerhalb von 24 Stunden per WhatsApp bei Ihnen (werktags meist in unter 15 Minuten).",
    btnAnother: "Weiteres Unternehmen anmelden",
    // Toasts
    toastSuccess: "Kostenlose Beratung gebucht! 🎉",
    toastFail: "Senden fehlgeschlagen",
    toastConn: "Verbindungsproblem",
    // Stats
    statClients: "Betreute Kunden",
    statPermits: "Bearbeitete Genehmigungen",
    statProvinces: "Provinzen",
    statCities: "Städte & Kabupaten",
    statSatisfaction: "Kundenzufriedenheit",
    statAvgTime: "Ø Bearbeitungszeit",
    statHours: "Std.",
    // Section titles
    servicesT1: "Alles aus einer Hand für",
    servicesTHigh: "alle Rechtsthemen",
    servicesT2: "Ihres Unternehmens",
    checkerT1: "Finden Sie heraus,",
    checkerTHigh: "welche Genehmigungen Sie brauchen",
    checkerT2: "in 30 Sekunden",
    calcT1: "Kostenrechner für Genehmigungen —",
    calcTHigh: "erst rechnen, dann entscheiden",
    calcT2: "",
    hubT1: "Ratgeber zu Unternehmensgenehmigungen in Indonesien —",
    hubTHigh: "umfassend, klar, aktuell",
    hubT2: "",
    blogT1: "Die Artikelbibliothek rund um Genehmigungen —",
    blogTHigh: "die umfangreichste Indonesiens",
    blogT2: "",
    courseT1: "Meistern Sie alle Genehmigungen in",
    courseTHigh: "7 Tagen",
    courseT2: "",
    coverageT1: "{n} Provinzen &",
    coverageTHigh: "{n} Städte & Kabupaten",
    coverageT2: "— von Sabang bis Merauke",
    whyT1: "Mehr als eine Genehmigungsagentur —",
    whyTHigh: "Ihr Partner für Recht & Legalität",
    whyT2: "",
    processT1: "In 4 Schritten zum",
    processTHigh: "100 % legalen Unternehmen",
    processT2: "",
    pricingT1: "Klare Preise von Anfang an —",
    pricingTHigh: "ohne versteckte Kosten",
    pricingT2: "",
    testiT1: "Über 1.247 Unternehmen",
    testiTHigh: "legal aufgestellt",
    testiT2: "",
    compT1: "Warum Sie uns statt",
    compTHigh: "anderen Beratern wählen sollten",
    compT2: "",
    faqT1: "Häufig gestellte",
    faqTHigh: "Fragen",
    faqT2: "",
    ctaT1: "Ihr Unternehmen läuft bereits?",
    ctaTHigh: "Machen Sie es jetzt offiziell.",
    ctaT2: "",
    sitemapT1: "Komplettes Verzeichnis von",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Vom KMU bis zum Konzern — über 40 Genehmigungsarten, komplett abgewickelt über offizielle Regierungswege.",
    checkerSub:
      "Beschreiben Sie einfach Ihr Vorhaben. Unsere KI ist auf dem indonesischen Job Creation Law (UU Cipta Kerja) und den OSS-RBA-Bestimmungen trainiert und erstellt Ihren kompletten Genehmigungsfahrplan — kostenlos, ganz ohne Registrierung.",
    calcSub:
      "Wählen Sie die benötigten Genehmigungen aus und erhalten Sie sofort eine Schätzung von Kosten & Dauer. Transparent ab der ersten Minute — ohne versteckte Kosten.",
    hubSub:
      "Alles über NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA und Unternehmenssteuern — von den Grundlagen bis zu technischen Details. Basierend auf dem Job Creation Law und den aktuellsten Vorschriften.",
    blogSub:
      "{n} tiefgehende Artikel unseres Regulierungs-Teams — Kosten einer PT-Gründung, KBLI für die Gastronomie, PMA, Bergbau-RKAB, Umrah-Reiseveranstalter bis hin zur Geschäftstätigkeit in Saudi-Arabien. Kostenlos lesbar, stets aktuell.",
    courseSub:
      "Jeden Morgen: eine 5-Minuten-Lektion + eine praktische Checkliste direkt in Ihr Postfach. Geschrieben von unseren Regulierungs-Experten — keine Theorie, sondern was in der Praxis wirklich zählt.",
    coverageSub:
      "Ganz gleich, ob Ihr Unternehmen in Batam, Wamena oder Balikpapan sitzt — der gesamte Genehmigungsprozess läuft online, Dokumente versenden wir per Kurier, und unser Vor-Ort-Team kommt für physische Audits, AMDAL oder den Bergbausektor.",
    whySub:
      "Tausende Unternehmer haben zu uns gewechselt, nachdem sie von anderen Beratern enttäuscht waren. Das sind die Gründe:",
    processSub: "Kein einziger Tag auf Behördengängen. Die komplette Koordination übernehmen wir.",
    pricingSub:
      "Alle Pakete enthalten offizielle Gebühren & Servicekosten. Zahlen Sie 50 % im Voraus, 50 % nach Erteilung der Genehmigung.",
    testiSub:
      "4,9/5 Bewertung aus über 890 Rezensionen. Geschichten von Kunden, deren Unternehmen heute legal ist und die komplett entspannt sind.",
    compSub:
      "Ein objektiver Vergleich mit gängigen Praktiken von Genehmigungsdienstleistern in Indonesien (Infiniti Office, EasyLegal, Izin.co.id und weiteren).",
    faqSub: "Noch unsicher? Diese Antworten könnten helfen. Oder fragen Sie direkt unseren KI-Berater.",
    ctaSub:
      "Jeder Tag ohne offizielle Genehmigung = Risiko von Bußgeldern, Sanktionen und verlorenen Ausschreibungen & Finanzierungen. Kostenlose 15-Minuten-Beratung — wir kartieren alles, was Sie brauchen; entscheiden können Sie danach.",
    sitemapSub:
      "Navigation auf einer Seite zu allen Inhalten & Leistungen — für Sie und für Suchmaschinen.",
    // Final CTA extras
    ctaBadge: "BEGRENZTE PLÄTZE PRO TAG",
    ctaFormTitle: "Kostenlose Beratung buchen",
    ctaFormSub: "In 30 Sekunden ausgefüllt — unser Senior-Berater meldet sich bei Ihnen.",
    ctaSubmit: "Jetzt kostenlose Beratung buchen",
    ctaSuccessTitle: "Anfrage Eingegangen! 🎉",
    ctaSuccessBody:
      "Unser Berater meldet sich innerhalb von 24 Stunden per WhatsApp. Probieren Sie währenddessen unseren KI-Genehmigungscheck!",
    ctaWaBtn: "Jetzt per WhatsApp chatten",
    ctaPrivacy: "100 % kostenlos • Unverbindlich • Daten sicher",
    // Knowledge hub tabs
    tabPerIzin: "Pro Genehmigung",
    tabPerSektor: "Pro Branche",
    tabPerWilayah: "Pro Region",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Kostenloser E-Mail-Kurs — 100 % gebührenfrei",
    courseFormTitle: "Jetzt kostenlos anmelden",
    courseFormSub: "8 Tage × 5 Minuten = ein 100 % legales Unternehmen ohne Bußgeldsorgen.",
    courseSuccessTitle: "Willkommen im Kurs!",
    // Footer
    footerTagline:
      "Der vertrauenswürdige Berater für Unternehmensgenehmigungen in Indonesien. Die Legalität Ihres Unternehmens in Expertenhand — schnell, transparent, garantiert.",
    footerVerified:
      "Registriert & offizielle Partnerschaft mit Notaren in 38 Provinzen & 514 Kabupaten/Städten",
    footerColServices: "Leistungen",
    footerColCompany: "Unternehmen",
    footerColContact: "Kontakt",
    footerHours: "Mo-So, 08.00-20.00 Uhr WIB",
    footerNote:
      "Im selben Stockwerk wie die Börse Indonesiens • Wir betreuen ganz Indonesien online",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Alle Rechte vorbehalten.",
    footerMade: "Mit ❤️ für den Fortschritt der indonesischen KMU",
    // Chat
    chatTitle: "RIZKI — KI-Berater",
    chatStatus: "Online • Antwortet in Sekunden",
    chatWelcome:
      "Hallo! 👋 Ich bin **RIZKI**, der KI-Berater von PusatPerizinan.com — rund um die Uhr für alle Ihre Fragen zu Unternehmensgenehmigungen da.\n\nNIB, PT, CV, Halal, BPOM oder eine andere Genehmigung? Fragen Sie einfach los! 😊",
    chatPlaceholder: "Fragen Sie zu Unternehmensgenehmigungen...",
    chatTyping: "RIZKI schreibt...",
    chatQr1: "Welche Genehmigungen brauche ich für ein Café?",
    chatQr2: "Was kostet die Gründung einer PT?",
    chatQr3: "Wie registriere ich NIB für KMU",
    chatQr4: "Was ist der Unterschied zwischen PIRT und BPOM?",
    // Language
    languageLabel: "Sprache",
    searchLanguages: "Sprache suchen...",
    contentNote:
      "Die vollständigen Ratgeber unten sind auf Indonesisch — fragen Sie die KI RIZKI für eine Erklärung in Ihrer Sprache.",
  },

  it: {
    // Header
    navServices: "Servizi",
    navCheckAI: "Verifica IA",
    navCalculator: "Calcolatore",
    navGuides: "Guide",
    navBlog: "Blog",
    navCoverage: "Copertura",
    navPricing: "Prezzi",
    navFaq: "FAQ",
    headerTagline: "La Consulenza per Licenze Aziendali N. 1 in Indonesia",
    ctaFree: "Consulenza Gratuita",
    // Hero
    heroBadge: "Oltre 1.247 aziende in 38 province e 514 città indonesiane si affidano a noi",
    heroTitle1: "Ogni",
    heroHigh1: "Licenza Aziendale",
    heroTitle2: "in Regola —",
    heroHigh2: "Zero Pensieri",
    heroSubtitle:
      "Da NIB, PT, CV, Halal, BPOM fino ad AMDAL — pratiche seguite da esperti, 100% legali, con garanzia di rimborso. A partire da 350 mila rupie, in soli 1 giorno lavorativo.",
    heroBullet1: "NIB in 1 giorno • PT in 3 giorni • Zero code negli uffici pubblici",
    heroBullet2: "Canali governativi ufficiali — documenti validi e verificati",
    heroBullet3: "Garanzia di rimborso al 100% se la licenza non viene rilasciata",
    heroReviews: "su oltre 890 recensioni dei clienti",
    // Hero form
    formTitle: "Consulenza Gratuita di 15 Minuti",
    formSubtitle: "Nessun costo, nessun impegno — direttamente con un consulente senior.",
    labelFree: "Gratis",
    labelName: "Nome Completo *",
    labelWa: "Numero WhatsApp *",
    labelSector: "Tipo di Attività",
    phSector: "Selezioni un settore",
    labelNeed: "La Sua Esigenza",
    phNeed: "Selezioni un pacchetto",
    pkgNotSure: "Non so ancora / prima una consulenza",
    pkgPrefix: "Pacchetto {p}",
    labelDesc: "Descriva brevemente la Sua attività (facoltativo)",
    phDesc: "es.: voglio aprire un caffè a Bandung, ho già il locale ma non ho ancora una società...",
    btnSubmit: "Prenoti la Consulenza Gratuita",
    btnSending: "Invio in corso...",
    privacyNote: "I Suoi dati sono al sicuro e non vengono mai condivisi con terze parti",
    successTitle: "Richiesta Registrata! 🎉",
    successBody:
      "Grazie, {name}! Il nostro consulente senior La contatterà su WhatsApp entro 24 ore (di solito in meno di 15 minuti negli orari lavorativi).",
    btnAnother: "Registra un'Altra Attività",
    // Toasts
    toastSuccess: "Consulenza Gratuita Registrata! 🎉",
    toastFail: "Invio non riuscito",
    toastConn: "Problema di connessione",
    // Stats
    statClients: "Clienti Serviti",
    statPermits: "Licenze Elaborate",
    statProvinces: "Province",
    statCities: "Città e Kabupaten",
    statSatisfaction: "Soddisfazione dei Clienti",
    statAvgTime: "Tempo Medio di Elaborazione",
    statHours: "ore",
    // Section titles
    servicesT1: "Un Punto Unico per",
    servicesTHigh: "Ogni Esigenza Legale",
    servicesT2: "della Sua Azienda",
    checkerT1: "Le Licenze Giuste",
    checkerTHigh: "per la Sua Azienda",
    checkerT2: "in 30 Secondi",
    calcT1: "Calcolatore dei Costi delle Licenze —",
    calcTHigh: "Prima Calcola, Poi Decidi",
    calcT2: "",
    hubT1: "Guide alle Licenze Aziendali in Indonesia —",
    hubTHigh: "Complete, Chiare, Aggiornate",
    hubT2: "",
    blogT1: "La Biblioteca di Articoli sulle Licenze",
    blogTHigh: "— la Più Completa d'Indonesia",
    blogT2: "",
    courseT1: "Da Zero a Esperto di Licenze in",
    courseTHigh: "7 Giorni",
    courseT2: "",
    coverageT1: "{n} Province e",
    coverageTHigh: "{n} Città e Kabupaten",
    coverageT2: "— da Sabang a Merauke",
    whyT1: "Molto Più che un'Agenzia di Pratiche —",
    whyTHigh: "Il Suo Partner Legale",
    whyT2: "",
    processT1: "4 Passi verso un'",
    processTHigh: "Azienda 100% Legale",
    processT2: "",
    pricingT1: "Prezzi Chiari dall'Inizio,",
    pricingTHigh: "Nessun Costo Nascosto",
    pricingT2: "",
    testiT1: "Oltre 1.247 Aziende",
    testiTHigh: "in Regola con la Legge",
    testiT2: "",
    compT1: "Perché Scegliere Noi invece di",
    compTHigh: "Altri Consulenti?",
    compT2: "",
    faqT1: "Le Domande",
    faqTHigh: "Più Frequenti",
    faqT2: "",
    ctaT1: "La Sua Azienda è Già Attiva?",
    ctaTHigh: "Mettla in Regola Subito.",
    ctaT2: "",
    sitemapT1: "Indice Completo di",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Dalle PMI alle grandi aziende — oltre 40 tipi di licenze gestiti dall'inizio alla fine tramite canali governativi ufficiali.",
    checkerSub:
      "Basta descrivere la Sua attività. La nostra IA, addestrata sulla legge indonesiana sulla creazione di occupazione (UU Cipta Kerja) e sulle normative OSS-RBA, elaborerà la roadmap completa delle licenze — gratis, senza registrazione.",
    calcSub:
      "Selezioni le licenze di cui ha bisogno e ottenga subito una stima di costi e tempi. Trasparenza dal primo minuto — nessun costo nascosto.",
    hubSub:
      "Tutto su NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA e fisco d'impresa — dalle basi ai dettagli tecnici. Basato sulla Job Creation Law e sulle normative più recenti.",
    blogSub:
      "{n} articoli approfonditi del nostro team di esperti normativi — costi per costituire una PT, KBLI della ristorazione, PMA, RKAB minerario, viaggi Umrah, fino ad aprire attività in Arabia Saudita. Lettura gratuita, sempre aggiornati.",
    courseSub:
      "Ogni mattina: una lezione di 5 minuti + una checklist pratica direttamente nella Sua casella email. Scritta dai nostri esperti di normative — non teoria, ma ciò che funziona davvero sul campo.",
    coverageSub:
      "Che la Sua attività si trovi a Batam, Wamena o Balikpapan — l'intero processo di licenze si svolge online, i documenti viaggiano tramite corriere, e il nostro team sul posto interviene per audit fisici, AMDAL o il settore minerario.",
    whySub:
      "Migliaia di imprenditori sono passati a noi dopo essere rimasti delusi da altri consulenti. Ecco perché:",
    processSub: "Nemmeno un giorno in fila agli uffici pubblici. Tutta la coordinazione la facciamo noi.",
    pricingSub:
      "Ogni pacchetto include canoni ufficiali e onorari del servizio. Paga il 50% in anticipo e il 50% al rilascio della licenza.",
    testiSub:
      "Valutazione 4,9/5 su oltre 890 recensioni. Le storie di clienti le cui attività oggi sono legali e vivono serene.",
    compSub:
      "Un confronto obiettivo con le pratiche comuni dei fornitori di servizi per licenze in Indonesia (Infiniti Office, EasyLegal, Izin.co.id e altri).",
    faqSub: "Ha ancora dubbi? Queste risposte possono aiutarLa. Oppure chieda direttamente al nostro Consulente IA.",
    ctaSub:
      "Ogni giorno senza licenze ufficiali = rischio di multe, sanzioni e opportunità di gare e finanziamenti perse. Consulenza gratuita di 15 minuti — Le tracciamo una mappa completa del necessario, poi deciderà Lei.",
    sitemapSub:
      "Navigazione in una sola pagina verso tutti i nostri contenuti e servizi — per Lei e per i motori di ricerca.",
    // Final CTA extras
    ctaBadge: "POSTI LIMITATI AL GIORNO",
    ctaFormTitle: "Prenoti una Consulenza Gratuita",
    ctaFormSub: "Compili in 30 secondi — il nostro consulente senior La contatta.",
    ctaSubmit: "Prenoti una Consulenza Gratuita",
    ctaSuccessTitle: "Richiesta Ricevuta! 🎉",
    ctaSuccessBody:
      "Il nostro consulente La contatterà su WhatsApp entro 24 ore. Nel frattempo, provi la funzione Verifica Licenze con IA!",
    ctaWaBtn: "Chatta su WhatsApp Ora",
    ctaPrivacy: "100% gratuito • Nessun impegno • Dati al sicuro",
    // Knowledge hub tabs
    tabPerIzin: "Per Licenza",
    tabPerSektor: "Per Settore",
    tabPerWilayah: "Per Regione",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Corso Email Gratuito — 100% Senza Costi",
    courseFormTitle: "IscrivaSi Ora Gratuitamente",
    courseFormSub: "8 giorni × 5 minuti = un'attività 100% legale e senza pensieri di multe.",
    courseSuccessTitle: "Benvenuti al corso!",
    // Footer
    footerTagline:
      "Il consulente di fiducia per le licenze aziendali in Indonesia. La legalità della Sua attività gestita da esperti — veloce, trasparente, garantita.",
    footerVerified:
      "Registrati e in collaborazione con notai ufficiali in 38 province e 514 città/kabupaten",
    footerColServices: "Servizi",
    footerColCompany: "Azienda",
    footerColContact: "Contatti",
    footerHours: "Lunedì-Sabato, 08.00-20.00 WIB",
    footerNote:
      "Allo stesso piano della Borsa Valori Indonesiana • Serviamo tutta l'Indonesia online",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Tutti i diritti riservati.",
    footerMade: "Fatto con ❤️ per il progresso delle PMI indonesiane",
    // Chat
    chatTitle: "RIZKI — Consulente IA",
    chatStatus: "Online • Risponde in pochi secondi",
    chatWelcome:
      "Salve! 👋 Sono **RIZKI**, il Consulente IA di PusatPerizinan.com — a disposizione 24 ore su 24 per ogni domanda sulle licenze aziendali.\n\nNIB, PT, CV, Halal, BPOM o altre pratiche? Chieda pure! 😊",
    chatPlaceholder: "Chieda informazioni sulle licenze...",
    chatTyping: "RIZKI sta scrivendo...",
    chatQr1: "Quali licenze servono per aprire un caffè?",
    chatQr2: "Quanto costa costituire una PT?",
    chatQr3: "Come richiedere NIB per le PMI",
    chatQr4: "Differenza tra PIRT e BPOM?",
    // Language
    languageLabel: "Lingua",
    searchLanguages: "Cerca lingua...",
    contentNote:
      "Le guide complete qui sotto sono in indonesiano — chieda all'IA RIZKI una spiegazione nella Sua lingua.",
  },

  nl: {
    // Header
    navServices: "Diensten",
    navCheckAI: "AI-Vergunningscheck",
    navCalculator: "Calculator",
    navGuides: "Gidsen",
    navBlog: "Blog",
    navCoverage: "Bereik",
    navPricing: "Prijzen",
    navFaq: "FAQ",
    headerTagline: "De Nr. 1 Adviseur voor Bedrijfsvergunningen in Indonesië",
    ctaFree: "Gratis Consult",
    // Hero
    heroBadge: "Vertrouwd door 1.247+ bedrijven in 38 provincies en 514 steden in Indonesië",
    heroTitle1: "Regel Alle",
    heroHigh1: "Bedrijfsvergunningen",
    heroTitle2: "— Leun Achterover",
    heroHigh2: "en Ontspan",
    heroSubtitle:
      "Van NIB, PT, CV, Halal en BPOM tot AMDAL — verzorgd door experts, 100% legaal, met geld-terug-garantie. Al vanaf 350.000 roepia, mogelijk binnen 1 werkdag.",
    heroBullet1: "NIB in 1 dag • PT in 3 dagen • Geen wachtrijen bij instanties",
    heroBullet2: "Officiële overheidskanalen — geldige & geverifieerde documenten",
    heroBullet3: "100% geld-terug-garantie als de vergunning niet wordt afgegeven",
    heroReviews: "uit 890+ klantbeoordelingen",
    // Hero form
    formTitle: "Gratis Consult van 15 Minuten",
    formSubtitle: "Zonder kosten, zonder verplichtingen — direct met een senior consultant.",
    labelFree: "Gratis",
    labelName: "Volledige Naam *",
    labelWa: "WhatsApp-nummer *",
    labelSector: "Type Bedrijf",
    phSector: "Kies een sector",
    labelNeed: "Uw Behoefte",
    phNeed: "Kies een pakket",
    pkgNotSure: "Nog niet zeker / eerst overleggen",
    pkgPrefix: "Pakket {p}",
    labelDesc: "Vertel kort over uw bedrijf (optioneel)",
    phDesc: "bijv.: ik wil een koffiezaak openen in Bandung, ik heb al een pand maar nog geen rechtspersoon...",
    btnSubmit: "Aanmelden voor Gratis Consult",
    btnSending: "Versturen...",
    privacyNote: "Uw gegevens zijn veilig & worden nooit gedeeld met derden",
    successTitle: "U Bent Aangemeld! 🎉",
    successBody:
      "Bedankt, {name}! Onze senior consultant neemt binnen 24 uur contact met u op via WhatsApp (meestal binnen 15 minuten tijdens werkdagen).",
    btnAnother: "Ander Bedrijf Aanmelden",
    // Toasts
    toastSuccess: "Gratis Consult Aangemeld! 🎉",
    toastFail: "Verzenden mislukt",
    toastConn: "Verbindingsprobleem",
    // Stats
    statClients: "Klanten Geholpen",
    statPermits: "Vergunningen Geregeld",
    statProvinces: "Provincies",
    statCities: "Kabupaten & Steden",
    statSatisfaction: "Klanttevredenheid",
    statAvgTime: "Gemiddelde Doorlooptijd",
    statHours: "uur",
    // Section titles
    servicesT1: "Eén Loket voor",
    servicesTHigh: "alle Juridische Behoeften",
    servicesT2: "van uw Bedrijf",
    checkerT1: "Ontdek Welke Vergunningen",
    checkerTHigh: "u Nodig Heeft",
    checkerT2: "in 30 Seconden",
    calcT1: "Kostencalculator Vergunningen —",
    calcTHigh: "Eerst Rekenen, Dan Beslissen",
    calcT2: "",
    hubT1: "Gidsen voor Bedrijfsvergunningen in Indonesië —",
    hubTHigh: "Volledig, Duidelijk, Actueel",
    hubT2: "",
    blogT1: "Bibliotheek met Artikelen over Vergunningen",
    blogTHigh: "— de Meest Complete van Indonesië",
    blogT2: "",
    courseT1: "Bedrijfsvergunningen onder de Knie in",
    courseTHigh: "7 Dagen",
    courseT2: "",
    coverageT1: "{n} Provincies &",
    coverageTHigh: "{n} Kabupaten & Steden",
    coverageT2: "— van Sabang tot Merauke",
    whyT1: "Meer dan een Vergunningsbureau —",
    whyTHigh: "Uw Juridische Partner",
    whyT2: "",
    processT1: "In 4 Stappen naar een",
    processTHigh: "100% Legaal Bedrijf",
    processT2: "",
    pricingT1: "Duidelijke Prijzen Vooraf,",
    pricingTHigh: "Geen Verborgen Kosten",
    pricingT2: "",
    testiT1: "1.247+ Bedrijven Al",
    testiTHigh: "Volledig Legaal",
    testiT2: "",
    compT1: "Waarom Voor Ons Kiezen in Plaats van",
    compTHigh: "Andere Adviseurs?",
    compT2: "",
    faqT1: "Veelgestelde",
    faqTHigh: "Vragen",
    faqT2: "",
    ctaT1: "Uw Bedrijf Draait Al?",
    ctaTHigh: "Regel de Legaliteit Nu.",
    ctaT2: "",
    sitemapT1: "Volledige Index van",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Van mkb-bedrijven tot grote concerns — 40+ vergunningsoorten volledig geregeld via officiële overheidskanalen.",
    checkerSub:
      "Beschrijf gewoon uw bedrijf. Onze AI, getraind op de Indonesische Job Creation Law (UU Cipta Kerja) en de OSS-RBA-regelgeving, stelt uw complete vergunningsroadmap op — gratis, zonder registratie.",
    calcSub:
      "Kies de vergunningen die u nodig heeft en ontvang direct een schatting van kosten & doorlooptijd. Transparant vanaf de eerste minuut — geen verborgen kosten.",
    hubSub:
      "Alles over NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA en belastingen voor bedrijven — van de basis tot technische details. Gebaseerd op de Job Creation Law en de nieuwste regelgeving.",
    blogSub:
      "{n} diepgaande artikelen van ons regelgevingsteam — kosten van een PT-oprichting, KBLI voor de horeca, PMA, mijnbouw-RKAB, omrah-reizen tot zakendoen in Saoedi-Arabië. Gratis te lezen, altijd actueel.",
    courseSub:
      "Elke ochtend: één les van 5 minuten + een praktische checklist direct in uw inbox. Geschreven door onze regelgevingsexperts — geen theorie, maar wat in de praktijk echt werkt.",
    coverageSub:
      "Of uw bedrijf nu in Batam, Wamena of Balikpapan zit — het hele vergunningsproces verloopt online, documenten versturen wij per koerier, en ons team ter plekke komt voor fysieke audits, AMDAL of de mijnbouwsector.",
    whySub:
      "Duizenden ondernemers stapten naar ons over nadat ze teleurgesteld waren in andere consultants. Dit zijn de redenen:",
    processSub: "Geen enkele dag naar overheidskantoren. Wij regelen de hele coördinatie.",
    pricingSub:
      "Elk pakket inclusief officiële leges & servicekosten. U betaalt 50% vooraf en 50% nadat de vergunning is afgegeven.",
    testiSub:
      "4,9/5 score uit 890+ beoordelingen. Verhalen van klanten wier bedrijf nu officieel legaal is en die zorgeloos ondernemen.",
    compSub:
      "Een objectieve vergelijking met gangbare praktijken bij vergunningsdienstverleners in Indonesië (Infiniti Office, EasyLegal, Izin.co.id en anderen).",
    faqSub: "Twijfelt u nog? Deze antwoorden helpen misschien. Of vraag direct aan onze AI-Consultant.",
    ctaSub:
      "Elke dag zonder officiële vergunning = risico op boetes, sancties en verloren aanbestedingen & financiering. Gratis consult van 15 minuten — wij brengen alles in kaart, daarna beslist u zelf.",
    sitemapSub:
      "Navigatie in één pagina naar al onze content & diensten — voor u, en voor zoekmachines.",
    // Final CTA extras
    ctaBadge: "BEPERKTE PLEKKEN PER DAG",
    ctaFormTitle: "Plan een Gratis Consult",
    ctaFormSub: "In 30 seconden ingevuld — onze senior consultant neemt contact op.",
    ctaSubmit: "Gratis Consult Inplannen",
    ctaSuccessTitle: "Aanvraag Ontvangen! 🎉",
    ctaSuccessBody:
      "Onze consultant neemt binnen maximaal 24 uur contact met u op via WhatsApp. Probeer ondertussen de AI-Vergunningscheck!",
    ctaWaBtn: "Nu WhatsAppen",
    ctaPrivacy: "100% gratis • Geen verplichtingen • Gegevens veilig",
    // Knowledge hub tabs
    tabPerIzin: "Per Vergunning",
    tabPerSektor: "Per Sector",
    tabPerWilayah: "Per Regio",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Gratis E-mailcursus — 100% Zonder Kosten",
    courseFormTitle: "Meld u Gratis aan",
    courseFormSub: "8 dagen × 5 minuten = een 100% legaal bedrijf zonder boeterisico.",
    courseSuccessTitle: "Welkom in de klas!",
    // Footer
    footerTagline:
      "De vertrouwde consultant voor bedrijfsvergunningen in Indonesië. De legaliteit van uw bedrijf in expertshanden — snel, transparant, gegarandeerd.",
    footerVerified:
      "Geregistreerd & samenwerkend met officiële notarissen in 38 provincies & 514 kabupaten/steden",
    footerColServices: "Diensten",
    footerColCompany: "Bedrijf",
    footerColContact: "Contact",
    footerHours: "Ma-Za, 08.00-20.00 WIB",
    footerNote:
      "Op dezelfde verdieping als de Indonesische beurs • We bedienen heel Indonesië online",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Alle rechten voorbehouden.",
    footerMade: "Gemaakt met ❤️ voor de vooruitgang van Indonesische mkb-bedrijven",
    // Chat
    chatTitle: "RIZKI — AI-Consultant",
    chatStatus: "Online • Antwoord binnen enkele seconden",
    chatWelcome:
      "Hallo! 👋 Ik ben **RIZKI**, de AI-Consultant van PusatPerizinan.com — 24 uur per dag beschikbaar voor al uw vragen over bedrijfsvergunningen.\n\nNIB, PT, CV, Halal, BPOM of een andere vergunning? Stel uw vraag gerust! 😊",
    chatPlaceholder: "Vraag iets over bedrijfsvergunningen...",
    chatTyping: "RIZKI typt...",
    chatQr1: "Welke vergunningen heb ik nodig voor een koffiezaak?",
    chatQr2: "Wat kost de oprichting van een PT?",
    chatQr3: "NIB aanvragen voor het mkb",
    chatQr4: "Wat is het verschil tussen PIRT en BPOM?",
    // Language
    languageLabel: "Taal",
    searchLanguages: "Zoek een taal...",
    contentNote:
      "De volledige gidsen hieronder zijn in het Indonesisch — vraag AI RIZKI om uitleg in uw taal.",
  },

  pt: {
    // Header
    navServices: "Serviços",
    navCheckAI: "Consulta de Licenças com IA",
    navCalculator: "Calculadora",
    navGuides: "Guias",
    navBlog: "Blog",
    navCoverage: "Cobertura",
    navPricing: "Preços",
    navFaq: "FAQ",
    headerTagline: "A Consultoria Nº 1 em Licenciamento Empresarial da Indonésia",
    ctaFree: "Consultoria Gratuita",
    // Hero
    heroBadge: "Confiado por mais de 1.247 empresas em 38 províncias e 514 cidades da Indonésia",
    heroTitle1: "Resolva Todas as",
    heroHigh1: "Licenças do seu Negócio",
    heroTitle2: "— é Só",
    heroHigh2: "Receber",
    heroSubtitle:
      "Do NIB, PT, CV, Halal e BPOM ao AMDAL — processado por especialistas, 100% legal, com garantia de devolução do dinheiro. A partir de 350 mil rupias indonésias, em apenas 1 dia útil.",
    heroBullet1: "NIB em 1 dia • PT em 3 dias • Sem filas em órgãos públicos",
    heroBullet2: "Canais governamentais oficiais — documentos válidos e verificados",
    heroBullet3: "Garantia de reembolso de 100% se a licença não for emitida",
    heroReviews: "de mais de 890 avaliações de clientes",
    // Hero form
    formTitle: "Consultoria Gratuita de 15 Minutos",
    formSubtitle: "Sem custo, sem compromisso — direto com um consultor sênior.",
    labelFree: "Grátis",
    labelName: "Nome Completo *",
    labelWa: "Número de WhatsApp *",
    labelSector: "Tipo de Negócio",
    phSector: "Escolha um setor",
    labelNeed: "Sua Necessidade",
    phNeed: "Escolha um pacote",
    pkgNotSure: "Ainda não sei / consultar primeiro",
    pkgPrefix: "Pacote {p}",
    labelDesc: "Conte rapidamente sobre seu negócio (opcional)",
    phDesc: "ex.: quero abrir um café em Bandung, já tenho o ponto mas ainda não tenho empresa constituída...",
    btnSubmit: "Solicitar Consultoria Gratuita",
    btnSending: "Enviando...",
    privacyNote: "Seus dados estão seguros e nunca são compartilhados com terceiros",
    successTitle: "Cadastro Confirmado! 🎉",
    successBody:
      "Obrigado, {name}! Nosso consultor sênior entrará em contato pelo seu WhatsApp em até 24 horas (geralmente em menos de 15 minutos no horário comercial).",
    btnAnother: "Cadastrar Outro Negócio",
    // Toasts
    toastSuccess: "Consultoria Gratuita Agendada! 🎉",
    toastFail: "Falha no envio",
    toastConn: "Problema de conexão",
    // Stats
    statClients: "Clientes Atendidos",
    statPermits: "Licenças Processadas",
    statProvinces: "Províncias",
    statCities: "Cidades e Regências",
    statSatisfaction: "Satisfação dos Clientes",
    statAvgTime: "Tempo Médio de Processamento",
    statHours: "horas",
    // Section titles
    servicesT1: "Um Só Lugar para",
    servicesTHigh: "todas as Necessidades Legais",
    servicesT2: "do seu Negócio",
    checkerT1: "Descubra as Licenças",
    checkerTHigh: "de que você Precisa",
    checkerT2: "em 30 Segundos",
    calcT1: "Calculadora de Custos de Licenças —",
    calcTHigh: "Calcule Primeiro, Decida Depois",
    calcT2: "",
    hubT1: "Guias de Licenciamento Empresarial na Indonésia —",
    hubTHigh: "Completos, Claros, Atualizados",
    hubT2: "",
    blogT1: "Biblioteca de Artigos sobre Licenças",
    blogTHigh: "— a Mais Completa da Indonésia",
    blogT2: "",
    courseT1: "Domine o Licenciamento Empresarial em",
    courseTHigh: "7 Dias",
    courseT2: "",
    coverageT1: "{n} Províncias e",
    coverageTHigh: "{n} Cidades e Regências",
    coverageT2: "— de Sabang a Merauke",
    whyT1: "Muito Além de um Despachante —",
    whyTHigh: "Seu Parceiro Jurídico",
    whyT2: "",
    processT1: "4 Passos para um",
    processTHigh: "Negócio 100% Legal",
    processT2: "",
    pricingT1: "Preços Claros desde o Início,",
    pricingTHigh: "Sem Taxas Escondidas",
    pricingT2: "",
    testiT1: "Mais de 1.247 Negócios",
    testiTHigh: "Comprovadamente Legais",
    testiT2: "",
    compT1: "Por que Nos Escolher em Vez de",
    compTHigh: "Outras Consultorias?",
    compT2: "",
    faqT1: "Perguntas",
    faqTHigh: "Frequentes",
    faqT2: "",
    ctaT1: "Seu Negócio Já Está Rodando?",
    ctaTHigh: "Regularize Agora.",
    ctaT2: "",
    sitemapT1: "Diretório Completo do",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "De PMEs a grandes corporações — mais de 40 tipos de licenças resolvidos de ponta a ponta por canais governamentais oficiais.",
    checkerSub:
      "Basta descrever seu negócio. Nossa IA, treinada na Lei de Criação de Empregos e nas regras do OSS-RBA, monta seu roteiro completo de licenciamento — grátis, sem cadastro.",
    calcSub:
      "Escolha as licenças de que precisa e receba na hora uma estimativa de custos e prazos. Transparência desde o primeiro minuto — sem taxas escondidas.",
    hubSub:
      "Tudo sobre NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA e impostos empresariais — do básico aos detalhes técnicos. Baseado na Lei de Criação de Empregos e na regulamentação mais recente.",
    blogSub:
      "{n} artigos em profundidade da nossa equipe de especialistas em regulação — custos para abrir uma PT, KBLI do setor gastronômico, PMA, RKAB de mineração, viagens Umrah e como empreender na Arábia Saudita. Leitura gratuita, sempre atualizados.",
    courseSub:
      "Toda manhã: uma aula de 5 minutos + um checklist prático direto no seu e-mail. Escrita pela nossa equipe de especialistas — não é teoria, é o que realmente funciona na prática.",
    coverageSub:
      "Não importa se o seu negócio está em Batam, Wamena ou Balikpapan — todo o processo de licenciamento é feito online, os documentos viajam por courier e nossa equipe presencial vai até o local para auditorias físicas, AMDAL ou o setor de mineração.",
    whySub:
      "Milhares de empreendedores migraram para nós depois de se decepcionarem com outras consultorias. Veja o porquê:",
    processSub: "Nem um único dia de fila em órgãos públicos. Toda a coordenação é por nossa conta.",
    pricingSub:
      "Todos os pacotes já incluem taxas oficiais e honorários. Pague 50% no início e 50% depois que a licença for emitida.",
    testiSub:
      "Nota 4,9/5 em mais de 890 avaliações. Histórias de clientes que hoje têm o negócio regularizado — e a mente tranquila.",
    compSub:
      "Uma comparação objetiva com as práticas comuns dos prestadores de serviço de licenciamento na Indonésia (Infiniti Office, EasyLegal, Izin.co.id e outros).",
    faqSub: "Ainda em dúvida? Estas respostas podem ajudar. Ou pergunte direto ao nosso Consultor de IA.",
    ctaSub:
      "Cada dia sem licenças oficiais = risco de multas, sanções e oportunidades de licitações e financiamento perdidas. Consultoria gratuita de 15 minutos — mapeamos tudo o que você precisa e depois você decide.",
    sitemapSub:
      "Navegação em uma única página para todo o nosso conteúdo e serviços — para você e para os mecanismos de busca.",
    // Final CTA extras
    ctaBadge: "VAGAS LIMITADAS POR DIA",
    ctaFormTitle: "Agende uma Consultoria Gratuita",
    ctaFormSub: "Preencha em 30 segundos — nosso consultor sênior entra em contato.",
    ctaSubmit: "Agendar Consultoria Gratuita",
    ctaSuccessTitle: "Pedido Recebido! 🎉",
    ctaSuccessBody:
      "Nosso consultor entrará em contato pelo WhatsApp em até 24 horas. Enquanto espera, experimente a Consulta de Licenças com IA!",
    ctaWaBtn: "Conversar no WhatsApp Agora",
    ctaPrivacy: "100% grátis • Sem compromisso • Dados protegidos",
    // Knowledge hub tabs
    tabPerIzin: "Por Licença",
    tabPerSektor: "Por Setor",
    tabPerWilayah: "Por Região",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Curso por E-mail Gratuito — 100% Sem Custo",
    courseFormTitle: "Cadastre-se Grátis Agora",
    courseFormSub: "8 dias × 5 minutos = um negócio 100% legal e livre de multas.",
    courseSuccessTitle: "Bem-vindo à turma!",
    // Footer
    footerTagline:
      "A consultoria de licenciamento empresarial de confiança na Indonésia. A legalidade do seu negócio nas mãos de especialistas — rápido, transparente, com garantia.",
    footerVerified:
      "Registrados e em parceria com notários oficiais em 38 províncias e 514 cidades/regências",
    footerColServices: "Serviços",
    footerColCompany: "Empresa",
    footerColContact: "Contato",
    footerHours: "Segunda a Sábado, 08h00-20h00 WIB",
    footerNote:
      "No mesmo andar da Bolsa de Valores da Indonésia • Atendemos toda a Indonésia online",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Todos os direitos reservados.",
    footerMade: "Feito com ❤️ para o crescimento das PMEs da Indonésia",
    // Chat
    chatTitle: "RIZKI — Consultor de IA",
    chatStatus: "Online • Responde em segundos",
    chatWelcome:
      "Olá! 👋 Eu sou o **RIZKI**, Consultor de IA do PusatPerizinan.com — de plantão 24 horas para todas as suas dúvidas sobre licenças empresariais.\n\nNIB, PT, CV, Halal, BPOM ou outra licença? Pode perguntar! 😊",
    chatPlaceholder: "Pergunte sobre licenças empresariais...",
    chatTyping: "RIZKI está digitando...",
    chatQr1: "Quais licenças preciso para abrir um café?",
    chatQr2: "Quanto custa abrir uma PT?",
    chatQr3: "Como tirar o NIB para PMEs",
    chatQr4: "Qual a diferença entre PIRT e BPOM?",
    // Language
    languageLabel: "Idioma",
    searchLanguages: "Buscar idioma...",
    contentNote:
      "Os guias completos abaixo estão em indonésio — pergunte à IA RIZKI para receber uma explicação no seu idioma.",
  },

  el: {
    // Header
    navServices: "Υπηρεσίες",
    navCheckAI: "Έλεγχος με AI",
    navCalculator: "Υπολογιστής",
    navGuides: "Οδηγοί",
    navBlog: "Blog",
    navCoverage: "Κάλυψη",
    navPricing: "Τιμές",
    navFaq: "FAQ",
    headerTagline: "Ο Νο 1 Σύμβουλος Επιχειρηματικών Αδειών στην Ινδονησία",
    ctaFree: "Δωρεάν Συμβουλή",
    // Hero
    heroBadge: "Η εμπιστοσύνη 1.247+ επιχειρήσεων σε 38 επαρχίες και 514 πόλεις της Ινδονησίας",
    heroTitle1: "Όλες τις",
    heroHigh1: "Επιχειρηματικές Άδειες",
    heroTitle2: "Αναλαμβάνουμε Εμείς —",
    heroHigh2: "Εσείς Χαλαρώστε",
    heroSubtitle:
      "Από το NIB, PT, CV, Halal και BPOM έως το AMDAL — όλα εκτελούνται από ειδικούς, 100% νόμιμα, με εγγύηση επιστροφής χρημάτων. Από 350 χιλιάδες ρουπίες, σε μόλις 1 εργάσιμη ημέρα.",
    heroBullet1: "NIB σε 1 ημέρα • PT σε 3 ημέρες • Χωρίς ουρές σε δημόσιες υπηρεσίες",
    heroBullet2: "Επίσημα κυβερνητικά κανάλια — έγγραφα έγκυρα και επαληθευμένα",
    heroBullet3: "Εγγύηση 100% επιστροφής χρημάτων αν η άδεια δεν εκδοθεί",
    heroReviews: "από 890+ κριτικές πελατών",
    // Hero form
    formTitle: "Δωρεάν Συμβουλευτική 15 Λεπτών",
    formSubtitle: "Χωρίς κόστος, χωρίς δέσμευση — απευθείας από έμπειρο σύμβουλο.",
    labelFree: "Δωρεάν",
    labelName: "Ονοματεπώνυμο *",
    labelWa: "Αριθμός WhatsApp *",
    labelSector: "Τύπος Επιχείρησης",
    phSector: "Επιλέξτε κλάδο",
    labelNeed: "Οι Ανάγκες σας",
    phNeed: "Επιλέξτε πακέτο",
    pkgNotSure: "Δεν είμαι σίγουρος/η / πρώτα συμβουλή",
    pkgPrefix: "Πακέτο {p}",
    labelDesc: "Πείτε μας σύντομα για την επιχείρησή σας (προαιρετικό)",
    phDesc: "π.χ.: θέλω να ανοίξω καφέ στο Bandung, έχω ήδη χώρο αλλά δεν έχω σύσταση εταιρείας...",
    btnSubmit: "Δωρεάν Εγγραφή για Συμβουλή",
    btnSending: "Αποστολή...",
    privacyNote: "Τα δεδομένα σας είναι ασφαλή & δεν κοινοποιούνται ποτέ σε τρίτους",
    successTitle: "Εγγραφήκατε Επιτυχώς! 🎉",
    successBody:
      "Ευχαριστούμε, {name}! Ο έμπειρος σύμβουλός μας θα επικοινωνήσει στο WhatsApp σας εντός 24 ωρών (συνήθως σε λιγότερο από 15 λεπτά τις εργάσιμες ώρες).",
    btnAnother: "Εγγραφή Άλλης Επιχείρησης",
    // Toasts
    toastSuccess: "Η Δωρεάν Συμβουλή Καταχωρήθηκε! 🎉",
    toastFail: "Η αποστολή απέτυχε",
    toastConn: "Πρόβλημα σύνδεσης",
    // Stats
    statClients: "Πελάτες που Εξυπηρετήθηκαν",
    statPermits: "Διεκπεραιωμένες Άδειες",
    statProvinces: "Επαρχίες",
    statCities: "Πόλεις & Καμπούπεν",
    statSatisfaction: "Ικανοποίηση Πελατών",
    statAvgTime: "Μέσος Χρόνος Διεκπεραίωσης",
    statHours: "ώρες",
    // Section titles
    servicesT1: "Ένα Σημείο για",
    servicesTHigh: "Όλες τις Νομικές Ανάγκες",
    servicesT2: "της Επιχείρησής σας",
    checkerT1: "Ανακαλύψτε τις Άδειες",
    checkerTHigh: "που Χρειάζεστε",
    checkerT2: "σε 30 Δευτερόλεπτα",
    calcT1: "Υπολογιστής Κόστους Αδειών —",
    calcTHigh: "Πρώτα Υπολογίστε, Μετά Αποφασίστε",
    calcT2: "",
    hubT1: "Οδηγοί Επιχειρηματικών Αδειών Ινδονησίας —",
    hubTHigh: "Πλήρεις, Κατανοητοί, Ενημερωμένοι",
    hubT2: "",
    blogT1: "Η Βιβλιοθήκη Άρθρων για Άδειες",
    blogTHigh: "— η Πιο Πλήρης στην Ινδονησία",
    blogT2: "",
    courseT1: "Κατακτήστε τις Επιχειρηματικές Άδειες σε",
    courseTHigh: "7 Ημέρες",
    courseT2: "",
    coverageT1: "{n} Επαρχίες &",
    coverageTHigh: "{n} Πόλεις & Καμπούπεν",
    coverageT2: "— από τη Sabang έως τη Merauke",
    whyT1: "Όχι Απλώς Γραφείο Αδειών —",
    whyTHigh: "Ο Νομικός σας Συνεργάτης",
    whyT2: "",
    processT1: "4 Βήματα προς μια",
    processTHigh: "100% Νόμιμη Επιχείρηση",
    processT2: "",
    pricingT1: "Σαφείς Τιμές από την Αρχή,",
    pricingTHigh: "Χωρίς Κρυφές Χρεώσεις",
    pricingT2: "",
    testiT1: "1.247+ Επιχειρήσεις με",
    testiTHigh: "Αποδεδειγμένη Νομιμότητα",
    testiT2: "",
    compT1: "Γιατί να Μας Επιλέξετε αντί για",
    compTHigh: "Άλλους Συμβούλους;",
    compT2: "",
    faqT1: "Συχνές",
    faqTHigh: "Ερωτήσεις",
    faqT2: "",
    ctaT1: "Η Επιχείρησή σας Λειτουργεί Ήδη;",
    ctaTHigh: "Κάντε την Νόμιμη Τώρα.",
    ctaT2: "",
    sitemapT1: "Πλήρης Κατάλογος του",
    sitemapTHigh: "PusatPerizinan.com",
    sitemapT2: "",
    // Section subtitles
    servicesSub:
      "Από ΜΜΕ έως μεγάλες εταιρείες — 40+ τύποι αδειών διεκπεραιώνονται ολοκληρωμένα μέσω επίσημων κυβερνητικών καναλιών.",
    checkerSub:
      "Απλώς περιγράψτε την επιχείρησή σας. Η AI μας, εκπαιδευμένη στον ινδονησιακό Νόμο Δημιουργίας Θέσεων Εργασίας (UU Cipta Kerja) και στους κανονισμούς OSS-RBA, θα συντάξει τον πλήρη οδικό χάρτη αδειών — δωρεάν, χωρίς εγγραφή.",
    calcSub:
      "Επιλέξτε τις άδειες που χρειάζεστε και λάβετε αμέσως εκτίμηση κόστους & χρόνου. Διαφάνεια από το πρώτο λεπτό — χωρίς κρυφές χρεώσεις.",
    hubSub:
      "Όλα για NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA και φορολογία επιχειρήσεων — από τα βασικά έως τις τεχνικές λεπτομέρειες. Βασισμένο στον Νόμο Δημιουργίας Θέσεων Εργασίας και τους νεότερους κανονισμούς.",
    blogSub:
      "{n} άρθρα σε βάθος από την ομάδα των ειδικών μας σε θέματα κανονισμού — κόστη σύστασης PT, KBLI εστίασης, PMA, μεταλλευτικό RKAB, ταξίδια Ούμρα και πώς να ανοίξετε επιχείρηση στη Σαουδική Αραβία. Δωρεάν ανάγνωση, πάντα ενημερωμένα.",
    courseSub:
      "Κάθε πρωί: ένα μάθημα 5 λεπτών + μια πρακτική λίστα ελέγχου απευθείας στο email σας. Γραμμένη από τους ειδικούς μας — όχι θεωρία, αλλά ό,τι εφαρμόζεται πραγματικά στην πράξη.",
    coverageSub:
      "Ανεξάρτητα αν η επιχείρησή σας βρίσκεται στο Batam, στο Wamena ή στο Balikpapan — όλη η διαδικασία αδειών γίνεται online, τα έγγραφα αποστέλλονται με κουριέ και η ομάδα μας έρχεται επί τόπου για φυσικούς ελέγχους, AMDAL ή τον μεταλλευτικό τομέα.",
    whySub:
      "Χιλιάδες επιχειρηματίες ήρθαν σε εμάς αφού απογοητεύτηκαν από άλλους συμβούλους. Ιδού οι λόγοι:",
    processSub: "Ούτε μία μέρα σε δημόσιες υπηρεσίες. Όλον τον συντονισμό τον αναλαμβάνουμε εμείς.",
    pricingSub:
      "Κάθε πακέτο περιλαμβάνει επίσημα τέλη & αμοιβές υπηρεσιών. Πληρώνετε 50% προκαταβολικά και 50% μετά την έκδοση της άδειας.",
    testiSub:
      "Βαθμολογία 4,9/5 από 890+ κριτικές. Ιστορίες πελατών των οποίων οι επιχειρήσεις είναι πλέον νόμιμες και οι ίδιοι απόλυτα ήρεμοι.",
    compSub:
      "Αντικειμενική σύγκριση με τις συνήθεις πρακτικές των παρόχων υπηρεσιών αδειών στην Ινδονησία (Infiniti Office, EasyLegal, Izin.co.id και άλλοι).",
    faqSub: "Ακόμα διστάζετε; Αυτές οι απαντήσεις ίσως βοηθήσουν. Ή ρωτήστε απευθείας τον AI Σύμβουλό μας.",
    ctaSub:
      "Κάθε μέρα χωρίς επίσημες άδειες = κίνδυνος προστίμων, κυρώσεων και χαμένων ευκαιριών σε διαγωνισμούς και χρηματοδότηση. Δωρεάν συμβουλευτική 15 λεπτών — χαρτογραφούμε όλα όσα χρειάζεστε και μετά αποφασίζετε εσείς.",
    sitemapSub:
      "Πλοήγηση σε μία σελίδα προς όλο το περιεχόμενο & τις υπηρεσίες μας — για εσάς και για τις μηχανές αναζήτησης.",
    // Final CTA extras
    ctaBadge: "ΠΕΡΙΟΡΙΣΜΕΝΕΣ ΘΕΣΕΙΣ ΗΜΕΡΗΣΙΩΣ",
    ctaFormTitle: "Κλείστε Δωρεάν Συμβουλευτική",
    ctaFormSub: "Συμπληρώστε σε 30 δευτερόλεπτα — ο έμπειρος σύμβουλός μας θα επικοινωνήσει.",
    ctaSubmit: "Κλείστε Δωρεάν Συμβουλευτική",
    ctaSuccessTitle: "Το Αίτημα Ελήφθη! 🎉",
    ctaSuccessBody:
      "Ο σύμβουλός μας θα επικοινωνήσει μέσω WhatsApp εντός 24 ωρών. Εν τω μεταξύ, δοκιμάστε τον Έλεγχο Αδειών με AI!",
    ctaWaBtn: "Συνομιλήστε στο WhatsApp Τώρα",
    ctaPrivacy: "100% δωρεάν • Χωρίς δέσμευση • Ασφαλή δεδομένα",
    // Knowledge hub tabs
    tabPerIzin: "Ανά Άδεια",
    tabPerSektor: "Ανά Κλάδο",
    tabPerWilayah: "Ανά Περιοχή",
    tabKbli: "KBLI",
    // Email course extras
    courseBadge: "Δωρεάν Μάθημα μέσω Email — 100% Χωρίς Κόστος",
    courseFormTitle: "Εγγραφή Δωρεάν Τώρα",
    courseFormSub: "8 ημέρες × 5 λεπτά = επιχείρηση 100% νόμιμη και χωρίς άγχος προστίμων.",
    courseSuccessTitle: "Καλώς ήρθατε στο μάθημα!",
    // Footer
    footerTagline:
      "Ο έμπιστος σύμβουλος επιχειρηματικών αδειών στην Ινδονησία. Η νομιμότητα της επιχείρησής σας στα χέρια ειδικών — γρήγορα, με διαφάνεια, με εγγύηση.",
    footerVerified:
      "Καταχωρισμένοι & σε συνεργασία με επίσημους συμβολαιογράφους σε 38 επαρχίες & 514 πόλεις/καμπούπεν",
    footerColServices: "Υπηρεσίες",
    footerColCompany: "Εταιρεία",
    footerColContact: "Επικοινωνία",
    footerHours: "Δευτέρα-Σάββατο, 08.00-20.00 WIB",
    footerNote:
      "Στον ίδιο όροφο με το Χρηματιστήριο της Ινδονησίας • Εξυπηρετούμε όλη την Ινδονησία online",
    footerRights:
      "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Με επιφύλαξη παντός δικαιώματος.",
    footerMade: "Φτιάχτηκε με ❤️ για την πρόοδο των ΜΜΕ της Ινδονησίας",
    // Chat
    chatTitle: "RIZKI — AI Σύμβουλος",
    chatStatus: "Σε σύνδεση • Απαντά σε δευτερόλεπτα",
    chatWelcome:
      "Γεια σας! 👋 Είμαι ο **RIZKI**, ο AI Σύμβουλος του PusatPerizinan.com — σε ετοιμότητα 24 ώρες για όλες τις ερωτήσεις σας σχετικά με επιχειρηματικές άδειες.\n\nNIB, PT, CV, Halal, BPOM ή άλλη άδεια; Ρωτήστε ελεύθερα! 😊",
    chatPlaceholder: "Ρωτήστε για επιχειρηματικές άδειες...",
    chatTyping: "Ο RIZKI πληκτρολογεί...",
    chatQr1: "Ποιες άδειες χρειάζομαι για να ανοίξω καφέ;",
    chatQr2: "Πόσο κοστίζει η σύσταση PT;",
    chatQr3: "Πώς να εκδώσω NIB για ΜΜΕ",
    chatQr4: "Ποια η διαφορά μεταξύ PIRT και BPOM;",
    // Language
    languageLabel: "Γλώσσα",
    searchLanguages: "Αναζήτηση γλώσσας...",
    contentNote:
      "Οι πλήρεις οδηγοί παρακάτω είναι στα ινδονησιακά — ρωτήστε την AI RIZKI για εξήγηση στη γλώσσα σας.",
  },
};

