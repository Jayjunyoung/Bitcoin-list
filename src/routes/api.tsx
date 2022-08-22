

const Base_URL = `https://ohlcv-api.nomadcoders.workers.dev` 

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
    const startDate = endDate - 60 * 60 * 23 * 7 * 1;//하루전을 의미
    return fetch(`${Base_URL}?coinId=${coinId}`).then(response => {
        return response.json();
    });
}