import { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from './services/persons'
import {Notification, Error} from './alerts.js'

const PersonForm = ({ onInputChange, onAddPressed }) => {

    return (
        <form onSubmit={onAddPressed}>
            <div>
                name: <input
                    onChange={(event) => onInputChange(event, 'name')}
                />
            </div>
            <div>
                number: <input
                    onChange={(event) => onInputChange(event, 'number')}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        )
}

const PersonDisplay = ({ contacts, currentFilter, setContacts }) => {
    return (
        <ul>
            {contacts.filter((p) => p.name.includes(currentFilter)).map((person, i) =>
                <li key={i}>
                    {person.name + " " + person.number} <button
                        onClick={() => {
                            if (window.confirm(`Delete ${person.name}?`)) {
                                contactService.deletePerson(person.id)
                                setContacts(contacts.filter(c => c.id !== person.id))
                            }
                        }}
                    >delete</button>
                </li>
            )}
        </ul>
        )
}

const FilterComponent = ({onInputChange}) => {
    return (
        <div>
            filter: <input
                onChange={(event) => onInputChange(event, 'filter')}
            />
        </div>
    )
}



const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [addedPerson, setAddedPerson] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])



    const handleInputChange = (event, type) => {
        const value = event.target.value
        console.log(value)

        if (type === 'name') {
            setNewName(value)
        } else if (type === 'number') {
            setNewNumber(value)
        } else if (type === 'filter') {
            setNewFilter(value)
        }
    }

    const addContact = (event) => {
        event.preventDefault()
        const newContact = { name: newName, number: newNumber}

        if (persons.filter(obj => obj.name === newContact.name).length === 0) {

            contactService.create(newContact)
                .then(returnedPerson =>
                    setPersons(persons.concat(returnedPerson)))
            setAddedPerson('Added')
            setTimeout(() => {
                setAddedPerson(null)
            }, 5000)
            
        }
        else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const oldContact = persons.find(c => c.name === newName)
            const updatedContact = { ...oldContact, number: newNumber }
            contactService
                .update(updatedContact.id, updatedContact).then(r =>
                    setPersons(persons.map(p => {
                        if (p.id === updatedContact.id) { return (updatedContact) }
                        else { return (p) }
                    }))
                    )
                .catch(error => {
                    setErrorMessage(
                        `Information of '${updatedContact.name}' has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })



        }
        
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={addedPerson} />
            <Error message={errorMessage}/>
            <FilterComponent onInputChange={handleInputChange}/>
            <h2>Add new</h2>
            <PersonForm
                onInputChange={handleInputChange}
                onAddPressed={addContact}
            />
            <h2>Numbers</h2>
            <PersonDisplay currentFilter={newFilter} contacts={persons} setContacts={setPersons}/>
        </div>
    )
}

export default App