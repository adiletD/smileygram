import React from "react"
import { ListGroup } from "react-bootstrap"
import { useChats } from "../contexts/ChatsProvider"

export default function Chats() {
  const { chats, selectChatIndex } = useChats()

  return (
    <ListGroup variant='flush'>
      {chats.map((chat, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectChatIndex(index)}
          active={chat.selected}
        >
          {chat.recipients.map((r) => r.name).join(", ")}{" "}
          {/*take recipients' names and 
          join them in comma ordered list*/}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
