import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume — Jesse Hernandez',
  description:
    'Resume for Jesse Hernandez (jessebubble) — software developer & ecosystem architect, San Antonio, TX.',
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
