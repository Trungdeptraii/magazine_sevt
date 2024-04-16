import React, {useState} from 'react'
import { DivInput, LayoutForm } from './jig_'
import { Button, Form, Input, Radio, Space, message } from 'antd';
import { hostJS, portJS } from '../../../../assets/js/avaribale';
import { createId } from '../../../../utils/clientUtil';
import { string, object } from 'yup';
import { TitleField } from '../../../../assets/js/globalStyle';
import { FetchAPI } from '../../../../utils/api';

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
    const [validate, setValidate] = useState({name: '', x: '', y: ""})
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
                name: string().required("Bạn cần nhập tên model").test("checkunique", "Model đã tồn tại", async(value)=>{
                  let slug = value.split(" ").join("").toLowerCase();
                  if(checkButton == "Create"){
                    let {type, data} = await FetchAPI({method: "GET",host: hostJS, port: portJS, path: `jig_${jigLine}?slug=${slug}`})
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
                x: string().required("Bạn cần nhập tọa độ x").test("checkunique", "Tọa độ x phải là dạng số", (value)=>{
                  return Number(value) ? true : false
                }),
                y: string().required("Bạn cần nhập tọa độ y").test("checkunique", "Tọa độ y phải là dạng số", (value)=>{
                  return Number(value) ? true : false
              }),
            })
            try {
                let result = await modelSchema.validate(form, {abortEarly: false})
                result.x = Number(result.x)
                result.y = Number(result.y)
                if(checkButton == "Create"){
                  result.slug = result.name.split(" ").join("").toLowerCase();
                  result.id = createId(5)
                  result.key = result.id + 1
                  result.model = path
                }else if(checkButton == "Update"){
                  method= "PATCH",
                  path = path + `/${editPoint.id}`
                }
                console.log(method);
                let {type} = await FetchAPI({method, host: hostJS, port: portJS, path, data: result})

                if(type == "succees"){
                  setForm({name: '', x: '', y: ""})
                  message.success(`Đã ${checkButton == "Create" ? "tạo" : "cập nhật"} thành công ${result.name}`)
                  if(checkButton == "Update"){
                    hidden()
                  }
                  getData()
                }else if(type == "fail"){
                  message.warning("Dữ liệu không đúng hãy kiểm tra lại")
                }else if(type == "error"){
                  message.error(`${checkButton == "Create" ? "Tạo" : "Cập nhật"} ${result.name} thất bại, không có tín hiệu từ server`)
                }
            } catch (error) {
              console.log(error);
                if(error?.inner?.length){
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
          <TitleField style={{padding: '20px 0px 0 0 ', textAlign: 'center'}}>{title } Model</TitleField>
          <Form.Item
            label="Tên Model"
            name="name"
          >
            <>
              <DivInput>
                <Input style={{flex: 1, height: 40, fontSize: 16}} value={form.name} name='name' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tên model muốn tạo'></Input>
                <Button type='primary' onClick={()=>{setForm({...form, name: ''})}} style={{backgroundColor: 'orange'}}>Clear</Button>
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
                <Input style={{flex: 1}} value={form.x} name='x' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập trigger name'></Input>
                <Button type='primary' onClick={()=>{setForm({...form, x: ''})}} style={{backgroundColor: 'orange'}}>Clear</Button>
              </DivInput>
              {
                validate.x ? <span style={{color: 'red', fontSize: '14px'}}>{validate.x}</span> : ''
              }
            </>
          </Form.Item>
          <Form.Item
            label="Tọa độ X"
            name="point"
          >
            <>
              <DivInput>
                <Input style={{flex: 1}} value={form.x} name='x' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tọa độ x'></Input>
                <Button type='primary' onClick={()=>{setForm({...form, x: ''})}} style={{backgroundColor: 'orange'}}>Clear</Button>
              </DivInput>
              {
                validate.x ? <span style={{color: 'red', fontSize: '14px'}}>{validate.x}</span> : ''
              }
            </>
          </Form.Item>
          <Form.Item
            label="Tọa độ Y"
            name="point"
          >
            <>
              <DivInput>
                <Input style={{flex: 1}} value={form.y} name='y' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tọa độ y'></Input>
                <Button type='primary' onClick={()=>{setForm({...form, y: ''})}} style={{backgroundColor: 'orange'}}>Clear</Button>
              </DivInput>
              {
                validate.y ? <span style={{color: 'red', fontSize: '14px'}}>{validate.y}</span> : ''
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
              <Button type="primary" htmlType="submit" style={{backgroundColor: 'limegreen'}} size='large'>
                {title.startsWith('Tạo') ? 'Submit' : 'Update'}
              </Button>
              <Button type="primary" htmlType="button" style={{marginLeft: '15px'}} onClick={handleCancelForm} size='large'>
                Cancel
              </Button>
            </>
          </Form.Item>
        </Form>
      </LayoutForm>
    )
}

export default JigForm
