export const RECEIVE_COINS = 'RECEIVE_COINS';

export function receiveCoins(coins) {
  return {
    type: RECEIVE_COINS,
    coins,
  };
}
