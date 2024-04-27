import React, { useCallback, useEffect, useState } from 'react'
import { Radio, Table, Button, ConfigProvider, Space, Popconfirm, message } from 'antd'
import { FetchAPI } from '../../../../utils/api'
import { hostJS, portJS} from '../../../../assets/js/avaribale'
import {PlusCircleFilled } from '@ant-design/icons';
import JigForm from './JigForm';
import { checkDeleteModel, initialState } from './jig_';
import {toast} from "react-toastify"

const Jig = () => {
    let [jig, setJig] = useState("get")
    let [line, setLine] = useState("45")
    let [jigLine, setJigLine] = useState("get_45")
    let [dataTable, setDataTable] = useState([])
    let [showForm, setShowForm] = useState(false)
    const [pointDelete, setPointDelete] = useState([])

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
    let onChangeJig = (e)=>{
        setJig(e.target.value)
        setJigLine(`${e.target.value}_${line}`)
    }
    let onChangeLine = (e)=>{
      setLine(e.target.value)
      setJigLine(`${jig}_${e.target.value}`)
    }
    let [title, setTitle] = useState("Tạo")
    const getJigLine = useCallback(async()=>{
       let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `jig_${jigLine}`})
        if(type == "succees"){
            setDataTable(data.reverse())
        }else {
            setDataTable([])
        }
    }, [jigLine])
    const handleDeletePoint = async(id, name)=>{
      if(pointDelete.includes(id)){
        return toast.warning(`Model ${name} đang được chọn trong cấu hình không thể xóa !!!`)
      }
      let {type} = await FetchAPI({method: "DELETE", host: hostJS, port: portJS, path: `jig_${jigLine}/${id}`})
      if(type == "succees"){
        toast.success(`Xóa ${name} thành công...`)
        getJigLine()
      }else if(type == "fail"){
        toast.warning(" Dữ liệu không đúng hãy kiểm tra lại")
      }else if(type == "error"){
        toast.error(`Xóa ${name} thất bại, không có tín hiệu từ server`)
      }
    }
    const handleEditPoint = async(id, name)=>{
      let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: `jig_${jigLine}/${id}`})
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
        getJigLine()
    }, [jigLine])
    useEffect(()=>{
      checkDeleteModel(setPointDelete)
    },[])
    const columns = [
        {
            title: 'Tên Model',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trigger name',
            dataIndex: 'triggerName',
            key: 'triggerName',
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
    ]
  return (
    <div>
        <Space>
          <Radio.Group
              value={jig}
              onChange={onChangeJig}
              >
              <Radio.Button style={{height: "40px", lineHeight: "40px", fontWeight: 600}} value="get">Load Jig</Radio.Button>
              <Radio.Button style={{height: "40px", lineHeight: "40px", fontWeight: 600}} value="return">Unload Jig</Radio.Button>
          </Radio.Group>
          <Radio.Group
              value={line}
              onChange={onChangeLine}
              >
              <Radio.Button style={{height: "40px", lineHeight: "40px", fontWeight: 600}} value="45">Line 45</Radio.Button>
              <Radio.Button style={{height: "40px", lineHeight: "40px", fontWeight: 600}} value="46">Line 46</Radio.Button>
          </Radio.Group>
            <Button size='large' type='primary' style={{height: 40, display: 'flex', alignItems: 'center'}} icon={<PlusCircleFilled />} onClick={handleShowForm}>Tạo Model</Button>
        </Space>
        <Table dataSource={dataTable} columns={columns} />
        {
            showForm ? <JigForm  hidden={handleHiddenForm} editPoint={editPoint} title={title} getData={getJigLine} pathFormJig={jigLine} pointUpdateAll={pointDelete}/> : ""
        }
    </div>
    
  )
}

export default Jig
