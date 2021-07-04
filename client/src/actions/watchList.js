export const TOGGLE_WATCH = 'TOGGLE_WATCH';
export const INITIAZLIZE_WATCH = 'INITIALIZE_WATCH';

export function handleToggleWatch(id) {
  return {
    type: TOGGLE_WATCH,
    id,
  };
}

export function initializeWatch() {
  return {
    type: INITIAZLIZE_WATCH,
  };
}
