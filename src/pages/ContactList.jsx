import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ContactList = () => {
  const [contactos, setContactos] = useState([])

  function getAgendas() {
    fetch("https://playground.4geeks.com/contact/agendas/madg26/contacts")
      .then((response) => { return response.json() })
      .then((data) => {
        console.log(data);
// invocar una funcion en el dispatch 
        return setContactos(data.contacts)
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
        {contactos.map((value, index, array) => {
          return (
            <li key={index}>
              {value.name}
              {value.phone}
              {value.email}
              {value.address}

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