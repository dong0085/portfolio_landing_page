'use client';

import { motion } from 'motion/react';
import SpotlightBackground from '../../components/SpotlightBackground';
import PageTransition from '../../components/PageTransition';
import ProjectCard from '../../components/ProjectCard';
import { webCopy } from '../../locales';
import { webProjects } from '../../data/webProjects';
import { webShapes } from './webShapes';

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

interface Props {
  lang: string;
}

export default function WebContent({ lang }: Props) {
  const copy = webCopy[lang as keyof typeof webCopy] ?? webCopy.en;

  return (
    <SpotlightBackground
      shapes={webShapes}
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
                  labels={{ viewDemo: copy.viewDemo, techStack: copy.techStack }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <motion.p
              className="text-slate-400 text-lg font-light italic"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              {copy.empty}
            </motion.p>
          </div>
        )}
      </PageTransition>
    </SpotlightBackground>
  );
}
