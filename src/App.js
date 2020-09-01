import React, { Fragment } from 'react';
import firebase from 'firebase';

import { BigLoader } from './components/Loader/Loader';
import Editor from './components/Editor/Editor';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
// import { Effector } from './hooks/effector.store';

import './App.css';
import './Antd.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.setNote = this.setNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.addNewNote = this.addNewNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    this.firestore = firebase.firestore();
  }

  state = {
    // store: new Effector(),
    notes: [],
    selectedNoteIndex: null,
    selectedNote: null,
    isFetching: true
  }

  componentDidMount() {
    this.firestore
    .collection('notes')
    .onSnapshot(server => {
      const notes = server.docs.map(doc => {
        const data = doc.data();
        data['id'] = doc.id;

        return data;
      })

      // this.changeStoreState('notes', notes);

      this.setState((state) => ({
        ...state,
        notes,
        isFetching: false
      }))
    })
  }

  async onDeleteHandler(id) {
    const { notes, selectedNoteIndex } = this.state;

    const newNotesState = notes.filter(_note => _note.id !== id);

    if(this.state.selectedNot === selectedNoteIndex) {
      // this.changeStoreState('notes', newNotesState);
      // this.changeStoreState('selectNote', null);
      // this.changeStoreState('selectNoteIndex', null);

      this.setState((state) => ({
        ...state,
        notes: newNotesState,
        selectedNoteIndex: null,
        selectedNote: null
      }))
    }
  } 

  setNote(note, index) {
    this.setState((state) => ({
      ...state,
      selectedNote: note,
      selectedNoteIndex: index
    }))
  }

  updateNote(id, note) {
    this.firestore
    .collection('notes')
    .doc(id)
    .update({
      ...note,
      timestamp: Date.now()
    })
  }

  async deleteNote(id) {
    const { notes } = this.state;

    await this.firestore
    .collection('notes')
    .doc(id)
    .delete()

    let filteredNotes = notes.filter(note => note.id !== id);

    this.setState((state) => ({
      ...state,
      notes: filteredNotes
    }))
  }

  async addNewNote(title) {
    const { notes } = this.state;

    const newNote = await this.firestore
    .collection('notes')
    .add({
      title,
      body: '',
      timestamp: Date.now()
    })

    // this.changeStoreState('selectNote', { title, body: '' });
    // this.changeStoreState('selectNoteIndex', newNote.id);

    this.setState((state) => ({
      ...state,
      notes: [...notes, { title, body: '' }],
      selectedNote: { title, body: '' },
      selectedNoteIndex: newNote.id
    }))
  }

  render() {
    const { isFetching, notes, selectedNoteIndex, selectedNote } = this.state;

    return (
      <div className='main-app'>
        <Header />

        {
          isFetching ?
          <BigLoader />
          :
          <Fragment>
            <Sidebar 
              notes={notes} 
              selectedNoteIndex={selectedNoteIndex} 
              onDeleteHandler={this.onDeleteHandler} 
              setNote={this.setNote}
              addNewNote={this.addNewNote}
              deleteNote={this.deleteNote}
            />
        
            <Editor updateNote={this.updateNote} note={selectedNote} />
          </Fragment>
        }
      </div>
    )
  }
}

export default App;
