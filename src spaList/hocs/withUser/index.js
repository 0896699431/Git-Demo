import React from 'react'
import { ApplicationContext } from 'app/providers/applicationProvider'
import { orObject } from 'utils/Selector'

const withUser = () => Component => {
  function WithUser(props) {
    const [user, setUser] = React.useState({})
    const { sharing } = React.useContext(ApplicationContext)

    const onSetUser = React.useCallback(() => {
      setUser(orObject('user', sharing))
    })

    React.useEffect(() => {
      onSetUser()

      return () => {
        setUser({})
      }
    }, [sharing.user])
    return <Component user={user} {...props} />
  }

  return WithUser
}

export default withUser()
