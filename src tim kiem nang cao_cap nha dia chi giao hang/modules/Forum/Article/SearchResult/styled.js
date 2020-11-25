import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from 'utils'
import { NeoView, Image } from 'components'

export const Wrapper = styled.View`
  flex: 1;
`

export const FlatList = styled.FlatList`
  flex: 1;
  padding-bottom: 50;
`

export const ArticleCard = styled(NeoView)`
  padding-top: 10;
  padding-left: 15;
  padding-right: 10;
  padding-horizontal: 0;
  margin-left: 10;
  margin-right: 10;
  margin-vertical: 20;
  border-radius: 10;
`

export const ArticleBody = styled.TouchableOpacity`
  display: flex;
  flex-direction: ${props => (props.notTrend ? 'row' : 'column')};
  justify-content: ${props => (props.notTrend ? 'space-between' : 'center')};
  margin-top: 10;
`
export const ArticleWrapper = styled.View`
  justify-content: space-between;
`

export const ArticleTitle = styled.Text`
  ${Fonts.subTitle_1};
  font-weight: 600;
  color: ${props => props.theme.colors.gray_1};
  margin-top: 5;
  padding-bottom: 10;
  line-height: 25;
  width: 80%;
`

export const ArticleThumbWrapper = styled.View`
  width: ${props => (props.isTrend ? '100%' : 100)};
  height: ${props => (props.isTrend ? 200 : 100)};
  margin-top: ${props => (props.isTrend ? 15 : 5)};
`

export const ArticleThumb = styled(Image)`
  /* border-radius: 5; */
  margin-right: 10;
  margin-bottom: 20;
`

export const Text = styled.Text``

export const CustomStyle = StyleSheet.create({
  imageNoneTrend: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  footer: {
    marginBottom: 40,
    marginTop: 10
  }
})

export const ArticleHeadWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
