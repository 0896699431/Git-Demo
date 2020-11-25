import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Constants, Fonts } from 'utils'
import { NeoView, Image, PlaceholderLoading } from 'components'

export const Wrapper = styled.View`
  width: ${Constants.layout.screenWidth};
  height: 120;
`
export const ListStore = styled.FlatList`
  flex: 1;
  padding-vertical: 15;
`

export const StoreWrapper = styled(NeoView)`
  flex-direction: row;
  width: ${Constants.layout.screenWidth * 0.8};
  height: 100;
  padding-horizontal: 10;
  padding-vertical: 15;
  margin-horizontal: 10;
  align-items: center;
`

export const Thumb = styled(Image)`
  width: 56;
  height: 56;
  border-radius: 28;
  background-color: ${props => props.theme.colors.gray_5};
`
export const RightInfoWrapper = styled.View`
  flex: 1;
  margin-left: 10;
  justify-content: center;
`

export const StoreName = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const DistanceValue = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
`

export const LoadingWrapper = styled(PlaceholderLoading)`
  width: ${Constants.layout.screenWidth / 1.3};
  height: 100;
  margin-left: 16;
  border-radius: 20;
  margin-vertical: 20;
`

export const CustomStyles = StyleSheet.create({
  listContent: {
    marginHorizontal: 6
  }
})
