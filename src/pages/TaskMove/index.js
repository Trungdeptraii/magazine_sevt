import moment from "moment"
import styled from "styled-components"

export const initialPoint = {
    status: "idle",
    point: [{id: 'ye3IN', name: 'Charge', point: 'LM550', stt: 0, time: moment(Date.now()).format('HH:MM:SS')}]
}
export const LayoutAddPoint = styled.div`
    display: flex;
    position: fixed;
    inset: 0;
    background-color: rgba(80, 78, 76, 0.5);
    justify-content: center;
    padding-top: 100px;
    z-index: 10
`
export const ContainerAddPoint = styled.div`
    height: 85vh;
`