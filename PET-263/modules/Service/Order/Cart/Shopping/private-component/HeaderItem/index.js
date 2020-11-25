import React from 'react'
import { withTheme } from 'hocs'
import { OrderItemHeader, OrderItemHeaderLable } from './styled'

function HeaderItem(props) {
  const { theme, txt } = props
  const { colors } = theme
  return (
    <OrderItemHeader>
      <OrderItemHeaderLable>{txt}</OrderItemHeaderLable>
    </OrderItemHeader>
  )
}

export default withTheme(HeaderItem)
