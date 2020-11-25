import styled from 'styled-components/native'
import Constants from 'utils/Constants'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.ImageBackground`
  flex: 1;
  width: ${Constants.layout.screenWidth};
`

export const Image = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  flex: 1;
`
