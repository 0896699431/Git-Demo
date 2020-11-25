import { pathOr, construct, assocPath } from 'ramda'
import { orArray, orObject, orBoolean, orNull } from 'utils/Selector'
import Article from '../../schemas/Article'

function forum (record) {
  this.isLoading = orBoolean('isLoading', record)
}

function comments (record) {
  return {
    edges: orArray('v1CommentIndex.edges', record),
    meta: orObject('v1CommentIndex.meta', record)
  }
}

function replies (record) {
  return {
    edges: orArray('v1CommentIndex.edges', record),
    meta: orObject('v1CommentIndex.meta', record)
  }
}

function articleList (record) {
  return {
    edges: orArray('v1ArticleIndex.edges', record),
    meta: orObject('v1ArticleIndex.meta', record)
  }
}

function articleDetail (record) {
  this.articleDetail = orNull('articleDetail', record)
}

function Model (record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.forum = forum(record)
  this.article = articleDetail(record)
  this.comments = comments(record)
  this.replies = replies(record)
  this.articleList = articleList(record)
  this.article = pathOr(Article(null), 'data', record)
  this.uploadMedia = pathOr(null, ['uploadMedia'], record)
}

Model.prototype = {
  setLoading: function (value) {
    return assocPath(['isLoading'], value, this)
  },
  setUploadMedia: function (value) {
    return assocPath(['uploadMedia'], value, this)
  },
  getComment: function () {
    return orArray('comments.edges', this)
  },
  getReplies: function (value) {
    return assocPath('v1CommentIndex', value, this)
  },
  setArticleDetail: function (value) {
    return assocPath('articleDetail', value, this)
  },
  getArticleList: function (value) {
    return orNull('articleList.edges', this)
  },
  getArticles: function () {
    return orArray('articleList.edges', this)
  }
}

export default construct(Model)
