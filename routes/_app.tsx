import { type PageProps } from '$fresh/server.ts';
import { JSX } from 'preact/jsx-runtime';

export default function App({ Component }: PageProps): JSX.Element {
  return (
    <html lang='zxx'>
      <head>
        <title>SG-1981x</title>
        <meta name='description' content='Sean Green' />
        <meta name='theme-color' content='#000000' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <link rel='stylesheet' href='/styles.css' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicons/favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='/favicons/favicon.svg' />
        <link rel='shortcut icon' href='/favicons/favicon.ico' />
        <link rel='manifest' href='/site.webmanifest' />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

        <script
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='192417e2-392b-4ac0-bbbe-f1d0c25fb369'
        />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
