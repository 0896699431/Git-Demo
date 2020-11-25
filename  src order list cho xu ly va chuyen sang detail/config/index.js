import env from 'react-native-config'

const config = {
  api: {
    host: env.BASE_API_URL,
    timeout: 20000
  }
}

const BASE_API_URL = config.api.host

export { BASE_API_URL }

export default config
