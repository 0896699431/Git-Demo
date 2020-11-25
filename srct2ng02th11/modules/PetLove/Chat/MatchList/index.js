import React, { useState, useEffect, useCallback } from 'react'
import { compose } from 'ramda'
import SearchIcon from 'react-native-vector-icons/Feather'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import { withTheme, withLazyQuery } from 'hocs'
import { orNull } from 'utils/Selector'
import { useDebounce } from 'utils/Helpers'

import {
  Wrapper,
  Text,
  FlatList,
  MatchItemWrapper,
  Avatar,
  UserName,
  SearchWrapper,
  SearchInput,
  MatchContainer,
  NotMatchWrapper,
  NotMatch
} from './styled'
import { GateWay, Routes, Constants } from 'utils'

import * as QUERY from '../../query'
import Model from '../../model'
import Chat from 'api/Chat'
import { connect } from 'react-redux'

function MatchList({ data, setVariables, theme, auth, refetch }) {
  const { confidentialInfo } = auth

  const record = Model(data)
  const { matchList } = record
  const { colors } = theme
  const navigation = useNavigation()

  const [matches, setMatches] = useState([])
  const [meta, setMeta] = useState(Constants.meta)
  const [searchKey, setSearchKey] = useState('')
  const searchDebounce = useDebounce(searchKey, 500)
  const isFocused = useIsFocused()

  const onGetData = useCallback(() => {
    if (matchList.meta.current_page && matchList.edges) {
      const newMatches = matchList.edges

      if (matchList.meta.current_page === 1) {
        setMatches(newMatches)
      } else {
        const listNewMatches = matches.concat(newMatches)
        setMatches(listNewMatches)
      }
      setMeta(matchList.meta)
    }
  })

  function onGetDarlingMatch(page = 1) {
    setVariables({
      variables: {
        filter: {
          name_matches: `%${searchKey}%`
        },
        page
      },
      fetchPolicy: 'no-cache'
    })
  }

  const onFocused = useCallback(() => {
    if (isFocused) {
      onGetDarlingMatch()

      if (refetch) {
        refetch()
      }
    }
  })

  useEffect(() => onGetData(), [matchList.edges])
  useEffect(() => onFocused(), [isFocused])

  function keyExtractor(index) {
    return `MatchListing--->${index}`
  }

  const renderMatchItem = ({ item }) => {
    const { avatar_url, name, id } = item.node

    return (
      <MatchItemWrapper
        onPress={() => {
          const petInfo = {
            id,
            uid: orNull('user.uid', item.node),
            name: item.node.name,
            photoURL: avatar_url,
            notificationTokens: confidentialInfo.deviceToken
          }
          Chat.setPetInfo(petInfo)

          navigation.navigate(Routes.chatLoveDetail, {
            selectedUsers: [
              {
                name: name,
                uid: orNull('user.uid', item.node),
                photoURL: avatar_url
              }
            ],
            ownerUid: Chat.currentUser.uid,
            partnerID: id
          })
        }}
      >
        <MatchContainer shadowType={4}>
          <Avatar source={{ uri: avatar_url }} />
        </MatchContainer>
        <UserName ellipsizeMode={'tail'} numberOfLines={1}>
          {name}
        </UserName>
      </MatchItemWrapper>
    )
  }

  function handleLoadmore() {
    if (orNull('next_page', meta)) {
      onGetDarlingMatch(orNull('next_page', meta))
    }
  }

  const renderMatchList = () => {
    return (
      <FlatList
        data={matches}
        renderItem={renderMatchItem}
        keyExtractor={(item, index) => keyExtractor(index)}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={0.02}
        horizontal
        onEndReached={handleLoadmore}
      />
    )
  }

  useEffect(() => {
    if (onGetDarlingMatch) onGetDarlingMatch()
  }, [searchDebounce])

  const renderSearchInput = () => {
    return (
      <SearchWrapper>
        <SearchIcon name='search' color={colors.gray_3} size={18} />
        <SearchInput
          underlineColorAndroid={'transparent'}
          placeholderTextColor={colors.gray_3}
          placeholder={'Search...'}
          onChangeText={val => setSearchKey(val)}
        />
      </SearchWrapper>
    )
  }

  const renderNotMatch = () => {
    return (
      <NotMatchWrapper onPress={() => navigation.navigate(Routes.swipeLove)}>
        <NotMatch>Bạn chưa match ai! Khám phá Pet love tiếp nào</NotMatch>
      </NotMatchWrapper>
    )
  }

  return (
    <Wrapper matchHeight={matches.length}>
      {renderSearchInput()}
      <Text>New Matches</Text>
      {matches.length ? renderMatchList() : renderNotMatch()}
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
    query: QUERY.v1PetMatching,
    service: GateWay.PET_SERVICE
  })
)(MatchList)
