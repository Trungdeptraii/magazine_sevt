import {styled} from "styled-components"

export const ChooseTaskContainer = styled.div`
    display: grid;
    grid-template-columns: 32% 32% 32%;
    gap: 10px;
    width: 100%;
`
export const ChooseTaskLabel = styled.label`
    input[name=chooseType]:checked + div{
        background-color: #2fb2ff;
        color: #58ff00
    }
    input[name=chooseType]:checked + div + div{
        color: green;
        font-weight: 700
    }
`
export const ChooseTaskItem = styled.div`
    box-shadow: 0 0 2px 2px grey;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10px;
    border-radius: 8px;
    padding: 5px;
    svg{
        font-size: 120px;
    }
`
export const TitleItem = styled.div`
    padding: 5px 0;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
`