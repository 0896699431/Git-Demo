import React, { useEffect, useState, useCallback } from 'react'
import analytics from '@react-native-firebase/analytics'

import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withTheme, withTranslation } from 'hocs'
import { compose } from 'ramda'
import {
  Wrapper,
  PetAvatarWrapper,
  NameInputWrapper,
  NameInput,
  CustomStyle
} from './styled'
import Icons from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker'
import FastImage from 'react-native-fast-image'

import { uploadMediaToServer } from '../../reducer'
import { uniqueIdGenerator } from 'utils/Helpers'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function AddNameTab(props) {
  const {
    theme,
    uploadMediaToServer,
    auth,
    pet,
    setPetAvatar,
    setPetName,
    translate
  } = props
  const { confidentialInfo } = auth
  const { isUploadLoading } = pet
  const { colors } = theme

  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')

  const onAnalytics = useCallback(() => {
    analytics().setCurrentScreen('SetPetNameAvatar', 'SetPetNameAvatar')
  })

  const onSetPetAvatar = useCallback(() => {
    setPetAvatar(avatar)
  })

  const onSetPetName = useCallback(() => {
    setPetName(name)
  })

  useEffect(() => onAnalytics(), [])
  useEffect(() => onSetPetAvatar(), [avatar])
  useEffect(() => onSetPetName(), [name])

  function onUploadMediaSuccess(uploadMedia) {
    if (uploadMedia && uploadMedia.length) {
      setAvatar(uploadMedia[0].url)
    }
  }

  function upLoadMedia(imgUrl) {
    const uniqueName = uniqueIdGenerator()

    const body = {
      uri: imgUrl,
      name: `${uniqueName}.jpg`,
      type: 'image/jpg'
    }

    uploadMediaToServer(confidentialInfo.token, body, onUploadMediaSuccess)
  }

  function onImagePicker() {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true
    }).then(image => {
      const { path } = image
      upLoadMedia(path)
    })
  }
  return (
    <KeyboardAwareScrollView extraScrollHeight={30}>
      <Wrapper>
        <PetAvatarWrapper onPress={onImagePicker}>
          {avatar !== '' ? (
            <FastImage source={{ uri: avatar }} style={CustomStyle.petAvatar} />
          ) : isUploadLoading ? (
            <ActivityIndicator size='large' color={colors.gray_5} />
          ) : (
            <Icons name={'image'} size={80} color={colors.gray_5} />
          )}
        </PetAvatarWrapper>
        <NameInputWrapper>
          <NameInput
            placeholder={translate('yourPetName')}
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor={colors.gray_4}
          />
        </NameInputWrapper>
      </Wrapper>
    </KeyboardAwareScrollView>
  )
}

const mapStateToProps = state => ({
  auth: state.authen,
  pet: state.pet
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      uploadMediaToServer
    },
    dispatch
  )
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTheme,
  withTranslation
)(AddNameTab)
