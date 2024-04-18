import React, { memo, useEffect, useState } from 'react'
import { Drawer, Space, Button, Card, List, Input } from 'antd'
import { useDebounce } from 'use-debounce';
import InfiniteScroll from 'react-infinite-scroll-component'

const Drawerr = ({open, setOpen, arrPoint=[], onChoose}) => {
  const [dataOrigin, setDataOrigin] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const [textSearch, setTextSeach] = useState("")
  const [valueSearch] = useDebounce(textSearch, 500)
  const onClose = ()=>{
    setOpen(false)
  }
  useEffect(()=>{
    setDataOrigin(arrPoint)
    setDataSearch(arrPoint)
  }, [arrPoint.length])
  const handleSearch = (e)=>{
    setTextSeach(e.target.value)
  }
  useEffect(()=>{
    if(valueSearch.length){
      let result = dataOrigin.filter(({name})=>name.toLowerCase().includes(valueSearch.toLowerCase()))
      setDataSearch(result)
    }else{
      setDataSearch(dataOrigin)
    }
    
  },[valueSearch])
  const handleClear = ()=>{
    setTextSeach("")
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
          <div style={{display: "flex", height: 50, gap: 10, marginBottom: 10}}>
            <Input placeholder='Bạn muốn tìm...' size='larger' style={{fontSize: 18, flex: 1}} onChange={handleSearch} value={textSearch} autoFocus={true}/>
            <Button size='larger' style={{height: 50, fontSize: 18, width: 65}} onClick={handleClear}>Xóa</Button>
          </div>
          <InfiniteScroll dataLength={dataSearch} scrollableTarget="scrollableDiv" style={{overflow: 'unset'}}>    
            <List
              grid={{
              gutter: 16,
              column: 1,
              }}
              dataSource={dataSearch}
              renderItem={(item, index) => (
              <List.Item style={{display: 'flex', gap: '15px'}}>
                <Card style={{flex: 1, fontSize: '16px', fontWeight: 600}}>{item.name}</Card>
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