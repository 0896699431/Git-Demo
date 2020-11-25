import styled from 'styled-components/native'
// import FastImage from 'react-native-fast-image'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const OrderItemWrapper = styled(NeoView)`
  padding: 10px;
  margin-top: 10;
  margin-bottom: 15;
  margin-horizontal: 15;
`

export const OrderItemHeader = styled.View`
  padding-bottom: 10;
  border-bottom-width: 0.4;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const OrderItemFooter = styled.View`
  flex-direction: row;
  padding-top: 10;
  border-top-width: 0.4;
  border-top-color: ${props => props.theme.colors.gray_5};
`

export const OrderItemDown = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  padding-top: 5;
  padding-bottom: 5;
`
export const OrderItemFooterLable = styled.Text`
  flex: 1;
  text-align: right;
  padding-bottom: 10;
  padding-right: 10;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_3};
`

export const OrderItemHeaderLable = styled.Text`
  text-align: left;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`

export const ListProduct = styled.FlatList``

export const ProductItem = styled.View`
  flex-direction: row;
  margin-vertical: 5;
`

export const ProductThumb = styled(Image)`
  width: 80;
  height: 80;
  border-radius: 8;
`

export const ProductInfo = styled.View`
  flex: 1;
  padding-horizontal: 10;
`

export const ProductName = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`

export const PropertyWrapper = styled.View`
/* background-color:red; */
  align-self: flex-start;
  padding: 5px;
  border-radius: 4;
  /* background-color: ${props => props.theme.colors.gray_5}; */
  margin-top: 5;
`

export const PropertyLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_4};
`

export const ItemPriceLabel = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.red};
`

export const QuantityLabel = styled.Text`
  ${Fonts.subTitle_1};
  padding-left: 20;
  color: ${props => props.theme.colors.gray_1};
`
export const ViewList = styled.View``
