import ProjectsContent from './ProjectsContent';

export default async function ProjectsPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-surface to-surface-2 overflow-hidden">
      <ProjectsContent lang={lang} />
    </main>
  );
}
