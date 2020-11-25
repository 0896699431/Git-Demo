import {
  orNull,
  orEmpty,
  orArray,
  updateObject,
  construct
} from 'utils/Selector'

function standard(record) {
  return {
    id: orNull('data.id', record),
    type: orNull('data.type', record),
    attributes: {
      created_at: orNull('data.attributes.created_at', record),
      updated_at: orNull('data.attributes.updated_at', record),
      id: orNull('data.attributes.id', record),
      name: orNull('data.attributes.name', record),
      description: orNull('data.attributes.description', record),
      user: {
        name: orNull('data.attributes.user.name', record)
      },
      resolutions: [
        {
          id: orNull('data.attributes.resolutions', 0, 'id', record),
          quality: orNull('data.attributes.resolutions', 0, 'quality', record),
          url: orEmpty('data.attributes.resolutions', 0, 'url', record),
          width: orEmpty('data.attributes.resolutions', 0, 'width', record),
          height: orEmpty('data.attributes.resolutions', 0, 'height', record)
        }
      ]
    }
  }
}

function Media(record) {
  this.data = standard(record)
}

Media.prototype = {
  setMedia: function(value) {
    return updateObject('data', standard(value), this)
  },
  getMedia: function() {
    return standard(this)
  },
  firstResolutionUrl: function() {
    return standard(this).attributes.resolutions[0].url
  },
  getId: function() {
    return orEmpty('data.attributes.id', this)
  },
  getResolutionId: function(index) {
    return orEmpty('data.attributes', 'resolutions', index, 'id', this)
  },
  getOptimizedUrl: function() {
    return orEmpty('data.attributes.resolutions', 0, 'url', this)
  },
  getResolutions: function() {
    return orArray('data.attributes.resolutions', this)
  }
}

export default construct(Media)
