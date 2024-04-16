import React, {useState} from 'react'
import { DivInput, InputForm, LayoutForm, SpanForm, iniitalValidate, initialState } from './jig_'
import { Button, Form, Input, Radio, Space } from 'antd';
import { hostJS, portJS } from '../../../../assets/js/avaribale';
import { createId } from '../../../../utils/clientUtil';
import { string, object } from 'yup';
import { TitleField } from '../../../../assets/js/globalStyle';
import { FetchAPI } from '../../../../utils/api';
import {toast} from "react-toastify"

const JigForm = ({hidden, editPoint, title, getData}) => {
    let [jig, setJig] = useState("get")
    let [line, setLine] = useState("45")
    let [jigLine, setJigLine] = useState("get_45")
    let onChangeJig = (e)=>{
      setJig(e.target.value)
      setJigLine(`${e.target.value}_${line}`)
    }
    let onChangeLine = (e)=>{
      setLine(e.target.value)
      setJigLine(`${jig}_${e.target.value}`)
    }
    const [validate, setValidate] = useState(iniitalValidate)
    const [form, setForm] = useState(editPoint)
    const handleCancelForm = ()=>{
      hidden()
    }
    return(
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
            let checkButton, method="POST", path=`jig_${jigLine}`;
            checkButton = title.startsWith('Tạo') ? 'Create' : 'Update';
            let modelSchema = object({
                name: string().test("checkunique", "Model đã tồn tại", async(value)=>{
                  let slug = value.split(" ").join("").toLowerCase();
                  if(checkButton == "Create"){
                    let {type, data} =  await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `jig_${jigLine}?slugName=${slug}`})
                    if(type == "succees" && data.length){
                      return false
                    }
                  }else if(checkButton == "Update"){
                    let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `jig_${jigLine}`})
                    if(type == "succees"){
                      let result = data.filter((item)=>item.name.toLowerCase() != editPoint.name)
                      if(result.some((item)=>item.name.toLowerCase() == value.toLowerCase())){
                        return false
                      }
                    }
                  }
                  return true
                }),
                triggerName: string().test("checkunique", "Trigger name đã tồn tại", async(value)=>{
                  let slug = value.split(" ").join("").toLowerCase();
                  if(checkButton == "Create"){
                    let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `jig_${jigLine}?slugTrigger=${slug}`})
                    if(type == "succees" && data.length){
                      return false
                    }
                  }else if(checkButton == "Update"){
                    let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `jig_${jigLine}`})
                    if(type == "succees"){
                      let result = data.filter((item)=>item.triggerName.toLowerCase() != editPoint.triggerName)
                      if(result.some((item)=>item.triggerName.toLowerCase() == value.toLowerCase())){
                        return false
                      }
                    }
                  }
                  return true
                }),
                openGripper: string().test("checkunique", true, (value)=>{
                  return Number(value) ? true : false
                }),
                closeGripper: string().test("checkunique", "true", (value)=>{
                  return Number(value) ? true : false
                }),
                openSpace: string().test("checkunique", "true", (value)=>{
                  return Number(value) ? true : false
                }),
                m_delta_x: string().test("checkunique", "true", (value)=>{
                  return Number(value) ? true : false
                }),
                m_delta_y: string().test("checkunique", "true", (value)=>{
                  return Number(value) ? true : false
                }),
                m_delta_h: string().test("checkunique", "true", (value)=>{
                  return Number(value) ? true : false
                }),
                r_delta_x: string().test("checkunique", "true", (value)=>{
                  return Number(value) ? true : false
                }),
                r_delta_y: string().test("checkunique", "true", (value)=>{
                  return Number(value) ? true : false
                }),
                r_delta_h: string().test("checkunique", "true", (value)=>{
                  return Number(value) ? true : false
                }),
            })
            try {
              let result = await modelSchema.validate(form, {abortEarly: false})
              if(checkButton == "Create"){
                  result.openGripper = Number(result.openGripper)
                  result.closeGripper = Number(result.closeGripper)
                  result.openSpace = Number(result.openSpace)
                  result.m_delta_x = Number(result.m_delta_x)
                  result.m_delta_y = Number(result.m_delta_y)
                  result.m_delta_h = Number(result.m_delta_h)
                  result.r_delta_x = Number(result.r_delta_x)
                  result.r_delta_y = Number(result.r_delta_y)
                  result.r_delta_h = Number(result.r_delta_h)
                  result.name = result.name.trim()
                  result.triggerName = result.triggerName.trim()
                  result.slugName = result.name.trim().split(" ").join("").toLowerCase();
                  result.slugTrigger = result.triggerName.trim().split(" ").join("").toLowerCase();
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
                  toast.error(`${checkButton == "Create" ? "Tạo" : "Cập nhật"} ${result.name} thất bại, không có tín hiệu từ server`)
                }
            } catch (error) {
                if(error?.inner?.length){
                  let resultError = []
                  resultError = error.inner.map((item)=>{return {[item.path]: item.message}})
                  let result = {}
                  if(resultError.length){
                    resultError.forEach((item)=>{
                      result = {...result,...item}
                    })
                    let data = {
                      name: result.name,
                      triggerName: result.triggerName,
                      gripper: result.openGripper || result.closeGripper || result.openSpace? `Giá trị ${result.openGripper ? "MỞ": ""} ${result.closeGripper ? ", ĐÓNG": ""} ${result.openSpace ? ", CỬA": ""} phải là dạng số`: "",
                      machine: result.m_delta_x|| result.m_delta_y|| result.m_delta_h? `Giá trị ${result.m_delta_x ? "X": ""} ${result.m_delta_y ? ", Y": ""} ${result.m_delta_h ? ", H": ""} phải là dạng số`: "",
                      robot: result.r_delta_x || result.r_delta_y || result.r_delta_h ? `Giá trị ${result.r_delta_x ? "X": ""} ${result.r_delta_y ? ", Y": ""} ${result.r_delta_h ? ", H": ""} phải là dạng số` : "",
                    }
                    setValidate({...validate, ...data})
                  }
                }
            }
          }}
        >
          <TitleField style={{padding: '20px 0px 0 0 ', textAlign: 'center'}}>{title } Model</TitleField>
          <Form.Item
            label="Tên Model"
            name="name"
          >
            <>
              <DivInput>
                <Input style={{flex: 1, height: 40, fontSize: 16}} required value={form.name} name='name' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tên model muốn tạo'></Input>
                <Button type='primary' onClick={()=>{setForm({...form, name: ''})}} style={{backgroundColor: 'orange', minWidth: 80}}>Xóa</Button>
              </DivInput>
              {
                validate.name ? <span style={{color: 'red', fontSize: '14px'}}>{validate.name}</span> : ''
              }
            </>
          </Form.Item>
          <Form.Item
            label="Trigger name"
            name="trigeer_name"
          >
            <>
              <DivInput>
                <Input style={{flex: 1}} value={form.triggerName} name='triggerName' required onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập trigger name'></Input>
                <Button type='primary' onClick={()=>{setForm({...form, triggerName: ''})}} style={{backgroundColor: 'orange', minWidth: 80}}>Xóa</Button>
              </DivInput>
              {
                validate.triggerName ? <span style={{color: 'red', fontSize: '14px'}}>{validate.triggerName}</span> : ''
              }
            </>
          </Form.Item>
          <Form.Item
            label="Gripper"
            name="gripper"
            className='magazine_gripper'
          >
            <>
              <DivInput>
                <InputForm value={form.openGripper} type='text' placeholder='Mở' required id='gripperOpen' name='openGripper' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["gripper"]: ''})}}/>
                <SpanForm>Mở</SpanForm>
                <InputForm value={form.closeGripper} type='text' placeholder='Đóng' required id='gripperClose' name='closeGripper' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["gripper"]: ''})}}/>
                <SpanForm>Đóng</SpanForm>
                <InputForm value={form.openSpace} type='text' placeholder='Cửa' required id='gripperDoor' name='openSpace' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["gripper"]: ''})}}/>
                <SpanForm>Cửa</SpanForm>
              </DivInput>
              {
                validate.gripper ? <span style={{color: 'red', fontSize: '14px'}}>{validate.gripper}</span> : ''
              }
            </>
          </Form.Item>
          <Form.Item
            label="Máy"
            name="machine"
            className="magazine_machine"
          >
            <>
              <DivInput>
                <InputForm value={form.m_delta_x} type='text' placeholder='Δx1' required id='machinex' name='m_delta_x' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["machine"]: ''})}}/>
                <SpanForm>Δx1</SpanForm>
                <InputForm value={form.m_delta_y} type='text' placeholder='Δy1' required id='machiney' name='m_delta_y' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["machine"]: ''})}}/>
                <SpanForm>Δy1</SpanForm>
                <InputForm value={form.m_delta_h} type='text' placeholder='Δh1' required id='machineh' name='m_delta_h' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["machine"]: ''})}}/>
                <SpanForm>Δh1</SpanForm>
              </DivInput>
              {
                validate.machine ? <span style={{color: 'red', fontSize: '14px'}}>{validate.machine}</span> : ''
              }
            </>
          </Form.Item>
          <Form.Item
            label="Robot"
            name="Robot"
            className="magazine_robot"
          >
            <>
              <DivInput>
                <InputForm value={form.r_delta_x} type='text' placeholder='Δx2' required id='robotx' name='r_delta_x' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["robot"]: ''})}}/>
                <SpanForm>Δx2</SpanForm>
                <InputForm value={form.r_delta_y} type='text' placeholder='Δy2' required id='roboty' name='r_delta_y' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["robot"]: ''})}}/>
                <SpanForm>Δy2</SpanForm>
                <InputForm value={form.r_delta_h} type='text' placeholder='Δh2' required id='roboth' name='r_delta_h' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["robot"]: ''})}}/>
                <SpanForm>Δh2</SpanForm>
              </DivInput>
              {
                validate.robot ? <span style={{color: 'red', fontSize: '14px'}}>{validate.robot}</span> : ''
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
                  value={jig}
                  onChange={onChangeJig}
                  >
                  <Radio.Button style={{height: "50px", lineHeight: "50px", fontWeight: 600}} value="get">Gắp Jig</Radio.Button>
                  <Radio.Button style={{height: "50px", lineHeight: "50px", fontWeight: 600}} value="return">Nhả Jig</Radio.Button>
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

export default JigForm
