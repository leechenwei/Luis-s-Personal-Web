import Head from 'next/head';
import Portfolio from '@/components/Portfolio';

export default function Home() {
  return (
    <>
      <Head>
        <title>Luis's Personal Web</title>
        <meta name="description" content="Luis Lee Chen Wei's Portfolio" />
      </Head>
      <main>
        <Portfolio />
      </main>
    </>
  );
}
