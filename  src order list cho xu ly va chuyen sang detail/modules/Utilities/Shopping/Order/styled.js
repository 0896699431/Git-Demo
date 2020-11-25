import styled from 'styled-components/native'
import { NeoView } from 'components'
import { Fonts, Constants } from 'utils'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const BodyWrapper = styled.ScrollView`
  flex: 1;
`

export const OrderInfoWrapper = styled(NeoView)`
  margin: 15px;
  padding: 12px;
`

export const InfoHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10;
  border-bottom-width: 0.6;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const HeaderLabel = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`

export const InfoRow = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10;
`

export const InfoInput = styled.TextInput`
  flex: 1;
  margin-left: 10;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
`

export const InfoValue = styled.Text`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
  margin-left: 10;
`

export const Line = styled.View`
  width: 100%;
  height: 0.6;
  background-color: ${props => props.theme.colors.gray_5};
`

export const FooterWrapper = styled.View`
  height: ${50 + Constants.layout.navPadding};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${Constants.layout.navPadding};
  padding-horizontal: 15px;
  border-top-width: 0.6;
  border-top-color: ${props => props.theme.colors.gray_5};
  background-color: ${props => props.theme.colors.ui_3D_background};
  ${props => props.theme.shadows.shadow_1};
`

export const TotalPrice = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => props.theme.colors.red};
`

export const SubmitButton = styled.TouchableOpacity`
  padding-horizontal: 15;
  padding-vertical: 10;
  border-radius: 8;
  background-color: ${props => props.theme.colors.red};
`

export const SubmitLabel = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => props.theme.colors.white};
`
