import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  withTheme,
  withToast,
  withLazyQuery,
  withMutation,
  withTranslation,
  withUser
} from 'hocs'
import {
  Wrapper,
  BodyScroll,
  AvatarWrapper,
  AvatarBox,
  Avatar,
  AvatarLoading,
  Spinner,
  ChangeAvatarWrapper,
  ChangeAvatarText,
  UserInfoWrapper,
  RowLabel,
  RowConfigWrapper,
  RowInput,
  RowWrapper,
  Line
} from './styled'
import { ModalHeader } from 'components'
import { uniqueIdGenerator } from 'utils/Helpers'
import { orBoolean, orNull, orEmpty } from 'utils/Selector'
import ImagePicker from 'react-native-image-crop-picker'
import { uploadMediaToServer, setProfile } from '../reducer'
import { GateWay } from 'utils'
import * as QUERY from '../query'
import Model from '../model'

import FeatherIcon from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native'

function EditProfile(props) {
  const {
    theme,
    uploadMediaToServer,
    profileStore,
    auth,
    setVariables,
    data,
    mutate,
    isCompleted,
    showToast,
    isToastClosed,
    setProfile,
    mutationData,
    translate,
    user
  } = props
  const record = Model(data)
  const { profile } = record
  const navigation = useNavigation()
  const route = useRoute()

  const { colors } = theme
  const { isUploadLoading } = profileStore
  const { confidentialInfo } = auth

  const onUpdateProfile = route.params.onUpdateProfile

  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (orNull('id', user))
      setVariables({ variables: { id: orNull('id', user) } })
  }, [user])

  useEffect(() => {
    if (orNull('id', profile)) {
      setProfile(profile)
      setAvatar(orEmpty('avatar_url', profile))
      setName(orEmpty('name', profile))
      setEmail(orEmpty('email', profile))
      setPhone(orEmpty('phone', profile))
    }
  }, [profile])

  useEffect(() => {
    const data = orBoolean('v1UpdateProfile.data', mutationData)
    if (data) {
      setProfile(data)
    }
  }, [mutationData])

  useEffect(() => {
    if (isCompleted) {
      showToast({
        message: 'Thay đổi thông tin cá nhân thành công!',
        description: 'Bạn đã cập nhật thành công thông tin cá nhân.'
      })
    }
  }, [isCompleted])

  useEffect(() => {
    if (isToastClosed) {
      onUpdateProfile && onUpdateProfile()
      navigation.goBack()
    }
  }, [isToastClosed])

  function onEditProfile() {
    mutate({
      variables: {
        input: {
          attribute: {
            name: name,
            avatar_url: avatar,
            email: email,
            phone: phone
          }
        }
      }
    })
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

  function onUploadMediaSuccess(uploadMedia) {
    setAvatar(uploadMedia[0].url)
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

  function renderEditAvatar() {
    return (
      <AvatarWrapper onPress={onImagePicker}>
        <AvatarBox>
          {avatar === '' ? (
            <FeatherIcon name={'user'} size={30} color={colors.gray_4} />
          ) : (
            <Avatar
              source={{
                uri: avatar
              }}
            />
          )}

          {isUploadLoading && (
            <AvatarLoading>
              <Spinner size='small' color={colors.ui_3D_background} />
            </AvatarLoading>
          )}
        </AvatarBox>

        <ChangeAvatarWrapper>
          <ChangeAvatarText>{translate('avaChange')}</ChangeAvatarText>
        </ChangeAvatarWrapper>
      </AvatarWrapper>
    )
  }

  function renderUserInfo() {
    return (
      <UserInfoWrapper shadowType={3}>
        <RowWrapper>
          <RowLabel>{translate('displayName')}</RowLabel>
          <RowConfigWrapper>
            <RowInput
              placeholder={translate('yourName')}
              value={name}
              onChangeText={setName}
            />
          </RowConfigWrapper>
        </RowWrapper>
        <Line />
        <RowWrapper>
          <RowLabel>{translate('email')}</RowLabel>
          <RowConfigWrapper>
            <RowInput
              placeholder={translate('yourEmail')}
              value={email}
              onChangeText={setEmail}
              keyboardType={'email-address'}
            />
          </RowConfigWrapper>
        </RowWrapper>
        <Line />
        <RowWrapper>
          <RowLabel>{translate('phoneNum')}</RowLabel>
          <RowConfigWrapper>
            <RowInput
              placeholder={translate('yourPhone')}
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
              keyboardType={'number-pad'}
            />
          </RowConfigWrapper>
        </RowWrapper>
      </UserInfoWrapper>
    )
  }

  function renderBody() {
    return (
      <BodyScroll>
        {renderEditAvatar()}
        {renderUserInfo()}
      </BodyScroll>
    )
  }

  return (
    <Wrapper>
      <ModalHeader
        title={translate('personEdit')}
        back
        showSubmit={name !== ''}
        onPress={onEditProfile}
      />
      {renderBody()}
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  auth: state.authen,
  profileStore: state.profile
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      uploadMediaToServer,
      setProfile
    },
    dispatch
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withUser,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withLazyQuery({
    query: QUERY.v1UserDetail,
    service: GateWay.USER_SERVICE
  }),
  withMutation({
    mutation: QUERY.v1UpdateProfile,
    service: GateWay.USER_SERVICE
  })
)(EditProfile)
