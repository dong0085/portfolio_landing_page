'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { homeCopy } from '../locales';
import SpotlightBackground, {
  type ShapeDefinition,
} from './SpotlightBackground';
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaBlog,
  FaEnvelope,
} from 'react-icons/fa6';

interface Props {
  lang: string;
}

const homeShapes: ShapeDefinition[] = [
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

export default function LayeredShapes({ lang }: Props) {
  const copy = homeCopy[lang as keyof typeof homeCopy] ?? homeCopy.en;
  const profileRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 160, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 160, damping: 22 });
  const photoX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const photoY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const photoRotateX = useTransform(smoothY, [-1, 1], [2.5, -2.5]);
  const photoRotateY = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);
  const borderX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const borderY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const plateX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const plateY = useTransform(smoothY, [-1, 1], [-10, 10]);

  const resetProfilePosition = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleProfilePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      shouldReduceMotion ||
      event.pointerType !== 'mouse' ||
      !profileRef.current
    ) {
      return;
    }

    const bounds = profileRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  return (
    <SpotlightBackground
      shapes={homeShapes}
      containerClassName="relative min-h-screen w-full flex flex-col items-center justify-start md:justify-center pt-12 pb-[calc(8rem+env(safe-area-inset-bottom))] md:pt-20 md:pb-32 overflow-x-hidden bg-surface"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center px-6 md:px-12">
        {/* Profile Image Column */}
        <motion.div
          className="lg:col-span-2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div
            ref={profileRef}
            onPointerMove={handleProfilePointerMove}
            onPointerLeave={resetProfilePosition}
            className="relative group w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 shrink-0"
            style={{ perspective: '900px' }}>
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={
                shouldReduceMotion ? undefined : { x: plateX, y: plateY }
              }>
              <div className="absolute inset-0 bg-brand-solid rounded-3xl transform -rotate-6 scale-105 transition-transform group-hover:rotate-0 opacity-10 lg:opacity-100" />
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={
                shouldReduceMotion ? undefined : { x: borderX, y: borderY }
              }>
              <div className="absolute inset-0 border-2 border-brand rounded-3xl transform rotate-3 scale-105" />
            </motion.div>
            <motion.div
              className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl"
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: photoX,
                      y: photoY,
                      rotateX: photoRotateX,
                      rotateY: photoRotateY,
                      transformStyle: 'preserve-3d',
                    }
              }>
              <Image
                src="/profile.jpeg"
                alt="Profile Picture"
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 320px"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content Column */}
        <motion.div
          className="lg:col-span-3 text-center lg:text-left space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="space-y-4">
            <h2 className="text-brand font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
              {copy.greeting}
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-content leading-[1.1]">
              {copy.headlinePrefix}{' '}
              <Link
                href={`/${lang}/web`}
                className="inline-block text-brand underline decoration-wavy decoration-brand/30 underline-offset-8 decoration-2 hover:scale-105 transition-transform duration-200"
              >
                {copy.web}
              </Link>{' '}
              &{' '}
              <Link
                href={`/${lang}/mobile`}
                className="inline-block text-brand underline decoration-wavy decoration-brand/30 underline-offset-8 decoration-2 hover:scale-105 transition-transform duration-200"
              >
                {copy.mobile}
              </Link>
              {lang === 'zh-CN' ? '构建产品' : '.'}
            </h1>
          </div>

          <p className="text-muted text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
            {copy.intro}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
            <SocialLink
              href="https://linkedin.com/in/chengdong01"
              icon={<FaLinkedin size={28} />}
              label="LinkedIn"
            />
            <SocialLink
              href="https://instagram.com/dc3365_"
              icon={<FaInstagram size={28} />}
              label="Instagram"
            />
            <SocialLink
              href="https://github.com/dong0085"
              icon={<FaGithub size={28} />}
              label="GitHub"
            />
            <SocialLink
              href="https://dong0085.github.io"
              icon={<FaBlog size={28} />}
              label="Blog"
            />
            <SocialLink
              href="mailto:eric.cheng.dong@gmail.com"
              icon={<FaEnvelope size={28} />}
              label="Email"
            />
          </div>

          <div className="pt-8 flex items-center justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href={`/${lang}/projects`}
                className="block w-full sm:w-auto text-center px-8 py-4 bg-brand-solid text-white font-bold rounded-xl hover:bg-brand-solid-hover transition-colors shadow-xl shadow-brand-solid/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:ring-offset-surface"
              >
                {copy.viewMyWork}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SpotlightBackground>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-subtle hover:text-brand hover:bg-brand/5 rounded-full transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
