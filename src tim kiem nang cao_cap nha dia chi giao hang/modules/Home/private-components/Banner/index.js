import React, { useState } from 'react'
import { compose } from 'ramda'
import { Wrapper, SlideWrapper, Pagination, Dot, CustomStyle } from './styled'
import { withTheme } from 'hocs'
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { Constants } from 'utils'
import PromoImg from 'assets/images/promotion/promotion.png'
import SwipeLove from 'assets/images/promotion/swipe.png'
import Routes from 'utils/Routes'

const SCREEN_WIDTH = Constants.layout.screenWidth

const listImage = [
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
function Banner() {
  const navigation = useNavigation()
  const [listSlide] = useState(listImage)
  const [activeSlide, setActiveSlide] = useState(0)

  function renderCard({ item }) {
    const { url } = item
    return (
      <SlideWrapper
        activeOpacity={0.8}
        onPrivatePress={() =>
          item.name ? navigation.navigate(item.name) : null
        }
        disabled={!item.name}
      >
        <FastImage
          source={url}
          style={CustomStyle.thumb}
          // resizeMode={'contain'}
        />
      </SlideWrapper>
    )
  }

  function renderPagination() {
    if (listSlide.length > 1) {
      return (
        <Pagination>
          {listSlide.map((_, index) => (
            <Dot key={index.toString()} active={index === activeSlide} />
          ))}
        </Pagination>
      )
    }

    return null
  }

  return (
    <Wrapper>
      <Carousel
        data={listSlide}
        renderItem={renderCard}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 25}
        onSnapToItem={index => setActiveSlide(index)}
        inactiveSlideOpacity={0.2}
        autoplay
        autoplayDelay={1000}
        autoplayInterval={5000}
        loop
      />
      {renderPagination()}
    </Wrapper>
  )
}

export default compose(withTheme)(Banner)
