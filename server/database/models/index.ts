// Import and re-export all models for better management.
export { default as account } from './account';
import user from './user';
import key from './key';
import communication from './communication';
import mentor from './mentor';

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

