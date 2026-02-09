import FloatingNav from '../../components/FloatingNav';
import ProjectsContent from './ProjectsContent';

export default async function ProjectsPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  return (
    <>
      <FloatingNav lang={lang} />
      <main className="min-h-screen relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <ProjectsContent lang={lang} />
      </main>
    </>
  );
}
