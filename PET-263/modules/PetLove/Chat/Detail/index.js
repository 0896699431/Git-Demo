import React, {
  useEffect,
  useState,
  createRef,
  useRef,
  useCallback
} from 'react'
import { compose } from 'ramda'
import { keyBy, intersection } from 'lodash'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  View,
  Platform,
  TouchableOpacity
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import moment from 'moment'
import ThreeDot from 'react-native-vector-icons/Entypo'
import ActionSheet from 'react-native-actionsheet'

import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { orNull } from 'utils/Selector'
import { withTheme, withTranslation, withMutation, withToast } from 'hocs'
import { Header } from 'components'

import { Wrapper } from './styled'
import ChatApi from 'api/Chat'
import { snapshotToArray } from 'utils/Helpers'
import { GateWay } from 'utils'
import * as MUTATION from '../../mutation'

function Detail ({ theme, translate, mutate, showToast, isCompleted }) {
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = theme
  const chatRef = createRef()
  const actionRef = useRef()

  const [messages, setMessages] = useState([])
  const selectedUsers = orNull('params.selectedUsers', route)

  const ownerUid = orNull('params.ownerUid', route)
  const partnerID = orNull('params.partnerID', route)
  const resetMessCount = orNull('params.resetMessCount', route)

  const [chatContents] = useState([])
  const [isNewChatRoom, setNewChatRoom] = useState(false)
  const [numMessagesToShow, setNumMessagesToShow] = useState(20)
  const [numMessagesToIncrement] = useState(20)
  const [chatRoomRef, setChatRoomRef] = useState(null)
  const [chatRoomId, setChatRoomId] = useState(null)
  const [roomUsers, setRoomUsers] = useState(null)
  const [nonCurrentUserRoomUserIds, setNonCurrentUserRoomUserIds] = useState(
    null
  )
  const [chatRoomID, setChatRoomID] = useState(null)
  const [isChatAvailable, setChatAvailable] = useState(false)
  const [newChatRoomID, setNewChatRoomID] = useState(null)

  const liveUpdateMessages = messagesRef => {
    messagesRef.on('value', messagesSnapshot => {
      const messages = snapshotToArray(messagesSnapshot).map(message => {
        return {
          _id: message.createdAt,
          text: message.text,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.uid,
            avatar: roomUsers[message.uid].photoURL
          }
        }
      })
      setMessages(messages.reverse())
    })
  }

  function getKeyByValue (object, value) {
    return Object.keys(object).find(key => object[key] === value)
  }

  const onGetUserRoomsData = useCallback(() => {
    async function execute () {
      const partnerRef = ChatApi.dbRef.child(
        `userRooms/${selectedUsers[0].uid}`
      )
      const value = await partnerRef.once('value')
      const valueSnap = snapshotToArray(value)
      if (valueSnap.length) {
        setChatAvailable(true)
      }
    }

    execute()
  })

  async function removeUnreadMessage () {
    const roomUserUnreadRef = ChatApi.dbRef.child(
      `unreadMessagesCount/${chatRoomID}`
    )

    await roomUserUnreadRef.remove()
  }

  async function removeNewUnreadMess () {
    const newRoomUserUnreadRef = ChatApi.dbRef.child(
      `unreadMessagesCount/${newChatRoomID}`
    )

    const value = await newRoomUserUnreadRef.once('value')
    const unValueSnap = snapshotToArray(value)
    if (unValueSnap.length === 1) {
      newRoomUserUnreadRef.remove()
    }
  }

  async function removeUserRoom () {
    const roomUserRef = ChatApi.dbRef.child(`roomUsers/${chatRoomID}`)
    await roomUserRef.remove()
  }

  async function removeOwner () {
    const ownerRef = ChatApi.dbRef.child('userRooms').child(ownerUid)
    const value = await ownerRef.once('value')
    const ownerSnap = snapshotToArray(value).filter(item => item === chatRoomID)
    const itemOwnerId = getKeyByValue(value.val(), ownerSnap[0])
    ownerRef.child(itemOwnerId).remove()
  }

  async function removePartner () {
    const partnerRef = ChatApi.dbRef.child(`userRooms/${selectedUsers[0].uid}`)

    const partnerValue = await partnerRef.once('value')
    const partnerSnap = snapshotToArray(partnerValue).filter(
      item => item === chatRoomID
    )
    const itemPartnerId = getKeyByValue(partnerValue.val(), partnerSnap[0])
    partnerRef.child(itemPartnerId).remove()
  }

  async function deleteRoom () {
    if (!chatRoomID || !chatRoomRef) return

    try {
      removePartner()
      removeOwner()
      removeUserRoom()
      removeUnreadMessage()

      await chatRoomRef.remove()
      navigation.goBack()
    } catch (error) {
      console.log('DELETE ROOM ERROR', error)
    }
  }

  const onComplete = useCallback(() => {
    if (!isCompleted) return

    showToast({
      message: 'Thông báo!',
      description: 'Bạn đã huỷ matching thành công.'
    })

    if (resetMessCount) {
      resetMessCount()
    }

    if (isChatAvailable) {
      deleteRoom()

      return
    }

    removeNewUnreadMess()
    navigation.goBack()
  })

  const onResetMessageCount = useCallback(() => {
    if (resetMessCount) {
      resetMessCount()
    }
  })

  const onLeaveChatRoom = useCallback(() => {
    if (chatRoomRef) {
      liveUpdateMessages(
        chatRoomRef.child('messages').limitToLast(numMessagesToShow)
      )

      ChatApi.setOrIncrementUnreadMessageCount({
        roomId: chatRoomRef.key,
        userIds: [ChatApi.currentUser.uid],
        isCountBeingReset: true
      })
    }
  })

  // GET CHAT ROOM ID
  const getChatRoomId = async () => {
    if (chatRoomId) {
      setChatRoomId(chatRoomId)

      return
    }

    const currentUserRoomIds = await ChatApi.getUserRoomIds(
      ChatApi.currentUser.uid
    )

    if (selectedUsers) {
      const selectedUsersRoomIds = await Promise.all(
        selectedUsers.map(async user => ChatApi.getUserRoomIds(user.uid))
      )
      // Find the room they are all in together or return undefined
      return intersection(currentUserRoomIds, ...selectedUsersRoomIds)[0]
    }
  }

  // GET CHAT ROOM REF
  const getChatRoomRef = useCallback(() => {
    async function execute () {
      const chatRoomId = await getChatRoomId()

      if (chatRoomId) {
        setChatRoomRef(ChatApi.dbRef.child(`chatRooms/${chatRoomId}`))
        setChatRoomID(chatRoomId)

        return
      }

      const newChatRoomId = ChatApi.dbRef.child('chatRooms').push().key
      setNewChatRoomID(newChatRoomId)
      setChatRoomRef(ChatApi.dbRef.child(`chatRooms/${newChatRoomId}`))
      setNewChatRoom(true)
    }

    execute()
  })

  const onAppendChatContent = useCallback(() => {
    if (!chatContents.length) return

    const chatConfig = chatContents.map(item => {
      const { node } = item
      const createdAt = moment(node.created_at).format('MM-DD-YYYY')

      const obj = {
        _id: node.id,
        text: orNull('content', node),
        createdAt,
        user: {
          _id: orNull('sender.id', node),
          name: orNull('sender.name', node)
        }
      }
      return obj
    })

    setMessages(chatConfig)
  })

  const onGetRoomUsers = useCallback(() => {
    async function execute () {
      let theRoomUsers = null

      theRoomUsers = keyBy(selectedUsers, 'uid')
      theRoomUsers[ChatApi.currentUser.uid] = {
        name: ChatApi.currentUser.displayName,
        photoURL: ChatApi.currentUser.photoURL,
        email: ChatApi.currentUser.email,
        uid: ChatApi.currentUser.uid,
        id: partnerID
      }

      if (chatRoomId) {
        const roomData = await ChatApi.getRoomsByIds([chatRoomId])
        theRoomUsers = keyBy(roomData[0].users, 'uid')
      }

      setRoomUsers(theRoomUsers)
    }

    if (selectedUsers) execute()
  })

  const getOtherRoomUserIds = roomUsers =>
    Object.keys(roomUsers).filter(userId => userId !== ChatApi.currentUser.uid)

  const onSetRoomUsers = useCallback(() => {
    if (roomUsers) {
      const nonUser = getOtherRoomUserIds(roomUsers)
      setNonCurrentUserRoomUserIds(nonUser)
    }
  })

  useEffect(() => {
    onGetUserRoomsData()
    onResetMessageCount()
    getChatRoomRef()
  }, [])

  useEffect(() => onComplete(), [isCompleted])
  useEffect(() => onLeaveChatRoom(), [chatRoomRef])
  useEffect(() => onGetRoomUsers(), [selectedUsers, chatRoomId])
  useEffect(() => onAppendChatContent(), [chatContents])
  useEffect(() => onSetRoomUsers(), [roomUsers])

  function setPersonalRoom () {
    const roomUserKey = Object.keys(roomUsers)
    const receiverUid = roomUserKey.filter(
      key => key !== ChatApi.currentUser.uid
    )

    chatRoomRef.set({
      isPersonal: true,
      receiverUid: receiverUid[0],
      senderId: ChatApi.currentUser.uid
    })
  }

  function createNewRoomData () {
    const roomUserIds = Object.keys(roomUsers)

    ChatApi.setRoomUsers(chatRoomRef.key, roomUserIds)
    ChatApi.setUsersRoom(chatRoomRef.key, roomUserIds)
    setNewChatRoom(false)
  }

  const onSend = (messages = []) => {
    if (isNewChatRoom) {
      setPersonalRoom()
      createNewRoomData()
    }

    ChatApi.setOrIncrementUnreadMessageCount({
      roomId: chatRoomRef.key,
      userIds: nonCurrentUserRoomUserIds
    })

    setNumMessagesToShow(prev => prev + numMessagesToIncrement)
    const now = new Date().getTime()
    const messageValues = {
      text: messages[0].text,
      createdAt: now,
      uid: ChatApi.currentUser.uid
    }
    chatRoomRef.child('messages').push(messageValues)

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    )
  }

  const CustomBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary_1
          }
        }}
      />
    )
  }
  const renderChat = () => {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          placeholder={translate('typing')}
          messages={messages}
          ref={chatRef}
          isTyping
          user={{
            _id: ownerUid
          }}
          onSend={messages => onSend(messages)}
          renderLoading={() => <ActivityIndicator size='small' />}
          renderBubble={CustomBubble}
          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: colors.white_theme
              }}
              textInputStyle={{
                color: colors.black_theme
              }}
            />
          )}
          scrollToBottom
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView /> : null}
      </View>
    )
  }

  function cancelMatching () {
    Alert.alert(
      translate('cancelMatchAsk'),
      '',
      [
        {
          text: translate('no'),
          style: 'cancel'
        },
        {
          text: translate('yes'),
          onPress: () => {
            mutate({
              variables: { input: { id: partnerID } },
              fetchPolicy: 'no-cache',
              awaitRefetchQueries: true
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  const renderThreeDot = () => {
    return (
      <TouchableOpacity onPress={() => actionRef.current.show()}>
        <ThreeDot
          name='dots-three-horizontal'
          color={colors.primary_1}
          size={23}
        />
      </TouchableOpacity>
    )
  }

  const renderActionSheet = () => {
    return (
      <ActionSheet
        ref={actionRef}
        title={translate('optionPicker')}
        options={[`${translate('cancelMatching')}`, 'Cancel']}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={index => {
          if (index === 0) cancelMatching()
        }}
      />
    )
  }

  return (
    <Wrapper>
      <Header
        title={selectedUsers ? selectedUsers[0].name : ''}
        back
        headerColor={{ bg: colors.white_theme }}
        onBack={() => {
          removeNewUnreadMess()
          if (resetMessCount) {
            resetMessCount()
          }
        }}
        icon={renderThreeDot()}
      />
      {renderChat()}

      {renderActionSheet()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withToast,
  withMutation({
    mutation: MUTATION.v1DeleteDarling,
    service: GateWay.PET_SERVICE
  })
)(Detail)
