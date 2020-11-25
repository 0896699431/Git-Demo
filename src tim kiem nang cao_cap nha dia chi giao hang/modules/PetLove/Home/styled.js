import styled from 'styled-components/native'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'

const HEADER_HEIGHT = 45
export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const ButtonWrapper = styled.View`
  height: ${HEADER_HEIGHT};
  justify-content: center;
  align-items: center;
  top: ${isIphoneX() || isIphoneXsMax() ? 35 : 20};
  z-index: 9999999;
  margin-top: 5;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  width: 90%;
  align-self: center;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
