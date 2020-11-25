import React, { useState, useEffect, useCallback } from 'react'
import {
  useNavigation,
  StackActions,
  useRoute,
  useIsFocused
} from '@react-navigation/native'
import { orNull } from 'utils/Selector'

import { withTheme } from 'hocs'
import { Wrapper } from './styled'
import MatchList from '../MatchList'
import ChatList from '../List'
import { Header } from 'components'
import API from '../../../../api/Chat'

function List() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const route = useRoute()
  const popAction = StackActions.pop(2)
  const isChatLove = orNull('params.isChatLove', route)

  const [roomList, setRoomList] = useState([])
  const [unreadMessagesCounts, setUnreadCount] = useState(0)

  async function getUserUnreadMessagesCount(roomId, userId) {
    const unreadMessagesCountSnap = await API.dbRef
      .child(`unreadMessagesCount/${roomId}/${userId}`)
      .once('value')
    return unreadMessagesCountSnap.val() || 0
  }

  async function getUserUnreadMessagesCounts(roomIds, userId) {
    // Get unread messages as an array of objects
    const unreadMessages = await Promise.all(
      roomIds.map(async roomId => {
        // Get the unread message count for the current user and the room being looped over
        const roomUnreadMessagesCount = await getUserUnreadMessagesCount(
          roomId,
          userId
        )
        return {
          roomId,
          count: roomUnreadMessagesCount
        }
      })
    )

    // Convert the array of objects to an object using the room id as the key and the unread messages count as the value
    return unreadMessages.reduce(
      (obj, item) => ({
        ...obj,
        [item.roomId]: item.count
      }),
      {}
    )
  }

  const onGetChatRooms = useCallback(() => {
    async function execute() {
      const rooms = await API.getRoomsByUserId(API.currentUser.uid)

      if (!rooms || !rooms.length) {
        setRoomList([])
        return
      }

      setRoomList(rooms)
      const roomIds = rooms.map(room => room.id)
      setUnreadMessagesCounts(roomIds)
    }

    if (isFocused) execute()
  })

  async function setUnreadMessagesCounts(roomIds) {
    const currentUserUnreadMessagesCounts = await getUserUnreadMessagesCounts(
      roomIds,
      API.currentUser.uid
    )

    setUnreadCount(currentUserUnreadMessagesCounts)
  }

  useEffect(() => onGetChatRooms(), [isFocused])

  const renderHeader = () => {
    return (
      <Header
        title={'PET LOVE'}
        onCustomBack={() => navigation.dispatch(popAction)}
        back
        noIcon
      />
    )
  }

  return (
    <Wrapper>
      {renderHeader()}
      <MatchList unreadMessagesCounts={unreadMessagesCounts} />
      <ChatList
        roomList={roomList}
        setUnreadMessagesCounts={setUnreadMessagesCounts}
        unreadMessagesCounts={unreadMessagesCounts}
        isChatLove={isChatLove}
      />
    </Wrapper>
  )
}

export default withTheme(List)
