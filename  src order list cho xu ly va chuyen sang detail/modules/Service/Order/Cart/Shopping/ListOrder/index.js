import React, { useEffect, useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import { compose } from 'ramda'
import {
  Wrapper,
  ListOrderWrapper,
  OrderItemHeader,
  OrderItemHeaderLable,
  OrderItemFooter,
  Footer,
  LoadingSpinner
} from './styled'

import { withLazyQuery } from 'hocs'

import { GateWay, Routes } from 'utils'
import { orArray } from 'utils/Selector'
import ListOrderItem from './ListOrderItem'
import * as QUERY from 'modules/Service/query'
import Model from 'modules/Service/model'

function ListOrder({ orderStatus, data, setVariables }) {
  const record = Model(data)
  const { orders } = record
  const [isRefresh, setIsRefresh] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    if (orderStatus) getListOrder(orderStatus)
  }, [orderStatus])

  const getListOrder = useCallback(orderStatus => {
    setVariables({
      variables: { filter: { status_eq: orderStatus }, per_page: 1000 }
    })
  })

  const renderOrderItem = ({ item }) => {
    const products = orArray('node.order_items', item)
    return (
      <ListOrderItem
        products={products}
        onPress={() => {
          navigation.navigate(Routes.orderItemDetail, { item: item })
        }}
      />
    )
  }

  const onRefresh = useCallback(() => {
    if (orderStatus) getListOrder(orderStatus)
    setIsRefresh(true)
    return setTimeout(() => {
      setIsRefresh(false)
    }, 1000)
  })

  const renderFooter = () => {
    return <Footer>{<LoadingSpinner size='small' />}</Footer>
  }

  const renderBody = () => {
    return (
      <ListOrderWrapper
        data={orders}
        keyExtractor={(item, index) => `order---${index}--->`}
        renderItem={renderOrderItem}
        // ListFooterComponent={renderFooter}
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
    service: GateWay.SHOPPING_SERVICE
    // hideLoading: true
  })
)(ListOrder)
