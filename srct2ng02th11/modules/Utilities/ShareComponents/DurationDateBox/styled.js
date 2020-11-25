import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled(NeoView)`
  margin-top: 20;
  border-radius: 15;
  padding: 10px;
`
export const HeaderText = styled.Text`
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_1};
  margin-bottom: 10;
`
export const DatePickerWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10;
`
export const Label = styled.Text`
  width: 100;
  ${Fonts.subTitle_2};
  color: ${props => (props.color ? props.color : props.theme.colors.gray_1)};
`
export const Line = styled.View`
  height: 1;
  background-color: ${props => props.theme.colors.gray_5};
`
export const Value = styled.Text`
  flex: 1;
  margin-left: 10;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const View = styled.View``
