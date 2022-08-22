import "styled-components";

//DefaultTheme에 대한 자료형 설정
declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
        }
}