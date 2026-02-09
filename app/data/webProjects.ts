export interface Project {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  thumbnailSrc: string;
  demoUrl?: string;
  tags: string[];
}

export const webProjects: Project[] = [
  {
    id: 'portfolio',
    title: {
      en: 'Portfolio Landing Page',
      fr: "Page d'accueil Portfolio",
      'zh-CN': '个人作品集首页',
    },
    description: {
      en: 'This very site — a multilingual portfolio with animated spotlight backgrounds, built with Next.js, React, and Tailwind CSS.',
      fr: 'Ce site même — un portfolio multilingue avec des arrière-plans animés, construit avec Next.js, React et Tailwind CSS.',
      'zh-CN':
        '这个网站本身——一个多语言作品集，拥有动态聚光灯背景，使用 Next.js、React 和 Tailwind CSS 构建。',
    },
    thumbnailSrc: '/profile.jpeg',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'NamecardAssistant',
    title: {
      en: 'Business card scanner',
      fr: 'Scanner de cartes de visite',
      'zh-CN': '名片扫描助手',
    },
    description: {
      en: `Snap a business card, let AI do the rest. Drop it in, extract, search — done in three steps.`,
      fr: `Prenez une photo d'une carte de visite, laissez l'IA faire le reste. Déposez, extrayez, recherchez — le tout en trois étapes.`,
      'zh-CN':
        '拍摄名片，余下的交给 AI。上传、提取、搜索 —— 仅需三步，轻松搞定。',
    },
    thumbnailSrc: '/Images/namecard_assistant.jpg',
    demoUrl: 'https://namecard-assistant.vercel.app/',
    tags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'shadcn/ui',
      'Framer Motion',
    ],
  },
];
