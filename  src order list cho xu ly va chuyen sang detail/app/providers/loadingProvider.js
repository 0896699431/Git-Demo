import React from 'react'
import { CircleLoading } from 'components'

export const LoadingContext = React.createContext(null)

const LoadingProvider = ({ children }) => {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => reset(), 500)

      return () => {
        clearInterval(timer)
      }
    }
  }, [count])

  const loadingIncrement = () => {
    setCount(prevCount => prevCount + 1)
  }

  const loadingDecrement = () => {
    setCount(prevCount => (prevCount - 1 < 0 ? 0 : prevCount - 1))
  }

  const reset = () => {
    setCount(0)
  }

  const store = {
    onLoading: {
      increment: loadingIncrement,
      decrement: loadingDecrement,
      reset: reset
    }
  }

  return (
    <LoadingContext.Provider value={store}>
      {count > 0 ? <CircleLoading isVisible={count > 0} /> : null}
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
