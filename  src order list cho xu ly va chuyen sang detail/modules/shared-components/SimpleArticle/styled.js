import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView } from 'components'

export const ArticleItem = styled(NeoView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 20;
  padding-vertical: 30;
  padding-horizontal: 15;
  margin-top: 10;
  margin-bottom: 15;
  border-radius: 15;
`
export const ArticleInfo = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10;
`
export const ArticleItemTitle = styled.Text`
  flex: 1;
  ${Fonts.subTitle_1};
  ${props => props.theme.shadows.ui_3D_text_shadow};
  color: ${props => props.theme.colors.gray_2};
`
export const ArticleReport = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8;
`
export const ReportLabel = styled.Text`
  ${Fonts.subTitle_2};
  color: ${props => props.theme.colors.gray_3};
  margin-right: 22;
  margin-left: 4;
`
export const View = styled.View``

export const ThumbWrapper = styled(NeoView)`
  width: 60;
  height: 60;
  border-radius: 30;
`
export const CustomStyle = StyleSheet.create({
  mediaThumb: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover'
  }
})
