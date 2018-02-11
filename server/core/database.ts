import * as async from 'async';

import * as models from '../database/models';

const order = [models.user, models.account, models.session, models.message, models.key, models.guru];
let index = 0;

async.eachSeries(order, async model => {
	await model
			.sync()
			.then(() => {
					console.log(`Synced ${index}`);
					index ++;
					return true;
			});
}, (err, contents) => {
	if (err) {
		throw err;
	}
	console.log('completed migration');
});
