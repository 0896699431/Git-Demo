import React, { useState, useContext } from 'react'
import {
  Wrapper,
  CustomStyle,
  Image,
  NotificationWrapper,
  RedDot,
  Bell
} from './styled'
import { LinearGradient } from 'components'
import { Animated } from 'react-native'
import { withTheme } from 'hocs'
// TAB PETOWN
import PetUnselect from 'assets/images/app/TabBar/Petown/home-unselected.png'
import PetSelected from 'assets/images/app/TabBar/Petown/home-selected.png'

// TAB SERVICE
import ServiceUnselect from 'assets/images/app/TabBar/Service/service-unselected.png'
import ServiceSelected from 'assets/images/app/TabBar/Service/sevice-selected.png'

// TAB FORUM
import ForumUnselect from 'assets/images/app/TabBar/Forum/forum-unselect.png'
import ForumSelected from 'assets/images/app/TabBar/Forum/forum-selected.png'

// TAB NOTI
import NotiUnselect from 'assets/images/app/TabBar/Notification/notification-unselected.png'
import NotiSelected from 'assets/images/app/TabBar/Notification/notification-selected.png'

// MENU
import MenuUnselect from 'assets/images/app/TabBar/Menu/menu-unselected.png'
import MenuSelected from 'assets/images/app/TabBar/Menu/menu-selected.png'
import { ApplicationContext } from 'app/providers/applicationProvider'
import { useNavigation } from '@react-navigation/native'
import { orNumber } from 'utils/Selector'

function TabItem(props) {
  const { isActive, setBottomTabBgColor, name, theme } = props
  const { sharing } = useContext(ApplicationContext)
  const { colors } = theme

  const tabBarIcons = {
    active: {
      Petown: PetSelected,
      Service: ServiceSelected,
      Forum: ForumSelected,
      Noti: NotiSelected,
      Menu: MenuSelected
    },
    inactive: {
      Petown: PetUnselect,
      Service: ServiceUnselect,
      Forum: ForumUnselect,
      Noti: NotiUnselect,
      Menu: MenuUnselect
    }
  }

  const [springValue] = useState(new Animated.Value(1))
  const navigation = useNavigation()

  function handlePressIn() {
    Animated.spring(springValue, {
      toValue: 0.8,
      friction: 1,
      useNativeDriver: true
    }).start()
  }
  function handlePressOut() {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 2,
      useNativeDriver: true
    }).start()

    navigation.navigate(name)
    setBottomTabBgColor(name)
  }

  function renderNotiBadge() {
    if (name === 'Noti') {
      return (
        <NotificationWrapper>
          <Bell
            source={tabBarIcons[isActive ? 'active' : 'inactive'][name]}
            resizeMode={'contain'}
          />
          {orNumber('noti', sharing).length > 0 ? (
            <RedDot color={isActive ? 'white' : 'red'} />
          ) : null}
        </NotificationWrapper>
      )
    }

    return (
      <Image
        source={tabBarIcons[isActive ? 'active' : 'inactive'][name]}
        resizeMode={'contain'}
      />
    )
  }

  return (
    <Wrapper
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          CustomStyle.tabWrapper,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            shadowColor: colors.tabShadowColor,
            shadowOpacity: isActive ? 0.6 : 0,
            transform: [{ scale: springValue }]
          }
        ]}
      >
        <LinearGradient
          style={[
            CustomStyle.gradientWrapper,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: colors.primary_1,
              width: isActive ? '100%' : 0,
              height: isActive ? '100%' : 0,
              overflow: isActive ? 'hidden' : 'visible'
            }
          ]}
        >
          {renderNotiBadge()}
        </LinearGradient>
      </Animated.View>
    </Wrapper>
  )
}

export default withTheme(TabItem)
