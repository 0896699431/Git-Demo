import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const Wrapper = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  margin-top: 10;
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text``
export const Image = styled(FastImage)`
  width: 40;
  height: 40;
`

export const Bell = styled(FastImage)`
  width: 40;
  height: 40;
  position: relative;
`
export const NotificationWrapper = styled.View`
  position: absolute;
`
export const RedDot = styled.View`
  background-color: ${props => props.color};
  width: 8;
  height: 8;
  border-radius: 4;
  position: absolute;
  top: 0;
  right: 0;
`

export const CustomStyle = StyleSheet.create({
  tabWrapper: {
    height: 50,
    width: 50,
    borderRadius: 15,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradientWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  }
})
