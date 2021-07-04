/* eslint-disable */
import { getInitialData } from '../Utils/api';
import { receiveCoins } from './coins';
import { initializeWatch } from './watchList';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then((coins) => {
      dispatch(hideLoading());
      dispatch(receiveCoins(coins));
      dispatch(initializeWatch());
    });
  };
}
