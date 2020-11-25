import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
`
export const CameraWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-bottom: 12;
  margin-left: 10;
  margin-right: 5;
`
export const ImageWrapper = styled.View`
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const TimeText = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  font-size: 13;
`

export const styles = StyleSheet.create({
  lightBox: {
    height: '100%',
    width: '100%'
  },
  image: {
    flex: 1
  },
  imageFlex: {
    flex: 1
  },
  chatImg: {
    borderRadius: 5,
    height: 100,
    margin: 3,
    width: 150
  },
  sendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10
  }
})
