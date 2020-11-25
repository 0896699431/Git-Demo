import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import { useNavigation } from '@react-navigation/native'
import { withLazyQuery, withTheme, withTranslation } from 'hocs'
import { GateWay, Routes, Constants } from 'utils'
import { CircleLoading } from 'components'
import { orObject, orArray } from 'utils/Selector'
import * as QUERY from '../../../query'
import Model from '../../../model'

import {
  Wrapper,
  Status,
  FollowingItemWrapper,
  UserSideWrapper,
  UserName,
  UserImg,
  FollowingStatusWrapper,
  FollowingStatusBtn,
  FlatList,
  styles
} from './styled'

function Following ({
  data,
  fetchMore,
  user,
  setVariables,
  translate,
  refetch,
  isFocused
}) {
  const navigation = useNavigation()

  const [followings, setFollowings] = useState([])
  const [meta, setMeta] = useState(Constants.meta)
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)

  const record = Model(data)
  const rows = record.getFollowing(data)

  function getFollowings () {
    setVariables({
      page: 1,
      filter: { user_id_eq: user.id, followable_type_eq: 'User' }
    })
  }
  useEffect(() => {
    getFollowings()
  }, [])

  useEffect(() => {
    if (isFocused && refetch) {
      refetch()
    }
  }, [isFocused])

  useEffect(() => {
    if (rows.length) {
      setMeta(orObject('v1FollowingIndex.meta', data))
      setFollowings(rows)
    } else {
      setFollowings([])
    }
  }, [data.v1FollowingIndex])

  function keyExtractor (index) {
    return `FollowingList--->${index}`
  }

  function handleLoadMore () {
    if (meta.next_page && user) {
      setLoadingLoadMore(true)
      fetchMore({
        query: QUERY.v1FollowingIndex,
        variables: {
          page: meta.next_page,
          filter: { user_id_eq: user.id, followable_type_eq: 'User' }
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev

          setLoadingLoadMore(false)
          setMeta(orObject('v1FollowingIndex.meta', fetchMoreResult))
          setFollowings(
            followings.concat(
              orArray('v1FollowingIndex.edges', fetchMoreResult)
            )
          )
        }
      })
    }
  }

  const renderFollowItem = ({ node }) => {
    const { user } = node

    return (
      <FollowingItemWrapper>
        <UserSideWrapper
          onPress={() =>
            navigation.navigate(Routes.profile, { userId: user.id })
          }
        >
          <UserImg
            source={{
              uri: user.avatar_url
            }}
          />
          <UserName>{user.name}</UserName>
        </UserSideWrapper>
        <FollowingStatusWrapper>
          <FollowingStatusBtn>
            <Status>{translate('following')}</Status>
          </FollowingStatusBtn>

          {/* <TouchableOpacity>
            <Icon
              name='dots-three-horizontal'
              color={theme.colors.darkGray}
              size={18}
            />
          </TouchableOpacity> */}
        </FollowingStatusWrapper>
      </FollowingItemWrapper>
    )
  }

  const renderFooter = () => {
    if (loadingLoadMore) {
      return (
        <CircleLoading
          isVisible={loadingLoadMore}
          size={60}
          type={'ThreeBounce'}
        />
      )
    }
    return null
  }

  return (
    <Wrapper>
      <FlatList
        data={followings}
        renderItem={({ item, index }) => renderFollowItem(item, index)}
        keyExtractor={(item, index) => keyExtractor(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}
        onEndReachedThreshold={0.01}
        onEndReached={handleLoadMore}
        ListFooterComponent={() => renderFooter()}
        ListFooterComponentStyle={styles.footer}
      />
    </Wrapper>
  )
}

export default compose(
  withLazyQuery({
    query: QUERY.v1FollowingIndex,
    service: GateWay.REACTION_SERVICE
  }),
  withTheme,
  withTranslation
)(Following)
