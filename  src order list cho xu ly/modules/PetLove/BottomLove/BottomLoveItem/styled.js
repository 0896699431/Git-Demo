import styled from 'styled-components/native'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'

export const Wrapper = styled.TouchableOpacity`
  width: 60px;
  height: ${isIphoneX() || isIphoneXsMax() ? 45 : 40};
  margin-top: 10;
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text``
