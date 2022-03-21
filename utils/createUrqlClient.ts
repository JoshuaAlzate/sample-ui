import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from '@urql/exchange-graphcache'
import { LoginMutation, MeQuery, MeDocument, RegisterMutation, LogoutMutation } from "../graphql/generated/graphql";
import { betterQueryUpdate } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://127.0.0.1:8080/graphql',
  fetchOptions: {
    credentials: 'include' as any
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
  }), ssrExchange, fetchExchange]
});