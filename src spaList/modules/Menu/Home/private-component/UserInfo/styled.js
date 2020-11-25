import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { Image } from 'components'

export const UserInfoWrapper = styled.TouchableOpacity`
  margin-left: 20;
  margin-top: 10;
  margin-bottom: 10;
  flex-direction: row;
  align-items: center;
`

export const AvatarWrapper = styled.View`
  border-style: solid;
  border-width: 1.5;
  border-color: ${props => props.theme.colors.gray_5};
  width: 46;
  height: 46;
  border-radius: 23;
  justify-content: center;
  align-items: center;
`

export const UserAvatar = styled(Image)`
  width: 45;
  height: 45;
  border-radius: 22.5;
`
export const UserName = styled.Text`
  ${props => (props.isLogin ? Fonts.subTitle_1 : Fonts.body_1)}
  color: ${props =>
    props.isLogin
      ? props.theme.colors.gray_1
      : props.theme.colors.blue_primary};
  margin-left: 10;
`
