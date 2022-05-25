import React, { useState } from "react";
import ChatComponent from "./modules/chatWebSockets";
import DrawSocket from "./modules/drawSocket";

function App() {
  return (
    <>
      <ChatComponent />
      {/*<DrawSocket />*/}
    </>
  );
}

export default App;