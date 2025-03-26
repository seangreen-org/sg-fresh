import type { JSX } from 'preact/jsx-runtime';
import Header from './Header.tsx';
import GalaxyBackground from './GalaxyBackground.tsx';
import Heart from '@islands/Heart.tsx';

const rotationColorMap = {
  green: 0,
  blue: 70,
  pink: 150,
  red: 230,
  orange: 260,
} as const;

type ColorName = keyof typeof rotationColorMap;
const colorNames = Object.keys(rotationColorMap) as ColorName[];

interface LayoutProps {
  initialColor?: string;
}

export default function Layout({ initialColor }: LayoutProps): JSX.Element {
  const validatedColor = (() => {
    const index = colorNames.indexOf(initialColor as ColorName);
    return index >= 0
      ? (initialColor as ColorName)
      : (Object.keys(rotationColorMap)[0] as ColorName);
  })();

  return (
    <main>
      <Header />
      <GalaxyBackground />
      <Heart initialColor={validatedColor} />
    </main>
  );
}
