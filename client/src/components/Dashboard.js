import React from "react"
import Sidebar from "./Sidebar"
import OpenChat from "./OpenChat"
import { useChats } from "../contexts/ChatsProvider"

export default function Dashboard({ id }) {
  const { selectedChat } = useChats()

  return (
    <div className='d-flex' style={{ height: "100vh" }}>
      {/* to fill in the 100% of the page*/}
      <Sidebar id={id} />
      {selectedChat && <OpenChat />}
      {/*if we have a selected chat --> open our chat*/}
    </div>
  )
}
