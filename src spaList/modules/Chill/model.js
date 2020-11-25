import { pathOr, construct, assocPath, path, concat } from 'ramda'

function posts (record) {
  return {
    edges: pathOr([], ['v1PostIndex', 'edges'], record),
    meta: pathOr([], ['v1PostIndex', 'meta'], record)
  }
}

function Chill (record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.posts = posts(record)
}

Chill.prototype = {
  setLoading: function (value) {
    return assocPath(['isLoading'], value, this)
  },
  getPosts: function () {
    return pathOr([], ['posts', 'edges'], this)
  },
  getMeta: function () {
    return pathOr([], ['posts', 'meta'], this)
  },
  getDefaultPostId: function () {
    return pathOr(null, ['posts', 'edges', 0, 'node', 'id'], this)
  },
  getIdByIndex: function (index) {
    return pathOr(null, ['posts', 'edges', index, 'node', 'id'], this)
  },
  append: function (value) {
    const nPosts = pathOr([], ['v1PostIndex', 'edges'], value)
    const oPosts = pathOr([], ['posts', 'edges'], this)
    const mPosts = concat(oPosts, nPosts)

    return assocPath(['posts', 'edges'], mPosts, this)
  },
  setMeta: function (value) {
    const meta = pathOr([], ['v1PostIndex', 'meta'], value)

    return assocPath(['posts', 'meta'], meta, this)
  }
}

export default construct(Chill)
