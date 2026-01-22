import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import HtmlLang from '../components/HtmlLang';

const locales = ['en', 'fr', 'cn'] as const;

function toHtmlLang(locale: string) {
  return locale === 'cn' ? 'zh-CN' : locale;
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;

  if (!locales.includes(lang as (typeof locales)[number])) {
    notFound();
  }

  const htmlLang = toHtmlLang(lang);

  return (
    <>
      <HtmlLang lang={htmlLang} />
      <div lang={htmlLang} className="min-h-screen">
        {children}
      </div>
    </>
  );
}
