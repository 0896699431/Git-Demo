import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ApplicationContext } from 'app/providers/applicationProvider'
import { LoadingContext } from 'app/providers/loadingProvider'
import { compose } from 'ramda'
import {
  Wrapper,
  MenuCardWrapper,
  View,
  ScrollView,
  SocialContainer,
  SocialWrapper
} from './styled'
import { Header } from 'components'
import { withTheme, withTranslation, withUser } from 'hocs'
import { Routes } from 'utils'
import { MenuItem, UserInfo } from './private-component'

// import PetCoin from 'assets/images/app/Icons/pet-coin.png'
import History from 'assets/images/app/Icons/history-icon.png'
import { useNavigation } from '@react-navigation/native'
import { logout } from 'modules/Authen/reducer'

import SocialIcon from 'react-native-vector-icons/Entypo'
import Colors from 'utils/Colors'
import { openUrl } from 'utils/Helpers'

function MenuHome({ logout, translate, theme, user }) {
  const { colors } = theme
  const { onReset } = useContext(ApplicationContext)
  const { onLoading } = useContext(LoadingContext)
  const navigation = useNavigation()
  const [headerShadow, setHeaderShadow] = useState(false)

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

  async function onLogout() {
    onReset()
    onLoading.reset()
    await logout()
    navigation.navigate(Routes.home)
  }

  function renderLogout() {
    return (
      <MenuCardWrapper shadowType={3}>
        <MenuItem
          iconName={'ios-log-out'}
          iconColor={colors.red}
          menuText={translate('logout')}
          noBorder
          onPress={() => onLogout()}
          textColor={colors.red}
        />
      </MenuCardWrapper>
    )
  }
  function renderMenus() {
    return (
      <View>
        <MenuCardWrapper shadowType={3}>
          {/* <MenuItem
              menuIcon={PetCoin}
              menuText={'Pet coin'}
              subMenuText={71}
              isRed
              onPress={() => setShowModal(true)}
            /> */}
          <MenuItem
            menuIcon={History}
            menuText={translate('history')}
            noBorder
            onPress={() => navigation.navigate(Routes.history, { user })}
          />
        </MenuCardWrapper>

        <MenuCardWrapper shadowType={3}>
          <MenuItem
            iconName={'md-bookmark'}
            iconColor={colors.red}
            menuText={translate('favorite')}
            onPress={() => navigation.navigate(Routes.favorite, { user })}
          />
          <MenuItem
            iconName={'ios-contacts'}
            iconColor={colors.blue_primary}
            menuText={translate('follow')}
            onPress={() => navigation.navigate(Routes.follow, { user })}
            noBorder
          />
          {/* <MenuItem
              iconName={'ios-bulb'}
              iconColor={colors.yellow2}
              menuText={translate('contribution')}
              noBorder
              onPress={() => navigation.navigate(Routes.contribute)}
            /> */}
        </MenuCardWrapper>

        <MenuCardWrapper shadowType={3}>
          <MenuItem
            iconName={'ios-settings'}
            iconColor={colors.gray_3}
            menuText={translate('setting')}
            noBorder
            onPress={() => navigation.navigate(Routes.setting)}
          />
        </MenuCardWrapper>

        <MenuCardWrapper shadowType={3}>
          <MenuItem
            iconName={'md-ribbon'}
            iconColor={colors.gray_3}
            menuText={translate('questionaire')}
            onPress={() => navigation.navigate(Routes.questionaire)}
          />
          <MenuItem
            iconName={'ios-call'}
            iconColor={colors.gray_3}
            menuText={translate('contact')}
            noBorder
            onPress={() => navigation.navigate(Routes.contact)}
          />
        </MenuCardWrapper>

        {user.id && renderLogout()}
      </View>
    )
  }

  function renderUser() {
    return <UserInfo user={user} />
  }

  const renderSocial = () => {
    return (
      <SocialContainer>
        <SocialWrapper
          onPress={() => openUrl('https://www.facebook.com/petowncorp')}
        >
          <SocialIcon
            name='facebook-with-circle'
            color={Colors.facebook}
            size={30}
          />
        </SocialWrapper>
        <SocialWrapper
          onPress={() => openUrl('https://instagram.com/petowncorp')}
        >
          <SocialIcon
            name='instagram-with-circle'
            color={Colors.instagram}
            size={30}
          />
        </SocialWrapper>
        <SocialWrapper
          onPress={() => openUrl('https://twitter.com/petowncorp')}
        >
          <SocialIcon
            name='twitter-with-circle'
            color={Colors.twitter}
            size={30}
          />
        </SocialWrapper>
        <SocialWrapper
          onPress={() =>
            openUrl('https://www.youtube.com/channel/UCFwVWY2e9OMvZ0BqbX8COpw')
          }
        >
          <SocialIcon
            name='youtube-with-circle'
            color={Colors.youtube}
            size={30}
          />
        </SocialWrapper>
      </SocialContainer>
    )
  }

  return (
    <Wrapper>
      <Header title={'Menu'} icon shadow={headerShadow} />
      <ScrollView
        onScrollEndDrag={onAnimateScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsVerticalScrollIndicator={false}
      >
        {renderUser()}
        {renderMenus()}
        {renderSocial()}
      </ScrollView>
    </Wrapper>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  )
}

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withUser,
  withTheme,
  withTranslation
)(MenuHome)
