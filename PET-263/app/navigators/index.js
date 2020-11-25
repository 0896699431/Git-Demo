import { MyMap, IntroApp, CircleLoading } from 'components'
import * as RNLocalize from 'react-native-localize'
import AlertLocation from 'hocs/withLocation/AlertLocation'
import { LoginModal } from 'modules/Authen'
import Chatting from 'modules/Chatting'

import LanguageProvider, {
  LanguageContext
} from '../providers/languageProvider'
import { PartnerChatDetail, PartnerChatList } from 'modules/Chatting/Partner'
import {
  ArticleDetail,
  ArticleList,
  CreateArticle,
  EditArticle
} from 'modules/Forum'
import { PetScan, ScanQuestion } from 'modules/Home/private-components'
import Vouchers from 'modules/Home/private-components/Vouchers'
import {
  Contact,
  Contribute,
  Favorite,
  Follow,
  History,
  Questionaire,
  Setting
} from 'modules/Menu'
import { AddPet, EditPet, MyPet } from 'modules/Pet'
import BottomLoveNavigator from 'modules/PetLove/BottomLove'
import {
  ChatLoveDetail,
  ChatLoveHome,
  ChatLoveList
} from 'modules/PetLove/Chat'

import PetLoveHome from 'modules/PetLove/Home'
import PetLoveInitSetting from 'modules/PetLove/InitSetting'
import { AddAddress, EditProfile, ProfileHome } from 'modules/Profile'
import { Map } from 'modules/Service'

import {
  ShoppingHome,
  ShoppingDetail,
  ShoppingOrder
} from 'modules/Utilities/Shopping'
import { ProductCheckout } from 'modules/Service/Order'
import {
  Comment,
  RichTextScreen,
  Search,
  SearchPage,
  AdvancedSearch
} from 'modules/shared-components'
import { HotelBooking, HotelDetail, HotelList } from 'modules/Utilities/Hotel'
import {
  BookingDetail,
  BookingProducts,
  ChooseCoupon,
  ChooseMyPet,
  ProductRatings,
  RatingForm,
  VnPay
} from 'modules/Utilities/ShareScreens'
import { SpaBooking, SpaDetail, SpaList } from 'modules/Utilities/Spa'
import { VetBooking, VetDetail, VetList } from 'modules/Utilities/Veterinary'
import { WikiDetail, WikiHome } from 'modules/Utilities/Wiki'
import { NetworkConnect, UtilityComingSoon } from 'modules/WarningPage'
import React, { useEffect, useCallback, useContext, useReducer } from 'react'
// import { enableScreens } from 'react-native-screens'
import { Animated } from 'react-native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { Constants, Storage } from 'utils'
import BottomNavigator from './BottomNavigator'
import OrderItemDetail from '../../modules/Service/Order/Cart/Shopping/ListOrder/OrderItemDetail'

const AppStack = createNativeStackNavigator()

