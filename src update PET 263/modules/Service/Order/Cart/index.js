import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'

import { withTheme, withTranslation, withUser } from 'hocs'
import { Header } from 'components'
import { orNull } from 'utils/Selector'

import { Wrapper } from './styled'
import Booking from './Booking'
import Shopping from './Shopping'

import { SuggestLogin } from 'modules/WarningPage'

import { useRoute } from '@react-navigation/native'

function Cart({ user }) {
  const route = useRoute()
  const isShopCartPage = orNull('params.shoppingCart', route)

  const [isBookingPage, setBookingPage] = useState(true)

  useEffect(() => {
    if (isShopCartPage) setBookingPage(false)
  }, [isShopCartPage])

  const renderHeader = () => {
    return (
      <Header
        title={isBookingPage ? 'Booking' : 'Shopping'}
        isOrderScreen
        isBookingPage={isBookingPage}
        switchScreen={() => setBookingPage(!isBookingPage)}
      />
    )
  }

  function renderBody() {
    if (isBookingPage) return <Booking />
    return <Shopping />
  }

  function renderSuggestLogin() {
    return <SuggestLogin />
  }

  return (
    <Wrapper>
      {renderHeader()}
      {user.id ? renderBody() : renderSuggestLogin()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withUser
)(Cart)
