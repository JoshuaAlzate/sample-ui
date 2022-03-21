import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
  )
}

export default MyApp;