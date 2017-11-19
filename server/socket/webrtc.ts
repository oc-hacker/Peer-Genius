// All actions related to managing the signaling mechanism between two peers in a P2P conversation.

import { UserSocket } from '../types';

interface PeerOffer {
	receiverId: string;
	data: string;
}

interface PeerSignal {
	receiverId: string;
	data: string;
}

const attach = async (socket: UserSocket) => {
	// Simply act as a relay.
	socket.on('webrtc_offer', (offer: PeerSignal) => {
		socket.to(offer.receiverId).emit('webrtc_offer', {
			senderId: socket.user,
			data: offer.data
		});
	});
	
	socket.on('webrtc_signal', (signal: PeerSignal) => {
		socket.to(signal.receiverId).emit('webrtc_signal', {
			senderId: socket.user,
			data: signal.data
		});
	});
	
	socket.on('webrtc_stop', (signal: { receiverId: string }) => {
		socket.to(signal.receiverId).emit('webrtc_stop', {
			senderId: socket.user
		});
	});
};

export default { attach };
