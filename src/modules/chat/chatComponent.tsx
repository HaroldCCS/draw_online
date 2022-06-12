import React, { useState, FC } from "react";
import { FiSend } from 'react-icons/fi';
import "./chat.scss"


interface IChat {
  msg: string,
  Iam: boolean,
  name: string,
  type: 'msg' | 'connect'
}

interface IPropsChat {
  sendMsg: (_msg: string) => void
  messages: IChat[]
}



const MessageComponent: FC<IChat> = ({msg, Iam, name, type}) => {

  if (type === 'msg' ) {
    if (Iam) return <div className={`message-yo message`} >{msg}</div>
      
    return (
      <div className={`message-otro message`}>
        <div className="message-name">{name}</div>
        <div className="message-msg">{msg}</div>
      </div>
    )
  }

  if (!Iam) {
    return <div className="new-user-channel"> {name} {msg}</div>
  }

  return null
}



const ChatComponent: FC<IPropsChat> = ({sendMsg, messages}) => {
  const [texto, setTexto] = useState<string>("");

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