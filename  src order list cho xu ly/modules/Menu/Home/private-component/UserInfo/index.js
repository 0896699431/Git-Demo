import React, { useEffect, useState } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'
import { GateWay, Routes } from 'utils'
import * as QUERY from 'modules/Profile/query'
import { setProfile } from 'modules/Profile/reducer'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { UserInfoWrapper, AvatarWrapper, UserAvatar, UserName } from './styled'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { orNull, orEmpty } from 'utils/Selector'

function UserInfo (props) {
  const {
    user,
    theme,
    data,
    setProfile,
    translate,
    setVariables,
    refetch
  } = props
  const { colors } = theme
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [userProfile, setUserProfile] = useState({})
  const userID = orNull('id', user)

  useEffect(() => {
    if (isFocused && refetch && userID) {
      refetch()
    }
  }, [isFocused, refetch, userID])

  useEffect(() => {
    if (userID) {
      setVariables({})
    }
  }, [userID])

  useEffect(() => {
    const id = orNull('v1UserProfile.id', data)

    if (id) {
      setProfile(data.v1UserProfile)
      setUserProfile(data.v1UserProfile)
    }
  }, [data.v1UserProfile])

  return (
    <UserInfoWrapper
      onPress={() => {
        user.id
          ? navigation.navigate(Routes.profile, { userId: user.id })
          : navigation.navigate(Routes.loginModal)
      }}
    >
      <AvatarWrapper>
        {user.id && orNull('avatar_url', userProfile) ? (
          <UserAvatar
            source={{ uri: orEmpty('avatar_url', userProfile) }}
            resizeMode={'contain'}
          />
        ) : (
          <FeatherIcon name={'user'} size={22} color={colors.gray_4} />
        )}
      </AvatarWrapper>
      <UserName isLogin={!!user.id}>
        {!user.id
          ? translate('login')
          : orNull('name', userProfile) || `Member-${user.id}`}
      </UserName>
    </UserInfoWrapper>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setProfile
    },
    dispatch
  )
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1UserProfile,
    service: GateWay.USER_SERVICE
  })
)(UserInfo)
