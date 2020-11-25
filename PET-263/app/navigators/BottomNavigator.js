import React from 'react'

import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { enableScreens } from 'react-native-screens'
import { PetownHome } from 'modules/Home'
import { NotiHome } from 'modules/Notification'
import { BottomTab } from './private-components'
import { ForumHome } from 'modules/Forum'

// Product
import { ProductDetail, ProductCart } from 'modules/Service/Order'

// Menu
import MenuHome from 'modules/Menu/Home'

enableScreens()

const HomeStack = createNativeStackNavigator()

const HomeNavigator = () => (
  <HomeStack.Navigator
    headerMode={'none'}
    initialRouteName={'PetownHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerShown: false
    }}
  >
    <HomeStack.Screen name='PetownHome' component={PetownHome} />
  </HomeStack.Navigator>
)

const ServiceStack = createNativeStackNavigator()
const ServiceNavigator = () => (
  <ServiceStack.Navigator
    headerMode={'none'}
    initialRouteName={'ProductCart'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerShown: false
    }}
  >
    <ServiceStack.Screen name='ProductCart' component={ProductCart} />
    <ServiceStack.Screen name='ProductDetail' component={ProductDetail} />
  </ServiceStack.Navigator>
)

/**
 * ======= FORUM MODULE
 */

const ForumStack = createNativeStackNavigator()

const ForumNavigator = () => (
  <ForumStack.Navigator
    headerMode={'none'}
    initialRouteName={'ForumHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerShown: false
    }}
  >
    <ForumStack.Screen name='ForumHome' component={ForumHome} />
  </ForumStack.Navigator>
)

/**
 * ======= NOTI MODULE
 */
const NotiStack = createNativeStackNavigator()
const NotiNavigator = () => (
  <NotiStack.Navigator
    headerMode={'none'}
    initialRouteName={'NotiHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerShown: false
    }}
  >
    <NotiStack.Screen name='NotiHome' component={NotiHome} />
  </NotiStack.Navigator>
)

const MenuStack = createNativeStackNavigator()
const MenuNavigator = () => (
  <MenuStack.Navigator
    headerMode={'none'}
    initialRouteName={'MenuHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerShown: false
    }}
  >
    <MenuStack.Screen name='MenuHome' component={MenuHome} />
  </MenuStack.Navigator>
)

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      headerMode={'none'}
      tabBar={props => <BottomTab {...props} />}
    >
      <Tab.Screen name='Petown' component={HomeNavigator} />
      <Tab.Screen name='Forum' component={ForumNavigator} />
      <Tab.Screen name='Service' component={ServiceNavigator} />
      <Tab.Screen name='Noti' component={NotiNavigator} />
      <Tab.Screen name='Menu' component={MenuNavigator} />
    </Tab.Navigator>
  )
}

export default BottomNavigator
