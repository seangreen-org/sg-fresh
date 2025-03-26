import type { JSX } from 'preact/jsx-runtime';
import Header from './Header.tsx';
import GalaxyBackground from './GalaxyBackground.tsx';
import Heart from '@islands/Heart.tsx';

interface LayoutProps {
  initialColor?: string;
}

export default function Layout({ initialColor }: LayoutProps): JSX.Element {
  return (
    <main>
      <Header />
      <GalaxyBackground />
      <Heart initialColor={initialColor} />
    </main>
  );
}
