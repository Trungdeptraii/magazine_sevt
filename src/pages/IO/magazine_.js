import {styled} from "styled-components"

export const DivIO = styled.div`
    padding-left: 10px;
    margin: 0 10px;
    background-color: #eeeaf1;
    border-radius: 10px;
    position: relative;
`

export const FormIO = styled.form`
    
`

export const InputIO = styled.input`
    border-radius: 8px;
    outline: none;
    border: none;
    flex: 1;
    padding-left: 15px;
    font-size: 18px;
    background-color: transparent;
    &:valid + span, &:focus + span{
        top: -15px;
        transition: top ease 0.3s;
        background-color: #eeeaf1;
        color: blue;
        font-weight: 700;
        border-radius: 5px 5px 0 0;
    }
    
`
export const TitleSpan = styled.span`
    font-weight: 600;
    font-size: 18px;
    position: absolute;
    display: block;
    height: 30px;
    top: calc(50% - 13px);
    left: 20px;
    padding: 0 10px;
    color: grey;
    text-align: center;
    background-color: transparent;
`

export const DivConveyor = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin: 0 10px;
    background-color: #eeeaf1;
    border-radius: 10px;
`
export const SpanConveyor = styled.div`
    display: block;
    padding: 0 25px;
    font-size: 20px;
    font-weight: 600;
    border-right: 2px solid grey;
    color: grey;
    background-color: #a8e5eb;
    border-radius: 10px 0 0 10px;
    height: 50px;
    display: flex;
    align-items: center;
`