import React, {
  useMemo,
  useState,
  useEffect,
  createRef,
  useCallback
} from 'react'
import moment from 'moment'
import { withTheme } from 'hocs'
import {
  Wrapper,
  ListWeekDayWrapper,
  WeekDayItem,
  WeekDayLabel,
  ListDayWrapper,
  DayWrapper,
  DayLabel,
  HighlightDot
} from './styled'
import Carousel from 'react-native-snap-carousel'
const dateFormat = 'DD-MM-YYYY'

function WeeklyCalendar({ theme, date, setDate, minDate, highlightDate }) {
  const { colors } = theme

  const [lang] = useState('vi-vn')
  const [dateSelected, setDateSelected] = useState(date || moment())
  const [layout, setLayout] = useState(null)
  const [listDate, setListDate] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = createRef()

  const listWeekday =
    lang === 'vi-vn'
      ? ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
      : moment.localeData(lang).weekdaysShort()

  useMemo(() => {
    setTimeout(() => {
      if (carouselRef.current) carouselRef.current.snapToItem(0, false)
    }, 250)
  }, [])

  useEffect(() => {
    if (date && date.format(dateFormat) !== dateSelected.format(dateFormat))
      return setDateSelected(date)
  }, [date])

  useEffect(() => {
    if (dateSelected) {
      genListWeekDate(dateSelected)
    }
  }, [dateSelected])

  const genListWeekDate = useCallback(
    dateSelected => {
      handleListWeekDate(dateSelected)
      setDate &&
        dateSelected.format(dateFormat) !== date.format(dateFormat) &&
        setDate(dateSelected)
    },
    [dateSelected, setDate]
  )
  function onLayout(e) {
    setLayout(e.nativeEvent.layout)
  }

  function handleListWeekDate(date, page = activeSlide) {
    var weekStart = date.clone().startOf('week')
    var weekEnd = date.clone().endOf('week')

    const currentWeek = genListWeekdate(weekStart)
    const lastWeek = genListWeekdate(moment(weekStart).subtract(1, 'days'))
    const nextWeek = genListWeekdate(moment(weekEnd).add(1, 'days'))
    const dates = []
    dates[page] = currentWeek
    dates[page === 0 ? 2 : page - 1] = lastWeek
    dates[page === 2 ? 0 : page + 1] = nextWeek
    setListDate(dates)
  }
  function genListWeekdate(date) {
    var weekStart = date.clone().startOf('week')

    var days = []
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days'))
    }
    return days
  }

  const checkHighLight = useCallback(
    date => {
      if (!highlightDate || highlightDate.length === 0) return false

      const checkDate = highlightDate.find(
        item => item === moment(date).format('DD/MM/YYYY')
      )

      if (checkDate) return true

      return false
    },
    [date, highlightDate]
  )

  function renderListWeek() {
    return (
      <ListWeekDayWrapper>
        {listWeekday &&
          listWeekday.map((item, index) => {
            return (
              <WeekDayItem key={index.toString()}>
                <WeekDayLabel weekend={index === 0 || index === 6}>
                  {item}
                </WeekDayLabel>
              </WeekDayItem>
            )
          })}
      </ListWeekDayWrapper>
    )
  }

  function renderCarouselPage({ item }) {
    let dates = listDate ? listDate[item] : []

    return (
      <ListDayWrapper>
        {dates &&
          dates.map((dateItem, dateIndex) => {
            const isDisable = dateItem.isBefore(minDate)
            const isActive =
              dateSelected.format(dateFormat) === dateItem.format(dateFormat)
            const bgColor = isActive
              ? colors.red
              : dateItem.format(dateFormat) === moment().format(dateFormat)
              ? colors.gray_5
              : 'transparent'

            const textColor = isActive
              ? colors.white
              : dateIndex === 0 || dateIndex === 6 || isDisable
              ? colors.gray_3
              : colors.gray_2

            const isHighLight = checkHighLight(dateItem)

            return (
              <DayWrapper
                key={dateIndex.toString()}
                onPress={() => setDateSelected(dateItem)}
                color={bgColor}
                disabled={dateItem.isBefore(minDate)}
              >
                <DayLabel color={textColor}>
                  {moment(dateItem).format('DD')}
                </DayLabel>
                <HighlightDot
                  color={
                    isHighLight
                      ? isActive
                        ? colors.white
                        : colors.primary_2
                      : 'transparent'
                  }
                />
              </DayWrapper>
            )
          })}
      </ListDayWrapper>
    )
  }

  function renderDaysCarousel() {
    if (!layout) return null
    return (
      <Carousel
        ref={carouselRef}
        data={[0, 1, 2]}
        renderItem={renderCarouselPage}
        sliderWidth={layout.width}
        itemWidth={layout.width}
        onSnapToItem={index => {
          const dates = listDate[index]
          const newDate = dates[dateSelected.weekday()]
          if (minDate && newDate.isBefore(minDate)) {
            setDateSelected(
              moment(`${moment(minDate).format('YYYY-MM-DD')} 23:00`)
            )
          } else {
            setDateSelected(dates[dateSelected.weekday()])
          }

          return setActiveSlide(index)
        }}
        inactiveSlideOpacity={0.2}
        loop
      />
    )
  }

  return (
    <Wrapper onLayout={onLayout}>
      {renderListWeek()}
      {renderDaysCarousel()}
    </Wrapper>
  )
}

export default withTheme(WeeklyCalendar)
