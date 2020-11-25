import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
  padding-top: 20;
`

export const List = styled.FlatList`
  flex: 1;
`

export const Text = styled.Text``

export const Footer = styled.View`
  min-height: 80;
  justify-content: center;
  align-items: center;
`
export const CustomStyle = StyleSheet.create({
  loadingItem: {
    borderRadius: 10,
    paddingTop: 10,
    paddingRight: 5,
    marginVertical: 15,
    paddingLeft: 15,
    marginHorizontal: 20,
    minHeight: 120
  },
  footer: {
    marginBottom: 40,
    marginTop: 10
  }
})
