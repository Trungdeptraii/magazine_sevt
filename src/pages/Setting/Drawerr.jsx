import React, {useState, useEffect} from 'react'
import { Drawer, Space, Button, Card, List, Input } from 'antd'
import { useDebounce } from 'use-debounce';

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
  const [dataOrigin, setDataOrigin] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const [textSearch, setTextSeach] = useState("")
  const [valueSearch] = useDebounce(textSearch, 500)
  const onClose = ()=>{
    setOpen(false)
  }
  let name = obj[title]
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