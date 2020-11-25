import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { NeoView } from 'components'
import { Fonts } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
`
export const BodyWrapper = styled(FastImage)`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const BodyScrollView = styled.ScrollView`
  flex: 1;
`
export const LogoWrapper = styled.View`
  margin-vertical: 10;
  margin-bottom: 40;
  align-items: center;
`
export const LogoImage = styled(FastImage)`
  width: 120;
  height: 120;
  resize-mode: contain;
`
export const FormScrollTab = styled(ScrollableTabView)`
  flex: 1;
  overflow: hidden;
`
export const FormWrapper = styled(NeoView)`
  margin-horizontal: 20;
  border-radius: 15;
  height: 250;
`
export const SocialWrapper = styled.View`
  flex-direction: row;
  margin-horizontal: 20;
  margin-bottom: 50;
  margin-top: 40;
  height: 50;
`
export const SocialButton = styled(NeoView)`
  width: 50;
  height: 50;
  border-radius: 25;
  align-items: center;
  justify-content: center;
  margin-right: 20;
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.colors.white_theme};
`

export const OrLoginBy = styled.Text`
  margin-left: 20;
  margin-top: 20;
  margin-bottom: -20;
  font-size: 15;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
`

export const customeStyle = StyleSheet.create({
  bodyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 120
  }
})
