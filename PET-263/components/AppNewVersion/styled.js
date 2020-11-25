import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import FastImage from 'react-native-fast-image'
import { StyleSheet } from 'react-native'

export const ModalWrapper = styled.View`
  width: 80%;
  height: 320;
  border-radius: 5;
  background-color: ${Colors.white};
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text`
  text-align: center;
  color: ${Colors.primary_1};
  font-size: 16;
  font-weight: 600;
  margin-top: 30;
  margin-horizontal: 15;
  line-height: 25;
`

export const ModalButton = styled.TouchableOpacity`
  width: 60%;
  background-color: ${Colors.primary_1};
  padding-vertical: 18;
  border-radius: 10;
  margin-top: 20;
  padding-top: 15;
  padding-right: 10;
  padding-bottom: 15;
  padding-left: 10;
  justify-content: center;
  align-items: center;
`

export const UpdateText = styled.Text`
  color: ${Colors.white};
  text-align: center;
  font-weight: 700;
  font-size: 16;
`
export const Image = styled(FastImage)`
  width: 80;
  height: 80;
`
export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: Colors.black_transparent_4,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
