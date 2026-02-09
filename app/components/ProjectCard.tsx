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

  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <div className="relative aspect-video bg-slate-100">
        <Image
          src={project.thumbnailSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>

        <p className="text-slate-600 text-sm leading-relaxed flex-1">
          {description}
        </p>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {labels.techStack}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
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
            className="inline-flex items-center gap-1.5 mt-1 text-sm font-semibold text-[#1E4D8F] hover:underline">
            {labels.viewDemo} &rarr;
          </a>
        )}
      </div>
    </motion.div>
  );
}
