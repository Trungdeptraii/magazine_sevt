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
        height: 40px;
        font-size: 16px;
    }
`
export let initialState = {
    name: "",
    floor1_height: 0.0,
    floor1_conveyor: "cw",
    floor2_height: 0.0,
    floor2_conveyor: "cw"
}
export const magazineSelected = [
  {
    value: "cw",
    label: "Quay thuận"
  },{
    value: "ccw",
    label: "Quay nghịch"
  }
]