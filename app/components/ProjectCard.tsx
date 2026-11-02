'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { pick, type Project } from '../data/projects';
import { projectDetailCopy } from '../locales';

interface Props {
  project: Project;
  lang: string;
  labels: { viewProject: string; liveDemo: string };
}

export default function ProjectCard({ project, lang, labels }: Props) {
  const title = pick(project.title, lang);
  const kinds = (
    projectDetailCopy[lang as keyof typeof projectDetailCopy] ??
    projectDetailCopy.en
  ).kinds;

  return (
    <motion.article
      data-shape-drag="off"
      className="group relative bg-card border border-card-border hover:border-brand/30 rounded-xl shadow-sm hover:shadow-md dark:shadow-black/30 transition-[border-color,box-shadow] duration-300 overflow-hidden flex flex-col h-full has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-surface"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <div className="relative aspect-video bg-surface-2 overflow-hidden">
        <Image
          src={project.cover.src}
          alt={pick(project.cover.alt, lang)}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-subtle">
          {kinds[project.kind]} · {project.year}
        </p>

        <h3 className="text-xl font-bold text-content transition-colors duration-300 group-hover:text-brand">
          <Link
            href={`/${lang}/projects/${project.id}`}
            className="focus-visible:outline-none after:absolute after:inset-0 after:rounded-xl">
            {title}
          </Link>
        </h3>

        <p className="text-content font-medium leading-snug">
          {pick(project.tagline, lang)}
        </p>

        <p className="text-muted text-sm leading-relaxed flex-1">
          {pick(project.description, lang)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium bg-chip text-chip-text rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between gap-3 border-t border-card-border pt-4">
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            {labels.viewProject}
            <FaArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 rounded-md px-2 py-1 -mr-2 text-sm font-medium text-muted hover:text-brand hover:bg-chip focus-visible:outline-none">
              {labels.liveDemo}
              <FaExternalLinkAlt aria-hidden="true" className="size-3" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
