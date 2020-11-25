import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'

export const Wrapper = styled.View`
  overflow: hidden;
  background-color: ${props => props.theme.colors.gray_5};
`
export const LinearWrapper = styled(LinearGradient)`
  flex: 1;
`
