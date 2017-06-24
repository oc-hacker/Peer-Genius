/**
 * Default verification function for text fields.
 *
 * Only checks for existence if the field is required.
 * 
 * @param {String} [text] The text to verify
 * @param {Boolean} [required] Whether the field is required
 * @return {String} The error, or an empty string if there is none
 */
export function verifyText(text, required) {
	if (required && text === '') {
		return 'This field is required.';
	}

	return '';
};

/**
 * Verification function for email text fields.
 * 
 * @param {String} [text] The text to verify
 * @param {Boolean} [required] Whether the field is required
 * @return {String} The error, or an empty string if there is none
 */
export function verifyEmailText(text, required) {
	if (text === '') {
		if (required) {
			return 'This field is required.';
		}
	} else {
		let atIndex = text.indexOf('@');

		// The '@' must exist and cannot be the first character, and there must be a '.' after it but not at the very end.
		if (atIndex < 1 || !((text.indexOf('.', atIndex) + 1) % text.length)) {
			return 'Invalid email.';
		}
	}

	return '';
};

/**
 * Verification function generator for date text fields.
 * 
 * @param {Number} [minAge] The minimum age of the date
 * @param {Number} [maxAge] The maximum age of the date
 * @return {Function} The verification function
 */
function createVerifyDateText(minAge, maxAge) {
	return function(dateText, required) {
		// Requirement check.
		if (dateText === '') {
			return required ? 'This field is required.' : '';
		}

		// Find '/' breaks; they must exist.
		let firstBreak = dateText.indexOf('/');
		if (firstBreak === -1) {
			return 'Invalid date.';
		}

		let secondBreak = dateText.indexOf('/', firstBreak + 1);
		if (secondBreak === -1) {
			return 'Invalid date.';
		}

		// Get the month, date, and year from the breaks.
		let month = parseInt(dateText.substring(0, firstBreak));
		let date = parseInt(dateText.substring(firstBreak + 1, secondBreak));
		let year = parseInt(dateText.substring(secondBreak + 1));

		// Get the current year and check the age.
		let currYear = (new Date()).getFullYear();
		if (!year || year > currYear - minAge || year < currYear - maxAge) {
			return 'Invalid year.';
		}

		// Check that the month is valid.
		if (!month || month < 1 || month > 12) {
			return 'Invalid month.';
		}

		// Check that the date is valid based on the month.
		let maxDate = month === 2 ? (year % 400 ? (year % 100 ? (year % 4 ? 28 : 29) : 28) : 29) : 
									(month > 7 ? (month % 2 ? 30 : 31) : (month % 2 ? 31 : 30));
		if (!date || date < 1 || date > maxDate) {
			return 'Invalid day.';
		}

		// If everything checks out, there's no error.
		return '';
	};
};

// Students can be between 10 and 18 years old.
export const verifyStudentBirthText = createVerifyDateText(10, 18);
// Parents can be between 19 and 80 years old.
export const verifyParentBirthText = createVerifyDateText(19, 80);
// Dates must be within the last year.
export const verifyDateText = createVerifyDateText(0, 1);