import {atom} from "recoil";


export const isDarkAtom = atom({
    key: "isDark",//유일해야함
    default: true,//기본값 false이므로 라이트모드 일것
});//Recoli Atom: value들을 모아놓은것
