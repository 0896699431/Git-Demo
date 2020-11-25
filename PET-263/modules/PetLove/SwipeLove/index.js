import React, { useState, useEffect, useRef, useCallback } from 'react'

import { compose } from 'ramda'
import { Animated, Dimensions, Text } from 'react-native'
import LottieView from 'lottie-react-native'

import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/Ionicons'
import InfoIcon from 'react-native-vector-icons/Foundation'
import {
  useNavigation,
  StackActions,
  useIsFocused
} from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { Header } from 'components'

import {
  withTheme,
  withLazyKeyQuery,
  withTranslation,
  withMutation
} from 'hocs'
import { GateWay, Routes, Storage, Constants } from 'utils'

import * as QUERY from '../query'
import * as MUTATION from '../mutation'
import Model from '../model'

import { orNull } from 'utils/Selector'

import {
  styles,
  CardContainer,
  CardEmptyWrapper,
  Wrapper,
  ActionWrapper,
  ActionBtn,
  PetInfoWrapper,
  PetName,
  UserWrapper,
  Username,
  UserAvatar,
  ActionStatusWrapper,
  PetWrapper,
  GenderWrapper,
  RowDumb,
  Container,
  EmptyView,
  EmptyText
} from './styled'
import Matching from './Matching'
import CardInfo from './CardInfor'

import { View } from 'react-native-animatable'
import DarlingCard from './DarlingCard'

const screenWidth = Dimensions.get('window').width
const SWIPE_OUT_DURATION = 250
const PER_PAGE = 10

const DARLING_CARDS_KEY = 'petlove_darling_card_key'
const PETLOVE_SETTING_KEY = 'petlove_setting_key'

