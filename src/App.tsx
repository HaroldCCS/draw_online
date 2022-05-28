import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";

//MODULES
import "./app.scss"
import DrawComponent from "./modules/draw/drawComponent";
import ChatComponent from "./modules/chat/chatComponent";
import { getName } from "./utils/localStorage";


//const ENDPOINT = "https://uses-app.herokuapp.com";
const ENDPOINT = "http://127.0.0.1:3010";

let socket: any;

interface IChat {
  msg: string,
  Iam: boolean,
  name: string
}
let chat: IChat[] = []

export default function SocketComponent() {
  const [messages, setMessages] = useState<IChat[]>([]);
  const [draw, setDraw] = useState<any>(null)
  const [name, setName] = useState<string>('')

  useEffect(() => {
    socket = connect(`${ENDPOINT}/play`);
    let channel = "ciao";

    socket.on("connect", () => socket.emit("joinChannel", { channel }));
    socket.on("message", (_data: any) => addMessageChat(_data.message, _data.name));
    socket.on("draw", (_data: any) => setDraw(_data.message));

    getName(setName)
    //return destroyConecction(socket);
  }, []);



  //@INFO SOCKETS DE CHAT
  const addMessageChat = (_message: string, _name: string = "pedro", _iam: boolean = false) => {

    chat.push({ msg: _message.toString(), name: _name , Iam: _iam })
    setMessages([...chat])
  }

  const sendMsg = (_msg: string): void => {
    addMessageChat(_msg, name, true)
    socket.emit("message", { message: _msg, name: name });
  }


  const sendDraw = (_draw: any) => {
    socket.emit("draw", { message: _draw });
  }


  return (
    <div className="container-chat-web-socket">
      <DrawComponent sendDraw={sendDraw} draw={draw} />
      <ChatComponent sendMsg={sendMsg} messages={messages} />
    </div>
  );
}