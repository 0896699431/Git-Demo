import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Constant from 'utils/Constants'

export const Wrapper = styled.View`
  height: ${Constant.layout.navPadding};
  justify-content: flex-start;
  position: absolute;
  z-index: 9999;
`

export const View = styled.View``

export const styles = StyleSheet.create({
  gradientWrapper: {
    height: 80 + Constant.layout.navPadding,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  }
})
