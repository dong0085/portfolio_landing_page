import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa6';
import { homeCopy, localeOptions } from '../locales';
import FloatingNav from '../components/FloatingNav';

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const copy = homeCopy[lang as keyof typeof homeCopy] ?? homeCopy.en;

  return (
    <>
      <FloatingNav lang={lang} />
      <main className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* Layer 1 - Deepest */}
          <div className="absolute top-[10%] right-[15%] w-64 h-64 md:w-96 md:h-96 bg-[#1E4D8F]/5 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] shadow-lg animate-float-slow"></div>
          <div className="absolute bottom-[20%] left-[10%] w-56 h-56 md:w-80 md:h-80 bg-[#1E4D8F]/5 rotate-45 shadow-lg animate-float-slow [animation-delay:1s]"></div>

          {/* Layer 2 - Middle */}
          <div className="hidden md:block absolute top-[30%] left-[20%] w-64 h-64 bg-[#1E4D8F]/8 rounded-full shadow-xl animate-float-medium"></div>
          <div className="absolute bottom-[15%] right-[25%] w-48 h-48 md:w-72 md:h-72 bg-[#1E4D8F]/8 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-xl animate-float-medium [animation-delay:2s]"></div>

          {/* Layer 3 - Front */}
          <div className="hidden md:block absolute top-[50%] right-[10%] w-48 h-48 bg-[#1E4D8F]/12 rotate-12 shadow-2xl animate-float-fast"></div>
          <div className="absolute top-[15%] left-[40%] w-40 h-40 md:w-56 md:h-56 bg-[#1E4D8F]/12 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] shadow-2xl animate-float-fast [animation-delay:1.5s]"></div>
        </div>

        <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative group mx-auto md:mx-0 w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-[#1E4D8F] rounded-3xl transform -rotate-6 scale-105 transition-transform group-hover:rotate-0 opacity-20 md:opacity-100"></div>
            <div className="absolute inset-0 border-2 border-[#1E4D8F] rounded-3xl transform rotate-3 scale-105"></div>

            <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/profile.jpeg"
                alt="Profile Picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* Salut */}
          <div className="text-center md:text-left space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#1E4D8F] font-medium tracking-wide uppercase text-sm">
                {copy.greeting}
              </h2>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                {copy.headlinePrefix}{' '}
                <Link
                  href={`/${lang}/web`}
                  className="inline-block text-[#1E4D8F] underline decoration-wavy decoration-[#163B6E] underline-offset-4 decoration-2 hover:scale-110 transition-transform duration-200 ease-out">
                  {copy.web}
                </Link>{' '}
                &{' '}
                <Link
                  href={`/${lang}/mobile`}
                  className="inline-block text-[#1E4D8F] underline decoration-wavy decoration-[#163B6E] underline-offset-4 decoration-2 hover:scale-110 transition-transform duration-200 ease-out">
                  {copy.mobile}
                </Link>
                {lang === 'zh-CN' ? '构建产品' : '.'}
              </h1>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              {copy.intro}
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
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

            <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
              <Link
                href={`/${lang}/projects`}
                className="inline-block px-6 py-3 bg-[#1E4D8F] text-white font-medium rounded-lg hover:bg-[#163B6E] transition-colors shadow-lg shadow-[#1E4D8F]/20">
                {copy.viewMyWork}
              </Link>
              <div
                role="group"
                aria-label="Language"
                className="inline-flex rounded-lg border border-slate-200 bg-white/90 p-1 shadow-sm ring-1 ring-[#1E4D8F]/10">
                {localeOptions.map((option) => {
                  const isActive = lang === option.code;

                  return (
                    <Link
                      key={option.code}
                      href={`/${option.code}`}
                      aria-current={isActive ? 'page' : undefined}
                      className={`px-3 py-1 text-sm font-semibold rounded-md transition-all duration-200 ${
                        isActive
                          ? 'bg-[#1E4D8F] text-white shadow-lg shadow-[#1E4D8F]/20'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:shadow-sm hover:scale-[1.03]'
                      }`}>
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
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
      className="text-slate-400 hover:text-[#1E4D8F] hover:scale-110 transition-all duration-300"
      aria-label={label}>
      {icon}
    </a>
  );
}
