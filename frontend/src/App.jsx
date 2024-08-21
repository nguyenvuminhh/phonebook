import { useEffect } from 'react'
import { useState } from 'react'
import './index.css'
import service from './service'

/** Components */
const SearchField = (props) => {
  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input onChange={props.search} />
        </div>
      </form>
    </>
  )
}

const InputField = (props) => {
  return (
    <>
      <h2>Add a number</h2>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.nameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.numberChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </>
  )
}

const List = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {props.persons.filter(a => a.name.toLowerCase().includes(props.searchBar.toLowerCase()))
                .map(a => <li key={a.name+'@'+a.number}>{a.name} {a.number} <button onClick={() => service.deleteContact(a.name).then(() => service.getList().then((res) => props.setPersons(res)))}>delete</button></li>)}
      </ul>
    </>
  )
}

const Notification = ({ message, notiType}) => {
  if (message === '') {
    return null
  }

  return (
    <div className={notiType}>
      {message}
    </div>
  )
}

/** App */
const App = () => {
  //new name and number state
  const [newName, setNewName] = useState('')
  const nameChange = (event) => setNewName(event.target.value)
  const [newNumber, setNewNumber] = useState('')
  const numberChange = (event) => setNewNumber(event.target.value)

  //list state
  const [persons, setPersons] = useState([])
  useEffect(() => {service.getList().then((response) => setPersons(response))}, [])
  
  //searchbar state
  const [searchBar, setSearchBar] = useState('')
  const search = (event) => setSearchBar(event.target.value)

  //notification state
  const [noti, setNoti] = useState('')
  const [notiType, setNotiType] = useState('')
  const notify = (message, notiType) => {
    setNoti(message)
    setNotiType(notiType)
    setTimeout(() => setNoti(''), 5000)
  }
  
  //button function: add
  const addPerson = (event) => {
    console.log("posting")
    event.preventDefault()
    const toBeAdded = {name:newName, number:newNumber}
    if (!persons.map(a => a.name).includes(toBeAdded.name)) {
      console.log("adding")
      service.addContact(toBeAdded)
             .then((res) => {
                service.getList().then(res => setPersons(res))
                console.log("added")
                notify(`Added ${toBeAdded.name}`, "annoucement")
              })
             .catch((e) => {
                notify(e.response.data.error, "error")
              })
    } else {
      const confirm = window.confirm(`${toBeAdded.name} is already added to the phonebook. Replace old number with a new one?`)
      if (confirm) {
        service.updateContact(toBeAdded)
               .then(() => service.getList().then(res2 => setPersons(res2)))
               .catch(() => notify(`${toBeAdded.name} is already removed from the phonebook. Reload to see the latest version.`, "error"))
        }
      }
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <Notification message={noti} notiType={notiType} />
      <SearchField search={search} />
      <InputField 
        addPerson={addPerson}
        newName={newName} 
        nameChange={nameChange} 
        newNumber={newNumber} 
        numberChange={numberChange}
      />
      <List 
        persons={persons} 
        searchBar={searchBar} 
        setPersons={setPersons}/>
    </div>
  )
}

export default App