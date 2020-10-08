import React, { useState } from "react"
import { Tab, Nav, Button, Modal } from "react-bootstrap"
import Chats from "./Chats"
import Contacts from "./Contacts"
import NewContactModal from "./NewContactModal"
import NewChatModal from "./NewChatModal"

const CHATS_KEY = "chats"
const CONTACTS_KEY = "contacts"

export default function Sidebar({ id }) {
  //id cause needs to siplcay the ID
  const [activeKey, setActiveKey] = useState(CHATS_KEY)
  //by def chats is active key
  const [modalOpen, setModalOpen] = useState(false)
  //the modal is closed by def
  const chatsOpen = activeKey === CHATS_KEY

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: "250px" }} className='d-flex flex-column'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        {/*when one of them is clicked it will become an active key*/}
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={CHATS_KEY}>Chats</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='border-right overflow-auto flex-grow-1'>
          {/*flex-grow --> our sidebar
        overflow -->will overflow inside a container (scrollbar inside)
        flexgrow --> entire page border
        */}
          <Tab.Pane eventKey={CHATS_KEY}>
            <Chats />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top border-right small'>
          Your Id: <span className='text-muted'>{id}</span>
        </div>
        <Button onClick={() => setModalOpen(true)} className='rounded-0'>
          New {chatsOpen ? "Chat" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {chatsOpen ? (
          <NewChatModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  )
}
