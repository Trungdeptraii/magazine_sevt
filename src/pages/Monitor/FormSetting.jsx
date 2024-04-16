import { Form, Input, Button } from 'antd'
import React, {useState} from 'react'
import { DivInput, LayoutForm, validateMonitor } from './monitor_'

const FormSetting = ({editPoint, setOpen, setSetting}) => {
    const [form, setForm] = useState(editPoint)
    const [validate, setValidate] = useState({speed: 0, rotate: 0})
    const handleCancelForm = ()=>{
        setOpen(false)
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
          if(validateMonitor(form, setValidate)){
            return
          }
          setSetting({speed: Math.abs(form.speed), rotate: Math.abs(form.rotate)})
          setOpen(false)
        }}
        >
            <h4 style={{padding: '20px 0px 0 0 ', textAlign: 'center'}}>Cài đặt Monitor</h4>
            <Form.Item
              label="Tốc độ chạy (<1m/s)"
              name="speed"
              style={{textAlign: "right"}}
            >
              <>
                <DivInput>
                  <Input type='number' style={{flex: 1}} value={form.speed} name='speed' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tốc độ chạy'></Input>
                  <Button type='primary' onClick={()=>{setForm({...form, speed: 0.5})}} style={{backgroundColor: 'orange'}}>Clear</Button>
                </DivInput>
                {
                    validate.speed ? <div style={{color: 'red', fontSize: '14px', textAlign: "left"}}>{validate.speed}</div> : ''
                }
              </>
            </Form.Item>
            <Form.Item
                label="Tốc độ góc (<20°/s)"
                name="rotate"
                style={{textAlign: "right"}}
            >
              <>
                <DivInput>
                    <Input type='number' style={{flex: 1}} value={form.rotate} name='rotate' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tốc độ xoay'></Input>
                    <Button type='primary' onClick={()=>{setForm({...form, rotate: 10})}} style={{backgroundColor: 'orange'}}>Clear</Button>
                </DivInput>
                {
                  validate.rotate ? <div style={{color: 'red', fontSize: '14px', textAlign: "left"}}>{validate.rotate}</div> : ''
                }
              </>
            </Form.Item>
            <Form.Item label=" ">
              <>
                <Button type="primary" htmlType="submit" style={{backgroundColor: 'limegreen'}} size='large'>Cập nhật</Button>
                <Button type="primary" htmlType="button" style={{marginLeft: '15px'}} onClick={handleCancelForm} size='large'>
                  Cancel
                </Button>
              </>
            </Form.Item>
        </Form>
    </LayoutForm>
  )
}

export default FormSetting
