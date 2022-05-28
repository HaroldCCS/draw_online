import React, {useEffect, useRef, FC, useState } from "react";
import CanvasDraw from 'react-canvas-draw';
import "./draw.scss"


interface IPropsChat {
  sendDraw: (_draw: any) => void
  draw: any
}

const DrawComponent: FC<IPropsChat> = ({sendDraw, draw}) => {
  const [colorDraw, setDrawColor] = useState<string>('#191919')
  const firstCanvas: any = useRef(null)

  useEffect(()=> {
    if (draw) {
      firstCanvas.current.loadSaveData(draw, true)
    }
  },[draw])

  const handleClean = () => {
    firstCanvas.current.clear()
    handleDraw()
  }

  const handleDraw = () => {
    const data = firstCanvas.current?.getSaveData();
    sendDraw(data)
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