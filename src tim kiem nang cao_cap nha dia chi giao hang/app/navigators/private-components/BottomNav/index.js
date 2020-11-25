import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { PetownHome } from 'modules/Home'
import { NotiHome } from 'modules/Notification'
import CustomBottomTab from '../CustomBottomTab'
import { ForumHome } from 'modules/Forum'

// Product
import { ProductDetail, ProductCart } from 'modules/Service/Order'

// Menu
import MenuHome from '../../../../modules/Menu/Home'

const Tab = createBottomTabNavigator()

const HomeStack = createStackNavigator()

const HomeNavigator = () => (
  <HomeStack.Navigator
    headerMode={'none'}
    initialRouteName={'PetownHome'}
    screenOptions={{ headerMode: 'none' }}
  >
    <HomeStack.Screen name='PetownHome' component={PetownHome} />
  </HomeStack.Navigator>
)

const ServiceStack = createStackNavigator()
const ServiceNavigator = () => (
  <ServiceStack.Navigator
    headerMode={'none'}
    initialRouteName={'ProductCart'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerMode: 'none'
    }}
  >
    <ServiceStack.Screen name='ProductCart' component={ProductCart} />
    <ServiceStack.Screen name='ProductDetail' component={ProductDetail} />
  </ServiceStack.Navigator>
)

/**
 * ======= FORUM MODULE
 */

const ForumStack = createStackNavigator()

const ForumNavigator = () => (
  <ForumStack.Navigator
    headerMode={'none'}
    initialRouteName={'ForumHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerMode: 'none'
    }}
  >
    <ForumStack.Screen name='ForumHome' component={ForumHome} />
  </ForumStack.Navigator>
)

/**
 * ======= NOTI MODULE
 */
const NotiStack = createStackNavigator()
const NotiNavigator = () => (
  <NotiStack.Navigator
    headerMode={'none'}
    initialRouteName={'NotiHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerMode: 'none'
    }}
  >
    <NotiStack.Screen name='NotiHome' component={NotiHome} />
  </NotiStack.Navigator>
)

const MenuStack = createStackNavigator()
const MenuNavigator = () => (
  <MenuStack.Navigator
    headerMode={'none'}
    initialRouteName={'MenuHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerMode: 'none'
    }}
  >
    <MenuStack.Screen name='MenuHome' component={MenuHome} />
  </MenuStack.Navigator>
)

const RootNavigator = () => {
  return (
    <Tab.Navigator
      headerMode={'none'}
      tabBar={props => <CustomBottomTab {...props} />}
    >
      <Tab.Screen name='Petown' component={HomeNavigator} />
      <Tab.Screen name='Forum' component={ForumNavigator} />
      <Tab.Screen name='Service' component={ServiceNavigator} />
      <Tab.Screen name='Noti' component={NotiNavigator} />
      <Tab.Screen name='Menu' component={MenuNavigator} />
    </Tab.Navigator>
  )
}

export default RootNavigator
