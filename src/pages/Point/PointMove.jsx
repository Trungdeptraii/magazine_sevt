import React, { useEffect, useState, useRef, useTransition } from 'react';
import { Space, Table, Tag, Button, Popconfirm, Input, ConfigProvider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import FormCreatePoint from './FormCreatePoint';
import { FetchAPI } from '../../utils/api';
import { hostJS, pageSizePoint, pathPointJS, portJS } from '../../assets/js/avaribale';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { LayoutForm, checkDeletePoint } from './form';
import Loadding from '../Loadding/Loadding';
import { TitleField } from '../../assets/js/globalStyle';
import {toast} from "react-toastify"

let handleDeletePoint, handleEditPoint
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
    key: 'name',
  },
  {
    title: 'Điểm LM',
    dataIndex: 'point',
    width: '30%',
    key: 'point',
  },
  {
    title: 'Chỉnh',
    key: 'action',
    width: '20%',
    render: (_, record) => (
      <Space size="middle">
        <Button size="large" onClick={()=>{handleEditPoint(record.id, record.name)}} style={{backgroundColor: 'blue', color: 'white', fontWeight: 600}}>Sửa</Button>
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
            description={` Bạn có muốn xóa điểm ${record.name} không ?`}
            onConfirm={()=>{handleDeletePoint(record.id,record.name)}}
            okText="Xóa"
            cancelText="Hủy"
            placement='topRight'
          >
            <Button size="large" style={{backgroundColor: 'orange', color: 'white', fontWeight: 600}}>Xóa</Button>
          </Popconfirm>
        </ConfigProvider>
      </Space>
    ),
  },
];
const PointMove = ({pageSize})=>{
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({data: [], length: 0});
  const [title, setTitle] = useState('');
  const [editPoint, setEditPoint] = useState({name: '', point: ''});
  const dispath = useDispatch();
  const [showPoint, setShowPoint] = useState([]);
  const [searchPoint, setSearchPoint] = useState("");
  const [textPoint] = useDebounce(searchPoint, 500)
  const [loadding, setLoadding] = useState(false)
  const [pointDelete, setPointDelete] = useState([])

  const handleCreatePoint = ()=>{
    setTitle('Tạo điểm di chuyển')
    setShowForm(!showForm)
  }
  handleDeletePoint = async(id, name)=>{
    if(pointDelete.includes(name)){
      return toast.warning(`Điểm ${name} đang được chọn trong cấu hình không thể xóa !!!`)
    }
    setLoadding(true)
    if(await FetchAPI({method: 'DELETE',host: hostJS, port: portJS,path: `${pathPointJS}/${id}`})){
      toast.success(`Xóa điểm ${name} thành công...`)
      setData({...data, length: +data.length+1})
      setLoadding(false)
      return
    }
    toast.error(`Xóa điểm ${name} thất bại...`)
    setLoadding(false)
  }
  handleEditPoint = async(id, name)=>{
    let {type, data} = await FetchAPI({method: 'GET',host: hostJS, port: portJS,path: `${pathPointJS}/${id}`})
    if(type == 'succees'){
      setShowForm(!showForm)
      setEditPoint(data)
      setTitle('Chỉnh sửa điểm di chuyển')
      return
    }
    toast.error(`Lấy thông tin điểm ${name} thất bại...`)
  }

  const getPoint = async()=>{
    let {type, data} = await FetchAPI({path:pathPointJS, port: portJS, host: hostJS})
    if(type == 'succees'){
      if(data.length){
        data = data.reverse()
        data.forEach((el,index)=>el.stt=index+1)
        dispath({type: 'point/update', payload: data})
        setData({...data, data: data})
        setShowPoint(data)
      }else{
        setData({data: [], length: 0})
        setShowPoint([])
      }
    }else{
      toast.error(` Lấy dữ liệu không thành công`)
    }
  }
  useEffect(()=>{
    getPoint()
  }, [data.length])

  useEffect(()=>{
    checkDeletePoint(setPointDelete)
  },[])
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
  const handleSearchPoint = (e)=>{
    setSearchPoint(e.target.value)
  }
  const handleClearSearchPoint = async()=>{
    setSearchPoint('')
    setData({...data, length: data.length + 1})
  }
  useEffect(()=>{
    if(data.data.length){
      if(!textPoint){
        setShowPoint(data.data)
      }else{
        let data = showPoint.filter((el)=>el.name.toLowerCase().includes(searchPoint.toLowerCase()));
        if(data.length){
          setShowPoint(data)
        }else{
          setShowPoint([])
        }
      }
    }
  },[textPoint.length])
  return(
    <>
      {
        pageSize ? "": <TitleField>Điểm di chuyển</TitleField>
      }
      <div style={{display: "flex", gap: '15px', padding: "0 10px 0 0"}}>
        <Button type="primary" size='large' onClick={handleCreatePoint}>Tạo điểm</Button>
        <Input name="point" placeholder='Tìm điểm'onChange={handleSearchPoint} value={searchPoint}/>
        <Button size="large" onClick={handleClearSearchPoint}>Clear</Button>
      </div>
      {
        showForm ? <FormCreatePoint onFetch={onFetch} onCancel={onCancel} title={title} editPoint={editPoint} onResetPoint={setEditPoint}/>: ''
      }
      <TitleField>Các điểm đã tạo</TitleField>
      <Table columns={columns} dataSource={showPoint} pagination={{
        defaultCurrent: 1,
        pageSize: pageSize ? pageSize : pageSizePoint
      }}/>
      {
        loadding ? <Loadding /> : ""
      }
    </>
  )
};
export default PointMove;