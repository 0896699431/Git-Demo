import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl, DeviceEventEmitter } from 'react-native'
import { AppTour, AppTourSequence } from 'imokhles-react-native-app-tour'
import NotificationManager from 'app/services/NotificationManager'

import { compose } from 'ramda'
import * as R from 'ramda'
import { Wrapper, ScrollView } from './styled'
import { Header, PrivateButton } from 'components'
import { withTheme, withUser } from 'hocs'
import { Routes, Storage, Constants } from 'utils'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {
  UserInfo,
  ListPet,
  Utilities,
  Banner,
  News
} from '../private-components'

function List({ user, theme }) {
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = useState(false)
  const [headerShadow, setHeaderShadow] = useState(false)
  const [initLoading, setInitLoading] = useState(true)
  const navigation = useNavigation()

  const onSetLoading = useCallback(() => setInitLoading(false))
  const { colors } = theme
  const appTourTargets = []

  useEffect(() => onSetLoading, [])

  const registerSequenceStepEvent = () => {
    // eslint-disable-next-line no-unused-vars
    const sequenceStepListener = DeviceEventEmitter.addListener(
      'onShowSequenceStepEvent',
      e => {
        console.log(e)
      }
    )
  }

  const registerFinishSequenceEvent = () => {
    // eslint-disable-next-line no-unused-vars
    const finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',
      e => {
        const skipAsync = async () => {
          await Storage.set(Constants.storageKey.introTour.ELLA_TOUR, true)
        }
        skipAsync()

        console.log(e)
      }
    )
  }

  useEffect(() => {
    registerSequenceStepEvent()
    registerFinishSequenceEvent()
  }, [appTourTargets])

  const initAppTour = useCallback(() => {
    setTimeout(() => {
      const appTourSequence = new AppTourSequence()
      appTourTargets.forEach(appTourTarget => {
        appTourSequence.add(appTourTarget)
      })
      AppTour.ShowSequence(appTourSequence)
    }, 1000)
  }, [appTourTargets])

  // useEffect(() => {
  //   const tourIntroduction = async () => {
  //     const isEllaTour = await Storage.get(
  //       Constants.storageKey.introTour.ELLA_TOUR
  //     )
  //     if (!isEllaTour) {
  //       initAppTour()
  //     } else {
  //       return null
  //     }
  //   }
  //   tourIntroduction()
  // }, [appTourTargets])

  // ==========HANDLE HEADER============

  function onAnimateScrollEndDrag({ nativeEvent }) {
    const { contentOffset } = nativeEvent
    const scrollY = contentOffset.y
    setHeaderShadow(scrollY > 20)
  }

  function onMomentumScrollEnd({ nativeEvent }) {
    const { contentOffset } = nativeEvent
    const scrollY = contentOffset.y
    if (scrollY < 20) {
      setHeaderShadow(false)
    }
  }
  //= ===========

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  })

  function renderBody() {
    const isRefresh = refreshing || (isFocused && !initLoading)
    return (
      <ScrollView
        onScrollEndDrag={onAnimateScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <UserInfo
          user={user}
          isRefresh={isRefresh}
          addAppTourTarget={appTourTarget => {
            // console.log('BAME', appTourTarget)
            appTourTargets.push(appTourTarget)
          }}
        />
        <ListPet
          isRefresh={isRefresh}
          addAppTourTarget={appTourTarget => {
            appTourTargets.push(appTourTarget)
          }}
        />
        <Utilities
          isRefresh={isRefresh}
          addAppTourTarget={appTourTarget => {
            // console.log('LOCAT', appTourTarget)
            appTourTargets.push(appTourTarget)
          }}
        />

        <Banner />
        {/* <Vouchers  /> */}
        <News isRefresh={isRefresh} />
      </ScrollView>
    )
  }

  //cai icon chat
  const icon = (
    <PrivateButton
      onPrivatePress={() => {
        navigation.navigate(Routes.chatting)
      }}
    >
      <Icon name='bubbles' color={colors.primary_1} size={25} />
    </PrivateButton>
  )

  return (
    <Wrapper testID={'HomePage'}>
      <Header isHome title={'Petown'} shadow={headerShadow} icon={icon} />
      <NotificationManager />
      {renderBody()}
    </Wrapper>
  )
}
export default compose(
  withUser,
  withTheme
)(List)
