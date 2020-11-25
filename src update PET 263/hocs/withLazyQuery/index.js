import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { ApolloWrapper, ErrorBoundary } from 'components'
import { LoadingContext } from 'app/providers/loadingProvider'
import { Container } from './styled'
const result = {}

const withLazyQuery = props => Component => {
  const { query, service, hideLoading, styles, host } = props
  function HookWrapper(childProps) {
    const [variables, setVariables] = useState(null)
    const context = useContext(LoadingContext)
    const [
      lazy,
      { error, data, loading, called, fetchMore, refetch }
    ] = useLazyQuery(query, { errorPolicy: 'all', fetchPolicy: 'no-cache' })

    const onChangeVariables = useCallback(() => {
      if (variables) lazy(variables)

      // return () => {
      //   result = {}
      // }
    })

    const onLoadingControl = useCallback(() => {
      if (hideLoading || !context) return

      if (loading) {
        context.onLoading.increment()

        return
      }

      return () => {
        context.onLoading.decrement()
      }
    })

    useEffect(() => onChangeVariables(), [variables])
    useEffect(() => onLoadingControl(), [loading])

    useEffect(() => {
      return () => {
        Object.assign(result, {})
      }
    }, [])

    if (called) Object.assign(result, data || {})

    return (
      <Container style={styles}>
        <ErrorBoundary error={error}>
          <Component
            {...props}
            {...childProps}
            data={result}
            dataLazy={result}
            setVariables={setVariables}
            loading={loading}
            fetchMore={fetchMore}
            refetch={refetch}
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
export default withLazyQuery
