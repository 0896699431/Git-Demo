import styled from 'styled-components/native'
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image'
import { Fonts } from 'utils'
import { NeoView } from 'components'

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
export const ArticlesWrapper = styled(Carousel)``
export const ItemWrapper = styled(NeoView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 15;
  padding-horizontal: 16;
  margin-vertical: 20;
  border-radius: 10;
`
export const LeftColumn = styled.View`
  flex: 1;
  padding-right: 10;
`
export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`
export const Avatar = styled(FastImage)`
  width: 20;
  height: 20;
  border-radius: 10;
`
export const UserName = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_2};
  margin-left: 5;
`
export const ArticleTitle = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  font-size: 18;
  color: ${props => props.theme.colors.gray_1};
  margin-top: 10;
`
export const Thumb = styled(FastImage)`
  width: 80;
  height: 80;
  border-radius: 10;
`
