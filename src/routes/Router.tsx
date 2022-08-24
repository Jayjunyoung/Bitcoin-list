import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coin from "../routes/Coin";
import Coins from "../routes/Coins";

//:coinID : URl이 갖는 변수값을 의미


interface IRouterProps {}

function Router({} : IRouterProps) {
    return <BrowserRouter>
    <Switch>
        <Route path = "/:coinId">
            <Coin />
        </Route>
        <Route path = "/">
            <Coins />
        </Route>
    </Switch>
    </BrowserRouter>
}

export default Router;