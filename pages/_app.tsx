import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {WagmiProvider} from '@/hooks/wagmiProvider'

const theme = extendTheme({
  styles: {
    global: {}
  },
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nextjs web3 frontend</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
      </Head>

      <ChakraProvider theme={theme}>
        <WagmiProvider>
          <Component {...pageProps} />
        </WagmiProvider>
      </ChakraProvider>
    </>);
}
