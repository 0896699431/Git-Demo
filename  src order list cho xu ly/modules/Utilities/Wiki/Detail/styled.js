import styled from 'styled-components/native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Fonts } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Body = styled(ScrollableTabView)`
  flex: 1;
`
export const Title = styled.Text`
  ${Fonts.page_title};
  font-size: 18;
  color: ${props => props.theme.colors.gray_1};
  margin-horizontal: 16;
  margin-bottom: 10;
`
