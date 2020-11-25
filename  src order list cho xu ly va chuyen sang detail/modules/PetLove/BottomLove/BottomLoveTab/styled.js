import styled from 'styled-components/native'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'
import { Constants } from 'utils'

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  background-color: ${props => props.color};
  padding-bottom: ${isIphoneX() || isIphoneXsMax()
    ? Constants.layout.navPadding / 2
    : 5};
  ${props => props.shadow && props.shadow};
`
