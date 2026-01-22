import type { Metadata } from 'next';
import { Inter, Anek_Latin, Noto_Sans_SC } from 'next/font/google';
import './globals.css';

const anekLatin = Anek_Latin({
  variable: '--font-anek-latin',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const notoSansSc = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eric (Cheng)',
  description: "Eric's landing page",
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anekLatin.variable} ${inter.variable} ${notoSansSc.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
