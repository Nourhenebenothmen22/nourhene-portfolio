import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FiSend,
  FiX,
  FiMinimize2,
  FiMaximize2,
  FiTrash2,
  FiDownload,
  FiMail,
  FiCheck,
  FiCopy,
} from 'react-icons/fi';
import { TbSparkles, TbRobot, TbBolt } from 'react-icons/tb';
import { useLanguage } from '../context/LanguageContext.jsx';
import { publicAsset } from '../utils/publicAsset.js';

const knowledgeBase = {
  fr: {
    welcome: "Bonjour ! Je suis Aria, le Copilot IA de Nourhene Ben Othmen. Posez-moi vos questions sur ses compétences en IA/RAG, ses projets d'ingénierie ou sa recherche de Stage PFE (6 mois — Début 2027) !",
    placeholder: "Posez une question sur le profil de Nourhene...",
    title: "Aria • Copilot IA",
    badge: "Réponse instantanée < 20ms",
    clear: "Effacer la discussion",
    prompts: [
      { label: "🎯 Stage PFE 2027", query: "Est-elle disponible pour un stage PFE début 2027 ?" },
      { label: "🧠 RAG & Multi-LLM", query: "Quelles sont ses compétences en IA, RAG et LLM ?" },
      { label: "🚀 Projets Phares", query: "Peux-tu me présenter ses projets majeurs comme AI-PFE-Hunter et Khedma AI ?" },
      { label: "💼 Expérience Neoxion", query: "Quel travail a-t-elle réalisé chez Neoxion Technologies et iTeam ?" },
      { label: "📄 Télécharger son CV", query: "Où puis-je télécharger son CV à jour ?" },
      { label: "📞 Coordonnées", query: "Comment contacter Nourhene ?" },
    ],
    responses: {
      pfe: {
        text: "**Oui, absolument !** Nourhene Ben Othmen est en recherche active d'un **Stage PFE d’Ingénieur (6 mois) débutant début 2027**.\n\n- **Formation** : Élève-Ingénieure en Génie Logiciel (Spécialisation IA & Data Science) à **iTeam University** (Tunis, Tunisie).\n- **Mobilité** : Basée à Ariana / Tunis, ouverte aux opportunités sur site, hybrides ou à distance.\n- **Disponibilité** : Début 2027 (durée flexible de 5 à 6 mois).",
        actions: [
          { type: 'cv', label: 'Télécharger son CV (PDF)', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
          { type: 'contact', label: 'La contacter pour un entretien', href: '#contact' },
        ],
      },
      ai_rag: {
        text: "Nourhene possède une expertise avancée en **IA générative, RAG Hybride et MLOps** :\n\n- **RAG Hybride** : Recherche hybride combinant recherche lexicale BM25 et vecteurs denses avec **PostgreSQL 16 (pgvector / index HNSW)** et embeddings ONNX (*all-MiniLM-L6-v2*).\n- **Multi-LLM Gateways** : Conception de passerelles résilientes intégrant 5 backends d'inférence (OpenRouter, OpenAI, Anthropic, Hugging Face, Ollama) avec streaming SSE.\n- **Agents IA** : Automatisation de flux et qualification de leads avec **LangGraph StructuredTools**.\n- **Voice-to-Voice temps réel** : Intégration de **LiveKit WebRTC** et **Silero VAD** reliés directement au pipeline RAG central.",
        actions: [
          { type: 'skills', label: 'Explorer la stack technique', href: '#skills' },
          { type: 'projects', label: 'Voir les projets IA', href: '#projects' },
        ],
      },
      projects: {
        text: "Voici les réalisations d'ingénierie majeures de Nourhene :\n\n1. **AI-PFE-Hunter** *(Agent Autonome d'Automatisation)* : Pipeline Docker 24/7 éliminant 100% des tâches manuelles de veille d'offres IA/Data 2026/2027, moteur NLP anti-doublon et double dispatch Telegram + Google Sheets.\n2. **Khedma AI** *(SaaS RH Multi-Tenant)* : Passerelle Multi-LLM 5 providers, streaming SSE, transactions atomiques Prisma, quotas et rate limiting HTTP 429 (41 tests Vitest).\n3. **DarStore** *(E-Commerce Cloud-Native assisté par IA)* : Architecture microservices, assistant RAG BM25 + dense vectors, tarification dynamique ML (R²=0.956) et observabilité Prometheus / Grafana.",
        actions: [
          { type: 'projects', label: 'Voir tous les projets', href: '#projects' },
        ],
      },
      experience: {
        text: "Nourhene a validé plusieurs expériences professionnelles d'envergure :\n\n1. **Plateforme Khademni (SaaS ATS Multi-Tenant)** — *iTeam University* (Juin 2026 – Présent) : Architecture ATS Next.js 16/Express 5/PostgreSQL 16, moteur de matching ONNX + RRF, file asynchrone BullMQ/Redis, sécurité 2FA TOTP/CSRF, Docker Compose & tests k6.\n2. **Plateforme Aria (Conversational AI & Hybrid RAG)** — *Neoxion Technologies* (Juil. 2026 – Août 2026) : Pipeline scraping distribué Playwright/trafilatura/pgvector HNSW, RAG hybride, chat streaming SSE (FastAPI/NestJS) et Voice-to-Voice LiveKit/Silero VAD. Certificat officiel validé.\n3. **MBC Training** (Juin 2025 – Août 2025) : Portail web JavaScript/PHP/MySQL et dashboards interactifs Chart.js.",
        actions: [
          { type: 'experience', label: 'Consulter la section Expérience', href: '#experience' },
        ],
      },
      cv: {
        text: "Le CV officiel et actualisé de Nourhene est disponible au format PDF.\n\nIl résume ses 5 pôles de compétences techniques, ses 3 expériences, ses projets phares et ses 8 certifications (IBM, Cisco, Linux Foundation, Saylor).",
        actions: [
          { type: 'cv', label: 'Télécharger le CV officiel (PDF)', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
        ],
      },
      contact: {
        text: "Vous pouvez contacter directement Nourhene Ben Othmen via les canaux suivants :\n\n- **Email** : benothmennourhen8@gmail.com\n- **Téléphone** : +216 21 83 20 10\n- **Localisation** : Ariana / Tunis, Tunisie\n- **LinkedIn** : linkedin.com/in/nourhene-ben-othmen\n- **GitHub** : github.com/Nourhenebenothmen22",
        actions: [
          { type: 'mail', label: 'Envoyer un email', href: 'mailto:benothmennourhen8@gmail.com' },
          { type: 'contact', label: 'Formulaire de contact', href: '#contact' },
        ],
      },
      default: {
        text: "Nourhene Ben Othmen est Élève-Ingénieure en Génie Logiciel spécialisée en IA & Data Science (iTeam University). Elle recherche un **Stage PFE d'Ingénieur (6 mois) début 2027**.\n\nSes domaines d'excellence incluent le **RAG Hybride, les architectures Multi-LLM, Next.js 16, Python (FastAPI), PostgreSQL (pgvector) et Docker**.",
        actions: [
          { type: 'cv', label: 'Télécharger le CV', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
          { type: 'contact', label: 'Prendre contact', href: '#contact' },
        ],
      },
    },
  },
  en: {
    welcome: "Hello! I am Aria, Nourhene Ben Othmen's AI Copilot. Ask me anything about her AI/RAG expertise, engineering projects, or her availability for a 6-month PFE Internship starting early 2027!",
    placeholder: "Ask anything about Nourhene's profile...",
    title: "Aria • AI Copilot",
    badge: "Instant response < 20ms",
    clear: "Clear chat",
    prompts: [
      { label: "🎯 PFE Internship 2027", query: "Is she available for a 6-month PFE internship starting early 2027?" },
      { label: "🧠 RAG & Multi-LLM", query: "What are her skills in AI, RAG, and LLM architectures?" },
      { label: "🚀 Flagship Projects", query: "Can you present her main projects like AI-PFE-Hunter and Khedma AI?" },
      { label: "💼 Neoxion Experience", query: "What work did she deliver at Neoxion Technologies and iTeam?" },
      { label: "📄 Download Resume", query: "Where can I download her updated resume?" },
      { label: "📞 Contact Details", query: "How can I contact Nourhene directly?" },
    ],
    responses: {
      pfe: {
        text: "**Yes, absolutely!** Nourhene Ben Othmen is actively seeking a **6-Month Engineering PFE Internship starting early 2027**.\n\n- **Education**: Software Engineering Student (AI & Data Science Specialization) at **iTeam University** (Tunis, Tunisia).\n- **Mobility**: Located in Ariana / Tunis, open to on-site, hybrid, or remote positions.\n- **Timeline**: Starting January/February 2027 for 5 to 6 months.",
        actions: [
          { type: 'cv', label: 'Download Resume (PDF)', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
          { type: 'contact', label: 'Contact for interview', href: '#contact' },
        ],
      },
      ai_rag: {
        text: "Nourhene has advanced expertise in **Generative AI, Hybrid RAG, and MLOps**:\n\n- **Hybrid RAG**: Combining BM25 lexical search and dense vectors using **PostgreSQL 16 (pgvector / HNSW index)** with ONNX dense embeddings (*all-MiniLM-L6-v2*).\n- **Multi-LLM Gateways**: Resilient gateways across 5 inference providers (OpenRouter, OpenAI, Anthropic, Hugging Face, Ollama) with real-time SSE streaming.\n- **AI Agents**: Workflow automation and lead qualification using **LangGraph StructuredTools**.\n- **Real-Time Voice-to-Voice**: Integration with **LiveKit WebRTC** and **Silero VAD** plugged into the central RAG pipeline.",
        actions: [
          { type: 'skills', label: 'Explore technical skills', href: '#skills' },
          { type: 'projects', label: 'View AI projects', href: '#projects' },
        ],
      },
      projects: {
        text: "Key engineering projects developed by Nourhene:\n\n1. **AI-PFE-Hunter** *(Autonomous AI Agent)*: 24/7 Dockerized pipeline automating 100% of PFE/summer internship opportunities, semantic NLP engine with 0 duplicates, dual dispatch to Telegram bot + Google Sheets.\n2. **Khedma AI** *(Multi-Tenant HR SaaS)*: 5-backend Multi-LLM gateway, SSE streaming, atomic Prisma transactions, monthly quotas & HTTP 429 rate limiting (41 Vitest tests).\n3. **DarStore** *(AI-Assisted Cloud-Native E-Commerce)*: Microservices architecture, hybrid RAG BM25 + dense vectors, production ML dynamic pricing (R²=0.956) and Prometheus/Grafana observability.",
        actions: [
          { type: 'projects', label: 'View all projects', href: '#projects' },
        ],
      },
      experience: {
        text: "Professional internships delivered by Nourhene:\n\n1. **Khademni Platform (Multi-Tenant SaaS ATS)** — *iTeam University* (June 2026 – Present): Next.js 16/Node.js 22/Express 5/PostgreSQL 16, semantic matching ONNX + RRF, BullMQ/Redis async queue, 2FA TOTP/CSRF security, Docker Compose & k6 testing.\n2. **Aria Platform (Conversational AI & Hybrid RAG)** — *Neoxion Technologies* (July 2026 – Aug 2026): Distributed scraping with Playwright/trafilatura/pgvector HNSW, hybrid RAG pipeline, SSE chat streaming (FastAPI/NestJS) and Voice-to-Voice LiveKit/Silero VAD. Official certificate verified.\n3. **MBC Training** (June 2025 – Aug 2025): Full stack portal using JavaScript/PHP/MySQL and Chart.js reporting dashboards.",
        actions: [
          { type: 'experience', label: 'View Experience section', href: '#experience' },
        ],
      },
      cv: {
        text: "Nourhene's official and updated resume is available in PDF format.\n\nIt covers her 5 technical skill pillars, 3 professional experiences, flagship projects, and 8 certifications (IBM, Cisco, Linux Foundation, Saylor).",
        actions: [
          { type: 'cv', label: 'Download Official Resume (PDF)', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
        ],
      },
      contact: {
        text: "You can reach Nourhene Ben Othmen directly through:\n\n- **Email**: benothmennourhen8@gmail.com\n- **Phone**: +216 21 83 20 10\n- **Location**: Ariana / Tunis, Tunisia\n- **LinkedIn**: linkedin.com/in/nourhene-ben-othmen\n- **GitHub**: github.com/Nourhenebenothmen22",
        actions: [
          { type: 'mail', label: 'Send Email', href: 'mailto:benothmennourhen8@gmail.com' },
          { type: 'contact', label: 'Open Contact Form', href: '#contact' },
        ],
      },
      default: {
        text: "Nourhene Ben Othmen is a Software Engineering Student specializing in AI & Data Science (iTeam University). She is actively seeking a **6-Month Engineering PFE Internship starting early 2027**.\n\nHer core stack includes **Hybrid RAG, Multi-LLM Gateways, Next.js 16, React 19, FastAPI, PostgreSQL (pgvector), Docker, and Microservices**.",
        actions: [
          { type: 'cv', label: 'Download Resume', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
          { type: 'contact', label: 'Get in Touch', href: '#contact' },
        ],
      },
    },
  },
  ar: {
    welcome: "مرحباً! أنا Aria، المساعد الذكي لنورهان بن عثمان. اسألني أي سؤال عن خبراتها في الذكاء الاصطناعي و RAG، مشاريعها الهندسية، أو بحثها عن تدريب تخرج PFE كمهندسة (6 أشهر — بداية 2027)!",
    placeholder: "اطرح سؤالاً عن ملف نورهان المهني...",
    title: "Aria • Copilot الذكاء الاصطناعي",
    badge: "استجابة فورية < 20ms",
    clear: "مسح المحادثة",
    prompts: [
      { label: "🎯 تدريب PFE 2027", query: "هل هي متاحة لتدريب PFE بداية 2027؟" },
      { label: "🧠 RAG ونماذج اللغة", query: "ما هي مهاراتها في الذكاء الاصطناعي وتقنية RAG؟" },
      { label: "🚀 المشاريع الرائدة", query: "حدثني عن مشاريعها مثل AI-PFE-Hunter و Khedma AI" },
      { label: "💼 تجربة Neoxion", query: "ما الأعمال التي أنجزتها في Neoxion و iTeam؟" },
      { label: "📄 تحميل السيرة الذاتية", query: "أين يمكنني تحميل السيرة الذاتية المحدثة؟" },
      { label: "📞 التواصل المباشر", query: "كيف يمكنني التواصل مع نورهان؟" },
    ],
    responses: {
      pfe: {
        text: "**نعم، بالتأكيد!** نورهان بن عثمان تبحث بنشاط عن **تدريب مشروع تخرج كمهندسة (PFE لمدة 6 أشهر) بداية عام 2027**.\n\n- **التكوين الأكاديمي**: طالبة مهندسة في هندسة البرمجيات (تخصص ذكاء اصطناعي وعلوم البيانات) بجامعة **iTeam University** بتونس.\n- **الموقع**: أريانة / تونس العاصمة، متاحة للعمل الحضوري، الهجين أو عن بُعد.\n- **الفترة**: بداية عام 2027 (مدة 5 إلى 6 أشهر).",
        actions: [
          { type: 'cv', label: 'تحميل السيرة الذاتية (PDF)', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
          { type: 'contact', label: 'التواصل لإجراء مقابلة', href: '#contact' },
        ],
      },
      ai_rag: {
        text: "تمتلك نورهان خبرة متقدمة في **الذكاء الاصطناعي التوليدي، RAG الهجين و MLOps**:\n\n- **RAG الهجين**: دمج البحث المعجمي BM25 والمتجهات الكثيفة عبر **PostgreSQL 16 (pgvector / HNSW)** مع تضمينات ONNX (*all-MiniLM-L6-v2*).\n- **بوابات Multi-LLM**: معمارية مرنة تدعم 5 مزودي استدلال (OpenRouter, OpenAI, Anthropic, Hugging Face, Ollama) مع تدفق فوري SSE.\n- **وكلاء الذكاء الاصطناعي**: أتمتة تدفقات العمل وتأهيل الفرص عبر **LangGraph StructuredTools**.\n- **محادثة صوتية فورية Voice-to-Voice**: تكامل **LiveKit WebRTC** و **Silero VAD** مع خط أنابيب RAG المركزي.",
        actions: [
          { type: 'skills', label: 'استكشاف المهارات التقنية', href: '#skills' },
          { type: 'projects', label: 'عرض مشاريع الذكاء الاصطناعي', href: '#projects' },
        ],
      },
      projects: {
        text: "أبرز المشاريع الهندسية التي أنجزتها نورهان:\n\n1. **AI-PFE-Hunter** *(وكيل ذاتي للأتمتة)*: خط أنابيب Docker يعمل 24/7 لأتمتة البحث عن تدريبات 2026/2027 بنسبة 100% مع محرك دلالي 0 تكرار وتكامل فوري مع Telegram و Google Sheets.\n2. **Khedma AI** *(منصة SaaS متعددة المستأجرين)*: بوابة Multi-LLM، تدفق SSE، معاملات Prisma ذرية وحماية ضد تجاوز الطلبات HTTP 429 (41 اختبار Vitest).\n3. **DarStore** *(تجارة إلكترونية سحابية بالذكاء الاصطناعي)*: معمارية خدمات مصغرة، مساعد RAG، تسعير ديناميكي ML (R²=0.956) ومراقبة عبر Prometheus و Grafana.",
        actions: [
          { type: 'projects', label: 'عرض جميع المشاريع', href: '#projects' },
        ],
      },
      experience: {
        text: "خبرات نورهان المهنية البارزة:\n\n1. **منصة Khademni (نظام ATS سحابي)** — *جامعة iTeam* (جوان 2026 – الحالي): معمارية Next.js 16/Express 5/PostgreSQL 16، مطابقة دلالية ONNX + RRF، طابور معالجة BullMQ/Redis، حماية 2FA TOTP/CSRF وتجارب كفاءة k6.\n2. **منصة Aria (ذكاء اصطناعي محادثاتي و RAG)** — *Neoxion Technologies* (جويلية 2026 – أوت 2026): استخلاص وتضمين بيانات مع Playwright/pgvector، خط أنابيب RAG، تدفق محادثة SSE وصوت فوري LiveKit/Silero VAD مع شهادة رسمية.\n3. **MBC Training** (جوان 2025 – أوت 2025): بوابة إلكترونية بلغات JavaScript/PHP/MySQL ولوحات تحكم تفاعلية مع Chart.js.",
        actions: [
          { type: 'experience', label: 'الانتقال إلى قسم الخبرات', href: '#experience' },
        ],
      },
      cv: {
        text: "السيرة الذاتية الرسمية والمحدثة لنورهان متوفرة بصيغة PDF.\n\nتتضمن ملخصاً لأعمدة المهارات التقنية الخمس، خبراتها المهنية، مشاريعها وشهاداتها الرسمية الثماني (IBM, Cisco, Linux Foundation, Saylor).",
        actions: [
          { type: 'cv', label: 'تحميل السيرة الذاتية (PDF)', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
        ],
      },
      contact: {
        text: "يمكنكم التواصل مباشرة مع نورهان بن عثمان عبر القنوات التالية:\n\n- **البريد الإلكتروني**: benothmennourhen8@gmail.com\n- **الهاتف**: +216 21 83 20 10\n- **الموقع**: أريانة / تونس العاصمة\n- **LinkedIn**: linkedin.com/in/nourhene-ben-othmen\n- **GitHub**: github.com/Nourhenebenothmen22",
        actions: [
          { type: 'mail', label: 'إرسال بريد إلكتروني', href: 'mailto:benothmennourhen8@gmail.com' },
          { type: 'contact', label: 'نموذج الاتصال', href: '#contact' },
        ],
      },
      default: {
        text: "نورهان بن عثمان طالبة مهندسة في هندسة البرمجيات تخصص ذكاء اصطناعي وعلوم البيانات (جامعة iTeam). تبحث بنشاط عن **تدريب مشروع تخرج كمهندسة (PFE لمدة 6 أشهر) بداية 2027**.\n\nمجالات تميزها تشمل **RAG الهجين، بوابات Multi-LLM، Next.js 16، FastAPI، PostgreSQL pgvector و Docker**.",
        actions: [
          { type: 'cv', label: 'تحميل السيرة الذاتية', href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
          { type: 'contact', label: 'تواصل الآن', href: '#contact' },
        ],
      },
    },
  },
};

function matchIntent(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (q.match(/pfe|stage|recrut|dispo|embauche|internship|debut 2027|2027|cherche|job|opportunite|متدرب|تدريب/)) {
    return 'pfe';
  }
  if (q.match(/rag|llm|ia|ai|nlp|vect|onnx|langgraph|pgvector|embedding|fastapi|voice|livekit|intelligence/)) {
    return 'ai_rag';
  }
  if (q.match(/projet|project|hunter|khedma|darstore|qraity|realisation|github|code|مشاريع|مشروع/)) {
    return 'projects';
  }
  if (q.match(/exp|neoxion|iteam|khademni|aria|mbc|stage|travail|poste|experience|خبرة|خبرات/)) {
    return 'experience';
  }
  if (q.match(/cv|resume|pdf|telecharger|download|curriculum|سيرة|ذاتية/)) {
    return 'cv';
  }
  if (q.match(/contact|mail|email|tel|phone|telephone|joindre|ecrire|coordonnees|linkedin|هاتف|تواصل/)) {
    return 'contact';
  }
  return 'default';
}

export default function AICopilot() {
  const { language, dir } = useLanguage();
  const langData = knowledgeBase[language] || knowledgeBase.fr;
  const prefersReduced = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const streamIntervalRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: langData.welcome,
        actions: [
          { type: 'cv', label: langData.responses.cv.actions[0].label, href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
          { type: 'contact', label: langData.responses.pfe.actions[1].label, href: '#contact' },
        ],
      },
    ]);
  }, [language]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    };
    window.addEventListener('open-ai-copilot', handleOpen);
    return () => window.removeEventListener('open-ai-copilot', handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    setInput('');
    const userMsgId = 'user-' + Date.now();
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: query }]);

    setIsTyping(true);

    const intent = matchIntent(query);
    const fullResponse = langData.responses[intent] || langData.responses.default;
    const responseText = fullResponse.text;
    const responseActions = fullResponse.actions;

    const botMsgId = 'bot-' + Date.now();
    let currentLength = 0;
    const chunkSize = 4;

    setMessages((prev) => [
      ...prev,
      { id: botMsgId, sender: 'bot', text: '', actions: responseActions, isStreaming: true },
    ]);

    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    streamIntervalRef.current = setInterval(() => {
      currentLength += chunkSize;
      if (currentLength >= responseText.length) {
        clearInterval(streamIntervalRef.current);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, text: responseText, isStreaming: false } : msg
          )
        );
        setIsTyping(false);
      } else {
        const sliced = responseText.slice(0, currentLength);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, text: sliced } : msg
          )
        );
      }
    }, 12);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-cleared',
        sender: 'bot',
        text: langData.welcome,
        actions: [
          { type: 'cv', label: langData.responses.cv.actions[0].label, href: '/cv/Resume_Nourhene_Ben_Othmen.pdf' },
          { type: 'contact', label: langData.responses.pfe.actions[1].label, href: '#contact' },
        ],
      },
    ]);
  };

  return (
    <>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className='fixed bottom-6 right-6 z-40 flex items-center gap-3 rtl:left-6 rtl:right-auto'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
              setHasUnread(false);
            }}
            className='group relative flex items-center gap-2.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 px-4 py-3 text-white shadow-xl shadow-cyan-500/25 transition-all hover:shadow-2xl hover:shadow-cyan-500/40'
            aria-label={langData.title}
          >
            <span className='relative flex h-3 w-3'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75' />
              <span className='relative inline-flex h-3 w-3 rounded-full bg-white' />
            </span>

            <TbSparkles className='text-xl animate-pulse text-cyan-200' />
            <span className='text-xs font-black tracking-wide uppercase sm:text-sm'>
              {langData.title}
            </span>

            {hasUnread && (
              <span className='absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-slate-950 shadow-sm'>
                !
              </span>
            )}
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            dir={dir}
            className={`fixed z-50 overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/95 dark:shadow-cyan-950/30 ${
              isMinimized
                ? 'bottom-6 right-6 h-16 w-80 rtl:left-6 rtl:right-auto'
                : 'bottom-4 right-4 h-[580px] max-h-[92vh] w-[92vw] sm:bottom-6 sm:right-6 sm:w-[420px] rtl:left-4 rtl:right-auto sm:rtl:left-6 sm:rtl:right-auto'
            }`}
          >
            <div className='flex items-center justify-between border-b border-slate-200/80 bg-slate-100/70 px-4 py-3.5 dark:border-white/10 dark:bg-white/5'>
              <div className='flex items-center gap-2.5'>
                <div className='relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-violet-600 text-white shadow-md shadow-cyan-500/30'>
                  <TbRobot className='text-xl' />
                  <span className='absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-slate-950' />
                </div>
                <div>
                  <div className='flex items-center gap-1.5'>
                    <h3 className='text-sm font-black text-slate-900 dark:text-white'>
                      {langData.title}
                    </h3>
                    <span className='inline-flex items-center gap-0.5 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-600 dark:text-cyan-400'>
                      <TbBolt className='text-xs' />
                      0ms
                    </span>
                  </div>
                  <p className='text-[11px] font-medium text-slate-500 dark:text-slate-400'>
                    {langData.badge}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-1'>
                {!isMinimized && (
                  <button
                    onClick={handleClear}
                    title={langData.clear}
                    className='rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white'
                  >
                    <FiTrash2 className='text-xs' />
                  </button>
                )}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className='rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white'
                >
                  {isMinimized ? <FiMaximize2 className='text-xs' /> : <FiMinimize2 className='text-xs' />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className='rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400'
                >
                  <FiX className='text-sm' />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <div className='flex h-[calc(100%-65px)] flex-col justify-between'>
                <div className='flex-1 space-y-4 overflow-y-auto p-4 text-xs leading-relaxed sm:text-sm'>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`group relative max-w-[86%] rounded-2xl p-3.5 shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-blue-500/10'
                            : 'border border-slate-200/80 bg-slate-50 text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-100'
                        }`}
                      >
                        <div className='whitespace-pre-line'>
                          {msg.text}
                          {msg.isStreaming && (
                            <span className='inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-cyan-500 ml-1' />
                          )}
                        </div>

                        {msg.sender === 'bot' && !msg.isStreaming && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className='absolute -top-2 right-2 rounded-md border border-slate-200 bg-white p-1 text-[10px] text-slate-500 opacity-0 shadow transition group-hover:opacity-100 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white'
                            title='Copier'
                          >
                            {copiedId === msg.id ? <FiCheck className='text-emerald-500' /> : <FiCopy />}
                          </button>
                        )}
                      </div>

                      {msg.actions && msg.actions.length > 0 && !msg.isStreaming && (
                        <div className='mt-2 flex flex-wrap gap-1.5'>
                          {msg.actions.map((act, idx) => (
                            <a
                              key={idx}
                              href={act.href.startsWith('/') ? publicAsset(act.href) : act.href}
                              target={act.href.startsWith('http') || act.href.includes('.pdf') ? '_blank' : undefined}
                              rel={act.href.includes('.pdf') ? 'noopener noreferrer' : undefined}
                              onClick={() => {
                                if (act.href.startsWith('#')) {
                                  setIsOpen(false);
                                }
                              }}
                              className='inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-bold text-cyan-700 transition hover:bg-cyan-500 hover:text-white dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950'
                            >
                              {act.type === 'cv' && <FiDownload className='text-xs' />}
                              {act.type === 'mail' && <FiMail className='text-xs' />}
                              {act.type === 'contact' && <TbSparkles className='text-xs' />}
                              {act.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className='flex items-center gap-1 text-[11px] font-medium text-slate-400'>
                      <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-500' />
                      <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500' style={{ animationDelay: '150ms' }} />
                      <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500' style={{ animationDelay: '300ms' }} />
                      <span className='ml-1 text-[10px]'>Aria génère la réponse...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className='border-t border-slate-200/80 bg-slate-50/50 p-2.5 dark:border-white/5 dark:bg-white/5'>
                  <div className='no-scrollbar flex gap-1.5 overflow-x-auto pb-1.5'>
                    {langData.prompts.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(p.query)}
                        className='whitespace-nowrap rounded-full border border-slate-300/80 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 transition hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-800 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-200'
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className='mt-1.5 flex items-center gap-1.5'
                  >
                    <input
                      ref={inputRef}
                      type='text'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={langData.placeholder}
                      disabled={isTyping}
                      className='flex-1 rounded-full border border-slate-300/80 bg-white px-3.5 py-2 text-xs text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/15 dark:bg-slate-900 dark:text-white'
                    />
                    <button
                      type='submit'
                      disabled={!input.trim() || isTyping}
                      className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40'
                    >
                      <FiSend className='text-xs' />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
