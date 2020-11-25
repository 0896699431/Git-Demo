import requestManager from 'utils/RequestManager.js'

const getServerAccessToken = (token, deviceInfo) => {
  return requestManager
    .withoutHeader()
    .submitEntity('/auth-service/users/verify', {
      user: {
        uid: token,
        device_info: deviceInfo
      }
    })
}

export default {
  getServerAccessToken
}
