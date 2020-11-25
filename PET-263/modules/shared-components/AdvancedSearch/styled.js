import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import Constants from 'utils/Constants'
import { Image, NeoView, PlaceholderLoading } from 'components'
import { Fonts } from 'utils'

export const FilterContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5;
`
export const SearchWrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-radius: 15;
  flex: 7;
  justify-content: center;
  border-style: solid;
  border-width: ${props => (!props.back ? 1 : 0)};
  border-bottom-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
  margin-right: ${props => (!props.back ? 15 : 0)};
  padding-right: 20;
  height: 35;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: ${props => (props.back ? 10 : 0)};
`

export const SearchInput = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  width: 90%;
  margin-left: ${props => (!props.back ? 0 : 20)};
  font-size: ${props => (!props.back ? 15 : 18)};
`

export const FilterWrapper = styled.TouchableOpacity`
  width: 38;
  height: 38;
  border-radius: 19;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.gray_6};
  border-style: solid;
  border-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
`
export const ModalWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.dark};
  align-items: center;
  justify-content: center;
  padding-top: ${Constants.layout.navPadding};
`

export const FImage = styled(Image)`
  width: 20;
  height: 20;
`
export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ListClinic = styled.FlatList`
  flex: 1;
`
export const Footer = styled.View`
  height: 80;
`
export const LoadingSpinner = styled.ActivityIndicator``
export const ProductWrapper = styled(NeoView)`
  margin-horizontal: 15;
  border-radius: 10;
  margin-top: 20;
  border-color: ${props => props.theme.colors.primary_1};
  border-width: ${props => (props.selected ? 1 : 0)};
`
export const ProductWrapperBox = styled.View`
  flex-direction: row;
  border-radius: 10;
  padding: 10px;
`
export const ProductThumb = styled(Image)`
  width: 80;
  height: 80;
  border-radius: 8;
`
export const ProductInfoWrapper = styled.View`
  flex: 1;
  margin-horizontal: 10;
`
export const ProductName = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const ProductPrice = styled.Text`
  margin-top: 5;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.red};
`
export const OldPrice = styled.Text`
  margin-top: 5;
  ${Fonts.body_2};
  text-decoration: line-through;
  color: ${props => props.theme.colors.gray_3};
`
export const ListServiceWrapper = styled.FlatList`
  flex: 1;
  width: 100%;
`
export const TopHeaderWrapper = styled.View`
  height: 130;
  width: 100%;
  background-color: red;
`

export const styles = StyleSheet.create({
  card: {
    marginTop: 20
  }
})
export const LoadingWrapper = styled(PlaceholderLoading)`
  width: ${Constants.layout.screenWidth * 0.8};
  height: 100;
  margin-left: 10;
  border-radius: 20;
  margin-vertical: 20;
`
