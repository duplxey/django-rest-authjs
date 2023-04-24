import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import Layout from "@/components/layout";

export const theme = extendTheme({});

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}
