import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa6';

export default function Home({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <main className="min-h-screen relative flex items-center justify-center bg-slate-50 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob [animation-delay:2s]"></div>

        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative group mx-auto md:mx-0 w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 bg-indigo-500 rounded-3xl transform -rotate-6 scale-105 transition-transform group-hover:rotate-0 opacity-20 md:opacity-100"></div>
          <div className="absolute inset-0 border-2 border-indigo-500 rounded-3xl transform rotate-3 scale-105"></div>

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
            <h2 className="text-indigo-600 font-medium tracking-wide uppercase text-sm">
              Hello, I&apos;m Eric
            </h2>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Building things for{' '}
              <Link
                href={`/${lang}/web`}
                className="inline-block text-indigo-600 underline decoration-wavy decoration-indigo-800 underline-offset-4 decoration-2 hover:scale-110 transition-transform duration-200 ease-out">
                web
              </Link>{' '}
              &{' '}
              <Link
                href={`/${lang}/mobile`}
                className="inline-block text-indigo-600 underline decoration-wavy decoration-indigo-800 underline-offset-4 decoration-2 hover:scale-110 transition-transform duration-200 ease-out">
                mobile
              </Link>
              .
            </h1>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            I&apos;m a student at Algonquin College passionate about crafting
            clean user experiences. When I&apos;m not coding, I&apos;m exploring
            the city through the lens of my camera.
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

          <div className="pt-4">
            <Link
              href={`/${lang}/projects`}
              className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-indigo-500/20">
              View My Work
            </Link>
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
      className="text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all duration-300"
      aria-label={label}>
      {icon}
    </a>
  );
}
