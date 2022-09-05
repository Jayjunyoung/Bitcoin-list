import { useQuery } from "react-query";
import { fetchCoinHistory } from './api';
import ApexChart from "react-apexcharts";//데이터 시각화를 담당
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface CharProps {
    coinId: string;
}

interface IHistorical {//data는 IHistorical의 배열임
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
        fetchCoinHistory(coinId)//리액트 쿼리
    );
    console.log(coinId);//여기서 못받아오는중 : undefined
    return <div>{isLoading ? "Loading chart.." 
    : <ApexChart 
        type="line" //차트종류: 선
        series= {[//우리가 차트에 보내고싶어하는 데이터가 들어가있음
            {
                name: "Price",//데이터에 이름을 붙여주는것
                data: data ? data?.map(price => parseFloat(price.close)) : [],
            },//data가 있을때 없을때를 삼항연산자를 이용
        ]}
        options = {{//option의 어떤 props가 있는지 알면 차트를 입맛대로 꾸미기가능
            theme : {//chart의 다크모드 / 라이트모드도 정해주기
                mode: isDark ? "dark" : "light",
            },
            chart : {
                height: 500,
                width: 500,
                toolbar: {
                    show: false,//도구같은걸 가려줌
                },
                background: "transparent",
            },
            stroke : {
                curve: "smooth",
                width: 1,
            },
            yaxis: {
                show: false,
            },
            xaxis: {
                axisBorder: {show: false},
                axisTicks: {show: false},
                labels: {show: false},
                //type: "datetime",
                categories: data ? data?.map(price => new Date(price.time_close * 1000)) : [],
                //날짜 형식을 수정해줌
            },
            fill: {
                type: "gradient", 
                gradient:{
                    gradientToColors: ["#0be881"],
                    stops: [0, 100],
            }
            },
            colors: ["#0fbcf9"],
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`
                }
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