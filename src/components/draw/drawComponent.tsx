import React, {useEffect, useRef, FC, useState, useContext } from "react";
import CanvasDraw from 'react-canvas-draw';
import { SocketContext } from "../../context/SocketContext";
import "./draw.scss"


interface IPropsChat {}

const DrawComponent: FC<IPropsChat> = () => {
  const [colorDraw, setDrawColor] = useState<string>('#191919')
  const [draw, setDraw] = useState<any>(null)
  const firstCanvas: any = useRef(null)

  const { socket  }: any = useContext( SocketContext );


  useEffect(() => {
    socket.on("draw", (_data: any) => setDraw(_data)) 
  },[socket])

  useEffect(()=> {
    if (draw) firstCanvas.current.loadSaveData(draw, true);
  },[draw])


  const handleClean = () => {
    firstCanvas.current.clear()
    handleDraw()
  }

  const handleDraw = () => {
    const data = firstCanvas.current?.getSaveData();
    socket.emit("draw", data );
  }


  return (
      <div className="container-draw">
        <CanvasDraw
          brushRadius={1}
          ref={firstCanvas}
          immediateLoading
          lazyRadius={0}
          brushColor={colorDraw}
        //onChange={handleClick}
        />
        <div className="container-buttons-draw">
          <button onClick={handleDraw}>Guardar</button>
          <input type="color" onChange={(e: any) => setDrawColor(e.target.value)}></input>
          <button onClick={handleClean} >Limpiar</button>
        </div>
      </div>
  );
}


export default DrawComponent