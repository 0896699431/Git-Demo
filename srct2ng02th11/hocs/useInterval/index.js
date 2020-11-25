import { useEffect, useRef, useCallback } from 'react'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  const onSaveCallback = useCallback(() => {
    savedCallback.current = callback
  })

  const onDelay = useCallback(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  })

  // Remember the latest callback.
  useEffect(() => onSaveCallback(), [callback])

  // Set up the interval.
  useEffect(() => onDelay(), [delay])
}

export default useInterval
