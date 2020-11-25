import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import moment from 'moment'
import { compose } from 'ramda'
import {
  BookingWrapper,
  HeaderWrapper,
  ListBookingWrapper,
  NodataWrapper,
  NodataImage,
  NodataDescription,
  DiscoverButton,
  ButtonText,
  CalendarHeaderWrapper,
  DateHeaderWrapper,
  DateTime,
  TodayButton,
  TodayText
} from './styled'

import { withTheme, withLazyQuery, withTranslation } from 'hocs'
import { WeeklyCalendar, PageLoading } from 'components'
import { BookingCard } from 'modules/Service/private-component'
import { Routes, GateWay, Storage } from 'utils'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import DateTimePicker from 'react-native-modal-datetime-picker'

import * as QUERY from 'modules/Service/query'
import Model from 'modules/Service/model'
import lazyCatImage from 'assets/images/graphics/lazy-cat.png'
import { orNull, orArray } from 'utils/Selector'
import CalendarIcon from 'react-native-vector-icons/AntDesign'
import ArrowIcon from 'react-native-vector-icons/Feather'

const STORAGE_BOOKING_KEY = 'booking_list_storage_'
const DATE_FORMAT = 'YYYY-MM-DD'

function Booking(props) {
  const { theme, data, setVariables, refetch, translate } = props
  const record = Model(data)
  const { dayBookings } = record
  const { colors, themeMode } = theme

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [date, setDate] = useState(moment())
  const [bookings, setBookings] = useState(null)
  const [isRefresh, setRefresh] = useState(false)
  const [initLoading, setInitLoading] = useState(true)
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const [highlightDate, setHighlightDate] = useState([])

  useEffect(() => {
    if (date) {
      setBookings(null)
      getListBookingData(date)
      return setInitLoading(false)
    }
  }, [date])

  useEffect(() => {
    if (isFocused && !initLoading) onRefresh(false)
  }, [isFocused])

  useEffect(() => {
    if (orNull('bookings', dayBookings)) {
      setBookingData(dayBookings)
      Storage.setWithExpired(
        `${STORAGE_BOOKING_KEY}_${moment(date).format(DATE_FORMAT)}`,
        dayBookings,
        10000
      )
    }
  }, [dayBookings])

  const setBookingData = useCallback(dayBookings => {
    setBookings(orArray('bookings', dayBookings))
    setHighlightDate(orArray('list_dates', dayBookings))
  })

  const getListBookingData = useCallback(date => {
    const fetchData = async () => {
      const storageData = await Storage.getWithExpired(
        `${STORAGE_BOOKING_KEY}_${moment(date).format(DATE_FORMAT)}`
      )

      if (storageData) return setBookingData(storageData)

      setVariables(getListBooking(date))
    }

    fetchData()
  })

  const onRefresh = useCallback(
    (showLoading = true) => {
      if (showLoading) {
        setRefresh(true)
        setTimeout(() => {
          setRefresh(false)
        }, 1000)
      }

      if (refetch) return refetch(getListBooking())

      setVariables(getListBooking())
    },
    [setVariables, refetch]
  )

  function getListBooking(selectDate = date) {
    let startDate = moment(selectDate)
    let endDate = moment(selectDate)
    startDate = startDate.add(-14, 'days')
    endDate = endDate.add(14, 'days')

    return {
      variables: {
        filter: {
          day: moment(selectDate).format(DATE_FORMAT),
          start_day: moment(startDate).format(DATE_FORMAT),
          end_day: moment(endDate).format(DATE_FORMAT)
        },
        per_page: 50
      }
    }
  }

  function renderBookingItem({ item }) {
    return (
      <BookingCard
        data={item}
        onPress={() =>
          navigation.navigate(Routes.bookingDetail, {
            bookingId: orNull('id', item)
          })
        }
        onOpenRatingForm={() =>
          navigation.navigate(Routes.ratingForm, {
            bookingId: orNull('id', item)
          })
        }
      />
    )
  }

  function renderNoData() {
    if (bookings.length > 0) return null
    const today = moment()
    const isAfterDate =
      date.isAfter(today) ||
      date.format(DATE_FORMAT) === today.format(DATE_FORMAT)
    return (
      <NodataWrapper>
        <NodataImage source={lazyCatImage} resizeModel={'contain'} />
        <NodataDescription>{translate('noBooking')}</NodataDescription>
        {isAfterDate && (
          <DiscoverButton
            shadowType={4}
            onPress={() => navigation.navigate('Petown')}
          >
            <ButtonText>{translate('bookNow')}</ButtonText>
          </DiscoverButton>
        )}
      </NodataWrapper>
    )
  }

  function renderBody() {
    if (!bookings) return <PageLoading isList />
    return (
      <ListBookingWrapper
        data={bookings}
        keyExtractor={(item, index) => `====${index.toString()}====`}
        extraData={bookings}
        renderItem={renderBookingItem}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
        ListHeaderComponent={renderNoData}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={20}
        initialNumToRender={10}
      />
    )
  }

  function renderDateModalPicker() {
    return (
      <DateTimePicker
        isVisible={dateModalVisible}
        date={date ? new Date(date) : new Date()}
        onConfirm={date => {
          setDateModalVisible(false)
          setDate(moment(date))
        }}
        onCancel={() => setDateModalVisible(false)}
        isDarkModeEnabled={themeMode === 'dark'}
        locale={'vi_VI'}
        headerTextIOS={translate('pickDate')}
        confirmTextIOS={translate('save')}
        cancelTextIOS={translate('cancel')}
      />
    )
  }

  function renderCalendarHeader() {
    return (
      <CalendarHeaderWrapper>
        <DateHeaderWrapper onPress={() => setDateModalVisible(true)}>
          <CalendarIcon name={'calendar'} size={16} color={colors.red} />
          <DateTime>
            {`${translate('month')} ${moment(date).format('M, YYYY')}`}
          </DateTime>
          <ArrowIcon name='chevron-down' color={colors.gray_3} size={18} />
        </DateHeaderWrapper>
        <TodayButton onPress={() => setDate(moment())}>
          <TodayText>{translate('today')}</TodayText>
        </TodayButton>
      </CalendarHeaderWrapper>
    )
  }

  function renderHeader() {
    return (
      <HeaderWrapper>
        {renderCalendarHeader()}
        <WeeklyCalendar
          date={date}
          setDate={setDate}
          minDate={null}
          highlightDate={highlightDate}
        />
      </HeaderWrapper>
    )
  }

  return (
    <BookingWrapper>
      {renderHeader()}
      {renderBody()}
      {renderDateModalPicker()}
    </BookingWrapper>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLazyQuery({
    query: QUERY.getListDayBooking,
    service: GateWay.SHOPPING_SERVICE,
    hideLoading: true
  })
)(Booking)
