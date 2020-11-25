import gql from 'graphql-tag'
export const v1ArticleListIndex = gql`
  query v1ArticleIndex($filter: Filter!, $page: Int) {
    v1ArticleIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          forum_id
          title
          slug
          status
          is_liked
          cached_votes_total
          comments_total
          comments_count
          created_in_word
          thumb_url
          favoritable_score
          favoritable_total
          user {
            id
            name
            avatar_url
          }
          forum {
            id
            name
            image_url
          }
        }
      }
      meta {
        prev_page
        current_page
        next_page
        total_pages
        total_count
      }
    }
  }
`
export const v1ArticleDetail = gql`
  query($id: ID!) {
    v1ArticleDetail(id: $id) {
      content
      is_liked
      is_favorited
      id
      status
      title
      slug
      thumb_url
      created_in_word
      comments_total
      user {
        id
        avatar_url
        name
      }
      forum {
        id
        name
        image_url
      }
      category {
        id
        name
        image_url
      }
      # comments {
      #   # is_liked
      #   votes {
      #     id
      #   }
      #   user {
      #     id
      #   }
      #   id
      #   title
      #   comment
      # }
    }
  }
`
export const v1CommentIndex = gql`
  query($page: Int, $filter: Filter) {
    v1CommentIndex(page: $page, filter: $filter) {
      edges {
        node {
          id
          title
          comment
          commentable_type
          commentable_id
          created_in_word
          comments_count
          cached_votes_total
          user {
            id
            avatar_url
            name
          }
          votes {
            id
            user {
              id
            }
          }
          is_liked
          comments {
            id
            comment
            created_in_word
            commentable_id
            comments_count
            cached_votes_total
            is_liked
            user {
              id
              avatar_url
              name
            }
          }
        }
      }
      meta {
        prev_page
        next_page
        total_pages
        total_count
      }
    }
  }
`
