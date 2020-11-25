import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled(NeoView)`
  margin-top: 20;
  border-radius: 15;
`

export const BoxWrapper = styled.View`
  border-radius: 15;
  padding: 10px;
  border-width: ${props => (props.verify ? 0 : 1)}
  border-color: ${props => props.theme.colors.red};
`

export const HeaderText = styled.Text`
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_1};
`

export const PhoneWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10;
  margin-vertical: 10;
  border-style: solid;
  border-bottom-width: 1;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const PhoneInput = styled.TextInput`
  flex: 1;
  margin-left: 14;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
  padding: 0px;
`

export const PetNote = styled.TextInput`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
  padding-vertical: 15;
`

export const PetOwnerWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 6;
  border-style: solid;
  border-bottom-width: 1;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const PetAvatar = styled(FastImage)`
  width: 30;
  height: 30;
  border-radius: 15;
  margin-right: 5;
`

export const PetName = styled.Text`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`
export const UpdatePhone = styled.TouchableOpacity``
export const UpdatePhoneText = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.red};
`
