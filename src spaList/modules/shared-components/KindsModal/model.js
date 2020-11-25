import { pathOr, construct } from 'ramda'

function Kind(record) {
  this.kinds = pathOr([], ['v1KindIndex', 'edges'], record)
}

Kind.prototype = {
  getKinds: function() {
    return pathOr([], ['kinds', 'edges'], this)
  }
}

export default construct(Kind)
