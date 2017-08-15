export const getHourLength = hour => ((new Date(hour.endTime) - new Date(hour.startTime)) / 3600000);

export const MMDDYYYY = dateStr => {
	if (!dateStr) return '';
	let date = new Date(dateStr);
	return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
}

export const HHMMAMPM = dateStr => {
	let date = new Date(dateStr);

	let hour = (12 - ((24 - date.getHours()) % 12)).toString();
	let min = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
	let amPm = date.getHours() < 12 ? ' AM' : ' PM';

	return hour + ':' + min + amPm;
}