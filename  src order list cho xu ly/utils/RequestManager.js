import request from 'superagent'
import Constant from './Constants'
import { BASE_API_URL } from 'react-native-dotenv'

const prefix = require('superagent-prefix')('/static')

class RequestManager {
  withHeader() {
    return {
      fetchEntities(path, token, params = {}) {
        return request
          .get(BASE_API_URL + path)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set(
            'petown-auth',
            '4f877d3efb6c3cc7056d4aa00d68c6de1ffc3a4f0fad02524b'
          )
          .timeout({
            response: Constant.host.requestTimeout, // Wait 5 seconds for the server to start sending,
            deadline: Constant.host.deadline // but allow 1 minute for the file to finish loading.
          })
          .use(prefix)
          .query(params)
      },

      submitEntity(path, token, entity = {}) {
        return request
          .post(BASE_API_URL + path)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .retry(Constant.host.retry)
          .timeout({
            response: Constant.host.requestTimeout, // Wait 5 seconds for the server to start sending,
            deadline: Constant.host.deadline // but allow 1 minute for the file to finish loading.
          })
          .use(prefix)
          .send(entity)
      },

      putEntity(path, token, entity = {}) {
        return request
          .put(BASE_API_URL + path)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .retry(Constant.host.retry)
          .timeout({
            response: Constant.host.requestTimeout, // Wait 5 seconds for the server to start sending,
            deadline: Constant.host.deadline // but allow 1 minute for the file to finish loading.
          })
          .use(prefix)
          .send(entity)
      },

      deleteEntity(path, token) {
        return request
          .delete(BASE_API_URL + path)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .retry(Constant.host.retry)
          .timeout({
            response: Constant.host.requestTimeout, // Wait 5 seconds for the server to start sending,
            deadline: Constant.host.deadline // but allow 1 minute for the file to finish loading.
          })
          .use(prefix)
      },

      submitWithAttachment(path, token, entity) {
        return request
          .post(BASE_API_URL + path)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'multipart/form-data')
          .retry(Constant.host.retry)
          .timeout({
            response: Constant.host.requestTimeout, // Wait 5 seconds for the server to start sending,
            deadline: Constant.host.deadline // but allow 1 minute for the file to finish loading.
          })
          .use(prefix)
          .field(entity)
      },
      uploadAttachment(path, token, entity) {
        return request
          .post(BASE_API_URL + path)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'multipart/form-data')
          .timeout({
            response: Constant.host.requestTimeout, // Wait 5 seconds for the server to start sending,
            deadline: Constant.host.deadline // but allow 1 minute for the file to finish loading.
          })
          .use(prefix)
          .field(entity)
      }
    }
  }

  withoutHeader() {
    return {
      fetchEntities(path, params) {
        return request
          .get(BASE_API_URL + path)
          .set('Content-Type', 'application/json')
          .set(
            'petown-auth',
            '4f877d3efb6c3cc7056d4aa00d68c6de1ffc3a4f0fad02524b'
          )
          .retry(Constant.host.retry)
          .timeout({
            response: Constant.host.requestTimeout, // Wait 5 seconds for the server to start sending,
            deadline: Constant.host.deadline // but allow 1 minute for the file to finish loading.
          })
          .use(prefix)
          .query(params)
      },

      submitEntity(path, entity) {
        return request
          .post(BASE_API_URL + path)
          .set('Content-Type', 'application/json')
          .retry(Constant.host.retry)
          .timeout({
            response: Constant.host.requestTimeout, // Wait 5 seconds for the server to start sending,
            deadline: Constant.host.deadline // but allow 1 minute for the file to finish loading.
          })
          .use(prefix)
          .send(entity)
      }
    }
  }
}

export default new RequestManager()
