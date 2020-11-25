import AsyncStorage from '@react-native-community/async-storage'

async function set(key, data) {
  const jsonData = JSON.stringify(data)

  try {
    await AsyncStorage.setItem(key, jsonData)
  } catch (e) {
    /* Alert error */
  }
}

async function get(key) {
  try {
    const jsonData = await AsyncStorage.getItem(key)
    return JSON.parse(jsonData)
  } catch (e) {
    /* Alert error */

    return null
  }
}

async function remove(key) {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (error) {
    return null
  }
}

async function setWithExpired(key, data, duration = 2 * 360 * 1000) {
  const expiredAt = new Date().getTime() + duration

  const jsonData = JSON.stringify({
    data,
    expiredAt
  })

  try {
    await AsyncStorage.setItem(key, jsonData)
  } catch (e) {
    /* Alert error */
  }
}

async function getWithExpired(key) {
  try {
    const jsonData = await AsyncStorage.getItem(key)
    if (jsonData) {
      const { data, expiredAt } = JSON.parse(jsonData)

      if (expiredAt > new Date().getTime()) {
        return data
      }
    }
  } catch (e) {
    /* Alert error */

    return null
  }
}

function clear() {
  AsyncStorage.clear()
}

export default {
  set,
  get,
  remove,
  clear,
  setWithExpired,
  getWithExpired
}
