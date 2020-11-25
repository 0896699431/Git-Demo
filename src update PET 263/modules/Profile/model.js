import { pathOr, construct, assocPath } from 'ramda'

function posts(record) {
  return {
    edges: pathOr([], ['v1PostIndex', 'edges'], record),
    meta: pathOr([], ['v1PostIndex', 'meta'], record)
  }
}

function articles(record) {
  return {
    edges: pathOr([], ['v1ArticleIndex', 'edges'], record),
    meta: pathOr([], ['v1ArticleIndex', 'meta'], record)
  }
}

function profile(record) {
  return pathOr(
    {
      follows_total: 0,
      followers_total: 0,
      is_followed: false
    },
    ['v1UserDetail'],
    record
  )
}

function Profile(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.posts = posts(record)
  this.articles = articles(record)
  this.profile = profile(record)
  this.editProfile = pathOr({}, ['v1UpdateProfile'], record)
  this.pets = pathOr(null, ['v1PetIndex', 'edges'], record)
  this.isUploadLoading = pathOr(false, ['isUploadLoading'], record)
  this.myProfile = pathOr({}, ['v1UserProfile'], record)
  this.profileInfo = pathOr({}, 'profileInfo', record)
}

Profile.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  getPosts: function() {
    return pathOr([], ['posts', 'edges'], this)
  },
  getAricles: function() {
    return pathOr([], ['articles', 'edges'], this)
  },
  getProfile: function() {
    return pathOr({}, ['profile'], this)
  },
  setUpLoading: function(value) {
    return assocPath(['isUploadLoading'], value, this)
  },
  setProfile: function(value) {
    return assocPath(['profileInfo'], value, this)
  }
}

export default construct(Profile)
