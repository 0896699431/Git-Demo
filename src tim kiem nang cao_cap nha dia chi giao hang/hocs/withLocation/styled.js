import { StyleSheet } from 'react-native'

import styled from 'styled-components/native'
import Colors from 'utils/Colors'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 50
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 18,
    fontWeight: '700',
    height: 50
  }
})
