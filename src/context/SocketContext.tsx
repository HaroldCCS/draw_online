import React, { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { getUrlParam } from '../utils/urlParams';

// const ENDPOINT:string = "https://uses-app.herokuapp.com";
const ENDPOINT: string = "http://localhost:1234";
const socketSpaceName: string = "/chat"

export const SocketContext = createContext({ socket: {}, name: '' });


export const SocketProvider = ({ children }: any) => {
	const { socket, name } = useSocket(ENDPOINT + socketSpaceName, getUrlParam());

	return (
		<SocketContext.Provider value={{ socket, name }}>
			{children}
		</SocketContext.Provider>
	)
}

