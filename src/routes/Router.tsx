import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coin from "../routes/Coin";
import Coins from "../routes/Coins";

//:coinID : URl이 갖는 변수값을 의미

interface IRouterProps {
    toggleDark: () => void;//함수의 타입 의미: 커서를 놓으면 알수있음
    isDark: boolean;
};


function Router({ toggleDark , isDark }:IRouterProps) {
    return <BrowserRouter>
    <Switch>
        <Route path = "/:coinId">
            <Coin isDark = {isDark}/>
        </Route>
        <Route path = "/">
            <Coins toggleDark = {toggleDark}/>
        </Route>
    </Switch>
    </BrowserRouter>
}

export default Router;