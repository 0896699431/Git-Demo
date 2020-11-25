import React, { useState, useCallback } from 'react'

import { compose } from 'ramda'
import { Wrapper, HeaderWrapper } from './styled'
import { TabbarAnimation } from 'components'
import ShopCart from './ShopCart'
import ListOrder from './ListOrder'

import { withTheme, withTranslation } from 'hocs'

import { orNull } from 'utils/Selector'

function Shopping() {
  const tabsData = [
    { id: 1, status: 'cart', displayName: 'Giỏ hàng' },
    { id: 2, status: 'pending', displayName: 'Chờ xử lý' },
    { id: 2, status: 'processing', displayName: 'Đang giao hàng' },
    { id: 3, status: 'success', displayName: 'Hoàn thành' },
    { id: 4, status: 'cancel', displayName: 'Đã huỷ' }
  ]

  const [tabSelected, setTabSelected] = useState(tabsData[0])

  const onPressTabbar = useCallback(index => {
    setTabSelected(tabsData[index])
  })

  function renderBody() {
    if (orNull('status', tabSelected) === 'cart') return <ShopCart />
    return <ListOrder orderStatus={orNull('status', tabSelected)} />
  }

  function renderHeader() {
    return (
      <HeaderWrapper>
        <TabbarAnimation
          tabs={tabsData}
          titleKey='displayName'
          onPress={onPressTabbar}
        />
      </HeaderWrapper>
    )
  }

  return (
    <Wrapper>
      {renderHeader()}
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(Shopping)
