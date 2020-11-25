import styled from 'styled-components/native'
import { PlaceholderLoading } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  padding: 30px;
`
export const ItemWrapper = styled.View`
  margin-bottom: 30;
`
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8;
`

export const ListAvatar = styled(PlaceholderLoading)`
  width: 30;
  height: 30;
  border-radius: 15;
  margin-right: 10;
`
export const TextWrapper = styled(PlaceholderLoading)`
  width: ${props => (props.width ? props.width : '90%')};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)};
  height: 20;
  border-radius: 4;
`
export const ContentLoadingWrapper = styled.View`
  flex: 1;
  margin-top: 60;
`
export const ContentAvatar = styled(PlaceholderLoading)`
  width: 60;
  height: 60;
  border-radius: 30;
  margin-bottom: 20;
`
export const Thumb = styled(PlaceholderLoading)`
  width: 60;
  height: 60;
  border-radius: 10;
  margin-right: 10;
`
export const Column = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export const Line = styled.View`
  height: 0.4;
  background-color: ${props => props.theme.colors.gray_5};
  margin-vertical: 30;
`
export const CenterWrapper = styled.View`
  align-items: center;
`
