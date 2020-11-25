import { Platform } from 'react-native'
import ShortcutBadge from 'react-native-shortcut-badge'

export function setNotiBadge (count) {
  if (Platform.OS === 'ios') {
    console.log('OK MAN')
  } else {
    ShortcutBadge.setCount(count)
      .then(() => {
        console.log('SUCCESS', count)
      })
      .catch(err => console.log('SETCOUNT ERRR', err))
  }
}
