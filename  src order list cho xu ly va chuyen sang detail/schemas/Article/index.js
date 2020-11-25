import {
  orNull,
  orEmpty,
  updateString,
  updateBoolean,
  construct
} from 'utils/Selector'

function standard(record) {
  return {
    attributes: {
      id: orNull('data.attributes.id', record),
      created_at: orNull('data.attributes.created_at', record),
      is_liked: orNull('data.attributes.is_liked', record),
      updated_at: orNull('data.attributes.updated_at', record),
      forum_id: orNull('data.attributes.forum_id', record),
      category_id: orNull('data.attributes.category_id', record),
      content: orEmpty('data.attributes.content', record),
      title: orEmpty('data.attributes.title', record),
      created_in_word: orEmpty('data.attributes.created_in_word', record),
      user: {
        id: orEmpty('data.attributes.user.id', record),
        name: orEmpty('data.attributes.user.name', record),
        avatar_url: orEmpty('data.attributes.user.avatar_url', record)
      },
      thumb_url: orEmpty('data.attributes.thumb_url', record),
      forum: {
        name: orEmpty('data.attributes.forum.name', record),
        id: orEmpty('data.attributes.forum.id', record),
        image_url: orEmpty('data.attributes.forum.image_url', record)
      },
      category: {
        name: orEmpty('data.attributes.category.name', record)
      },
      comments_count: orEmpty('data.attributes.comments_count', record),
      comments_total: orEmpty('data.attributes.comments_total', record),
      cached_votes_total: orEmpty('data.attributes.cached_votes_total', record),
      slug: orEmpty('data.attributes.slug', record)
    }
  }
}

function Article(record) {
  this.data = standard(record)
}

Article.prototype = {
  setContent: function(value) {
    return updateString('data.attributes.content', value, this)
  },
  getContent: function() {
    return orEmpty('data.attributes.is_liked', this)
  },
  getArticleId: function() {
    return orEmpty('data.attributes.id', this)
  },
  setForum: function(value) {
    return updateString('data.attributes.forum_id', value, this)
  },
  setVote: function(value) {
    return updateBoolean('data.attributes.is_liked', value, this)
  },
  setCategory: function(value) {
    return updateString('data.attributes.category_id', value, this)
  },

  getAttributes: function() {
    const id = orNull('data.attributes.id', this)

    const attributes = {
      title: orEmpty('data.attributes.title', this),
      is_liked: orEmpty('data.attributes.is_liked', this),
      forum_id: orEmpty('data.attributes.forum_id', this),
      category_id: orEmpty('data.attributes.category_id', this),
      thumb_url: orEmpty('data.attributes.thumb_url', this),
      comments_count: orEmpty('data.attributes.comments_count', this),
      comments_total: orEmpty('data.attributes.comments_total', this),
      cached_votes_total: orEmpty('data.attributes.cached_votes_total', this),
      created_at: orEmpty('data.attributes.created_at', this),
      slug: orEmpty('data.attributes.slug', this)
    }

    if (id) {
      attributes['id'] = id
    }

    return attributes
  }
}

export default construct(Article)
