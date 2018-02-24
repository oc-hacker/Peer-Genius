// Import and re-export all models for better management.
export { default as account } from './account';
export { default as course } from './course';
export { default as guru } from './guru';
export { default as key } from './key';
export { default as message } from './message';
export { default as session } from './session';
export { default as user } from './user';
export { default as notification } from './notification';
export { default as report } from './report';

/*
 Database architecture:
 accounts - user login information
 users - user's personal info
 courses - the courses (subjects) available
 gurus - the subjects that user can be a guru in
 sessions - represents a session of tutoring between guru and newbie
 keys - stores generated keys and other temporary data for user
 */

/*
 Differences from Voluntu:
 This database uses 'id' instead of 'uuid'. The stored string is still UUID, though.
 This database uses user's id as primary key, as opposed to account's id.
 Foreign keys have 'Id' postfix.
 */
