import gql from 'graphql-tag'
export const createArticle = gql`
  mutation v1CreateArticle(
    $title: String!
    $thumb_url: String!
    $content: String!
    $forum_id: ID!
    $category_id: ID!
  ) {
    v1CreateArticle(
      title: $title
      thumb_url: $thumb_url
      content: $content
      forum_id: $forum_id
      category_id: $category_id
    ) {
      title
      thumb_url
      content
      forum_id
      category_id
    }
  }
`

export const updateArticle = gql`
  mutation v1UpdateArticle(
    $title: String
    $content: String
    $forum_id: ID
    $category_id: ID
    $thumb_url: String
    $id: ID
  ) {
    v1UpdateArticle(
      title: $title
      content: $content
      forum_id: $forum_id
      category_id: $category_id
      thumb_url: $thumb_url
      id: $id
    ) {
      title
      thumb_url
      content
      forum_id
      category_id
      id
    }
  }
`

export const v1DeleteArticle = gql`
  mutation v1DeleteArticle($id: ID!) {
    v1DeleteArticle(id: $id) {
      id
      status
    }
  }
`

/*
  votable_id: ArticleID, postID, commentID
  votable_type: Post or Article or Comment
*/
export const v1UpdateVote = gql`
  mutation($votable_id: ID, $votable_type: String) {
    v1Like(votable_id: $votable_id, votable_type: $votable_type) {
      votable_id
      votable_type
      votable {
        is_reacted
        reacted_total
      }
    }
  }
`

/*
  favoritable_id: ArticleID, postID, commentID
  favoritable_type: Post or Article or Comment
*/
export const v1UpdateFavorite = gql`
  mutation($favoritable_id: ID, $favoritable_type: String) {
    v1Favorite(
      favoritable_id: $favoritable_id
      favoritable_type: $favoritable_type
    ) {
      favoritable_id
      favoritable_type
      favoritable {
        is_reacted
        reacted_total
      }
    }
  }
`

export const v1CreateComment = gql`
  mutation(
    $title: String!
    $comment: String!
    $commentable_id: ID!
    $commentable_type: String!
  ) {
    v1CreateComment(
      title: $title
      comment: $comment
      commentable_id: $commentable_id
      commentable_type: $commentable_type
    ) {
      id
      title
      comment
      commentable_type
      user {
        name
      }
    }
  }
`
export const v1DeleteComment = gql`
  mutation($id: ID!) {
    v1DeleteComment(id: $id) {
      id
      commentable_id
      commentable_type
    }
  }
`

export const v1UpdateComment = gql`
  mutation($id: ID!, $title: String!, $comment: String!) {
    v1UpdateComment(id: $id, title: $title, comment: $comment) {
      id
      comment
      title
    }
  }
`
