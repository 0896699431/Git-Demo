import styled from 'styled-components/native'
import Modal from 'react-native-modal'

export const ModalContainer = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`

export const ModalWrapper = styled.View`
  flex: 1;
  margin-top: ${props => props.marginTop};
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-top-left-radius: 15;
  border-top-right-radius: 15;
`

export const ModalHeader = styled.View`
  height: 36;
  justify-content: center;
  align-items: center;
`
export const ModalHeaderClose = styled.View`
  width: 50;
  height: 4;
  border-radius: 2;
  background-color: ${props => props.theme.colors.gray_5};
`
export const ModalBody = styled.View`
  flex: 1;
`
