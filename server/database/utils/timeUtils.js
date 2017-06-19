

class timeUtilities {

	/**
	 * Creates a time stamp based on current time.
	 */
	async makeTimestamp() {
		// Get the current date
		let today = new Date();

		let year = await today.getFullYear();
		let month = await today.getMonth() + 1; //January is 0
		if (month<10) {
			month = '0' + month;
		}
		let day = await today.getDate();
		if (day<10) {
			day = '0' + day;
		}

		let hour = await today.getHours();
		if (hour < 10) {
			hour = '0' + hour;
		}
		let minute = await today.getMinutes();
		if (minute < 10) {
			minute = '0' + minute;
		}

		let timeStamp = `Y${year}M${month}D${day}_H${hour}M${minute}`;
		return timeStamp;
	}

	/**
	 * Calculates the time passed between startTime and endTime
	 *
	 * @param {Date} [startTime] The starting time of the time period
	 * @param {Date} [endTime] The ending time of the time period
	 *
	 * @return {Number} The amount of time, in hours, passed between the two times; 0 if startTime is after endTime
	 */
	async calcTimeLength(startTime, endTime) {
		let intervalMilis = await endTime.getTime() - await startTime.getTime();

		// 3600000 miliseconds in an hour
		return intervalMilis < 0 ? 0 : intervalMilis / 3600000;
	}

	/**
	 * Calculates the totalAmount of time recorded in the given rows.
	 *
	 * @param {Array<Sequelize>} [records] An array of sequelize objects representing records
	 * @param {Date} [start] The absolute starting time; no hours will be counted before this time
	 *
	 * @return {Number} The amount of time, in hours, recorded in the given records
	 */
	async calcTotalTime(records, start) {
		let hours = 0;

		// If start time is not provided, set it to zero.
		if (!start) {
			start = new Date(0);
		}

		// Loop thorugh the records to evaluate each time period
		for (record of records) {
			hours = hours + await this.calcTimeLength(start > record.startTime ? start : record.startTime, endTime);
		}

		return hours;
	}
	
	/**
	 * Checks if the two dates are on the same day.
	 *
	 * @returns {Promise.<Boolean>}
	 */
	async sameDay(date1, date2) {
		return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
	}
}

const timeUtils = new timeUtilities();
export default timeUtils;