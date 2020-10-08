import React, { useContext, useState, useEffect, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useContacts } from "./ContactsProvider"
import { useSocket } from "./SocketProvider"

const ChatsContext = React.createContext()

export function useChats() {
  //to be able to use everything here
  return useContext(ChatsContext)
}

export function ChatsProvider({ id, children }) {
  const [chats, setChats] = useLocalStorage("chats", [])
  const [selectedChatIndex, setSelectedChatIndex] = useState(0) //by default we select the first conversation
  const { contacts } = useContacts()
  const socket = useSocket()

  function createChat(recipients) {
    setChats((prevChats) => {
      return [...prevChats, { recipients, messages: [] }] //when new conversartion theres no mesages yet
    })
  }

  const addMessageToChat = useCallback(
    //should support taking messages from others as well as taking our own messages
    ({ recipients, text, sender }) => {
      // we have array of recipients, we have to figure out what conversation
      // it goes to, or if we need a brand new conversation since we dont have that conversation yet

      setChats((prevChats) => {
        let madeChange = false
        // if we dont have conversations that match this will be false
        const newMessage = { sender, text }
        const newChats = prevChats.map((chat) => {
          if (arrayEquality(chat.recipients, recipients)) {
            // check if our recipinets array matches
            // one of the chat we already have

            madeChange = true // we made changes to the existing conversations
            return {
              ...chat,
              messages: [...chat.messages, newMessage], //add newMessage to the end of the existing messages
            }
          }

          return chat // we dont have to worry about it
        })

        if (madeChange) {
          return newChats
        } else {
          // we did not have conversations that match
          return [...prevChats, { recipients, messages: [newMessage] }] //if theres no conversation thathas those recepients,
          // then we have to create a new one
        }
      })
    },
    [setChats]
  )

  useEffect(() => {
    // for it not to run every single time
    if (socket == null) return

    socket.on("receive-message", addMessageToChat)

    // if we receive message we want to addMessageto Chat
    return () => socket.off("receive-message")
  }, [socket, addMessageToChat])

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text })

    addMessageToChat({ recipients, text, sender: id })
  }

  const formattedChats = chats.map((chat, index) => {
    const recipients = chat.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        //ID
        return contact.id === recipient //recipient is just an ID, we leave it like this
      })
      const name = (contact && contact.name) || recipient //name of contacts
      //id And name OR just id
      return { id: recipient, name }
    })

    const messages = chat.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedChatIndex
    return { ...chat, messages, recipients, selected }
  })

  const value = {
    chats: formattedChats,
    selectedChat: formattedChats[selectedChatIndex],
    sendMessage,
    selectChatIndex: setSelectedChatIndex,
    createChat,
  }

  return <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}
