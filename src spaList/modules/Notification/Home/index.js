import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Alert, RefreshControl } from 'react-native'
import { compose } from 'ramda'
import {
  orNull,
  removeDataFromList,
  orEmpty,
  orObject,
  withUniq
} from 'utils/Selector'

import { GateWay, Routes, Storage, Constants } from 'utils'
import { ApplicationContext } from 'app/providers/applicationProvider'
import FastImage from 'react-native-fast-image'

import {
  Wrapper,
  NotiWrapper,
  NotiItemWrapper,
  UserAvatar,
  NotiContent,
  NotiTime,
  NotiContentWrapper,
  ListNoti,
  StatusCicle,
  AvatarDefaultWrapper,
  NoNotiWrapper,
  NoNotiThumb,
  NoNotiDescription,
  NotiMessage,
  Footer,
  LoadingSpinner,
  LeftNotiWrapper
} from './styled'
import { Header, PageLoading } from 'components'
import NotiItemBackward from '../NotiItemBackward'

import {
  withTheme,
  withLazyQuery,
  withKeyMutation,
  withTranslation,
  withUser
} from 'hocs'
import { SuggestLogin } from 'modules/WarningPage'

import * as QUERY from '../query'
import * as MUTATION from '../mutation'
import Model from '../model'

import Icons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import noNotiImage from 'assets/images/graphics/no-noti.png'
const HIDDEN_BUTTON_WIDTH = 80
const KEY_DELETE_NOTI = 'deleteNoti'
const KEY_READ_NOTI = 'readNoti'

const NOTI_KEY_STORAGE = Constants.storageKey.notification.LIST_NOTIFICATION

