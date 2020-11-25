import React from 'react'
import i18n from 'i18n-js'
import en from '../../app/language/en.json'
import vi from '../../app/language/vi.json'
import ja from '../../app/language/ja.json'
import { LanguageContext } from '../../app/providers/languageProvider'

const withTranslation = () => Component => {
  function Translation(childProps) {
    const { language } = React.useContext(LanguageContext)

    const onLoadLocalization = React.useCallback(() => {
      i18n.defaultLocale = language
      i18n.locale = i18n.defaultLocale = language
      i18n.fallbacks = true
      i18n.missingBehaviour = 'guess'
      i18n.translations = { en, vi, ja }
    }, [language])

    React.useEffect(() => onLoadLocalization(), [language])

    const translate = React.useCallback(
      key => {
        if (key) {
          return i18n.t(key, { locale: language })
        }

        return ''
      },
      [language]
    )
    return <Component {...childProps} translate={translate} />
  }

  return Translation
}

export default withTranslation()
