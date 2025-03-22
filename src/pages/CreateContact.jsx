import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateContact = () => {
  const [contact, setContact] = useState("")
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  })
  const navigate = useNavigate();

  function addContact() {
    fetch("https://playground.4geeks.com/contact/agendas/madg26/contacts", {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => { return response.json() })
      .then((data) => {
        setContact(...contact, data);
        navigate("/")
      })
      .catch((err) => { return err })
  }
  

  return (
    <div className="container text-center mt-5" id="Create">
      <p><strong>Full name</strong></p>
      <input className="input"
        value={newContact.name}
        onChange={(e) => setNewContact({...newContact, name: e.target.value})}
        type="text"
        placeholder="Enter name"></input>
      <p><strong>Phone</strong></p>
      <input className="input"
        value={newContact.phone}
        onChange={(e) => {setNewContact({...newContact, phone: e.target.value})}}
        type= "text"
        placeholder="Enter phone"></input>
      <p><strong>Email</strong></p>
      <input className="input"
        value={newContact.email}
        onChange={(e) => setNewContact({...newContact, email: e.target.value})}
        type="text"
        placeholder="Enter email"></input>
      <p><strong>Address</strong></p>
      <input className="input"
        value={newContact.address}
        onChange={(e) => setNewContact({...newContact, address : e.target.value})}
        type="text"
        placeholder="Enter address"></input>

      <button className="btn btn-primary mt-3"
        onClick={() => {
          addContact()
        }}
      >
        Guardar
      </button>
      <a className="to-contact"
        href="/">
        Volver a los contactos
      </a>

    </div>

  )
}

export default CreateContact