import React, { useState, FC, useContext, useEffect } from "react";
import { FiSend } from 'react-icons/fi';
import { SocketContext } from "../../context/SocketContext";
import { MessageComponent } from "./messageComponent";
import "./chat.scss"


interface IChat {
  msg: string,
  Iam: boolean,
  name: string,
  type: 'msg' | 'connect'
}

interface IPropsChat { }


const ChatComponent: FC<IPropsChat> = () => {
  const [texto, setTexto] = useState<string>("");
  const [messages, setMessages] = useState<IChat[]>([]);
  const { socket, name }: any = useContext(SocketContext);


  useEffect(() => {
    socket.on("message", (_data: { message: string, name: string, type: 'msg' | 'connect' }) => addMessageChat(_data.message, _data.name, _data.type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    if (name !== '') setTimeout(() => { socket.emit("setName", name) }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);


  const addMessageChat = (_message: string, _name: string, type: 'msg' | 'connect' = 'msg', _iam: boolean = false) => {
    messages.push({ msg: _message.toString(), name: _name, Iam: _iam, type: type })
    setMessages([...messages])
  }

  const sendMsg = (_msg: string): void => {
    addMessageChat(_msg, name, 'msg', true)
    socket.emit("message", _msg);
  }


  const handleOnSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (texto.trim()) sendMsg(texto.trim());
    setTexto("")
  }

  return (
    <div className="container-chat">
      <form onSubmit={(e: React.SyntheticEvent) => handleOnSubmit(e)}>
        <input type="text" autoComplete="off" value={texto} name="texto" id="texto" onChange={(event: any) => setTexto(event.target.value)} />
        <div>
          <button type="submit" value="Log in" ><FiSend size='1.3rem' color="white" /></button>
        </div>
      </form>
      <div className="container-messages">
        {
          messages.map((_e: IChat, index: number) => <MessageComponent key={index} msg={_e.msg} name={_e.name} type={_e.type} Iam={_e.Iam} />)
        }
      </div>
    </div>
  );
}


export default ChatComponent