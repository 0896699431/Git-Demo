import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { enableScreens } from 'react-native-screens'

import Preference from '../Preference'
import SwipeLove from '../SwipeLove'
import { ChatLoveList, ChatLoveHome } from '../Chat'
import BottomLoveTab from './BottomLoveTab'

enableScreens()

/**
 * ======= PREFERENCE STACK
 */
const PreferenceStack = createNativeStackNavigator()
const PreferenceNavigator = () => (
  <PreferenceStack.Navigator
    headerMode={'none'}
    initialRouteName={'PreferenceHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerShown: false
    }}
  >
    <PreferenceStack.Screen name='PreferenceHome' component={Preference} />
  </PreferenceStack.Navigator>
)

/**
 * ======= SWIPE LOVE STACK
 */
const SwipeLoveStack = createNativeStackNavigator()
const SwipeLoveNavigator = () => (
  <SwipeLoveStack.Navigator
    headerMode={'none'}
    initialRouteName={'SwipeLoveHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerShown: false
    }}
  >
    <SwipeLoveStack.Screen name='SwipeLoveHome' component={SwipeLove} />
  </SwipeLoveStack.Navigator>
)

/**
 * ======= CHAT LOVE STACK
 */
const ChatLoveStack = createNativeStackNavigator()
const ChatLoveNavigator = () => (
  <ChatLoveStack.Navigator
    headerMode={'none'}
    initialRouteName={'ChatLoveHome'}
    screenOptions={{
      defaultNavigationOptions: { gesturesEnabled: true },
      headerShown: false
    }}
  >
    <ChatLoveStack.Screen name='ChatLoveHome' component={ChatLoveHome} />
    <ChatLoveStack.Screen name='ChatLoveList' component={ChatLoveList} />
  </ChatLoveStack.Navigator>
)

const Tab = createBottomTabNavigator()

const BottomLoveNavigator = () => {
  return (
    <Tab.Navigator
      headerMode={'none'}
      initialRouteName={'SwipeLove'}
      tabBar={props => <BottomLoveTab {...props} />}
    >
      <Tab.Screen name='Preference' component={PreferenceNavigator} />
      <Tab.Screen name='SwipeLove' component={SwipeLoveNavigator} />
      <Tab.Screen name='ChatLove' component={ChatLoveNavigator} />
    </Tab.Navigator>
  )
}

export default BottomLoveNavigator
