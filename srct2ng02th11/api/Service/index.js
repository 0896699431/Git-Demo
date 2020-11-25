const getCity = () => {
  return fetch('https://thongtindoanhnghiep.co/api/city')
}

const getDistrict = id => {
  return fetch(`https://thongtindoanhnghiep.co/api/city/${id}/district`)
}

const getWard = id => {
  return fetch(`https://thongtindoanhnghiep.co/api/district/${id}/ward`)
}

export default {
  getCity,
  getDistrict,
  getWard
}
