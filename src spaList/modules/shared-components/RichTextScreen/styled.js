import styled from 'styled-components/native'
import WebView from 'react-native-webview'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const BodyWeb = styled(WebView)`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
