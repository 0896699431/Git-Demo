import React from 'react'
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import {
  CustomTabWrapper,
  TabLabelWrapper,
  IconWrapper,
  AStepWrapper,
  StepLine
} from './styled'
import { withTheme } from 'hocs'

function CustomTabCheckout(props) {
  const { tabs, activeTab, goToPage, theme } = props
  const { colors } = theme

  const renderTab = (tabName, i) => {
    const activeColor = activeTab === i ? colors.white : colors.gray_3

    const currentActiveTab = activeTab === i
    switch (tabName) {
      case 'Address':
        return (
          <TabLabelWrapper
            key={i}
            activeOpacity={0.8}
            onPress={() => goToPage(i)}
          >
            <IconWrapper activeBackground={currentActiveTab}>
              <Icon name='location-pin' size={23} color={activeColor} />
            </IconWrapper>
            {/* <TabLabel activeText={currentActiveTab}>Shipping</TabLabel> */}
          </TabLabelWrapper>
        )
      case 'Payment':
        return (
          <TabLabelWrapper
            key={i}
            activeOpacity={0.8}
            onPress={() => goToPage(i)}
          >
            <IconWrapper activeBackground={currentActiveTab}>
              <FontAwsome name='credit-card' size={25} color={activeColor} />
            </IconWrapper>
            {/* <TabLabel activeText={currentActiveTab}>Thanh toán</TabLabel> */}
          </TabLabelWrapper>
        )
      case 'Confirm':
        return (
          <TabLabelWrapper
            key={i}
            activeOpacity={0.8}
            onPress={() => goToPage(i)}
          >
            <IconWrapper activeBackground={currentActiveTab}>
              <IonIcon
                name='md-checkbox-outline'
                size={25}
                color={activeColor}
              />
            </IconWrapper>
            {/* <TabLabel activeText={currentActiveTab}>Xác nhận</TabLabel> */}
          </TabLabelWrapper>
        )
      default:
        break
    }
  }

  return (
    <CustomTabWrapper>
      {tabs.map((tab, i) => {
        return (
          <AStepWrapper key={i}>
            {renderTab(tab, i)}
            {i < 2 && <StepLine success={activeTab > i} />}
          </AStepWrapper>
        )
      })}
    </CustomTabWrapper>
  )
}

export default withTheme(CustomTabCheckout)
