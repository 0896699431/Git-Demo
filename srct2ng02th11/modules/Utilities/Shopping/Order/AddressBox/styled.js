import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Shadow1 = styled.View`
  ${props => props.theme.shadows.ui_3D_shadow_1a};
  margin-left: 20;
  margin-right: 20;
  margin-top: 25;
`
export const CartItemWrapper = styled(NeoView)`
  border-radius: 10;
  padding-top: 13;
  padding-bottom: 5;
  padding-right: 15;
  padding-left: 15;
  margin-horizontal: 15;
  margin-top: 25;
`

export const Header = styled.View`
  margin-bottom: 10;
  border-bottom-width: 0.4;
  border-bottom-color: ${props => props.theme.colors.gray_5};
  padding-bottom: 10;
`
export const Title = styled.Text`
  font-size: 15;
  font-weight: 600;
  letter-spacing: 0.02;
  color: ${props => props.theme.colors.gray_1};
`
export const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-bottom: 13;
`
export const ListAddress = styled.FlatList``

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15;
  justify-content: space-between;
  padding-bottom: 5;
  border-bottom-width: 0.5;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const CheckWrapper = styled.View``

export const EditWrapper = styled.TouchableOpacity`
  padding: 10px;
`

export const AddressInfoWrapper = styled.TouchableOpacity`
  flex: 1;
  margin-horizontal: 10;
`

export const ReceiverName = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
  font-weight: bold;
  margin-bottom: 2;
`
export const ReceiverPhone = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_1};
`
export const AddressText = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`
