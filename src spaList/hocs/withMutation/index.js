import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ApolloWrapper, ErrorBoundary } from 'components'
import { LoadingContext } from 'app/providers/loadingProvider'
import { Container } from './styled'

const withMutation = props => Component => {
  const { mutation, service, noneFlex, host } = props

  function HookWrapper(childProps) {
    const [isComplete, setComplete] = useState(false)
    const [isError, setError] = useState(false)
    const context = useContext(LoadingContext)

    const [mutate, { error, data, loading }] = useMutation(mutation, {
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

    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <Container style={{ flex: !noneFlex ? 1 : null }}>
        <ErrorBoundary error={error}>
          <Component
            {...childProps}
            error={error}
            mutationData={data}
            mutate={mutate}
            isCompleted={isComplete}
            setCompleted={setComplete}
            isErrored={isError}
            loading={loading}
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
export default withMutation
