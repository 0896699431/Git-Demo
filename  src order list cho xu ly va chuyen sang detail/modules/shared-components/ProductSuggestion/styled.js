import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'
import { Fonts } from 'utils'

export const Wrapper = styled.View``
export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20;
`
export const Title = styled.Text`
  flex: 1;
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_1};
`
export const SeeMore = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
export const SeeMoreLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.red};
  margin-right: 5;
`

export const ProductsWrapper = styled(Carousel)``
export const ItemWrapper = styled.TouchableOpacity`
  padding-vertical: 15;
  padding-horizontal: 10;
  margin-vertical: 20;
  border-radius: 10;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
