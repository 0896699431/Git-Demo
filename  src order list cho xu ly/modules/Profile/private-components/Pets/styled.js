import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Fonts from 'utils/Fonts'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
`
export const ListPet = styled.FlatList`
  flex: 1;
`
export const ItemRowWrapper = styled(NeoView)`
  margin-bottom: 30;
`
export const PetItem = styled(NeoView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 20;
  padding-vertical: 30;
  padding-horizontal: 15;
  border-radius: 15;
  margin-bottom: 25;
`
export const PetInfo = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10;
  padding-vertical: 10;
`
export const PetName = styled.Text`
  flex: 1;
  ${Fonts.header_medium};
  ${props => props.theme.shadows.ui_3D_text_shadow};
  color: ${props => props.theme.colors.gray_1};
`
export const PetKind = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-bottom: 8;
`
export const PetBirthDay = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`

export const Footer = styled.View`
  min-height: 60;
`
export const TotalPost = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_3};
  margin-vertical: 15;
  margin-left: 20;
`
export const ThumbWrapper = styled(NeoView)`
  width: 100;
  height: 100;
  border-radius: 50;
`
export const CustomStyle = StyleSheet.create({
  mediaThumb: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'cover'
  }
})
