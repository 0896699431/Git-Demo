import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const Wrapper = styled(NeoView)`
  margin-horizontal: 20;
  border-radius: 15;
  margin-bottom: 20;
  margin-top: ${props => (props.firstItem ? 30 : 0)};
`
export const HeaderWrapper = styled.TouchableOpacity`
  flex-direction: row;
  height: ${props => (props.height ? props.height : 50)};
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 15;
  border-bottom-width: ${props => (props.collapse ? 1 : 0)};
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const Title = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const BodyWrapper = styled.View`
  margin-horizontal: 15;
  margin-vertical: 15;
`
export const BodyText = styled.Text`
  ${Fonts.body_1};
  line-height: 20;
  color: ${props => props.theme.colors.gray_2};
`
