import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts, Constants } from 'utils'
import { PlaceholderLoading, Image, NeoView } from 'components'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const Wrapper = styled.View`
  margin-top: 30;
`

export const NewsWrapper = styled(NeoView)`
  border-radius: 20;
  margin-top: 20;
  margin-bottom: 60;
`
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20;
`
export const Title = styled.Text`
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_2};
`
export const SeeMore = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`
export const SeeMoreLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.red};
  margin-right: 5;
  margin-bottom: 2;
`
export const ThumbWrapper = styled(Image)`
  height: ${(Constants.layout.screenWidth - 80) / 2};
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  overflow: hidden;
`
export const CategoryWrapper = styled.View`
  flex-direction: row;
  height: 25;
  align-items: flex-end;
  padding-horizontal: 20;
`
export const ForumLogoWrapper = styled.View`
  width: 50;
  height: 50;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gray_5};
  border-width: 3;
  border-color: ${props => props.theme.colors.ui_3D_background};
  margin-right: 10;
  overflow: hidden;
`
export const ForumImage = styled(Image)`
  width: 100%;
  height: 100%;
`
export const NewsName = styled.Text`
  /* flex: 1; */
  margin-horizontal: 20;
  margin-top: 10;
  margin-bottom: 15;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const DateTime = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_4};
  margin-bottom: 20;
  margin-horizontal: 20;
`
export const CategoryName = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
`

export const LoadingWrapper = styled(PlaceholderLoading)`
  width: 90%;
  height: 200;
  margin-left: 5%;
  border-radius: 20;
  margin-vertical: 20;
`

export const CustomStyle = StyleSheet.create({
  thumb: {
    width: '100%',
    height: '100%'
  },
  storeLogo: {
    width: '70%',
    height: '70%'
  }
})
