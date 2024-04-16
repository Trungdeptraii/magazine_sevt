import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { DivInput, LayoutForm } from './form';
import { hostJS, portJS } from '../../assets/js/avaribale';
import { useSelector } from 'react-redux';
import { createId } from '../../utils/clientUtil';
import { TitleField } from '../../assets/js/globalStyle';
import {toast} from "react-toastify"

const FormCreatePoint = ({onFetch, onCancel, title, editPoint, onResetPoint})=>{
  const [validate, setValidate] = useState({name: '', point: ''})
  let {arrPoint} = useSelector((state)=>state.point)
  const [form, setForm] = useState(editPoint)
  const [dataEdit, setDataEdit] = useState(editPoint)
  const handleCancelForm = ()=>{
    onResetPoint({name: '', point: ''})
    setDataEdit({name: '', point: ''})
    onCancel()
  }
  if(!title.startsWith('Tạo')){
      arrPoint =  arrPoint.filter((el)=>el.name!=dataEdit.name && el.point.toLowerCase()!= dataEdit.point.toLowerCase());
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
          let {name, point} = form;
          if(!name && point){
            setValidate({...validate, name: 'Vui lòng nhập tên điểm'})
            return
          }else if(name && !point ){
            setValidate({...validate, point: 'Vui lòng nhập điểm LM'})
            return
          }else if(!name && !point){
            setValidate({name: 'Vui lòng nhập tên điểm', point: 'Vui lòng nhập điểm LM'})
            return
          }else if(name && point){
            if(!form.point.toLowerCase().startsWith('lm')){
              setValidate({...validate, point: 'Bắt buộc ký tự "LM" ở đầu'})
              return
            }
            if(!Number(point.slice(2))){
              setValidate({...validate, point: 'Không thể đặt tên điểm là chuỗi'})
              return
            }
            if(arrPoint.some((el)=>el.name === name)){
              setValidate({...validate, name: 'Tên điểm này đã tồn tại'})
              return
            }
            if(arrPoint.some((el)=>el.point.toLowerCase() === point.toLowerCase())){
              setValidate({...validate, point: `Điểm ${point} đã được sử dụng`})
              return
            }
            form.point = point.toUpperCase()
            if(checkButton == "Tạo"){
              form.id = createId(5)
              form.key = form.id + "1"
            }
          }
          let method = checkButton == 'Tạo' ? 'POST' : 'PATCH'
          let path = checkButton == 'Tạo' ? `point` : `point/${form.id}`
          let {type, data} = await onFetch({host: hostJS, por: portJS, method: method, data: form, path: path})
          if(type == 'succees'){
            toast.success(`${checkButton} thành công điểm ${form.name}`);
            if(checkButton != 'Tạo'){
              onCancel()
            }
            setForm({name: '', point: ''})
            return
          }
          toast.error(`${checkButton} điểm  ${form.name} thất bại...`);
        }}
      >
        <TitleField style={{padding: '20px 0px 0 0 ', textAlign: 'center'}}>{title}</TitleField>
        <Form.Item
          label="Tên điểm"
          name="name"
        >
          <>
            <DivInput>
              <Input style={{flex: 1, height: 40, fontSize: 16}} value={form.name} name='name' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tên điểm muốn tạo'></Input>
              <Button type='primary' onClick={()=>{setForm({...form, name: ''})}} style={{backgroundColor: 'orange', minWidth: 80}}>Xóa</Button>
            </DivInput>
            {
              validate.name ? <span style={{color: 'red', fontSize: '14px'}}>{validate.name}</span> : ''
            }
          </>
        </Form.Item>
        <Form.Item
          label="Điểm LM"
          name="point"
        >
          <>
            <DivInput>
              <Input style={{flex: 1}} value={form.point} name='point' onChange={(e)=>{setForm({...form, [e.target.name]: e.target.value})}} onClick={(e)=>{setValidate({...validate,[e.target.name]: ''})}} placeholder='Nhập tên điểm LM??, lm??'></Input>
              <Button type='primary' onClick={()=>{setForm({...form, point: ''})}} style={{backgroundColor: 'orange', minWidth: 80}}>Xóa</Button>
            </DivInput>
            {
              validate.point ? <span style={{color: 'red', fontSize: '14px'}}>{validate.point}</span> : ''
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
};
export default FormCreatePoint;