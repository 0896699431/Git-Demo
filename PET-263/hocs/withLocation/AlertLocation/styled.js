import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.View`
  flex: 1;
`

export const ModalWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-top: 50;
  padding-horizontal: 20;
`
export const ModalTitle = styled.Text`
  font-size: 30;
  font-weight: 700;
  margin-right: 30;
  line-height: 40;
  color: ${props => props.theme.colors.gray_1};
`
export const LocatDescription = styled.Text`
  margin-top: 20;
  font-size: 16;
  line-height: 25;
  color: ${props => props.theme.colors.gray_1};
`
export const LocationImage = styled(FastImage)`
  width: 100%;
  height: 200;
`

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 30;
  right: 0;
  left: 0;
`

export const AllowWrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.primary_1};
  width: 90%;
  height: 50;
  margin-left: 20;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  margin-bottom: 10;
`
export const AllowText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 17;
  font-weight: 700;
`
export const MyLocatWrapper = styled.TouchableOpacity`
  width: 90%;
  height: 50;
  margin-left: 20;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  border-color: ${props => props.theme.colors.gray_2};
  border-width: 1;
  border-radius: 10;
`
export const MyLocatText = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-size: 17;
  font-weight: 700;
`
