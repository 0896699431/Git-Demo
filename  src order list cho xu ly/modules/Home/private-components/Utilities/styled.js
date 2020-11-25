import  { StyleSheet } from 'react-native'
import { Image, NeoView, PlaceholderLoading } from 'components'
import styled from 'styled-components/native'
import { Constants, Fonts } from 'utils'

const UTILITY_SIZE =
  (Constants.layout.screenWidth - 20) / Constants.homeConfig.utilityColumn - 20

export const Wrapper = styled.View``
export const ListUtilityWrapper = styled.FlatList`
  /* flex: 1; */
  margin-top: 10;
  margin-horizontal: 10;
`
export const UtilityWrapper = styled(NeoView)`
  width: ${UTILITY_SIZE};
  height: ${UTILITY_SIZE};
  border-radius: 20;
  margin-horizontal: 10;
  margin-vertical: 10;
  justify-content: center;
  align-items: center;
`
export const UtilityAvatarWrapper = styled.View`
  width: 60;
  height: 60;
  justify-content: center;
  align-items: center;
`
export const UtilityName = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 5;
  text-align: center;
`
export const UtilityThumb = styled(Image)``
export const OtherThumb = styled(Image)``

export const LoadingItem = styled(PlaceholderLoading)`
  width: ${UTILITY_SIZE};
  height: ${UTILITY_SIZE};
  border-radius: 20;
  margin-horizontal: 10;
  margin-vertical: 10;
`

export const styles = StyleSheet.create({
  flatList: {
    marginTop: 10,
    marginHorizontal: 10
  }
})
