import styled from 'styled-components/native'
import { Constants, Fonts } from 'utils'
import { NeoView } from 'components'
import FastImage from 'react-native-fast-image'

const HEIGHT = 45

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const View = styled.View``
export const Header = styled.View`
  padding-top: ${Constants.layout.navPadding};
  background-color: ${props => props.theme.colors.ui_3D_background};
  ${props => props.theme.shadows.ui_3D_shadow_header};
  min-height: ${HEIGHT + Constants.layout.navPadding};
  align-items: center;
  z-index: 10;
`
export const HeaderControlWrapper = styled.View`
  width: 100%;
  height: 0;
  overflow: visible;
`
export const HeaderControl = styled.View`
  height: ${HEIGHT};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 10;
`
export const UserNameWrappe = styled.View`
  height: ${HEIGHT};
  justify-content: center;
  align-items: center;
`
export const BackButton = styled.TouchableOpacity`
  width: ${HEIGHT};
  height: ${HEIGHT};
  justify-content: center;
  align-items: center;
`
export const UserInfoWrapper = styled.View`
  margin-top: 10;
  margin-bottom: 25;
  flex-direction: column;
  align-items: center;
`
export const AvatarWrapper = styled(NeoView)`
  width: 70;
  height: 70;
  border-radius: 35;
  justify-content: center;
  align-items: center;
`
export const Avatar = styled(FastImage)`
  width: 70;
  height: 70;
  border-radius: 35;
`
export const UserName = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_2};
  ${props => props.theme.shadows.ui_3D_text_shadow};
  margin-top: ${props => (props.margin ? 8 : 0)};
`

export const FollowWrapper = styled.View`
  flex-direction: row;
`
export const FollowBox = styled.View`
  margin-horizontal: 10;
  flex-direction: column;
  align-items: ${props => (props.alignRight ? 'flex-end' : 'flex-start')};
  margin-top: 15;
`
export const FollowValue = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
  ${props => props.theme.shadows.ui_3D_text_shadow};
  margin-bottom: 3;
`
export const FollowLabel = styled.Text`
  ${Fonts.small};
  color: ${props => props.theme.colors.gray_3};
`
export const TabbarWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`
export const TabButton = styled.TouchableOpacity`
  flex: 1;
  margin-horizontal: 20;
  align-items: center;
`
export const TabLine = styled.View`
  height: 2;
  width: 100%;
  margin-top: 8;
  background-color: ${props =>
    props.selected ? props.theme.colors.primary_1 : 'transparent'};
`
export const HeaderRight = styled.View`
  flex-direction: row;
`
export const FollowButton = styled.TouchableOpacity`
  padding-horizontal: 10;
  padding-vertical: 6;
  border-width: ${props => (!props.isFollowed ? 0 : 1)};
  border-color: ${props => props.theme.colors.gray_1};
  border-radius: 4;
  background-color: ${props =>
    !props.isFollowed ? props.theme.colors.primary_1 : 'transparent'};
`
export const FollowButtonLabel = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props =>
    !props.isFollowed ? props.theme.colors.white : props.theme.colors.gray_2};
`
export const FImage = styled(FastImage)`
  height: 24;
  width: 24;
`
