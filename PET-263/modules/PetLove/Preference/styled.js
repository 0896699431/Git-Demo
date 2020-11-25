import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { NeoView, Image } from 'components'
import { Constants, Fonts } from 'utils'
import Colors from '../../../utils/Colors'

export const Wrapper = styled.ScrollView`
  flex: 1;
`
export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const Text = styled.Text``

export const BasicSettingWrapper = styled(NeoView)`
  padding-vertical: 15;
  padding-horizontal: 15;
  margin-bottom: 20;
  margin-top: 10;
  border-radius: 10;
`
export const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15;
  padding-bottom: 5;
  border-bottom-width: ${props => (props.noBorder ? 0 : 0.5)};
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const RightWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const RightTouchableWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const RowTitle = styled.Text`
  font-weight: 600;
  font-size: 16;
  color: ${props => props.theme.colors.gray_1};
`

export const RowSubTitle = styled.Text`
  color: ${props =>
    props.bolder ? props.theme.colors.gray_2 : props.theme.colors.gray_3};
  font-size: 16;
`

export const SettingName = styled.Text`
  font-weight: 700;
  font-size: 23;
  color: ${props => props.theme.colors.gray_2};
  margin-bottom: 20;
`
export const MediaHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderRightWrapepr = styled.View`
  flex-direction: row;
  align-items: center;
`

export const PetAvatar = styled(Image)`
  width: 50;
  height: 50;
  border-radius: 25;
`

export const PetInfoWrapper = styled.View`
  margin-left: 10;
  flex-wrap: wrap;
`
export const PetName = styled.Text`
  font-size: 16;
  font-weight: 600;
  color: ${props => props.theme.colors.gray_1};
`

export const PetBreed = styled.Text`
  font-size: 16;
  font-weight: 600;
  color: ${props => props.theme.colors.gray_3};
  margin-top: 5;
  width: 70%;
`

export const MediaBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20;
`

export const MediaBoxWrapper = styled.TouchableOpacity`
  width: 70;
  height: 83;
  margin-right: 5;
  margin-bottom: 10;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gray_5};
`

export const MediaContent = styled(Image)`
  width: 100%;
  height: 100%;
  margin-right: 10;
  margin-bottom: 10;
  border-radius: 10;
  position: absolute;
`

export const MinusWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -8;
  top: -8;
  z-index: 9999;
  width: 25;
  height: 25;
  border-radius: 17.5;
  background-color: ${props => props.theme.colors.primary_1};
`

export const SaveWrapper = styled.TouchableOpacity``

export const SaveText = styled.Text`
  color: ${props =>
    props.isLoadingImg
      ? Colors.primary_transparent
      : props.theme.colors.primary_1};
  font-size: 18;
  font-weight: 600;
`

export const DumbView = styled.View``
export const IntroductionWrapper = styled.View`
  border-width: 0.3;
  border-color: ${props => props.theme.colors.gray_4};
  border-radius: 5;
  height: 150;
  width: 100%;
  padding-vertical: 5;
  padding-horizontal: 5;
`
export const IntroductionInput = styled.TextInput`
  width: 100%;
  color: ${props => props.theme.colors.gray_1};
`

export const ConfirmSettingWrapper = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.ui_3D_background};
  ${props => props.theme.shadows.shadow_2};
  padding-top: 10;
  padding-bottom: ${Constants.layout.navPadding / 2 + 5};
`
export const ConfirmSetting = styled(NeoView)`
  padding-horizontal: 20;
  padding-vertical: 8;
  border-radius: 10;
  background-color: ${props =>
    props.active ? props.theme.colors.red : props.theme.colors.gray_4};
`

export const ConfirmText = styled.Text`
  ${Fonts.button_1};
  color: ${props => props.theme.colors.white};
`

export const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 25
  },
  scrollView: {
    marginRight: 15,
    marginLeft: 15
  },
  minusBtn: {
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 9999
  },
  thumbStyle: {
    width: 20,
    height: 20
  },
  locationName: {
    width: '75%',
    marginLeft: 10
  },
  switch: {
    position: 'absolute',
    right: -10
  }
})
