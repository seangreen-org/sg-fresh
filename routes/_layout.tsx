import type { JSX } from "preact/jsx-runtime";
import Header from "@components/Header.tsx";
import GalaxyBackground from "@components/GalaxyBackground.tsx";

interface LayoutProps {
  Component: () => JSX.Element;
}

export default function Layout({ Component }: LayoutProps): JSX.Element {
  return (
    <main>
      <Header />
      <GalaxyBackground />
      <Component />
    </main>
  );
}
