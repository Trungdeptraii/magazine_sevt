import React from 'react'
import { Drawer, Space, Button, Card, List } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

let obj = {
  jig_get_45: "Các model gắp Jig Line 45",
  jig_get_46: "Các model gắp Jig Line 46",
  jig_return_45: "Các model nhả Jig Line 45",
  jig_return_46: "Các model nhả Jig Line 46",
  magazine_load_45: "Các chiều cao load Magazine Line 45",
  magazine_load_46: "Các chiều cao load Magazine Line 46",
  magazine_unload_45: "Các chiều cao unload Magazine Line 45",
  magazine_unload_46: "Các chiều cao load Magazine Line 46",
}

const Drawerr = ({open, setOpen, arrPoint, onChoose, title, type}) => {
  const onClose = ()=>{
    setOpen(false)
  }
  name = obj[title]
  return (
    <Drawer
      title={name}
      placement="right"
      size={'300px'}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>Thoát</Button>
        </Space>
      }
      >
        <div id="scrollableDiv"
            style={{
            height: '100%',
            overflowY: 'auto',
        }}>
            <InfiniteScroll dataLength={arrPoint} scrollableTarget="scrollableDiv" style={{overflow: 'unset'}}>    
                <List
                    grid={{
                    gutter: 16,
                    column: 1,
                    }}
                    dataSource={arrPoint}
                    renderItem={(item, index) => (
                    <List.Item style={{display: 'flex', gap: '15px'}}>
                      <Card style={{flex: 1, fontSize: '16px', fontWeight: 600}}>{item.name}</Card>
                        <Button onClick={()=>{onChoose(item, title, type)}} style={{height: '72px', display: 'block', fontWeight: 600, backgroundColor: 'orange'}}>Chọn</Button>
                    </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    </Drawer>
  )
}

export default Drawerr