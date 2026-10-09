import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab — verlet bio',
  description:
    'An interactive Verlet-integrated typography experiment. Grab any letter and pull, fling it, or let the whole bio fall.',
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
