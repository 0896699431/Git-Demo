import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { ApolloWrapper, ErrorBoundary } from 'components'
import { LoadingContext } from 'app/providers/loadingProvider'
import { Container } from './styled'
const r = {}
const q = {}
const l = {}

const withLazyKeyQuery = props => Component => {
  const { query, service, key, hideLoading, host } = props

  function HookWrapper(childProps) {
    const [variables, setVariables] = useState(null)
    const context = useContext(LoadingContext)

    const [
      lazy,
      { error, data, loading, called, fetchMore, refetch }
    ] = useLazyQuery(query)

    const onChangeVariables = useCallback(() => {
      if (variables) lazy(variables)
    })

    useEffect(() => {
      return () => {
        Object.assign(r, { [key]: {} })
      }
    }, [])

    const onLoadingControl = useCallback(() => {
      if (hideLoading || !context) return
      if (loading) {
        context.onLoading.increment()

        return
      }

      context.onLoading.decrement()
    })

    useEffect(() => onChangeVariables(), [variables])
    useEffect(() => onLoadingControl(), [loading])

    Object.assign(q, { [key]: setVariables })
    Object.assign(l, {[key]: loading})
    if (called && data) Object.assign(r, { [key]: data || {} })

    return (
      <Container>
        <ErrorBoundary error={error}>
          <Component
            {...props}
            {...childProps}
            data={r}
            dataLazy={r}
            setVariables={setVariables}
            loading={loading}
            fetchMore={fetchMore}
            refetch={refetch}
            keyQuery={q}
            keyLoading={l}
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
export default withLazyKeyQuery
