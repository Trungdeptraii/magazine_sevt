import { Form } from 'antd'
import {styled} from 'styled-components'

export const LayoutForm = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(80, 78, 76, 0.5);
    align-items: center;
    justify-content: center;
    z-index: 10
`
export const DivInput = styled.div`
    display: flex;
    gap: 10px;
    height: 40px;
    & input, & button{
        font-size: 16px;
        height: 40px;
    }
`

export const RelocationContant = styled.div`
    height: calc(100vh - 285px);
    overflow-y: auto;
`