function NotiHome(props) {
  const {
    theme,
    data,
    setVariables,
    keyMutation,
    refetch,
    user,
    translate,
    loading
  } = props
  const { colors } = theme
  const [notiList, setNotiList] = useState(null)
  const [images, setImages] = useState([])
  const { sharing, setSharing } = useContext(ApplicationContext)
  const record = Model(data)
  const navigation = useNavigation()
  const { edges, meta } = record.notiList

  const [headerShadow, setHeaderShadow] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isNoNotiList, setNoNotiList] = useState(false)
  const [rowOpenKey, setRowOpenKey] = useState(null)

  useEffect(() => {
    if (user.id) getListNotification()
  }, [user])

  useEffect(() => {
    if (meta.current_page && edges) {
      if (meta.current_page === 1 && edges.length === 0) {
        return setNoNotiList(true)
      }
      if (edges.length === 0) return

      const ims = onMappingImages(edges)

      edges.forEach(({ node }) => {
        ims.push({
          uri: orEmpty('sender.avatar_url', node)
        })
      })

      if (meta.current_page === 1) {
        setNotiList(edges)
        setImages(ims)

        Storage.setWithExpired(NOTI_KEY_STORAGE, edges, 15 * 60 * 1000)
        return
      }

      setImages([...images].concat(ims))
      setNotiList([...notiList].concat(edges))
    }
  }, [edges, meta])

  useEffect(() => {
    if (images.length) FastImage.preload(withUniq(images))
  }, [images])

  const getListNotification = useCallback(() => {
    const getData = async () => {
      const storageData = await Storage.getWithExpired(NOTI_KEY_STORAGE)
      if (storageData && storageData.length > 0) {
        const ims = onMappingImages(storageData)

        setImages([...images].concat(ims))
        setNotiList(storageData)

        return
      }
      setVariables(fetchListNoti(1))
    }

    getData()
  })

  const onMappingImages = items => {
    const ims = []

    items.forEach(({ node }) => {
      ims.push({
        uri: orEmpty('sender.avatar_url', node)
      })
    })

    return ims
  }

  useEffect(() => {
    return () => {
      setImages([])
    }
  }, [])

  // ==========HANDLE HEADER============

  function onAnimateScrollEndDrag({ nativeEvent }) {
    const { contentOffset } = nativeEvent
    const scrollY = contentOffset.y
    setHeaderShadow(scrollY > 20)
  }

  function onMomentumScrollEnd({ nativeEvent }) {
    const { contentOffset } = nativeEvent
    const scrollY = contentOffset.y
    if (scrollY < 20) {
      setHeaderShadow(false)
    }
  }

  function fetchListNoti(pg = 1) {
    return { variables: { page: pg } }
  }

  function handleLoadmore() {
    if (meta.next_page) return setVariables(fetchListNoti(meta.next_page))

    if (notiList.length > 0 && !meta.current_page)
      setVariables(fetchListNoti(2))
  }

  function onRefreshListNoti() {
    setRefreshing(true)
    if (refetch) refetch(fetchListNoti(1))
    else setVariables(fetchListNoti(1))
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  function deleteNoti(rowMap, data) {
    Alert.alert(
      translate('delNotiWarn'),
      '',
      [
        {
          text: translate('no'),
          onPress: () => {
            if (rowMap) {
              rowMap[rowOpenKey].closeRow()
            }
          },
          style: 'cancel'
        },
        {
          text: translate('yes'),
          onPress: () => {
            keyMutation[KEY_DELETE_NOTI]({
              variables: { input: { id: data.item.node.id } },
              fetchPolicy: 'no-cache',
              awaitRefetchQueries: true,
              refetchQueries: () => refetch && refetch()
            })
          }
        }
      ],
      { cancelable: false }
    )

    removeFromContext(data.item.node.id)
  }

  function updateReadNoti(id, isReaded) {
    keyMutation[KEY_READ_NOTI]({
      variables: {
        input: {
          attribute: { id, status: isReaded ? 'readed' : 'unread' }
        }
      },
      fetchPolicy: 'no-cache',
      awaitRefetchQueries: true,
      refetchQueries: () => refetch && refetch()
    })
  }

  const openChatLoveNoti = useCallback(() => {
    navigation.navigate(Routes.chatLoveHome, {
      isChatLove: true
    })
  }, [navigation])

  const openBookingNoti = useCallback(
    dataParse => {
      const bookingId = orNull('booking_id', dataParse)
      navigation.navigate(Routes.bookingDetail, {
        bookingId: bookingId
      })
    },
    [navigation]
  )

  const openPaymentNoti = useCallback(
    dataParse => {
      const paymentableType = orNull('paymentable_type', dataParse)
      const paymentableId = orNull('paymentable_id', dataParse)
      if (paymentableType === 'Booking') {
        navigation.navigate(Routes.bookingDetail, {
          bookingId: paymentableId
        })
        return
      }
    },
    [navigation]
  )

  const openVoteNoti = useCallback(
    dataParse => {
      const votableType = orNull('votable_type', dataParse)
      const votableId = orNull('votable_id', dataParse)
      if (votableType === 'Comment') {
        navigation.navigate(Routes.commentList, {
          isReplyNoti: true,
          originComment: { id: votableId }
        })
        return
      }
      if (votableType === 'Article') {
        navigation.navigate(Routes.articleDetail, {
          articleId: votableId
        })
        return
      }
    },
    [navigation]
  )

  const openCommentNoti = useCallback(
    dataParse => {
      const commentableType = orNull('commentable_type', dataParse)
      const commentableId = orNull('commentable_id', dataParse)

      if (commentableType === 'Article') {
        navigation.navigate(Routes.commentList, {
          isCommentNoti: true,
          id: commentableId
        })
        return
      }
      if (commentableType === 'Comment') {
        navigation.navigate(Routes.commentList, {
          isReplyNoti: true,
          originComment: { id: commentableId }
        })
        return
      }
    },
    [navigation]
  )

  const navigateRoute = useCallback(data => {
    const dataParse = JSON.parse(data)
    const notiType = orNull('type', dataParse)

    switch (notiType) {
      case 'chatLove':
        openChatLoveNoti()
        break
      case 'darling':
        openChatLoveNoti()
        break
      case 'booking':
        openBookingNoti(dataParse)
        break
      case 'payment':
        openPaymentNoti(dataParse)
        break
      case 'vote':
        openVoteNoti(dataParse)
        break
      case 'comment':
        openCommentNoti(dataParse)
        break
      case 'reply':
        openCommentNoti(dataParse)
        break
      default:
        break
    }
  })

  function renderSubMessage(subMessage) {
    if (subMessage) {
      return <NotiMessage>{subMessage}</NotiMessage>
    }
  }

  function renderNotiItem({ item }) {
    const id = orNull('node.id', item)
    const title = orEmpty('node.title', item)
    const status = orNull('node.status', item)
    return (
      <NotiWrapper shadowType={3}>
        <NotiItemWrapper
          onPress={() => {
            if (id) {
              navigateRoute(orObject('node.data', item))
              if (status !== 'readed') updateReadNoti(id, true)
            }
          }}
          activeOpacity={0.8}
        >
          <LeftNotiWrapper>
            {orNull('node.sender.avatar_url', item) ? (
              <AvatarDefaultWrapper shadowType={4}>
                <UserAvatar
                  source={{
                    uri: orEmpty('node.sender.avatar_url', item)
                  }}
                />
              </AvatarDefaultWrapper>
            ) : (
              <AvatarDefaultWrapper shadowType={4}>
                <FeatherIcon name={'user'} size={20} color={colors.gray_4} />
              </AvatarDefaultWrapper>
            )}

            <StatusCicle show={status === 'unread'} />
          </LeftNotiWrapper>

          <NotiContentWrapper>
            <NotiContent>
              {title !== '' ? title : translate('notification')}
            </NotiContent>
            <NotiMessage>{orEmpty('node.message', item)}</NotiMessage>
            {renderSubMessage(orNull('node.sub_message', item))}
            <NotiTime>{orEmpty('node.created_in_word', item)}</NotiTime>
          </NotiContentWrapper>
          <Icons name='ios-arrow-forward' color={colors.gray_4} size={18} />
        </NotiItemWrapper>
      </NotiWrapper>
    )
  }

  function removeFromContext(id) {
    setSharing(removeDataFromList('noti', 'data.id', id, sharing))
  }

  function readNotification(data, rowMap) {
    const id = orNull('item.node.id', data)
    const status = orNull('item.node.status', data)

    if (!id) return

    rowMap[rowOpenKey].closeRow()
    updateReadNoti(id, status === 'unread')

    removeFromContext(id)
  }

  function renderHiddenItem(data, rowMap) {
    return (
      <NotiItemBackward
        notiData={data.item}
        deleteNoti={() => deleteNoti(rowMap, data)}
        convertRead={() => readNotification(data, rowMap)}
        colors={colors}
        setNotiList={setNotiList}
        translate={translate}
      />
    )
  }

  function renderNoData() {
    if (isNoNotiList) {
      return (
        <NoNotiWrapper>
          <NoNotiThumb source={noNotiImage} resizeMode={'contain'} />
          <NoNotiDescription>{translate('emptyNoti')}</NoNotiDescription>
        </NoNotiWrapper>
      )
    }
    return null
  }

  function renderFooter() {
    return <Footer>{meta.next_page && <LoadingSpinner size='small' />}</Footer>
  }

  function renderBody() {
    if (!loading || (notiList && notiList.length > 0)) {
      return (
        <ListNoti
          data={notiList}
          renderItem={renderNotiItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={HIDDEN_BUTTON_WIDTH}
          rightOpenValue={-HIDDEN_BUTTON_WIDTH}
          keyExtractor={(item, index) => `${item.node.id}----${index}`}
          onScrollEndDrag={onAnimateScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshListNoti}
            />
          }
          showsVerticalScrollIndicator={false}
          onRowOpen={key => setRowOpenKey(key)}
          onEndReachedThreshold={0.02}
          onEndReached={handleLoadmore}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderNoData}
        />
      )
    }

    return <PageLoading isList />
  }

  return (
    <Wrapper>
      <Header title={translate('notification')} shadow={headerShadow} icon />
      {user.id ? renderBody() : <SuggestLogin />}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withUser,
  withLazyQuery({
    query: QUERY.getListNoti,
    service: GateWay.NOTIFICATION_SERVICE,
    hideLoading: true
  }),
  withKeyMutation({
    mutation: MUTATION.v1DeleteNotification,
    service: GateWay.NOTIFICATION_SERVICE,
    key: KEY_DELETE_NOTI
  }),
  withKeyMutation({
    mutation: MUTATION.v1UpdateNotification,
    service: GateWay.NOTIFICATION_SERVICE,
    key: KEY_READ_NOTI
  })
)(NotiHome)
