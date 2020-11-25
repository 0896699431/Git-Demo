import { StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
`
export const ImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.gray_14};
  width: 100%;
  height: 100%;
`

export const ImageView = styled(Image)`
  width: 100%;
  height: 100%;
`

export const LabelContainer = styled.View`
  width: 100%;
  margin-top: 20;
  position: absolute;
  z-index: 99999;
  top: 100;
  left: 15;
`

export const LabelWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 10;
  padding-horizontal: 10;
  padding-vertical: 5;
  border-radius: 5;
  height: 35;
  margin-bottom: 10;
  background-color: ${props => props.theme.colors.whiteTransparent_1};
`
export const LabelText = styled.Text``
export const Text = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  text-align: center;
  margin-top: 10;
`

export const ModalContailer = styled.ScrollView`
  flex: 1;
`
export const BreedWrapper = styled(NeoView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 20;
  padding-horizontal: 15;
  margin-top: 10
  margin-bottom: 15;
  border-radius: 15;
`
export const BreedThumbWrapper = styled(NeoView)`
  width: 50;
  height: 50;
  border-radius: 25;
  margin-vertical: 15;
`
export const BreedThumb = styled(Image)`
  width: 50;
  height: 50;
  border-radius: 25;
`
export const BreedName = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
  margin-horizontal: 15;
`
export const ListBreed = styled.FlatList`
  flex: 1;
`
export const NoDataWrapper = styled.View`
  justify-content: center;
  align-items: center;
`
export const NoDataThumb = styled(FastImage)`
  width: 100%;
  height: 180;
`

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'baseline',
    paddingBottom: 40
  }
})
