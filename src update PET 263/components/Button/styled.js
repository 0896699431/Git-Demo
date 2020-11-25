import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Colors from 'utils/Colors'

export const BtnWrapper = styled.TouchableOpacity`
  background-color: ${Colors.primary_1};
  margin-right: 25;
  height: 46;
  border-radius: 20;
  margin-top: 40;
`

export const CustomStyle = StyleSheet.create({
  gradient: {
    height: 46,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
