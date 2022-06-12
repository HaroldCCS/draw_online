import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";

//MODULES
import "./app.scss"
import DrawComponent from "./modules/draw/drawComponent";
import ChatComponent from "./modules/chat/chatComponent";
import { getName } from "./utils/localStorage";


const ENDPOINT = "https://uses-app.herokuapp.com";
//const ENDPOINT = "http://127.0.0.1:3010";

let socket: any;

interface IChat {
  msg: string,
  Iam: boolean,
  name: string,
  type: 'msg' | 'connect'
}
let chat: IChat[] = []

export default function SocketComponent() {
  const [messages, setMessages] = useState<IChat[]>([]);
  const [draw, setDraw] = useState<any>(null)
  const [name, setName] = useState<string>('')

  useEffect(() => {
    socket = connect(`${ENDPOINT}/play`);
    let channel = "ciao";

    const params = new URLSearchParams(window.location.search)
    const channel_temp = params.get('canal')
    //* Validando la exitenia de un canal en la url
    if (channel_temp !== null) {
      channel = channel_temp;
    }

    //TODO Validar en backend que no envie el mensaje A TODOS y hacer la comparacion del channel desde back
    socket.on("connect", () => socket.emit("joinChannel", { channel }));
    socket.on("message", (_data: { channel: string, message: string, name: string, type: 'msg' | 'connect' }) => _data.channel === channel && addMessageChat(_data.message, _data.name, _data.type));
    socket.on("draw", (_data: { channel: string, message: string }) => _data.channel === channel && setDraw(_data.message));

    getName(setName)
  }, []);



  useEffect(() => {
    setTimeout(() => {
      if (name) sendMsg('se ha conectado', 'connect')
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  //@INFO SOCKETS DE CHAT
  const addMessageChat = (_message: string, _name: string, type: 'msg' | 'connect' = 'msg', _iam: boolean = false) => {
    chat.push({ msg: _message.toString(), name: _name, Iam: _iam, type: type })
    setMessages([...chat])
  }

  const sendMsg = (_msg: string, type: 'msg' | 'connect' = 'msg'): void => {
    addMessageChat(_msg, name, type, true)
    socket.emit("message", { message: _msg, name: name, type });
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