function SwipeLove({ theme, translate, keyQuery, data, mutationData, mutate }) {
  const { colors } = theme
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const popAction = StackActions.pop(2)

  const [position] = useState(new Animated.ValueXY())
  const [index, setIndex] = useState(0)
  const [isOpenModal, setOpenModal] = useState(false)
  const [cardList, setCardList] = useState([])
  const [cardListMeta, setCardListMeta] = useState({})
  const [darlingInfo, setDarlingInfo] = useState(null)
  const [initLoading, setInitLoading] = useState(true)
  const [listCardNope, setListCardNope] = useState([])
  const settingRecord = Model(data[PETLOVE_SETTING_KEY])
  const { petSettings } = settingRecord
  const darlingRecord = Model(data[DARLING_CARDS_KEY])
  const { darlingCards } = darlingRecord

  const mutateRecord = Model(mutationData)
  const { matched } = mutateRecord

  const lottieRef = useRef()

  useEffect(() => {
    getSettings()
  }, [getSettings])

  useEffect(() => {
    if (isFocused && !initLoading) {
      getSettings()
    }
  }, [getSettings, initLoading, isFocused])

  useEffect(() => {
    if (index === PER_PAGE && orNull('next_page', cardListMeta)) {
      onGetDarlingCards(orNull('next_page', cardListMeta))
    }
  }, [cardListMeta, index])

  useEffect(() => {
    if (petSettings) {
      if (orNull('status', petSettings) === 'is_default') {
        return navigation.navigate(Routes.petLoveInitSetting)
      }

      onGetDarlingCards()
      Storage.set(
        Constants.storageKey.loveSetting.LOVE_INIT_SETTING,
        petSettings
      )
    }
  }, [navigation, onGetDarlingCards, petSettings])

  useEffect(() => {
    if (darlingCards.meta.current_page && darlingCards.edges) {
      setIndex(0)
      setCardList(darlingCards.edges)
      setCardListMeta(darlingCards.meta)
    }
  }, [darlingCards.edges, darlingCards.meta])

  const getSettings = useCallback(() => {
    const asynGetSetting = async () => {
      try {
        const cardNopeIds = await Storage.getWithExpired(
          Constants.storageKey.loveSetting.LIST_CARD_NOPE
        )
        if (cardNopeIds) setListCardNope(cardNopeIds)

        const settingStorage = await Storage.get(
          Constants.storageKey.loveSetting.LOVE_INIT_SETTING
        )
        if (settingStorage) {
          onGetDarlingCards(1, cardNopeIds)
        } else {
          fetchPetloveSettings()
        }
      } catch (error) {
        console.log('GET SETTING STORAGE ERROR', error)
      }
      return setInitLoading(false)
    }
    asynGetSetting()
  }, [fetchPetloveSettings, onGetDarlingCards])

  const fetchPetloveSettings = useCallback(() => {
    keyQuery[PETLOVE_SETTING_KEY]({
      variables: {}
    })
  }, [keyQuery])

  const onGetDarlingCards = useCallback(
    (page = 1, cardNopeIds = listCardNope) => {
      keyQuery[DARLING_CARDS_KEY]({
        variables: {
          filter: { id_not_in: cardNopeIds },
          page: page,
          per_page: PER_PAGE
        },
        fetchPolicy: 'no-cache'
      })
    },
    [keyQuery, listCardNope]
  )

  const createDarling = useCallback(
    cardId => {
      if (!cardId) return

      mutate({
        variables: {
          input: {
            attribute: {
              member_pet_id: cardId
            }
          }
        }
      })
    },
    [mutate]
  )

  const onNopeCard = useCallback(
    cardId => {
      if (!cardId) return
      const newCardNope = [...listCardNope, cardId]
      setListCardNope(newCardNope)

      Storage.setWithExpired(
        Constants.storageKey.loveSetting.LIST_CARD_NOPE,
        newCardNope,
        5 * 24 * 60 * 60 * 1000
      )
    },
    [listCardNope]
  )

  const onSwipeComplete = useCallback(
    direction => {
      position.setValue({ x: 0, y: 0 })

      const cardId = orNull('node.id', cardList[index])

      if (direction === 'right') createDarling(cardId)
      else onNopeCard(cardId)

      setIndex(prev => prev + 1)
    },
    [cardList, createDarling, index, onNopeCard, position]
  )

  const resetPosition = useCallback(() => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start()
  }, [position])

  const forceSwipe = useCallback(
    direction => {
      const x = direction === 'right' ? screenWidth : -screenWidth
      Animated.timing(position, {
        toValue: { x, y: 0 },
        duration: SWIPE_OUT_DURATION
      }).start(() => onSwipeComplete(direction))
    },
    [onSwipeComplete, position]
  )

  const onGetCardStyle = useCallback(() => {
    const rotate = position.x.interpolate({
      inputRange: [-screenWidth * 1.5, 0, screenWidth * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }, [position])

  const renderActionStatus = useCallback(() => {
    const likeOpacity = position.x.interpolate({
      inputRange: [0, screenWidth / 4],
      outputRange: [0, 1]
    })
    const nopeOpacity = position.x.interpolate({
      inputRange: [-screenWidth / 4, 0],
      outputRange: [1, 0]
    })

    return (
      <ActionStatusWrapper>
        <Animated.View style={[styles.like, { opacity: likeOpacity }]}>
          <Text style={styles.likeLabel}>LIKE</Text>
        </Animated.View>
        <Animated.View style={[styles.nope, { opacity: nopeOpacity }]}>
          <Text style={styles.nopeLabel}>NOPE</Text>
        </Animated.View>
      </ActionStatusWrapper>
    )
  }, [position.x])

  const renderImageSwipe = useCallback(
    (imageList, avaImage, cardID, isBackdrop) => {
      const images = !imageList.length ? [{ url: avaImage }] : imageList

      if (isBackdrop) {
        return (
          <FastImage
            source={{ uri: avaImage }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.avatar, { opacity: isBackdrop ? 0.5 : 1 }]}
          />
        )
      }

      return (
        <DarlingCard
          imageList={images}
          cardID={cardID}
          forceSwipe={forceSwipe}
          theme={theme}
          resetPosition={resetPosition}
          position={position}
        />
      )
    },
    [forceSwipe, position, resetPosition, theme]
  )

  const renderBriefInfo = useCallback(
    (avatarUrl, petBreed, petGender, petName, petItem) => {
      return (
        <PetInfoWrapper>
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0)',
              'rgba(0, 0, 0, 0.2)',
              'rgba(0, 0, 0, 0.3)'
            ]}
            style={styles.gradient}
          >
            <UserWrapper>
              <UserAvatar
                source={{
                  uri: avatarUrl
                }}
              />
              <PetWrapper>
                <RowDumb
                  onPress={() => {
                    setOpenModal(!isOpenModal)
                    setDarlingInfo(petItem)
                  }}
                  activeOpacity={0.8}
                >
                  <PetName>{petName}</PetName>
                  <InfoIcon
                    name='info'
                    size={21}
                    color={theme.colors.white}
                    style={styles.infoCirle}
                  />
                </RowDumb>

                <GenderWrapper>
                  <Username>{petBreed.name}</Username>
                  <Icons
                    name={petGender === 'male' ? 'md-male' : 'md-female'}
                    size={18}
                    color={colors.white}
                    style={styles.genderIco}
                  />
                </GenderWrapper>
              </PetWrapper>
            </UserWrapper>
          </LinearGradient>
        </PetInfoWrapper>
      )
    },
    [colors.white, isOpenModal, theme.colors.white]
  )

  const onRenderCardItem = useCallback(
    item => {
      const { avatar_url, name, breed, gender, images, id } = item.node
      return (
        <View style={[styles.avatar, onGetCardStyle()]}>
          {renderActionStatus()}
          {renderImageSwipe(images, avatar_url, id)}

          {renderBriefInfo(avatar_url, breed, gender, name, item)}
        </View>
      )
    },
    [onGetCardStyle, renderActionStatus, renderBriefInfo, renderImageSwipe]
  )

  const renderCards = () => {
    if (cardList.length) {
      const cards = [...cardList]
      return cards
        .map((item, itemIndex) => {
          if (itemIndex === index) {
            return (
              <CardContainer key={itemIndex}>
                {onRenderCardItem(item)}
              </CardContainer>
            )
          }

          if (itemIndex === index + 1)
            return (
              <CardEmptyWrapper key={itemIndex}>
                {renderImageSwipe(
                  orNull('node.images', item),
                  orNull('node.avatar_url', item),
                  orNull('node.id', item),
                  true
                )}
              </CardEmptyWrapper>
            )

          return null
        })
        .reverse()
    }
  }

  const renderActionBtn = useCallback(() => {
    return (
      <ActionWrapper>
        <ActionBtn
          shadowType={2}
          onPrivatePress={() => {
            const cardId = orNull('node.id', cardList[index])
            onNopeCard(cardId)
            setIndex(prev => prev + 1)
          }}
        >
          <Icon name='close' color={theme.colors.gray_2} size={25} />
        </ActionBtn>
        <ActionBtn
          shadowType={2}
          isRight
          onPrivatePress={() => {
            const cardId = orNull('node.id', cardList[index])
            createDarling(cardId)
            setIndex(prev => prev + 1)
          }}
        >
          <Icon name='heart' color={theme.colors.primary_1} size={23} />
        </ActionBtn>
      </ActionWrapper>
    )
  }, [
    cardList,
    createDarling,
    index,
    onNopeCard,
    theme.colors.gray_2,
    theme.colors.primary_1
  ])

  const toggleModal = useCallback(() => {
    setOpenModal(!isOpenModal)
  }, [isOpenModal])

  const renderHeader = useCallback(() => {
    return (
      <Header
        title={'PET LOVE'}
        onCustomBack={() => navigation.dispatch(popAction)}
        back
        noIcon
      />
    )
  }, [navigation, popAction])

  const renderAnimateHeart = useCallback(() => {
    if (orNull('next_page', cardListMeta)) return null

    return (
      <EmptyView>
        <LottieView
          source={require('assets/Lottie/emptyheart.json')}
          autoPlay
          loop
          ref={lottieRef}
          style={styles.emptyHeart}
        />
        <EmptyText>{translate('noMoreCard')}</EmptyText>
      </EmptyView>
    )
  }, [cardListMeta, translate])

  const isShowCard = index < cardList.length && cardList.length > 0
  return (
    <Container>
      {renderHeader()}
      <Wrapper>
        {isShowCard ? renderCards() : renderAnimateHeart()}
        {isShowCard && renderActionBtn()}
        {orNull('is_matched', matched) && (
          <Matching matchingg={matched} theme={theme} />
        )}

        <CardInfo
          isOpenModal={isOpenModal}
          toggleModal={toggleModal}
          theme={theme}
          darlingInfo={darlingInfo}
        />
      </Wrapper>
    </Container>
  )
}
export default compose(
  withLazyKeyQuery({
    query: QUERY.v1PetAvailable,
    service: GateWay.PET_SERVICE,
    key: DARLING_CARDS_KEY
  }),
  withLazyKeyQuery({
    query: QUERY.v1MySettingIndex,
    service: GateWay.PET_SERVICE,
    key: PETLOVE_SETTING_KEY
  }),
  withMutation({
    mutation: MUTATION.v1CreateDarling,
    service: GateWay.PET_SERVICE
  }),
  withTheme,
  withTranslation
)(SwipeLove)
