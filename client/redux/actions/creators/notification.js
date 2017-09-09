import store from '../store.js';

export const toggleShowNotifications = () => {
	return {
		type: types.TOGGLE_SHOW_NOTIFICATIONS
	}
}

export const closeNotifications = () => {
	return {
		type: types.CLOSE_NOTIFICATIONS
	}
}

/**
 * Redux action generator for adding notifications.
 *
 * @param  {Array} [notifications] The array of notifications
 * @return {Action} The add notifications action
 */
export const addNotifications = notifications => {
	//Trigger the display of notifications
	for (let notification of notifications) {
		let newNotification = new Notification(notification.message);
	}

	return {
		type: types.ADD_NOTIFICATIONS,
		notifications
	};
}

let notificationTimeout = 0;
/**
 * Redux Thunk action for getting unread notifications.
 */
export const getUnreadNotifications = () => async dispatch => {
	if (notificationTimeout) clearTimeout(notificationTimeout);

	dispatch({
		type: types.GET_UNREAD_NOTIFICATIONS,
	});

	// Send a POST request to get unread notifications.
	const response = await fetch(serverURL + '/api/notification/unread', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			afterID: store.getState().notifications.list.length ? store.getState().notifications.list[0].id : 0
		}),
		credentials: 'include'
	});

	if (response.ok) {
		const json = await response.json();

		// Upon success, initialize the hours with the provided object in the response.
		dispatch(addNotifications(json.notifications));
		notificationTimeout = setTimeout(() => {
			dispatch(getUnreadNotifications());
		}, refreshNotificationsInterval);
		dispatch({
			type: types.GET_UNREAD_NOTIFICATIONS,
		});
	} else {
		dispatch({
			type: types.GET_UNREAD_NOTIFICATIONS,
		});
	}
};

/**
 * Redux Thunk action for marking all notifications as read.
 */
export const readNotifications = () => async dispatch => {
	let ids = store.getState().notifications.list.filter(notification => !notification.read).map(notification => notification.id);

	dispatch({
		type: types.READ_NOTIFICATIONS
	});

	// Send a POST request to read notifications.
	const response = await fetch(serverURL + '/api/notification/read', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			ids
		}),
		credentials: 'include'
	});

	if (response.ok) {

	}
}
