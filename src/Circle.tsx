import styled from "styled-components"
import { useState } from 'react';

interface ContainerProps {
    bgColor: string;
    borderColor: string;//Container는 require을 요구중
}

//스타일컴포넌트인 Container도 bgColor를 받게하는 방법
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    border: 1px solid ${props => props.borderColor}
    //스타일 컴포넌트는 borderColor가 필수이므로 색 지정해줘야함
`;

//1. bgColor를 받아 Container에 보내는중
//2. bgColor가 CircleProps의 형식을 지키고 있다
// ?? : null 병합연산자
function Circle({ bgColor, borderColor } : CircleProps) {
    const [counter, setValue] = useState<number | string>(0);
    //< | > : 자료형 2가지중 하나이다를 명시
    setValue(2);
    return <Container bgColor={bgColor} borderColor = {borderColor ?? bgColor}/>
}//borderColor가 undefined 상태라면 bgColor랑 같은색을 가지게 한다
//아니라면 borderColor 색을 사용한다

//interface: 객체 모양을 TypeScript에게 설명해주는것
//객체로 해서 bgColor을 문자로 구성
interface CircleProps {
    bgColor: string;
    borderColor?: string;
}//? : optional인 props로 만들어준다

export default Circle;