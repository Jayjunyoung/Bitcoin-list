import { useState , useEffect} from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import {fetchCoins} from "./api";

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;


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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {//색깔이 나오는데 0.2초만 소요되게
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
        padding: 20px;
    }
    &:hover {//&: li를 가져와서 추가적으로 속성을 적용할거야!
        //hover: 마우스를 해당부분에 올리면
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Loader = styled.span`
    text-align: center;
    display: block; // box처럼 만듬
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`; 




interface ICoin {
        id: string;//인터페이스를 통해 타입 알려주는 방법
        name: string;
        symbol: string;
        rank: number;
        is_new: boolean;
        is_active: boolean;
        type: string;
}


function Coins() {//[]를 통해 배열인거까지 설명해주기
    const { isLoading , data} = useQuery<ICoin[]>(["allCoins"], fetchCoins) ;
    //react-query 사용하는 방법
    //fetcher함수 불러와서 로딩중이면 isLoading에다 알려줄거야
    //data는 오른쪽 data에 넣어줄거야

    //react-query 사용 전 구문
    /*const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {//api의 response를 받기위해 await 쓸것
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);//코인 정보를 받아와 보여주면 false로 바뀜
        })();//()(); => 앞에 있는 함수를 바로 실행 시킬수있음
    }, []);*/

    return (//비트코인 이름을 누르면 그 코인의 아이디를 가진 URL로 넘어감
    <Container>
        <Header>
            <Title>코인</Title>
        </Header>
        {isLoading ? <Loader>Loading..</Loader> 
        : <CoinsList>
            {data?.slice(0,100).map(coin => 
                <Coin key={coin.id}>
                    <Link to={{//Link로 데이터를 보내는 또다른 방법
                        ////클릭 시 state를 가지게 됌
                        pathname: `/${coin.id}`,
                        state: {name: coin.name},
                    }}>
                    <Img 
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
                    {coin.name} &rarr;</Link>
                </Coin>)}
        </CoinsList>}
        console.log(data);
    </Container>
    );
}

export default Coins;