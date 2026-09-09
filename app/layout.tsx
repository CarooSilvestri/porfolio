import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Caro Silvestri — Diseñadora digital & Creative Developer',
  description:
    'Portfolio de Caro Silvestri, diseñadora digital y Creative Developer. Diseño, front-end e interacción para experiencias web con identidad.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
