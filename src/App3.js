import styled , {keyframes} from "styled-components";

//keyframes: animation 주는방법

const animation = keyframes`
    0% {
        transform: rotate(0deg);
        border-radius: 0px;
    }
    5% {
        transform: rotate(360deg);
        border-radius: 100px;
    }
    100% {
        transform: rotate(0deg);
        border-radius: 0px;
    }
`;


const Wrapper = styled.div`
    display: flex;
    height: 100vh;//vh, vw: %랑 같은개념이지만 %처럼 부모속성을 중요시하지않음
    width: 100vw;
    justify-content: center;
    align-items: center;
`;

const Emoji = styled.span`
    font-size: 36px;
`;


const Box = styled.div`
    height: 200px;
    width: 200px;
    background-color: tomato;
    animation: ${animation} 1s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    //Emoji 컴포넌트를 직접적으로 타켓한것
    //밑에주석 설명은 태그명으로 했을때 설명
    ${Emoji} {//span 엘리먼트를 을 타겟으로 해서 css설정(span이 styled component가 아니므로)
        &:hover {//span을 부르고 hover까지 적용 -> pushedo Selector : &로 span 대체
            font-size: 98px;
        }//box컴포넌트 안에 있는 Emoji컴포넌트 에만 적용된다
    }
`;



function App3() {
    return <Wrapper>
        <Box>
            <Emoji>★</Emoji>
        </Box>
        <Emoji>☆</Emoji>
    </Wrapper>;
}

export default App3;