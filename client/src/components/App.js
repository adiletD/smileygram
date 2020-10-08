import React from "react"
import Login from "./Login"
import useLocalStorage from "../hooks/useLocalStorage"
import Dashboard from "./Dashboard"
import { ContactsProvider } from "../contexts/ContactsProvider"
import { ChatsProvider } from "../contexts/ChatsProvider"
import { SocketProvider } from "../contexts/SocketProvider"

function App() {
  const [id, setId] = useLocalStorage("id") //id will be part of the key

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ChatsProvider id={id}>
          <Dashboard id={id} />
        </ChatsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return id ? dashboard : <Login onIdSubmit={setId} /> //if we have an id we will go to
  // another page, if we dont we go to login page
  // when we clear the local storage from the Application tab
  // it will redirect us to login page
}

export default App
