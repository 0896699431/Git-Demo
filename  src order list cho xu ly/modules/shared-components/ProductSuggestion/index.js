import React, { useState } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  HeaderWrapper,
  Title,
  ProductsWrapper,
  ItemWrapper,
  SeeMore,
  SeeMoreLabel
} from './styled'
import { withTheme } from 'hocs'
import { Constants } from 'utils'
import Icons from 'react-native-vector-icons/Ionicons'

const SCREEN_WIDTH = Constants.layout.screenWidth

function ProductSuggestion(props) {
  const { theme, onPress, title } = props
  const { colors } = theme
  const [listProduct] = useState([1, 2, 3, 4, 5])

  function renderArticle() {
    return <ItemWrapper></ItemWrapper>
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>{title || 'Tiện ích liên quan'}</Title>
        <SeeMore onPress={onPress}>
          <SeeMoreLabel>Xem thêm</SeeMoreLabel>
          <Icons name={'ios-arrow-forward'} size={16} color={colors.red} />
        </SeeMore>
      </HeaderWrapper>

      <ProductsWrapper
        data={listProduct}
        renderItem={renderArticle}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 60}
        inactiveSlideOpacity={0.8}
        initialNumToRender
      />
    </Wrapper>
  )
}

export default compose(withTheme)(ProductSuggestion)
