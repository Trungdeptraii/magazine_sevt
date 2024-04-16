import React from 'react'
import { ChooseTaskItem, ChooseTaskLabel, TitleItem } from './chooseTask_'
import {SettingOutlined } from '@ant-design/icons';

const TaskConfig = ({setTarget}) => {
  return (
    <ChooseTaskLabel>
        <input type="radio" name='chooseType' value="config" hidden defaultChecked onClick={setTarget}/>
        <ChooseTaskItem>
          <SettingOutlined />
        </ChooseTaskItem>
        <TitleItem>Config</TitleItem>
    </ChooseTaskLabel>
  )
}

export default TaskConfig
