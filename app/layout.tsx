import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ServeX - 100+ Services E-Commerce Marketplace',
  description: 'Hire carpenters, electricians, software developers, gym trainers, security guards, market suppliers, and over 100+ services with instant AI matching.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
