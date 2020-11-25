import styled from 'styled-components/native'
import Colors from 'utils/Colors'
import Fonts from 'utils/Fonts'
import { FastImage } from 'react-native-fast-image'

export const Wrapper = styled.View`
  background-color: ${Colors.black};
  flex: 1;
  flex-direction: column;
`

export const TextWrapper = styled.Text`
  color: ${Colors.red};
`

export const ListWrapper = styled.View`
  width: 200;
  height: 200;
`

export const Hello = styled.Text`
  color: ${Colors.red};
  ${Fonts.header_large};
`
