import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled(NeoView)`
  margin-top: 20;
  border-radius: 15;
`

export const BoxWrapper = styled.TouchableOpacity`
  border-radius: 15;
  padding: 10px;
`

export const HeaderText = styled.Text`
  flex: 1;
  ${Fonts.header_medium};
  color: ${props => props.theme.colors.gray_1};
`
export const CouponButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 15;
`
export const CouponLabel = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`
export const CouponValue = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
`
export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const RemoveCoupon = styled.TouchableOpacity`
  padding: 5px;
`
