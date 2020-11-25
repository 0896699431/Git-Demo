import React, { useState } from 'react'
import { compose } from 'ramda'
import { withTheme } from 'hocs'
import { Header } from 'components'
import { CareItem } from 'modules/Utilities/Wiki/private-components'

import { Wrapper, FlatList } from './styled'

function Question() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  function careItemOnPress(index) {
    setSelectedIndex(index)
  }

  const data = [
    {
      id: 0,
      name: 'Pet Scan là gì?',
      description:
        'Pet Scan là công cụ nhận dạng giống chó, mèo bằng công nghệ AI. Hệ thống sẽ quét ảnh sẵn có hoặc ảnh bạn chụp từ camera để nhận diện ra được giống và hiển thị cho bạn tên giống cụ thể, kèm theo thông tin về giống bao gồm chiều cao, cân nặng trung bình, lịch sử hình thành, cùng các cách chăm sóc, huấn luyện được tư vấn từ chuyên gia.'
    },
    {
      id: 1,
      name: 'Pet Scan hỗ trợ nhận diện những loài vật nào?',
      description:
        'Hiện tại Pet Scan hỗ trợ nhận diện tốt nhất cho các giống chó và mèo. Chúng tôi sẽ thường xuyên cập nhật thông tin các loài khác như chim, chuột, cá,...'
    },
    {
      id: 2,
      name: 'Pet Scan có thu thập dữ liệu người dùng không?',
      description:
        'Không! Việc sử dụng Pet Scan rất an toàn và không thu thập bất cứ dữ liệu nào từ người dùng.'
    },
    {
      id: 3,
      name: 'Tôi thấy thông tin từ Pet Scan không chính xác',
      description:
        'Pet Scan vẫn đang trong giai đoạn phát triển và không đảm bảo độ chính xác 100%. Chúng tôi rất xin lỗi nếu như có thông tin nào chưa chính xác về giống mà bạn cần. Trong trường hợp này, bạn vui lòng gửi email góp ý về hòm thư contact@techfox.io hoặc hot line +843636 422 95. Xin chân thành cảm ơn!'
    }
  ]

  function renderQuesItem({ item, index }) {
    return (
      <CareItem
        item={item}
        index={index}
        collapse={selectedIndex === index}
        onPress={() => careItemOnPress(index)}
      />
    )
  }

  const renderQuestionList = () => {
    return (
      <FlatList
        data={data}
        renderItem={renderQuesItem}
        keyExtractor={(_, index) => index.toString()}
      />
    )
  }

  return (
    <Wrapper>
      <Header title={'Questions'} back icon />
      {renderQuestionList()}
    </Wrapper>
  )
}

export default compose(withTheme)(Question)
