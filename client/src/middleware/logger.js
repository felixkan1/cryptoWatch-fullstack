/* eslint-disable */
const logger = (store) => (next) => (action) => {
  console.group(action.type);

  const returnValue = next(action);

  console.groupEnd();
  return returnValue;
};

export default logger;
