import deepmerge from 'deepmerge';

import types from '../actions/types';

const defaultState = {};

export default function notifications( state = {
  show: false,
  list: []
}, action) {
  switch(action.type) {
    case types.TOGGLE_SHOW_NOTIFICATIONS: {
      // Toggle whether to show the notifications list
      if (state.show) {
        return {
          show: false,
          list: state.list.map(notification => ({
            ...notification,
            delayedRead: notification.read
          }))
        };
      } else {
        return {
          show: true,
          list: state.list
        };
      }
    }
    case types.CLOSE_NOTIFICATIONS: {
      // Close the notifications list
      if (state.show) {
        return {
          show: false,
          list: state.list.map(notification => ({
            ...notification,
            delayedRead: notification.read
          }))
        };
      } else {
        return state;
      }
    }
    case types.ADD_NOTIFICATIONS: {
      // Initialize the notifications object using the supplied object
      return {
        show: state.show,
        list: action.notifications.map(notification => ({
          ...notification,
          delayedRead: notification.read
        })).concat(state.list)
      };
    }
    case types.READ_NOTIFICATIONS: {
      // Mark all notifications as read.
      return {
        show: state.show,
        list: state.list.map(notification => ({
          ...notification,
          read: true
        }))
      };
    }
    case types.RESET: {
      // Reset the notifications
      return {
        show: false,
        list: []
      };
    }
    default: {
      return state;
    }
  }
}
