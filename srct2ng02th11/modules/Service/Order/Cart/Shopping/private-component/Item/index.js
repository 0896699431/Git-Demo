import React from 'react'
import { withTheme } from 'hocs'
import { ItemLabel, LeftLabel, RightLabel, ViewIcon } from './styled'
import IonIcon from 'react-native-vector-icons/Feather'
import { Fonts } from 'utils'

const ICON_SIZE = { width: 10, height: 18 }

function Item(props) {
  const { txtL, colorR, txtR, iconName, FontsR } = props
  return (
    <ItemLabel>
      {iconName && (
        <ViewIcon>
          <IonIcon name={iconName} size={ICON_SIZE.height} />
        </ViewIcon>
      )}
      <LeftLabel>{txtL && txtL}</LeftLabel>

      {txtR && (
        <RightLabel
          colorR={colorR ? colorR : 'black'}
          FontsR={FontsR ? FontsR : Fonts.subTitle_1}
        >
          {txtR}
        </RightLabel>
      )}
    </ItemLabel>
  )
}

export default withTheme(Item)
