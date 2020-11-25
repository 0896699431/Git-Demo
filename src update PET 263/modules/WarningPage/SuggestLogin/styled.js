import styled from 'styled-components/native'
import { Fonts, Constants } from 'utils'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Body = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${-(Constants.layout.navPadding + 50)};
  padding-horizontal: 20;
`
export const Description = styled.Text`
  max-width: 300;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_3};
  text-align: center;
  margin-top: 15;
  line-height: 20;
`
export const ThumbWrapper = styled.View`
  margin-bottom: 30;
`
export const LoginButton = styled.TouchableOpacity`
  height: 46;
  padding-horizontal: 20;
  border-radius: 8;
  margin-top: 20;
  background-color: ${props => props.theme.colors.red};
  justify-content: center;
  align-items: center;
`
export const LoginLabel = styled.Text`
  ${Fonts.button_2};
  color: ${props => props.theme.colors.white};
`
export const Thumb = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: ${Constants.layout.screenWidth / 2};
`
