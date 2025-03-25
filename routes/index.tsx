import type { JSX } from 'preact/jsx-runtime';
import Header from '@components/Header.tsx';
import GalaxyBackground from '@components/GalaxyBackground.tsx';
import Heart from '@islands/Heart.tsx';

export default function Home(): JSX.Element {
  return (
    <main>
      <Header />
      <GalaxyBackground />
      <Heart />
    </main>
  );
}
