import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import { orEmpty, orNull } from 'utils/Selector'

import GateWay from 'utils/GateWay'
import * as QUERY from '../../query'
import Model from '../../model'
import { withTheme, withLazyQuery, withTranslation } from 'hocs'
import {
  Wrapper,
  NewsWrapper,
  Header,
  Title,
  SeeMore,
  SeeMoreLabel,
  ThumbWrapper,
  CategoryWrapper,
  ForumLogoWrapper,
  NewsName,
  CustomStyle,
  // DateTime,
  ForumImage,
  CategoryName,
  LoadingWrapper
} from './styled'
import Carousel from 'react-native-snap-carousel'
import Icons from 'react-native-vector-icons/Ionicons'
import { Constants, Routes, Storage } from 'utils'
import { useNavigation } from '@react-navigation/native'
const SCREEN_WIDTH = Constants.layout.screenWidth
const STORAGE_TOP_ARTICLE_KEY = 'home_top_article_keyStorage'

function News(props) {
  const {
    theme,
    data,
    loading,
    setVariables,
    refetch,
    isRefresh,
    translate
  } = props
  const record = Model(data)
  const { news } = record
  const { colors } = theme
  const navigation = useNavigation()
  const [listNews, setListNews] = useState([])

  useEffect(() => {
    getListNews()
  }, [])

  useEffect(() => {
    if (isRefresh) {
      if (refetch) refetch(queryNews)
      else setVariables(queryNews)
    }
  }, [isRefresh])

  useEffect(() => {
    if (news && news.length) {
      setListNews(news)

      Storage.setWithExpired(STORAGE_TOP_ARTICLE_KEY, news, 1 * 360 * 1000)
    }
  }, [news])

  async function getListNews() {
    const storageData = await Storage.getWithExpired(STORAGE_TOP_ARTICLE_KEY)

    if (storageData) {
      return setListNews(storageData)
    }

    setVariables(queryNews)
  }

  function queryNews() {
    return {
      variables: {
        filter: {
          status_eq: 'trend',
          state_not_eq: 'denied'
        },
        per_page: 5
      }
    }
  }

  function renderNewsCard({ item }) {
    return (
      <NewsWrapper
        shadowType={1}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(Routes.articleDetail, {
            articleId: orNull('node.id', item)
          })
        }
      >
        <ThumbWrapper
          source={{
            uri: orEmpty('node.thumb_url', item)
          }}
        />
        <CategoryWrapper>
          <ForumLogoWrapper>
            <ForumImage
              source={{
                uri: orEmpty('node.forum.image_url', item)
              }}
              style={CustomStyle.storeLogo}
            />
          </ForumLogoWrapper>
          <CategoryName>{orEmpty('node.category.name', item)}</CategoryName>
        </CategoryWrapper>
        <NewsName>{orEmpty('node.title', item)}</NewsName>
        {/* <DateTime>{orEmpty('node.created_in_word', item)}</DateTime> */}
      </NewsWrapper>
    )
  }

  function renderLoading() {
    return <LoadingWrapper />
  }

  return (
    <Wrapper>
      <Header>
        <Title>{translate('promArticle')}</Title>
        <SeeMore onPress={() => navigation.navigate(Routes.forum)}>
          <SeeMoreLabel>{translate('readMore')}</SeeMoreLabel>
          <Icons name={'ios-arrow-forward'} size={16} color={colors.red} />
        </SeeMore>
      </Header>
      {loading ? (
        renderLoading()
      ) : (
        <Carousel
          data={listNews}
          renderItem={renderNewsCard}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH - 60}
          inactiveSlideOpacity={Constants.isIOS ? 0.4 : 1}
        />
      )}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1ArticleIndex,
    service: GateWay.ARTICLE_SERVICE,
    hideLoading: true
  })
)(News)
