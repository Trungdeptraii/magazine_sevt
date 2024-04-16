import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Space, Table, Tag, Button, Popconfirm, message, Input, ConfigProvider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import FormRelocation from './FormRelocation';
import { FetchAPI } from '../../utils/api';
import { hostServerAPI, portServerAPI, pathRelocation, hostJS, portJS, pageSizeRelocation, pathRelocationJS } from '../../assets/js/avaribale';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import LocationAMR from './LocationAMR';
import Loadding from '../Loadding/Loadding';
import { TitleField } from '../../assets/js/globalStyle';
import { RelocationContant } from './relocationn';
import {toast} from "react-toastify"
import { handleDisabledButton } from '../Home/homee';

let handleDeletePoint, handleEditPoint, handleRelocation

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    width: '5%',
    render: (text)=><b>{text}</b>,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    width: '20%',
    key: 'name',
  },
  {
    title: 'Tọa độ x (m)',
    dataIndex: 'x',
    width: '15%',
    key: 'x',
  },
  {
    title: 'Tọa độ y (m)',
    dataIndex: 'y',
    width: '15%',
    key: 'y',
  },
  {
    title: 'Tọa độ góc (°)',
    dataIndex: 'angle',
    width: '15%',
    key: 'angle',
  },
  {
    title: 'Bán kính (m)',
    dataIndex: 'radius',
    width: '5%',
    key: 'radius',
  },
  {
    title: 'Chức năng',
    key: 'action',
    width: '20%',
    render: (_, record) => (
      <Space size="middle">
        <Button size='large' type='primary' style={{fontWeight: 600}} onClick={(e)=>{handleRelocation(record, e)}}>Relocation</Button>
        <Button size='large' onClick={(e)=>{handleEditPoint(record.id, record.name,e)}} style={{backgroundColor: 'blue', color: 'white', fontWeight: 600}}>Sửa</Button>
        <ConfigProvider
          button={{
            style: {
              width: 80,
              height: 40,
              margin: 4,
          },
          }}
        >
          <Popconfirm
            title="Xóa điểm di chuyển"
            description={` Bạn có muốn xóa vị trí ${record.name} không ?`}
            onConfirm={()=>{handleDeletePoint(record.id,record.name)}}
            okText="Yes"
            cancelText="No"
            placement='topRight'
          >
            <Button size='large' style={{backgroundColor: 'orange', color: 'white', fontWeight: 600}}>Xóa</Button>
          </Popconfirm>
        </ConfigProvider>
      </Space>
    ),
  },
];
const Relocation = ()=>{
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({data: [], length: 0});
  const [title, setTitle] = useState('');
  let [editPoint, setEditPoint] = useState("");
  const [searchRelocation, setSearchRelocation] = useState("");
  const [textRelocation] = useDebounce(searchRelocation, 500)
  const [showRelocation, setShowRelocation] = useState([])
  const [loadding, setLoadding] = useState()

  const dispath = useDispatch();

  const handleCreatePoint = ()=>{
    setTitle('Tạo vị trí Relocation')
    setEditPoint("")
    setShowForm(!showForm)
  }
  handleRelocation = async(record, e)=>{
    handleDisabledButton(e)
    let data = {}
    let {x, y, angle, radius} = record;
    data.x = x;
    data.y = y;
    data.angle = angle;
    data.radius = radius;
    let {type} = await FetchAPI({method: 'POST',host: hostServerAPI, port: portServerAPI,path: pathRelocation,data: {type: 'relocation', data}})
    if(type == "fail"){
      toast.warning("Gửi lệnh thất bại...")
    }else if(type == "error"){
      toast.error("Không có phản hồi từ server...")
    }
  }
  handleDeletePoint = async(id, name)=>{
    setLoadding(true)
    let {type} = await FetchAPI({method: 'DELETE',host: hostJS, port: portJS,path: `${pathRelocationJS}/${id}`})
    if(type == "succees"){
      toast.success(`Xóa vị trí Relocation ${name} thành công...`)
      setData({...data, length: +data.length+1})
      setLoadding(false)
      return
    }else if(type == "fail"){
      toast.warning("Gửi lệnh thất bại...")
    }else if(type == "error"){
      toast.error("Không có phản hồi từ server...")
    }
    setLoadding(false)
  }
  handleEditPoint = async(id, name, e)=>{
    handleDisabledButton(e)
    setLoadding(true)
    let {type, data} = await FetchAPI({method: 'GET',host: hostJS, port: portJS,path: `${pathRelocationJS}/${id}`})
    if(type == 'succees'){
      setShowForm(!showForm)
      setEditPoint(data)
      setTitle('Chỉnh sửa vị trí Relocation')
      setLoadding(false)
      return
    }else if(type == "fail"){
      toast.warning("Gửi lệnh thất bại...")
    }else if(type == "error"){
      toast.error("Không có phản hồi từ server...")
    }
    setLoadding(false)
  }

  const getPoint = useCallback(async()=>{
      let {data} = await FetchAPI({path: pathRelocationJS, port: portJS, host: hostJS})
      if(data.length){
        data.forEach((el,index)=>el.stt=index+1)
        dispath({type: 'relocation/update', payload: data})
        setData({...data, data: data})
        setShowRelocation(data)
      }else{
        setData({data: [], length: 0})
        setShowRelocation([])
      }
  }, [])
  useEffect(()=>{
    getPoint()
  }, [data.length])
  const onFetch = async ({host= hostJS, port= portJS, method='', data= '', path=''})=>{
    setLoadding(true)
    let result = await FetchAPI({host, port, method, data, path})
    setData({...data, length: +data.length+1})
    setLoadding(false)
    return result
  }
  const onCancel = ()=>{
    setShowForm(!showForm)
  }
  const handleClearSearchRelocation = ()=>{
    setSearchRelocation("");
  }
  const handleSearchRelocation = (e)=>{
    setSearchRelocation(e.target.value);
  }
  useEffect(()=>{
    if(data.data.length){
      if(!textRelocation){
        setShowRelocation(data.data)
      }else{
        let data = showRelocation.filter((el)=>el.name.toLowerCase().includes(searchRelocation.toLowerCase()));
        if(data.length){
          setShowRelocation(data)
        }else{
          setShowRelocation([])
        }
      }
    }
  },[textRelocation.length])
  return(
    <>
      <TitleField>Điểm lấy lại vị trí</TitleField>
      <LocationAMR />
      <div style={{display: "flex", gap: '15px', height: '40px', margin: '5px 5px 0 0', }}>
        <Button type="primary" size='large' onClick={handleCreatePoint}>Tạo Relocation</Button>
        <Input placeholder='Tìm vị trí Relocation'onChange={handleSearchRelocation} value={searchRelocation} style={{fontSize: 16}}/>
        <Button size="large" onClick={handleClearSearchRelocation}>Clear</Button>
      </div>
      {
        showForm ? <FormRelocation onFetch={onFetch} onCancel={onCancel} title={title} editPoint={editPoint} onResetPoint={setEditPoint}/>: ''
      }
      <TitleField>Các vị trí Relocation đã tạo</TitleField>
      <RelocationContant>
        <Table columns={columns} dataSource={showRelocation} pagination={{
          defaultCurrent: 1,
          pageSize: pageSizeRelocation
        }}/>
      </RelocationContant>
      {
        loadding ?<Loadding /> : ""
      }
    </>
  )
};
export default Relocation;