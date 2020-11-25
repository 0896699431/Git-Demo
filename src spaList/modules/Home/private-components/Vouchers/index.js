import React from 'react'
import { compose } from 'ramda'
import { useNavigation, useRoute } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

import { withTheme, withTranslation } from 'hocs'
import { Header } from 'components'
import { orNull } from 'utils/Selector'
import PromoImg from 'assets/images/promotion/promotion.png'
import SwipeLove from 'assets/images/promotion/swipe.png'

import { Wrapper, FlatList, CustomStyle, SlideWrapper } from './styled'
import Routes from 'utils/Routes'

const promotionData = [
  {
    id: 0,
    url: PromoImg,
    name: null
  },
  {
    id: 1,
    url: SwipeLove,
    name: Routes.petLoveHome
  }
]

function Vouchers() {
  const navigation = useNavigation()
  const route = useRoute()
  const title = orNull('params.name', route)

  const renderPromotionItem = ({ item }) => {
    const { url, name } = item
    return (
      <SlideWrapper
        onPrivatePress={() => (item.name ? navigation.navigate(name) : null)}
        disabled={!item.name}
      >
        <FastImage source={url} style={CustomStyle.thumb} />
      </SlideWrapper>
    )
  }

  function keyExtractor(index) {
    return `PromotionList--->${index}`
  }

  function renderPromotions() {
    return (
      <FlatList
        data={promotionData}
        renderItem={renderPromotionItem}
        keyExtractor={(item, index) => keyExtractor(index)}
      />
    )
  }

  return (
    <Wrapper>
      <Header title={title} back noIcon />
      {renderPromotions()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(Vouchers)
