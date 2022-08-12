import styled from "styled-components";
//styled 뒤에 사용하고 싶은 태그 적용
//styled-component -> 첫글자는 대문자
const Father = styled.div`
    display: flex;
`;
//속성은 다 가져오되 태그명만 바꾸고싶다면?
//as를 이용해 바꿀 태그명 기입
// <btn as = "a"></btn>  btn의 스타일을 가져오지만 button에서 a로 바귐(태그명)
//Input 5개에 똑같은 스타일 적용한다면?
//attrs 이용
const Input = styled.input.attrs({ required: true })`
    background-color: tomato; 
`;

function App2() {
    return (
    <Father>
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
    </Father>
    );
}

export default App2;