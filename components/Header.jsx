import { asset, Head } from '$fresh/runtime.ts';

export default function Header() {
  return (
    <>
      <Head>
        <title>sg-1981</title>
        <meta name="description" content="Sean Green"/>
        <meta name="theme-color" content="#000000"/>
        <link rel="stylesheet" href={asset('/style.css')} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💚</text></svg>" />
      </Head>
    </>
  );
}
