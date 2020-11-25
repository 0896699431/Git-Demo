import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.ui_3D_background};
`
export const Text = styled.Text``

export const ArticleList = styled.FlatList`
  margin-bottom: 50;
`

export const ArticleCard = styled(NeoView)`
  padding-top: 10;
  padding-bottom: 5;
  padding-left: 10;
  padding-horizontal: ${props => (props.isTrend ? 10 : 0)};
  margin-left: 15;
  margin-right: 15;
  margin-bottom: 10;
  margin-top: 20;
  border-radius: 10;
`
export const ArticleHeadWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const ArticleAuthorWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const WIDTH = 40
const HEIGHT = 40

export const ForumImageTypeWrapper = styled.View`
  width: ${WIDTH};
  height: ${HEIGHT};
  border-radius: ${WIDTH / 2};
  background-color: ${props => props.theme.colors.gray_6};
  justify-content: center;
  align-items: center;
`

export const ForumImageType = styled(Image)`
  width: 28;
  height: 28;
`

export const ArticleBody = styled.TouchableOpacity`
  display: flex;
  flex-direction: ${props => (props.notTrend ? 'row' : 'column')};
  justify-content: ${props => (props.notTrend ? 'space-between' : 'center')};
`

export const ArticleWrapper = styled.View`
  justify-content: space-between;
`

export const ArticleThumbWrapper = styled.View`
  width: ${props => (props.isTrend ? '100%' : 100)};
  height: ${props => (props.isTrend ? 200 : 100)};
  flex-direction: row;
  align-items: stretch;
  margin-top: ${props => (props.isTrend ? 15 : 5)};
  margin-bottom: ${props => (!props.isTrend ? 10 : 0)};
`

export const ArticleThumb = styled(Image)`
  border-radius: 5;
`
export const ArticleTitle = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: 600;
  font-size: 16;
  color: ${props => props.theme.colors.gray_1};
  margin-top: 20;
  margin-right: 5;
`

export const Separator = styled.View`
  border-style: solid;
  border-bottom-color: ${props => props.theme.colors.gray_5};
  border-bottom-width: 0.5;
`

export const ReactionWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => (props.status === 'trend' ? 3 : 10)};
  margin-top: ${props => (props.status === 'trend' ? 15 : 10)};
`

export const VoteTotal = styled.Text`
  font-size: 16;
  margin-left: 5;
  color: ${props => props.theme.colors.gray_3};
  margin-bottom: 5;
`

export const VoteWrapper = styled.View`
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const CustomStyle = StyleSheet.create({
  articleThumb: {
    flex: 1,
    width: null,
    height: null
  },
  shareIcon: {
    marginLeft: 16
  },
  commentNum: {
    marginTop: 1
  },
  flatList: {
    marginBottom: 40
  },
  imageNoneTrend: {
    width: 80,
    height: 80,
    borderRadius: 10
  }
})
