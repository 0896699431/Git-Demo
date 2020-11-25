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
`
export const AddressesWrapper = styled.FlatList``
export const AddressItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-style: solid;
  border-top-width: ${props => (props.hideLine ? 0 : 1)};
  border-top-color: ${props => props.theme.colors.gray_5};
  padding-top: 15;
  margin-top: 5;
`

export const RightView = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ExamInfoWrapper = styled.View`
  flex: 1;
  margin-left: 15;
`

export const ExamRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2;
`

export const ExamInfo = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_2};
`

export const DistanceWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-vertical: 5;
  padding-horizontal: 10;
  border-radius: 3;
  background-color: ${props => props.theme.colors.gray_5};
`

export const DistanceText = styled.Text`
  margin-left: 5;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`

export const ExamAddress = styled.Text`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 5;
  margin-bottom: 5;
`

export const FooterWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 10;
  padding-top: 10;
  border-top-width: ${props => (props.hideLine ? 0 : 1)};
  border-top-color: ${props => props.theme.colors.gray_5};
`
