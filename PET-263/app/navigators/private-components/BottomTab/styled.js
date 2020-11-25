import styled from 'styled-components/native'
import Constants from 'utils/Constants'

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  background-color: ${props => props.color};
  padding-bottom: ${Constants.layout.navPadding / 2};
  ${props => props.shadow && props.shadow};
`
