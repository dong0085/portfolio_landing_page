import FloatingNav from '../../components/FloatingNav';
import MobileContent from './MobileContent';

export default async function MobilePage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  return (
    <>
      <FloatingNav lang={lang} />
      <main className="min-h-screen relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <MobileContent lang={lang} />
      </main>
    </>
  );
}
