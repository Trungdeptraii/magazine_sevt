import {styled, keyframes} from "styled-components"
import {mews} from "../../assets/js/avaribale"

let appenNoti = keyframes`
    0%{
        top: -135px
    }
    100%{
        top: 5px
    }
`
export const DivContainerNoti = styled.div`
    position: fixed;
    left: 50%;
    top: 5px;
    transform: translateX(-50%);
    animation: ${appenNoti} ease 0.5s;
    z-index: 2051;
`
export const ContainerNoti = styled.div`
    border-radius: 10px;
    width: 384px;
    padding: 20px 24px;
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
    background-image: url(${mews});
    background-color: white;
    box-shadow: 0 0 2px 2px #9090f1;
`
export const TitleNoti = styled.div`
    font-weight: 800;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 8px;
    color: #040495;
`
export const IconNoti = styled.span`
`
export const TitleTextNoti = styled.span`
    color: #040495;
`
export const DesNoti = styled.span`
    font-size: 18px;
    font-weight: 700;
    color: #040495;
`
export const DivProgress = styled.div`

`
export const conicColors = {
    '0%': '#ff0000',
    '20%': '#eb4d26',
    '40%': '#ecb234',
    '60%': '#01fa22'
};
const animateDot = keyframes`
    to{
        opacity: 0;
    }
    from{
        opacity: 1;
    }
`
export const DotAnimate = styled.span`
    display: inline-flex;
    gap: 2px;
    font-weight: 800;
    & > span{
        animation: ${animateDot} 1s ease infinite;
    }
    & > span:nth-child(1){
        animation-delay: 0.3s;
        color: #040495;
    }
    & > span:nth-child(2){
        animation-delay: 0.5s;
        color: #040495;
    }
    & > span:nth-child(3){
        animation-delay: 0.7s;
        color: #040495;
    }
`



