import type { PageProps } from "$fresh/server.ts";
import type { JSX } from 'preact/jsx-runtime';
import Layout from '@components/Layout.tsx';

export default function ColorPage({ params }: PageProps): JSX.Element {
  return <Layout initialColor={params.color} />;
}
