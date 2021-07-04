/* eslint-disable */

import { RECEIVE_COINS } from '../actions/coins';

export default function coins(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COINS:
      const coins = {};

      for (let i = 0; i < action.coins.length; i++) {
        const coinID = action.coins[i].id;
        const coinData = action.coins[i];
        Object.assign(coins, { [coinID]: coinData });
      }

      return {
        ...state,
        ...coins,
      };
    default:
      return state;
  }
}
