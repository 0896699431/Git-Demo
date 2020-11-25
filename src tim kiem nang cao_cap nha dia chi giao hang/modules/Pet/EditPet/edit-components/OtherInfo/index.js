import React, { useState } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  InfoRow,
  RowLabel,
  RowContentWrapper,
  Button,
  ButtonLabel
} from './styled'
import { withTheme, withTranslation } from 'hocs'
import moment from 'moment'
import Icons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from 'react-native-modal-datetime-picker'

function OtherInfo(props) {
  const {
    theme,
    birthday,
    setBirthday,
    adoptionDate,
    setAdoptionDate,
    gender,
    setGender,
    translate
  } = props
  const { colors, themeMode } = theme

  const [isBirthdayPickerVisible, updateBirthdayPickerVisible] = useState(false)
  const [isAdoptionPickerVisible, updateAdoptionPickerVisible] = useState(false)

  function updateGender() {
    switch (gender) {
      case 'unknown':
        setGender('male')
        break
      case 'male':
        setGender('female')
        break
      case 'female':
        setGender('unknown')
        break
      default:
        setGender('unknown')
        break
    }
  }

  function renderBirthdayPicker() {
    return (
      <DateTimePicker
        isVisible={isBirthdayPickerVisible}
        date={
          birthday ? new Date(moment(birthday, 'HH:MM DD/MM/YYYY')) : new Date()
        }
        maximumDate={new Date()}
        onConfirm={date => {
          setBirthday(date)
          updateBirthdayPickerVisible(false)
        }}
        onCancel={() => updateBirthdayPickerVisible(false)}
        isDarkModeEnabled={themeMode === 'dark'}
        locale={'vi_VI'}
        headerTextIOS={translate('chooseDOB')}
        confirmTextIOS={translate('save')}
        cancelTextIOS={translate('cancel')}
      />
    )
  }
  function renderAdoptionDatePicker() {
    return (
      <DateTimePicker
        isVisible={isAdoptionPickerVisible}
        date={
          adoptionDate
            ? new Date(moment(adoptionDate, 'HH:MM DD/MM/YYYY'))
            : new Date()
        }
        maximumDate={new Date()}
        minimumDate={
          birthday ? new Date(moment(birthday, 'HH:MM DD/MM/YYYY')) : undefined
        }
        onConfirm={date => {
          setAdoptionDate(date)
          updateAdoptionPickerVisible(false)
        }}
        onCancel={() => updateAdoptionPickerVisible(false)}
        isDarkModeEnabled={themeMode === 'dark'}
        locale={'vi_VI'}
        headerTextIOS={translate('adoptionDate')}
        confirmTextIOS={translate('save')}
        cancelTextIOS={translate('cancel')}
      />
    )
  }

  return (
    <Wrapper>
      <InfoRow>
        <RowLabel>{translate('chooseDOB')}</RowLabel>
        <RowContentWrapper>
          <Button onPress={() => updateBirthdayPickerVisible(true)}>
            <ButtonLabel>
              {birthday
                ? moment(birthday, 'HH:MM DD/MM/YYYY').format('DD/MM/YYYY')
                : translate('notAdded')}
            </ButtonLabel>
            <Icons name={'ios-arrow-down'} size={16} color={colors.gray_4} />
          </Button>
        </RowContentWrapper>
      </InfoRow>
      <InfoRow>
        <RowLabel>{translate('adoptionDate')}</RowLabel>
        <RowContentWrapper>
          <Button onPress={() => updateAdoptionPickerVisible(true)}>
            <ButtonLabel>
              {adoptionDate
                ? moment(adoptionDate, 'HH:MM DD/MM/YYYY').format('DD/MM/YYYY')
                : translate('notAdded')}
            </ButtonLabel>
            <Icons name={'ios-arrow-down'} size={16} color={colors.gray_4} />
          </Button>
        </RowContentWrapper>
      </InfoRow>
      <InfoRow>
        <RowLabel>{translate('gender')}</RowLabel>
        <RowContentWrapper isBottom>
          <Button onPress={updateGender}>
            <ButtonLabel>
              {gender === 'unknown'
                ? translate('unknown')
                : gender === 'male'
                ? translate('male')
                : translate('female')}
            </ButtonLabel>
          </Button>
        </RowContentWrapper>
      </InfoRow>
      {renderBirthdayPicker()}
      {renderAdoptionDatePicker()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withTranslation
)(OtherInfo)
