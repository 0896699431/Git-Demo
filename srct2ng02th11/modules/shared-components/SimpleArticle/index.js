import React from 'react'
import { withTheme } from 'hocs'
import { useNavigation } from '@react-navigation/native'
import {
  ArticleItem,
  ThumbWrapper,
  ArticleInfo,
  ArticleItemTitle,
  CustomStyle,
  ArticleReport,
  ReportLabel
} from './styled'
import { Image } from 'components'
import Icons from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Ionicons'
import Routes from 'utils/Routes'
import { orEmpty, orNull, orNumber } from 'utils/Selector'

const SimpleArticle = ({ article, theme }) => {
  const { colors } = theme
  const navigation = useNavigation()

  function goToArticle(item) {
    const id = orNull('id', item)

    if (id) navigation.navigate(Routes.articleDetail, { articleId: id })
  }

  return (
    <ArticleItem shadowType={2} onPress={() => goToArticle(article)}>
      <ThumbWrapper shadowType={2}>
        <Image
          source={{ uri: orEmpty('thumb_url', article) }}
          style={CustomStyle.mediaThumb}
        />
      </ThumbWrapper>
      <ArticleInfo>
        <ArticleItemTitle>{orEmpty('title', article)}</ArticleItemTitle>
        <ArticleReport>
          <Icon
            name={orEmpty('is_liked', article) ? 'md-heart' : 'md-heart-empty'}
            color={orEmpty('is_liked', article) ? colors.red : colors.gray_3}
            size={18}
          />
          <ReportLabel>{orNumber('cached_votes_total', article)}</ReportLabel>
          <Icons name='message-circle' size={16} color={colors.gray_3} />
          <ReportLabel>{orNumber('comments_count', article)}</ReportLabel>
        </ArticleReport>
      </ArticleInfo>
    </ArticleItem>
  )
}

export default withTheme(SimpleArticle)
