import { pathOr, construct, assocPath } from 'ramda'

function kinds(record) {
  return {
    edges: pathOr([], ['v1KindIndex', 'edges'], record),
    meta: pathOr([], ['v1KindIndex', 'meta'], record)
  }
}

function breeds(record) {
  return {
    edges: pathOr([], ['v1BreedIndex', 'edges'], record),
    meta: pathOr([], ['v1BreedIndex', 'meta'], record)
  }
}

function Pet(record) {
  this.isUploadLoading = pathOr(false, ['isUploadLoading'], record)
  this.kinds = kinds(record)
  this.breeds = breeds(record)
  this.newPet = pathOr({}, ['v1CreatePet'], record)
  this.editPet = pathOr({}, ['v1UpdatePet'], record)
  this.pets = pathOr(null, ['v1PetIndex', 'edges'], record)
  this.petDetail = pathOr({}, ['v1PetDetail'], record)
}

Pet.prototype = {
  setUpLoading: function(value) {
    return assocPath(['isUploadLoading'], value, this)
  },
  getPets: function() {
    return pathOr([], ['pets', 'edges'], this)
  },
  getKinds: function() {
    return pathOr([], ['kinds', 'edges'], this)
  },
  getBreeds: function() {
    return pathOr([], ['breeds', 'edges'], this)
  }
}

export default construct(Pet)
