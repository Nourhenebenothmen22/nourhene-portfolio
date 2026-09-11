import {
  FaCode,
  FaDatabase,
  FaDocker,
  FaLaptopCode,
  FaServer,
  FaShieldHalved,
  FaWrench,
} from "react-icons/fa6";
import { TbBrain, TbCloudDataConnection, TbCpu } from "react-icons/tb";

export const technicalSkills = [
  {
    id: "frontend",
    title: {
      fr: "Frontend & UI",
      en: "Frontend & UI",
      ar: "الواجهة الأمامية وتجربة المستخدم",
    },
    accent: "cyan",
    icon: FaLaptopCode,
    skills: [
      "Next.js (App Router, SSR)",
      "React 19",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "TanStack React Query",
      "Recharts",
      "HTML5 / CSS3",
    ],
  },
  {
    id: "backend",
    title: {
      fr: "Backend & Systèmes",
      en: "Backend & Systems",
      ar: "الأنظمة والواجهات الخلفية",
    },
    accent: "blue",
    icon: FaServer,
    skills: [
      "Node.js 22",
      "NestJS",
      "Express 5",
      "Python (FastAPI)",
      "Architectures Microservices",
      "API REST",
      "WebSockets",
      "BullMQ",
      "Redis",
    ],
  },
  {
    id: "ai_data",
    title: {
      fr: "Data & Intégration IA",
      en: "Data & AI Integration",
      ar: "البيانات والذكاء الاصطناعي",
    },
    accent: "violet",
    icon: TbBrain,
    skills: [
      "RAG Hybride (BM25 + Dense Embeddings ONNX)",
      "LangGraph",
      "Multi-LLM Gateways",
      "PostgreSQL 16 (pgvector / HNSW)",
      "MongoDB",
      "Prisma ORM",
      "Scikit-Learn",
    ],
  },
  {
    id: "devops_qa",
    title: {
      fr: "DevOps, Sécurité & QA",
      en: "DevOps, Security & QA",
      ar: "DevOps، الأمان وجودة البرمجيات",
    },
    accent: "emerald",
    icon: FaShieldHalved,
    skills: [
      "Docker & Docker Compose",
      "CI/CD (GitHub Actions)",
      "Vitest & Playwright",
      "Tests de charge k6",
      "Sécurité applicative (JWT, 2FA TOTP, CSRF, Argon2, RBAC)",
    ],
  },
  {
    id: "tools",
    title: {
      fr: "Outils & Protocoles",
      en: "Tools & Protocols",
      ar: "الأدوات والبروتوكولات",
    },
    accent: "amber",
    icon: FaWrench,
    skills: [
      "Git & GitHub",
      "Postman",
      "OpenAPI 3.0 (Swagger)",
      "Zod",
      "Server-Sent Events (SSE)",
      "Prometheus & Grafana",
    ],
  },
];
