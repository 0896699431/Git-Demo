import styled from 'styled-components/native'
import Constants from 'utils/Constants'
import { Image } from 'components'

export const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 5;
`
export const SearchWrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.ui_3D_background};
  border-radius: 15;
  flex: 7;
  justify-content: center;
  border-style: solid;
  border-width: ${props => (!props.back ? 1 : 0)};
  border-bottom-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
  margin-right: ${props => (!props.back ? 15 : 0)};
  padding-right: 20;
  height: 35;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: ${props => (props.back ? 10 : 0)};
`

export const SearchInput = styled.Text`
  color: ${props => props.theme.colors.gray_3};
  width: 90%;
  margin-left: ${props => (!props.back ? 0 : 20)};
  font-size: ${props => (!props.back ? 15 : 18)};
`

export const FilterWrapper = styled.TouchableOpacity`
  width: 38;
  height: 38;
  border-radius: 19;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.gray_6};
  border-style: solid;
  border-width: 1;
  border-color: ${props => props.theme.colors.gray_5};
`
export const ModalWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.dark};
  align-items: center;
  justify-content: center;
  padding-top: ${Constants.layout.navPadding};
`

export const FImage = styled(Image)`
  width: 20;
  height: 20;
`
