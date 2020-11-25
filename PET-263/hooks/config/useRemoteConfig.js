import remoteConfig from '@react-native-firebase/remote-config'

remoteConfig().setConfigSettings({
  minimumFetchIntervalMillis: 30000
})

export function useGetMinimalAvailableVersion() {
  const handleGetMinimalAvailableVersion = async () => {
    await remoteConfig().fetchAndActivate()
    const version = remoteConfig().getValue('MIN_SUPPOERTED_APP_VERSION')
    return version.asString()
  }

  return { handleGetMinimalAvailableVersion }
}
