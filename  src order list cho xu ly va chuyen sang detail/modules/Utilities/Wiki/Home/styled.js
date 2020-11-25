import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const ListBreed = styled.FlatList`
  flex: 1;
`
export const BreedWrapper = styled(NeoView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 20;
  padding-horizontal: 15;
  margin-top: 20;
  border-radius: 15;
`
export const ThumbWrapper = styled(NeoView)`
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
export const Footer = styled.View`
  height: 80;
  justify-content: center;
  align-items: center;
`
export const KindImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 100;
`
export const KindModalWrapper = styled.View`
  height: 0;
`
