import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";

//MODULES
import "./app.scss"
import DrawComponent from "./modules/drawComponent";
import ChatComponent from "./modules/chatComponent";


const ENDPOINT = "https://uses-app.herokuapp.com";
//const ENDPOINT = "http://127.0.0.1:3010";

let socket: any;

interface IChat {
  msg: string,
  Iam: boolean
}
let chat: IChat[] = []
let uniqueId = Math.round(Math.random() * 100000000)

export default function SocketComponent() {
  const [messages, setMessages] = useState<IChat[]>([]);
  const [draw, setDraw] = useState<any>(null)

  useEffect(() => {
    socket = connect(`${ENDPOINT}/play`);
    let channel = "ciao";

    socket.on("connect", () => socket.emit("joinChannel", { channel }));
    socket.on("message", (_data: any) => addMessageChat(_data.message, false));
    socket.on("draw", (_data: any) => setDraw(_data.message));

    //return destroyConecction(socket);
  }, []);

  //@INFO SOCKETS DE CHAT
  const addMessageChat = (_message: string, _iam: boolean = false, _data?: any) => {
    console.log(_data);

    chat.push({ msg: _message.toString(), Iam: _iam })
    setMessages([...chat])
  }

  const sendMsg = (_msg: string): void => {
    addMessageChat(_msg, true)
    socket.emit("message", { message: _msg });
  }


  const sendDraw = (_draw: any) => {
    socket.emit("draw", { message: _draw, id: uniqueId });
  }


  return (
    <div className="container-chat-web-socket">
      <DrawComponent sendDraw={sendDraw} draw={draw} />
      <ChatComponent sendMsg={sendMsg} messages={messages} />
    </div>
  );
}