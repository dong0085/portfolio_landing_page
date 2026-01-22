import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa6';
import { homeCopy, localeOptions } from '../locales';

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const copy = homeCopy[lang as keyof typeof homeCopy] ?? homeCopy.en;

  return (
    <main className="min-h-screen relative flex items-center justify-center bg-slate-50 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob [animation-delay:2s]"></div>

        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob [animation-delay:4s]"></div>
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

        <div className="text-center md:text-left space-y-6">
          <div className="space-y-2">
            <h2 className="text-[#1E4D8F] font-medium tracking-wide uppercase text-sm">
              Hello, I&apos;m Eric
            </h2>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Building things for{' '}
              <Link
                href={`/${lang}/web`}
                className="inline-block text-[#1E4D8F] underline decoration-wavy decoration-[#163B6E] underline-offset-4 decoration-2 hover:scale-110 transition-transform duration-200 ease-out">
                web
              </Link>{' '}
              &{' '}
              <Link
                href={`/${lang}/mobile`}
                className="inline-block text-[#1E4D8F] underline decoration-wavy decoration-[#163B6E] underline-offset-4 decoration-2 hover:scale-110 transition-transform duration-200 ease-out">
                mobile
              </Link>
              .
            </h1>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            {copy.intro}
          </p>

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
              View My Work
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
