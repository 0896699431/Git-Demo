import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { Fonts } from 'utils'
import { Image } from 'components'

export const CardWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const CardBox = styled.View`
  height: 130;
  width: 210;
  ${props => props.theme.shadows.shadow_5};
`
export const NoteLabel = styled.Text`
  margin-top: 20;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_4};
`
export const CardLogo = styled.View`
  height: 30;
  margin-left: 16;
  margin-top: 10;
`
export const NumberDotWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 16;
`
export const NumberDot = styled.View`
  width: ${props => (props.selected ? 8 : 5)};
  height: ${props => (props.selected ? 8 : 5)};
  border-radius: ${props => (props.selected ? 4 : 2.5)};
  margin: 2px;
  background-color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.gray_5};
`
export const DateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 16;
  margin-bottom: 20;
`
export const DateDot = styled.View`
  width: ${props => (props.selected ? 8 : 4)};
  height: ${props => (props.selected ? 8 : 4)};
  border-radius: ${props => (props.selected ? 4 : 2)};
  margin: 2px;
  background-color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.gray_5};};
`
export const DateSlash = styled.Text`
  color: ${props => props.theme.colors.gray_5};
`
export const NumberGroup = styled.View`
  flex-direction: row;
  align-items: center;
`
export const BlackArea = styled.View`
  height: 20;
  width: 100%;
  margin-top: 20;
  opacity: 0.7;
  background-color: ${props => props.theme.colors.black};
`
export const SignArea = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 20;
  width: 70%;
  margin-left: 16;
  margin-top: 15;
  border-radius: 2;
  background-color: ${props => props.theme.colors.white};
`
export const CvvDot = styled.View`
  width: ${props => (props.selected ? 8 : 5)};
  height: ${props => (props.selected ? 8 : 5)};
  border-radius: ${props => (props.selected ? 4 : 2.5)};
  margin: 2px;
  background-color: ${props =>
    props.selected ? props.theme.colors.black : props.theme.colors.gray_2};
`
export const CardNumberEnd = styled.Text`
  font-size: 12;
  letter-spacing: 0.5;
  color: ${props => props.theme.colors.white};
`
export const DateLabel = styled.Text`
  font-size: 10;
  letter-spacing: 0.3;
  color: ${props => props.theme.colors.white};
`

export const Logo = styled(Image)`
  width: 60;
  height: 30;
  resize-mode: contain;
`

export const CustomStyle = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    backfaceVisibility: 'hidden'
  },
  backCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start'
  }
})
