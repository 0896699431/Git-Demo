import styled from 'styled-components/native'
import { Constants } from 'utils'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
`

export const Text = styled.Text`
  color: ${props => props.theme.colors.gray_1};
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.115;
  text-align: center;
`

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  padding-right: 15;
  padding-bottom: 10;
  padding-left: 5;
  margin-top: ${props => (!props.fromNotiRep ? 10 : 40)};
  border-style: solid;
  border-bottom-width: 0.5;
  border-bottom-color: ${props => props.theme.colors.gray_5};
`

export const NodataWrapper = styled.View`
  align-items: center;
`
export const NodataThumb = styled(FastImage)`
  width: ${Constants.layout.screenWidth};
  height: ${Constants.layout.screenWidth / 2};
  margin-top: 30;
`
export const DumbingView = styled.View``
