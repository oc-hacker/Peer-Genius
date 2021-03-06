// Most user-related actions go here, such as editing profile

import types from '../types';
import { post } from '../network';
import { handleError } from './utils';

export const editProfile = values => async dispatch => {
  let { birthdate, ...otherValues } = values;

  let response = await post('/api/user/edit', {
    ...otherValues,
    birthday: birthdate
  });

  if (response.ok) {
    dispatch({
      type: types.EDIT_PROFILE,
      payload: {
        ...otherValues,
        birthdate
      }
    });
  }
  else {
    dispatch(handleError(response));
  }
};

export const editImage = values => async dispatch => {
  let { picture } = values;

  let response = await post('/api/account/editProfilePicture', {
    picture
  });

  if (response.ok) {
    dispatch({
      type: types.EDIT_PROFILE,
      payload: {
        picture
      }
    });
  } else {
    dispatch(handleError(response));
  }
};
