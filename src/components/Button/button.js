import {styled, keyframes} from "styled-components"

export const Circle = styled.div`
    position: absolute;
    height: 100%;
    width: 40px;
    border-radius: 50%;
    background-color: white;
    box-shadow:  0 0 2px 2px grey;
    top: 0;
    left: 0;
    transition: left 0.2s linear;

`
export const ButtonContainer = styled.div`
    position: relative;
    width: 100px;
    height: 40px;
    border-radius: 99px;
`
export const ButtonBg = styled.div`
    width: 100%;
    height: 100%;
    background-color: grey;
    border-radius: 99px;
`
export const InputCustoms = styled.input`
    &:checked ~ div > div:nth-child(1) {
        background-color: green;
    }
    &:checked ~ div > div:nth-child(2) {
        background-color: white;
        left: calc(100% - 40px);
    }
`
export const TextLeft = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    display: inline-flex;
    width: 50%;
    height: 100%;
    border-radius: 99px;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    color: white;
    padding-left: 10px;
`
export const TextRight = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    display: inline-flex;
    width: 50%;
    height: 100%;
    border-radius: 99px;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px;
    color: white;
    padding-right: 10px;
`
const OutlineAnimate = keyframes`
  0% {
    outline: 6px solid rgb(217, 235, 255, 1)
  }
  30% {
    outline: 6px solid rgb(217, 235, 255, 0.8)
  }
  50% {
    outline: 6px solid rgb(217, 235, 255, 0.5)
  }
  80% {
    outline: 6px solid rgb(217, 235, 255, 0.3)
  }
  100% {
    outline: 6px solid rgb(217, 235, 255, 0)
  }
`
export const ButtonPrimary = styled.button`
    text-align: center;
    width: 150px;
    flex: 1;
    font-weight: 700;
    color: white;
    background-color: #1677ff;
    height: 40px;
    outline: none;
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
    &.active{
      animation: ${OutlineAnimate} 1s ease 
    }
    &:hover{
      cursor: pointer;
    }
`
