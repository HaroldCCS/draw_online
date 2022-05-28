import React, { useState, FC } from "react";
import { FiSend } from 'react-icons/fi';


interface IChat {
  msg: string,
  Iam: boolean
}

interface IPropsChat {
  sendMsg: (_msg: string) => void
  messages: IChat[]
}

const ChatComponent: FC<IPropsChat> = ({sendMsg, messages}) => {
  const [texto, setTexto] = useState<string>("");

  const handleOnSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    sendMsg(texto)
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
          messages.map((_e: IChat, index: number) => <div className={`message-${_e.Iam ? 'yo' : 'otro'} message`} key={index}>{_e.msg}</div>)
        }
        </div>
      </div>
  );
}


export default ChatComponent