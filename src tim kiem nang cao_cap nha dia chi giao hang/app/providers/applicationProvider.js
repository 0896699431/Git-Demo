import React from 'react'
export const ApplicationContext = React.createContext({})
import { Storage, Constants } from 'utils'

const ApplicationProvider = ({ children }) => {
  const [sharing, setSharing] = React.useState({})
  const [help, setHelp] = React.useState({})

  React.useEffect(() => {
    const onGetUser = async () => {
      const jsonUser = await Storage.get(
        Constants.storageKey.auth.USER_INFO_STORAGE_KEY
      )

      if (jsonUser) {
        const user = JSON.parse(jsonUser)

        onSetSharing({ user })
      }
    }

    onGetUser()
  }, [])

  const onSetSharing = value => {
    setSharing(state => Object.assign({}, state, value))
  }

  const onSetHelp = value => {
    setHelp(state => Object.assign({}, state, value))
  }

  const onReset = () => {
    setSharing({})
    setHelp({})
  }

  const store = {
    sharing,
    help,
    setSharing: onSetSharing,
    setHelp: onSetHelp,
    onReset: onReset
  }

  return (
    <ApplicationContext.Provider value={store}>
      {children}
    </ApplicationContext.Provider>
  )
}

export default ApplicationProvider
