import React, { useEffect, useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import { compose } from 'ramda'
import { Wrapper, ListOrderWrapper } from './styled'

import { withLazyQuery } from 'hocs'

import { GateWay, Routes } from 'utils'
import { orArray } from 'utils/Selector'
import ListOrderItem from './ListOrderItem'
import * as QUERY from 'modules/Service/query'
import { PageLoading } from 'components'

function ListOrder({ orderStatus, data, setVariables, loading }) {
  const [ordersList, setOrdersList] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    let edges = orArray('v1OrderIndex.edges', data)
    setOrdersList(edges)
  }, [data.v1OrderIndex])

  const onRefresh = useCallback(() => {
    if (orderStatus) getListOrder(orderStatus)
    setIsRefresh(true)
    return setTimeout(() => {
      setIsRefresh(false)
    }, 1000)
  })

  useEffect(() => {
    if (orderStatus == 'pending') getListOrder(orderStatus)
  }, [orderStatus])

  const getListOrder = useCallback(orderStatus => {
    const input = {
      variables: { filter: { status_eq: orderStatus }, per_page: 1000 }
    }
    setVariables(input)
  })

  const resetData = useCallback(id => {
    let tamList = []
    ordersList.map(item => {
      if (item.node.id != id) tamList.push(item)
    })
    setOrdersList(tamList)
  })

  const renderOrderItem = ({ item }) => {
    const products = orArray('node.order_items', item)
    return (
      <ListOrderItem
        products={products}
        onPress={() => {
          navigation.navigate(Routes.orderItemDetail, {
            item: item,
            resetData: resetData
          })
        }}
      />
    )
  }

  const renderBody = () => {
    if (loading) return <PageLoading isList />
    return (
      <ListOrderWrapper
        data={ordersList}
        keyExtractor={(item, index) => `order---${index}--->`}
        renderItem={renderOrderItem}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
      />
    )
  }

  return <Wrapper>{renderBody()}</Wrapper>
}

export default compose(
  withLazyQuery({
    query: QUERY.getListOrder,
    service: GateWay.SHOPPING_SERVICE,
    hideLoading: true
  })
)(ListOrder)
