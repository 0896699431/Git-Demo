import { pathOr, construct, assocPath } from 'ramda'

function followings(record) {
  return {
    edges: pathOr([], ['v1FollowingIndex', 'edges'], record),
    meta: pathOr([], ['v1FollowingIndex', 'meta'], record)
  }
}

function followers(record) {
  return {
    edges: pathOr([], ['v1FollowerIndex', 'edges'], record),
    meta: pathOr([], ['v1FollowerIndex', 'meta'], record)
  }
}

function favorites(record) {
  return {
    edges: pathOr([], ['v1FavoriteIndex', 'edges'], record),
    meta: pathOr([], ['v1FavoriteIndex', 'meta'], record)
  }
}

function histories(record) {
  return {
    edges: pathOr([], ['v1PaymentIndex', 'edges'], record),
    meta: pathOr([], ['v1PaymentIndex', 'meta'], record)
  }
}

function Menu(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.isToggleMenu = pathOr(false, ['isToggleMenu'], record)
  this.followings = followings(record)
  this.followers = followers(record)
  this.favorites = favorites(record)
  this.paymentHistories = histories(record)
}

Menu.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setToggleMenu: function(value) {
    return assocPath(['isToggleMenu'], value, this)
  },
  getFollowing: function() {
    return pathOr([], ['followings', 'edges'], this)
  },
  getFollower: function() {
    return pathOr([], ['followers', 'edges'], this)
  },
  getFavorites: function() {
    return pathOr([], ['favorites', 'edges'], this)
  }
}

export default construct(Menu)
