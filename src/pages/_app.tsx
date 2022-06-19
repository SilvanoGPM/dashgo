import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

import { SidebarDrawerProvider } from 'contexts/SidebarDrawerContext';
import { makeServer } from 'services/mirage';
import { theme } from 'styles/theme';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Head>
          <title>Next Boilerplate</title>
        </Head>

        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}

export default App;
