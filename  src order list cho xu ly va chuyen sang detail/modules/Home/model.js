import { pathOr, construct, assocPath, forEach } from 'ramda'

export function listPets(record) {
  const pets = pathOr([], ['v1PetIndex', 'edges'], record)
  const handle = item => {
    item.type = 'myPet'
  }
  return forEach(handle, pets)
}
export function listKinds(record) {
  const kinds = pathOr([], ['v1KindIndex', 'edges'], record)
  const handle = item => {
    item.type = 'kinds'
  }
  return forEach(handle, kinds)
}

function Home(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.features = pathOr(null, ['v1FeatureIndex', 'edges'], record)
  this.news = pathOr(null, ['v1ArticleIndex', 'edges'], record)
  this.pets = listPets(record)
  this.kinds = listKinds(record)
}

Home.prototype = {
  setLoading: function (value) {
    return assocPath(['isLoading'], value, this)
  },
  getFeatures: function () {
    return pathOr([], ['features', 'edges'], this)
  },
  getPets: function () {
    return pathOr([], ['pets', 'edges'], this)
  }
}

export default construct(Home)
