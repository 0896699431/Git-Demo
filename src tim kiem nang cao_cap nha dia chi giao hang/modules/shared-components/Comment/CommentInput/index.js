import React, { useState, createRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { KeyboardAccessoryView } from 'react-native-keyboard-input'

import { compose } from 'ramda'
import GateWay from 'utils/GateWay'
import * as MUTATION from 'modules/Forum/Article/mutation'

import {
  Wrapper,
  InputWrapper,
  Input,
  CustomStyle,
  TouchableOpacity
} from './styled'
import { Routes } from 'utils'
import { orBoolean } from 'utils/Selector'
import { withTheme, withMutation, withTranslation, withUser } from 'hocs'

import { useNavigation } from '@react-navigation/native'

function CommentInput (props) {
  const {
    theme,
    mutate,
    refetch,
    commentableId,
    commentableType,
    user,
    translate,
    commentText,
    isEdit,
    setEdit,
    setEditText,
    getUpdateCommentText
  } = props
  const { colors } = theme
  const [commentTxt, setCommentTxt] = useState('')
  const textInputRef = createRef()
  const navigation = useNavigation()
  useEffect(() => {
    if (commentText && commentText.length) {
      setCommentTxt(commentText)
    } else {
      setCommentTxt('')
    }
  }, [commentText])

  const [customKeyboard, setCustomKeyboard] = useState({
    component: undefined,
    initialProps: undefined
  })
  const TrackInteractive = true

  function onComment () {
    if (isEdit && commentText.length) {
      getUpdateCommentText(commentTxt)
      setEdit(false)
      setEditText('')
    } else {
      mutate({
        variables: {
          title: '',
          comment: commentTxt,
          commentable_type: commentableType,
          commentable_id: commentableId
        },
        fetchPolicy: 'no-cache',
        awaitRefetchQueries: true,
        refetchQueries: () => refetch()
      })
    }
  }

  const renderInput = () => {
    const userId = orBoolean('id', user)
    return (
      <InputWrapper
        onPress={() => {
          navigation.navigate(Routes.loginModal)
        }}
        disabled={!!userId}
      >
        <Input
          ref={textInputRef}
          placeholder={`${translate('writeComment')}...`}
          placeholderTextColor={colors.gray_2}
          underlineColorAndroid='transparent'
          onChangeText={txt => setCommentTxt(txt)}
          blurOnSubmit={false}
          multiline
          maxHeight={180}
          value={commentTxt}
        />

        <TouchableOpacity
          disabled={!commentTxt.length || !userId}
          onPress={() => {
            setCommentTxt('')
            onComment()
            // Keyboard.dismiss()
          }}
        >
          <Icon
            name='md-send'
            color={commentTxt.length ? colors.red : colors.gray_3}
            size={25}
            style={CustomStyle.sendIcon}
          />
        </TouchableOpacity>
      </InputWrapper>
    )
  }

  function onKeyboardResigned () {
    setCustomKeyboard({})
  }

  const renderComment = () => {
    return (
      <KeyboardAccessoryView
        renderContent={renderInput}
        trackInteractive={TrackInteractive}
        kbInputRef={textInputRef}
        kbComponent={customKeyboard.component}
        kbInitialProps={customKeyboard.initialProps}
        onKeyboardResigned={() => onKeyboardResigned()}
        revealKeyboardInteractive
      />
    )
  }

  return <Wrapper>{renderComment()}</Wrapper>
}

export default compose(
  withTheme,
  withTranslation,
  withUser,
  withMutation({
    mutation: MUTATION.v1CreateComment,
    service: GateWay.REACTION_SERVICE
  })
)(CommentInput)
