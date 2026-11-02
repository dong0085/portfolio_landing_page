import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
} from 'react-icons/fa';
import Breadcrumbs from '../../../components/Breadcrumbs';
import PageTransition from '../../../components/PageTransition';
import Screenshot from '../../../components/Screenshot';
import { getProject, pick, projects } from '../../../data/projects';
import { projectDetailCopy } from '../../../locales';

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const project = getProject(id);
  if (!project) return {};
  return {
    title: `${pick(project.title, lang)} · Eric (Cheng)`,
    description: pick(project.tagline, lang),
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { lang, id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const copy =
    projectDetailCopy[lang as keyof typeof projectDetailCopy] ??
    projectDetailCopy.en;
  const t = (value: Record<string, string>) => pick(value, lang);
  const title = t(project.title);
  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const shotLabels = { enlarge: copy.enlarge, close: copy.close };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-surface to-surface-2 pb-[calc(8rem+env(safe-area-inset-bottom))] md:pb-36">
      {/* Where am I: always visible while scrolling */}
      <div className="sticky top-0 z-40 border-b border-card-border/70 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6 md:px-12">
          <Breadcrumbs
            label={copy.breadcrumb}
            items={[
              { label: copy.home, href: `/${lang}` },
              { label: copy.projects, href: `/${lang}/projects` },
              { label: title },
            ]}
          />
          <div className="flex shrink-0 items-center gap-1 text-sm text-muted">
            <Link
              href={`/${lang}/projects/${previous.id}`}
              aria-label={`${copy.previous}: ${t(previous.title)}`}
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-chip hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <FaArrowLeft aria-hidden="true" className="size-3.5" />
            </Link>
            <span className="tabular-nums" aria-hidden="true">
              {index + 1} / {projects.length}
            </span>
            <Link
              href={`/${lang}/projects/${next.id}`}
              aria-label={`${copy.next}: ${t(next.title)}`}
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-chip hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <FaArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <PageTransition className="mx-auto max-w-5xl px-6 pt-10 md:px-12 md:pt-16">
        {/* Hook */}
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
            {copy.kinds[project.kind]} · {project.year}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-none text-content sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-2xl font-semibold leading-snug text-brand md:text-3xl">
            {t(project.tagline)}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {t(project.description)}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-solid px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                {copy.tryLive}
                <FaExternalLinkAlt aria-hidden="true" className="size-3" />
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-card-border bg-card px-5 text-sm font-semibold text-content transition-colors hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                <FaGithub aria-hidden="true" className="size-4" />
                {copy.viewCode}
              </a>
            )}
            {project.demoNote && (
              <span className="rounded-md bg-chip px-2.5 py-1 font-mono text-xs text-chip-text">
                {t(project.demoNote)}
              </span>
            )}
          </div>
        </header>

        {/* Cover */}
        <figure className="mt-10 md:mt-14">
          <Screenshot
            src={project.cover.src}
            width={project.cover.width}
            height={project.cover.height}
            alt={t(project.cover.alt)}
            sizes="(max-width: 1024px) 100vw, 896px"
            labels={shotLabels}
            priority
          />
          {project.cover.caption && (
            <figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              {t(project.cover.caption)}
            </figcaption>
          )}
        </figure>

        {/* Facts */}
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-card-border py-6 md:grid-cols-[auto_auto_1fr_2fr]">
          <Fact label={copy.type}>{copy.kinds[project.kind]}</Fact>
          <Fact label={copy.year}>{project.year}</Fact>
          <Fact label={copy.status} wide>
            {t(project.status)}
          </Fact>
          <Fact label={copy.builtWith} wide>
            <span className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-chip px-2 py-0.5 text-xs font-medium text-chip-text">
                  {tag}
                </span>
              ))}
            </span>
          </Fact>
        </dl>

        {/* The idea */}
        <section className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-subtle md:col-span-3 md:pt-2">
            {copy.idea}
          </h2>
          <p className="text-xl leading-relaxed text-content md:col-span-9 md:text-2xl md:leading-relaxed">
            {t(project.idea)}
          </p>
        </section>

        {/* Features */}
        <section className="mt-16 md:mt-24">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-subtle">
            {copy.highlights}
          </h2>
          <div className="mt-8 space-y-16 md:space-y-24">
            {project.features.map((feature, featureIndex) => {
              const isPhone = feature.images.every((image) => image.phone);
              return (
                <article
                  key={t(feature.title)}
                  className="grid gap-6 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-4">
                    <div className="md:sticky md:top-24">
                      <p className="font-mono text-sm text-brand">
                        {String(featureIndex + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold leading-tight text-content">
                        {t(feature.title)}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted">
                        {t(feature.body)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`md:col-span-8 ${
                      !isPhone
                        ? 'space-y-6'
                        : feature.images.length === 1
                          ? 'mx-auto w-full max-w-[15rem]'
                          : 'mx-auto grid w-full max-w-md grid-cols-2 gap-4 md:gap-6'
                    }`}>
                    {feature.images.map((image) => (
                      <Screenshot
                        key={image.src}
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={t(image.alt)}
                        phone={image.phone}
                        sizes={
                          image.phone
                            ? '(max-width: 768px) 45vw, 220px'
                            : '(max-width: 768px) 100vw, 600px'
                        }
                        labels={shotLabels}
                      />
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Engineering */}
        <section className="mt-16 md:mt-24">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-subtle">
            {copy.engineering}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {project.engineering.map((note) => (
              <div
                key={t(note.title)}
                className="rounded-xl border border-card-border bg-card p-5">
                <h3 className="font-bold text-content">{t(note.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(note.body)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Next and previous */}
        <nav
          aria-label={copy.projects}
          className="mt-16 grid gap-4 border-t border-card-border pt-10 md:mt-24 sm:grid-cols-2">
          {[
            { project: previous, label: copy.previous, align: 'left' },
            { project: next, label: copy.next, align: 'right' },
          ].map(({ project: other, label, align }) => (
            <Link
              key={align}
              href={`/${lang}/projects/${other.id}`}
              className={`group flex items-center gap-4 rounded-xl border border-card-border bg-card p-3 transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                align === 'right' ? 'sm:flex-row-reverse sm:text-right' : ''
              }`}>
              <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                <Image
                  src={other.cover.src}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-subtle sm:inline-flex">
                  {align === 'left' && (
                    <FaArrowLeft aria-hidden="true" className="size-2.5" />
                  )}
                  {label}
                  {align === 'right' && (
                    <FaArrowRight aria-hidden="true" className="size-2.5" />
                  )}
                </span>
                <span className="mt-1 block truncate font-bold text-content transition-colors group-hover:text-brand">
                  {t(other.title)}
                </span>
              </span>
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-center">
          <Link
            href={`/${lang}/projects`}
            className="rounded text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            {copy.allProjects}
          </Link>
        </p>
      </PageTransition>
    </main>
  );
}

function Fact({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'col-span-2 md:col-span-1' : undefined}>
      <dt className="text-xs font-semibold uppercase tracking-wider text-subtle">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-medium text-content">{children}</dd>
    </div>
  );
}
