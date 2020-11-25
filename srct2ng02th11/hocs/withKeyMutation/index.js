import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ApolloWrapper, ErrorBoundary } from 'components'
import { LoadingContext } from 'app/providers/loadingProvider'
import { Container } from './styled'

const keyMutation = {}
const result = {}

const withKeyMutation = props => Component => {
  const { mutation, service, noneFlex, key, host } = props

  function HookWrapper(childProps) {
    const [isComplete, setComplete] = useState(false)
    const [isError, setError] = useState(false)
    const context = useContext(LoadingContext)

    const [mutate, { error, data, loading, called }] = useMutation(mutation, {
      onCompleted: () => setComplete(true),
      onError: () => setError(true)
    })

    const onLoadingControl = useCallback(() => {
      if (!context) return

      if (loading) {
        context.onLoading.increment()

        return
      }

      context.onLoading.decrement()
    })

    useEffect(() => onLoadingControl(), [loading])

    useEffect(() => {
      return () => {
        Object.assign(result, { [key]: {} })
        Object.assign(keyMutation, { [key]: {} })
      }
    }, [])

    Object.assign(keyMutation, { [key]: mutate })
    if (called) Object.assign(result, { [key]: data || {} })
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <Container style={{ flex: !noneFlex ? 1 : null }}>
        <ErrorBoundary error={error}>
          <Component
            {...childProps}
            error={error}
            mutationData={result}
            mutate={mutate}
            isCompleted={isComplete}
            isErrored={isError}
            keyMutation={keyMutation}
          />
        </ErrorBoundary>
      </Container>
    )
  }

  function Wrapper(props) {
    return (
      <ApolloWrapper service={service} host={host}>
        <HookWrapper {...props} />
      </ApolloWrapper>
    )
  }

  return Wrapper
}
export default withKeyMutation
