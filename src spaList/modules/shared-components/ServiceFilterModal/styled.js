import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled.ScrollView`
  flex: 1;
`
export const BoxWrapper = styled(NeoView)`
  padding: 10px;
  margin-horizontal: 16;
  margin-vertical: 15;
  border-radius: 10;
`
export const Header = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const Line = styled.View`
  height: 0.4;
  background-color: ${props => props.theme.colors.gray_5};
  margin-vertical: 10;
`
export const RowRapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const CheckButton = styled.TouchableOpacity`
  width: 40;
  height: 40;
  justify-content: center;
  align-items: center;
`
export const RowInfoWrapper = styled.View`
  flex: 1;
  margin-right: 10;
`
export const RowTitile = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => (props.color ? props.color : props.theme.colors.gray_1)};
`
export const RowSubTitle = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
`
export const RowRightButton = styled.TouchableOpacity`
  margin-right: 10;
`
