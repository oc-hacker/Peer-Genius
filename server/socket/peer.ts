// All actions related to managing the signaling mechanism between two peers in a P2P conversation.

import { UserSocket } from '../types';

interface PeerOffer {
	receiverId: string;
	data: string;
}

interface PeerCandidate {
	receiverId: string;
	data: string;
}

const attach = async (socket: UserSocket) => {
	// Simply act as a relay.
	socket.on('peer_offer', (offer: PeerOffer) => {
		socket.to(offer.receiverId).emit('peer_offer', {
			senderId: socket.user,
			data: offer.data
		});
	});
	
	socket.on('peer_candidate', (candidate: PeerCandidate) => {
		socket.to(candidate.receiverId).emit('peer_candidate', {
			senderId: socket.user,
			data: candidate.data
		});
	});
};

export default { attach };
