import React, { useEffect } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  HeaderWrapper,
  Title,
  ArticlesWrapper,
  ItemWrapper,
  // SeeMore,
  // SeeMoreLabel,
  LeftColumn,
  UserInfo,
  Avatar,
  UserName,
  ArticleTitle,
  Thumb
} from './styled'
import { withTheme, withTranslation, withLazyQuery } from 'hocs'
import { Constants, Routes } from 'utils'
// import Icons from 'react-native-vector-icons/Ionicons'

import * as QUERY from './query'
import Model from './model'
import { GateWay } from 'utils'
import { orEmpty, orNull } from 'utils/Selector'

import { useNavigation } from '@react-navigation/native'

const SCREEN_WIDTH = Constants.layout.screenWidth

function ArticleSuggestion({
  data,
  // theme,
  // onPress,
  title,
  translate,
  setVariables
}) {
  const record = Model(data)
  const { listArticle } = record
  const navigation = useNavigation()
  // const { colors } = theme

  useEffect(() => {
    setVariables({
      variables: {
        filter: {},
        per_page: 5
      }
    })
  }, [])

  function renderArticle({ item }) {
    const thumb = orEmpty('node.thumb_url', item)
    const title = orEmpty('node.title', item)
    const avatar = orEmpty('node.user.avatar_url', item)
    const name = orEmpty('node.user.name', item)
    return (
      <ItemWrapper
        shadowType={2}
        onPress={() =>
          navigation.navigate(Routes.articleDetail, {
            articleId: orNull('node.id', item)
          })
        }
      >
        <LeftColumn>
          <UserInfo>
            <Avatar
              source={{
                uri: avatar
              }}
            />
            <UserName>{name}</UserName>
          </UserInfo>
          <ArticleTitle>{title}</ArticleTitle>
        </LeftColumn>

        <Thumb
          source={{
            uri: thumb
          }}
        />
      </ItemWrapper>
    )
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>{title || translate('relateArticle')}</Title>
        {/* <SeeMore onPress={onPress}>
          <SeeMoreLabel>{translate('readMore')}</SeeMoreLabel>
          <Icons name={'ios-arrow-forward'} size={16} color={colors.red} />
        </SeeMore> */}
      </HeaderWrapper>
      <ArticlesWrapper
        data={listArticle}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderArticle}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 60}
        inactiveSlideOpacity={0.8}
      />
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.v1ArticleIndex,
    service: GateWay.ARTICLE_SERVICE
  })
)(ArticleSuggestion)
