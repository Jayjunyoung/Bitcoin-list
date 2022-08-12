import styled from "styled-components";
//styled 뒤에 사용하고 싶은 태그 적용
//styled-component -> 첫글자는 대문자
const Father = styled.div`
  display: flex
`;
//Box 하나로 해서 props를 이용해 css 두가지 맥이기
const Box = styled.div`
  background-color: ${(props) => props.bgColor}; 
  width: 100px;
  height: 100px;
`;
//함수형식 으로 쓰기 : 확장
//styled(Box) : Box의 모든속성 가져오고 border-radius를 추가한다
const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;


function App() {
  return (//bgColor 라는 props를 Box컴포넌트로 보냄 
  <Father>
      <Box bgColor = "teal" />
      <Circle bgColor = "whitesmoke" />
  </Father>
  )
}

export default App;
