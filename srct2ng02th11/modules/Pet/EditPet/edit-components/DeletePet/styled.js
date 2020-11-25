import styled from 'styled-components/native'
import Fonts from 'utils/Fonts'

export const Wrapper = styled.TouchableOpacity`
  flex: 1;
  height: 50;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-radius: 15;
  padding: 10px;
  margin-horizontal: 25;
  margin-top: 30;
  margin-bottom: 80;
`
export const Title = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.red};
`
