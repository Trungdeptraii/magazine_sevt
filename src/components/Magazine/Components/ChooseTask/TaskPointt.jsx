import React from 'react'
import { ChooseTaskItem, ChooseTaskLabel, TitleItem } from './chooseTask_'
import {ForkOutlined } from '@ant-design/icons';

const TaskPointt = ({setTarget}) => {
  return (
    <ChooseTaskLabel>
        <input type="radio" name='chooseType' value="point" hidden onClick={setTarget}/>
        <ChooseTaskItem>
          <ForkOutlined />
        </ChooseTaskItem>
        <TitleItem>Point</TitleItem>
    </ChooseTaskLabel>
  )
}

export default TaskPointt
