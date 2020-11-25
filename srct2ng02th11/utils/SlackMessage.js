import Slack from 'react-native-slack-webhook'
import { WEB_HOOK_URL } from 'react-native-dotenv'

export const fireErr = errMess => {
  new Slack(WEB_HOOK_URL).post(String(errMess), '#petown-bug', 'Petown App')
}
