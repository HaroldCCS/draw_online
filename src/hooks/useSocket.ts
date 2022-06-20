import { useMemo, useEffect, useState } from 'react';
import { connect, Socket } from 'socket.io-client';
import { getStorageName } from '../utils/localStorage';


export const useSocket = (serverPath: string, channel: string) => {

	const socket: Socket = useMemo(() => connect(serverPath), [serverPath]);

	const [name, setName] = useState('')

	useEffect(() => {
		socket.on('connect', () => {
			socket.emit("joinChannel", { channel });
			getStorageName(setName)
		})

	}, [channel, socket])

	return {
		socket,
		name
	}
}