
import auth from '@react-native-firebase/auth'
import rfDatabase from '@react-native-firebase/database'
import { snapshotToArray } from '../../utils/Helpers'
import { orNull } from 'utils/Selector'

class Chat {
  uid = ''
  messageRef = null

  constructor (props) {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.id)
        this.setDbRef()
        this.setCurrentUser()
      }
    })
  }

  setDbRef() {
    this.dbRef = rfDatabase().ref()
  }


  setCurrentUser() {
    this.currentUser = auth().currentUser;
  }

  setUid(value) {
    this.uid = value;
  }

  getUid() {
    return this.uid;
  }
  closeChat() {
    if (this.messagesRef !== undefined) {
      this.messagesRef.off();
    }
  }

    /**
   * Get the user ids for the users in a specified room
   * @param  {String}  roomId
   * @return {Promise} An array of all the users ids of the users in the room
   */
  getRoomUserIds = async roomId => {
    const roomUserIdsSnap = await this.dbRef
      .child(`roomUsers/${roomId}`)
      .once('value');
    return snapshotToArray(roomUserIdsSnap);
  };

    /**
   * Get detailed information about each user id in a list
   * @param  {Array]  userIds
    * @return {Promise}  An array of objects with detailed information about each user
    */
   getUsersByIds = async userIds =>
     Promise.all(
       userIds.map(async userId => {
         // Get the user's name that matches the id for the user
         const userSnap = await this.dbRef
           .child(`users/${userId}`)
           .once('value');
         const user = userSnap.val()
         if (user) {
           return {
             name: user.name,
             photoURL: user.photoURL,
             uid: userId,
             id: user.id
           }
         } else {
          return null
         }
         
       })
     )

    /**
     * Get detailed information about all rooms for a specified user
     * @param  {String}  userId
     * @return {Promise} An array of objects with detailed information about each room
     */
  getRoomsByUserId = async userId => {
    // Get the room ids for the user
    // const roomIds = await this.getUserRoomIds(userId);
    const roomIds = await this.getUserRoomIds(userId);
    // Get detailed information about each room by its id
    return this.getRoomsByIds(roomIds);
  }

    /**
   * Get the rooms for a specified user
   * @param  {String}  userId
   * @return {Promise}  An array of all the room ids that a user is in
   */
  getUserRoomIds = async userId => {
    const userRoomsRef = this.dbRef.child(`userRooms/${userId}`);
    const userRoomsSnap = await userRoomsRef.once('value');
    return snapshotToArray(userRoomsSnap);
  };


    /**
   * Get detailed information about each room id in a list
   * @param  {Array}  roomIds
   * @return {Promise} An array of objects with detailed information about each room
   */
  getRoomsByIds = async roomIds =>
    Promise.all(
      roomIds.map(async roomId => {
        // Get the user ids of all the users in the current room in the loop
        const roomUserIds = await this.getRoomUserIds(roomId);
        // Get detailed information about each user by their id
        const users = await this.getUsersByIds(roomUserIds);
       
        return {
          id: roomId,
          users,
        };
      })
    );




    /**
   * Create room name by the following priority
   * 1. An assigned room name
   * 2. A comma separated list of all the user's names in the room
   * @param  {Object} room  Detailed information about a room
   * @param  {Array}  [userIds=[]] An array of user ids with which to filter out users
   * @return {String} Assigned room name or Comma separated list of all users
   */
  getRoomName = (room, userIdsToFilterOut = []) =>
    room.name ||
    room.users
      .filter(item => !userIdsToFilterOut.includes(orNull('uid', item)))
      .map(item => orNull('name', item))
      .join('');

getRoomPicture = (room, userIdsToFilterOut = []) =>
  room.name ||
  room.users
    .filter((item) => !userIdsToFilterOut.includes(orNull('uid', item)))
    .map((item) => orNull('photoURL', item))
    .join('');


getRoomUid = (room, userIdsToFilterOut = []) =>
  room.name ||
  room.users
    .filter((item) => !userIdsToFilterOut.includes(orNull('uid', item)))
    .map(item => orNull('uid', item))
    .join('');

getRoomParnerId = (room, userIdsToFilterOut = []) =>
  room.name ||
  room.users
    .filter((item) => !userIdsToFilterOut.includes(orNull('uid', item)))
    .map(item => orNull('id', item))
    .join('')

setOrIncrementUnreadMessageCount = ({
  roomId,
  userIds,
  isCountBeingReset,
}) => {
  userIds.forEach(userId => {
    const userUnreadMessagesRef = this.dbRef.child(
      `unreadMessagesCount/${roomId}/${userId}`
    );
    userUnreadMessagesRef.transaction(currentCount =>
      isCountBeingReset ? 0 : (currentCount || 0) + 1
    );
  });
};


setUsersRoom = (chatRoomId, userIds) => {
  userIds.map(userID => {
    const userRoomsRef = this.dbRef.child('userRooms').child(userID)
    const key = userRoomsRef.push().key
    userRoomsRef.update({ [key]: chatRoomId })
  })
};

/**
 * Save the users for this chat room to the roomUsers collection
 */
setRoomUsers = (chatRoomId, userIds) => {
    const roomUsersRef = this.dbRef.child(`roomUsers/${chatRoomId}`);

    const roomData = userIds.reduce(
      (roomUsers, userId) => ({
        ...roomUsers,
        [roomUsersRef.push().key]: userId,
      }),
      {}
    );
    roomUsersRef.update(roomData);
  }

/**
 * Set pet info when send messate 
 */
  // setPetInfo = petInfo => {
  //   this.dbRef.child(`users/${this.currentUser.uid}`).set(petInfo)
  // }
  setPetInfo = async petInfo => {
    const { uid, name, photoURL, notificationTokens, id } = petInfo
    const petInfoRef =  await this.dbRef.child(`users/${uid}`)
    .update({
      id,
      uid,
      name,
      photoURL,
      notificationTokens
    })

  }

  setPartnerInfo =async petInfo => {
    const { uid, name, photoURL, notificationTokens, id } = petInfo
    const petInfoRef =  await this.dbRef.child(`users/${uid}`)
    .update({
      id,
      uid,
      name,
      photoURL
    })
  }
}

export default new Chat()