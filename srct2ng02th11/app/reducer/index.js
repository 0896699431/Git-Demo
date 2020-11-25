import { combineReducers } from 'redux'
import AuthenReducer from 'modules/Authen/reducer'
import HomeReducer from 'modules/Home/reducer'
import PetReducer from 'modules/Pet/reducer'
import ChillReducer from 'modules/Chill/reducer'
import ServiceReducer from 'modules/Service/reducer'
import ForumReducer from 'modules/Forum/reducer'
import NotificationReducer from 'modules/Notification/reducer'
import ProfileReducer from 'modules/Profile/reducer'
import MenuReducer from 'modules/Menu/reducer'
// import AppNavigator from '../../app/navigators'

// const router = AppNavigator.router

// const mainNavAction = router.getActionForPathAndParams('AppStack')
// const initialNavState = router.getStateForAction(mainNavAction)

// const navReducer = (state = initialNavState, action) => {
//   const nextState = router.getStateForAction(action, state)
//   return nextState || state
// }

const reducer = combineReducers({
  authen: AuthenReducer,
  home: HomeReducer,
  pet: PetReducer,
  chill: ChillReducer,
  service: ServiceReducer,
  forum: ForumReducer,
  profile: ProfileReducer,
  notification: NotificationReducer,
  menu: MenuReducer
})

export default reducer
