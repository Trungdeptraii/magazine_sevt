import React, { memo, useCallback, useEffect, useState } from 'react'
import { Modal } from 'antd'
import { FetchAPI } from '../../utils/api';
import { hostJS, pathWareHouse, portJS } from '../../assets/js/avaribale';
import { WareHouseContainer, WareHouseItem } from './warehouse_';

const Warehouse = ({onClose}) => {
    let [warehouse, setWareHouse] = useState([])
    const getWareHouse = useCallback(async()=>{
            let {type, data} = await FetchAPI({method: "GET", host: hostJS, port: portJS, path: pathWareHouse})
            if(type=="succees"){
                setWareHouse(data)
            }else{
                setWareHouse([])
            }
    }, [])
    useEffect(()=>{
        getWareHouse()
    },[])
  return (
    <Modal title="Trạng thái thành thùng" open={true} onCancel={onClose}>
        <WareHouseContainer>
            {
                warehouse.map((item, index)=>{
                    return(
                        <WareHouseItem key={index} style={{backgroundColor: item.status ? "orange" : "ghostwhite"}}>
                            <b style={{fontSize: 18}}>{item.title}</b>
                        </WareHouseItem>
                    )
                })
            }
        </WareHouseContainer>
    </Modal>
  )
}

export default memo(Warehouse)
