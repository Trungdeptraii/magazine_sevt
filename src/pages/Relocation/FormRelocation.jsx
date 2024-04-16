import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { DivInput, LayoutForm } from './relocationn';
import { hostJS, portJS } from '../../assets/js/avaribale';
import { useSelector } from 'react-redux';
import { createId, validateRelocation } from '../../utils/clientUtil';
import { TitleField } from '../../assets/js/globalStyle';
import {toast} from "react-toastify"

const FormRelocation = ({onFetch, onCancel, title, editPoint, onResetPoint})=>{
  const [validate, setValidate] = useState({name: '', x: '', y: '', angle: '', radius: ''})
  let {arrRelocation} = useSelector((state)=>state.relocation)
  const {amr: {data}} = useSelector((state)=>state.amr)
  const [form, setForm] = useState(editPoint ? editPoint : {name: '', x: data?.x ? data.x : 0, 
  y: data?.y ? data.y : 0, angle: data?.angle ? (data.angle * 57.295).toFixed(3) : 0, radius: 2})
  const [dataEdit, setDataEdit] = useState(editPoint)
  const handleCancelForm = ()=>{
    onResetPoint({name: '', x: '', y: '', angle: '', radius: 0})
    setDataEdit({name: '', x: '', y: '', angle: '', radius: 0})
    onCancel()
  }
  if(!title.startsWith('Tạo')){
    arrRelocation =  arrRelocation.filter((el)=>el.name!=dataEdit.name);
  }
  useEffect(()=>{
    setDataEdit(form)
  }, [])
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
          form.stt = 0;
          let checkButton;
          checkButton = title.startsWith('Tạo') ? 'Tạo' : 'Cập nhật';
          let dataSend = validateRelocation(form, validate, setValidate, arrRelocation)
          if(dataSend){
            dataSend.id = createId(5);
            dataSend.key = dataSend.id + "2";
            let method = checkButton == 'Tạo' ? 'POST' : 'PATCH'
            let path = checkButton == 'Tạo' ? `relocation` : `relocation/${form.id}`
            let {type, data} = await onFetch({host: hostJS, por: portJS, method: method, data: dataSend, path: path})
            if(type == 'succees'){
              toast.success(`${checkButton} thành công điểm ${form.name}`);
              if(checkButton != 'Tạo'){
                onCancel()
              }
              setForm({name: '', x: '', y: '', angle: '', radius: 0})
              return
            }
            toast.error(`${checkButton} điểm  ${form.name} thất bại...`);
          }
        }}
      >
        <TitleField style={{padding: '20px 0px 0 0 ', textAlign: 'center'}}>{title}</TitleField>
        <Form.Item
          label="Tên"
          name="name"
          style={{fontSize: "16px !important"}}
        >
          <>
            <DivInput>
              <Input style={{flex: 1}} value={form.name} name='name' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tên vị trí Relocation'></Input>
              <Button type='primary' onClick={()=>{setForm({...form, name: ''})}} style={{backgroundColor: 'orange'}}>Xóa</Button>
            </DivInput>
            {
              validate.name ? <span style={{color: 'red', fontSize: '14px'}}>{validate.name}</span> : ''
            }
          </>
        </Form.Item>
        <Form.Item
          label="Tọa độ x"
          name="x"
          style={{fontSize: 16}}
        >
          <>
            <DivInput>
              <Input type='number' style={{flex: 1}} value={form.x} name='x' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tọa độ trục x'></Input>
              <Button type='primary' onClick={()=>{setForm({...form, x: ''})}} style={{backgroundColor: 'orange'}}>Xóa</Button>
            </DivInput>
            {
              validate.x ? <span style={{color: 'red', fontSize: '14px'}}>{validate.x}</span> : ''
            }
          </>
        </Form.Item>
        <Form.Item
          label="Tọa độ y"
          name="y"
          style={{fontSize: 16}}
        >
          <>
            <DivInput>
              <Input type='number' style={{flex: 1}} value={form.y} name='y' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tọa độ trục y'></Input>
              <Button type='primary' onClick={()=>{setForm({...form, y: ''})}} style={{backgroundColor: 'orange'}}>Xóa</Button>
            </DivInput>
            {
              validate.y ? <span style={{color: 'red', fontSize: '14px'}}>{validate.y}</span> : ''
            }
          </>
        </Form.Item>
        <Form.Item
          label="Tọa độ góc"
          name="angle"
          style={{fontSize: 16}}
        >
          <>
            <DivInput>
              <Input type='number' style={{flex: 1}} value={form.angle} name='angle' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tọa độ trục góc'></Input>
              <Button type='primary' onClick={()=>{setForm({...form, angle: ''})}} style={{backgroundColor: 'orange'}}>Xóa</Button>
            </DivInput>
            {
              validate.angle ? <span style={{color: 'red', fontSize: '14px'}}>{validate.angle}</span> : ''
            }
          </>
        </Form.Item>
        <Form.Item
          label="Bán kính"
          name="radius"
          style={{fontSize: 16}}
        >
          <>
            <DivInput>
              <Input type='number' style={{flex: 1}} value={form.radius} name='radius' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập bán kính Relocation'></Input>
              <Button type='primary' onClick={()=>{setForm({...form, radius: ''})}} style={{backgroundColor: 'orange'}}>Xóa</Button>
            </DivInput>
            {
              validate.radius ? <span style={{color: 'red', fontSize: '14px'}}>{validate.radius}</span> : ''
            }
          </>
        </Form.Item>
        <Form.Item label=" ">
          <>
            <Button type="primary" htmlType="submit" style={{backgroundColor: 'limegreen', minWidth: 100}} size='large'>
              {title.startsWith('Tạo') ? 'Tạo' : 'Cập nhật'}
            </Button>
            <Button type="primary" htmlType="button" style={{marginLeft: '15px'}} onClick={handleCancelForm} size='large'>
              Cancel
            </Button>
          </>
        </Form.Item>
      </Form>
    </LayoutForm>
  )
};
export default FormRelocation;