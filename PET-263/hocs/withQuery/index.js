import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ApolloWrapper, ErrorBoundary } from 'components'
import { LoadingContext } from 'app/providers/loadingProvider'
import { Container } from './styled'
const result = {}

const withQuery = props => Component => {
  const { query, service, variables, hideLoading, host } = props

  function HookWrapper(childProps) {
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState('created_at DESC')
    const [filter, setFilter] = useState({})
    const context = useContext(LoadingContext)

    const { error, data, loading, called, fetchMore } = useQuery(query, {
      variables: {
        page,
        order_by: order,
        filter: filter,
        ...variables
      }
    })

    const onLoadingControl = useCallback(() => {
      if (hideLoading || !context) return

      if (loading) {
        context.onLoading.increment()

        return
      }

      context.onLoading.decrement()
    })

    useEffect(() => onLoadingControl(), [loading])

    if (called) Object.assign(result, data || {})

    return (
      <Container>
        <ErrorBoundary error={error}>
          <Component
            {...props}
            {...childProps}
            setFilter={setFilter}
            setOrder={setOrder}
            data={result}
            setPage={setPage}
            fetchMore={fetchMore}
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
export default withQuery
