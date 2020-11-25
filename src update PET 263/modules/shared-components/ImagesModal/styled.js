import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import { Constants } from 'utils'

export const ImagesModalWrapper = styled(Modal)`
  flex: 1;
  margin: 0px;
`
export const CloseButton = styled.TouchableOpacity`
  width: 40;
  height: 40;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 99;
  top: ${Constants.layout.navPadding + 10};
  right: 5;
`
