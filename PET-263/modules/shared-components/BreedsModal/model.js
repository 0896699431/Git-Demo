import { pathOr, construct } from 'ramda'

function breeds(record) {
  return {
    edges: pathOr([], ['v1BreedIndex', 'edges'], record),
    meta: pathOr([], ['v1BreedIndex', 'meta'], record)
  }
}

function Breed(record) {
  this.breeds = breeds(record)
}

Breed.prototype = {
  getBreeds: function() {
    return pathOr([], ['breeds', 'edges'], this)
  }
}

export default construct(Breed)
