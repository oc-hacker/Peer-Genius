import { types } from '../../reference/actionTypes.js';

/**
 * Redux action generator for creating forms in the Redux store.
 *
 * If a form object of the same name already exists, it will be overwritten.
 * 
 * @param {String} [formName]
 */
export const createForm = formName => ({
	type: types.CREATE_FORM,
	formName
});

/**
 * Redux action generator for refreshing forms in the Redux store.
 *
 * The form will be refreshed, resetting the 'check' field to false and the errors to an empty object.
 *
 * Will throw an error if the form did not exist.
 * 
 * @param {String} [formName]
 */
export const refreshForm = formName => ({
	type: types.REFRESH_FORM,
	formName
});

/**
 * Redux action generator for marking that a form has finished loading.
 *
 * Sets fetching to false to close loading dialog.
 */
export const formLoaded = () => ({
	type: types.FORM_LOADED
});

/**
 * Redux action generator for clearing forms in the Redux store.
 *  
 * @param {String} [formName]
 */
export const clearForm = formName => ({
	type: types.CLEAR_FORM,
	formName
});

/**
 * Redux action generator for moving forms in the Redux store.
 *
 * Deletes the form under oldName, and overwrites any existing form under newName.
 *
 * If there was no form under oldName, creates a new form under newName.
 * 
 * @param {String} [oldName]
 * @param {String} [newName]
 */
export const moveForm = (oldName, newName) => ({
	type: types.MOVE_FORM,
	oldName,
	newName
});

/**
 * Redux action generator for merging forms in the Redux store.
 *
 * Copies the data in the form under fromName to the form under toName, discarding the previous form under toName.
 *
 * Will throw an error if no form exists under fromName.
 * 
 * @param {String} [fromName]
 * @param {String} [toName]
 */
export const copyForm = (fromName, toName) => ({
	type: types.COPY_FORM,
	fromName,
	toName
});

/**
 * Redux action generator for merging forms in the Redux store.
 *
 * Deletes the form under fromName, and moves the data into the form under toName.
 *
 * Does not merge errors or 'check' field.
 *
 * Will throw an error if no form exists under fromName.
 * 
 * @param {String} [fromName]
 * @param {String} [toName]
 */
export const mergeForm = (fromName, toName) => ({
	type: types.MERGE_FORM,
	fromName,
	toName
});

/**
 * Redux action generator for setting form variables in the Redux store.
 *
 * Sets the error as well under the same variable name in the form's err object.
 *
 * Will throw an error if there is no form with the given name.
 * 
 * @param {String} [formName]
 * @param {String} [varname]
 * @param {Any} [data]
 * @param {String} [err]
 */
export const sendFormVar = (formName, varName, data, err) => ({
	type: types.SEND_FORM_VAR,
	formName,
	varName,
	data,
	err
});

/**
 * Redux action generator for setting many form variables in the Redux store.
 *
 * Will set the variables using the same key as in the object passed.
 *
 * Will throw an error if there is no form with the given name.
 * 
 * @param {String} [formName]
 * @param {Object} [objVars]
 */
export const sendFormVars = (formName, objVars) => ({
	type: types.SEND_FORM_VARS,
	formName,
	objVars
});

/**
 * Redux action generator for setting a form error variable in the Redux store.
 *
 * Sets the error under the variable name in the form's err object.
 *
 * Will throw an error if there is no form with the given name.
 * 
 * @param {String} [formName]
 * @param {String} [varname]
 * @param {String} [err]
 */
export const sendFormErr = (formName, varName, err) => ({
	type: types.SEND_FORM_ERR,
	formName,
	varName,
	err
});

/**
 * Redux action generator for starting a form check.
 *
 * Sets the 'check' field to true in the form, prompting field components to refresh and send any errors.
 *
 * Also sets 'fetching' to true to display the loading dialogue.
 *
 * Will throw an error if there is no form with the given name.
 * 
 * @param {String} [formName]
 */
export const startFormCheck = formName => ({
	type: types.START_FORM_CHECK,
	formName
});

/**
 * Redux action generator for ending a form check.
 *
 * Sets the 'check' field to false in the form, as well as 'fetching', to stop displaying the loading dialogue.
 *
 * Will throw an error if there is no form with the given name.
 * 
 * @param {String} [formName]
 */
export const endFormCheck = formName => ({
	type: types.END_FORM_CHECK,
	formName
});