import React from 'react'
import { Storage, Constants } from 'utils'

export const LanguageContext = React.createContext({})

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState('vi')

  React.useEffect(() => {
    const onLocalLoad = async () => {
      const lang = await Storage.get(
        Constants.storageKey.language.STORAGE_LANGUAGE_KEY
      )

      setLanguage(lang)
    }

    onLocalLoad()
  }, [])

  const onSetLanguage = React.useCallback(
    value => {
      setLanguage(value)
    },
    [language]
  )

  const store = {
    language,
    onSetLanguage
  }

  return (
    <LanguageContext.Provider value={store}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
