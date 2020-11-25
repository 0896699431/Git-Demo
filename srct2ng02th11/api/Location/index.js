async function getAutoCompletePlace (searchKey) {
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${searchKey}&key=AIzaSyBiVml745I01csNBt-j0bYJ-XadAAZbB-c`
  )
  return result
}

async function getGeometric (placeId) {
  const geoResult = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,geometry&key=AIzaSyBiVml745I01csNBt-j0bYJ-XadAAZbB-c`
  )
  return geoResult
}

async function getLocationLatLong (exLat, exLong) {
  const locationResult = fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${exLat},${exLong}&key=AIzaSyBiVml745I01csNBt-j0bYJ-XadAAZbB-c`
  )
  return locationResult
}
async function getShortLocationLatLong (exLat, exLong) {
  const locationResult = fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${exLat},${exLong}&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBiVml745I01csNBt-j0bYJ-XadAAZbB-c`
  )
  return locationResult
}

export default {
  getAutoCompletePlace,
  getGeometric,
  getLocationLatLong,
  getShortLocationLatLong
}
