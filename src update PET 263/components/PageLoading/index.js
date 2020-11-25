import React from 'react'
import {
  Wrapper,
  ItemWrapper,
  Row,
  ListAvatar,
  TextWrapper,
  ContentLoadingWrapper,
  Line,
  ContentAvatar,
  Thumb,
  Column,
  CenterWrapper
} from './styled'
import { withTheme } from 'hocs'

function PageLoading(props) {
  const { isList, showAvatar } = props

  function renderListLoading() {
    if (showAvatar)
      return (
        <Wrapper>
          {[1, 2, 3].map(item => (
            <ItemWrapper key={`${item}`}>
              <Row>
                <ListAvatar />
                <TextWrapper width={'40%'} />
              </Row>
              <Row>
                <TextWrapper />
              </Row>
            </ItemWrapper>
          ))}
        </Wrapper>
      )

    return (
      <Wrapper>
        {[1, 2, 3].map(item => (
          <ItemWrapper key={`${item}`}>
            <Row>
              <Thumb />
              <Column>
                <Row>
                  <TextWrapper width={'40%'} />
                </Row>
                <TextWrapper width={'80%'} />
              </Column>
            </Row>
            <Row>
              <TextWrapper />
            </Row>
          </ItemWrapper>
        ))}
      </Wrapper>
    )
  }

  function renderContentLoading() {
    return (
      <Wrapper>
        <ContentLoadingWrapper>
          <CenterWrapper>
            <ContentAvatar />
            <Row>
              <TextWrapper width={'40%'} />
              <TextWrapper width={'10%'} marginLeft={10} />
            </Row>
            <Row>
              <TextWrapper width={'40%'} />
              <TextWrapper width={'30%'} marginLeft={10} />
            </Row>
          </CenterWrapper>
          <Line />
          <CenterWrapper>
            <Row>
              <TextWrapper width={'30%'} />
              <TextWrapper width={'50%'} marginLeft={10} />
            </Row>
            <Row>
              <TextWrapper width={'60%'} />
              <TextWrapper width={'20%'} marginLeft={10} />
            </Row>
            <Row>
              <TextWrapper />
            </Row>
          </CenterWrapper>
        </ContentLoadingWrapper>
      </Wrapper>
    )
  }

  return isList ? renderListLoading() : renderContentLoading()
}

export default withTheme(PageLoading)
