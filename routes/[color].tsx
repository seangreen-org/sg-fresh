import type { PageProps } from "$fresh/server.ts";
import type { JSX } from 'preact/jsx-runtime';
import Header from '@components/Header.tsx';
import GalaxyBackground from '@components/GalaxyBackground.tsx';
import Heart from '@islands/Heart.tsx';

export default function ColorPage({ params }: PageProps): JSX.Element {
  const color = params.color;

  return (
    <main>
      <Header />
      <GalaxyBackground />
      <Heart initialColor={color} />
    </main>
  );
}
