import React from 'react'
import { compose } from 'ramda'
import { ComposingForm } from '../../private-components'
import { withMutation, withTheme, withTranslation } from 'hocs'
import { useRoute } from '@react-navigation/native'
import * as MUTATION from '../../Article/mutation'
import GateWay from 'utils/GateWay'
import { Wrapper } from './styled'
import { orArray, orEmpty, orNull } from 'utils/Selector'

function Edit(props) {
  const { mutate, isCompleted, isErrored, translate } = props
  const route = useRoute()
  const forumTypes = orArray('params.forumType', route)
  const forumCategories = orArray('params.forumCategories', route)
  const refetch = orNull('params.refetch', route)

  function onEdit(body) {
    mutate(body)
  }

  return (
    <Wrapper>
      <ComposingForm
        forumTypes={forumTypes}
        forumCategories={forumCategories}
        onEditArticle={onEdit}
        title={translate('editArticle')}
        isCompleted={isCompleted}
        isErrored={isErrored}
        isEdit
        articleId={orEmpty('params.articleDetail.id', route)}
        forumTypeCode={orNull('params.articleDetail.forum.id', route)}
        forumTypeImage={orEmpty('params.articleDetail.forum.image_url', route)}
        nameForum={orEmpty('params.articleDetail.forum.name', route)}
        categoryCode={orNull('params.articleDetail.category.id', route)}
        categoryImage={orEmpty(
          'params.articleDetail.category.image_url',
          route
        )}
        nameCategory={orEmpty('params.articleDetail.category.name', route)}
        articleContent={orEmpty('params.content', route)}
        titleArticle={orEmpty('params.articleDetail.title', route)}
        refetch={refetch}
      />
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withMutation({
    mutation: MUTATION.updateArticle,
    service: GateWay.ARTICLE_SERVICE
  })
)(Edit)
