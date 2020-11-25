import { useState, useEffect } from 'react'
import moment from 'moment'
import { Linking } from 'react-native'
import Routes from './Routes'
import ImageResizer from 'react-native-image-resizer'

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
export const extractFileExtension = fileName => {
  return fileName.substr(fileName.lastIndexOf('.') + 1)
}

export const snapshotToArray = snapshot => {
  const returnArr = []

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val()
    item.id = childSnapshot.key

    returnArr.push(item)
  })

  return returnArr
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ')
}

export function formatMoney(money, local = 'vn', currency = 'VND') {
  return new Intl.NumberFormat(local, {
    currency: currency
  }).format(money)
}

export function uniqueIdGenerator() {
  // generates uuid.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
export function resizeImage(originImage) {
  const { width, height, sourceURL, path } = originImage

  let resizeWidth = width
  let resizeHeight = height

  if (width > 1080 || height > 1080) {
    resizeWidth = width / 3
    resizeHeight = height / 3
  }

  return ImageResizer.createResizedImage(
    sourceURL || path,
    resizeWidth,
    resizeHeight,
    'JPEG',
    30
  )
}

export function changeAlias(alias) {
  var str = alias
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')

  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  // eslint-disable-next-line
  str = str.replace(
    // eslint-disable-next-line
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  )
  str = str.replace(/ + /g, ' ')
  str = str.trim()
  return str
}

export function openUrl(url) {
  const str = 'https://'
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        const concatStr = str.concat(url)
        return Linking.openURL(concatStr)
      } else {
        return Linking.openURL(url)
      }
    })
    .catch(err => console.error('An error occurred', err))
}

export function distanceCalculate(latA, lonA, latB, lonB, unit = 'K') {
  if (latA === latB && lonA === lonB) {
    return 0
  } else {
    var radlatA = (Math.PI * latA) / 180
    var radlatB = (Math.PI * latB) / 180
    var theta = lonA - lonB
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlatA) * Math.sin(radlatB) +
      Math.cos(radlatA) * Math.cos(radlatB) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit === 'K') {
      dist = dist * 1.609344
    }
    if (unit === 'N') {
      dist = dist * 0.8684
    }
    return dist.toFixed(1)
  }
}

export function getRouteFromFeature(keyword) {
  switch (keyword) {
    case 'spa':
      return Routes.spaDetail
    case 'hotel':
      return Routes.hotelDetail
    case 'veterinary':
      return Routes.vetDetail
    case 'insemination':
      return Routes.inseminationDetail
    case 'trainning':
      return Routes.trainingDetail
    case 'shopping':
      return Routes.shoppingDetail
    default:
      break
  }
}

export function _objectWithoutProperties(obj, keys) {
  var target = {}
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

export function updateDateTime(date, time) {
  const d = date

  const hour = Number(moment(time, 'HH:mm').format('HH'))
  const minute = Number(moment(time, 'HH:mm').format('mm'))

  d.set({ h: hour, m: minute })

  return d.toString()
}

export function genPercentFromProperties(properties) {
  if (properties.length === 0) return 0
  let result = 0
  // const listPercent = []
  properties.map(item => {
    const price = item.price ? item.price : 0
    const proPrice = item.promotion_price ? item.promotion_price : 0

    if (price == 0 || proPrice == 0) return

    const percent = Math.round(((price - proPrice) / price) * 100)
    result = percent > result ? percent : result
  })
  // listPercent.sort((a, b) => a - b)
  return result
}
