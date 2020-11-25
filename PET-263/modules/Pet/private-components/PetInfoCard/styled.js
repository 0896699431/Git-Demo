import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Fonts, Constants } from 'utils'
import { NeoView } from 'components'

export const CardWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 5;
`

export const CardBox = styled.View`
  height: 190;
  width: ${Constants.layout.screenWidth - 30};
  ${props => props.theme.shadows.shadow_5};
`

export const RowInfoWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10;
  margin-bottom: 10;
`
export const RowLeftWrapper = styled.View`
  width: 100;
  justify-content: center;
  align-items: center;
`
export const RowRightWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const Logo = styled(FastImage)`
  width: 60;
  height: 60;
  opacity: 0.8;
`
export const AppInfoText = styled.Text`
  ${Fonts.button_1};
  font-size: 14;
  color: ${props => props.theme.colors.gray_2};
`
export const AppInfoDescription = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
`
export const CardName = styled.Text`
  ${Fonts.button_1};
  font-size: 14;
  font-weight: bold;
  color: ${props => props.theme.colors.red};
  margin-top: 10;
`
export const PetAvatarWrapper = styled(NeoView)`
  width: 80;
  height: 80;
  border-radius: 10;
`
export const PetAvatar = styled(FastImage)`
  width: 80;
  height: 80;
  border-radius: 10;
`
export const PetInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5;
  margin-horizontal: 5;
`
export const PetInfoLabel = styled.Text`
  width: 80;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
`
export const PetInfoValue = styled.Text`
  flex: 1;
  ${Fonts.body_1};
  font-weight: bold;
  color: ${props => props.theme.colors.gray_2};
`
export const BackTopWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10;
  margin-horizontal: 10;
  padding-bottom: 10;
  border-bottom-width: 0.4;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`
export const BackTopText = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`
export const BreedText = styled.Text`
  flex: 1;
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
  margin-left: 22;
`
export const PetDescription = styled.Text`
  flex: 1;
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_3};
  margin-top: 10;
`
export const Bold = styled.Text`
  font-weight: bold;
`

export const BackInfoRapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`
export const BackLeftWrapper = styled.View`
  width: 100;
  justify-content: center;
  align-items: center;
`
export const BackRightWrapper = styled.View`
  flex: 1;
  height: 100%;
  padding-left: 10;
  border-left-width: 0.4;
  border-left-color: ${props => props.theme.colors.gray_5};
`
export const Fingerprint = styled(FastImage)`
  width: 60;
  height: 60;
`
export const BackTitle = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_1};
  margin-top: 10;
`

export const FooterWrapper = styled.View`
  flex-direction: row;
  margin-top: 20;
  justify-content: space-between;
  align-items: center;
`

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-vertical: 10;
  padding-horizontal: 20;
  background-color: ${props => props.bgColor};
`
export const ButtonLeft = styled(Button)`
  border-top-left-radius: 8;
  border-bottom-left-radius: 8;
`
export const ButtonRight = styled(Button)`
  border-top-right-radius: 8;
  border-bottom-right-radius: 8;
`

export const CartWrapper = styled.TouchableOpacity`
  flex: 1;
`

export const CustomStyle = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    backfaceVisibility: 'hidden',
    elevation: 2
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
