import styled from 'styled-components/native'
import { Fonts } from 'utils'
import FastImage from 'react-native-fast-image'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const BodyScroll = styled.ScrollView`
  flex: 1;
`
export const AvatarWrapper = styled.TouchableOpacity`
  margin-vertical: 25;
  align-items: center;
`
export const Avatar = styled(FastImage)`
  width: 80;
  height: 80;
  border-radius: 40;
`
export const ChangeAvatarWrapper = styled.View`
  padding: 4px;
  border-radius: 6;
  margin-top: 6;
  background-color: ${props => props.theme.colors.gray_5};
`
export const ChangeAvatarText = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_2};
`
export const AvatarLoading = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`
export const Spinner = styled.ActivityIndicator``

export const AvatarBox = styled.View``

export const UserInfoWrapper = styled(NeoView)`
  margin-horizontal: 16;
  margin-vertical: 15;
  padding-horizontal: 10;
  padding-vertical: 20;
  border-radius: 15;
`
export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const RowLabel = styled.Text`
  width: 90;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`
export const RowConfigWrapper = styled.View`
  flex: 1;
  margin-left: 10;
`
export const RowInput = styled.TextInput`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
export const Line = styled.View`
  height: 0.4;
  background-color: ${props => props.theme.colors.gray_5};
  margin-vertical: 10;
`
