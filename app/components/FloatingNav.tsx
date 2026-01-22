'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaMobileAlt, FaDesktop } from 'react-icons/fa';

export default function FloatingNav({ lang }: { lang: string }) {
  const pathname = usePathname();

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

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
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
    </nav>
  );
}
