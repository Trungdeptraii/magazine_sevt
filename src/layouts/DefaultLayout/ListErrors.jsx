import React from 'react'
import {Drawer, List, Space, Button} from "antd" 
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'date-fns';

const dataList = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const ListErrors = ({data, open, setOpen}) => {
  return (
    <Drawer
        title={`Danh sách lỗi`}
        placement="right"
        size={'300px'}
        onClose={()=>setOpen(false)}
        open={open}
        className='draw-header'
        extra={
        <Space>
            <Button onClick={()=>setOpen(false)}>Thoát</Button>
        </Space>
        }
    >
        <div id="scrollableDiv"
            style={{
            padding: '5px 0',
            overflowY: 'auto',
            flex: 1,
            height: '85vh',
            marginBottom: 10
        }}>
            <InfiniteScroll dataLength={data} scrollableTarget="scrollableDiv" style={{overflow: 'none'}}>
                <List 
                    bordered
                    dataSource={data}
                    renderItem={({time, mess}) => <List.Item>
                        <List.Item.Meta 
                            // title={format(new Date(time), "HH:mm:ss")}
                            description={mess}
                        />
                    </List.Item>}
                />
            </InfiniteScroll>
        </div>
    </Drawer>
  )
}

export default ListErrors
