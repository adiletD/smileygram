import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useContacts } from "../contexts/ContactsProvider"
import { useChats } from "../contexts/ChatsProvider"

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([])
  //
  const { contacts } = useContacts()
  const { createChat } = useChats()

  function handleSubmit(e) {
    e.preventDefault()

    createChat(selectedContactIds)
    closeModal()
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
