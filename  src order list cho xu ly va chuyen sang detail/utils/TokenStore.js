import {
  setGenericPassword,
  resetGenericPassword,
  getGenericPassword
} from 'react-native-keychain'

async function set(key, data) {
  try {
    const json = JSON.stringify(data)
    await setGenericPassword(key, json)
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error)
  }
}

async function get() {
  try {
    const credentials = await getGenericPassword()

    if (credentials && credentials.username) {
      return JSON.parse(credentials.password)
    }
    return credentials
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error)
  }
}

async function remove() {
  try {
    await resetGenericPassword()
    return true
  } catch (error) {
    return null
  }
}

export default {
  set,
  get,
  remove
}
