import React, {useRef} from 'react'
import CanvasDraw from 'react-canvas-draw'

export default function DrawSocket() {
  
  const firstCanvas: any = useRef(null)
  const SecondCanvas: any = useRef(null)

  const handleClick = () => {
    const data = firstCanvas.current?.getSaveData();
    console.log(data)

    SecondCanvas.current.loadSaveData(data)
  }


  const handleClear = () => {
    firstCanvas.current?.clear();
    SecondCanvas.current.clear()
  }

  const handleUndo = () => {
    firstCanvas.current?.undo();
    SecondCanvas.current.undo()
  }


  return(
    <>
    <button onClick={handleClick}>
      Guardar
    </button>
    <button onClick={handleClear}>
      Limpiar
    </button>
    <button onClick={handleUndo}>
      Undo
    </button>
      <CanvasDraw 
      brushRadius={1}
        ref={firstCanvas}
        onChange={handleClick}
      />
      <CanvasDraw 
        ref={SecondCanvas}
        immediateLoading
        disabled
      />
    </>
  )
}

