import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Constants, Fonts } from 'utils'
import FastImage from 'react-native-fast-image'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-bottom: 80;
`

export const ProductDescription = styled.Text`
  /* font-family: ${Constants.fonts.fontFamily}; */
  font-size: 17;
  color: ${props => props.theme.colors.gray_2};
  font-weight: normal;
  margin-top: 30;
  line-height: 25;
  width: 85%;
`
export const IntroBox = styled(NeoView)`
  margin-vertical: 20;
  margin-horizontal: 15;
  border-radius: 15;
`
export const ListDoctor = styled.ScrollView`
  width: 100%;
  padding-horizontal: 10;
  padding-top: 10;
`
export const DoctorWrapper = styled.TouchableOpacity`
  margin: 5px;
  align-items: center;
`
export const DoctorAvatar = styled(FastImage)`
  width: 54;
  height: 54;
  border-radius: 28;
`
export const Line = styled.View`
  height: 0.4;
  background-color: ${props => props.theme.colors.gray_5};
  margin-vertical: 10;
`
export const Description = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
  margin-bottom: 10;
  margin-horizontal: 10;
`
export const ListAddressWrapper = styled.View`
  margin-horizontal: 15;
  margin-bottom: 30;
`
export const DoctorHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 15;
  padding-bottom: 10;
`
export const DoctorRightWrapper = styled.View`
  flex: 1;
  margin-left: 5;
`
export const DoctorName = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const DoctorRole = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
`

export const CustomStyles = StyleSheet.create({
  rating: {
    width: 20,
    height: 20
  }
})
