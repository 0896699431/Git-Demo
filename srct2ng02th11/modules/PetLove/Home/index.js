import React, { useEffect, useCallback } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { Wrapper } from './styled'
import { orNull } from 'utils/Selector'

import BottomLoveNavigator from '../BottomLove'
import { withTheme, withLazyQuery } from 'hocs'
import { Storage, Constants, GateWay } from 'utils'
import * as QUERY from 'modules/Home/query'

function Home({ data, setVariables, auth }) {
  const { user } = auth

  const onGetMyPet = useCallback(() => {
    if (user.id) {
      setVariables({
        variables: { filter: { user_id_eq: user.id }, per_page: 50 }
      })
    }
  })

  useEffect(() => onGetMyPet(), [])

  const onSaveSettingToLocal = useCallback(() => {
    async function saveStorage() {
      try {
        await Storage.remove(Constants.storageKey.loveSetting.LOVE_INIT_SETTING)
      } catch (error) {
        console.log('SAVE SETTING LOCAL ERORR', error)
      }
    }

    saveStorage()
  })

  const onGetForums = useCallback(() => {
    const r = orNull('v1KindIndex.edges', data)

    if (r && r.length) {
      Storage.setWithExpired('ForumLove', r)
    }
  })

  const onStartup = useCallback(() => {
    setVariables({
      variables: { filter: {} }
    })
  })

  useEffect(() => onSaveSettingToLocal(), [])
  useEffect(() => onStartup(), [])
  useEffect(() => onGetForums(), [data])

  return (
    <Wrapper>
      <BottomLoveNavigator />
    </Wrapper>
  )
}
const mapStateToProps = state => ({
  auth: state.authen
})

export default compose(
  withTheme,
  connect(
    mapStateToProps,
    null
  ),
  withLazyQuery({
    query: QUERY.listPetAndKind,
    service: GateWay.PET_SERVICE
  })
)(Home)
