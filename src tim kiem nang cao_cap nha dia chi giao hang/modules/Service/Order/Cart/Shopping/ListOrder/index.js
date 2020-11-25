import React from 'react'

import { compose } from 'ramda'
import { Wrapper } from './styled'

import { withTheme, withTranslation } from 'hocs'

function ListOrder({ orderStatus }) {
  console.log('orderStatus===>', orderStatus)
  // function renderFooter() {
  //   return (
  //     <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
  //   )
  // }

  // function renderNoData() {
  //   if (bookings.length > 0) return null
  //   const today = moment()
  //   const isAfterDate =
  //     date.isAfter(today) ||
  //     date.format(DATE_FORMAT) === today.format(DATE_FORMAT)
  //   return (
  //     <NodataWrapper>
  //       <NodataImage source={lazyCatImage} resizeModel={'contain'} />
  //       <NodataDescription>{translate('noBooking')}</NodataDescription>
  //       {isAfterDate && (
  //         <DiscoverButton
  //           shadowType={4}
  //           onPress={() => navigation.navigate('Petown')}
  //         >
  //           <ButtonText>{translate('bookNow')}</ButtonText>
  //         </DiscoverButton>
  //       )}
  //     </NodataWrapper>
  //   )
  // }

  return <Wrapper></Wrapper>
}

export default compose(
  withTheme,
  withTranslation
  // withLazyQuery({
  //   query: QUERY.getListBooking,
  //   service: GateWay.SHOPPING_SERVICE,
  //   hideLoading: true
  // })
)(ListOrder)
