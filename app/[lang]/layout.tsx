import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import HtmlLang from '../components/HtmlLang';

const locales = ['en', 'fr', 'zh-CN'] as const;

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as (typeof locales)[number])) {
    notFound();
  }

  return (
    <>
      <HtmlLang lang={lang} />
      <div lang={lang} className="min-h-screen">
        {children}
      </div>
    </>
  );
}
