import { StyleSheet } from 'react-native'

import styled from 'styled-components/native'

export const Wrapper = styled.View`
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const Text = styled.Text``
export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 10,
    zIndex: 99999
  }
})