const AppNavigator = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'DATA_SETUP':
          return {
            ...prevState,
            isSkip: false,
            isLoading: true
          }
        case 'SKIP_INTRODUCE':
          return {
            ...prevState,
            isSkip: action.isSkip,
            isLoading: false
          }
      }
    },
    {
      isSkip: false,
      isLoading: true
    }
  )
  const context = useContext(LanguageContext)
  const locales = RNLocalize.getLocales()

  useEffect(() => {
    async function onLoadLocalLanguage() {
      const devLang = locales[0].languageCode

      const langStore = await Storage.get(
        Constants.storageKey.language.STORAGE_LANGUAGE_KEY
      )
      if (!langStore) {
        await Storage.set(
          Constants.storageKey.language.STORAGE_LANGUAGE_KEY,
          devLang
        )
        context.onSetLanguage(devLang)

        return
      }

      context.onSetLanguage(langStore)
    }

    if (context) onLoadLocalLanguage()
  }, [context])

  useEffect(() => {
    const introduceAsync = async () => {
      const intStorage = await Storage.get(
        Constants.storageKey.introTour.INTRO_TOUR
      )

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'SKIP_INTRODUCE', isSkip: !!intStorage })
    }

    introduceAsync()
  }, [])

  const onSkip = useCallback(() => {
    const skipAsync = async () => {
      await Storage.set(Constants.storageKey.introTour.INTRO_TOUR, true)

      dispatch({ type: 'SKIP_INTRODUCE', isSkip: true })
    }

    skipAsync()
  }, [])

  if (state.isLoading) return <CircleLoading />
  if (!state.isSkip) return <IntroApp onSkip={onSkip} />

  return (
    <LanguageProvider>
      <AppStack.Navigator
        // initialRouteName={'AppCardStack'}
        screenOptions={{
          headerShown: false,
          headerHideShadow: true,
          transitionConfig: () => ({
            transitionSpec: {
              duration: Constants.navigationDuration,
              timing: Animated.timing,
              useNativeDriver: true
            }
          })
        }}
      >
        <AppStack.Screen name='BottomNav' component={BottomNavigator} />
        <AppStack.Screen
          name='BottomLoveNavigator'
          component={BottomLoveNavigator}
        />

        <AppStack.Screen name='ChatLoveDetail' component={ChatLoveDetail} />
        {/* ================ Modal ================= */}
        <AppStack.Screen
          name='EditPet'
          component={EditPet}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />
        <AppStack.Screen
          name='AddPet'
          component={AddPet}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='OrderItemDetail'
          component={OrderItemDetail}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='SearchPage'
          component={SearchPage}
          options={{ stackPresentation: 'modal', animationEnabled: false }}
        />
        <AppStack.Screen
          name='AddAddress'
          component={AddAddress}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />
        <AppStack.Screen
          name='LoginModal'
          component={LoginModal}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />
        <AppStack.Screen
          name='CommentList'
          component={Comment}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='EditProfile'
          component={EditProfile}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='BookingProducts'
          component={BookingProducts}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='VnPay'
          component={VnPay}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='ChooseMyPet'
          component={ChooseMyPet}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='BookingDetail'
          component={BookingDetail}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='ProductRatings'
          component={ProductRatings}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='RatingForm'
          component={RatingForm}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='ChooseCoupon'
          component={ChooseCoupon}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />
        <AppStack.Screen
          name='AlertLocation'
          component={AlertLocation}
          options={{
            stackPresentation: 'modal',
            animationEnabled: true,
            gestureEnabled: false
          }}
        />
        <AppStack.Screen
          name='MyMap'
          component={MyMap}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='RichTextScreen'
          component={RichTextScreen}
          options={{ stackPresentation: 'modal', animationEnabled: true }}
        />

        <AppStack.Screen
          name='PetLoveInitSetting'
          component={PetLoveInitSetting}
          options={{
            stackPresentation: 'modal',
            animationEnabled: true,
            gestureEnabled: false
          }}
        />
        <AppStack.Screen
          name='NetworkConnect'
          component={NetworkConnect}
          options={{
            stackPresentation: 'modal',
            animationEnabled: true,
            gestureEnabled: false
          }}
        />
        <AppStack.Screen
          name='DetailArticle'
          component={ArticleDetail}
          options={{
            stackPresentation: 'modal',
            animationEnabled: true
          }}
        />

        {/* ================ Card ================= */}
        <AppStack.Screen name='Shopping' component={ShoppingHome} />
        <AppStack.Screen name='ShoppingDetail' component={ShoppingDetail} />
        <AppStack.Screen name='ShoppingOrder' component={ShoppingOrder} />
        <AppStack.Screen name='Setting' component={Setting} />
        <AppStack.Screen name='Contact' component={Contact} />
        <AppStack.Screen name='VetBooking' component={VetBooking} />
        <AppStack.Screen name='Follow' component={Follow} />
        <AppStack.Screen name='Favorite' component={Favorite} />
        <AppStack.Screen name='ProfileHome' component={ProfileHome} />
        <AppStack.Screen name='Contribute' component={Contribute} />
        <AppStack.Screen name='History' component={History} />
        <AppStack.Screen name='Questionaire' component={Questionaire} />
        <AppStack.Screen
          name='UtilityComingSoon'
          component={UtilityComingSoon}
        />
        <AppStack.Screen name='VetDetail' component={VetDetail} />
        <AppStack.Screen name='ArticleList' component={ArticleList} />
        <AppStack.Screen name='ArticleDetail' component={ArticleDetail} />
        <AppStack.Screen name='CreateArticle' component={CreateArticle} />
        <AppStack.Screen name='EditArticle' component={EditArticle} />
        <AppStack.Screen name='WikiHome' component={WikiHome} />
        <AppStack.Screen name='WikiDetail' component={WikiDetail} />
        <AppStack.Screen name='MyPet' component={MyPet} />
        <AppStack.Screen name='SpaBooking' component={SpaBooking} />
        <AppStack.Screen name='SpaDetail' component={SpaDetail} />
        <AppStack.Screen name='SpaList' component={SpaList} />
        <AppStack.Screen name='Map' component={Map} />
        <AppStack.Screen name='Search' component={Search} />
        <AppStack.Screen name='AdvancedSearch' component={AdvancedSearch} />
        <AppStack.Screen name='ChatLoveHome' component={ChatLoveHome} />
        <AppStack.Screen name='ChatLoveList' component={ChatLoveList} />
        <AppStack.Screen name='ArticleEdit' component={EditArticle} />
        <AppStack.Screen name='VetList' component={VetList} />
        <AppStack.Screen name='ProductCheckout' component={ProductCheckout} />
        <AppStack.Screen name='PetScan' component={PetScan} />
        <AppStack.Screen name='ScanQuestion' component={ScanQuestion} />
        <AppStack.Screen name='HotelList' component={HotelList} />
        <AppStack.Screen name='HotelDetail' component={HotelDetail} />
        <AppStack.Screen name='HotelBooking' component={HotelBooking} />
        <AppStack.Screen
          name='PetLoveHome'
          component={PetLoveHome}
          options={{ gesturesEnabled: false }}
        />
        <AppStack.Screen
          name='Vouchers'
          component={Vouchers}
          options={{ gesturesEnabled: false }}
        />

        <AppStack.Screen
          name='Chatting'
          component={Chatting}
          options={{ gesturesEnabled: false }}
        />

        <AppStack.Screen
          name='PartnerChatList'
          component={PartnerChatList}
          options={{ gesturesEnabled: false }}
        />
        <AppStack.Screen
          name='PartnerChatDetail'
          component={PartnerChatDetail}
          options={{ gesturesEnabled: false }}
        />

        {/* <AppStack.Screen
        name='SearchResultArticle'
        component={SearchResultArticle}
      /> */}
      </AppStack.Navigator>
    </LanguageProvider>
  )
}

export default AppNavigator
