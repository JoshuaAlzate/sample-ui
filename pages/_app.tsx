import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { createClient, Provider } from 'urql'

const client = createClient({
  url: 'http://127.0.0.1:8080/graphql',
  fetchOptions: {
    credentials: 'include'
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp;