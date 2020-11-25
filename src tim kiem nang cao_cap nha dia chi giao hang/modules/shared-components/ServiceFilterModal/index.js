import React from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  BoxWrapper,
  Header,
  Line,
  RowRapper,
  CheckButton,
  RowInfoWrapper,
  RowTitile,
  RowSubTitle,
  RowRightButton
} from './styled'

import { withTheme } from 'hocs'

import { SwipeModal } from 'components'
import IonIcon from 'react-native-vector-icons/Ionicons'

function ServiceFilterModal(props) {
  const { modalVisible, toggleModal, theme } = props
  const { colors } = theme

  function renderPosition() {
    return (
      <BoxWrapper shadowType={3}>
        <Header>Khu vực</Header>
        <Line />
        <RowRapper>
          <CheckButton>
            <IonIcon name='ios-checkmark-circle' color={colors.red} size={20} />
          </CheckButton>
          <RowInfoWrapper>
            <RowTitile>Hà Nội</RowTitile>
            <RowSubTitle>Được xác định từ vị trí của bạn</RowSubTitle>
          </RowInfoWrapper>
        </RowRapper>
        <RowRapper>
          <CheckButton>
            <IonIcon
              name='ios-checkmark-circle'
              color={colors.gray_4}
              size={20}
            />
          </CheckButton>
          <RowInfoWrapper>
            <RowTitile>Chọn tỉnh / thành phố</RowTitile>
          </RowInfoWrapper>
          <RowRightButton>
            <IonIcon name='ios-arrow-down' color={colors.gray_4} size={20} />
          </RowRightButton>
        </RowRapper>
      </BoxWrapper>
    )
  }

  function renderSortOption() {
    return (
      <BoxWrapper shadowType={3}>
        <Header>Sắp xếp theo</Header>
        <Line />
        <RowRapper>
          <CheckButton>
            <IonIcon name='ios-checkmark-circle' color={colors.red} size={20} />
          </CheckButton>
          <RowInfoWrapper>
            <RowTitile>Phổ biến</RowTitile>
          </RowInfoWrapper>
        </RowRapper>

        <RowRapper>
          <CheckButton>
            <IonIcon
              name='ios-checkmark-circle'
              color={colors.gray_4}
              size={20}
            />
          </CheckButton>
          <RowInfoWrapper>
            <RowTitile>Điểm đánh giá của khách</RowTitile>
          </RowInfoWrapper>
        </RowRapper>

        <RowRapper>
          <CheckButton>
            <IonIcon
              name='ios-checkmark-circle'
              color={colors.gray_4}
              size={20}
            />
          </CheckButton>
          <RowInfoWrapper>
            <RowTitile>Giảm giá & khuyến mãi</RowTitile>
          </RowInfoWrapper>
        </RowRapper>

        <RowRapper>
          <CheckButton>
            <IonIcon
              name='ios-checkmark-circle'
              color={colors.gray_4}
              size={20}
            />
          </CheckButton>
          <RowInfoWrapper>
            <RowTitile>Giá tăng dần</RowTitile>
          </RowInfoWrapper>
        </RowRapper>

        <RowRapper>
          <CheckButton>
            <IonIcon
              name='ios-checkmark-circle'
              color={colors.gray_4}
              size={20}
            />
          </CheckButton>
          <RowInfoWrapper>
            <RowTitile>Giá giảm dần</RowTitile>
          </RowInfoWrapper>
        </RowRapper>
      </BoxWrapper>
    )
  }

  function renderResetFilter() {
    return (
      <BoxWrapper shadowType={3}>
        <RowRapper>
          <CheckButton>
            <IonIcon name='ios-refresh' color={colors.gray_2} size={20} />
          </CheckButton>
          <RowInfoWrapper>
            <RowTitile color={colors.red}>Phục hồi bộ lọc</RowTitile>
          </RowInfoWrapper>
        </RowRapper>
      </BoxWrapper>
    )
  }

  function renderBody() {
    return (
      <Wrapper>
        {renderPosition()}
        {renderSortOption()}
        {renderResetFilter()}
      </Wrapper>
    )
  }
  return (
    <SwipeModal isVisible={modalVisible} toggleModal={toggleModal}>
      {renderBody()}
    </SwipeModal>
  )
}

export default compose(withTheme)(ServiceFilterModal)
