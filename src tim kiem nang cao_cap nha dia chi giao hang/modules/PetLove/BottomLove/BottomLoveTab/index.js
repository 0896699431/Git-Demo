import React, { useState, useEffect, useCallback } from 'react'
import { withTheme } from 'hocs'
import { Wrapper } from './styled'
import BottomLoveItem from '../BottomLoveItem'

function BottomLoveTab(props) {
  const { theme, state } = props
  const { routes, index } = state
  const { colors, shadows, themeMode } = theme
  const [bgColor, setBgColor] = useState(colors.ui_3D_background)
  const [currentTab, setCurrentTab] = useState('SwipeLove')

  const onSetBottomTab = useCallback(() => {
    if (currentTab !== '') {
      setCurrentTab(currentTab)
      setBgColor(colors.ui_3D_background)
    }
  })

  useEffect(() => onSetBottomTab(), [themeMode, currentTab])

  return (
    <Wrapper color={bgColor} shadow={shadows.shadow_2}>
      {routes.map((route, itemIndex) => {
        return (
          <BottomLoveItem
            {...route}
            key={route.key}
            isActive={itemIndex === index}
          />
        )
      })}
    </Wrapper>
  )
}

export default withTheme(BottomLoveTab)
