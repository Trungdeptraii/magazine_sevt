import { format } from "date-fns";
import {toast} from "react-toastify"

export const createId = (length)=>{
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const validateRelocation = (data, state, cb, arrRelocation)=>{
  const {name, x, y, angle, radius} = data
  if(!name && x && y && angle ){
    cb({...state, name: 'Vui lòng nhập tên Relocation'})
    return false
  }else if(!name && !x && y && angle){
    cb({...state, name: 'Vui lòng nhập tên Relocation', x: 'Vui lòng nhập tọa độ x'})
    return false
  }else if(!name && !x && !y && angle){
    cb({...state, name: 'Vui lòng nhập tên Relocation', x: 'Vui lòng nhập tọa độ x', y: 'Vui lòng nhập tọa độ y'})
    return false
  }else if(name && !x && y && angle){
    cb({...state, x: 'Vui lòng nhập tọa độ x'})
    return false
  }else if(name && !x && !y && angle){
    cb({...state, x: 'Vui lòng nhập tọa độ x', y: 'Vui lòng nhập tọa độ y'})
    return false
  }else if(name && !x && !y && !angle){
    cb({...state, x: 'Vui lòng nhập tọa độ x', y: 'Vui lòng nhập tọa độ y', angle: 'Vui lòng nhập tọa độ góc'})
    return false
  }else if(name && x && !y && angle){
    cb({...state, y: 'Vui lòng nhập tọa độ y'})
    return false
  }else if(name && x && !y && !angle){
    cb({...state, y: 'Vui lòng nhập tọa độ y', angle: 'Vui lòng nhập tọa độ góc'})
    return false
  }else if(name && x && y && !angle){
    cb({...state, angle: 'Vui lòng nhập tọa độ góc'})
    return false
  }else if(!name && !x && !y && !angle){
    cb({...state, name: 'Vui lòng nhập tên Relocation', x: 'Vui lòng nhập tọa độ x', y: 'Vui lòng nhập tọa độ y', angle: 'Vui lòng nhập tọa độ góc'})
    return false
  }else if(name && x && y && angle){
    if(arrRelocation.some((el)=>el.name === name)){
      cb({...state, name: `Vị trí ${name} đã tồn tại`})
      return false
    }
  }
  return {name, x: Number(x), y: Number(y), angle: Number(angle), radius: Number(radius)}
}
export const renderStatusRelocation = (relocation)=>{
  switch(relocation){
    case 1:
      return 'Đã xác nhận';
    case 2:
      return 'Đang Relocation';
    case 3:
      return 'Chờ xác nhận';
    default:
      return 'Chưa xác định'
  }
}

export const showTime = ({type="hours", data = new Date()})=>{
  if(type == "hours"){
    return format(data, 'HH:mm:ss')
  }else if(type == "date"){
    return format(new Date(data), "yyyy-MM-dd")
  }else if(type == "startTime"){
    return format(data, 'mm:ss')
  }
}

export const handleNotis = ({emergency=false, blocked=false, errors=[], follow= {}})=>{
  let message, desc
  if(emergency){
    message = `AMR đang dừng khẩn cấp`
    desc = "Dừng"
    return {title: message, message, desc}
  }else if(!emergency && blocked){
    message = `AMR đang gặp vật cản`
    desc = "Dừng"
    return {title: message, message, desc}
  }else if(!emergency && !blocked && errors.length){
    message = `Kiểm tra thông báo để xem thông tin lỗi`
    let messErrors = errors.map((error)=>{
      return {
        time: error.desc.slice(error.desc.indexOf("[")+1,  error.desc.indexOf("]")),
        mess: error.desc.slice(error.desc.indexOf(" ")+1)
      }
    })
    follow.arrErrors = messErrors
    desc = "Lỗi"
    return {title: message,message: messErrors.map((item)=>item.mess).join(" , "), desc}
  }
  if(follow?.arrErrors?.length){
    follow.arrErrors = []
  }
  return {title: false, message: ""}
}

export const findNamePoint = ({dataPoint=[], dataAMR=""})=>{
  let currentStation
  try {
    if(typeof dataAMR != "string"){
      currentStation =  dataAMR?.current_station ? dataAMR.current_station : dataAMR?.last_station ? dataAMR.last_station : '';
    }else {
      currentStation == dataAMR
    }
    let pointFind = dataPoint.find((item)=>item.point == currentStation)
    let name = pointFind?.name ? pointFind.name : currentStation
    return name ? name : ""
  } catch (error) {
    
  }
}

export const checkResultAPI = async (api, mess="Gửi")=>{
  let {type} = await  api
  if(type == "succees"){
    toast.success(`${mess} tín hiệu thành công...`)
    return true
  }else if(type == "fail"){
    toast.warning(`${mess} tín hiệu thất bại...`)
    return false
  }else if(type == "error"){
    toast.error("Không có phản hồi từ server")
    return false
  }
}
