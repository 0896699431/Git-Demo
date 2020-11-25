import React from 'react'
import { useRoute } from '@react-navigation/native'
import { BookingList } from 'modules/Utilities/ShareScreens'

import { orNull } from 'utils/Selector'
function List() {
  const route = useRoute()

  const featureId = orNull('params.featureId', route)
  return <BookingList featureId={featureId} featureName={'hotel'} />
}

export default List
