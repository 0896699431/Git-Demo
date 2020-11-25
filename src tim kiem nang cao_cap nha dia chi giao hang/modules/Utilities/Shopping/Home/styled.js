import styled from 'styled-components/native'
import { Constants, Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ProductsWrapper = styled.FlatList`
  flex: 1;
  padding-horizontal: 10;
`
export const ProductWrapper = styled(NeoView)`
  /* height: ${Constants.layout.screenWidth / 2 + 70}; */
  width: ${Constants.layout.screenWidth / 2 - 30};
  margin-horizontal: 10;
  margin-top: 20;
  border-radius: 15;
`
export const ProductThumb = styled(Image)`
  width: ${Constants.layout.screenWidth / 2 - 30};
  height: ${Constants.layout.screenWidth / 2 - 30};
  border-top-left-radius: 15;
  border-top-right-radius: 15;
  border-bottom-left-radius: 6;
  border-bottom-right-radius: 6;
`
export const Title = styled.Text`
  ${Fonts.subTitle_1};
  margin: 10px;
  margin-bottom: 5px;
`
export const InfoWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 10px;
`
export const PriceValue = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => props.theme.colors.red};
`
export const CartButton = styled(NeoView)`
  width: 32;
  height: 32;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  margin-left: 10;
`
export const HeaderView = styled.View`
  height: 0;
  overflow: visible;
  position: relative;
  top: 0;
  z-index: 69;
`
export const PromotionWrapper = styled.View`
  height: 32;
  /* width: 40; */
  border-top-left-radius: 15;
  border-bottom-right-radius: 20;
  background-color: ${props => props.theme.colors.primary_2};
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  padding-horizontal: 8;
`
export const PromotionValue = styled.Text`
  ${Fonts.body_2};
  font-weight: bold;
  color: ${props => props.theme.colors.white};
`
export const Footer = styled.View`
  height: 100;
  justify-content: center;
  align-items: center;
`
export const ProductInfo = styled.View`
  height: 100;
  padding-bottom: 15;
  justify-content: space-between;
`

export const LoadingSpinner = styled.ActivityIndicator``

export const AddCartWrapper = styled.View`
  height: 0;
`

export const ShopCartButton = styled.TouchableOpacity`
  padding: 10px;
`
