import React, { useState, useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { useClient } from 'utils/ClientManager'
import CircleLoading from '../CircleLoading'

const ApolloWrapper = ({ children, service, host }) => {
  const [client, setClient] = useState(undefined)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { client, cache } = useClient(service, host)

    setClient(client)

    return () => {
      cache.reset()
    }
  }, [])

  if (client === undefined) return <CircleLoading />

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper
