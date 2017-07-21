// Some types that are used in many places will be placed here.

export interface VerifiedRequest extends Request {
	body: {
		user: {
			id: string
		}
	}
}

export interface Store {
	account: {
		email: string,
		verified: boolean
	},
	user: {
		firstName: string,
		lastName: string,
		birthday: Date
	},
	sessionJWT: string
}