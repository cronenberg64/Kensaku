import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kensaku (研作) - Academic Research Collaboration Platform',
  description: 'Empowering Japanese universities with AI-powered research collaboration tools. Connect, collaborate, and create groundbreaking research.',
  keywords: 'academic research, collaboration, Japanese universities, AI-powered, research topics, publishing',
  authors: [{ name: 'Kensaku Team' }],
  openGraph: {
    title: 'Kensaku (研作) - Academic Research Collaboration',
    description: 'The premier platform for Japanese university research collaboration',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}