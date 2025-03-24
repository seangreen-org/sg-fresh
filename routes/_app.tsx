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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💚</text></svg>" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="192417e2-392b-4ac0-bbbe-f1d0c25fb369"></script>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
