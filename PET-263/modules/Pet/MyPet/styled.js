import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Body = styled.ScrollView`
  flex: 1;
`
export const EditButton = styled.TouchableOpacity`
  width: 30;
  height: 30;
  justify-content: center;
  align-items: center;
`
export const WikiDiscover = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 20;
  margin-horizontal: 25;
  padding: 10px;
  background-color: ${props => props.theme.colors.gray_6};
  border-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
  border-radius: 10;
`
export const DiscoverText = styled.Text`
  flex: 1;
  ${props => (props.bold ? Fonts.subTitle_1 : Fonts.body_1)};
  color: ${props => props.theme.colors.gray_2};
`
export const WikiButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-radius: 5;
  background-color: ${props => props.theme.colors.gray_5};
`
export const ButtonText = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`
