'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { homeCopy, localeOptions } from '../locales';
import SpotlightBackground, {
  type ShapeDefinition,
} from './SpotlightBackground';
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa6';

interface Props {
  lang: string;
}

const homeShapes: ShapeDefinition[] = [
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

export default function LayeredShapes({ lang }: Props) {
  const copy = homeCopy[lang as keyof typeof homeCopy] ?? homeCopy.en;

  return (
    <SpotlightBackground
      shapes={homeShapes}
      containerClassName="relative min-h-screen w-full flex flex-col items-center justify-start md:justify-center py-12 md:py-20 overflow-x-hidden bg-slate-50">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center px-6 md:px-12">
        {/* Profile Image Column */}
        <motion.div
          className="lg:col-span-2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}>
          <div className="relative group w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 shrink-0">
            <div className="absolute inset-0 bg-[#1E4D8F] rounded-3xl transform -rotate-6 scale-105 transition-transform group-hover:rotate-0 opacity-10 lg:opacity-100"></div>
            <div className="absolute inset-0 border-2 border-[#1E4D8F] rounded-3xl transform rotate-3 scale-105"></div>
            <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/profile.jpeg"
                alt="Profile Picture"
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Text Content Column */}
        <motion.div
          className="lg:col-span-3 text-center lg:text-left space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}>
          <div className="space-y-4">
            <h2 className="text-[#1E4D8F] font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
              {copy.greeting}
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1]">
              {copy.headlinePrefix}{' '}
              <Link
                href={`/${lang}/web`}
                className="inline-block text-[#1E4D8F] underline decoration-wavy decoration-[#1E4D8F]/30 underline-offset-8 decoration-2 hover:scale-105 transition-transform duration-200">
                {copy.web}
              </Link>{' '}
              &{' '}
              <Link
                href={`/${lang}/mobile`}
                className="inline-block text-[#1E4D8F] underline decoration-wavy decoration-[#1E4D8F]/30 underline-offset-8 decoration-2 hover:scale-105 transition-transform duration-200">
                {copy.mobile}
              </Link>
              {lang === 'zh-CN' ? '构建产品' : '.'}
            </h1>
          </div>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
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
              href="mailto:ericdc3365@example.com"
              icon={<FaEnvelope size={28} />}
              label="Email"
            />
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Link
                href={`/${lang}/projects`}
                className="block w-full sm:w-auto text-center px-8 py-4 bg-[#1E4D8F] text-white font-bold rounded-xl hover:bg-[#163B6E] transition-colors shadow-xl shadow-[#1E4D8F]/25">
                {copy.viewMyWork}
              </Link>
            </motion.div>

            <div className="inline-flex rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-1.5 shadow-sm ring-1 ring-slate-900/5">
              {localeOptions.map((option) => {
                const isActive = lang === option.code;
                return (
                  <Link
                    key={option.code}
                    href={`/${option.code}`}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-[#1E4D8F] text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}>
                    {option.label}
                  </Link>
                );
              })}
            </div>
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
      className="p-2 text-slate-400 hover:text-[#1E4D8F] hover:bg-[#1E4D8F]/5 rounded-full transition-all duration-300"
      aria-label={label}>
      {icon}
    </a>
  );
}
