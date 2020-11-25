import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { Fonts, Constants } from 'utils'
import { Image, NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ListProperty = styled.FlatList`
  flex: 1;
`
export const ProductInfoWrapper = styled.View`
  margin-horizontal: 20;
  margin-vertical: 10;
  flex-direction: row;
`
export const Thumb = styled(Image)`
  width: 80;
  height: 80;
  border-radius: 8;
`
export const ProductRightInfo = styled.View`
  flex: 1;
  margin: 10px;
`
export const ProductName = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const ProductQuantity = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 10;
`
export const PropertyWrapper = styled(NeoView)`
  flex-direction: row;
  align-items: center;
  margin-horizontal: 15;
  margin-top: 20;
  border-radius: 8;
  padding: 10px;
`
export const PropertyLeftWrapper = styled.View`
  flex: 1;
`
export const PropertyName = styled.Text`
  ${Fonts.body_1};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
  margin-right: 15;
`
export const PropertyPrice = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.red};
  margin-top: 5;
`
export const PropertyRightWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
export const QuantityValue = styled.Text`
  width: 30;
  text-align: center;
  ${Fonts.body_1};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
`
export const QuantityButton = styled.TouchableOpacity`
  width: 30;
  height: 30;
  justify-content: center;
  align-items: center;
`
export const FooterActionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-top: 10;
  padding-horizontal: 15;
  padding-bottom: ${Constants.layout.navPadding};
  border-top-width: 0.4;
  border-top-color: ${props => props.theme.colors.gray_5};
  ${props => props.theme.shadows.shadow_1};
`

export const BuyWrapper = styled.View`
  flex: 1;
  align-items: center;
`
export const BuyButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  padding-vertical: 8;
  padding-horizontal: 10;
  border-radius: 8;
`

export const BuyButtonText = styled.Text`
  ${Fonts.body_1};
  font-weight: bold;
  color: ${props =>
    props.isActive ? props.theme.colors.red : props.theme.colors.gray_4};
`

export const Styles = StyleSheet.create({
  cartIcon: {
    marginRight: 5
  }
})
