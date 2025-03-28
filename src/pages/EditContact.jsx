import React, { useEffect, useState } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { useNavigate, useParams } from 'react-router-dom'

const EditContact = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { store } = useGlobalReducer()
  const singleId = store.listContact.find(contacts => contacts.id === parseInt(id))

  const [editar, setEditar] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  })
  function editContact() {
    fetch(`https://playground.4geeks.com/contact/agendas/madg26/contacts/${singleId.id}`, {
      method: "PUT",
      body: JSON.stringify(editar),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => { return response.json() })
      .then((data) => {
        console.log(data)
        navigate("/")
      })
      .catch((err) => { return err })
  }
  function handleSubmit(e) {
    e.preventDefault();
    editContact();
    
  }
  useEffect(() => {
    if (singleId !== undefined) {

      setEditar(singleId)
    }
  }, [singleId])
  return (
    <div className="container text-center mt-5" id="Create">
      <h1>Editar contacto</h1>
      <p><strong>Full name</strong></p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input className="input"
          value={editar.name}
          onChange={(e) => {
            setEditar({ ...editar, name: e.target.value })
          }}></input>
        <p><strong>Phone</strong></p>
        <input className="input"
          value={editar.phone}
          onChange={(e) => {
            setEditar({ ...editar, phone: e.target.value })
          }}></input>
        <p><strong>Email</strong></p>
        <input className="input"
          value={editar.email}
          onChange={(e) => {
            setEditar({ ...editar, email: e.target.value })
          }}></input>
        <p><strong>Address</strong></p>
        <input className="input"
          value={editar.address}
          onChange={(e) => {
            setEditar({ ...editar, address: e.target.value })
          }}></input>

        <button className="btn btn-success mt-3" type="submit">Guardar</button>
      </form>
    </div>
  )
}

export default EditContact