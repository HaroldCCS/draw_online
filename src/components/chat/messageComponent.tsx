import React, { FC } from "react"

interface IChat {
  msg: string,
  Iam: boolean,
  name: string,
  type: 'msg' | 'connect'
}


export const MessageComponent: FC<IChat> = ({ msg, Iam, name, type }) => {

  if (type === 'msg') {
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

