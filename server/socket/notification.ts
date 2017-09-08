import notification from '../database/models/notification';

// Notification interface
interface Notification {
    to: string;
    message: string;
}

/**
 * Sends a notification to the given user.
 * @param {Object} data the data sent by the client. Contains the contents of the notification as well as the target
 * @param {UUID} id the target's UUID
 * @param {SocketIO.Socket} socket the socket object
 */
export const sendNotification = async (data: Notification, id: string, socket: SocketIO.Socket) => {
    let newNotif = {
        to: data.to,
        message: data.message,
        createdAt: new Date()
    };

    //save the message to DB
    await notification.upsert(newNotif);

    //send the message to the recipient
    socket.broadcast.to(data.to).emit('receiveNotification', newNotif);
};
