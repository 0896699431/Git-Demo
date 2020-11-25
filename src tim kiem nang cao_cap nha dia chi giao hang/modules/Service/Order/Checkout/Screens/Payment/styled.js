import styled from 'styled-components/native'
import { NeoView } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  padding-top: 15;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const Text = styled.Text`
  font-size: 15;
  font-weight: 600;
  letter-spacing: 0.02;
  margin-top: 5;
  color: ${props => props.theme.colors.gray_1};
  padding-top: 5;
`
export const PaymentMethodWrapper = styled(NeoView)`
  margin-top: 20;
  margin-bottom: 20;
  border-radius: 15;
  margin-horizontal: 20;
  padding-left: 20;
`
export const PaymentRowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-bottom: 10;
  padding-top: 10;
`

export const PaymentText = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-weight: 600;
  font-size: 14;
  margin-left: 15;
`

export const PaymentRoundWrapper = styled.View`
  width: 16;
  height: 16;
  border-radius: 8;
  border-style: solid;
  border-width: 1;
  border-color: ${props =>
    props.isChoosed
      ? props => props.theme.colors.red
      : props => props.theme.colors.gray_2};
  margin-right: 15;
  justify-content: center;
  align-items: center;
`
export const PaymentRound = styled.View`
  width: 12;
  height: 12;
  border-radius: 6;
  background-color: ${props => props.theme.colors.red};
`
export const CreditType = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  margin-left: 15;
  margin-top: 2;
  letter-spacing: 0.5;
  font-size: 14;
`
export const View = styled.View``
export const DumbView = styled.View`
  border-style: solid;
  border-top-width: 0.5;
  border-top-color: ${props => props.theme.colors.gray_5};
  margin-top: 10;
`
