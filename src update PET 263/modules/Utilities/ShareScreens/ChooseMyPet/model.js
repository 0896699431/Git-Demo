import { pathOr, construct } from 'ramda'

function ChooseMyPets(record) {
  this.myPets = pathOr([], ['v1PetIndex', 'edges'], record)
}

ChooseMyPets.prototype = {
  getPets: function() {
    return pathOr([], ['v1PetIndex', 'edges'], this)
  }
}

export default construct(ChooseMyPets)
