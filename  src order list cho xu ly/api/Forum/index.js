import requestManager from 'utils/RequestManager.js'

const uploadImageCompose = (token, body) => {
  return requestManager
    .withHeader()
    .uploadAttachment('/upload-service', token, {})
    .attach('upload[file]', body)
}

export default {
  uploadImageCompose
}
