import React from 'react'
import { ChooseTaskItem, ChooseTaskLabel, TitleItem } from './chooseTask_'
import {CodeSandboxOutlined} from '@ant-design/icons';

const TaskMagazine = ({setTarget}) => {
  return (
    <ChooseTaskLabel>
        <input type="radio" name='chooseType' value="magazine" hidden onClick={setTarget}/>
        <ChooseTaskItem>
          <CodeSandboxOutlined/>
        </ChooseTaskItem>
        <TitleItem>Magazine</TitleItem>
    </ChooseTaskLabel>
  )
}

export default TaskMagazine
