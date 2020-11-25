import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled(NeoView)`
  margin-top: 20;
  border-radius: 15;
`

export const BoxWrapper = styled.View`
  border-radius: 15;
  padding: 10px;
  border-width: ${props => (props.verify ? 0 : 1)}
  border-color: ${props => props.theme.colors.red};
`

export const ProductsWrapper = styled.FlatList``

export const ProductWrapper = styled.TouchableOpacity`
  flex-direction: row;
  margin-vertical: 10;
  align-items: center;
`
export const ProductThumb = styled(FastImage)`
  width: 50;
  height: 50;
  border-radius: 4;
`
export const ProductInfoWrapper = styled.View`
  flex: 1;
  margin-horizontal: 10;
`

export const ProductTitle = styled.Text`
  ${Fonts.subTitle_2};
  font-size: 16;
  color: ${props => props.theme.colors.gray_1};
`

export const ProductPrice = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.red};
  margin-top: 5;
`

export const DeleteButton = styled.TouchableOpacity`
  padding: 5px;
`
export const AddProductIcon = styled.View`
  width: 50;
  height: 50;
  border-radius: 4;
  background-color: ${props => props.theme.colors.gray_5};
  justify-content: center;
  align-items: center;
`

export const AddProductNote = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_2};
  margin-left: 10;
`
export const OriginPriceText = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_4};
  text-decoration-line: line-through;
`
export const Note = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
`
