import React from 'react'
import {
  Wrapper,
  Text,
  CardView,
  ChangeWrapper,
  ChangeText,
  DumbView,
  styles,
  FreeShipWrapper,
  FreeShip,
  ScrollWrapper
} from './styled'
import { withTheme } from 'hocs'

function Confirm(props) {
  const { tabRef } = props

  function onChangeInfo(page) {
    tabRef.current.goToPage(page)
  }

  function renderAddressSum() {
    return (
      <CardView shadowType={2}>
        <DumbView style={styles.dumbView}>
          <Text style={styles.cardTitle}>Địa chỉ nhận hàng</Text>
          <ChangeWrapper onPress={() => onChangeInfo(0)}>
            <ChangeText>Thay đổi</ChangeText>
          </ChangeWrapper>
        </DumbView>

        <DumbView style={styles.cardBody}>
          <Text style={styles.bodyTitle}>Nguyễn Duy Khánh - 0363642295</Text>
          <Text>
            Tầng 3, toà nhà 3A Ngõ 82 Duy Tân, Phường Dịch Vọng Hậu, Cầu Giấy,
            Giấy, Hà Nội
          </Text>
        </DumbView>
      </CardView>
    )
  }

  function renderDeliverySum() {
    return (
      <CardView shadowType={2}>
        <DumbView style={styles.dumbView}>
          <Text style={styles.cardTitle}>Hình thức giao hàng</Text>
          <ChangeWrapper onPress={() => onChangeInfo(0)}>
            <ChangeText>Thay đổi</ChangeText>
          </ChangeWrapper>
        </DumbView>

        <DumbView style={[styles.cardBody, styles.shipPolicy]}>
          <FreeShipWrapper>
            <FreeShip>Miễn phí</FreeShip>
          </FreeShipWrapper>
          <Text>Giao hàng tiêu chuẩn</Text>
        </DumbView>
      </CardView>
    )
  }
  function renderPaymentSum() {
    return (
      <CardView shadowType={2}>
        <DumbView style={styles.dumbView}>
          <Text style={styles.cardTitle}>Hình thức thanh toán</Text>
          <ChangeWrapper onPress={() => onChangeInfo(1)}>
            <ChangeText>Thay đổi</ChangeText>
          </ChangeWrapper>
        </DumbView>

        <DumbView style={styles.cardBody}>
          <Text>Thẻ tín dụng/ghi nợ</Text>
        </DumbView>
      </CardView>
    )
  }

  function renderCostSum() {
    return (
      <CardView shadowType={2}>
        <DumbView style={styles.dumbView}>
          <Text style={styles.cardTitle}>Tạm tính</Text>
          <Text style={styles.finalPrice}>21.495.000đ</Text>
        </DumbView>
        <DumbView style={[styles.shippingCost, styles.balloon]}>
          <Text>Phí vận chuyển</Text>
          <Text style={styles.finalPrice}>20.000đ</Text>
        </DumbView>
      </CardView>
    )
  }

  return (
    <Wrapper>
      <ScrollWrapper>
        {renderAddressSum()}
        {renderDeliverySum()}
        {renderPaymentSum()}
        {renderCostSum()}
      </ScrollWrapper>
    </Wrapper>
  )
}

export default withTheme(Confirm)
