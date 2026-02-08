'use client';

import Image from 'next/image';
import Link from 'next/link';
import { homeCopy, localeOptions } from '../locales';
import styles from './LayeredShapes.module.css';
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';

interface Props {
  lang: string;
}

export default function LayeredShapes({ lang }: Props) {
  const copy = homeCopy[lang as keyof typeof homeCopy] ?? homeCopy.en;
  const containerRef = useRef<HTMLDivElement>(null);

  // Target position (where the mouse is)
  const mousePos = useRef({ x: 0, y: 0 });
  // Current position (where the spotlight is, smoothly catching up)
  const spotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initial position in the center
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = { x: rect.width / 2, y: rect.height / 2 };
      spotPos.current = { x: rect.width / 2, y: rect.height / 2 };
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768 || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    let animationFrameId: number;

    const animate = () => {
      if (window.innerWidth >= 768 && containerRef.current) {
        const lerpFactor = 0.1;

        spotPos.current.x +=
          (mousePos.current.x - spotPos.current.x) * lerpFactor;
        spotPos.current.y +=
          (mousePos.current.y - spotPos.current.y) * lerpFactor;

        containerRef.current.style.setProperty('--x', `${spotPos.current.x}px`);
        containerRef.current.style.setProperty('--y', `${spotPos.current.y}px`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-start md:justify-center py-12 md:py-20 overflow-x-hidden bg-slate-50">
      {/* Background Shapes Container - Use fixed or absolute with full height */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Base Layer - Blue Shapes */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-[5%] right-[5%] w-64 h-64 md:w-96 md:h-96 bg-[#1E4D8F]/5 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] shadow-lg animate-float-slow"></div>
          <div className="absolute top-[60%] left-[5%] w-56 h-56 md:w-80 md:h-80 bg-[#1E4D8F]/5 rotate-45 shadow-lg animate-float-slow [animation-delay:1s]"></div>
          <div className="hidden md:block absolute top-[25%] left-[15%] w-64 h-64 bg-[#1E4D8F]/8 rounded-full shadow-xl animate-float-medium"></div>
          <div className="absolute bottom-[5%] right-[10%] w-48 h-48 md:w-72 md:h-72 bg-[#1E4D8F]/8 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-xl animate-float-medium [animation-delay:2s]"></div>
        </div>

        {/* Spotlight Layer - Colored Shapes (Masked) */}
        <div
          className={`${styles.spotlightMask} absolute inset-0 w-full h-full`}>
          <div className="absolute top-[5%] right-[5%] w-64 h-64 md:w-96 md:h-96 bg-[#F58A07]/40 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] shadow-lg animate-float-slow"></div>
          <div className="absolute top-[60%] left-[5%] w-56 h-56 md:w-80 md:h-80 bg-[#E16036]/40 rotate-45 shadow-lg animate-float-slow [animation-delay:1s]"></div>
          <div className="hidden md:block absolute top-[25%] left-[15%] w-64 h-64 bg-[#B6C649]/40 rounded-full shadow-xl animate-float-medium"></div>
          <div className="absolute bottom-[5%] right-[10%] w-48 h-48 md:w-72 md:h-72 bg-[#E9FAE3] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-xl animate-float-medium [animation-delay:2s]"></div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center px-6 md:px-12">
        {/* Profile Image Column */}
        <div className="lg:col-span-2 flex justify-center lg:justify-end">
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
        </div>

        {/* Text Content Column */}
        <div className="lg:col-span-3 text-center lg:text-left space-y-8">
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
            <Link
              href={`/${lang}/projects`}
              className="w-full sm:w-auto text-center px-8 py-4 bg-[#1E4D8F] text-white font-bold rounded-xl hover:bg-[#163B6E] transition-all shadow-xl shadow-[#1E4D8F]/25 hover:-translate-y-1 active:scale-95">
              {copy.viewMyWork}
            </Link>

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
        </div>
      </div>
    </div>
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
