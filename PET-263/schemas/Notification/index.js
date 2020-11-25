import { orNull, orEmpty, updateString, construct } from 'utils/Selector'

function standard(record) {
  return {
    attributes: {
      id: orNull('data.attributes.id', record),
      title: orNull('data.attributes.title', record),
      message: orNull('data.attributes.message', record),
      data: orNull('data.attributes.data', record),
      status: orNull('data.attributes.status', record),
      created_in_word: orNull('data.attributes.created_in_word', record)
    }
  }
}

function Notification(record) {
  this.data = standard(record)
}

Notification.prototype = {
  setStatus: function(value) {
    return updateString('data.attributes.status', value, this)
  },
  getAttributes: function() {
    const attributes = {
      id: orEmpty('data.attributes.id', this),
      title: orEmpty('data.attributes.title', this),
      message: orEmpty('data.attributes.message', this),
      data: orEmpty('data.attributes.data', this),
      status: orEmpty('data.attributes.status', this),
      created_in_word: orEmpty('data.attributes.created_in_word', this)
    }
    return attributes
  }
}

export default construct(Notification)
