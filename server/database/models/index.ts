// Import and re-export all models for better management.
export { default as account } from './account';
export { default as communication } from './communication';
export { default as key } from './key';
export { default as mentor } from './mentor';
export { default as lesson } from './lesson';
export { default as user } from './user';

/*
 Database architecture:
 accounts - user login information
 users - user's personal info
 communications - user's communication method preferences
 mentors - the subjects that user can be a mentor in
 lessons - represents a lesson of tutoring between mentor and mentee
 keys - stores generated keys and other temporary data for user
 */

/*
 Differences from Voluntu:
 This database uses 'id' instead of 'uuid'. The stored string is still UUID, though.
 This database uses user's id as primary key, as opposed to account's id
 */

