import { onError } from 'apollo-link-error'
import fetch from 'unfetch'
import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-community/async-storage";
const initApollo = () => {
  const httpLink = createHttpLink({
    fetch: fetch as any,
    uri: 'http://192.168.1.2:5000/graphql',
    credentials: 'include',
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        
      )
    if (networkError) {
      console.warn(`[Network error]: ${networkError}`)
    }
  })

  const authLink = setContext(async(_, {headers}) => {
    
    const token = await SecureStore.getItemAsync('x-token');
    console.log('token',token)
    return {
      headers:{
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })
  const cache = new InMemoryCache()

  return new ApolloClient({
    link: ApolloLink.from([errorLink as any, httpLink]) as any,
    cache,
    resolvers: {},
  })
}

export default initApollo