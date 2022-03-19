import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../graphql/generated/graphql'
import { betterQueryUpdate } from '../utils/betterUpdateQuery'

const client = createClient({
  url: 'http://127.0.0.1:8080/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (result, args, cache, info) => {
          betterQueryUpdate<LoginMutation, MeQuery>(cache, { query: MeDocument }, result, (data, query) => data.login.errors ? query : { me: data.login });
        },
        register: (result, args, cache, info) => {
          betterQueryUpdate<RegisterMutation, MeQuery>(cache, { query: MeDocument }, result, (data, query) => data.register.errors ? query : { me: data.register });
        },
        logout: (result, args, cache, info) => {
          betterQueryUpdate<LogoutMutation, MeQuery>(cache, { query: MeDocument }, result, () => ({ me: null }));
        }
      }
    }
  }), fetchExchange]
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