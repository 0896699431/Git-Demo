import React from 'react'
import { compose } from 'ramda'
import { ComposingForm } from '../../private-components'
import { withMutation, withTheme, withTranslation } from 'hocs'
import { useRoute } from '@react-navigation/native'
import * as MUTATION from '../../Article/mutation'
import GateWay from 'utils/GateWay'
import { Wrapper } from './styled'

function Create(props) {
  const { mutate, isCompleted, isErrored, translate, loading } = props

  const route = useRoute()
  const forumTypes = route.params.forumType
  const forumCategories = route.params.forumCategories

  function onCreate(body) {
    mutate(body)
  }

  return (
    <Wrapper>
      <ComposingForm
        forumTypes={forumTypes}
        forumCategories={forumCategories}
        onCreateArticle={onCreate}
        title={translate('newArticle')}
        isCompleted={isCompleted}
        isErrored={isErrored}
        forumTypeCode={''}
        forumTypeImage={''}
        nameForum={translate('chooseForum')}
        categoryCode={''}
        categoryImage={''}
        nameCategory={translate('chooseCate')}
        articleContent={''}
        titleArticle={''}
        loading={loading}
      />
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withMutation({
    mutation: MUTATION.createArticle,
    service: GateWay.ARTICLE_SERVICE
  })
)(Create)
