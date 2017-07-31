// Utility function to generate messages with a template literal
const composeTemplate = (strings, insertions, validateParams, defaultMessage) => {
	const result = strings.slice(0, 1);
	
	insertions.forEach((insertion, index) => {
		result.push(typeof insertion === 'function' ? insertion(...validateParams) : insertion);
		result.push(strings[index + 1]);
	});
	
	return result.join('') || defaultMessage;
};

/**
 * Takes in a validator function and returns a validator template string tag.
 * @param {function} validate Returns a truthy value if the field is <b>valid</b>; otherwise returns a falsy value
 * @param {string} defaultMessage If the template string is empty or does not exist, return this message.
 */
const validator = (validate, defaultMessage = 'Validation error.') => {
	// Template string tag function syntax
	const tag = (strings, ...insertions) => {
		// Validator syntax
		return (...params) => {
			if (validate(...params)) {
				return null;
			}
			else {
				return Array.isArray(strings)
					? composeTemplate(strings, insertions, params, defaultMessage)
					: defaultMessage;
			}
		};
	};
	Object.defineProperty(tag, 'inverse', {
		get: () => validator(value => !validate(value), defaultMessage)
	});
	return tag;
};

export const required = validator(value => value, 'Required');

export const number = validator(value => typeof value === 'number' || /^[\d\.]+$/.test(value), 'Not a number');

export const email = validator(value => /^[\w-]+(?:\.[\w-]+)*@(?:\w+\.)+[a-zA-Z]{2,4}$/.test(value), 'Not an email');

export const range = (min = null, max = null, inclusive = [true, true]) => {
	if (!Array.isArray(inclusive)) {
		inclusive = [inclusive, inclusive];
	}
	return validator(value => {
		return !(min !== null && (inclusive[0] ? value < min : value <= min)) // Doesn't fail min condition
			&& !(max !== null && (inclusive[1] ? value > max : value >= max)); // Doesn't fail max condition
	}, `Not in range ${inclusive[0] ? '[' : '('}${min}, ${max}${inclusive[1] ? ']' : ')'}`);
};

export const same = (...others) => {
	if (Array.isArray(others[0])) {
		// Passed in array rather than discrete props
		others = others[0];
	}
	return validator((value, all) => {
		for (let field of others) {
			if (all[field] !== value) {
				return false;
			}
		}
		return true;
	}, 'Fields must match.')
};

export default validator;
