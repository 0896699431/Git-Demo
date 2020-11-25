import styled from 'styled-components/native'
import Fonts from 'utils/Fonts'
import FastImage from 'react-native-fast-image'

export const ArticleAuthorWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const WIDTH = 35
const HEIGHT = 35

export const AuthorWrapper = styled.View`
  margin-left: 15;
`

export const AuthorAvatar = styled(FastImage)`
  width: ${WIDTH};
  height: ${HEIGHT};
  border-radius: ${WIDTH / 2};
`

export const AuthorName = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
  text-transform: ${props => (props.lowercase ? 'none' : 'uppercase')};
`

export const TimeWrite = styled.Text`
  ${props => (props.subFont ? props.subFont : Fonts.subTitle_3)};
  font-weight: normal;
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
`
