'use client';

import { motion } from 'motion/react';
import SpotlightBackground from '../../components/SpotlightBackground';
import PageTransition from '../../components/PageTransition';
import ProjectCard from '../../components/ProjectCard';
import { projectsCopy } from '../../locales';
import { webProjects } from '../../data/webProjects';
import { mobileProjects } from '../../data/mobileProjects';
import type { ShapeDefinition } from '../../components/SpotlightBackground';

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const projectsShapes: ShapeDefinition[] = [
  {
    position: 'top-[5%] right-[5%]',
    size: 'w-64 h-64 md:w-96 md:h-96',
    borderRadius: 'rounded-[40%_60%_70%_30%/60%_30%_70%_40%]',
    baseColor: 'bg-[#1E4D8F]/5 dark:bg-[#8AB6EC]/10',
    spotlightColor: 'bg-[#F58A07]/40 dark:bg-[#F58A07]/25',
    extraClasses: 'shadow-lg dark:shadow-none',
  },
  {
    position: 'top-[60%] left-[5%]',
    size: 'w-56 h-56 md:w-80 md:h-80',
    borderRadius: '',
    baseColor: 'bg-[#1E4D8F]/5 dark:bg-[#8AB6EC]/10',
    spotlightColor: 'bg-[#E16036]/40 dark:bg-[#E16036]/25',
    extraClasses: 'rotate-45 shadow-lg dark:shadow-none',
  },
  {
    position: 'top-[25%] left-[15%]',
    size: 'w-64 h-64',
    borderRadius: 'rounded-full',
    baseColor: 'bg-[#1E4D8F]/8 dark:bg-[#8AB6EC]/15',
    spotlightColor: 'bg-[#B6C649]/40 dark:bg-[#B6C649]/25',
    extraClasses: 'shadow-xl dark:shadow-none',
    desktopOnly: true,
  },
  {
    position: 'bottom-[5%] right-[10%]',
    size: 'w-48 h-48 md:w-72 md:h-72',
    borderRadius: 'rounded-[30%_70%_70%_30%/30%_30%_70%_70%]',
    baseColor: 'bg-[#1E4D8F]/8 dark:bg-[#8AB6EC]/15',
    spotlightColor: 'bg-[#E9FAE3] dark:bg-[#E9FAE3]/20',
    extraClasses: 'shadow-xl dark:shadow-none',
  },
];

interface Props {
  lang: string;
}

export default function ProjectsContent({ lang }: Props) {
  const copy =
    projectsCopy[lang as keyof typeof projectsCopy] ?? projectsCopy.en;

  return (
    <SpotlightBackground
      shapes={projectsShapes}
      containerClassName="relative min-h-screen w-full flex flex-col items-center justify-start pt-20 pb-[calc(8rem+env(safe-area-inset-bottom))] md:pt-28 md:pb-32 overflow-x-hidden bg-surface">
      <PageTransition className="max-w-5xl w-full px-6 md:px-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-content mb-4">
            {copy.pageTitle}
          </h1>
          <p className="text-muted text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            {copy.pageSubtitle}
          </p>
        </div>

        {/* Web Projects Section */}
        {webProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-content mb-6">
              {copy.webSection}
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}>
              {webProjects.map((project) => (
                <motion.div key={project.id} variants={cardVariant}>
                  <ProjectCard
                    project={project}
                    lang={lang}
                    labels={{
                      viewDemo: copy.viewDemo,
                      techStack: copy.techStack,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Mobile Projects Section */}
        {mobileProjects.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-content mb-6">
              {copy.mobileSection}
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}>
              {mobileProjects.map((project) => (
                <motion.div key={project.id} variants={cardVariant}>
                  <ProjectCard
                    project={project}
                    lang={lang}
                    labels={{
                      viewDemo: copy.viewDemo,
                      techStack: copy.techStack,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}
      </PageTransition>
    </SpotlightBackground>
  );
}
