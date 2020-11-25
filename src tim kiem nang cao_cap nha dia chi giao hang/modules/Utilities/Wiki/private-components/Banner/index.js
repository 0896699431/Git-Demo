import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import { Wrapper, SlideWrapper, Pagination, Dot, CustomStyle } from './styled'
import { withTheme } from 'hocs'
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image'
import { Constants } from 'utils'
import { ImagesModal } from 'modules/shared-components'
import { orEmpty } from 'utils/Selector'

const SCREEN_WIDTH = Constants.layout.screenWidth
function Banner(props) {
  const { wikiGallery } = props
  const [listSlide, setListSlide] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [imageIndexDefault, setImageIndexDefault] = useState(0)
  const [isImagesVisible, setImagesVisible] = useState(false)

  useEffect(() => {
    if (wikiGallery.length) {
      setListSlide(wikiGallery)
      const urls = wikiGallery.map(item => {
        return {
          uri: orEmpty('node.url', item)
        }
      })
      if (urls.length) FastImage.preload(urls)
    }
  }, [wikiGallery])

  function toggleModal() {
    if (!isImagesVisible) setImageIndexDefault(activeSlide)
    setImagesVisible(!isImagesVisible)
  }

  function renderCard({ item }) {
    return (
      <SlideWrapper shadowType={3} activeOpacity={0.8} onPress={toggleModal}>
        <FastImage
          source={{
            uri: orEmpty('node.url', item)
          }}
          style={CustomStyle.thumb}
        />
      </SlideWrapper>
    )
  }

  function renderPagination() {
    return (
      <Pagination>
        {listSlide.map((_, index) => (
          <Dot key={index.toString()} active={index === activeSlide} />
        ))}
      </Pagination>
    )
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
      <ImagesModal
        isVisible={isImagesVisible}
        toggleModal={toggleModal}
        images={listSlide}
        urlKey={'node.url'}
        defaultIndex={imageIndexDefault}
      />
    </Wrapper>
  )
}

export default compose(withTheme)(Banner)
