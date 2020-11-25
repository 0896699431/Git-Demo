import i18n from 'i18n-js'

// Import all locales
import en from '../language/en.json'
import vi from '../language/vi.json'
import ja from '../language/ja.json'
i18n.defaultLocale = 'vi'
i18n.locale = 'vi'
i18n.fallbacks = true
i18n.missingBehaviour = 'guess'
i18n.translations = { en, vi, ja }

export default i18n
