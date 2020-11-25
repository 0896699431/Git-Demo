import React, { useState, useEffect, useContext } from 'react'
import messaging from '@react-native-firebase/messaging'
import { Wrapper } from './styled'
import { withTheme } from 'hocs'
import TabItem from './TabItem'
import { ApplicationContext } from 'app/providers/applicationProvider'
import { orNull, orArray, orEmpty } from 'utils/Selector'

function CustomBottomTab(props) {
  const { theme, state } = props
  const { routes, index } = state
  const { colors, shadows, themeMode } = theme
  const { sharing, setSharing } = useContext(ApplicationContext)

  const [bgColor, setBgColor] = useState(colors.ui_3D_background)
  const [shadow, setShadow] = useState(shadows.shadow_2)
  const [currentTab, setCurrentTab] = useState('Home')

  useEffect(() => {
    if (currentTab !== '') {
      setBottomTabBgColor(currentTab)
    }
    setShadow(shadows.shadow_2)
  }, [themeMode, currentTab])

  function onReceivedNotification() {
    return messaging().onMessage(async item => {
      const index = orArray('noti', sharing).find(
        noti => orNull('data.id', noti) === orEmpty('data.id', item)
      )

      if (index >= 0) return

      setSharing({ noti: orArray('noti', sharing).concat([item]) })
    })
  }

  useEffect(() => {
    const unsubscribeMessage = onReceivedNotification()

    return () => {
      unsubscribeMessage()
    }
  })

  function setBottomTabBgColor(routeName) {
    setCurrentTab(routeName)
    // if (routeName === 'Chill') {
    //   setBgColor(colors.black)

    //   return
    // }

    setBgColor(colors.ui_3D_background)
  }

  return (
    <Wrapper color={bgColor} shadow={shadow}>
      {routes.map((route, itemIndex) => {
        return (
          <TabItem
            key={route.key}
            {...route}
            isActive={itemIndex === index}
            setBottomTabBgColor={setBottomTabBgColor}
          />
        )
      })}
    </Wrapper>
  )
}

export default withTheme(CustomBottomTab)
