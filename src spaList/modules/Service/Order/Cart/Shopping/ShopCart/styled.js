import styled from 'styled-components/native'
// import FastImage from 'react-native-fast-image'
import { Fonts, Constants } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const ListCart = styled.FlatList`
  flex: 1;
`

export const CartWrapper = styled(NeoView)`
  margin-horizontal: 16;
  margin-top: 25;
  padding-vertical: 5;
`

export const CartHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.6;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const ShopName = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`

export const RemoveButton = styled.TouchableOpacity`
  padding: 10px;
`

export const CheckButton = styled.TouchableOpacity`
  padding: 10px;
`

export const ProductWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10;
`

export const ProductThumb = styled(Image)`
  width: 65;
  height: 65;
  border-radius: 10;
`

export const ProductInfo = styled.View`
  flex: 1;
  padding-left: 10px;
`

export const ProductName = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_1};
`

export const PropertyWrapper = styled.View`
  align-self: flex-start;
  padding-horizontal: 5px;
  padding-vertical: 2px;
  margin-top: 2;
  border-radius: 4;
  background-color: ${props => props.theme.colors.gray_5};
`

export const PropertyText = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`
export const PriceWrapper = styled.View`
  padding-horizontal: 10;
`

export const PriceText = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.red};
`

export const PropertyQuantityWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const QuantityButton = styled.TouchableOpacity`
  width: 25;
  height: 25;
  justify-content: center;
  align-items: center;
`

export const QuantityValue = styled.Text`
  width: 25;
  text-align: center;
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_1};
`

export const FooterOrderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 20;
  left: 10;
  right: 10;
  width: ${Constants.layout.screenWidth - 20};
  height: 50;
  border-radius: 25;
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-width: 0.4;
  border-color: ${props => props.theme.colors.gray_5};
  ${props => props.theme.shadows.shadow_1};
  padding-horizontal: 8;
`

export const CheckText = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_1};
`

export const TotalPrice = styled.Text`
  flex: 1;
  ${Fonts.subTitle_2};
  font-weight: bold;
  color: ${props => props.theme.colors.red};
  text-align: right;
`
export const OrderButton = styled.TouchableOpacity`
  height: 34;
  padding-horizontal: 10;
  margin-left: 5;
  margin-top: 10;
  justify-content: center;
  align-self: flex-start;
  background-color: ${props =>
    props.disabled ? props.theme.colors.gray_4 : props.theme.colors.red};
  border-radius: 17;
`
export const OrderText = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.white};
`
export const ListFooter = styled.View`
  height: 100;
`
