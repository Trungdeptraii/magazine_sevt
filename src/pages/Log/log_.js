import { format } from "date-fns";
import { hostJS, pathLogJS, portJS } from "../../assets/js/avaribale";
import { createId } from "../../utils/clientUtil";
import { FetchAPI } from "../../utils/api";

export const columns = [
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
    width: "13%"
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
    width: "13%"
  },
  {
    title: 'Vị trí',
    dataIndex: 'point',
    key: 'point',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'desc',
    key: 'desc',
    width: "13%"
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    key: 'content',
  },
];

export const logSelected = [
  {
    value: "all",
    label: "Tất cả"
  },{
    value: "finish",
    label: "Hoàn thành"
  },{
    value: "cancel",
    label: "Hủy"
  },{
    value: "error",
    label: "Lỗi"
  },{
    value: "reload",
    label: "Reload"
  },{
    value: "stop",
    label: "Dừng"
  },{
    value: "charge",
    label: "Sạc"
  },{
    value: "pending",
    label: "Đang thực hiện"
  }
]
export const logCheckSelect = ["cancel", "finish", "error", "reload", "stop", "charge"]
export const data = [
    {
      key: '1',
      datetime: '1710582581226',
      content: "Dừng",
      description: "Đã tới điểm"
    }
]

export const  writeLog = ({content="", current_station="", desc="Lỗi", id= "", method = "POST"})=>{
  let path = pathLogJS
  try {
    if(desc){
      let {value} = logSelected.find((item)=>item.label === desc)
      let data = {
        content,
        point: current_station,
        desc: desc
      }
      if(!id && method == "POST"){
        data.id = createId(5)
        data.key = data.id + "1"
      }else if(id && method =="POST"){
        data.id = id
        data.key = data.id + "1"
      }
      data.timestamp = Date.now()
      data.date = format(new Date(data.timestamp), "yyyy-MM-dd")
      data.type = value ? value : ""
      FetchAPI({method, host: hostJS, port: portJS, path, data})
    }
  } catch (error) {
    console.log("error", error);
  }
}