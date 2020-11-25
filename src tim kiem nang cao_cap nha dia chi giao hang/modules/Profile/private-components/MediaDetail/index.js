import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
  Wrapper,
  Header,
  CloseModal,
  ItemWrapper,
  MediaBg,
  CustomStyle
} from './styled'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import Swiper from 'react-native-swiper'
import Icons from 'react-native-vector-icons/Feather'
import Colors from 'utils/Colors'

const MediaDetail = forwardRef(function MediaDetail(props, ref) {
  // const { innerRef } = props

  const [visible, setVisible] = useState(false)
  const [detailMedia, setDetailMedia] = useState({})
  useImperativeHandle(ref, () => ({
    openModal(data) {
      setDetailMedia(data)
      setVisible(true)
    },
    closeModal() {
      setVisible(false)
    }
  }))
  function renderHeader() {
    return (
      <Header>
        <CloseModal onPress={() => setVisible(false)}>
          <Icons name={'x'} size={24} color={Colors.gray_4} />
        </CloseModal>
      </Header>
    )
  }
  function renderMedias() {
    const medias =
      detailMedia.node && detailMedia.node.media ? detailMedia.node.media : []
    if (medias && medias.length) {
      return (
        <Swiper
          horizontal
          showsPagination={true}
          dotColor={Colors.dark}
          activeDotColor={Colors.white}
        >
          {medias.map((media, mediaIndex) => (
            <ItemWrapper key={mediaIndex}>
              <MediaBg
                source={{ uri: media.resolutions[0].url }}
                blurRadius={200}
              >
                <FastImage
                  source={{ uri: media.resolutions[0].url }}
                  style={CustomStyle.mediaThumb}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </MediaBg>
            </ItemWrapper>
          ))}
        </Swiper>
      )
    } else return null
  }

  return (
    <Modal
      isVisible={visible}
      useNativeDriver
      hideModalContentWhileAnimating
      style={CustomStyle.modal}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      // presentationStyle='pageSheet'
      propagateSwipe
    >
      <Wrapper>
        {renderHeader()}
        {renderMedias()}
      </Wrapper>
    </Modal>
  )
})

export default MediaDetail
