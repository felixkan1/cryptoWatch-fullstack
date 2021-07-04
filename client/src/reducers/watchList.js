/* eslint-disable */
import { TOGGLE_WATCH, INITIAZLIZE_WATCH } from '../actions/watchList';

export default function watchList(state = [], action) {
  switch (action.type) {
    case TOGGLE_WATCH:
      const { id } = action;
      return state.includes(id)
        ? [...state].filter((watching) => watching !== id)
        : [...state].concat(id);

    case INITIAZLIZE_WATCH:
      return state;
    default:
      return state;
  }
}
