import styled from 'styled-components/native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Constants, Fonts } from 'utils'

const FOOTER_HEIGHT = 46

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const BodyWrapper = styled(ScrollableTabView)`
  flex: 1;
`

export const FooterWrapper = styled.View`
  height: ${Constants.layout.navPadding + FOOTER_HEIGHT};
  padding-bottom: ${Constants.layout.navPadding};
  border-top-width: 1;
  border-top-color: ${props => props.theme.colors.gray_5};
  z-index: 69;
  overflow: visible;
  ${props => props.theme.shadows.shadow_6};

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-horizontal: 16;
`
export const TotalPrice = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.red};
`
export const NextButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`
export const NextText = styled.Text`
  ${Fonts.button_1};
  font-weight: 600;
  color: ${props => props.theme.colors.red};
  margin-right: 10;
`
export const SubmitButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80%;
  background-color: ${props => props.theme.colors.red};
  padding-horizontal: 10px;
  border-radius: 8;
`
export const SubmitLabel = styled.Text`
  ${Fonts.button_1};
  font-weight: 600;
  color: ${props => props.theme.colors.white};
`
