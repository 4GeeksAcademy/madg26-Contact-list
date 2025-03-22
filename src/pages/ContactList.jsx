import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'


const ContactList = () => {

  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();


  function getAgendas() {
    fetch("https://playground.4geeks.com/contact/agendas/madg26/contacts")
      .then((response) => { return response.json() })
      .then((data) => {
        console.log(data);
        return (
          dispatch({
            type: "save_contacts",
            payload: { contactos: data.contacts }
          })
        )
      })
      .catch((err) => { return err })
  }
  function deleteContact(id) {
    fetch("https://playground.4geeks.com/contact/agendas/madg26/contacts/" + id, {
      method: "DELETE"
    })
      .then((response) => { return response })
      .then(() => {
        getAgendas()
      })
      .catch((err) => { return err })
  }
  useEffect(() => {
    getAgendas()
  }, [])
  return (
    <div className="container text-center" id="listContact">
      <h1>Contact list</h1>
      <div className="lista">
        <ul>
          {(store.listContact || []).map((value, index, array) => {
            return (

              <span key={index}>
                <div className=" container contacto text-start">
                  <img className="foto" src="https://th.bing.com/th/id/R.d22dff664d866b32d8b9d046e3359390?rik=Ce8KWuYyZne33w&pid=ImgRaw&r=0" />
                  <div className="datos container mt-1">
                    <h1 className="nombre">{value.name}</h1>
                    
                    <div className="container texto d-flex text-start">
                    <div className="icons">
                      <i className="fa-solid fa-phone" /><br />
                      <i className="fa-solid fa-envelope" /><br />
                      <i className="fa-solid fa-location-dot" />
                    </div>
                      {value.phone}<br />
                      {value.email}<br />
                      {value.address}
                    </div>
                  </div>
                  <button className="btn boton"
                    onClick={() => {
                      navigate(`/edit-contact/${value.id}`)
                    }}><i className="fa-solid fa-pencil" /></button>
                  <button className="btn boton"
                    onClick={() => {
                    
                      deleteContact(value.id)
                    }}><i className="fa-solid fa-trash" /></button>

                </div>
              </span>
            )
          })}
        </ul>
      </div>
      <Link to="/create-contact">
        <button className="btn btn-success"
        >Add Contact</button>
      </Link>

    </div>
  )
}

export default ContactList