import { useGetMinimalAvailableVersion } from '../../hooks/config/useRemoteConfig'
import { createContext, useContext } from 'react'

const AppContext = createContext({})

export const AppContextProvider = AppContext.Provider

export function useAppContext() {
  return useContext(AppContext)
}

export function useAppContextSubscriber() {
  const { handleGetMinimalAvailableVersion } = useGetMinimalAvailableVersion()
  return { handleGetMinimalAvailableVersion }
}
