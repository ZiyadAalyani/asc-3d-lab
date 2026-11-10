import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASC High-Trust Technical 3D Physics Laboratory · By Ziyad Aalyani B001',
  description: 'Advanced 3D Physics Simulator with Resonance Tube, Metrology, Electromagnetism, AI Notes, and SKT Sir AI Tutor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
