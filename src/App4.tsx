//theme object를 사용
import Circle from "./Circle";


//typescript에게 내 component가 가져야하는 props 설명
function App4() {
    return ( 
    <div>
        <Circle borderColor = "yellow" bgColor = "teal" />
        <Circle bgColor = "tomato" />
    </div>
    );
}//bgColor를 Circle Component에 보내는중

export default App4;