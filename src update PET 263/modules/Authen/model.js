import { pathOr, construct, assocPath, or } from 'ramda'
import Constants from 'utils/Constants'

function updateUser(record) {
  return {
    address: pathOr(null, ['address'], record),
    avatar_url: pathOr(Constants.emptyValue.string, ['avatar_url'], record),
    birthday: pathOr(Constants.emptyValue.string, ['birthday'], record),
    district: pathOr(Constants.emptyValue.nil, ['district'], record),
    id: pathOr(Constants.emptyValue.nil, ['id'], record),
    name: pathOr(Constants.emptyValue.nil, ['name'], record),
    phone: pathOr('', ['phone'], record),
    province: pathOr('No Name', ['province'], record),
    role: pathOr('No Name', ['role'], record),
    uid: pathOr('No Name', ['uid'], record)
  }
}
function Authen(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.user = updateUser(record)
  this.confidentialInfo = pathOr(
    JSON.stringify({}),
    ['confidentialInfo'],
    record
  )
  this.isLoggedIn = pathOr(false, ['isLoggedIn'], record)
  this.isLoginErr = pathOr(false, ['isLoginErr'], record)
  this.validMessage = pathOr('', 'validMessage', record)
  this.literals = pathOr(JSON.stringify({}), ['literals'], record)
  this.failureCode = pathOr('', ['failureCode'], record)
}

Authen.prototype = {
  setUser: function(record) {
    return assocPath(['user'], updateUser(record), this)
  },
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setConfidentialInfo: function(value) {
    const jsonValue = or(value, JSON.stringify({}))
    return assocPath(['confidentialInfo'], jsonValue, this)
  },
  validLoggedIn: function(value) {
    return assocPath(['isLoggedIn'], value, this)
  },
  setLoginErr: function(value) {
    return assocPath(['isLoginErr'], value, this)
  },
  setValidMessage: function(value) {
    return assocPath(['validMessage'], value, this)
  },
  setLiterals: function(value) {
    const jsonValue = or(value, JSON.stringify({}))
    return assocPath(['literals'], jsonValue, this)
  },
  setFailureCode: function(value) {
    return assocPath(['failureCode'], value, this)
  }
}

export default construct(Authen)
