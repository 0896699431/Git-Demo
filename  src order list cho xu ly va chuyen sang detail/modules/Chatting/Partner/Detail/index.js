import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'

import Icon from 'react-native-vector-icons/Entypo'
import SendIcon from 'react-native-vector-icons/FontAwesome'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import Lightbox from 'react-native-lightbox'

import ImagePicker from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'
import { withTheme } from 'hocs'
import { Header } from 'components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { orNull } from 'utils/Selector'

import {
  Wrapper,
  CameraWrapper,
  ImageWrapper,
  TimeText,
  styles
} from './styled'
import ChatAPI from 'api/Chat'
import { useChannels } from '../../../../hooks/chat/useChannels'

const pickerOptions = {
  title: 'Chọn ảnh',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

function List ({ theme }) {
  const [messageData, setMessages] = useState([])
  const [channelId, setChannelId] = useState(null)
  const { colors } = theme

  const {
    saveNewChannel,
    createMessage,
    messages,
    fetchMessagesAsync,
    messageImageUrl,
    setMessageImageUrl,
    uploadImageAsync
  } = useChannels(channelId)

  const route = useRoute()

  const storePartner = orNull('params.storePartner', route)
  const getChannelList = orNull('params.getChannelList', route)

  const currentUser = {
    avatar_url: orNull('currentUser.photoURL', ChatAPI),
    name: orNull('currentUser.displayName', ChatAPI),
    uid: orNull('currentUser.uid', ChatAPI),
    unread: false
  }

  const getChannel = async () => {
    const storePartnerAssign = Object.assign(storePartner, { unread: false })
    const channelResponse = await saveNewChannel(
      [storePartnerAssign, currentUser],
      storePartner.uid
    )
    if (channelResponse) {
      setChannelId(channelResponse)
    }
  }

  useEffect(() => {
    getChannel()
  }, [])

  const onAppendChatContent = () => {
    if (!messages.length) return
    const result = []
    messages.map(item => {
      const obj = {
        _id: item.id,
        text: item.body,
        createdAt: item.createdAt,
        image: item.image,
        user: {
          _id: item.senderId,
          name: orNull('name', storePartner),
          avatar:
            orNull('avatar_url', storePartner) !== null
              ? orNull('avatar_url', storePartner)
              : ''
        }
      }
      result.push(obj)
      return result
    })
    setMessages(result)
  }

  useEffect(onAppendChatContent, [messages])

  useEffect(() => {
    fetchMessagesAsync()
  }, [channelId])

  const onSend = useCallback(
    (messageArr = []) => {
      createMessage(
        messageArr[0].text,
        '',
        currentUser.uid,
        storePartner.uid,
        true
      )

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messageArr)
      )
    },
    [createMessage]
  )

  const createMessageWithImage = useCallback(() => {
    createMessage('', messageImageUrl, currentUser.uid, storePartner.uid, true)
    setMessageImageUrl('')
  }, [createMessage, setMessageImageUrl, messageImageUrl])

  useEffect(() => {
    if (messageImageUrl.length) {
      createMessageWithImage()
    }
  }, [messageImageUrl])

  const onPressAddImage = useCallback(() => {
    setMessageImageUrl('')
    ImagePicker.showImagePicker(pickerOptions, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        await uploadImageAsync(response.uri)
      }
    })
  }, [uploadImageAsync, setMessageImageUrl])

  const renderAction = useCallback(() => {
    return (
      <CameraWrapper onPress={onPressAddImage}>
        <Icon name='camera' size={20} color={colors.gray_3} />
      </CameraWrapper>
    )
  }, [])

  const renderMessImage = useCallback(props => {
    const { currentMessage } = props

    return (
      <ImageWrapper>
        <Lightbox
          activeProps={styles.lightBox}
          renderContent={() => (
            <FastImage
              source={{
                uri: currentMessage.image
              }}
              style={styles.imageFlex}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        >
          <FastImage
            source={{ uri: currentMessage.image }}
            style={styles.chatImg}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Lightbox>
      </ImageWrapper>
    )
  }, [])

  const renderCustomTime = useCallback(props => {
    const { currentMessage } = props
    const position = props.position

    const styling = {
      left: StyleSheet.create({
        text: {
          bottom: 3,
          position: 'absolute',
          right: -40
        }
      }),
      right: StyleSheet.create({
        text: {
          bottom: 3,
          left: -40,
          position: 'absolute'
        }
      })
    }

    return (
      <View style={styling[position].text}>
        <TimeText>{moment(currentMessage.createdAt).format('hh:mm')}</TimeText>
      </View>
    )
  }, [])

  function renderSend (props) {
    return (
      <Send {...props}>
        <View style={styles.sendContainer}>
          <SendIcon name={'send'} size={20} color={colors.primary_1} />
        </View>
      </Send>
    )
  }

  const renderChat = useCallback(() => {
    return (
      <GiftedChat
        messages={messageData}
        scrollToBottom
        alwaysShowSend
        renderActions={renderAction}
        renderMessageImage={renderMessImage}
        renderTime={renderCustomTime}
        renderSend={renderSend}
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUser.uid
        }}
      />
    )
  }, [
    messageData,
    renderAction,
    renderMessImage,
    renderCustomTime,
    onSend,
    currentUser
  ])

  return (
    <Wrapper>
      <Header
        title={orNull('name', storePartner)}
        headerColor={{ bg: colors.white_theme }}
        noIcon
        back
        onBack={() => getChannelList && getChannelList()}
      />
      {renderChat()}
    </Wrapper>
  )
}

export default withTheme(List)
