import styled from "styled-components";
import { useEffect, useState } from 'react';
//문서 전체에 스타일을 적용시킨다
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import {
    Switch,
    Route,
    useLocation,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from './api';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`; 

const Loader = styled.span`
    text-align: center;
    display: block; // box처럼 만듬
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;
//여기다가 prop를 넘겨서 선택됐을때 or 아닐때 색깔 지정
const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;


//useParams: url의 파라미터를 준다
//ex coinId: btc
interface Params {
    coinId: string;
};//useParams가 coinId를 포함한 객체를 반환할것이라 설정

interface RouteState {
    name: string;
};

interface ITag {//I: 인터페이스인걸 설명해줌
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
};


//key들을 조인해서 문자로 바꾸고 복사붙이기한것
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string; 
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
};


interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes:  {
        USD:   {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
};

interface ICoinProps {
};

//useRouteMatch: 저 유알엘에 있는지를 확인해주는 역할
function Coin( {}: ICoinProps) {

    const { coinId } = useParams<Params>();
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const {isLoading: infoLoading, data:infoData} = useQuery<InfoData>(["info",coinId], () => fetchCoinInfo(coinId))
    const {isLoading: tickersLoading, data:tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId))
    //key가 같으므로 "info", "tickers" 로 구분 , isLoading도 마찬가지
    // : 를 통해 이름을 붙여주는것(같은걸 방지)
    // useQuery의 세번째 인자로는 몇초마다 패치해줄건지 설정해줄수 있음

    /*
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    
    useEffect(() => {
        (async () => {//한줄로 쓰기위해 await를 두번써서 간략화 : 캡슐화
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId]);//url은 안변할것이므로 한번만 실행될것임
    */
    //loading부분은 state가 없을 경우 즉 url로 바로들어올때 실행될것

    //Helmet은 우리문서의 이름을 정하기 위해 사용한다
    const loading = infoLoading || tickersLoading;
    return ( 
        <Container>
            <Helmet> 
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
            <Title>
                {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
            </Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader>) : (
        <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price:</span>
                    <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Suply:</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>

            <Tabs>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>CHART</Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>PRICE</Link>
                </Tab>
            </Tabs>
            
            
            <Switch>
                <Route path={`/:${coinId}/price`}>
                    <Price />
                </Route>
                <Route path={`/:${coinId}/chart`}>
                    <Chart coinId={ coinId }/>
                </Route>
            </Switch>
        </>
        )} 
        
        </Container>
    );
}           //Switch 부분
            //중첩 라우팅
            //같은 화면에서 다른걸 두개 렌더링
            //여기서 url을 바꿈으로써 Price or Chart가 보이게함
////Api정보를 다시 가져오지 않아도 누름으로써 빠르게 구현가능
//state가 존재하면 name가져오고 아니면 Loading을 띄어라

export default Coin;