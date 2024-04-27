import React, {useState} from 'react'
import { DivInput, InputForm, LayoutForm, SpanForm, iniitalValidate, initialState } from './jig_'
import { Button, Form, Input, Radio, Space } from 'antd';
import { hostJS, portJS } from '../../../../assets/js/avaribale';
import { createId } from '../../../../utils/clientUtil';
import { string, object } from 'yup';
import { TitleField } from '../../../../assets/js/globalStyle';
import { FetchAPI } from '../../../../utils/api';
import {toast} from "react-toastify"
import { filterJig } from '../../../../pages/Setting/setting_';

const JigForm = ({hidden, editPoint, title, getData, pathFormJig, pointUpdateAll}) => {
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
          let checkButton, method="POST", path=`jig_${pathFormJig}`;
          checkButton = title.startsWith('Tạo') ? 'Create' : 'Update';
          let modelSchema = object({
              name: string().required("Chưa nhập tên Model"),
              triggerName: string().test("checkunique", "Trigger name đã tồn tại", async(value)=>{
                let slug = value.split(" ").join("").toLowerCase();
                if(checkButton == "Create"){
                  let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `jig_${pathFormJig}?slugTrigger=${slug}`})
                  if(type == "succees" && data.length){
                    return false
                  }
                }else if(checkButton == "Update"){
                  let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `jig_${pathFormJig}`})
                  if(type == "succees"){
                    let result = data.filter((item)=>item.triggerName.toLowerCase() != editPoint.triggerName.toLowerCase())
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
              closeSpace1: string().test("checkunique", "true", (value)=>{
                return Number(value) ? true : false
              }),
              closeSpace2: string().test("checkunique", "true", (value)=>{
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
            result.openGripper = Number(result.openGripper)
            result.closeGripper = Number(result.closeGripper)
            result.openSpace = Number(result.openSpace)
            result.closeSpace1 = Number(result.closeSpace1)
            result.closeSpace2 = Number(result.closeSpace2)
            result.m_delta_x = Number(result.m_delta_x)
            result.m_delta_y = Number(result.m_delta_y)
            result.m_delta_h = Number(result.m_delta_h)
            result.r_delta_x = Number(result.r_delta_x)
            result.r_delta_y = Number(result.r_delta_y)
            result.r_delta_h = Number(result.r_delta_h)
            if(checkButton == "Create"){
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
              let {type, data} = await FetchAPI({method, host: hostJS, port: portJS, path, data: result})
              if(type == "succees"){
                setForm(initialState)
                toast.success(`Đã ${checkButton == "Create" ? "tạo" : "cập nhật"} thành công ${result.name}`)
                hidden()
                getData()
                if(pointUpdateAll.includes(data.id)){
                  let dataUpdate = filterJig(data)
                  try {
                    let {data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: "magazine"})
                    if(data.length){
                      let line, type
                      let result = data[0];
                      console.log("after", result);
                      if(pathFormJig == "get_45"){
                        line = "line45"
                        type = "load"
                      }else if(pathFormJig == "return_45"){
                        line = "line45"
                        type = "unload"
                      }else if(pathFormJig == "get_46"){
                        line = "line46"
                        type = "load"
                      }else if(pathFormJig == "return_46"){
                        line = "line46"
                        type = "unload"
                      }
                      dataUpdate.point = result[line]["jig"][type].point
                      result[line]["jig"][type] = dataUpdate
                      let {type: resultType} = await FetchAPI({method: "PATCH", host: hostJS, port: portJS, path: `magazine/amr`, data: result})
                      if(resultType == "succees"){
                        toast.success("Cập nhật phần cài đặt thành công !!!")
                      }
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }
                
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
                    gripper: result.openGripper || result.closeGripper? `Giá trị ${result.openGripper ? ", MỞ": ""} ${result.closeGripper ? ", ĐÓNG": ""} phải là dạng số`: "",
                    machine: result.m_delta_x|| result.m_delta_y|| result.m_delta_h? `Giá trị ${result.m_delta_x ? "X": ""} ${result.m_delta_y ? ", Y": ""} ${result.m_delta_h ? ", H": ""} phải là dạng số`: "",
                    robot: result.r_delta_x || result.r_delta_y || result.r_delta_h ? `Giá trị ${result.r_delta_x ? "X": ""} ${result.r_delta_y ? ", Y": ""} ${result.r_delta_h ? ", H": ""} phải là dạng số` : "",
                    door: result.openSpace || result.closeSpace1 || result.closeSpace2 ? `Giá trị ${result.openSpace ? "MỞ": ""} ${result.closeSpace1 ? ", ĐÓNG 1": ""} ${result.closeSpace2 ? ", ĐÓNG 2": ""} phải là dạng số` : "",
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
            </DivInput>
            {
              validate.gripper ? <span style={{color: 'red', fontSize: '14px'}}>{validate.gripper}</span> : ''
            }
          </>
        </Form.Item>
        <Form.Item
          label="K/c cửa"
          name="door"
          className='magazine_gripper'
        >
          <>
            <DivInput>
              <InputForm value={form.openSpace} type='text' placeholder='Mở' required id="gripperDoor" name='openSpace' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["door"]: ''})}}/>
              <SpanForm>Mở</SpanForm>
              <InputForm value={form.closeSpace1} type='text' placeholder='Đóng 1' required id="closeSpace1"  name='closeSpace1' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["door"]: ''})}}/>
              <SpanForm>Đóng 1</SpanForm>
              <InputForm value={form.closeSpace2} type='text' placeholder='Đóng 2' required id="closeSpace2"  name='closeSpace2' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,["door"]: ''})}}/>
              <SpanForm>Đóng 2</SpanForm>
            </DivInput>
            {
              validate.door ? <span style={{color: 'red', fontSize: '14px'}}>{validate.door}</span> : ''
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
