import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Fonts } from 'utils'
import { NeoView } from 'components'

const WIDTH = 68

export const BookingWrapper = styled(NeoView)`
  padding-horizontal: 15;
  margin-top: 25;
  border-radius: 15;
`

export const DumbView = styled.View`
  flex-direction: row;
  align-items: center;
`

export const VetHeadWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 10;
  padding-top: 10;
`

export const StoreImg = styled(FastImage)`
  width: ${WIDTH};
  height: ${WIDTH};
  border-radius: 8;
`
export const StoreInfoWrapper = styled.View`
  margin-left: 10;
`

export const StoreName = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: 600;
  color: ${props => props.theme.colors.gray_1};
`

export const TimeText = styled.Text`
  ${Fonts.body_2};
  color: ${props => props.theme.colors.gray_2};
  margin-top: 5;
`
