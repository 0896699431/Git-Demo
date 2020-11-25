import firestore from '@react-native-firebase/firestore'
import { uniqueIdGenerator } from 'utils/Helpers'
import storage from '@react-native-firebase/storage'

const uniqueID = uniqueIdGenerator()
// refs
const channelsCollectionRef = () => firestore().collection('DmChannels')
const myChannelsCollectionRef = userId =>
  channelsCollectionRef().where('memberIds', 'array-contains', userId)

const channelRef = uuid =>
  firestore()
    .collection('DmChannels')
    .doc(uuid)

const messagesCollectionRef = uuid => channelRef(uuid).collection('Messages')

export const imageCloudRef = () => storage().ref(`chatParnerImg/${uniqueID}`)

export const fetchMyChannels = async userUid => {
  const querySnapshot = await myChannelsCollectionRef(userUid).get()
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
}

export const createChannels = async (members, userUid, partnerUid) => {
  const myChannels = await fetchMyChannels(userUid)
  const channel = myChannels.find(c => c.memberIds.includes(partnerUid))
  if (channel) {
    return channel.id
  } else {
    const channelDoc = await channelsCollectionRef().add({
      members,
      memberIds: members.map(m => m.uid),
      lastMessageAt: '',
      lastMessage: '',
      readStatus: {
        unread: false,
        uid: userUid
      }
    })
    return (await channelDoc.get()).id
  }
}

export const createMessage = async (uuid, data) => {
  const channelDoc = await messagesCollectionRef(uuid).add({
    ...data,
    createdAt: Date.now()
  })

  // TODO: lastMessageの更新

  return (await channelDoc.get()).data()
}

export const updateChannels = async (uuid, lastMessageAt, lastMessage) => {
  await channelRef(uuid).update(
    'lastMessageAt',
    lastMessageAt,
    'lastMessage',
    lastMessage
  )
}

export const updateReadStatus = async (uuid, partnerUid, readStatus) => {
  await channelRef(uuid).update({
    readStatus: {
      uid: partnerUid,
      unread: readStatus
    }
  })
}

export const fetchMessages = uuid => {
  const messagesHandlers = messagesCollectionRef(uuid)
    .orderBy('createdAt', 'desc')
    .limit(100)
  return messagesHandlers
}

export const uploadImage = imageUrl => {
  const metadata = {
    contentType: 'image/jpeg'
  }
  const imageHandler = imageCloudRef(imageUrl).putFile(imageUrl, metadata)
  return imageHandler
}
