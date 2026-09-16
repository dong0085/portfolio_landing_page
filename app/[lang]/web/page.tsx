import WebContent from './WebContent';

export default async function WebPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-surface to-surface-2 overflow-hidden">
      <WebContent lang={lang} />
    </main>
  );
}
