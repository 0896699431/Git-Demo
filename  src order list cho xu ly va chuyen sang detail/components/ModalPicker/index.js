import React, {
  useState,
  forwardRef,
  createRef,
  useEffect,
  useCallback
} from 'react'
import { compose } from 'ramda'
import { withTranslation, withTheme } from 'hocs'

import { KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  Wrapper,
  CompleteText,
  CustomStyle,
  PickerItemText,
  PickerItemView,
  ScrollView,
  Input,
  BackdropElement,
  SearchWrapper,
  SearchInputWrapper,
  Image,
  RowWrapper
} from './styled'

import Modal from 'react-native-modalbox'
import EvilIcon from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Ionicons'

import { Constants } from 'utils'
import * as R from 'ramda'
import { changeAlias } from 'utils/Helpers'

const WrappedModal = forwardRef(function WrappedModal(props, ref) {
  const {
    theme,
    selectedItem,
    items,
    onConfirmed,
    valueKey,
    labelKey,
    title,
    innerRef,
    showSearch,
    isExpandModal,
    onEndreach,
    isReachend,
    onScrollEndDrag,
    onScrollStartDrag,
    onDismiss,
    performFetchSearch,
    imgKey,
    translate,
    isTranslate,
    imgLoveKey
  } = props
  const { colors } = theme

  const iLanguage = R.path([0, valueKey], items)
  const [selected, setSelected] = useState(iLanguage)
  const [keyboardViewHeight, setKeyboardViewHeight] = useState(45)
  const [height, setHeight] = useState(30)
  const [searchText, setSearchText] = useState(items)
  const [searchKey, setSearchKey] = useState('')
  const commentRef = createRef()

  const reSelected = useCallback(() => {
    if (selectedItem) setSelected(selectedItem)
  })

  const onSearchText = useCallback(() => {
    setSearchText(items)
  })

  useEffect(() => onSearchText(), [items])
  useEffect(() => reSelected(), [selectedItem])

  function confirmed(value) {
    setSelected(value)

    if (innerRef && innerRef.current) {
      onConfirmed(value)
      innerRef.current.close()
    }
  }

  function onSetHeightDynamic(e) {
    const { contentSize } = e.nativeEvent

    setHeight(contentSize.height)
    setKeyboardViewHeight(contentSize.height)
  }

  function renderPickerItem(item, index) {
    const value = item.node[valueKey]
    const isSelected = value === selected
    const pickerStyle = {
      fontWeight: isSelected ? '600' : null
    }

    return (
      <PickerItemView
        key={index}
        onPress={() => {
          setSearchText(items)
          confirmed(value)
        }}
      >
        <RowWrapper>
          {imgLoveKey === 'avatar_url' ? (
            <Image
              source={{ uri: item.node[imgLoveKey] }}
              resizeMode={'contain'}
            />
          ) : null}
          {imgKey ? (
            <Image source={{ uri: item.node[imgKey] }} resizeMode={'contain'} />
          ) : null}
          <PickerItemText style={pickerStyle}>
            {isTranslate ? translate(item.node[labelKey]) : item.node[labelKey]}
          </PickerItemText>
        </RowWrapper>
        <EvilIcon name='chevron-small-right' size={25} color={colors.gray_4} />
      </PickerItemView>
    )
  }

  function renderTitle() {
    if (!title) return null

    return <CompleteText>{title}</CompleteText>
  }

  function filterSearch(e) {
    let searchInput = e.toLowerCase()
    searchInput = changeAlias(searchInput)

    const filterSearch = items.filter(d => {
      let searchResult = d[labelKey].toLowerCase()
      searchResult = changeAlias(searchResult)
      return searchText === '' || searchResult.includes(searchInput)
    })

    setSearchText(filterSearch)
  }

  const resetSearchkey = () => {
    setSearchKey('')
  }

  function renderSearchInput() {
    return (
      <SearchWrapper>
        <Icon
          size={35}
          name={'ios-arrow-round-back'}
          color={colors.gray_3}
          onPress={() => innerRef.current.close()}
          style={CustomStyle.arrow}
        />
        <SearchInputWrapper>
          <Input
            style={[
              {
                height: Math.max(45, height)
              }
            ]}
            underlineColorAndroid={'transparent'}
            selectionColor={colors.primary_1}
            placeholder={translate('search')}
            placeholderTextColor={colors.gray_3}
            scrollEnabled
            onContentSizeChange={e => onSetHeightDynamic(e)}
            ref={commentRef}
            blurOnSubmit={false}
            onChangeText={e => {
              if (performFetchSearch) {
                performFetchSearch(e)
              } else {
                filterSearch(e)
              }
              setSearchKey(e)
            }}
            autoCapitalize={'none'}
          />
          {searchKey.length ? (
            <Icon
              name='ios-close-circle'
              size={20}
              color={colors.gray_4}
              onPress={() => {
                filterSearch('')
                resetSearchkey()
                performFetchSearch && performFetchSearch('')
                commentRef.current.clear()
              }}
            />
          ) : null}
        </SearchInputWrapper>
      </SearchWrapper>
    )
  }
  const BDropContent = (
    <BackdropElement
      onPress={() => {
        innerRef.current.close()
        setSearchText(items)
      }}
    />
  )
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }) => {
    const paddingToBottom = 20
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  return (
    <KeyboardAvoidingView
      style={[
        CustomStyle.commentInputWrapper,
        {
          height: Math.max(45, keyboardViewHeight)
        }
      ]}
      behavior={'position'}
      contentContainerStyle={CustomStyle.keyboardStyle}
      enabled
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      >
        <Modal
          style={[
            CustomStyle.modal,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: colors.ui_3D_background,
              maxHeight: isExpandModal
                ? Constants.layout.screenHeight / 1.05
                : 300
            }
          ]}
          position={'bottom'}
          swipeToClose={false}
          coverScreen
          ref={innerRef}
          forwardedRef={ref}
          backdropOpacity={0.5}
          backdropPressToClose
          useNativeDriver
          backdropContent={BDropContent}
          onClosed={onDismiss}
        >
          <Wrapper>{showSearch ? renderSearchInput() : renderTitle()}</Wrapper>
          <KeyboardAwareScrollView
            extraScrollHeight={80}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            enableOnAndroid
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps='always'
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              scrollEventThrottle={400}
              onScrollEndDrag={onScrollEndDrag}
              onScrollStartDrag={onScrollStartDrag}
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent) && isReachend) {
                  onEndreach()
                }
              }}
            >
              {searchText &&
                searchText.map((item, index) => renderPickerItem(item, index))}
            </ScrollView>
          </KeyboardAwareScrollView>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  )
})

export default compose(
  withTheme,
  withTranslation
)(WrappedModal)
