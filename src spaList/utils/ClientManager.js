import { setContext } from 'apollo-link-context'
import { BASE_API_URL } from 'react-native-dotenv'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { createUploadLink } from 'apollo-upload-client'
import TokenStore from 'utils/TokenStore'

const cache = new InMemoryCache()

export function useClient(url, host) {
  const graphqlUrl = new createUploadLink({
    uri: host ? host : `${BASE_API_URL}/${url}`
  })

  const withAuthen = setContext(async (_, headers) => {
    const petown = await TokenStore.get()

    return {
      headers: {
        ...headers,
        Authorization: petown ? `Bearer ${petown.token}` : ''
      }
    }
  })

  return {
    client: new ApolloClient({
      link: withAuthen.concat(graphqlUrl),
      cache: cache,
      connectToDevTools: true,
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache'
        },
        watchQuery: {
          fetchPolicy: 'no-cache'
        }
      }
    }),
    cache
  }
}
