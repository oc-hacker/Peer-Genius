// Some dialog related actions go here.
import types from '../types';

/**
 * Normal action creator to close unexpected error dialogs.
 */
export const closeUnexpectedError = () => ({ type: types.CLOSE_UNEXPECTED_ERROR });

/**
 * Normal action creator to ignore unexpected server errors. Dev mode only.
 */
export const ignoreUnexpectedError = () => ({ type: types.IGNORE_UNEXPECTED_ERROR });