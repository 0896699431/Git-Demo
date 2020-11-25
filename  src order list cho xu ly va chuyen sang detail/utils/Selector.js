import * as R from 'ramda'
import dump from 'assets/images/article/dump.jpg'

/* Split Path from string to Array */
//cat chuoi
const xSplit = properties => {
  return properties.split('.')
}

export const orArray = (properties, record) => {
  return R.pathOr([], xSplit(properties))(record)
}

export const orNull = (properties, record) => {
  return R.pathOr(null, xSplit(properties))(record)
}

export const orObject = (prototypes, record) => {
  return R.pathOr({}, xSplit(prototypes))(record)
}

export const orNumber = (prototypes, record) => {
  return R.pathOr(0, xSplit(prototypes))(record)
}

/* Find Index From Array With Deep Path */
const deepIndex = (properties, array, value) => {
  const isCorrect = R.pathEq(xSplit(properties), value)
  return R.findIndex(isCorrect, array)
}

/* Get Array and CurrentIndex From Record */
const indexFromArray = (properties, deepPath, value, record) => {
  const array = orArray(properties, record)
  const index = deepIndex(deepPath, array, value)

  return { index, array }
}

export const construct = R.construct

export const orEmpty = (properties, record) => {
  return R.pathOr('', xSplit(properties))(record)
}

export const orErrorType = (properties, record) => {
  return R.pathOr('error', xSplit(properties))(record)
}

export const orBoolean = (properties, record) => {
  return R.pathOr(false, xSplit(properties))(record)
}

export const updateString = (properties, value, record) => {
  return R.assocPath(xSplit(properties), R.or(value, ''), record)
}

export const updateBoolean = (properties, value, record) => {
  return R.assocPath(xSplit(properties), R.or(value, false), record)
}

export const find = (properties, value, record) => {
  return R.find(R.pathEq(xSplit(properties), value), record)
}

export const updateArray = (properties, value, record) => {
  return R.assocPath(xSplit(properties), R.or(value, []), record)
}

export const updateObject = (properties, value, record) => {
  return R.assocPath(xSplit(properties), R.or(value, {}), record)
}

export const prependDataToList = (properties, value, record) => {
  const array = orArray(properties, record)
  const data = R.prepend(value, array)

  return R.assocPath(xSplit(properties), data, record)
}

export const removeDataFromList = (properties, deepPath, value, record) => {
  const { index, array } = indexFromArray(properties, deepPath, value, record)

  const nArray = R.remove(index, 1, array)
  return R.assocPath(xSplit(properties), nArray, record)
}

export const updateDataToList = (properties, deepPath, data, record) => {
  const value = orNull(deepPath, data)

  const { index, array } = indexFromArray(properties, deepPath, value, record)

  const newArray = R.update(index, data, array)
  return R.assocPath(xSplit(properties), R.or(newArray, []), record)
}

export const orDefault = (dv, properties, record) => {
  const arrPath = xSplit(properties)

  return R.pathOr(dv, arrPath, record)
}

export const orDefaultValue = (value, dv) => {
  return R.or(value, dv)
}

export const orPath = (dv, properties, record) => {
  return R.pathOr(dv, properties, record)
}

export const orDump = (properties, record) => {
  return R.pathOr(dump, xSplit(properties))(record)
}

export const withUniq = arrays => {
  return R.uniq(arrays)
}
