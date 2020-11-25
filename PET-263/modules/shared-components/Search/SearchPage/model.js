import { pathOr, construct, assocPath } from 'ramda'

function search (record) {
  return {
    edges: pathOr([], ['v1ArticleIndex', 'edges'], record),
    meta: pathOr([], ['v1ArticleIndex', 'meta'], record)
  }
}

function Searching (record) {
  this.searchResult = search(record)
}

Searching.prototype = {
  resetSearch: function (value) {
    return assocPath(['searchResult'], value, this)
  }
}

export default construct(Searching)
