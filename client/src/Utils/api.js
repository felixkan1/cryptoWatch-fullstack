/* eslint-disable */
export function getInitialData() {
  return fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250'
  ).then((data) => data.json());
}
export function getHistoriacalData(id, days) {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  ).then((data) => data.json());
}

export function getCoinData(id) {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
  ).then((data) => data.json());
}

export function getRedditFeed(subredditUrl) {
  return fetch(`${subredditUrl}.json`).then((data) => data.json());
}

export function getGoogleNews(coin) {
  return fetch(`/googleNews/${coin}`).then((res) => res.json());
}
