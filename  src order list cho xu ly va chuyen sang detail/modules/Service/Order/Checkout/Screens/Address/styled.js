import styled from 'styled-components/native'
import { NeoView } from 'components'

export const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const Shadow1 = styled.View`
  ${props => props.theme.shadows.ui_3D_shadow_1a};
  margin-left: 20;
  margin-right: 20;
  margin-top: 25;
`
export const CartItemWrapper = styled(NeoView)`
  margin-horizontal: 20;
  margin-top: 25;
  border-radius: 10;
  padding-top: 13;
  padding-bottom: 5;
  padding-right: 15;
  padding-left: 15;
`

export const Text = styled.Text`
  font-size: 15;
  font-weight: 600;
  letter-spacing: 0.02;
  color: ${props => props.theme.colors.gray_1};
`
export const AddressText = styled.Text`
  font-size: 14;
  font-weight: ${props => (props.isBold ? 600 : 400)};
  letter-spacing: 0.02;
  color: ${props => props.theme.colors.gray_1};
  margin-left: 10;
  margin-right: 10;
`

export const View = styled.View`
  margin-top: 10;
  border-style: solid;
  border-top-width: 0.5;
  border-top-color: ${props => props.theme.colors.gray_5};
  padding-top: 12;
`
export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15;
  justify-content: space-between;
`
export const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-bottom: 13;
`
export const AddressMethodRoundWrapper = styled.View`
  width: 16;
  height: 16;
  border-radius: 8;
  border-style: solid;
  border-width: 1;
  border-color: ${props => props.theme.colors.gray_2};
  justify-content: center;
  align-items: center;
`
export const DumbView = styled.View`
  flex-direction: row;
  align-items: center;
`
