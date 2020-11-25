import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import {
  withLazyQuery,
  withTheme,
  withMutation,
  withTranslation,
  withUser
} from 'hocs'
import { compose } from 'ramda'
import { GateWay, Routes } from 'utils'
import * as QUERY from '../query'
import * as MUTATION from '../mutation'
import Model from '../model'
import { PrivateButton } from 'components'

import {
  Wrapper,
  Header,
  HeaderControlWrapper,
  HeaderControl,
  BackButton,
  UserInfoWrapper,
  AvatarWrapper,
  Avatar,
  FImage,
  UserName,
  FollowWrapper,
  FollowBox,
  FollowValue,
  FollowLabel,
  // TabbarWrapper,
  // TabButton,
  // TabLine,
  HeaderRight,
  FollowButton,
  FollowButtonLabel,
  UserNameWrappe
} from './styled'
import backGradient from 'assets/images/app/Icons/back_gradient.png'
import {
  // Media,
  // Article,
  Pets
} from '../private-components'
// import Icons from 'react-native-vector-icons/Feather'
import { orNull, orNumber, orBoolean, orEmpty } from 'utils/Selector'
const INFO_HEIGHT = 180
const INFO_MIN_HEIGHT = 20

function Home({
  data,
  setVariables,
  // theme,
  mutate,
  mutationData,
  refetch,
  translate,
  user
}) {
  const record = Model(data)
  // const { colors } = theme
  const { profile } = record

  const route = useRoute()
  const navigation = useNavigation()
  const [userId] = useState(orNull('params.userId', route))
  const [myProfile, setMyProfile] = useState(false)
  const [userProfile, setUserProfile] = useState({})
  // const [tabIndex, setTabIndex] = useState(0)
  const [startPosition, setStartPosition] = useState(0)
  const [userNameAnimate] = useState(new Animated.Value(0))
  const [infoOpacityAnimate] = useState(new Animated.Value(1))
  const [infoTopAnimate] = useState(new Animated.Value(0))
  const [infoHeightAnimate] = useState(new Animated.Value(INFO_HEIGHT))
  const [followers, setFollowers] = useState(0)
  const [followings, setFollowings] = useState(0)
  const [isFollowed, setIsFollowed] = useState(false)

  // const tabRef = createRef()

  useEffect(() => {
    if (userId) {
      setVariables({ variables: { id: userId } })
      setMyProfile(`${userId}` === orEmpty('id', user).toString())
    }
  }, [userId])

  useEffect(() => {
    if (orNull('id', profile) === userId.toString()) {
      setUserProfile(profile)
      setFollowers(orNumber('followers_total', profile))
      setFollowings(orNumber('follows_total', profile))

      setIsFollowed(orBoolean('is_followed', profile))
    }
  }, [profile, userId])

  function onAnimateScrollBeginDrag({ nativeEvent }) {
    const { contentOffset } = nativeEvent
    const scrollY = contentOffset.y
    setStartPosition(scrollY)
  }

  function onAnimateScrollEndDrag({ nativeEvent }) {
    const { contentOffset } = nativeEvent
    const scrollY = contentOffset.y
    const showHeader = scrollY < startPosition
    Animated.parallel([
      Animated.timing(userNameAnimate, {
        toValue: showHeader ? 0 : 1,
        useNativeDrive: true
      }),
      Animated.timing(infoOpacityAnimate, {
        toValue: showHeader ? 1 : 0,
        useNativeDrive: true
      }),
      Animated.timing(infoTopAnimate, {
        toValue: showHeader ? 0 : -30 - INFO_HEIGHT,
        useNativeDrive: true
      }),
      Animated.timing(infoHeightAnimate, {
        toValue: showHeader ? INFO_HEIGHT : INFO_MIN_HEIGHT,
        useNativeDrive: true
      })
    ]).start()
  }

  function onBack() {
    navigation.goBack()
  }

  // function navigateTab(page) {
  //   setTabIndex(page)

  //   tabRef.current.goToPage(page)
  // }

  function onFollow() {
    if (userId) {
      mutate({ variables: { followable_id: userId, followable_type: 'User' } })
    }
  }

  function onUpdateFollowers() {
    if (orNull('v1Follow', mutationData)) {
      setFollowers(orNumber('v1Follow.followable.reacted_total', mutationData))
      setIsFollowed(orBoolean('v1Follow.followable.is_reacted', mutationData))
    }
  }

  function onRefreshProfile() {
    refetch({ variables: { id: userId } })
  }

  useEffect(onUpdateFollowers, [mutationData])

  // function renderTabbar() {
  //   return (
  //     <TabbarWrapper>
  //       <TabButton onPress={() => navigateTab(0)}>
  //         <Icons
  //           name='list'
  //           size={24}
  //           color={tabIndex === 0 ? colors.primary_1 : colors.gray_2}
  //         />
  //         <TabLine selected={tabIndex === 0} />
  //       </TabButton>
  //       <TabButton onPress={() => navigateTab(1)}>
  //         <Icons
  //           name='activity'
  //           size={24}
  //           color={tabIndex === 1 ? colors.primary_1 : colors.gray_2}
  //         />
  //         <TabLine selected={tabIndex === 1} />
  //       </TabButton>
  //     </TabbarWrapper>
  //   )
  // }

  function renderHeader() {
    return (
      <Header>
        <HeaderControlWrapper>
          <HeaderControl>
            <BackButton onPress={onBack}>
              <FImage source={backGradient} />
            </BackButton>
            <HeaderRight>
              {!myProfile ? (
                <PrivateButton onPrivatePress={onFollow}>
                  <FollowButton disabled isFollowed={isFollowed}>
                    <FollowButtonLabel isFollowed={isFollowed}>
                      {isFollowed ? translate('unfollow') : translate('follow')}
                    </FollowButtonLabel>
                  </FollowButton>
                </PrivateButton>
              ) : (
                <FollowButton
                  onPress={() =>
                    navigation.navigate(Routes.editProfile, {
                      onUpdateProfile: onRefreshProfile
                    })
                  }
                >
                  <FollowButtonLabel>{translate('edit')}</FollowButtonLabel>
                </FollowButton>
              )}
            </HeaderRight>
          </HeaderControl>
        </HeaderControlWrapper>
        <Animated.View style={{ opacity: userNameAnimate }}>
          <UserNameWrappe>
            <UserName>{userProfile.name}</UserName>
          </UserNameWrappe>
        </Animated.View>

        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'relative',
            opacity: infoOpacityAnimate,
            top: infoTopAnimate,
            height: infoHeightAnimate
          }}
        >
          <UserInfoWrapper>
            <AvatarWrapper shadowType={2}>
              <Avatar source={{ uri: orEmpty('avatar_url', userProfile) }} />
            </AvatarWrapper>
            <UserName margin>{orEmpty('name', userProfile)}</UserName>
            <FollowWrapper>
              <FollowBox alignRight>
                <FollowValue>{followers}</FollowValue>
                <FollowLabel>{translate('follower')}</FollowLabel>
              </FollowBox>
              <FollowBox>
                <FollowValue>{followings}</FollowValue>
                <FollowLabel>{translate('following')}</FollowLabel>
              </FollowBox>
            </FollowWrapper>
          </UserInfoWrapper>
        </Animated.View>

        {/* {renderTabbar()} */}
      </Header>
    )
  }

  function renderBody() {
    return (
      <Pets
        userId={userId}
        onScrollBeginDrag={onAnimateScrollBeginDrag}
        onScrollEndDrag={onAnimateScrollEndDrag}
      />
    )
    // return (
    //   <ScrollableTabView
    //     ref={tabRef}
    //     renderTabBar={() => <View />}
    //     initialPage={0}
    //     onChangeTab={event => setTabIndex(event.i)}
    //   >
    //     <Article
    //       userId={userId}
    //       onScrollBeginDrag={onAnimateScrollBeginDrag}
    //       onScrollEndDrag={onAnimateScrollEndDrag}
    //     />
    //     <Pets
    //       userId={userId}
    //       onScrollBeginDrag={onAnimateScrollBeginDrag}
    //       onScrollEndDrag={onAnimateScrollEndDrag}
    //     />
    //   </ScrollableTabView>
    // )
  }

  return (
    <Wrapper>
      {renderHeader()}
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withUser,
  withLazyQuery({
    query: QUERY.v1UserDetail,
    service: GateWay.USER_SERVICE
  }),
  withMutation({
    mutation: MUTATION.v1Follow,
    service: GateWay.REACTION_SERVICE
  })
)(Home)
