import { pathOr, construct, assocPath } from 'ramda'

function wikis(record) {
  return {
    edges: pathOr([], ['v1WikiIndex', 'edges'], record),
    meta: pathOr([], ['v1WikiIndex', 'meta'], record)
  }
}
function smartWikis(record) {
  return {
    edges: pathOr([], ['v1WikiSmart', 'edges'], record),
    meta: pathOr([], ['v1WikiSmart', 'meta'], record)
  }
}
function guidles(record) {
  return {
    edges: pathOr([], ['v1GuideIndex', 'edges'], record),
    meta: pathOr([], ['v1GuideIndex', 'meta'], record)
  }
}

function Wiki(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.kinds = pathOr([], ['v1KindIndex', 'edges'], record)
  this.wikis = wikis(record)
  this.smartWikis = smartWikis(record)
  this.wikiInfo = pathOr({}, ['v1WikiDetail'], record)
  this.wikiGallery = pathOr([], ['v1ImageIndex', 'edges'], record)
  this.historical = pathOr({}, ['v1WikiDetail'], record)
  this.guidles = guidles(record)
}

Wiki.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  getKinds: function() {
    return pathOr([], ['kinds', 'edges'], this)
  },
  getBreeds: function() {
    return pathOr([], ['breeds', 'edges'], this)
  }
}

export default construct(Wiki)
