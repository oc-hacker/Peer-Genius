import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';

import { Request } from 'express';
import { AsyncHandler, VerifiedRequest } from '../../types';

class Notification {
	public to;
	public message;
	
	constructor(to: string, message: string) {
		this.to = to;
		this.message = message;
	}
}

class NotificationInterface {
	public open = [];
	
	/**
	 * Adds a new Notification to the current open notification list.
	 * @param request
	 */
	public add(request: Notification): void {
		this.open.push(request);
	}
	
	/**
	 * Returns the list of currently open notifications.
	 * @return list of currently open Notifications
	 */
	public getNotifications(): object[] {
		return this.open;
	}
	
	/**
	 * Accepts a request and removes it from the list of open notifications.
	 * @param {UUID} requestID UUID of the request to remove
	 * @return {Boolean} if the given requestID was found and the operation succeeded
	 */
	public acceptRequest(requestID: string): Notification {
		for (let i = 0; i < this.open.length; i++) {
			if (this.open[i].newbieID === requestID) {
				return this.open.splice(i, 1)[0];
			}
		}
		return null;
	}
}

export let notificationInterface = new NotificationInterface();
