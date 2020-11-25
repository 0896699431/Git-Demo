import React from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import {
  BasicSettingWrapper,
  RowWrapper,
  RowTitle,
  RowSubTitle,
  SettingName,
  RightTouchableWrapper
} from './styled'

function Kinds({
  translate,
  gender,
  colors,
  openForumPicker,
  openGenderPicker,
  petKind
}) {
  return (
    <BasicSettingWrapper shadowType={3}>
      <SettingName>{translate('setupKind')}</SettingName>
      <RowWrapper>
        <RowTitle>{translate('kind')}</RowTitle>
        <RightTouchableWrapper onPress={() => openForumPicker()}>
          <RowSubTitle>{petKind}</RowSubTitle>
          <Icon name='chevron-right' size={30} color={colors.gray_3} />
        </RightTouchableWrapper>
      </RowWrapper>

      <RowWrapper noBorder>
        <RowTitle>{translate('gender')}</RowTitle>
        <RightTouchableWrapper onPress={openGenderPicker}>
          <RowSubTitle>
            {gender ? translate(gender) : translate('all')}
          </RowSubTitle>
          <Icon name='chevron-right' size={30} color={colors.gray_3} />
        </RightTouchableWrapper>
      </RowWrapper>
    </BasicSettingWrapper>
  )
}

export default Kinds
