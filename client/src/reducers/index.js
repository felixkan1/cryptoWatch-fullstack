import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import coins from './coins';
import watchList from './watchList';

export default combineReducers({
  coins,
  loadingBar: loadingBarReducer,
  watchList,
});
