import React from 'react'
import { Button } from 'antd';

const GroupPoint = () => {
    const handleCreateGroup = ()=>{
        console.log('create group');
    }
  return (
    <div>
      {
        <Button type="primary" size='large' onClick={handleCreateGroup}>Tạo nhóm</Button>
      }
    </div>
  )
}

export default GroupPoint
