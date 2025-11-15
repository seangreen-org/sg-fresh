import type { JSX } from "preact/jsx-runtime";
import Footnote from "@components/Footnote.tsx";
import GalaxyBackground from "@islands/GalaxyBackground.tsx";

interface LayoutProps {
  Component: () => JSX.Element;
}

export default function Layout({ Component }: LayoutProps): JSX.Element {
  return (
    <main>
      <Footnote />
      <GalaxyBackground />
      <Component />
    </main>
  );
}
