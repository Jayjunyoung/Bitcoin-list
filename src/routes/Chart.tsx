import { useQuery } from "react-query";
import { fetchCoinHistory } from './api';
import ApexChart from "react-apexcharts";//데이터 시각화를 담당
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface CharProps {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}


function Chart({ coinId } : CharProps) {
    const isDark = useRecoilValue(isDarkAtom)//chart랑 리코일 연결
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv",coinId], () => 
        fetchCoinHistory(coinId)
    );
    console.log(coinId);//여기서 못받아오는중 : undefined
    return <div>{isLoading ? "Loading chart.." 
    : <ApexChart 
        type="line" 
        series= {[//우리가 차트에 보내고싶어하는 데이터가 들어가있음
            {
                name: "sales",
                data: data ? data?.map(price => parseFloat(price.close)) : [],
            },//data가 있을때 없을때를 삼항연산자를 이용
        ]}
        options = {{
            theme : {//chart의 다크모드 / 라이트모드도 정해주기
                mode: isDark ? "dark" : "light",
            },
            chart : {
                height: 500,
                width: 500,
                toolbar: {
                    show: false,
                }
            },
            stroke : {
                curve: "smooth",
                width: 1,
            }
        }}
    />}
    </div>
}

/*function Chart({ coinId }:CharProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["price",coinId], () => fetchCoinHistory(coinId));
    return <div>{isLoading ? "Loading chart.." 
    : <ApexChart 
        type="line" 
        series= {[//우리가 차트에 보내고싶어하는 데이터가 들어가있음
                {
                    name: "Price",
                    data: data?.map((price) => parseFloat(price.close)),
                }
            ]} 
        options = {{
            theme : {
                mode: "dark",
            },
            chart : {
                height: 500,
                width: 500,
                toolbar: {
                    show: false,
                }
            },
            stroke : {
                curve: "smooth",
                width: 1,
            }
        }}
    />}
    </div>
}*/

export default Chart;