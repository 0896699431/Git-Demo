import React from 'react'
import { connect } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { compose } from 'ramda'

import { withTheme, withTranslation } from 'hocs'
import CommentList from './List'

import { Wrapper, BodyWrapper } from './styled'
import { ModalHeader } from 'components'
import { orNull } from 'utils/Selector'

function Comment({ translate }) {
  const route = useRoute()

  const articleId = orNull('params.id', route)
  const originComment = orNull('params.originComment', route)
  const isCommentNoti = orNull('params.isCommentNoti', route)
  const isReplyNoti = orNull('params.isReplyNoti', route)

  return (
    <Wrapper>
      <ModalHeader title={translate('comment')} back />
      <BodyWrapper>
        <CommentList
          articleId={articleId}
          isCommentNoti={isCommentNoti}
          originComment={originComment}
          isReplyNoti={isReplyNoti}
        />
      </BodyWrapper>
    </Wrapper>
  )
}
const mapStateToProps = state => ({
  auth: state.authen,
  forum: state.forum
})

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withTheme,
  withTranslation
)(Comment)
