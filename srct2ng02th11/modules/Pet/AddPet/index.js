import React, { useState, useEffect, createRef, useCallback } from 'react'
import analytics from '@react-native-firebase/analytics'

import { compose } from 'ramda'
import { withMutation, withTheme, withToast, withTranslation } from 'hocs'
import { GateWay } from 'utils'
import * as Mutation from '../query'
import moment from 'moment'

import {
  Wrapper,
  StepWrapper,
  NextStepButton,
  StepCenterWrapper,
  Step,
  StepSelected,
  StepLabel,
  StepLine,
  AStepWrapper,
  TabView,
  View
} from './styled'
import { ModalHeader } from 'components'
import { AddKindTab, AddNameTab, AddOtherTab } from '../private-components'
import Icons from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

function AddPet(props) {
  const {
    theme,
    mutate,
    isCompleted,
    showToast,
    isToastClosed,
    translate
  } = props

  const navigation = useNavigation()
  const { colors } = theme

  const [tabSelected, setTabSelected] = useState(0)
  const [kind, setKind] = useState({})
  const [breed, setBreed] = useState({})
  const [avatar, setAvatar] = useState('')
  const [petName, setPetName] = useState('')
  const [birthday, setBirthday] = useState(null)
  const [adoptionDate, setAdoptionDate] = useState(null)
  const [gender, setGender] = useState('unknown')
  const [color, setColor] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [length, setLength] = useState('')
  const [description, setDescription] = useState('')
  const [steps, setSteps] = useState([
    { name: '1', verify: false, required: true },
    { name: '2', verify: false, required: true },
    { name: '3', verify: false, required: false }
  ])
  const [allVerify, updateAllVerify] = useState(false)

  const tabRef = createRef()
  const onSetFirstStep = useCallback(() => {
    const pageSteps = steps.slice()
    pageSteps[0].verify = kind.id && breed.id

    setSteps(pageSteps)
  })

  const onVerifySecondStep = useCallback(() => {
    const pageSteps = steps.slice()
    pageSteps[1].verify = avatar !== '' && petName !== ''
    setSteps(pageSteps)
  })

  const onVerifyThirdStep = useCallback(() => {
    const pageSteps = steps.slice()
    pageSteps[2].verify =
      birthday &&
      adoptionDate &&
      gender &&
      color !== '' &&
      weight !== '' &&
      height !== '' &&
      length !== '' &&
      description !== ''
    setSteps(pageSteps)
  })

  const onGoToSelectedPage = useCallback(() => {
    tabRef.current.goToPage(tabSelected)
  })

  const onGoBack = useCallback(() => {
    if (isToastClosed) {
      navigation.goBack()
    }
  })

  const onComplete = useCallback(() => {
    if (isCompleted) {
      showToast({
        message: translate('addSuccess'),
        description: translate('addPetSuccessMess')
      })
    }
  })

  const onUpdateVerify = useCallback(() => {
    const stepFalse = steps.find(item => !item.verify && item.required)
    if (stepFalse) {
      updateAllVerify(false)

      return
    }

    updateAllVerify(true)
  })

  useEffect(() => onGoToSelectedPage(), [tabSelected])
  useEffect(() => onGoBack(), [isToastClosed])

  /**
   * Verify step 1
   */
  useEffect(() => onSetFirstStep(), [kind, breed])
  // =================

  /**
   * Verify step 2
   */
  useEffect(() => onVerifySecondStep(), [avatar, petName])
  // =================

  /**
   * Verify step 3
   */
  useEffect(() => onVerifyThirdStep(), [
    birthday,
    adoptionDate,
    gender,
    color,
    weight,
    height,
    description,
    length
  ])
  // =================

  useEffect(() => onComplete(), [isCompleted])
  useEffect(() => onUpdateVerify(), [steps])

  function onAddNewPet() {
    analytics().logSelectContent({
      content_type: 'save_my_pet',
      item_id: 'addNewPet'
    })

    mutate({
      variables: {
        input: {
          attribute: {
            name: petName,
            description: description,
            avatar_url: avatar,
            color: color,
            father_breed_id: breed.id,
            mother_breed_id: breed.id,
            gender: gender,
            height: height,
            length: length,
            weight: weight,
            breed_id: breed.id,
            kind_id: kind.id,
            adoption_date: moment(adoptionDate).format('YYYY-MM-DD'),
            birthday: moment(birthday).format('YYYY-MM-DD')
          }
        }
      }
    })
  }

  function renderNavigation() {
    return (
      <StepWrapper>
        <NextStepButton
          onPress={() => {
            if (tabSelected > 0) setTabSelected(tabSelected - 1)
          }}
          disabled={tabSelected === 0}
        >
          {tabSelected > 0 && (
            <Icons name='arrow-left-circle' size={24} color={colors.gray_3} />
          )}
        </NextStepButton>
        <StepCenterWrapper>
          {steps.map((item, index) => {
            return (
              <AStepWrapper key={index}>
                <Step verify={item.verify} selected={tabSelected === index}>
                  {item.verify ? (
                    <Icons name={'check'} size={14} color={colors.white} />
                  ) : tabSelected !== index ? (
                    <StepLabel>{item.name}</StepLabel>
                  ) : (
                    tabSelected === index && <StepSelected />
                  )}
                </Step>
                {index < 2 && <StepLine success={index < tabSelected} />}
              </AStepWrapper>
            )
          })}
        </StepCenterWrapper>

        <NextStepButton
          onPress={() => {
            if (tabSelected < 2) setTabSelected(tabSelected + 1)
          }}
          disabled={!(tabSelected < 2 && steps[tabSelected].verify)}
        >
          {tabSelected < 2 && steps[tabSelected].verify && (
            <Icons name='arrow-right-circle' size={24} color={colors.gray_3} />
          )}
        </NextStepButton>
      </StepWrapper>
    )
  }

  return (
    <Wrapper>
      <ModalHeader
        title={translate('addPet')}
        back
        showSubmit={allVerify}
        onPress={onAddNewPet}
      >
        {renderNavigation()}
      </ModalHeader>
      <TabView ref={tabRef} renderTabBar={() => <View />} locked>
        <AddKindTab
          setKind={value => setKind(value)}
          setBreed={value => setBreed(value)}
        />
        <AddNameTab
          setPetAvatar={value => setAvatar(value)}
          setPetName={value => setPetName(value)}
        />
        <AddOtherTab
          updateBirthday={value => setBirthday(value)}
          updateAdoption={value => setAdoptionDate(value)}
          updatePetGender={value => setGender(value)}
          updateColor={value => setColor(value)}
          updateWeight={value => setWeight(value)}
          updateHeight={value => setHeight(value)}
          updateDescription={value => setDescription(value)}
          updateLength={value => setLength(value)}
        />
      </TabView>
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withToast,
  withTranslation,
  withMutation({
    mutation: Mutation.createPet,
    service: GateWay.PET_SERVICE
  })
)(AddPet)
