import React, { useRef } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { v4 as uuidV4 } from "uuid"

export default function Login({ onIdSubmit }) {
  const idRef = useRef() /*idRef --> references the user*/

  function handleSubmit(e) {
    e.preventDefault()

    onIdSubmit(idRef.current.value)
  }

  function createNewId() {
    onIdSubmit(uuidV4()) //pass that ID to OnIdSubmit
  }

  return (
    <Container
      className='align-items-center d-flex'
      style={{ height: "100vh" }}
      /*now it stretches all the way accross the screen*/
    >
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type='text' ref={idRef} required />
          {/*idRef for tracking changes instead of onChange*/}
        </Form.Group>
        <Button type='submit' className='mr-2'>
          Login
        </Button>
        <Button onClick={createNewId} variant='secondary'>
          Create A New Id
        </Button>
      </Form>
    </Container>
  )
}
