import React, { useState } from 'react'
import { View, RefreshControl } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { withTheme } from 'hocs'
import { Routes } from 'utils'
import messaging from '@react-native-firebase/messaging'
import { orNull } from 'utils/Selector'

import {
  Wrapper,
  Text,
  UserWrapper,
  UserAva,
  LeftWrapper,
  UserName,
  FlatList,
  styles,
  UnreadDot,
  DumbingRow
} from './styled'
import ChatAPI from 'api/Chat'

function List({
  roomList,
  unreadMessagesCounts,
  setUnreadMessagesCounts,
  isChatLove
}) {
  const navigation = useNavigation()
  const [fromChatLoveNav, setFromChatLoveNav] = useState(isChatLove)
  const [isRefresh, setIsRefresh] = useState(false)

  function onGetLovingMessage() {
    const unsubscribeOnMessage = messaging().onMessage(item => {
      const notiData = orNull('data', item)
      const notiType = orNull('type', notiData)

      if (notiType === 'chatLove') {
        setFromChatLoveNav(true)
      }
    })

    return {
      unsubscribeOnMessage
    }
  }

  React.useEffect(() => {
    const unsubscribe = onGetLovingMessage()

    return () => {
      unsubscribe.unsubscribeOnMessage()
    }
  })

  function keyExtractor(index) {
    return `ChatRoomList--->${index}`
  }

  const renderRoomsItem = ({ item }) => {
    if (item !== null) {
      const partnerAvatar = ChatAPI.getRoomPicture(item, [
        orNull('uid', ChatAPI.currentUser)
      ])
      const partnerName = ChatAPI.getRoomName(item, [
        orNull('uid', ChatAPI.currentUser)
      ])

      const partnerUID = ChatAPI.getRoomUid(item, [
        orNull('uid', ChatAPI.currentUser)
      ])
      const partnerID = ChatAPI.getRoomParnerId(item, [
        orNull('uid', ChatAPI.currentUser)
      ])

      return (
        <UserWrapper
          shadowType={3}
          onPress={() => {
            setFromChatLoveNav(false)
            navigation.navigate(Routes.chatLoveDetail, {
              selectedUsers: [
                {
                  name: partnerName,
                  photoURL: partnerAvatar,
                  uid: partnerUID
                }
              ],
              ownerUid: orNull('uid', ChatAPI.currentUser),
              partnerID: partnerID,
              resetMessCount: async () => {
                await setUnreadMessagesCounts([item.id])
              }
            })
            setUnreadMessagesCounts(item.id)
          }}
        >
          <DumbingRow>
            <View style={styles.row}>
              <UserAva source={{ uri: partnerAvatar }} />
              <LeftWrapper>
                <UserName>{partnerName}</UserName>
                {/* <PromtMessage>Send me something to eat</PromtMessage> */}
              </LeftWrapper>
            </View>
            {(unreadMessagesCounts !== null &&
              unreadMessagesCounts[item.id] > 0) ||
            fromChatLoveNav ? (
              <UnreadDot />
            ) : (
              <View />
            )}
          </DumbingRow>
        </UserWrapper>
      )
    }
  }

  function onRefresh() {
    setIsRefresh(false)
  }

  const renderBody = () => {
    if (ChatAPI.currentUser !== null) {
      return (
        <FlatList
          data={roomList}
          extraData={roomList}
          renderItem={renderRoomsItem}
          keyExtractor={(item, index) => keyExtractor(index)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
        />
      )
    }
    return null
  }

  return (
    <Wrapper>
      <Text>Chats</Text>
      <View style={styles.body}>{renderBody()}</View>
    </Wrapper>
  )
}

export default withTheme(List)
