import { pathOr, construct } from 'ramda'

function Articles(record) {
  this.listArticle = pathOr([], ['v1ArticleIndex', 'edges'], record)
}

Articles.prototype = {
  getArticles: function() {
    return pathOr([], ['v1ArticleIndex', 'edges'], this)
  }
}

export default construct(Articles)
