import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <link rel="manifest" href="/manifest.json" />

        <meta
          name="description"
          content="Interfaces dos futuro para dados do futuro."
        />

        <meta name="theme-color" content="#D53F8C" />

        <link rel="shortuct icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
