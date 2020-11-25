import styled from 'styled-components/native'

import { SwipeListView } from 'react-native-swipe-list-view'
import { Fonts, Constants } from 'utils'
import { Image, NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const NotiWrapper = styled(NeoView)`
  margin-vertical: 12;
  margin-horizontal: 20;
  border-radius: 15;
  justify-content: center;
`

export const NotiItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 15;
  padding-left: 10;
  padding-vertical: 10;
`

export const UserAvatar = styled(Image)`
  width: 40;
  height: 40;
  border-radius: 20;
`

export const NotiContent = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  ${Fonts.subTitle_1};
`
export const NotiMessage = styled.Text`
  margin-top: 5;
  color: ${props => props.theme.colors.gray_3};
  ${Fonts.subTitle_2};
`

export const NotiTime = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_4};
  margin-top: 5;
`

export const ListNoti = styled(SwipeListView)`
  flex: 1;
`

export const NotiContentWrapper = styled.View`
  flex: 1;
  justify-content: center;
  margin-horizontal: 15;
`
export const StatusCicle = styled.View`
  width: 6;
  height: 6;
  border-radius: 3;
  background-color: ${props =>
    props.show ? props.theme.colors.blue_primary : 'transparent'};
  margin-top: 15;
`
export const AvatarDefaultWrapper = styled(NeoView)`
  width: 40;
  height: 40;
  border-radius: 20;
  justify-content: center;
  align-items: center;
  margin-top: 5;
`
export const NoNotiWrapper = styled.View`
  flex: 1;
  padding-top: 100;
  align-items: center;
`
export const NoNotiThumb = styled(Image)`
  width: 90%;
  height: ${Constants.layout.screenWidth * 0.7};
`
export const NoNotiDescription = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_3};
`
export const Footer = styled.View`
  height: 80;
  justify-content: center;
  align-items: center;
`
export const LoadingSpinner = styled.ActivityIndicator``

export const LeftNotiWrapper = styled.View`
  height: 100%;
  align-items: center;
`
