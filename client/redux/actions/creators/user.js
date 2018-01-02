// Most user-related actions go here, such as editing profile

import types from '../types';
import { post } from '../network';
import { handleError } from './utils';

export const editProfile = values => async dispatch => {
  let { birthdate, ...otherValues } = values;
  birthdate = new Date(values.birthdate);

  let response = await post('/api/user/edit', {
    ...otherValues,
    birthday: {
      year: birthdate.getUTCFullYear(),
      month: birthdate.getUTCMonth(),
      date: birthdate.getUTCDate()
    }
  });

  if (response.ok) {
    dispatch({
      type: types.EDIT_PROFILE,
      payload: {
        ...otherValues,
        birthdate: {
          year: birthdate.getUTCFullYear(),
          month: birthdate.getUTCMonth(),
          date: birthdate.getUTCDate()
        }
      }
    });
  }
  else {
    dispatch(handleError(response));
  }
};
