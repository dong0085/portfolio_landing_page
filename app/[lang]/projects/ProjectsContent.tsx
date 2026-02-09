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
    baseColor: 'bg-[#1E4D8F]/5',
    spotlightColor: 'bg-[#F58A07]/40',
    animation: 'animate-float-slow',
    extraClasses: 'shadow-lg',
  },
  {
    position: 'top-[60%] left-[5%]',
    size: 'w-56 h-56 md:w-80 md:h-80',
    borderRadius: '',
    baseColor: 'bg-[#1E4D8F]/5',
    spotlightColor: 'bg-[#E16036]/40',
    animation: 'animate-float-slow',
    extraClasses: 'rotate-45 shadow-lg [animation-delay:1s]',
  },
  {
    position: 'top-[25%] left-[15%]',
    size: 'w-64 h-64',
    borderRadius: 'rounded-full',
    baseColor: 'bg-[#1E4D8F]/8',
    spotlightColor: 'bg-[#B6C649]/40',
    animation: 'animate-float-medium',
    extraClasses: 'shadow-xl',
    desktopOnly: true,
  },
  {
    position: 'bottom-[5%] right-[10%]',
    size: 'w-48 h-48 md:w-72 md:h-72',
    borderRadius: 'rounded-[30%_70%_70%_30%/30%_30%_70%_70%]',
    baseColor: 'bg-[#1E4D8F]/8',
    spotlightColor: 'bg-[#E9FAE3]',
    animation: 'animate-float-medium',
    extraClasses: 'shadow-xl [animation-delay:2s]',
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
      containerClassName="relative min-h-screen w-full flex flex-col items-center justify-start py-20 md:py-28 overflow-x-hidden bg-slate-50">
      <PageTransition className="max-w-5xl w-full px-6 md:px-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            {copy.pageTitle}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            {copy.pageSubtitle}
          </p>
        </div>

        {/* Web Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            {copy.webSection}
          </h2>
          {webProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
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
          ) : (
            <div className="text-center py-12">
              <motion.p
                className="text-slate-400 text-lg font-light italic"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                {copy.emptyWeb}
              </motion.p>
            </div>
          )}
        </section>

        {/* Mobile Projects Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            {copy.mobileSection}
          </h2>
          {mobileProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
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
          ) : (
            <div className="text-center py-12">
              <motion.p
                className="text-slate-400 text-lg font-light italic"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                {copy.emptyMobile}
              </motion.p>
            </div>
          )}
        </section>
      </PageTransition>
    </SpotlightBackground>
  );
}
