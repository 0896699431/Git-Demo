import React from 'react'
import { withTheme } from 'hocs'
import { OrderItemHeader, OrderItemHeaderLable } from './styled'

function HeaderItem(props) {
  const { txt } = props
  return (
    <OrderItemHeader>
      <OrderItemHeaderLable>{txt}</OrderItemHeaderLable>
    </OrderItemHeader>
  )
}

export default withTheme(HeaderItem)
