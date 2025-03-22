import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'

const ContactList = () => {
  const {store, dispatch} = useGlobalReducer()

  function getAgendas() {
    fetch("https://playground.4geeks.com/contact/agendas/madg26/contacts")
      .then((response) => { return response.json() })
      .then((data) => {
        console.log(data);
// invocar una funcion en el dispatch 
        return (
          dispatch({
            type: "save_contacts", 
            payload: { contactos : data.contacts }
          })
        )
      })
      .catch((err) => { return err })
  }
  useEffect(() => {
    getAgendas()
  }, [])
  return (
    <div className="container text-center">
      <h1>Hola desde contact list!</h1>
      <ul>
        {store.listContact.map((value, index, array) => {
          return (
            <li key={index}>
              {value.name}
              {value.phone}
              {value.email}
              {value.address}

              <Link to= {`/edit-contact/${value.id}`} >
              <button className="btn btn-danger">Editar</button>
            
              </Link>

            </li>
          )
        })}
      </ul>
      <Link to="/create-contact">
        <button className="btn btn-success"
        >Add Contact</button>
      </Link>

    </div>
  )
}

export default ContactList