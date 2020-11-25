import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'

import { withTheme, withTranslation } from 'hocs'
import { orEmpty } from 'utils/Selector'
import { Wrapper, ListImage, ImageWrapper, PrImage } from './styled'
import FastImage from 'react-native-fast-image'
import { ImagesModal } from 'modules/shared-components'

function ImagesBox(props) {
  const { images } = props

  const [isVisible, setVisible] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const urls = images.map(it => {
      return {
        uri: orEmpty('url', it)
      }
    })

    if (urls.length) FastImage.preload(urls)
  }, [images])

  function toggleModal() {
    setVisible(!isVisible)
  }

  function renderListImages() {
    return (
      <ListImage horizontal showsHorizontalScrollIndicator={false}>
        {images.map((item, index) => (
          <ImageWrapper
            key={`${item.id}`}
            onPress={() => {
              setImgIndex(index)
              return toggleModal()
            }}
          >
            <PrImage
              source={{
                uri: orEmpty('url', item)
              }}
            />
          </ImageWrapper>
        ))}
      </ListImage>
    )
  }

  function renderImagesModal() {
    return (
      <ImagesModal
        isVisible={isVisible}
        toggleModal={toggleModal}
        images={images}
        urlKey={'url'}
        defaultIndex={imgIndex}
      />
    )
  }

  return (
    <Wrapper>
      {renderListImages()}
      {renderImagesModal()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(ImagesBox)
