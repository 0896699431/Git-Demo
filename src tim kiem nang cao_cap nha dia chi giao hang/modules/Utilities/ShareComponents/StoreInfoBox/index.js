import React from 'react'
import { withTheme } from 'hocs'
import { compose } from 'ramda'
import {
  BookingWrapper,
  VetHeadWrapper,
  DumbView,
  StoreImg,
  StoreInfoWrapper,
  StoreName,
  TimeText
} from './styled'
import { orEmpty } from 'utils/Selector'

function StoreInfoBox(props) {
  const { storeInfo } = props
  return (
    <BookingWrapper shadowType={2}>
      <VetHeadWrapper>
        <DumbView>
          <StoreImg
            source={{
              uri: orEmpty('avatar_url', storeInfo)
            }}
          />
          <StoreInfoWrapper>
            <StoreName>{orEmpty('name', storeInfo)}</StoreName>
            <TimeText>{`${orEmpty('open_at', storeInfo)} - ${orEmpty(
              'close_at',
              storeInfo
            )}`}</TimeText>
          </StoreInfoWrapper>
        </DumbView>
      </VetHeadWrapper>
    </BookingWrapper>
  )
}

export default compose(withTheme)(StoreInfoBox)
