import { useState, useCallback, useEffect } from 'react'
import storage from '@react-native-firebase/storage'

import { orNull } from 'utils/Selector'

import * as firestoreService from '../../api/PartnerChat'

export const useChannels = channelId => {
  const [messages, setMessages] = useState([])
  const [messageImageUrl, setMessageImageUrl] = useState('')
  const [channels, setChannels] = useState([])

  const saveNewChannel = useCallback(async (members, uid) => {
    try {
      const channel = await firestoreService.createChannels(members, uid)

      return channel
    } catch (error) {
      console.log('SAVE NEW CHANNEL ERROR', error)
    }
  }, [])

  const fetchChannelsAsync = useCallback(async userUid => {
    try {
      const channels = await firestoreService.fetchMyChannels(userUid)
      setChannels(channels)
    } catch (error) {
      console.log('FETCH CHANNEL ERORR', error)
    }
  }, [])

  const fetchMessagesAsync = useCallback(() => {
    try {
      const messageListner = firestoreService
        .fetchMessages(channelId)
        .onSnapshot(querySnapshot => {
          let result = []
          result = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))
          setMessages(result)
        })
      return () => messageListner()
    } catch (error) {
      console.log('FETCH MESS ASYNC ERROR', error)
    }
  }, [channelId])

  const createMessage = useCallback(
    async (body, image, userUid, partnerUid, readStatus) => {
      try {
        const message = await firestoreService.createMessage(channelId, {
          senderId: userUid,
          image,
          body
        })
        firestoreService.updateChannels(
          channelId,
          orNull('createdAt', message),
          orNull('body', message)
        )
        firestoreService.updateReadStatus(channelId, partnerUid, readStatus)
        return message
      } catch (error) {
        console.log('CREATE MESSAGE ERROR', error)
      }
    },
    [channelId]
  )

  const uploadImageAsync = useCallback(async imageUrl => {
    try {
      firestoreService
        .uploadImage(imageUrl)
        .on('state_changed', async snapShot => {
          if (snapShot.state === storage.TaskState.SUCCESS) {
            const imageResponseUrl = await firestoreService
              .imageCloudRef(imageUrl)
              .getDownloadURL()
            setMessageImageUrl(imageResponseUrl)
          }
        })
    } catch (error) {
      console.log('UPLOAD IMAGE ERORR', error)
    }
  }, [])

  return {
    messages,
    saveNewChannel,
    fetchMessagesAsync,
    uploadImageAsync,
    createMessage,
    messageImageUrl,
    setMessageImageUrl,
    fetchChannelsAsync,
    channels
  }
}
