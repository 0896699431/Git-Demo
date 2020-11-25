// Dimensions
import { Platform, Dimensions } from 'react-native'
import Config from 'react-native-config'

export const isIphoneX = () => {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  )
}

export const isIphoneXsMax = () => {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 896 || dimen.width === 896)
  )
}

const getNavPadding = () => {
  if (isIphoneX() || isIphoneXsMax()) return 40
  if (Platform.OS === 'ios') return 20

  return 10
}

export const genderList = [
  {
    node: {
      id: 0,
      name: 'all_gender',
      image_url:
        'https://storage.googleapis.com/petown/uploads/article/images/gender-fluid.png'
    }
  },
  {
    node: {
      id: 1,
      name: 'male',
      image_url:
        'https://storage.googleapis.com/petown/uploads/article/images/male.png'
    }
  },
  {
    node: {
      id: 2,
      name: 'female',
      image_url:
        'https://storage.googleapis.com/petown/uploads/article/images/female.png'
    }
  }
]
export const BACK_ICON_SIZE = { width: 24, height: 24 }

export const allKinds = {
  node: {
    id: '-1',
    name: 'Tất cả',
    forum_type: 'All',
    avatar_url:
      'https://storage.googleapis.com/petown/uploads/article/images/pets.png'
  }
}

export const storeMarket = {
  appleStoreUrl: Config.APPLE_STORE_URL,
  googlePlayUrl: Config.GOOGLE_PLAY_URL
}

export default {
  appVersion: '1.0.4',
  layout: {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    navPadding: getNavPadding()
  },
  chill: {
    progress: {
      width: Dimensions.get('window').width / 3 - 5,
      height: 3
    }
  },
  drawerAnimation: {
    timeAnimateDuration: 200
  },
  fonts: {
    fontFamily: 'Roboto Slab'
  },
  host: {
    requestTimeout: 30000,
    deadline: 30000,
    retry: 3
  },
  storageKey: {
    beta: {
      BETA_USER: 'IS_BETA_USER'
    },
    codePushKey: {
      CODEPUSH_STAGING_DEPLOYMENT_KEY: 'TJiY1emVavhfO6t2BFmrc4jDE0b_M7mwNJf2e',
      CODEPUSH_PRODUCTION_DEPLOYMENT_KEY:
        'V6GZVru-0cqLNF4i7SdSDIWQweRTb2mLVkIOW'
    },
    auth: {
      PETOWN_STORAGE_KEY: 'auth:petownStorage',
      LANGUAGE_STORAGE_KEY: 'auth:languageStorage',
      USER_INFO_STORAGE_KEY: 'auth:userInfoStorage',
      PLAYER_ID: 'auth:playerIdStorage'
    },
    server: {
      HOST_STORAGE_KEY: 'server:hostStorage'
    },
    language: {
      STORAGE_LANGUAGE_KEY: 'lang:languageInfoStorage'
    },
    location: {
      STORAGE_USER_LOCATION: 'location:userLocationStorage'
    },
    loveSetting: {
      LOVE_INIT_SETTING: 'love:initSettingLocalStorage',
      LIST_CARD_NOPE: 'love:listCardNope'
    },
    spaFeature: {
      LIST_SPA: 'spa:listSpaStorage'
    },
    hotelFeature: {
      LIST_HOTEL: 'hotel:listHotelStorage'
    },
    veterinaryFeature: {
      LIST_VETERINARY: 'veterinary:listVeterinaryStorage'
    },
    notification: {
      LIST_NOTIFICATION: 'notification:ListNotificationStorage'
    },
    introTour: {
      INTRO_TOUR: 'introtor:IntroTourStorage',
      ELLA_TOUR: 'ellatour:EllatourStorage'
    }
  },
  emptyValue: {
    string: '',
    nil: null
  },
  languages: {
    'vi-VN': [
      {
        label: 'Tiếng Việt',
        value: 'vi-VN',
        drawer: 'VN',
        prefix: ''
      },
      {
        label: 'Tiếng Anh',
        value: 'en-US',
        drawer: 'EN',
        prefix: 2
      }
    ],
    'en-US': [
      {
        label: 'Vietnamese',
        value: 'vi-VN',
        drawer: 'VN',
        prefix: ''
      },
      {
        label: 'English',
        value: 'en-US',
        drawer: 'EN',
        prefix: 2
      }
    ]
  },
  company: {
    website: {
      url: 'https://petown.co',
      label: 'www.petown.co'
    }
  },

  urlRegex: /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneRegex: /(9|5|8|7|3|07|08|03|05|09|01[2|6|8|9])+([0-9]{8})\b/,
  DEFAULT_VARIABLES: {
    filter: {},
    page: 1
  },
  homeConfig: {
    utilityColumn: 3,
    utilityRow: 2
  },
  navigationDuration: 250,
  meta: {
    prev_page: null,
    next_page: null,
    current_page: 1,
    total_pages: 1,
    total_count: 0
  },
  STORAGE_SPA_KEY: 'spa_listspa_keyStorage',
  STORAGE_FAVORITE_KEY: 'favorite_product_keyStorage',
  isIOS: Platform.OS === 'ios',
  majorVersionOS: parseInt(Platform.Version, 10)
}
