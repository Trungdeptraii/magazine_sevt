import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Drawer, Space, Button, Card, List, Input, message } from 'antd'
import { ContainerAddPoint, LayoutAddPoint } from '.';
import { useDebounce } from 'use-debounce';
import { TitleField } from '../../assets/js/globalStyle';
import {toast} from "react-toastify"

const AddPoint = ({arrPoint, monitor, setMonitor, setOpen, open}) => {
    const [searchPoint, setSearchPoint] = useState("");
    const [textPoint] = useDebounce(searchPoint, 500)
    const [showPoint, setShowPoint] = useState([])
    const onAdd = (item)=>{
        toast.success(`Đã thêm điểm ${item.name}`)
        setMonitor({...monitor, point: monitor.point.concat(item)})
    }
    const onClose = ()=>{
        setOpen(false)
    }
    const handleAddPoint = (e)=>{
        setSearchPoint(e.target.value)
    }
    const handleClearSearchPoint = ()=>{
        setSearchPoint("")
    }
    useEffect(()=>{
        setShowPoint(arrPoint)
    }, [])
    useEffect(()=>{
        if(arrPoint.length){
            if(!textPoint){
              setShowPoint(arrPoint)
            }else{
              let data = arrPoint.filter((el)=>el.name.toLowerCase().includes(textPoint.toLowerCase()));
              if(data.length){
                setShowPoint(data)
              }else{
                setShowPoint([])
              }
            }
          }
    }, [textPoint.length])
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
        <ContainerAddPoint>
            <TitleField style={{textAlign: "center"}}>Thêm điểm di chuyển</TitleField>
            <div style={{display: "flex", gap: "15px", margin: "0 16px 10px 16px"}}>
                <Input placeholder='Nhập tên điểm'onChange={handleAddPoint} value={searchPoint}/>
                <Button size="large" onClick={handleClearSearchPoint}>Clear</Button>
            </div>
            <div id="scrollableDiv"
                style={{
                padding: '5px 16px',
                overflowY: 'auto',
                flex: 1,
                height: '75vh',
                marginBottom: 10
            }}>
                <InfiniteScroll dataLength={arrPoint} scrollableTarget="scrollableDiv" style={{overflow: 'none'}}>    
                    <List
                        grid={{
                        gutter: 16,
                        column: 1,
                        }}
                        dataSource={showPoint}
                        renderItem={(item) => (
                        <List.Item style={{display: 'flex', gap: '15px'}}>
                            <Card style={{flex: 1, fontSize: '16px', fontWeight: 600}}>{item.name}
                            </Card>
                            <Button onClick={()=>{onAdd(item)}} style={{height: '72px', display: 'block', fontWeight: 600, backgroundColor: 'orange'}}>Thêm</Button>
                        </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </ContainerAddPoint>
    </Drawer>
  )
}

export default AddPoint