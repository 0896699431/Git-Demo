import React, { useState, useEffect, createRef } from 'react'
import analytics from '@react-native-firebase/analytics'

import LottieView from 'lottie-react-native'
import { compose } from 'ramda'
import * as QUERY from 'modules/Utilities/Wiki/query'
import { GateWay, Routes } from 'utils'
import { withLazyQuery } from 'hocs'
import Model from 'modules/Utilities/Wiki/model'
import { SwipeModal, PageLoading } from 'components'
import Icons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { orEmpty, orArray } from 'utils/Selector'

import {
  ImageWrapper,
  ImageView,
  Wrapper,
  LabelWrapper,
  LabelContainer,
  LabelText,
  styles,
  ModalContailer,
  BreedWrapper,
  BreedThumb,
  BreedName,
  ListBreed,
  NoDataWrapper,
  NoDataThumb,
  BreedThumbWrapper,
  Text
} from './styled'

import nodataImage from 'assets/images/graphics/no-data.png'

function ScanResult ({
  imageUrl,
  imageMime,
  setVariables,
  data,
  theme,
  loading
}) {
  const isFocused = useIsFocused()
  const record = Model(data)
  const { smartWikis } = record
  const { colors } = theme
  const navigation = useNavigation()

  const [isUploadImage, setIsUploadImage] = useState(true)
  const [imgResult, setImgResult] = useState(null)
  const [searchKey, setSearchKey] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const lottieRef = createRef()

  function toggleModal () {
    setModalVisible(!modalVisible)
  }

  function openWikiDetail (node) {
    setModalVisible(false)
    setTimeout(() => {
      navigation.navigate(Routes.wikiDetail, {
        wikiId: node.id,
        wikiName: node.breed.name
      })
    }, 300)
  }
  function renderBreed ({ item }) {
    const { node } = item
    return (
      <BreedWrapper
        shadowType={2}
        onPress={() => {
          analytics().logSelectContent({
            content_type: `open_wiki_detail_${node.breed.name}`,
            item_id: 'openWikiDetail  '
          })
          openWikiDetail(node)
        }}
      >
        <BreedThumbWrapper type={3}>
          <BreedThumb
            source={{
              uri: orEmpty('avatar_url', node)
            }}
          />
        </BreedThumbWrapper>
        <BreedName>{node.breed.name}</BreedName>
        <Icons name='ios-arrow-forward' color={colors.gray_4} size={18} />
      </BreedWrapper>
    )
  }

  function renderBody () {
    if (!loading) {
      const wikis = orArray('edges', smartWikis)
      if (wikis.length > 0) {
        return (
          <ListBreed
            data={smartWikis.edges}
            renderItem={renderBreed}
            showsVerticalScrollIndicator={false}
          />
        )
      }

      return renderNoData()
    }
    return <PageLoading isList showAvatar />
  }

  function renderNoData () {
    return (
      <NoDataWrapper>
        <NoDataThumb source={nodataImage} resizeMode={'contain'} />
        <Text>Không tìm thấy dữ liệu!</Text>
      </NoDataWrapper>
    )
  }

  function renderModal () {
    return (
      <SwipeModal isVisible={modalVisible} toggleModal={toggleModal} top={400}>
        <ModalContailer>{renderBody()}</ModalContailer>
      </SwipeModal>
    )
  }

  const analyzeImage = async () => {
    try {
      const body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'LANDMARK_DETECTION', maxResults: 5 },
              { type: 'FACE_DETECTION', maxResults: 5 },
              { type: 'LOGO_DETECTION', maxResults: 5 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
              { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              { type: 'CROP_HINTS', maxResults: 5 },
              { type: 'WEB_DETECTION', maxResults: 5 }
            ],
            image: {
              content: imageUrl
            }
          }
        ]
      })

      // eslint-disable-next-line no-undef
      const response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBiVml745I01csNBt-j0bYJ-XadAAZbB-c',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body
        }
      )
      const responseJson = await response.json()
      setIsUploadImage(false)
      setImgResult(responseJson)
    } catch (error) {
      console.log('UPLOAD ING ERROR', error)
    }
  }

  function searchBreed () {
    setVariables({
      variables: { filter: { keyword: searchKey }, page: 1 }
    })
    toggleModal()
  }

  function extractResult () {
    const finalResult = imgResult.responses.map(response => {
      const labelAnnotations = response.labelAnnotations

      return labelAnnotations.map(anno => {
        return anno.description
      })
    })

    setSearchKey(finalResult[0].toString())
  }

  useEffect(() => {
    if (imageUrl) {
      analyzeImage()
    }
  }, [imageUrl])

  useEffect(() => {
    if (imgResult && imgResult.responses) {
      extractResult()
    }
  }, [imgResult])

  useEffect(() => {
    if (searchKey.length) {
      searchBreed()
    }
  }, [searchKey])

  useEffect(() => {
    if (isFocused && imgResult) setModalVisible(true)
  }, [isFocused])

  const renderImage = () => {
    return (
      <ImageWrapper>
        <ImageView
          source={{
            uri: `data:${imageMime};base64,${imageUrl}`
          }}
          resizeMode={'contain'}
        />
      </ImageWrapper>
    )
  }

  const renderAnimateScan = () => {
    if (isUploadImage) {
      return (
        <LottieView
          source={require('assets/Lottie/scanning.json')}
          autoPlay
          loop
          ref={lottieRef}
        />
      )
    }
  }

  const renderDataLabel = () => {
    if (imgResult && imgResult.responses) {
      return imgResult.responses.map(response => {
        const labelAnnotations = response.labelAnnotations

        return labelAnnotations.map((anno, index) => {
          return (
            <LabelWrapper key={index}>
              <LabelText>{anno.description}</LabelText>
            </LabelWrapper>
          )
        })
      })
    }
  }

  return (
    <Wrapper>
      <LabelContainer style={styles.scrollViewContainer}>
        {renderDataLabel()}
      </LabelContainer>
      {renderImage()}
      {renderAnimateScan()}
      {renderModal()}
    </Wrapper>
  )
}

export default compose(
  withLazyQuery({
    query: QUERY.v1WikiSmart,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  })
)(ScanResult)
