import styled from 'styled-components/native'
import { isIphoneX, isIphoneXsMax } from 'utils/Constants'

export const Wrapper = styled.View`
  flex: 1;
`
export const DumbRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const HeaderWrapper = styled.View`
  position: absolute;
  top: ${isIphoneX() || isIphoneXsMax() ? 40 : 30};
  left: 15;
  right: 15;
  z-index: 99999;
`

export const HeaderButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.black_transparent_1};
  width: 40;
  height: 40;
  border-radius: 8;
  justify-content: center;
  align-items: center;
`

export const LocationWrapper = styled.View`
  background-color: transparent;
  z-index: 9999999;
`

export const ModalContailer = styled.View`
  flex: 1;
  justify-content: center;
`

export const LocationBtn = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.white};
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  border-radius: 5;
  /* position: absolute;
  top: 40;
  right: 20; */
`
export const Text = styled.Text``

export const DistanceText = styled.Text`
  font-size: 15;
  font-weight: 600;
  color: ${props => props.theme.colors.gray_1};
  text-align: center;
  margin-top: ${isIphoneX() || isIphoneXsMax() ? -30 : -15};
`
export const TravelContainer = styled.View`
  margin-top: 10;
`

export const TravelWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10;
  padding-horizontal: 15;
  padding-vertical: 5;
  background-color: ${props =>
    props.hightLight
      ? props.theme.colors.blue_primary
      : props.theme.colors.gray_11};
`
export const TravelMethodWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const TravelMethod = styled.Text`
  font-size: 16;
  font-weight: 600;
  color: ${props =>
    props.hightLight ? props.theme.colors.gray_11 : props.theme.colors.gray_1};
  text-align: center;
  margin-left: 10;
`

export const MapBtnWrapper = styled.TouchableOpacity`
  width: 120;
  height: 40;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-color: ${props => props.theme.colors.blue_primary};
  border-width: 1;
  border-radius: 8;
`

export const MapBtn = styled.Text`
  color: ${props => props.theme.colors.gray_1};
`
