import React, {useState} from 'react'
import { DivInput, LayoutForm, initialState, magazineSelected } from './magazine_'
import { Button, Form, Input, Radio, Select, Space, message } from 'antd';
import { hostJS, portJS } from '../../../../assets/js/avaribale';
import { createId } from '../../../../utils/clientUtil';
import { string, object } from 'yup';
import { TitleField } from '../../../../assets/js/globalStyle';
import { FetchAPI } from '../../../../utils/api';
import {toast} from "react-toastify"

const MagazineForm = ({editPoint, hidden, title, getData}) => {
    let [magazine, setMagazine] = useState("load")
    let [line, setLine] = useState("45")
    let [magazineLine, setMagazineLine] = useState("load_45")
    let onChangeMagazine = (e)=>{
        setMagazine(e.target.value)
        setMagazineLine(`${e.target.value}_${line}`)
    }
    let onChangeLine = (e)=>{
        setLine(e.target.value)
        setMagazineLine(`${magazine}_${e.target.value}`)
    }
    const [validate, setValidate] = useState({name: "", floor1_height: "", floor2_height: ""})
    const [form, setForm] = useState(editPoint)
    const handleCancelForm = ()=>{
      hidden()
    }
    const handleChangeDirect = (value, floor)=>{
        setForm({...form, [floor]: value})
    }
  return (
    <LayoutForm>
        <Form
          name="wrap"
          labelCol={{
            flex: '110px',
          }}
          labelAlign="center"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            maxWidth: '600px',
            margin: 'auto',
            marginTop: '100px',
            borderRadius: '10px',
            backgroundColor: 'white',
            padding: '0px 10px 5px 10px'
          }}
          onFinish={async()=>{
            let checkButton, method="POST", path=`magazine_${magazineLine}`;
            checkButton = title.startsWith('Tạo') ? 'Create' : 'Update';
            let modelSchema = object({
                name: string().required("Bạn cần nhập tên option").test("checkunique", "Option đã tồn tại", async(value)=>{
                  let slug = value.split(" ").join("").toLowerCase();
                  if(checkButton == "Create"){
                    let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `magazine_${magazineLine}?slug=${slug}`})
                    if(type == "succees" && data.length){
                      return false
                    }
                  }else if(checkButton == "Update"){
                    let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `magazine_${magazineLine}`})
                    if(type == "succees"){
                      let result = data.filter((item)=>item.name.toLowerCase() != editPoint.name)
                      if(result.some((item)=>item.name.toLowerCase() == value.toLowerCase())){
                        return false
                      }
                    }
                  }
                  return true
                }),
                floor1_height: string().test("checkunique", "Chiều cao phải là dạng số", (value)=>{
                    return Number(value) || Number(value) == 0.0 || Number(value) == 0  ? true : false
                }),
                floor2_height: string().test("checkunique", "Chiều cao phải là dạng số", (value)=>{
                    return Number(value) || Number(value) == 0.0 || Number(value) == 0 ? true : false
              }),
            })
            try {
                let result = await modelSchema.validate(form, {abortEarly: false})
                result.floor1_height = Math.abs(Number(result.floor1_height))
                result.floor2_height = Math.abs(Number(result.floor2_height))
                if(checkButton == "Create"){
                  result.slug = result.name.split(" ").join("").toLowerCase();
                  result.id = createId(5)
                  result.key = result.id + 1
                  result.model = path
                }else if(checkButton == "Update"){
                  method= "PATCH",
                  path = path + `/${editPoint.id}`
                }
                let {type} = await FetchAPI({method, host: hostJS, port: portJS, path, data: result})
                if(type == "succees"){
                  setForm(initialState)
                  toast.success(`Đã ${checkButton == "Create" ? "tạo" : "cập nhật"} thành công ${result.name}`)
                  if(checkButton == "Update"){
                    hidden()
                  }
                  getData()
                }else if(type == "fail"){
                  toast.warning("Dữ liệu không đúng hãy kiểm tra lại")
                }else if(type == "error"){
                  toast.error(`Lấy thông tin ${result.name} thất bại, không có tín hiệu từ server`)
                }
            } catch (error) {
                if(error.inner.length){
                  let resultError = []
                  resultError = error.inner.map((item)=>{return {[item.path]: item.message}})
                  let result = {}
                  if(resultError.length){
                    resultError.forEach((item)=>{
                      result = {...result,...item}
                    })
                    setValidate({...validate, ...result})
                  }
                }
            }
          }}
        >
          <TitleField style={{padding: '20px 0px 0 0 ', textAlign: 'center'}}>{title } Option</TitleField>
          <Form.Item
            label="Tên Option"
            name="name"
          >
            <>
              <DivInput>
                <Input style={{flex: 1, height: 40, fontSize: 16}} value={form.name} name='name' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tên option'></Input>
                <Button type='primary' onClick={()=>{setForm({...form, name: ''})}} style={{backgroundColor: 'orange', minWidth: 80}}>Xóa</Button>
              </DivInput>
              {
                validate.name ? <span style={{color: 'red', fontSize: '14px'}}>{validate.name}</span> : ''
              }
            </>
          </Form.Item>
          <Form.Item
            label="Tầng 1"
            name="floor1"
          >
            <>
              <DivInput>
                <Input style={{flex: 1}} value={form.floor1_height} name='floor1_height' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập chiều cao tầng 1'></Input>
                <Select style={{width: 130, height: 40}} onChange={(value)=>handleChangeDirect(value, "floor1_conveyor")} options={magazineSelected} value={form.floor1_conveyor}/>
                <Button type='primary' onClick={()=>{setForm({...form, floor1_height: ''})}} style={{backgroundColor: 'orange', minWidth: 80}}>Xóa</Button>
              </DivInput>
              {
                validate.floor1_height ? <span style={{color: 'red', fontSize: '14px'}}>{validate.floor1_height}</span> : ''
              }
            </>
          </Form.Item>
          <Form.Item
            label="Tầng 2"
            name="floor2"
          >
            <>
              <DivInput>
                <Input style={{flex: 1}} value={form.floor2_height} name='floor2_height' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập chiều cao tầng 2'></Input>
                <Select style={{width: 130, height: 40}} onChange={(value)=>handleChangeDirect(value, "floor2_conveyor")} options={magazineSelected} value={form.floor2_conveyor}/>
                <Button type='primary' onClick={()=>{setForm({...form, floor2_height: ''})}} style={{backgroundColor: 'orange', minWidth: 80}}>Xóa</Button>
              </DivInput>
              {
                validate.floor2_height ? <span style={{color: 'red', fontSize: '14px'}}>{validate.floor2_height}</span> : ''
              }
            </>
          </Form.Item>
          {
            title.startsWith("Chỉnh") ? "" :
            <Form.Item
                label="Tùy chọn"
                name="options"
            >
                <Space>
                    <Radio.Group
                        value={magazine}
                        onChange={onChangeMagazine}
                        >
                        <Radio.Button style={{height: "50px", lineHeight: "50px", fontWeight: 600}} value="load">Load</Radio.Button>
                        <Radio.Button style={{height: "50px", lineHeight: "50px", fontWeight: 600}} value="unload">UnLoad</Radio.Button>
                    </Radio.Group>
                    <Radio.Group
                        value={line}
                        onChange={onChangeLine}
                        >
                        <Radio.Button style={{height: "50px", lineHeight: "50px", fontWeight: 600}} value="45">Line 45</Radio.Button>
                        <Radio.Button style={{height: "50px", lineHeight: "50px", fontWeight: 600}} value="46">Line 46</Radio.Button>
                    </Radio.Group>
                </Space>
            </Form.Item> 
          }
          <Form.Item label=" ">
            <>
              <Button type="primary" htmlType="submit" style={{backgroundColor: 'limegreen', minWidth: 100}} size='large'>
                {title.startsWith('Tạo') ? 'Tạo' : 'Cập nhật'}
              </Button>
              <Button type="primary" htmlType="button" style={{marginLeft: '15px', minWidth: 80}} onClick={handleCancelForm} size='large'>
                Cancel
              </Button>
            </>
          </Form.Item>
        </Form>
    </LayoutForm>
  )
}

export default MagazineForm
