import {
  orNull,
  orEmpty,
  updateString,
  orBoolean,
  updateBoolean,
  orArray,
  updateObject,
  construct
} from 'utils/Selector'
import Media from '../Media'

function standard(record) {
  return {
    id: orNull('data.id', record),
    type: orNull('data.type', record),
    attributes: {
      id: orNull('data.attributes.id', record),
      created_in_word: orNull('data.attributes.created_in_word', record),
      state: orNull('data.attributes.state', record),
      status: orNull('data.attributes.status', record),
      is_liked: orNull('data.attributes.is_liked', record),
      media: orNull('data.attributes.media', record),
      user: orNull('data.attributes.user', record)
    }
  }
}

function Post(record) {
  this.data = standard(record)
}

Post.prototype = {
  setPost: function(value) {
    return updateObject('data', standard(value), this)
  },
  getPost: function() {
    return standard(this)
  },
  setMedia: function(value) {
    return updateString('data.attributes.media', value, this)
  },
  setStatus: function(value) {
    return updateString('data.attributes.status', value, this)
  },
  setLoading: function(value) {
    return updateBoolean('isLoading', value, this)
  },
  isValid: function() {
    const status = orNull('data.attributes.status', this)
    return status
  },
  getAttributes: function() {
    const id = orNull('data.attributes.id', this)
    const attributes = {
      created_in_word: orNull('data.attributes.created_in_word', this),
      state: orNull('data.attributes.state', this),
      status: orNull('data.attributes.status', this),
      is_liked: orNull('data.attributes.is_liked', this),
      media: orArray('data.attributes.media', this),
      user: orNull('data.attributes.user', this)
    }

    if (id) attributes['id'] = id

    return attributes
  },
  getLoading: function() {
    return orBoolean('isLoading', this)
  },
  getMedia: function() {
    return orArray('data.attributes.media', this)
  },
  getMediaId: function() {
    return Media(this.media).getId()
  },
  getImageUrl: function() {
    return orNull('data.attributes.media', this)
  },
  getStatus: function() {
    return orEmpty('data.attributes.status', this)
  },
  getId: function() {
    return orNull('data.attributes.id', this)
  },
  getAuthorAvatar: function() {
    return orEmpty('data.attributes.user.avatar_url', this)
  },
  getAuthorName: function() {
    return orEmpty('data.attributes.user.name', this)
  },
  getCreatedAt: function() {
    return orEmpty('data.attributes.created_in_word', this)
  },
  getAuthorId: function() {
    return orEmpty('data.attributes.created_in_word', this)
  }
}

export default construct(Post)
