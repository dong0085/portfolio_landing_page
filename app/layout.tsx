import type { Metadata } from 'next';
import { Google_Sans, Anek_Latin, Noto_Sans_SC } from 'next/font/google';
import './globals.css';

const anekLatin = Anek_Latin({
  variable: '--font-anek-latin',
  subsets: ['latin'],
});

const googleSans = Google_Sans({
  variable: '--font-google-sans',
  subsets: ['latin'],
});

const notoSansSc = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eric (Cheng)',
  description: "Eric's landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anekLatin.variable} ${googleSans.variable} ${notoSansSc.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
