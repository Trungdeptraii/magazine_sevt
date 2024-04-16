import React from 'react'
import { Space, Button, Table } from 'antd';
import { useSelector } from 'react-redux';
import { renderStatusRelocation } from '../../utils/clientUtil';
import { FetchAPI } from '../../utils/api';
import { hostServerAPI, pathConfirmLoc, portServerAPI } from '../../assets/js/avaribale';

let handleConfirmLoc = ()=>{
  let data = {type: "confirm_loc"}
  FetchAPI({method: "POST", host: hostServerAPI, port: portServerAPI, path: pathConfirmLoc, data})
}
let statusReLocation
const statusColumns = [
    {
      title: 'Tọa độ x (m)',
      dataIndex: 'x',
      width: '15%',
      key: 'x',
    },
    {
      title: 'Tọa độ y (m)',
      dataIndex: 'y',
      width: '15%',
      key: 'y',
    },
    {
      title: 'Tọa độ góc (°)',
      dataIndex: 'angle',
      width: '15%',
      key: 'angle',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '15%',
      key: 'status',
    },
    {
      title: 'Chức năng',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space size="middle">
          {
            statusReLocation && statusReLocation == 3 ?  <Button type='primary' size='large' style={{fontWeight: 600}} onClick={()=>{handleConfirmLoc()}}>Xác nhận vị trí</Button> : ""
          }
        </Space>
      ),
    },
]
const LocationAMR = () => {
  const {amr: {data}} = useSelector((state)=>state.amr)
  statusReLocation = data?.reloc_status ? data.reloc_status : 0
  return (
    <>
        <Table columns={statusColumns} dataSource={[{x: data?.x ? data.x : 0 , y: data?.y ? data.y: 0, angle: data?.angle ? (data.angle * 57.295).toFixed(3) : 0, status: renderStatusRelocation(data?.reloc_status ? data.reloc_status : 0)}]} pagination={false}/>
    </>
  )
}

export default LocationAMR