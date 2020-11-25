import React, { useState } from 'react'
import { compose } from 'ramda'

import { Wrapper, HeaderWrapper, HeaderTextWrapper, HeaderText } from './styled'
import { Header } from 'components'
import { useRoute } from '@react-navigation/native'
import { withTranslation, withTheme } from 'hocs'
import { orNull } from 'utils/Selector'
import Article from './Article'
import Product from './Product'

function Favorite({ translate }) {
  const route = useRoute()
  const user = orNull('params.user', route)

  const [isProduct, setIsProduct] = useState(true)

  function renderContent() {
    if (isProduct) {
      return <Product user={user} />
    }

    return <Article user={user} />
  }

  const renderTabs = () => {
    return (
      <HeaderWrapper>
        <HeaderTextWrapper
          isFocused={isProduct}
          onPress={() => setIsProduct(true)}
        >
          <HeaderText isFocused={isProduct}>{translate('product')}</HeaderText>
        </HeaderTextWrapper>

        <HeaderTextWrapper
          isFocused={!isProduct}
          onPress={() => setIsProduct(false)}
        >
          <HeaderText isFocused={!isProduct}>{translate('article')}</HeaderText>
        </HeaderTextWrapper>
      </HeaderWrapper>
    )
  }

  return (
    <Wrapper>
      <Header title={translate('favorite')} back icon />
      {renderTabs()}
      {renderContent()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(Favorite)
