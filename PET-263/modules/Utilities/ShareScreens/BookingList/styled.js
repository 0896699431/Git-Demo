import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const Text = styled.Text``

export const ListServiceWrapper = styled.FlatList`
  flex: 1;
`
export const Footer = styled.View`
  height: 80;
  justify-content: center;
  align-items: center;
`
export const LoadingSpinner = styled.ActivityIndicator``

export const GetLocationButton = styled.TouchableOpacity`
  width: 30;
  height: 30;
  justify-content: center;
  align-items: center;
`

export const TopHeaderWrapper = styled.View`
  height: 130;
`

export const styles = StyleSheet.create({
  card: {
    marginTop: 20
  }
})
