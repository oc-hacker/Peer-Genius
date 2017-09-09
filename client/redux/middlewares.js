const standardProps = ['type', 'payload', 'meta', 'error'];

/**
 * Redux middleware that checks to ensure that the actions are following flux standard actions.
 */
export const standardize = store => next => action => {
  if (typeof action === 'function') {
    return next(action);
  }
  for (let prop in action) {
    if (action.hasOwnProperty(prop) && !standardProps.includes(prop)) {
      console.error(`Redux action of type ${action.type} does not follow flux standard action standards.`);
      break;
    }
  }
  return next(action);
};
