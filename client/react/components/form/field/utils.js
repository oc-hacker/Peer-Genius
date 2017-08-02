import { orange500 } from 'material-ui/styles/colors';

export const getErrors = meta => {
	let { touched, error, warning } = meta;
	
	if (touched) {
		if (error) {
			return {
				errorText: error
			};
		}
		else if (warning) {
			return {
				errorText: warning,
				errorStyle: {
					color: orange500
				}
			};
		}
	}
};
