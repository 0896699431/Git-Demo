import React from 'react'
import { Wrapper } from './styled'
import { ModalPicker } from 'components'

const WrappedComponent = React.forwardRef(function ForumCategory(
  { categories, categorySelect, showCancel, translate },
  ref
) {
  const renderCategoryPicker = () => {
    if (categories && categories.length) {
      return (
        <ModalPicker
          title={translate('chooseCate')}
          innerRef={ref}
          items={categories}
          labelKey={'name'}
          imgKey={'image_url'}
          valueKey={'id'}
          filterKey={'node'}
          onConfirmed={categoryT => categorySelect(categoryT)}
          showCancel={showCancel}
        />
      )
    }
  }

  return <Wrapper>{renderCategoryPicker()}</Wrapper>
})
export default WrappedComponent
