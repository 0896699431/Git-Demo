import React, { useState, createRef } from 'react'
import { compose } from 'ramda'
import { RNCamera } from 'react-native-camera'
import ImagePicker from 'react-native-image-crop-picker'

import { withTranslation, withTheme } from 'hocs'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AntIcon from 'react-native-vector-icons/AntDesign'

import { Header } from 'components'
import ScanResult from './ScanResult'
import Routes from 'utils/Routes'

import {
  Wrapper,
  FooterWrapper,
  CapturePhoto,
  Touchable,
  styles,
  HeaderButton,
  HeaderWrapper
} from './styled'

function PetScan({ theme }) {
  const navigation = useNavigation()
  const { colors } = theme
  const cameraRef = createRef()
  const [capturedImg, setCapturedImg] = useState(null)
  const [camType, setCamType] = useState(true)
  const [imageMime, setImageMime] = useState('image/jpeg')

  const capturingPhoto = async () => {
    try {
      const options = { base64: true, quality: 0.5 }

      const image = await cameraRef.current.takePictureAsync(options)
      setCapturedImg(image.base64)
    } catch (error) {
      console.log('ERROR WHILE CAPTURING IMAGE', error)
    }
  }

  const pickImage = () => {
    ImagePicker.openPicker({
      waitAnimationEnd: true,
      includeBase64: true
    })
      .then(response => {
        setCapturedImg(response.data)
        setImageMime(response.mime)
      })
      .catch(err => console.log('PICK MEDIA ERORR', err))
  }

  const renderFooter = () => {
    return (
      <FooterWrapper>
        <Touchable onPress={() => pickImage()}>
          <Icon name='image' color={colors.white} size={25} />
        </Touchable>

        <CapturePhoto onPress={() => capturingPhoto()}>
          <Icon name='circle' color={colors.white} size={60} />
        </CapturePhoto>

        <Touchable onPress={() => setCamType(!camType)}>
          <IonIcon name='ios-reverse-camera' color={colors.white} size={40} />
        </Touchable>
      </FooterWrapper>
    )
  }

  const renderHeader = () => {
    return (
      <HeaderWrapper>
        <HeaderButton
          onPress={() => {
            if (capturedImg) {
              setCapturedImg(null)
            } else {
              navigation.goBack()
            }
          }}
        >
          <FeatherIcon name={'arrow-left'} size={30} color={colors.white} />
        </HeaderButton>
        <Touchable onPress={() => navigation.navigate(Routes.scanQuestion)}>
          <AntIcon name='questioncircle' color={colors.white} size={28} />
        </Touchable>
      </HeaderWrapper>
    )
  }

  return (
    <Wrapper>
      {renderHeader()}
      {capturedImg ? (
        <ScanResult
          imageUrl={capturedImg}
          imageMime={imageMime}
          theme={theme}
        />
      ) : (
        <RNCamera
          ref={cameraRef}
          style={styles.rnCamera}
          type={camType ? 'back' : 'front'}
          captureAudio={false}
        />
      )}
      {!capturedImg ? renderFooter() : null}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(PetScan)
