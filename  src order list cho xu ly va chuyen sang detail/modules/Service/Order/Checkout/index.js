import React, { createRef, useState } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  BodyWrapper,
  FooterWrapper,
  TotalPrice,
  NextButton,
  NextText,
  SubmitButton,
  SubmitLabel
} from './styled'
import { withTheme, withTranslation } from 'hocs'
import { Header } from 'components'
import Icons from 'react-native-vector-icons/Ionicons'

import { Address, Payment, Confirm } from './Screens'
import CustomTabCheckout from '../CustomTabCheckout'

function Checkout(props) {
  const { theme, translate } = props
  const { colors } = theme

  const [pageSelected, setPageSelected] = useState(0)

  const stepCheckOutRef = createRef()

  function onNextPage() {
    const nextpage = pageSelected + 1
    stepCheckOutRef.current.goToPage(nextpage)
  }

  function renderNextButton() {
    return (
      <NextButton onPress={onNextPage}>
        <NextText>{translate('continue')}</NextText>
        <Icons
          name={'ios-arrow-forward'}
          size={16}
          color={colors.red}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginTop: 2 }}
        />
      </NextButton>
    )
  }

  function renderSubmitButton() {
    return (
      <SubmitButton>
        <SubmitLabel>{translate('payment')}</SubmitLabel>
      </SubmitButton>
    )
  }

  function renderFooter() {
    return (
      <FooterWrapper>
        {pageSelected === 2 && <TotalPrice>240.000 đ</TotalPrice>}
        {pageSelected !== 2 ? renderNextButton() : renderSubmitButton()}
      </FooterWrapper>
    )
  }

  return (
    <Wrapper>
      <Header back title={translate('checkout')} noIcon />
      <BodyWrapper
        ref={stepCheckOutRef}
        renderTabBar={() => <CustomTabCheckout theme={theme} />}
        onChangeTab={event => setPageSelected(event.i)}
        locked
      >
        <Address tabLabel={'Address'} tabRef={stepCheckOutRef} />
        <Payment tabLabel={'Payment'} tabRef={stepCheckOutRef} />
        <Confirm tabLabel={'Confirm'} tabRef={stepCheckOutRef} />
      </BodyWrapper>
      {renderFooter()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(Checkout)
