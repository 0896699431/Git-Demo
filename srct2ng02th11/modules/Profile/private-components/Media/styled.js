import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Fonts from 'utils/Fonts'
import { Image } from 'components'
import Constants from 'utils/Constants'

const SMALL_SIZE = Constants.layout.screenWidth / 3 - 2

export const Wrapper = styled.View`
  flex: 1;
`
export const ListMedia = styled.FlatList`
  flex: 1;
`
export const ItemRowWrapper = styled.View`
  flex-direction: row;
`
export const SmallMedia = styled.TouchableOpacity`
  width: ${SMALL_SIZE};
  height: ${SMALL_SIZE};
  margin-vertical: 1;
  margin-horizontal: 1;
`
export const MediumMedia = styled.TouchableOpacity`
  width: ${Constants.layout.screenWidth - SMALL_SIZE - 4};
  height: ${Constants.layout.screenWidth - SMALL_SIZE - 4};
  margin-vertical: 1;
  margin-horizontal: 1;
`
export const Thumb = styled(Image)`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`
export const View = styled.View``

export const Footer = styled.View`
  min-height: 80;
  justify-content: center;
  align-items: center;
`
export const TotalPost = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_3};
  margin-vertical: 15;
  margin-left: 20;
`
export const CustomStyle = StyleSheet.create({
  mediaThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
    // backgroundColor: Colors.gray_5
  }
})
