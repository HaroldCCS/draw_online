import React from "react";

import DrawComponent from "../components/draw/drawComponent";
import ChatComponent from "../components/chat/chatComponent";


export default function HomePage() {

  return (
    <div className="container-chat-web-socket">
      <DrawComponent />
      <ChatComponent />
    </div>
  );
}