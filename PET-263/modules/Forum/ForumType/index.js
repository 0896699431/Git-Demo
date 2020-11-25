import React from 'react'
import { Wrapper } from './styled'
import { ModalPicker } from 'components'

const WrappedComponent = React.forwardRef(function ForumType (
  {
    forumTypeList,
    forumTypeSelect,
    showCancel,
    translate,
    pickerTitle,
    imgLoveKey
  },
  ref
) {
  const topFilter = forumTypeList.filter(item => item.node.name !== 'Top')

  const renderForumTypePicker = () => {
    if (topFilter && topFilter.length) {
      return (
        <ModalPicker
          title={pickerTitle || translate('chooseForum')}
          innerRef={ref}
          items={topFilter}
          labelKey={'name'}
          valueKey={'id'}
          filterKey={'node'}
          imgKey={'image_url'}
          imgLoveKey={imgLoveKey}
          onConfirmed={forumT => forumTypeSelect(forumT)}
          showCancel={showCancel}
        />
      )
    }
  }

  return <Wrapper>{renderForumTypePicker()}</Wrapper>
})

export default WrappedComponent
