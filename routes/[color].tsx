import type { PageProps } from "$fresh/server.ts";
import type { JSX } from "preact/jsx-runtime";
import Heart from "@islands/Heart.tsx";

export default function ColorPage({ params }: PageProps): JSX.Element {
  return <Heart initialColor={params.color} />;
}
