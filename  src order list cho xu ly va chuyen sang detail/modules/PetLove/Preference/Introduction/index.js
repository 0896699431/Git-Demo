import React from 'react'
import {
  BasicSettingWrapper,
  SettingName,
  IntroductionInputWrapper,
  IntroductionInput
} from './styled'

function Introduction({ translate, setIntroduction, introduction, colors }) {
  return (
    <BasicSettingWrapper shadowType={3}>
      <SettingName>{translate('introduction')}</SettingName>
      <IntroductionInputWrapper>
        <IntroductionInput
          underlineColorAndroid={'transparent'}
          multiline
          onChangeText={val => setIntroduction(val)}
          placeholder={'Hãy viết gì đó cool ngầu nào...'}
          placeholderTextColor={colors.gray_4}
          value={introduction}
        />
      </IntroductionInputWrapper>
    </BasicSettingWrapper>
  )
}

export default Introduction
