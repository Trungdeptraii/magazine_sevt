import React, { memo } from 'react'
import { Drawer, Space, Button, Card, List } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

const Drawerr = ({open, setOpen, arrPoint, onChoose}) => {
    const onClose = ()=>{
      setOpen(false)
    }
  return (
    <Drawer
      title={`Các điểm đã thêm`}
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
            padding: '5px 16px',
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
                      <Card style={{flex: 1, fontSize: '16px', fontWeight: 600}}>{item}</Card>
                        <Button onClick={()=>{onChoose(item)}} style={{height: '72px', display: 'block', fontWeight: 600, backgroundColor: 'orange'}}>Chọn</Button>
                    </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    </Drawer>
  )
}

export default memo(Drawerr)