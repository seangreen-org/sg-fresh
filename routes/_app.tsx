import { type PageProps } from '$fresh/server.ts';

export default function App({ Component }: PageProps) {
  return (
    <html lang="zxx">
      <head>
        <title>sg-1981</title>
        <meta name="description" content="Sean Green"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon.png" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="192417e2-392b-4ac0-bbbe-f1d0c25fb369"></script>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
