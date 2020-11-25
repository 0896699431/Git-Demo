import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from 'utils'
import FastImage from 'react-native-fast-image'
import { NeoView } from 'components'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const Wrapper = styled(NeoView)`
  padding-horizontal: 20;
  padding-vertical: 15;
  border-radius: 20;
  margin-horizontal: 20;
  margin-top: 25;
`

export const NameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const WelcomeText = styled.Text`
  ${Fonts.body_1};
  color: ${props => props.theme.colors.gray_2};
`
export const WelcomeButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 5;
`

export const NameText = styled.Text`
  ${Fonts.subTitle_1};
  color: ${props => props.theme.colors.gray_1};
`
export const CoinWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const CointValue = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.red};
  margin-left: 5;
`
export const Line = styled.View`
  border-width: 0.5;
  border-color: ${props => props.theme.colors.gray_5};
  margin-vertical: 10;
`
export const ActionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
`
export const ActionItem = styled(TouchableOpacity)`
  align-items: center;
`
export const ActionTitle = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_1};
  margin-top: 5;
`
export const LoginPickerWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding-vertical: 5;
`
export const NoAvatarWrapper = styled(NeoView)`
  width: 32;
  height: 32;
  border-radius: 16;
  justify-content: center;
  align-items: center;
  margin-right: 10;
`
export const LoginIntroWrapper = styled.View`
  flex: 1;
`
export const LoginIntroTitle = styled.Text`
  ${Fonts.body_2};
  font-size: 15;
  font-weight: bold;
  color: ${props => props.theme.colors.gray_1};
`
export const LoginIntroDescription = styled.Text`
  ${Fonts.body_2};
  font-size: 15;
  color: ${props => props.theme.colors.gray_3};
  margin-top: 4;
`
export const Image = styled(FastImage)``

export const CustomStyle = StyleSheet.create({
  userLoadingLeft: {
    width: '50%',
    height: 24,
    borderRadius: 4
  },
  userLoadingRight: {
    width: 40,
    height: 24,
    borderRadius: 4
  },
  actionIconLoading: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  actionLabelLoading: {
    width: 60,
    height: 18,
    borderRadius: 4,
    marginTop: 5
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  actionTouch: {
    alignItems: 'center'
  }
})
