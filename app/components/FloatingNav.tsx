'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import {
  FaDesktop,
  FaFolderOpen,
  FaGlobe,
  FaHome,
  FaMobileAlt,
} from 'react-icons/fa';
import { localeOptions, navCopy } from '../locales';

interface FloatingNavProps {
  lang: string;
}

function getLocalizedPath(pathname: string, nextLang: string) {
  const [, ...routeSegments] = pathname.split('/').filter(Boolean);
  return `/${[nextLang, ...routeSegments].join('/')}`;
}

export default function FloatingNav({ lang }: FloatingNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const copy = navCopy[lang as keyof typeof navCopy] ?? navCopy.en;
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';

  const navItems = [
    {
      href: `/${lang}`,
      icon: FaHome,
      label: copy.home,
    },
    {
      href: `/${lang}/projects`,
      icon: FaFolderOpen,
      label: copy.projects,
    },
    {
      href: `/${lang}/web`,
      icon: FaDesktop,
      label: copy.web,
    },
    {
      href: `/${lang}/mobile`,
      icon: FaMobileAlt,
      label: copy.mobile,
    },
  ];

  return (
    <motion.nav
      aria-label={copy.primaryNavigation}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-50 max-w-[calc(100vw-1rem)] -translate-x-1/2 md:bottom-8"
      initial={shouldReduceMotion ? false : { y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 320, damping: 28 }
      }>
      <div className="flex items-center gap-1 rounded-2xl border border-white/80 bg-white/90 p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.16)] ring-1 ring-slate-900/5 backdrop-blur-xl md:rounded-full">
        {navItems.map((item) => {
          const isHome = item.href === `/${lang}`;
          const isActive = isHome
            ? normalizedPathname === item.href
            : normalizedPathname === item.href ||
              normalizedPathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative isolate flex min-h-12 min-w-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-1 text-[10px] font-semibold leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4D8F] focus-visible:ring-offset-2 md:min-h-11 md:flex-row md:gap-2 md:rounded-full md:px-3 md:text-sm ${
                isActive
                  ? 'text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#1E4D8F]'
              }`}>
              {isActive && (
                <motion.span
                  layoutId="floating-nav-active-pill"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-xl bg-[#1E4D8F] shadow-sm md:rounded-full"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 420, damping: 32 }
                  }
                />
              )}
              <Icon aria-hidden="true" className="size-[18px] shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}

        <div className="ml-0.5 flex min-h-12 shrink-0 items-center border-l border-slate-200 pl-1.5 md:min-h-11 md:pl-2">
          <div className="relative flex items-center">
            <FaGlobe
              aria-hidden="true"
              className="pointer-events-none absolute left-2 size-3.5 text-slate-500"
            />
            <select
              value={lang}
              aria-label={copy.language}
              title={copy.language}
              onChange={(event) => {
                const nextLang = event.target.value;

                if (nextLang !== lang) {
                  const nextPath = getLocalizedPath(pathname, nextLang);
                  router.push(
                    `${nextPath}${window.location.search}${window.location.hash}`,
                  );
                }
              }}
              className="h-10 w-16 cursor-pointer rounded-xl border-0 bg-transparent py-0 pl-7 pr-1 text-xs font-bold text-slate-600 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-[#1E4D8F] focus-visible:ring-offset-1 md:w-[4.5rem]">
              {localeOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
