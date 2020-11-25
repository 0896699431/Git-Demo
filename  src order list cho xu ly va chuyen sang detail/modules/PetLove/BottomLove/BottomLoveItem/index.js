import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { withTheme } from 'hocs'
import { useNavigation } from '@react-navigation/native'

import { Wrapper } from './styled'

function BottomLoveItem(props) {
  const { isActive, name, theme } = props
  const navigation = useNavigation()
  const { colors } = theme

  const renderIconName = iconName => {
    switch (iconName) {
      case 'Preference':
        return 'settings'
      case 'SwipeLove':
        return 'heart'
      case 'ChatLove':
        return 'bubble'
      default:
        break
    }
  }

  const renderIcon = () => {
    return (
      <Icon
        color={isActive ? colors.primary_1 : colors.gray_2}
        name={renderIconName(name)}
        size={25}
      />
    )
  }

  return (
    <Wrapper onPress={() => navigation.navigate(name)}>{renderIcon()}</Wrapper>
  )
}

export default withTheme(BottomLoveItem)
