import React from 'react'
import { withTheme } from 'hocs'

import {
  ArticleAuthorWrapper,
  AuthorAvatar,
  AuthorWrapper,
  AuthorName,
  TimeWrite
} from './styled'

function TextImage(props) {
  const { avatarUrl, name, createdInWord, onPress, imgStyle } = props

  return (
    <ArticleAuthorWrapper onPress={onPress}>
      <AuthorAvatar source={{ uri: avatarUrl }} style={imgStyle} />
      <AuthorWrapper>
        <AuthorName lowercase>{name}</AuthorName>
        <TimeWrite>{createdInWord}</TimeWrite>
      </AuthorWrapper>
    </ArticleAuthorWrapper>
  )
}

export default withTheme(TextImage)
