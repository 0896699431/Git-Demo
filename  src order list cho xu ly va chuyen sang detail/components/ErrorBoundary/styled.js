import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Constants, Fonts } from 'utils'

export const NotFoundWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Thumb = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: ${Constants.layout.screenWidth / 2};
`

export const Description = styled.Text`
  max-width: 300;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_3};
  text-align: center;
  margin-top: 15;
  line-height: 20;
`
export const BackButton = styled.TouchableOpacity`
  padding-vertical: 10;
  padding-horizontal: 15;
  border-radius: 10;
  margin-top: 20;
  background-color: ${props => props.theme.colors.gray_5};
`
export const BackLabel = styled.Text`
  ${Fonts.button_2};
  color: ${props => props.theme.colors.gray_2};
`
