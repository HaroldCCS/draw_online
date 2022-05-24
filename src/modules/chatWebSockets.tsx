import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3010";
let socket: any;

interface IChat{
  msg: string,
  Iam: boolean
}

let chat: IChat[] = []
export default function ChatComponent() {
  const [texto, setTexto] = useState("");
  const [messages, setMessages] = useState<IChat[]>([]);

  useEffect(() => {

    socket = connect(`${ENDPOINT}/play`);
    let channel = "ciao";

    socket.on("connect", function () {
      socket.emit("joinChannel", {
        channel: channel
      });
    });

    socket.on("message", function (data: any) {
      addMessageChat(data.message)
    });

    //return destroyConecction(socket);
  }, []);

  const addMessageChat = (_message: string, _iam: boolean = false) => {
    chat.push({ msg: _message.toString(), Iam: _iam})
    setMessages([...chat])
  }


  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addMessageChat(texto, true)
    socket.emit("message", { message: texto });
  }


  return (
    <>
      <form onSubmit={(e: React.SyntheticEvent) => handleOnSubmit(e)}>
        <input type="text" name="texto" id="texto" onChange={(event: any) => setTexto(event.target.value)} />
        <div>
          <input type="submit" value="Log in" />
        </div>
      </form>
      {
        messages.map((_e: IChat, index: number) => <p key={index}> {_e.Iam ? 'Yo:' : 'Otro:'} {_e.msg}</p>)
      }
      
    </>



  );
}