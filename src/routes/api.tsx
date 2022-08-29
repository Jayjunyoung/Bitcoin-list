const Base_URL = `https://api.coinpaprika.com/v1` 

export function fetchCoins() {
    return fetch(`${Base_URL}/coins`).then(response => {
        return response.json();
    });
}

//코인정보 함수
export function fetchCoinInfo(coinId: string) {
    return fetch(`${Base_URL}/coins/${coinId}`).then(response => {
        return response.json();
    });
}

//가격정보 패치함수
export function fetchCoinTickers(coinId: string) {
    return fetch(`${Base_URL}/tickers/${coinId}`).then(response => {
        return response.json();
    });
}

export function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000); // 밀리세컨즈를 100으로 나누어 seconds로바꿈
    const startDate = endDate - 60 * 60 * 23 * 7 * 1;//1주일에서 -1시간 한것
    return fetch(`${Base_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response => {
        return response.json();
    });
}