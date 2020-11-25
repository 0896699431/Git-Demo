import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import { Fonts, Constants } from 'utils'

export const ModalWrapper = styled(Modal)`
  margin: 0px;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.View`
  width: ${Constants.layout.screenWidth - 30};
  height: 270;
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-radius: 15;
  padding: 10px;
  justify-content: center;
  align-items: center;
`
export const WarningTitle = styled.Text`
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_1};
  text-align: center;
  margin-bottom: 15;
  margin-top: 15;
`
export const WarningDescription = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  text-align: center;
  margin-bottom: 25;
`
export const Button = styled.TouchableOpacity`
  margin-top: 10;
  padding-horizontal: 20;
  padding-vertical: 15;
  border-radius: 10;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.red};
  justify-content: center;
  align-items: center;
`
export const ButtonText = styled.Text`
  ${Fonts.body_1};
  color: ${props => (props.color ? props.color : props.theme.colors.white)};
`
