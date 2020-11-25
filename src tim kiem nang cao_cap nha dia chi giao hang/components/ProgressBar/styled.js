import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Colors from 'utils/Colors'

export const Wrapper = styled.View`
  flex: 1;
  height: 4;
  border-radius: 2;
  background-color: ${Colors.gray_1};
  margin-horizontal: 2;
`

export const CustomStyle = StyleSheet.create({
  progress: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray_3
  }
})
