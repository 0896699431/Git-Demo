import React, { useRef, useState, useEffect } from 'react'
import i18n from 'i18n-js'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  NativeModules
} from 'react-native'
import Swiper from 'react-native-swiper'
import FastImage from 'react-native-fast-image'

import Intro1 from 'assets/images/tour/intro1.png'
import Intro2 from 'assets/images/tour/intro2.png'
import Intro3 from 'assets/images/tour/intro3.png'

import EngIntro1 from 'assets/images/tour/en/intro1.png'
import EngIntro2 from 'assets/images/tour/en/intro2.png'
import EngIntro3 from 'assets/images/tour/en/intro3.png'

import Colors from 'utils/Colors'
import { withTranslation } from 'hocs'

function IntroApp({ onSkip, translate }) {

  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier

  const isVietnamese =
    deviceLanguage === 'vi' ||
    deviceLanguage === 'vi_US' ||
    deviceLanguage === 'vi_VN'

  const medias = [
    {
      id: 1,
      url: isVietnamese ? Intro1 : EngIntro1
    },
    {
      id: 2,
      url: isVietnamese ? Intro2 : EngIntro2
    },
    {
      id: 3,
      url: isVietnamese ? Intro3 : EngIntro3
    }
  ]

  console.log('CHECK lANGAUGE', deviceLanguage)

  const swipeRef = useRef()
  const [isLastIndex, setLastIndex] = useState(false)

  function pressNext() {
    if (!isLastIndex) {
      swipeRef.current.scrollBy(1, true)
      return
    }
    onSkip()
  }

  const onChangeLastIndex = idx => {
    setLastIndex(idx === 2)
  }

  return (
    <View style={styles.container}>
      <Swiper
        activeDotColor={Colors.red}
        ref={swipeRef}
        loop={false}
        onIndexChanged={onChangeLastIndex}
        dotStyle={styles.dot}
        activeDotStyle={styles.dot}
      >
        {medias.map((media, index) => (
          <FastImage key={index} style={styles.mediaThumb} source={media.url} />
        ))}
      </Swiper>
      <TouchableOpacity style={styles.nextBtnTouch} onPress={pressNext}>
        <Text style={styles.nextBtn}>
          {isLastIndex ? translate('discover') : translate('next')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default withTranslation(IntroApp)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mediaThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginTop: Platform.OS === 'android' ? 20 : null
  },
  nextBtn: {
    color: Colors.red,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 18
  },
  nextBtnTouch: {
    position: 'absolute',
    bottom: 37,
    right: 25
  },
  dot: {
    marginBottom: 20
  }
})
