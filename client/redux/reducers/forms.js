import { types } from '../../reference/actionTypes.js';

/**
 * Reducer for the forms object in the Redux store.
 */
export default function forms(state = {}, action) {
	switch (action.type) {
		case types.CREATE_FORM: {
			// Create a new form with the name supplied, overwriting any existing form
			let { [action.formName]: form, ...rest } = state;
			return {
				...rest,
				[action.formName]: {
					err: {},
					check: false
				}
			}
		}
		case types.REFRESH_FORM: {
			// Reset the errors and 'check' field of the form with the given name
			let { [action.formName]: form, ...rest } = state;
			let { err, check, ...formRest } = form;
			return {
				...rest,
				[action.formName]: {
					...formRest,
					err: {},
					check: false
				}
			}
		}
		case types.CLEAR_FORM: {
			// Clear the form with the given name
			return {
				...state,
				[action.formName]: {
					err: {},
					check: false
				}
			};
		}
		case types.MOVE_FORM: {
			// Move the form object stored under the old name to the new name, overwriting any form there
			let { [action.oldName]: formToMove, [action.newName]: oldForm, ...rest } = state;
			if (formToMove) {
				return {
					...rest,
					[action.newName]: formToMove
				};
			} else {
				// If there was no form at the old name, create a new form at the new name
				return {
					...rest,
					[action.newName]: {
						err: {},
						check: false
					}
				};
			}
		}
		case types.COPY_FORM: {
			// Copy the form under fromName to toName
			let { [action.fromName]: formToCopy, [action.toName]: oldForm, ...rest } = state;
			return {
				...rest,
				[action.fromName]: formToCopy,
				[action.toName]: formToCopy
			};
		}
		case types.MERGE_FORM: {
			// Merge the variables in fromName to the form under toName
			let { [action.fromName]: formToMerge, [action.toName]: formToMergeInto, ...rest } = state;
			let { err, check, ...varsToMerge } = formToMerge;
			return {
				...rest,
				[action.toName]: {
					...formToMergeInto,
					...varsToMerge
				}
			};
		}
		case types.SEND_FORM_VAR: {
			// Set the given variable of the form with the given name, as well as the error
			let { [action.formName]: form, ...rest } = state;
			let { [action.varName]: prevValue, err, ...formRest } = form;
			let { [action.varName]: prevErr, ...errRest } = err;
			return {
				...rest,
				[action.formName]: {
					...formRest,
					[action.varName]: action.data,
					err: {
						...errRest,
						[action.varName]: action.err
					}
				}
			};
		}
		case types.SEND_FORM_VARS: {
			// Inject the variables in the given object into the form with the given name
			let { [action.formName]: form, ...rest } = state;
			let objVars = action.objVars;
			if (form) {
				return {
					...rest,
					[action.formName]: {
						...form,
						...objVars
					}
				}
			} else {
				return {
					...rest,
					[action.formName]: {
						...objVars,
						err: {},
						check: false
					}
				}
			}
		}
		case types.SEND_FORM_ERR: {
			// Set the given error in the form with the given name
			let { [action.formName]: form, ...rest } = state;
			let { err, ...formRest } = form;
			let { [action.varName]: prevErr, ...errRest } = err;
			return {
				...rest,
				[action.formName]: {
					...formRest,
					err: {
						...errRest,
						[action.varName]: action.err
					}
				}
			};
		}
		case types.START_FORM_CHECK: {
			// Set the 'check' field to true and clear the err object of the form with the given name
			let { [action.formName]: form, ...rest } = state;
			let { err, check, ...formRest } = form;
			return {
				...rest,
				[action.formName]: {
					...formRest,
					err: {},
					check: true
				}
			}
		}
		case types.END_FORM_CHECK: {
			// Set the 'check' field to false in the form with the given name
			let { [action.formName]: form, ...rest } = state;
			let { check, ...formRest } = form;
			return {
				...rest,
				[action.formName]: {
					...formRest,
					check: false
				}
			}
		}
		case types.RESET: {
			// Reset the forms object, deleting all forms
			return {};
		}
		default:
			return state;
	}
};