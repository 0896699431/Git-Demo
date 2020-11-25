import React, { useState, useEffect, createRef } from 'react'
import Modal from 'react-native-modal'
import { BlurView } from '@react-native-community/blur'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native'
import { orBoolean, orNull } from 'utils/Selector'
import { withTranslation } from 'hocs'

import {
  styles,
  MatchingContainer,
  MatchingWrapper,
  MatchImage,
  MatchingDescription,
  MatchTextWrapper,
  SendMessWrapper,
  SendMess,
  ContinueSwipeWrapper,
  ContinueSwipe,
  ShareText,
  ShareWrapper
} from './styled'
import Routes from 'utils/Routes'
import Chat from 'api/Chat'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import Share from 'react-native-share'

function Matching({ matchingg, translate, auth, theme }) {
  const { confidentialInfo } = auth
  const { colors } = theme

  const [isMatching, setMatching] = useState(orBoolean('is_matched', matchingg))
  const [isAnimate, setAnimate] = useState(false)
  const [matchingData] = useState(matchingg)
  const lottieRef = createRef()
  const viewShot = createRef()

  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true)
    }, 300)
  }, [])

  useEffect(() => {
    if (matchingData) {
      const memberPetInfo = {
        id: orNull('member_pet.id', matchingData),
        name: orNull('member_pet.name', matchingData),
        photoURL: orNull('member_pet.avatar_url', matchingData),
        uid: orNull('member_pet.user.uid', matchingData)
      }
      Chat.setPetInfo(memberPetInfo)

      const petInfo = {
        id: orNull('author_pet.id', matchingData),
        uid: orNull('author_pet.user.uid', matchingData),
        name: orNull('author_pet.name', matchingData),
        photoURL: orNull('author_pet.avatar_url', matchingData)
      }
      Chat.setPartnerInfo(petInfo)
    }
  }, [matchingData])

  const _onSendMessBtn = () => {
    return (
      <SendMessWrapper
        onPress={() => {
          setMatching(false)
          setTimeout(() => {
            const petInfo = {
              id: orNull('author_pet.id', matchingData),
              uid: orNull('author_pet.user.uid', matchingData),
              name: orNull('author_pet.name', matchingData),
              photoURL: orNull('author_pet.avatar_url', matchingData),
              notificationTokens: confidentialInfo.deviceToken
            }
            Chat.setPetInfo(petInfo)
            navigation.navigate(Routes.chatLoveDetail, {
              selectedUsers: [
                {
                  name: orNull('author_pet.name', matchingData),
                  photoURL: orNull('author_pet.avatar_url', matchingData),
                  uid: orNull('author_pet.user.uid', matchingData)
                }
              ],
              ownerUid: Chat.currentUser.uid,
              partnerID: orNull('author_pet.id', matchingData)
            })
          }, 300)
        }}
      >
        <SendMess>{translate('sendMessage')}</SendMess>
      </SendMessWrapper>
    )
  }

  const _onContinueSwipe = () => {
    return (
      <ContinueSwipeWrapper onPress={() => setMatching(false)}>
        <ContinueSwipe>{translate('continueSwipe')}</ContinueSwipe>
      </ContinueSwipeWrapper>
    )
  }

  function onScreenShot() {
    viewShot.current
      .capture({
        format: 'png',
        quality: 1
      })
      .then(uri => {
        const options = {
          title: 'From Petown with love',
          url: uri,
          subject: 'Trải nghiệm Pet Love thật nhiều niềm vui'
        }
        Share.open(options)
      })
      .catch(err => console.log('CAPTURE ERROR', err))
  }

  const _onRenderShare = () => {
    return (
      <ShareWrapper onPress={() => onScreenShot()}>
        <Icon name='share' color={colors.primary_1} size={20} />
        <ShareText>{translate('share')}</ShareText>
      </ShareWrapper>
    )
  }

  const renderAction = () => {
    if (isAnimate) {
      return (
        <Animatable.View
          animation={'slideInUp'}
          duration={1000}
          style={styles.actioning}
        >
          {_onSendMessBtn()}
          {_onContinueSwipe()}
          {_onRenderShare()}
        </Animatable.View>
      )
    }
  }
  const renderAnimateHeart = () => {
    return (
      <LottieView
        source={require('assets/Lottie/hearbeat.json')}
        autoPlay
        loop
        ref={lottieRef}
      />
    )
  }

  const renderAnimateImage = () => {
    if (isAnimate) {
      return (
        <MatchingWrapper>
          <Animatable.View
            style={styles.matchingImageWrapper}
            animation={'slideInLeft'}
            duration={1000}
          >
            <MatchImage
              source={{ uri: orNull('author_pet.avatar_url', matchingData) }}
            />
          </Animatable.View>
          {renderAnimateHeart()}

          <Animatable.View
            style={styles.matchingImageWrapper}
            animation={'slideInRight'}
            duration={1000}
          >
            <MatchImage
              source={{ uri: orNull('member_pet.avatar_url', matchingData) }}
            />
          </Animatable.View>
        </MatchingWrapper>
      )
    }
  }
  const zoomOut = {
    0: {
      opacity: 1,
      scale: 8
    },
    0.3: {
      opacity: 1,
      scale: 7
    },
    0.5: {
      opacity: 1,
      scale: 5
    },
    0.8: {
      opacity: 1,
      scale: 3
    },
    1: {
      opacity: 1,
      scale: 1
    }
  }

  const renderMatchingText = () => {
    if (isAnimate) {
      return (
        <MatchTextWrapper>
          <Animatable.Text
            style={styles.matchingText}
            animation={zoomOut}
            duration={1000}
          >
            Matching!
          </Animatable.Text>
          <MatchingDescription>
            {orNull('author_pet.name', matchingData)} {''}
            {translate('and')} {orNull('member_pet.name', matchingData)}{' '}
            {translate('matchedNow')}.
          </MatchingDescription>
        </MatchTextWrapper>
      )
    }
  }

  return (
    <Modal
      isVisible={isMatching}
      useNativeDriver
      coverScreen
      style={styles.modal}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={10}
      animationOutTiming={10}
    >
      <BlurView style={styles.absolute} blurType='dark' blurAmount={10} />
      <MatchingContainer ref={viewShot}>
        {renderMatchingText()}
        {renderAnimateImage()}
        {renderAction()}
      </MatchingContainer>
    </Modal>
  )
}
const mapStateToProps = state => ({
  auth: state.authen
})

export default compose(
  withTranslation,
  connect(
    mapStateToProps,
    null
  )
)(Matching)
