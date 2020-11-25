import { orNull, orEmpty, construct } from 'utils/Selector'

function standard(record) {
  return {
    id: orNull('data.id', record),
    type: orNull('data.type', record),
    attributes: {
      created_at: orNull('data.attributes.created_at', record),
      updated_at: orNull('data.attributes.updated_at', record),
      id: orNull('data.attributes.id', record),
      name: orNull('data.attributes.name', record),
      quality: orNull('data.attributes.quality', record),
      url: orEmpty('data.attributes.resolutions.url', record),
      width: orEmpty('data.attributes.resolutions.width', record),
      height: orEmpty('data.attributes.resolutions.height', record)
    }
  }
}

function Resolution(record) {
  this.data = standard(record)
}

Resolution.prototype = {
  getId: function() {
    return orEmpty('data.attributes.id', this)
  },
  getUrl: function() {
    return orEmpty('data.attributes.resolutions.url', this)
  }
}

export default construct(Resolution)
