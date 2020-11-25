import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { compose } from 'ramda'
import moment from 'moment'
import { Header, PageLoading, TabbarAnimation } from 'components'
import { useRoute } from '@react-navigation/native'

import {
  Wrapper,
  PaymentWrapper,
  PaymentItemWrapper,
  Footer,
  StoreThumb,
  PaymentInfo,
  Title,
  DateTime,
  PriceText,
  NodataWrapper,
  NodataThumb,
  StatusText,
  StatusTag,
  PaymentId,
  BodyItem,
  DefaultThumb
} from './styled'
import { withTranslation, withTheme, withLazyQuery } from 'hocs'
import * as QUERY from '../query'
import Model from '../model'
import { GateWay } from 'utils'
import { orNull, orEmpty } from 'utils/Selector'
import { formatMoney } from 'utils/Helpers'
import noDataImage from 'assets/images/graphics/lazy-cat.png'
import defaultThumb from 'assets/images/service/default_error_image.png'

function History(props) {
  const { theme, translate, data, setVariables, loading } = props
  const { colors } = theme
  const route = useRoute()
  const user = orNull('params.user', route)
  const record = Model(data)
  const { paymentHistories } = record

  const [listPayment, setListPayment] = useState([])
  const [meta, setMeta] = useState({})
  const [initLoading, setInitLoading] = useState(true)
  const [tabKey, setTabKey] = useState('pending')

  const listTab = [
    { key: 'pending', title: translate('pending') },
    { key: 'process', title: translate('process') },
    { key: 'success', title: translate('success') },
    { key: 'failed', title: translate('failed') },
    { key: 'cancelled', title: translate('cancelled') },
    { key: 'refund', title: translate('refund') }
  ]

  useEffect(() => {
    if (orNull('id', user)) setVariables(getListPayment(tabKey))
    return setInitLoading(false)
  }, [user])

  useEffect(() => {
    if (tabKey && !initLoading) {
      setListPayment([])
      setVariables(getListPayment(tabKey))
    }
  }, [tabKey])

  useEffect(() => {
    if (paymentHistories.meta.current_page && paymentHistories.edges) {
      const newPayment = paymentHistories.edges
      if (paymentHistories.meta.current_page === 1) {
        setListPayment(newPayment)
      } else {
        const listNewBreeds = listPayment.concat(newPayment)
        setListPayment(listNewBreeds)
      }
      setMeta(paymentHistories.meta)
    }
  }, [paymentHistories.edges])

  function getListPayment(tabKey, page = 1) {
    return {
      variables: {
        filter: {
          status_eq: tabKey
        },
        page: page
      }
    }
  }

  function handleLoadmore() {
    if (meta.next_page) {
      setVariables(getListPayment(tabKey, meta.next_page))
    }
  }

  function renderStatusTag(status) {
    let color = colors.gray_3
    switch (status) {
      case 'pending':
        color = colors.yellow
        break
      case 'success':
        color = colors.green_primary
        break
      case 'process':
        color = colors.blur_secondary
        break
      case 'failed':
        color = colors.gray_4
        break
      case 'cancelled':
        color = colors.red
        break
      case 'refund':
        color = colors.primary_1
        break

      default:
        color = colors.gray_3
    }

    return (
      <StatusTag color={color}>
        <StatusText>{status}</StatusText>
      </StatusTag>
    )
  }

  function renderPaymentItem({ item }) {
    const storeThumb = orEmpty('node.booking.store.thumb_url', item)
    const storeName = orEmpty('node.booking.store.name', item)
    const date = orEmpty('node.created_at', item)
    const status = orEmpty('node.status', item)
    const price = orEmpty('node.price', item)
    const id = orEmpty('node.id', item)

    return (
      <PaymentItemWrapper shadowType={3}>
        <BodyItem>
          {storeThumb !== '' ? (
            <StoreThumb source={{ uri: storeThumb }} />
          ) : (
            <DefaultThumb source={defaultThumb} />
          )}

          <PaymentInfo>
            <Title>{storeName}</Title>
            <DateTime>
              {moment
                .utc(date, 'HH:mm DD/MM/YYYY z')
                .local()
                .format('DD/MM/YYYY HH:mm')}
            </DateTime>
            {renderStatusTag(status)}
          </PaymentInfo>
          <PriceText>{`${status === 'refund' ? '' : '-'}${formatMoney(
            price
          )} đ`}</PriceText>
        </BodyItem>

        <PaymentId>{`${'petown_' + id}`}</PaymentId>
      </PaymentItemWrapper>
    )
  }

  function renderFooter() {
    return (
      <Footer>{meta.next_page && <ActivityIndicator size='small' />}</Footer>
    )
  }

  function renderNodata() {
    if (!initLoading && listPayment.length == 0)
      return (
        <NodataWrapper>
          <NodataThumb source={noDataImage} />
        </NodataWrapper>
      )

    return null
  }

  function renderBody() {
    if (!loading || listPayment.length > 0)
      return (
        <PaymentWrapper
          data={listPayment}
          renderItem={renderPaymentItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={listPayment}
          onEndReachedThreshold={0.02}
          onEndReached={handleLoadmore}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderNodata}
        />
      )
    return <PageLoading isList />
  }

  function renderTabbar() {
    return (
      <TabbarAnimation
        tabs={listTab}
        titleKey={'title'}
        onPress={index => setTabKey(listTab[index].key)}
      />
    )
  }

  return (
    <Wrapper>
      <Header title={translate('history')} back icon>
        {renderTabbar()}
      </Header>

      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.getListPaymentHistory,
    service: GateWay.PAYMENT_SERVICE,
    hideLoading: true
  })
)(History)
