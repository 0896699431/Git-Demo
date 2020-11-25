import React, { useState, useEffect, createRef } from 'react'
import analytics from '@react-native-firebase/analytics'

import { View } from 'react-native'
import { compose } from 'ramda'
import { Wrapper, Body, Title } from './styled'
import { withTheme,withLazyQuery } from 'hocs'
import { GateWay } from 'utils'
import * as QUERY from '../query'
import Model from '../model'
import { useRoute } from '@react-navigation/native'
import { Header, TabbarAnimation, PageLoading } from 'components'
import { Overview, Historical, Care } from '../Screens'
import { orNull } from 'utils/Selector'

function Detail(props) {
  const { data, setVariables } = props
  const record = Model(data)
  const { wikiInfo, wikiGallery } = record
  const route = useRoute()

  const [wikiId] = useState(orNull('params.wikiId', route))
  const [wikiName] = useState(orNull('params.wikiName', route))
  const [showPage, setShowPage] = useState(false)
  const [listScreen] = useState([
    {
      key: 'overview',
      name: 'Tổng quan'
    },
    {
      key: 'historical',
      name: 'Lịch sử'
    },
    {
      key: 'care',
      name: 'Chăm sóc'
    }
  ])

  useEffect(() => {
    analytics().setCurrentScreen('WikiDetail', 'WikiDetail')
  }, [])

  useEffect(() => {
    if (wikiId) {
      setVariables({
        variables: {
          id: wikiId,
          filter: { imageable_id_eq: wikiId, imageable_type_eq: 'Wiki' },
          per_page: 5
        }
      })
    }
  }, [wikiId])

  useEffect(() => {
    if (wikiInfo.id === wikiId) setShowPage(true)
  }, [wikiInfo])

  const tabsRef = createRef()

  function renderScreen(item, index) {
    switch (item.key) {
      case 'overview':
        return (
          <Overview
            key={index.toString()}
            wikiInfo={wikiInfo}
            wikiGallery={wikiGallery}
          />
        )
      case 'historical':
        return <Historical key={index.toString()} wikiInfo={wikiInfo} />
      case 'care':
        return <Care key={index.toString()} wikiId={wikiId} />
      default:
        return (
          <Overview
            key={index.toString()}
            wikiInfo={wikiInfo}
            wikiGallery={wikiGallery}
          />
        )
    }
  }
  function renderBody() {
    if (showPage)
      return (
        <Body ref={tabsRef} renderTabBar={() => <View />} locked>
          {listScreen.map(renderScreen)}
        </Body>
      )

    return <PageLoading />
  }
  return (
    <Wrapper>
      <Header noIcon back>
        <Title>{wikiName}</Title>
        {showPage && (
          <TabbarAnimation
            tabs={listScreen}
            titleKey={'name'}
            onPress={index => tabsRef.current.goToPage(index)}
          />
        )}
      </Header>
      {renderBody()}
    </Wrapper>
  )
}

export default compose(
  withTheme,
  withLazyQuery({
    query: QUERY.getWikiInfo,
    service: GateWay.PET_SERVICE,
    hideLoading: true
  })
)(Detail)
