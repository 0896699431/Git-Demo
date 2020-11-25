import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient'

import { Constants, Fonts } from 'utils'
const MIN_HEIGHT = Constants.layout.navPadding + 80

export const Container = styled.View`
  flex: 1;
`
export const ToastWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 69696969;
  height: 0;
  justify-content: flex-start;
  overflow: visible;
`
export const ToastModal = styled(Modal)`
  flex: 1;
  margin: 0px;
  padding: 0px;
  justify-content: flex-start;
`
export const ModalWrapper = styled.View`
  width: 100%;
  height: ${MIN_HEIGHT};
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.green_primary};
  ${props => props.theme.shadows.shadow_5};
`
export const ModalBox = styled(LinearGradient)`
  flex: 1;
  padding-top: ${Constants.layout.navPadding};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const ThumbWrapper = styled.View`
  padding-left: 20;
  padding-right: 10;
`
export const MessageWrapper = styled.View`
  flex: 1;
  padding-right: 20;
`
export const Message = styled.Text`
  ${Fonts.subTitle_1};
  font-size: 18;
  color: ${props => (props.color ? props.color : props.theme.colors.white)};
`
export const Description = styled.Text`
  margin-top: 4;
  ${Fonts.body_1};
  color: ${props => (props.color ? props.color : props.theme.colors.white)};
  opacity: 0.7;
`
