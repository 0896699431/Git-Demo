import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Image, NeoView } from 'components'

const WIDTH = 50
const HEIGHT = 50

export const CustomTabWrapper = styled.View`
  height: 45;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 5;
  background-color: ${props => props.theme.colors.ui_3D_background};
`

export const TabItemWrapper = styled(NeoView)`
  width: ${WIDTH};
  height: ${HEIGHT};
  border-radius: ${WIDTH / 2};
  /* align-items: center;
  justify-content: center; */
  padding-bottom: 10;
  align-items: center;
`
export const TabImageWrapper = styled.View`
  width: ${WIDTH};
  height: ${HEIGHT};
  border-radius: ${WIDTH / 2};
  background-color: ${props => props.theme.colors.gray_6};
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: ${props =>
    props.activeTab
      ? props.theme.colors.red
      : props.theme.colors.black_transparent_0};
  border-width: ${props => (props.activeTab ? 2 : 0)};
`
export const TabImage = styled(Image)`
  width: 30;
  height: 30;
`
export const TopWrapper = styled(NeoView)`
  background-color: ${props =>
    props.activeTab ? props.theme.colors.primary_1 : props.theme.colors.gray_5};
  width: ${WIDTH};
  height: ${HEIGHT};
  border-radius: ${WIDTH / 2};
  justify-content: center;
  align-items: center;
`
export const Top = styled.Text`
  color: ${props =>
    props.grayText ? props.theme.colors.gray_3 : props.theme.colors.white};
  font-weight: 700;
`
export const ForumsLoading = styled.View`
  flex-direction: row;
  margin-left: 15;
`

export const CustomStyle = StyleSheet.create({
  gradientWrapper: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forumLoadingItem: {
    marginRight: 20
  }
})
