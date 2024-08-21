import axios from "axios"

const url = '/api/persons'

const getList = () => {
  return (axios.get(url).then((res) => res.data))
}

const addContact = (newContact) => {
  return axios.post(url, newContact)
}

const updateContact = (contact) => {
  return (getList().then((res) => {
    const old = res.find(a => a.name === contact.name)
    return axios.put(url + "/" + old.id, contact)
  }))
}

const deleteContact = (name) => {
  return (getList().then((res) => {
    const id = res.find(a => a.name === name).id
    return axios.delete(url + "/" + id)
  }))
}

export default {getList, addContact, updateContact, deleteContact}