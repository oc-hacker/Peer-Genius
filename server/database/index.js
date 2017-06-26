import Model from 'sequelize/lib/model';
// Import and re-export all models for better management.
import account from './models/account';
import user from './models/user';
import key from './models/key';
import communication from './models/communication';
import mentor from './models/mentor';

/*
 Database architecture:
 accounts - user login information
 users - user's personal info
 communications - user's communication method preferences
 mentor - the subjects that user can be a mentor in
 */

/*
 Differences from Voluntu:
 This database uses 'id' instead of 'uuid'. The stored string is still UUID, though.
 This database uses user's id as primary key, as opposed to account's id
 */


export default {
	account,
	user,
	key,
	communication,
	mentor
};
