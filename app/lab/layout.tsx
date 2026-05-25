import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab — verlet bio',
  description:
    'An interactive Verlet-integrated typography experiment. Drag any letter; press F for gravity.',
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
