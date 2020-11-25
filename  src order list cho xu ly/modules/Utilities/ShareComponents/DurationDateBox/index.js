import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'

import moment from 'moment'
import { withTheme, withTranslation } from 'hocs'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {
  Wrapper,
  HeaderText,
  DatePickerWrapper,
  Label,
  Value,
  Line,
  View
} from './styled'

function DurationDateBox(props) {
  const {
    theme,
    minDate,
    setCheckinDate,
    setCheckoutDate,
    setDurationDate,
    translate
  } = props
  const { colors, themeMode } = theme

  const [checkin, setCheckin] = useState(moment(minDate))
  const [checkout, setCheckout] = useState(moment(minDate))
  const [checkinVisible, setCheckinVisible] = useState(false)
  const [checkoutVisible, setCheckoutVisible] = useState(false)

  useEffect(() => {
    if (checkin && checkout) {
      const start = moment(moment(checkin).format('YYY-MM-DD'))
      const end = moment(moment(checkout).format('YYY-MM-DD'))
      const diff = end.diff(start, 'days') + 1
      setDurationDate(diff)
    }
  }, [checkin, checkout])

  function renderCheckinCalendar() {
    return (
      <DateTimePicker
        isVisible={checkinVisible}
        date={checkin ? new Date(checkin) : new Date()}
        minimumDate={minDate ? new Date(minDate) : null}
        onConfirm={date => {
          setCheckinVisible(false)
          const mDate = moment(date)
          setCheckin(mDate)
          setCheckinDate(mDate)
          if (mDate.isAfter(checkout)) {
            setCheckout(mDate)
          }
        }}
        onCancel={() => setCheckinVisible(false)}
        isDarkModeEnabled={themeMode === 'dark'}
        locale={'vi_VI'}
        headerTextIOS={translate('pickDate')}
        confirmTextIOS={translate('save')}
        cancelTextIOS={translate('cancel')}
      />
    )
  }

  function renderCheckoutCalendar() {
    return (
      <DateTimePicker
        isVisible={checkoutVisible}
        date={checkout ? new Date(checkout) : new Date()}
        minimumDate={checkin ? new Date(checkin) : null}
        onConfirm={date => {
          setCheckoutVisible(false)
          setCheckout(moment(date))
          setCheckoutDate(moment(date))
        }}
        onCancel={() => setCheckoutVisible(false)}
        isDarkModeEnabled={themeMode === 'dark'}
        locale={'vi_VI'}
        headerTextIOS={translate('pickDate')}
        confirmTextIOS={translate('save')}
        cancelTextIOS={translate('cancel')}
      />
    )
  }

  function renderBody() {
    return (
      <View>
        <DatePickerWrapper onPress={() => setCheckinVisible(true)}>
          <Label color={colors.blue_primary}>Check-in</Label>
          <Value>{moment(checkin).format('DD-MM-YYYY')}</Value>
        </DatePickerWrapper>
        <Line />
        <DatePickerWrapper onPress={() => setCheckoutVisible(true)}>
          <Label color={colors.red}>Check-out</Label>
          <Value>{moment(checkout).format('DD-MM-YYYY')}</Value>
        </DatePickerWrapper>
      </View>
    )
  }

  return (
    <Wrapper shadowType={2}>
      <HeaderText>{translate('bookingDuration')}</HeaderText>
      {renderBody()}
      {renderCheckinCalendar()}
      {renderCheckoutCalendar()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(DurationDateBox)
