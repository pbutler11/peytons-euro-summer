import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "peyton's euro summer 2026 ✿",
  description: 'a travel diary from somewhere with better bread',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="browser-window">
          <div className="browser-titlebar">
            <span>★ peyton's euro summer 2026 ★ — Netscape Navigator</span>
            <span className="browser-controls">
              <span>_</span>
              <span>□</span>
              <span>x</span>
            </span>
          </div>
          <div className="browser-content">{children}</div>
        </div>
      </body>
    </html>
  );
}