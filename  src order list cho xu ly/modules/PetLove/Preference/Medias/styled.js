import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { NeoView, Image } from 'components'
import { Constants, Fonts } from 'utils'

export const BasicSettingWrapper = styled(NeoView)`
  padding-vertical: 15;
  padding-horizontal: 15;
  margin-bottom: 20;
  margin-top: 10;
  border-radius: 10;
`

export const RowSubTitle = styled.Text`
  color: ${props =>
    props.bolder ? props.theme.colors.gray_2 : props.theme.colors.gray_3};
  font-size: 16;
`

export const SettingName = styled.Text`
  font-weight: 700;
  font-size: 23;
  color: ${props => props.theme.colors.gray_2};
`
export const MediaHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => (props.firstItem ? 0 : 15)};
  padding-top: ${props => (props.firstItem ? 0 : 15)};
  border-top-width: ${props => (props.firstItem ? 0 : 0.4)};
  border-top-color: ${props => props.theme.colors.gray_5};
`

export const HeaderRightWrapepr = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const PetAvatar = styled(Image)`
  width: 50;
  height: 50;
  border-radius: 25;
`

export const PetInfoWrapper = styled.View`
  flex: 1;
  margin-left: 10;
`
export const PetName = styled.Text`
  font-size: 16;
  font-weight: 600;
  color: ${props => props.theme.colors.gray_1};
`

export const PetBreed = styled.Text`
  flex: 1;
  font-size: 16;
  font-weight: 600;
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
  width: 70%;
`

export const MediaBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20;
`

export const MediaBoxWrapper = styled.TouchableOpacity`
  width: 70;
  height: 83;
  margin-right: 5;
  margin-bottom: 10;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gray_5};
`

export const MediaContent = styled(Image)`
  width: 100%;
  height: 100%;
  margin-right: 10;
  margin-bottom: 10;
  border-radius: 10;
  position: absolute;
`

export const MinusWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -8;
  top: -8;
  z-index: 9999;
  width: 25;
  height: 25;
  border-radius: 17.5;
  background-color: ${props => props.theme.colors.primary_1};
`

export const DumbView = styled.View``
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20;
`

export const NodataWrapper = styled.View`
  align-items: center;
`

export const NodataThumb = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: 120;
  margin-top: 5;
`

export const NodataDes = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 10;
`

export const AddPetButton = styled(NeoView)`
  background-color: ${props => props.theme.colors.red};
  border-radius: 10;
  padding-horizontal: 15;
  padding-vertical: 10;
  margin-top: 10;
`
export const AddPetLabel = styled.Text`
  ${Fonts.body_1};
  font-weight: bold;
  color: ${props => props.theme.colors.white};
`

export const styles = StyleSheet.create({
  mediaWrapper: {
    marginBottom: 20
  }
})
