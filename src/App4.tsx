//theme object를 사용

import React, { useState } from 'react';

//다크모드 화이트모드 - 타입스크립트
// .theme. 하면 설정해놓은 변수가 자동으로 나옴
// const container = styled.div`
// background-color: ${props => props.theme.bgColor}
//`;





//typescript에게 내 component가 가져야하는 props 설명
//Ts는 onChange함수가 Input엘리먼트에 의해서 실행될것을 알려주는것
//이벤트도 보호를 받는것

//FormEvent: 폼안에 있기때문에 FormEvent를 쓴다
function App4() {
    const [value, setValue] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },//커렌트타겟의 value가 string인거 알고있음
        } = event;
        setValue( value );//입력된 값을 넣어주는것
    };
    //여기도 이벤트에 대한 타입명시 : Form엘리먼트에서 이벤트발생
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`"hello ${value}"`);
    }
    return ( 
    <div>
        <form onSubmit={onSubmit}>
            <input value = {value}
            onChange = {onChange} 
            type="text" 
            placeholder='username' />
            <button>Log in</button>
        </form>
    </div>
    );
}//bgColor를 Circle Component에 보내는중

export default App4;