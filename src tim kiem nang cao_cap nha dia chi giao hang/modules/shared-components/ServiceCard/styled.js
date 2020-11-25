import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
`
export const CartItemWrapper = styled(NeoView)`
  border-radius: 10;
  padding-top: 10;
  padding-bottom: 15;
  padding-right: 5;
  margin-vertical: 15;
  padding-left: 15;
  margin-horizontal: 20;
`

export const BookButtonComponent = styled(NeoView)`
  border-radius: 10;
  height: 45;
  justify-content: center;
  align-items: center;
`
export const BookButton = styled(BookButtonComponent)`
  background-color: ${props =>
    props.isBuy ? props.theme.colors.primary_2 : props.theme.colors.red};
`
export const ShopCartButton = styled(BookButtonComponent)`
  width: 45;
  background-color: ${props => props.theme.colors.ui_3D_background};
  margin-right: 15;
`

export const BookText = styled.Text`
  text-transform: uppercase;
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  font-size: 14;
  letter-spacing: 0.5;
`

export const ProductWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 5;
`
export const ShopInfoWrapper = styled.View`
  flex-direction: ${props => (props.isVertical ? 'column' : 'row')};
  padding-top: 5;
  padding-right: 5;
`
export const ProductName = styled.Text`
  flex: 1;
  ${Fonts.button_2};
  font-weight: 600;
  color: ${props => props.theme.colors.gray_1};
  margin-bottom: 8;
`
export const ProductThumb = styled(Image)`
  width: 100;
  height: 100;
  border-radius: 8;
`

export const ProductDesWrapper = styled.View`
  flex: 6.5;
  margin-left: 15;
`
export const ShopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ShopName = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-weight: 500;
  font-size: 15;
  letter-spacing: 0.02;
`
export const ShopDistance = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  font-weight: 500;
  font-size: 15;
  letter-spacing: 0.02;
  margin-top: 10;
`
export const TotalPrice = styled.Text`
  font-size: 15;
  font-weight: 500;
  color: ${props =>
    props.isDark ? props.theme.colors.gray_3 : props.theme.colors.red};
  margin-top: 10;
`

export const BookWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15;
`

export const PromotionWrapper = styled.View`
  background-color: ${props => props.theme.colors.primary_2};
  top: -10;
  left: -15;
  padding: 10px;
  border-bottom-right-radius: 30;
  border-top-left-radius: 10;
`
export const PercentValue = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.white};
`
