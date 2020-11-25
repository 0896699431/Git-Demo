import styled from 'styled-components/native'
import { Fonts } from 'utils'

export const BtnYes = styled.TouchableOpacity`
  width: 200;
  height: 50;
  justify-content: center;
  align-items: center;
  border-width: 2;
  border-radius: 5;
  background-color: ${props => props.theme.colors.gray_7};
  border-color: ${props => props.theme.colors.gray_7};
`

export const Container = styled.View`
  flex: 1;
`
export const AlertWrapper = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
  background-color: rgba(52, 52, 52, 0.8);
`
export const AlertModal = styled.View`
  width: 80%;
  padding: 10px;
  background-color: white;
  border-radius: 10;
  align-items: center;
`

export const TxtView = styled.View`
  font-size: 18;
  margin-top: 20;
`
export const TxtTitle = styled.Text`
  margin-top: 10;
  ${Fonts.header_medium};
`
export const TxtDescription = styled.Text`
  margin-top: 10;
  ${Fonts.subTitle_1};
`

export const BtnView = styled.View`
  margin-top: 20;
  margin-bottom: 10;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const BtnNo = styled.TouchableOpacity`
  height: 50;
  justify-content: center;
  align-items: center;
`

export const TxtBtnYes = styled.Text`
  flex: 1;
  margin-top: 15;
  text-align: center;
  ${Fonts.header_large2};
  color: ${props => props.theme.colors.primary_1};
`
export const TxtBtnNo = styled.Text`
  flex: 1;
  margin-top: 6;
  text-align: center;
  ${Fonts.header_large2};
  color: ${props => props.theme.colors.gray_4};
`
export const ViewIcon = styled.TouchableOpacity`
  position: absolute;
  right: 10;
  top: 5;
`
