// import * as async from 'async';

import * as models from '../database/models';
// import { sequelizeAdmin } from '../database/reference';

const order = [models.user, models.account, models.session, models.message, models.key, models.guru];
// let index = 0;

const eachSeries = async () => {
	console.log('Beginning database sync.');
	for (let model of order) {
		await model.sync({ logging: console.log });
	}
	console.log('Database sync complete.');
};

eachSeries();

/* async.eachSeries(order, async model => {
	await model
			.sync({ logging: console.log })
			.then(() => {
					console.log(`Synced ${index}`);
					index ++;
			});
}, (err, contents) => {
	if (err) {
		throw err;
	}
	console.log('completed migration');
}); */
