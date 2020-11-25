import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Fonts from 'utils/Fonts'
import { NeoView, Image } from 'components'

export const VetWrapper = styled(NeoView)`
  margin-horizontal: 20;
  padding-horizontal: 15;
  margin-top: 20;
  padding-top: 15;
  padding-bottom: 15;
  border-radius: 15;
`
export const DumbView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const VetHeadWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 8;
  border-style: solid;
  border-bottom-width: 0.8;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

const WIDTH = 68
export const VetImg = styled(Image)`
  width: ${WIDTH};
  height: ${WIDTH};
  border-radius: ${props => (props.isClinic ? 8 : WIDTH / 2)};
`

export const VetInfo = styled.View`
  flex: 1;
  margin-left: 10;
  justify-content: center;
`

export const ProductName = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
`

export const VetAddress = styled.Text`
  ${Fonts.subTitle_2};
  font-size: 14;
  font-weight: 500;
  margin-top: 10;
  color: ${props => props.theme.colors.gray_1};
`

export const VetLocationWrapper = styled.View`
  background-color: ${props => props.theme.colors.gray_5};
  width: 40;
  height: 20;
  border-radius: 4;
  justify-content: center;
  align-items: center;
`

export const VetLocation = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-size: 14;
`

export const VetDistance = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-size: 14;
`

export const VetDescription = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 10;
  margin-bottom: 20;
`

export const VetFooterWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const TimeSheetWrapper = styled.View``
export const TimeTitle = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-size: 14;
`
export const TimeSheet = styled.Text`
  color: ${props => props.theme.colors.gray_2};
  font-size: 14;
  font-weight: 600;
  margin-top: 5;
`

export const VetBookWrapper = styled.View``

export const BookBtn = styled(NeoView)`
  height: 40;
  padding-horizontal: 25;
  border-radius: 10;
  background-color: ${props =>
    props.isBook
      ? props.theme.colors.red
      : props.theme.colors.ui_3D_background};
  justify-content: center;
  align-items: center;
`
export const BookText = styled.Text`
  text-transform: uppercase;
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  font-size: 14;
  letter-spacing: 0.5;
`

export const styles = StyleSheet.create({
  notBookBtn: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  bookBtn: {
    width: 90,
    height: 40
  }
})
