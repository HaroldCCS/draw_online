import React, { useEffect, useState, useRef } from "react";
import { connect } from "socket.io-client";
import CanvasDraw from 'react-canvas-draw'



const ENDPOINT = "http://127.0.0.1:3010";
let socket: any;

interface IChat{
  msg: string,
  Iam: boolean
}
let lastDraw: any = {}
let chat: IChat[] = []
export default function ChatComponent() {
  const [texto, setTexto] = useState("");
  const [messages, setMessages] = useState<IChat[]>([]);
  const [uniqueId, setUniqueId] = useState(Math.round(Math.random()*100000000));

  const firstCanvas: any = useRef(null)

  //const secondCanvas: any = useRef(null)

  
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

    socket.on("draw", function (data: any) {
      addCanvasDraw(data.message)
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

  const addCanvasDraw = (data: any) => {
    lastDraw = data;
    firstCanvas.current.loadSaveData(data, true)
  }

  const handleClick = () => {
    const data = firstCanvas.current?.getSaveData();

    
    if (lastDraw !== data) {
      console.log('son diferentes')
      lastDraw = data;

      socket.emit("draw", { message: data, id: uniqueId });
      //firstCanvas.current.loadSaveData(data)
    } else {
      console.log('son idugales');
      
    }
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

      <CanvasDraw 
        brushRadius={1}
        ref={firstCanvas}
        immediateLoading
        //onChange={handleClick}
      />
      <button onClick={handleClick}>Guardar</button>
    </>



  );
}


/*


import React, { useEffect, useState, useRef } from "react";
import { connect } from "socket.io-client";
import CanvasDraw from 'react-canvas-draw'



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
  const [uniqueId, setUniqueId] = useState(Math.round(Math.random()*100000000));
  const [uniqueColor, setColorUnique] = useState(Math.floor(Math.random()*16777215).toString(16));
  

  const firstCanvas: any = useRef(null)
  //const secondCanvas: any = useRef(null)

  
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

    socket.on("draw", function (data: any) {
      addCanvasDraw(data.message)
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

  const addCanvasDraw = (data: any) => {
    firstCanvas.current.loadSaveData(data)
  }

  const handleClick = () => {
    const data = firstCanvas.current?.getSaveData();
    socket.emit("draw", { message: data, id: uniqueId });
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

      <CanvasDraw 
        brushColor={uniqueColor}
        brushRadius={1}
        ref={firstCanvas}
        immediateLoading
        //onChange={handleClick}
      />
      <button onClick={handleClick}>Guardar</button>
      <input type="color" onChange={(e: any) => setColorUnique(e.target.value)}></input>
    </>



  );
}
*/