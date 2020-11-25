import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
import { Fonts, Constants } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const ScrollView = styled(KeyboardAwareScrollView)`
  padding-horizontal: 16;
`

export const FooterWrapper = styled.View`
  ${props => props.theme.shadows.shadow_1};
  background-color: ${props => props.theme.colors.ui_3D_background};
  height: ${50 + Constants.layout.navPadding};
  padding-bottom: ${Constants.layout.navPadding};
  justify-content: center;
`

export const TotalWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 10;
  margin-right: 10;
`

export const TotalPriceFinal = styled.Text`
  ${Fonts.subTitle_1};
  font-size: 22;
  font-weight: bold;
  margin-left: 16;
  color: ${props => props.theme.colors.red};
`

export const CheckoutWrapper = styled.TouchableOpacity`
  height: 45;
  justify-content: center;
  align-items: center;
  padding-horizontal: 30;
  margin-top: 10;
  background-color: ${props =>
    props.isDisable ? props.theme.colors.gray_4 : props.theme.colors.red};
  border-radius: 8;
  align-self: center;
`

export const Checkout = styled.Text`
  color: ${props => props.theme.colors.white};
  font-weight: 700;
  font-size: 20;
`

export const Footer = styled.View`
  height: 60;
`

export const PriceNote = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_4};
  margin-top: 15;
`

export const styles = StyleSheet.create({
  card: {
    marginTop: 20
  }
})
