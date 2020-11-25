import { construct, assocPath, pathOr } from 'ramda'
import { orArray, orObject, orNull } from 'utils/Selector'

function petSettings(record) {
  return orNull('v1MySetting', record)
}
function matchingData(record) {
  return orObject('v1CreateDarling.data', record)
}

function darlingCards(record) {
  return {
    edges: orArray('v1PetAvailable.edges', record),
    meta: orArray('v1PetAvailable.meta', record)
  }
}

function matchListing(record) {
  return {
    edges: orArray('v1PetMatching.edges', record),
    meta: orArray('v1PetMatching.meta', record)
  }
}

// ROOM LIST
function roomList(record) {
  return {
    edges: orArray('v1RoomIndex.edges', record),
    meta: orArray('v1RoomIndex.meta', record)
  }
}

// MESSAGE LIST
function messageList(record) {
  return {
    edges: orArray('v1MessageIndex.edges', record),
    meta: orArray('v1MessageIndex.meta', record)
  }
}

function Model(record) {
  this.petSettings = petSettings(record)
  this.darlingCards = darlingCards(record)
  this.pets = pathOr(null, ['v1PetIndex', 'edges'], record)
  this.kinds = pathOr(null, ['v1KindIndex', 'edges'], record)
  this.chatDetail = pathOr(null, ['v1RoomDetail'], record)
  this.matchList = matchListing(record)
  this.matched = matchingData(record)
  this.chatRooms = roomList(record)
  this.messList = messageList(record)
}

Model.prototype = {
  getPetSettings: function(value) {
    return assocPath('petSettings', value, this)
  },
  getDarlingCards: function(value) {
    return assocPath('darlingCards', value, this)
  },
  getMatchListing: function(value) {
    return assocPath('matchList', value, this)
  }
}

export default construct(Model)
