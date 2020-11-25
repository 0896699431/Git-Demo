import React, { useState, useEffect } from 'react'
import { ImagesModalWrapper, CloseButton } from './styled'
import ImageViewer from 'react-native-image-zoom-viewer'
import { orEmpty } from 'utils/Selector'
import Icons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'

export default function ImagesModal(props) {
  const { isVisible, toggleModal, images, urlKey, defaultIndex } = props

  const [listImage, setListImage] = useState([])
  useEffect(() => {
    if (images && images.length) {
      const listDraftImage = []
      images.map(item => {
        listDraftImage.push({ url: orEmpty(`${urlKey}`, item) })
      })
      setListImage(listDraftImage)
    }
  }, [images])

  useEffect(() => {
    const urls = listImage.map(it => {
      return {
        uri: orEmpty('url', it)
      }
    })

    if (urls.length) FastImage.preload(urls)
  }, [listImage])

  return (
    <ImagesModalWrapper
      isVisible={isVisible}
      transparent
      useNativeDriver={false}
    >
      <CloseButton onPress={toggleModal}>
        <Icons name={'ios-close'} size={38} color={'white'} />
      </CloseButton>
      <ImageViewer
        imageUrls={listImage}
        enableSwipeDown
        useNativeDriver
        onSwipeDown={toggleModal}
        index={defaultIndex || 0}
        saveToLocalByLongPress={false}
      />
    </ImagesModalWrapper>
  )
}
