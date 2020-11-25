import React, { useState, useEffect, useCallback } from 'react'
import { compose } from 'ramda'

import {
  Wrapper,
  RowWrapper,
  InputWrapper,
  InputLabel,
  Input,
  Button,
  ButtonLabel
} from './styled'
import { withTheme, withTranslation } from 'hocs'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Icons from 'react-native-vector-icons/Ionicons'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function AddOtherTab(props) {
  const {
    theme,
    updateBirthday,
    updateAdoption,
    updatePetGender,
    updateColor,
    updateWeight,
    updateHeight,
    updateLength,
    updateDescription,
    translate
  } = props
  const { themeMode, colors } = theme
  const [isBirthdayPickerVisible, updateBirthdayPickerVisible] = useState(false)
  const [isAdoptionPickerVisible, updateAdoptionPickerVisible] = useState(false)
  const [birthday, setBirthday] = useState(null)
  const [adoptionDate, setAdoptionDate] = useState(null)
  const [gender, setGender] = useState('unknown')
  const [color, setColor] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [length, setLength] = useState('')
  const [description, setDescription] = useState('')

  const onUpdateBirthday = useCallback(() => updateBirthday(birthday))
  const onUpdateAdoption = useCallback(() => updateAdoption(adoptionDate))
  const onUpdatePetGender = useCallback(() => updatePetGender(gender))
  const onUpdateColor = useCallback(() => updateColor(color))
  const onUpdateWeight = useCallback(() => updateWeight(weight))
  const onUpdateHeight = useCallback(() => updateHeight(height))
  const onUpdateLength = useCallback(() => updateLength(length))
  const onUpdateDescription = useCallback(() => updateDescription(description))

  useEffect(() => onUpdateBirthday(), [birthday])
  useEffect(() => onUpdateAdoption(), [adoptionDate])
  useEffect(() => onUpdatePetGender(gender), [gender])
  useEffect(() => onUpdateColor(color), [color])
  useEffect(() => onUpdateWeight(weight), [weight])
  useEffect(() => onUpdateHeight(height), [height])
  useEffect(() => onUpdateLength(length), [length])
  useEffect(() => onUpdateDescription(description), [description])

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

  const onToggleBirthdayPicker = useCallback(() => {
    updateBirthdayPickerVisible(!isBirthdayPickerVisible)
  })

  const onToggleAdoptionDatePicker = useCallback(() => {
    updateAdoptionPickerVisible(!isAdoptionPickerVisible)
  })

  function renderBirthdayPicker() {
    return (
      <DateTimePicker
        isVisible={isBirthdayPickerVisible}
        date={birthday || new Date()}
        maximumDate={new Date()}
        onConfirm={date => {
          onToggleBirthdayPicker()
          setBirthday(date)
        }}
        onCancel={() => onToggleBirthdayPicker()}
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
        date={adoptionDate || new Date()}
        maximumDate={new Date()}
        minimumDate={birthday || undefined}
        onConfirm={date => {
          onToggleAdoptionDatePicker()
          setAdoptionDate(date)
        }}
        onCancel={() => onToggleAdoptionDatePicker()}
        isDarkModeEnabled={themeMode === 'dark'}
        locale={'vi_VI'}
        headerTextIOS={translate('adoptionDate')}
        confirmTextIOS={translate('save')}
        cancelTextIOS={translate('cancel')}
      />
    )
  }
  return (
    <KeyboardAwareScrollView extraScrollHeight={60}>
      <Wrapper>
        <RowWrapper>
          <InputLabel>{translate('chooseDOB')}</InputLabel>
          <Button onPress={() => onToggleBirthdayPicker()}>
            <ButtonLabel placeholder={!birthday}>
              {birthday
                ? moment(birthday).format('DD/MM/YYYY')
                : translate('pickDate')}
            </ButtonLabel>
          </Button>
        </RowWrapper>

        <RowWrapper>
          <InputLabel>{translate('adoptionDate')}</InputLabel>
          <Button onPress={() => onToggleAdoptionDatePicker()}>
            <ButtonLabel placeholder={!adoptionDate}>
              {adoptionDate
                ? moment(adoptionDate).format('DD/MM/YYYY')
                : translate('pickDate')}
            </ButtonLabel>
          </Button>
        </RowWrapper>

        <RowWrapper>
          <InputLabel>{translate('weight')} (kg)</InputLabel>
          <InputWrapper>
            <Input
              vaule={weight}
              placeholder={translate('weight')}
              onChangeText={text => setWeight(text.replace(',', '.'))}
              keyboardType={weight.indexOf('.') > -1 ? 'number-pad' : 'numeric'}
              placeholderTextColor={colors.gray_4}
            />
          </InputWrapper>
        </RowWrapper>

        <RowWrapper>
          <InputLabel>{translate('height')} (cm)</InputLabel>
          <InputWrapper>
            <Input
              vaule={height}
              placeholder={translate('height')}
              onChangeText={text => setHeight(text.replace(',', '.'))}
              keyboardType={height.indexOf('.') > -1 ? 'number-pad' : 'numeric'}
              placeholderTextColor={colors.gray_4}
            />
          </InputWrapper>
        </RowWrapper>

        <RowWrapper>
          <InputLabel>{translate('length')} (cm)</InputLabel>
          <InputWrapper>
            <Input
              vaule={length}
              placeholder={translate('length')}
              onChangeText={text => setLength(text.replace(',', '.'))}
              keyboardType={length.indexOf('.') > -1 ? 'number-pad' : 'numeric'}
              placeholderTextColor={colors.gray_4}
            />
          </InputWrapper>
        </RowWrapper>

        <RowWrapper>
          <InputLabel>{translate('gender')}</InputLabel>
          <Button onPress={updateGender}>
            <ButtonLabel placeholder>{translate(gender)}</ButtonLabel>
            {gender !== 'unknown' && (
              <Icons
                name={gender === 'male' ? 'md-male' : 'md-female'}
                size={15}
                color={gender === 'male' ? colors.blue_primary : colors.red_2}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ marginLeft: 5 }}
              />
            )}
          </Button>
        </RowWrapper>

        <RowWrapper>
          <InputLabel>{translate('color')}</InputLabel>
          <InputWrapper>
            <Input
              value={color}
              placeholder={translate('color')}
              onChangeText={text => setColor(text)}
              placeholderTextColor={colors.gray_4}
            />
          </InputWrapper>
        </RowWrapper>

        <RowWrapper>
          <Input
            vaule={description}
            placeholder={translate('description')}
            onChangeText={text => setDescription(text)}
            placeholderTextColor={colors.gray_4}
            textAlign={'left'}
            multiline
          />
        </RowWrapper>

        {renderBirthdayPicker()}
        {renderAdoptionDatePicker()}
      </Wrapper>
    </KeyboardAwareScrollView>
  )
}

export default compose(
  withTheme,
  withTranslation
)(AddOtherTab)
