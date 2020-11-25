import React from 'react'
import { withTheme } from 'hocs'
import IonIcon from 'react-native-vector-icons/Ionicons'

import {
  MenuCardItem,
  MenuText,
  MenuItemWrapper,
  SubMenuText,
  Image
} from './styled'
const ICON_SIZE = { width: 22, height: 22 }

function Item(props) {
  const {
    menuIcon,
    iconName,
    iconColor,
    menuText,
    subMenuText,
    noBorder,
    isRed,
    onPress,
    textColor,
    theme
  } = props
  const { colors } = theme
  return (
    <MenuCardItem activeOpacity={0.5} noBorder={noBorder} onPress={onPress}>
      <MenuItemWrapper>
        {iconName ? (
          <IonIcon
            name={iconName}
            size={ICON_SIZE.height}
            color={iconColor || colors.gray_4}
          />
        ) : (
          <Image source={menuIcon} style={ICON_SIZE} resizeMode={'contain'} />
        )}

        <MenuText textColor={textColor}>{menuText}</MenuText>
      </MenuItemWrapper>

      <MenuItemWrapper>
        <SubMenuText isRed={isRed}>{subMenuText}</SubMenuText>
        <IonIcon name='ios-arrow-forward' color={colors.gray_4} size={18} />
      </MenuItemWrapper>
    </MenuCardItem>
  )
}

export default withTheme(Item)
