import React from 'react'
import { nanoid } from 'nanoid'
import { FiEdit } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"


function App() {
  const [notes, setNotes] = React.useState([])
  const [currentNote, setCurrentNote] = React.useState()

  function handleSubmit(event) {
    event.preventDefault();
    let newNote = document.getElementById("note").value
    if (newNote !== "") {
      setNotes(prevNotes => prevNotes.concat(
        {
          id: nanoid(),
          note: newNote
        })
      )
    }
    setCurrentNote("")
  }
  
  function handleChange(event) {
    setCurrentNote(event.target.value)
  }

  function deleteNote(Id) {
    setNotes(
      prevNotes => prevNotes.filter(
        item => item.id !== Id
      )
    )
  }

  function editNote(Note, Id) {
    setCurrentNote(Note)
    setNotes(
      prevNotes => prevNotes.filter(
        item => item.id !== Id
      )
    )
  }

  const notesElement = notes.map(
    item => 
      <div className="note-item" key={item.id}>
        <p>{item.note}</p>
        <div className="note-buttons">
          <FiEdit className="note-icon" size={30} onClick={() => editNote(item.note, item.id)}/>
          <AiOutlineDelete className="note-icon" size={30} onClick={() => deleteNote(item.id)}/>
        </div>
      </div>
    )

  return (
    <div>
      <div className="note-main">
        <h1 className="note-title">React Notes</h1>
        <form onSubmit={handleSubmit} className="note-form">
          <input className="note-input" id="note" value={currentNote} onChange={handleChange} autoFocus/>
          <button className="note-submit">Submit</button>
        </form>
        {notesElement}
      </div>
    </div>
  );
}

export default App;
