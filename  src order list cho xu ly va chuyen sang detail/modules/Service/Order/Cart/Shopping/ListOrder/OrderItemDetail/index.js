import React, { useEffect, useCallback, useState } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { compose } from 'ramda'
import { Wrapper } from './styled'

import { withTheme, withTranslation } from 'hocs'
import { orEmpty, orNumber } from 'utils/Selector'
import { formatMoney } from 'utils/Helpers'
import { ModalHeader } from 'components'

function OrderItemDetail(props) {
  const { products, theme, translate, onPress } = props
  const { colors } = theme

  return (
    <Wrapper>
      <ModalHeader title={translate('orderDetails')} back />
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(OrderItemDetail)
