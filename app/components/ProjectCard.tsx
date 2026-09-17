'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import type { Project } from '../data/webProjects';

interface Props {
  project: Project;
  lang: string;
  labels: { viewDemo: string; techStack: string };
}

export default function ProjectCard({ project, lang, labels }: Props) {
  const title = project.title[lang] ?? project.title.en;
  const description = project.description[lang] ?? project.description.en;
  const demoTooltip = project.demoTooltip?.[lang] ?? project.demoTooltip?.en;

  return (
    <motion.div
      className="group relative bg-card border border-card-border hover:border-brand/30 rounded-xl shadow-sm hover:shadow-md dark:shadow-black/30 transition-[border-color,box-shadow] duration-300 overflow-hidden flex flex-col h-full has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <div className="relative aspect-video bg-surface-2">
        <Image
          src={project.thumbnailSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1E4D8F]/30 via-[#1E4D8F]/5 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-0"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-bold text-content transition-colors duration-300 group-hover:text-brand">
          {title}
        </h3>

        <p className="text-muted text-sm leading-relaxed flex-1">
          {description}
        </p>

        <div>
          <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-2">
            {labels.techStack}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-chip text-chip-text rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-1 text-sm font-semibold text-brand hover:underline after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none">
            <span className="group/demo relative inline-flex items-center gap-1.5">
              {labels.viewDemo}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
              {demoTooltip && (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-max whitespace-nowrap rounded-md bg-content px-2.5 py-1.5 text-xs font-medium text-card opacity-0 shadow-md transition-opacity duration-200 group-hover/demo:opacity-100 [a:focus-visible_&]:opacity-100">
                  {demoTooltip}
                </span>
              )}
            </span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
