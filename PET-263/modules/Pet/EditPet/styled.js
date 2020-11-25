import styled from 'styled-components/native'
import { Fonts } from 'utils'
import FastImage from 'react-native-fast-image'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
`
export const BodyScroll = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
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
export const InfoWrapper = styled(NeoView)`
  margin-horizontal: 20;
  margin-bottom: 30;
  border-radius: 15;
  padding: 10px;
  padding-top: 5;
`
export const HeaderWrapper = styled.View`
  padding-vertical: 10;
  border-bottom-width: 1;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const HeaderTitle = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const InfoRow = styled.View`
  flex-direction: row;
  height: 40;
  align-items: center;
`
export const RowLabel = styled.Text`
  width: 82;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`
export const RowContentWrapper = styled.View`
  flex: 1;
  height: 100%;
  border-bottom-color: ${props => props.theme.colors.gray_5};
  border-bottom-width: ${props => (props.bottom ? 0 : 1)};
`
export const Input = styled.TextInput`
  flex: 1;
  height: 100%;
  border-width: 0;
  padding-right: 5;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
export const AvatarBox = styled.View``
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
export const DescriptionInput = styled.TextInput`
  height: 80;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
