import FloatingNav from '../components/FloatingNav';
import LayeredShapes from '../components/LayeredShapes';

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;

  return (
    <>
      <FloatingNav lang={lang} />
      <main className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <LayeredShapes lang={lang} />
      </main>
    </>
  );
}
