import { createGlobalStyle, ThemeConsumer, ThemeProvider } from 'styled-components';
import Router from "./routes/Router";
import { ReactQueryDevtools } from 'react-query/devtools';//리액트쿼리 개발자도구 의미
//캐시에 어떤 데이터가 있는지 알려준다
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

const GlobalStyle = createGlobalStyle`//css기본값을 설정함
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
    display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
    line-height: 1;
}
menu, ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
* {
    box-sizing: border-box;
}
body {
    font-family: 'Source Sans Pro', sans-serif;
    //App5은 Themeprovider안에 존재하므로 theme 사용가능
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor}
}
a {
    text-decoration:none;
    color: inherit;//색깔을 부모에게서 가져와라
}
`;


//<>: fragment -> 여러개의 컴포넌트를 렌더링 하고싶다면
function App5() {//useRecoilValue: atom과 App을 연결하는 방법
    const isDark = useRecoilValue(isDarkAtom);//임포트 해오기
    return (
    <>
    <ThemeProvider theme = {isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
    </> //coins에다가 toggle 함수 보내주기위해 인자에 적기
    );
}

export default App5;