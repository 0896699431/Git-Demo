import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts, Constants } from 'utils'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
`

export const ScrollableTab = styled(ScrollableTabView)`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const FlatList = styled.FlatList`
  width: 100%;
  height: ${props => props.bodyHeight};
`

export const CommentWrapper = styled.View`
  flex: 1;
`
export const Text = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.115;
`
export const View = styled.View``

export const CommentatorWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  margin-top: 20;
`

export const AvatarWrapper = styled(TouchableOpacity)``

export const CommentatorAva = styled(Image)`
  width: 40;
  height: 40;
  border-radius: 20;
`
export const AvatarDefaultWrapper = styled.View`
  width: 40;
  height: 40;
  border-radius: 20;
  justify-content: center;
  align-items: center;
  background-color; ${props => props.theme.colors.gray_5};
`

export const CommentName = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: 600;
  font-size: 15;
  color: ${props => props.theme.colors.gray_1};
  margin-bottom: 3;
`

export const CommentContentWrapper = styled.View`
  padding-horizontal: 15;
`

export const CommentContent = styled.Text`
  ${Fonts.subTitle_2};
  font-weight: 400;
  color: ${props => props.theme.colors.gray_1};
`
export const ReactionCountWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5;
  margin-left: 50;
  width: 94%;
`
export const ReactionCount = styled.Text`
  ${Fonts.subTitle_3};
  font-weight: ${props => (props.isBold ? '600' : 'normal')};
  font-size: 12;
  color: ${props =>
    props.isBlue
      ? props => props.theme.colors.blue_primary
      : props => props.theme.colors.gray_3};
  margin-left: ${props => (props.isBold ? 5 : 0)};
`
export const ReplyWrapper = styled(TouchableOpacity)`
  margin-left: 15;
`

export const Reply = styled.Text`
  ${Fonts.subTitle_3};
  font-weight: 600;
  color: ${props => props.theme.colors.gray_3};
`

export const DumbView = styled.View`
  flex: 1;
  margin-left: 10;
`

export const NodataWrapper = styled.View`
  align-items: center;
`
export const NodataThumb = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: ${Constants.layout.screenWidth / 2};
  margin-top: 30;
`

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 15;
  padding-bottom: 10;
  padding-left: 5;
  margin-top: ${props => (!props.fromNotiRep ? 10 : 40)};
  border-style: solid;
  border-bottom-width: 0.5;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const ArticleButton = styled.TouchableOpacity`
  padding-horizontal: 10px;
  padding-vertical: 7;
  margin-left: 10;
  border-width: 0.6;
  border-color: ${props => props.theme.colors.blue_primary};
  border-radius: 10;
`
export const ArticleButtonLabel = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.blue_primary};
`

export const PageName = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.115;
  text-align: center;
  margin-left: 14;
`

export const CustomStyle = StyleSheet.create({
  modal: {
    margin: 0
  },
  footer: {
    height: 150
  },
  line: {
    width: '100%',
    height: 0.4,
    marginTop: 5
  }
})
