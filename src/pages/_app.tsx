import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

import { SidebarDrawerProvider } from 'contexts/SidebarDrawerContext';
import { theme } from 'styles/theme';

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
