import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

import { theme } from 'styles/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Next Boilerplate</title>
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
