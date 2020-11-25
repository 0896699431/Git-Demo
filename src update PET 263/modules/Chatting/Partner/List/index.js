import React, { useState, useEffect, useCallback } from 'react'
import { View } from 'react-native'
import moment from 'moment'

import { useNavigation } from '@react-navigation/native'

import { withTheme } from 'hocs'
import { orNull } from 'utils/Selector'
import Routes from 'utils/Routes'

import {
  Wrapper,
  FlatList,
  UserWrapper,
  DumbingRow,
  UserAva,
  LeftWrapper,
  UserName,
  PromtMessage,
  UnreadDot,
  styles
} from './styled'

import ChatAPI from 'api/Chat'

import { useChannels } from '../../../../hooks/chat/useChannels'
import { updateReadStatus } from 'api/PartnerChat'

function List () {
  const { fetchChannelsAsync, channels } = useChannels()
  const navigation = useNavigation()

  function getChannelList () {
    fetchChannelsAsync(ChatAPI.currentUser.uid)
  }
  useEffect(() => {
    getChannelList()
  }, [])

  function keyExtractor (index) {
    return `ChatPartnerList--->${index}`
  }

  const renderChatListItem = ({ item }) => {
    const memberFilter = item.members.filter(
      filItem => filItem.uid !== ChatAPI.currentUser.uid
    )

    const userAvatar = orNull('avatar_url', memberFilter[0])
    const userName = orNull('name', memberFilter[0])
    const userUid = orNull('uid', memberFilter[0])

    const storePartner = {
      avatar_url: userAvatar,
      name: userName,
      uid: orNull('uid', memberFilter[0])
    }

    const isUnreadUser = userUid === item.readStatus.uid

    return (
      <UserWrapper
        shadowType={3}
        onPress={() => {
          !isUnreadUser && updateReadStatus(item.id, userUid, false)
          navigation.navigate(Routes.partnerChatDetail, {
            storePartner,
            getChannelList
          })
        }}
      >
        <DumbingRow>
          <View style={styles.row}>
            <UserAva source={{ uri: userAvatar }} />
            <LeftWrapper>
              <UserName>{userName}</UserName>
              <View style={styles.row}>
                <PromtMessage>
                  {item.lastMessage.substring(0, 20)} -
                </PromtMessage>
                <PromtMessage isTime>
                  {item.lastMessageAt &&
                    moment(item.lastMessageAt).format('Do MM')}
                </PromtMessage>
              </View>
            </LeftWrapper>
          </View>
          {!isUnreadUser && item.readStatus.unread ? <UnreadDot /> : <View />}
        </DumbingRow>
      </UserWrapper>
    )
  }

  const renderBody = () => {
    if (channels.length) {
      return (
        <FlatList
          data={channels}
          extraData={channels}
          renderItem={renderChatListItem}
          keyExtractor={(item, index) => keyExtractor(index)}
          showsVerticalScrollIndicator={false}
        />
      )
    }
  }

  return <Wrapper>{renderBody()}</Wrapper>
}

export default withTheme(List)
