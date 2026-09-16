import LayeredShapes from '../components/LayeredShapes';

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;

  return (
    <main className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-surface to-surface-2 overflow-hidden">
      <LayeredShapes lang={lang} />
    </main>
  );
}
