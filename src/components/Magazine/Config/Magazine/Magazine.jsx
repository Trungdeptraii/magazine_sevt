import React, {useState, useCallback, useEffect} from 'react'
import { Radio, Space, Button, Table, ConfigProvider, Popconfirm, message } from 'antd'
import MagazineForm from './MagazineForm'
import {PlusCircleFilled } from '@ant-design/icons';
import { FetchAPI } from '../../../../utils/api';
import { hostJS, portJS } from '../../../../assets/js/avaribale';
import { initialState } from './magazine_';
import {toast} from "react-toastify"
import { checkDeleteModel } from '../Jig/jig_';

const Magazine = () => {
    let [magazine, setMagazine] = useState("load")
    let [line, setLine] = useState("45")
    let [magazineLine, setMagazineLine] = useState("load_45")
    let [title, setTitle] = useState("Tạo")
    let [dataTable, setDataTable] = useState([])
    let [showForm, setShowForm] = useState(false)
    const [pointDelete, setPointDelete] = useState([])

    let onChangeMagazine = (e)=>{
        setMagazine(e.target.value)
        setMagazineLine(`${e.target.value}_${line}`)
    }
    let onChangeLine = (e)=>{
        setLine(e.target.value)
        setMagazineLine(`${magazine}_${e.target.value}`)
    }
    // Start Form
    const [editPoint, setEditPoint] = useState(initialState)
    const handleHiddenForm = useCallback(()=>{
        setShowForm(false)
    }, [])
    const handleShowForm = useCallback(()=>{
      setEditPoint(initialState)
      setShowForm(true)
      setTitle("Tạo")
    }, [])
    // End Form
    const getMagazineLine = useCallback(async()=>{
       let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `magazine_${magazineLine}`})
        if(type == "succees"){
            data = data.map((item)=>{
              if(item.floor1_conveyor == "cw"){
                item.floor1_conveyor = "Quay thuận"
              }else if(item.floor1_conveyor == "ccw"){
                item.floor1_conveyor = "Quay nghịch"
              }
              if(item.floor2_conveyor == "cw"){
                item.floor2_conveyor = "Quay thuận"
              }else if(item.floor2_conveyor == "ccw"){
                item.floor2_conveyor = "Quay nghịch"
              }
              return item
            })
            setDataTable(data.reverse())
        }else {
            setDataTable([])
        }
    }, [magazineLine])
    const handleDeleteMagazine = async(id, name)=>{
      if(pointDelete.includes(id)){
        return toast.warning(`Magazine ${name} đang được chọn trong cấu hình không thể xóa !!!`)
      }
      let {type} = await FetchAPI({method: "DELETE", host: hostJS, port: portJS, path: `magazine_${magazineLine}/${id}`})
      if(type == "succees"){
        toast.success(`Xóa ${name} thành công...`)
        getMagazineLine()
      }else if(type == "fail"){
        toast.warning(" Dữ liệu không đúng hãy kiểm tra lại")
      }else if(type == "error"){
        toast.error(`Xóa ${name} thất bại, không có tín hiệu từ server`)
      }
    }
    const handleEditMagazine = async(id, name)=>{
      let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: `magazine_${magazineLine}/${id}`})
      if(type == "succees"){
        setEditPoint(data)
        setShowForm(true)
        setTitle("Chỉnh sửa")
      }else if(type == "fail"){
        toast.warning("Dữ liệu không đúng hãy kiểm tra lại")
      }else if(type == "error"){
        toast.error(`Lấy thông tin ${name} thất bại, không có tín hiệu từ server`)
      }
    }
    useEffect(()=>{
        getMagazineLine()
    }, [magazineLine])
    useEffect(()=>{
      checkDeleteModel(setPointDelete)
    },[])
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tầng 1',
            dataIndex: 'floor1_height',
            key: 'floor1_height',
        },
        {
            title: 'Chiều quay',
            dataIndex: 'floor1_conveyor',
            key: 'floor1_direct',
            width: "15%"
        },
        {
            title: 'Tầng 2',
            dataIndex: 'floor2_height',
            key: 'floor2_height',
        },
        {
            title: 'Chiều quay',
            dataIndex: 'floor2_conveyor',
            key: 'floor2_direct',
            width: "15%"
        },
        {
            title: 'Chỉnh',
            key: 'action',
            width: '20%',
            render: (_, record) => (
              <Space size="middle">
                <Button size="large" onClick={()=>{handleEditMagazine(record.id, record.name)}} style={{backgroundColor: 'blue', color: 'white', fontWeight: 600}}>Sửa</Button>
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
                    onConfirm={()=>{handleDeleteMagazine(record.id,record.name)}}
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
    ]
  return (
    <div>
        <Space>
            <Radio.Group
                value={magazine}
                onChange={onChangeMagazine}
                >
                <Radio.Button style={{height: "40px", lineHeight: "40px", fontWeight: 600}} value="load">Load Magazine</Radio.Button>
                <Radio.Button style={{height: "40px", lineHeight: "40px", fontWeight: 600}} value="unload">UnLoad Magazine</Radio.Button>
            </Radio.Group>
            <Radio.Group
                value={line}
                onChange={onChangeLine}
                >
                <Radio.Button style={{height: "40px", lineHeight: "40px", fontWeight: 600}} value="45">Line 45</Radio.Button>
                <Radio.Button style={{height: "40px", lineHeight: "40px", fontWeight: 600}} value="46">Line 46</Radio.Button>
            </Radio.Group>
            <Button size='large' type='primary' style={{height: 40, display: 'flex', alignItems: 'center'}} icon={<PlusCircleFilled />} onClick={handleShowForm}>Tạo Option</Button>
        </Space>
        <Table dataSource={dataTable} columns={columns} />
        {
            showForm ? <MagazineForm  hidden={handleHiddenForm} editPoint={editPoint} title={title} getData={getMagazineLine} pathFormMagazine={magazineLine} pointUpdateAll={pointDelete}/> : ""
        }
    </div>
    
  )
}

export default Magazine
