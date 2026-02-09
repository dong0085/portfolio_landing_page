'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaHome, FaMobileAlt, FaDesktop } from 'react-icons/fa';

const SCROLL_DELTA = 30;
const TOP_THRESHOLD = 50;

export default function FloatingNav({ lang }: { lang: string }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Always show near top of page
    if (currentScrollY < TOP_THRESHOLD) {
      setIsVisible(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    const delta = currentScrollY - lastScrollY.current;

    // Ignore small movements (prevent jitter)
    if (Math.abs(delta) < SCROLL_DELTA) return;

    // Scroll UP → show nav (user wants to navigate)
    // Scroll DOWN → hide nav (user is reading)
    setIsVisible(delta < 0);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, handleScroll]);

  const navItems = [
    {
      href: `/${lang}`,
      icon: <FaHome size={20} />,
      label: 'Home',
      isActive: pathname === `/${lang}`,
    },
    {
      href: `/${lang}/mobile`,
      icon: <FaMobileAlt size={20} />,
      label: 'Mobile',
      isActive: pathname === `/${lang}/mobile`,
    },
    {
      href: `/${lang}/web`,
      icon: <FaDesktop size={20} />,
      label: 'Web',
      isActive: pathname === `/${lang}/web`,
    },
  ];

  const showNav = !isMobile || isVisible;

  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          className="fixed bottom-6 md:bottom-12 left-1/2 z-50"
          initial={{ x: '-50%', y: 80, opacity: 0 }}
          animate={{ x: '-50%', y: 0, opacity: 1 }}
          exit={{ x: '-50%', y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border border-slate-200 ring-1 ring-[#1E4D8F]/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`p-3 rounded-full transition-all duration-300 ${
                  item.isActive
                    ? 'bg-[#1E4D8F] text-white shadow-lg shadow-[#1E4D8F]/30 scale-110'
                    : 'text-slate-600 hover:text-[#1E4D8F] hover:bg-slate-100 hover:scale-105'
                }`}>
                {item.icon}
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
