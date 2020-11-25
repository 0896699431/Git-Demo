import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import moment from 'moment'
import {
  BookingWrapper,
  CalendarWrapper,
  CalendarHeaderWrapper,
  DateHeaderWrapper,
  TodayButton,
  TodayText,
  DateTime,
  HourContainer,
  HourWrapper,
  Hour
} from './styled'

import { withTheme, withTranslation } from 'hocs'
import DateTimePicker from 'react-native-modal-datetime-picker'

import { WeeklyCalendar } from 'components'
import CalendarIcon from 'react-native-vector-icons/AntDesign'
import ArrowIcon from 'react-native-vector-icons/Feather'

function BookingCalendar(props) {
  const {
    dateSelected,
    setDateSelected,
    selectedHour,
    setSelectedHour,
    openAt,
    closeAt,
    theme,
    translate
  } = props
  const { colors, themeMode } = theme

  const [dateModalVisible, setDateModalVisible] = useState(false)
  const [rangeHour, setRangeHour] = useState([])
  const [minIndex, setMinIndex] = useState(0)
  const [minDate, setMinDate] = useState(moment())

  useEffect(() => {
    if (openAt && closeAt) genRangeHour(openAt, closeAt)
  }, [openAt, closeAt])

  useEffect(() => {
    if (
      moment(dateSelected).format('DD/MM/YYYY') ===
        moment().format('DD/MM/YYYY') &&
      rangeHour.length > 0 &&
      selectedHour
    ) {
      const hIndex = rangeHour.findIndex(item => item === selectedHour)
      if (hIndex && hIndex < minIndex) setSelectedHour(rangeHour[minIndex])
    }
  }, [dateSelected, rangeHour])

  function genRangeHour(open, close) {
    const openHour = Number(moment(open, 'HH:mm').format('HH'))
    const openMinute = Number(moment(open, 'HH:mm').format('mm'))
    const closeHour = Number(moment(close, 'HH:mm').format('HH'))
    const closeMinute = Number(moment(close, 'HH:mm').format('mm'))

    const listHour = []
    for (let h = openHour; h <= closeHour; h++) {
      if (h === closeHour && closeMinute === 0) break

      if (!(h === openHour && openMinute !== 0)) {
        listHour.push(`${h < 10 ? '0' + h : h}:00`)
      }
      if (!(h === closeHour && closeMinute === 30)) {
        listHour.push(`${h < 10 ? '0' + h : h}:30`)
      }
    }
    setRangeHour(listHour)
    handleSelectedTime(openAt, closeAt, listHour)
  }

  function handleSelectedTime(open, close, listHour) {
    const currentHour = Number(moment().format('HH'))
    const currentMinute = Number(moment().format('mm')) < 30 ? 0 : 30
    const openHour = Number(moment(open, 'HH:mm').format('HH'))
    const closeHour = Number(moment(close, 'HH:mm').format('HH'))
    const closeMinute = Number(moment(close, 'HH:mm').format('mm'))

    const hour = currentHour + 1
    if (hour < openHour) return setSelectedHour(open)

    if (
      hour > closeHour ||
      (hour === closeHour && currentMinute >= closeMinute)
    ) {
      setDateSelected(moment().add(1, 'days'))
      setMinDate(moment().add(1, 'days'))
      return setSelectedHour(open)
    }

    const h = `${hour < 10 ? '0' + hour : hour}:${
      currentMinute === 0 ? '00' : '30'
    }`
    const hIndex = listHour.findIndex(item => item === h)
    setMinIndex(hIndex)
    setSelectedHour(h)
  }

  function renderDateModalPicker() {
    return (
      <DateTimePicker
        isVisible={dateModalVisible}
        date={dateSelected ? new Date(dateSelected) : new Date()}
        minimumDate={new Date(minDate)}
        onConfirm={date => {
          setDateModalVisible(false)
          setDateSelected(moment(date))
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

  function renderHourItem({ item, index }) {
    const currentDate = moment().format('DD/MM/YYYY')
    const selectedDate = moment(dateSelected).format('DD/MM/YYYY')
    const isDisable =
      (currentDate === selectedDate && index < minIndex) ||
      moment(selectedDate).isBefore(moment(currentDate))

    const hour = item
    const isSelected = selectedHour === item

    return (
      <HourWrapper
        shadowType={3}
        onPress={() => {
          setSelectedHour(item)
        }}
        isSelected={isSelected}
        disabled={isDisable}
        isDisable={isDisable}
      >
        <Hour isSelected={isSelected} isDisable={isDisable}>
          {hour}
        </Hour>
      </HourWrapper>
    )
  }

  function renderCalendarHeader() {
    return (
      <CalendarHeaderWrapper>
        <DateHeaderWrapper onPress={() => setDateModalVisible(true)}>
          <CalendarIcon name={'calendar'} size={16} color={colors.red} />
          <DateTime>
            {`${translate('month')} ${moment(dateSelected).format('M, YYYY')}`}
          </DateTime>
          <ArrowIcon name='chevron-down' color={colors.gray_3} size={18} />
        </DateHeaderWrapper>
        <TodayButton onPress={() => setDateSelected(minDate)}>
          <TodayText>{translate('today')}</TodayText>
        </TodayButton>
      </CalendarHeaderWrapper>
    )
  }

  function renderBody() {
    return (
      <HourContainer
        data={rangeHour}
        renderItem={renderHourItem}
        numColumns={5}
        // eslint-disable-next-line react-native/no-inline-styles
        columnWrapperStyle={{ justifyContent: 'space-around' }}
      />
    )
  }

  return (
    <BookingWrapper shadowType={2}>
      <CalendarWrapper>
        {renderCalendarHeader()}
        <WeeklyCalendar
          date={dateSelected}
          setDate={setDateSelected}
          minDate={moment(moment(minDate).format('DD/MM/YYY'), 'DD/MM/YYY')}
        />
        {renderBody()}
        {renderDateModalPicker()}
      </CalendarWrapper>
    </BookingWrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(BookingCalendar)
