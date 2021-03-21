import { onError } from 'apollo-link-error'
import fetch from 'unfetch'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context'
import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import {createUploadLink} from 'apollo-upload-client'

const initApollo = () => {
  const httpLink = createUploadLink({
    fetch: fetch as any,
    uri: 'http://192.168.1.2:5000/graphql',
    credentials: 'include',
  })

  // const authLink = setContext(async (_, { headers }) => {
  //   const token = await AsyncStorage.getItem('token');

  //   return {
  //     headers: {
  //       ...headers,
  //       Authorization: token ? token : ``,
  //     },
  //   };
  // });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        
      )
    if (networkError) {
      console.warn(`[Network error]: ${networkError}`)
    }
  })

  
  const cache = new InMemoryCache()

  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]) as any,
    cache,
    resolvers: {},
  })
}

export default initApollo