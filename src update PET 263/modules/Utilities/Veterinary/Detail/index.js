import React, { useEffect, useState } from 'react'
import { compose } from 'ramda'
import {
  Wrapper,
  CustomStyles,
  IntroBox,
  ListDoctor,
  DoctorWrapper,
  DoctorAvatar,
  Line,
  Description,
  ListAddressWrapper,
  DoctorHeaderWrapper,
  DoctorRightWrapper,
  DoctorName,
  DoctorRole
} from './styled'
import { withTheme, withLazyQuery, withTranslation, withLocation } from 'hocs'
import { ImageHeaderScrollView, PageLoading } from 'components'
import { UtilityHeader, RatingTypical } from '../../../shared-components'
import { ImagesBox, AddressBox } from 'modules/Utilities/ShareComponents'

import { Routes, GateWay, Constants } from 'utils'
import { distanceCalculate } from 'utils/Helpers'
import * as QUERY from '../query'
import Model from '../model'
import { useNavigation, useRoute } from '@react-navigation/native'

import { orNull, orEmpty, orArray, orNumber } from 'utils/Selector'

function Clinic(props) {
  const {
    theme,
    data,
    setVariables,
    translate,
    getLocation,
    locationData
  } = props
  const { colors } = theme
  const record = Model(data)
  const { clinicDetail } = record

  const navigation = useNavigation()
  const route = useRoute()

  const [clinicId] = useState(orNull('params.clinicId', route))
  const [featureId] = useState(orNull('params.featureId', route))
  const [showPage, setShowPage] = useState(false)

  useEffect(getLocation, [])

  useEffect(() => {
    if (clinicId) getClinicData(clinicId)
  }, [clinicId])

  useEffect(() => {
    if (`${orNull('id', clinicDetail)}` === `${clinicId}`) setShowPage(true)
  }, [clinicDetail])

  function getClinicData(id) {
    setVariables({
      variables: {
        id: id,
        featureId: featureId
      }
    })
  }

  function getDistance(myLocation, addresses) {
    if (!addresses) return 0
    let minDistance = 0

    addresses.map((item, index) => {
      const distance = distanceCalculate(
        orNumber('latitude', myLocation),
        orNumber('longitude', myLocation),
        orNumber('latitude', item),
        orNumber('longitude', item)
      )
      if (index === 0) minDistance = distance
      minDistance = Math.min(minDistance, distance)
    })
    return minDistance
  }

  function renderSpaImgs() {
    const images = orArray('images', clinicDetail)
    if (!images.length) return null

    return <ImagesBox images={images} />
  }

  function renderDoctorDetailHeader(doctor) {
    return (
      <DoctorHeaderWrapper>
        <DoctorAvatar source={{ uri: orEmpty('avatar_url', doctor) }} />
        <DoctorRightWrapper>
          <DoctorName>{orEmpty('name', doctor)}</DoctorName>
          <DoctorRole>{orEmpty('specialized', doctor)}</DoctorRole>
        </DoctorRightWrapper>
      </DoctorHeaderWrapper>
    )
  }

  function renderListDoctor() {
    const doctors = orArray('veterinarians', clinicDetail)
    if (!doctors.length) return <></>
    return (
      <ListDoctor
        horizontal
        contentContainerStyle={CustomStyles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {doctors.map((item, index) => {
          return (
            <DoctorWrapper
              key={`<====${index}====>`}
              onPress={() =>
                navigation.navigate(Routes.richTextScreen, {
                  title: translate('doctorInfo'),
                  header: renderDoctorDetailHeader(item),
                  html: orEmpty('description', item)
                })
              }
            >
              <DoctorAvatar source={{ uri: orEmpty('avatar_url', item) }} />
            </DoctorWrapper>
          )
        })}
      </ListDoctor>
    )
  }

  function renderSpaIntroduction() {
    const description = orEmpty(
      'default_utility_store.short_description',
      clinicDetail
    )
    const richDescription = orEmpty(
      'default_utility_store.description',
      clinicDetail
    )
    return (
      <IntroBox
        shadowType={2}
        onPress={() =>
          navigation.navigate(Routes.richTextScreen, {
            title: translate('description'),
            html: richDescription
          })
        }
      >
        {renderListDoctor()}
        <Line />
        <Description>{description}</Description>
      </IntroBox>
    )
  }

  function renderSpaRouting() {
    const addresses = orArray('addresses', clinicDetail)
    if (!addresses.length) return null
    return (
      <ListAddressWrapper>
        <AddressBox
          addresses={addresses}
          myLocation={locationData}
          disableSelect
        />
      </ListAddressWrapper>
    )
  }

  function renderHeaderForeground() {
    const name = orEmpty('name', clinicDetail)
    const avatarUrl = orEmpty('avatar_url', clinicDetail)
    const addresses = orNull('addresses', clinicDetail)
    const ratesTotal = orNumber('rates_total', clinicDetail)
    const averageStar = orNumber('average_star', clinicDetail)
    return (
      <UtilityHeader
        name={name}
        bookLabel={translate('examBooking')}
        avatarUri={avatarUrl}
        subName={translate('vetExam')}
        distance={`${getDistance(locationData, addresses)} km`}
        onBuy={() =>
          navigation.navigate(Routes.vetBooking, {
            clinicId: clinicId,
            featureId: featureId
          })
        }
        ratesTotal={ratesTotal}
        starScope={averageStar}
        hideAddCart
      />
    )
  }

  function renderRating() {
    const utilityId = orNull('default_utility_store.utility_id', clinicDetail)
    return (
      <RatingTypical
        title={translate('rating')}
        type={'Store'}
        storeId={clinicId}
        filterId={utilityId}
        onPress={() =>
          navigation.navigate(Routes.productRatings, {
            storeId: clinicId,
            filterId: utilityId,
            type: 'Store'
          })
        }
      />
    )
  }

  if (!showPage) return <PageLoading />

  return (
    <ImageHeaderScrollView
      headerHeight={Constants.layout.screenWidth + 50}
      headerWidth={Constants.layout.screenWidth}
      imageSource={{
        uri: orEmpty('thumb_url', clinicDetail)
      }}
      renderForeground={renderHeaderForeground}
      style={{ backgroundColor: colors.ui_3D_background }}
      headerStyle={{ backgroundColor: colors.black }}
      ImageOpacity={0.9}
      showsVerticalScrollIndicator={false}
    >
      <Wrapper>
        {renderSpaImgs()}
        {renderSpaIntroduction()}
        {renderSpaRouting()}
        {renderRating()}
      </Wrapper>
    </ImageHeaderScrollView>
  )
}

export default compose(
  withTheme,
  withTranslation,
  withLocation,
  withLazyQuery({
    query: QUERY.getClinicDetail,
    service: GateWay.PARTNER_SERVICE
  })
)(Clinic)
